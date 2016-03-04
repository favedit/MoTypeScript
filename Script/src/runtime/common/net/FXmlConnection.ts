import {FError} from '../lang/FError';
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
   //..........................................................
   // @attribute
   _contentCd = EHttpContent.Text;
   // @attribute
   _inputNode = null;
   _outputNode = null;
   // @attribute

   //==========================================================
   // <T>响应链接发送处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionSend() {
      var o = this;
      var data = o._input;
      if (data) {
         var xml = null;
         if (data.constructor == String) {
            xml = data;
            o._inputNode = null;
         } else if (data.constructor == xml.FXmlNode) {
            var document = new xml.FXmlDocument();
            document.setRoot(data);
            xml = document.xml();
            o._inputNode = data;
         } else if (data.constructor == xml.FXmlDocument) {
            xml = data.xml();
            o._inputNode = data.root();
         } else {
            throw new FError(o, 'Unknown send data type.');
         }
         o._inputData = xml;
         o._contentLength = xml.length;
      }
   }

   //==========================================================
   // <T>事件响应处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionComplete() {
      var o = this;
      var handle = o._handle;
      // 获得返回的文档对象
      var element = null;
      if (handle.responseXML) {
         element = handle.responseXML.documentElement;
      } else if (handle.responseXml) {
         element = handle.responseXml.documentElement;
      } else {
         throw new FError(o, "Fetch xml data failure.");
      }
      if (!element) {
         //return sk.common.lang.RLogger.fatal(o, 'Read xml error. (url={1})\n{2}', this._url, this._outputText)
      }
      // 建立文档对象
      var document = new FXmlDocument();
      RXml.buildNode(document, null, element);
      var root = o._outputNode = document.root();
      // 完成处理
      o._statusFree = true;
      // 完成处理
      var event = o._event;
      event.connection = o;
      event.document = document;
      event.root = root;
      event.content = root;
      //event.parameters = o._parameters;
      //o.processLoadListener(event);
      event.dispose();
      // 异步处理后清空属性
      if (o._asynchronous) {
         o._input = null;
         o._inputNode = null;
         o._output = null;
         o._outputNode = null;
         //o._parameters = null;
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
