import {FError} from '../lang/FError';
import {LoggerUtil} from '../lang/LoggerUtil';
import {FXmlDocument} from '../xml/FXmlDocument';
import {RXml} from '../xml/RXml';
import {EHttpContent} from './EHttpContent';
import {FHttpConnection} from './FHttpConnection';

//==========================================================
// <T>配置通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
export class FXmlConnection extends FHttpConnection {
   // 输入节点
   public _inputNode = null;
   // 输出节点
   public _outputNode = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._contentCd = EHttpContent.Text;
   }

   //==========================================================
   // <T>响应链接发送处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionSend() {
      var data = this._input;
      if (data) {
         var xml = null;
         if (data.constructor == String) {
            xml = data;
            this._inputNode = null;
         } else if (data.constructor == xml.FXmlNode) {
            var document = new xml.FXmlDocument();
            document.setRoot(data);
            xml = document.xml();
            this._inputNode = data;
         } else if (data.constructor == xml.FXmlDocument) {
            xml = data.xml();
            this._inputNode = data.root();
         } else {
            throw new FError(this, 'Unknown send data type.');
         }
         this._inputData = xml;
         this._contentLength = xml.length;
      }
   }

   //==========================================================
   // <T>事件响应处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionComplete() {
      var handle = this._handle;
      // 获得返回的文档对象
      var element = null;
      if (handle.responseXML) {
         element = handle.responseXML.documentElement;
      } else if (handle.responseXml) {
         element = handle.responseXml.documentElement;
      } else {
         throw new FError(this, "Fetch xml data failure.");
      }
      if (!element) {
         //return RLogger.fatal(this, 'Read xml error. (url={1})\n{2}', this._url, this._outputText)
         return LoggerUtil.fatal(this, 'Read xml error. (url={1})', this._url)
      }
      // 建立文档对象
      var document = new FXmlDocument();
      RXml.buildNode(document, null, element);
      var root = this._outputNode = document.root();
      // 完成处理
      this._statusFree = true;
      // 完成处理
      var event = this._event;
      event.connection = this;
      event.document = document;
      event.root = root;
      event.content = root;
      this.loadListeners.process(event);
      event.dispose();
      // 异步处理后清空属性
      if (this._asynchronous) {
         this._input = null;
         this._inputNode = null;
         this._output = null;
         this._outputNode = null;
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return Object 内容
   //==========================================================
   public content() {
      return this._outputNode;
   }
}
