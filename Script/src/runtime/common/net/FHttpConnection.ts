import {FAttributes} from '../lang/FAttributes';
import {SEvent} from '../lang/SEvent';
import {FObject} from '../lang/FObject';
import {FError} from '../lang/FError';
import {RObject} from '../lang/RObject';
import {RLogger} from '../lang/RLogger';
import {EHttpMethod} from './EHttpMethod';
import {EHttpContent} from './EHttpContent';
import {EHttpStatus} from './EHttpStatus';

//==========================================================
// <T>页面通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
export class FHttpConnection extends FObject {
   // @attribute
   //_asynchronous = MO.Class.register(o, new MO.AGetSet('_asynchronous'), false);
   protected _asynchronous: boolean = false;
   protected _methodCd = EHttpMethod.Get;
   protected _contentCd = EHttpContent.Binary;
   protected _url = null;
   // @attribute
   //_heads = MO.Class.register(o, new MO.AGetter('_heads'));
   protected _linker = null;
   protected _heads = null;
   //_attributes = MO.Class.register(o, new MO.AGetter('_attributes'));
   protected _attributes = null;
   protected _input = null;
   //_inputData = MO.Class.register(o, new MO.AGetSet('_inputData'));
   protected _inputData = null;
   protected _output = null;
   //_outputData = MO.Class.register(o, new MO.AGetter('_outputData'));
   protected _outputData = null;
   // @attribute
   protected _handle = null;
   protected _contentLength = 0;
   protected _statusFree = true;
   protected _event = null;
   // @attribute
   //_listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   protected _listenersLoad = null;
   //_listenersComplete = MO.Class.register(o, new MO.AListener('_listenersComplete', MO.EEvent.Complete));
   protected _listenersComplete = null;

   //==========================================================
   // <T>响应链接发送处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionSend() {
      var o = this;
      var input = o._input;
      if (input) {
         if (input.constructor == String) {
            o._inputData = input;
            o._contentLength = input.length;
         } else if (input.constructor == ArrayBuffer) {
            o._inputData = input;
            o._contentLength = input.byteLength;
         } else {
            throw new FError(this, 'Unknown send data type.');
         }
      }
   }

   //==========================================================
   // <T>响应链接准备处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionReady() {
      var o = this._linker;
      if (o._asynchronous) {
         var handle = o._handle;
         if (handle.readyState == EHttpStatus.Loaded) {
            if (handle.status == 200) {
               o.setOutputData();
               o.onConnectionComplete();
            } else {
               RLogger.fatal(o, 'Connection failure. (url={1})', o._url);
            }
         }
      }
   }

   //==========================================================
   // <T>响应链接完成处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionComplete() {
      var o = this;
      o._statusFree = true;
      // 加载处理
      var event = o._event;
      event.connection = o;
      event.content = o._outputData;
      // 设置属性
      var attributes = o._attributes;
      var count = attributes.count();
      for (var i = 0; i < count; i++) {
         var name = attributes.name(i);
         var value = attributes.value(i);
         event[name] = value;
      }
      //o.processLoadListener(event);
      // 完成处理
      //o.processCompleteListener(event);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._heads = new FAttributes();
      this._attributes = new FAttributes();
      this._event = new SEvent(this);
      // 创建链接
      //var handle = this._handle = MO.Window.Xml.createConnection();
      //handle._linker = this;
      //handle.onreadystatechange = this.onConnectionReady;
   }

   //==========================================================
   // <T>获得头信息。</T>
   //
   // @method
   // @param name:String 名称
   // @return String 内容
   //==========================================================
   public header(name) {
      return this._heads.get(name);
   }

   //==========================================================
   // <T>设置头信息。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   //==========================================================
   public setHeader(name, value) {
      this._heads.set(name, value);
   }

   //==========================================================
   // <T>设置头信息集合。</T>
   //
   // @method
   //==========================================================
   public setHeaders() {
      var o = this;
      var handle = o._handle;
      // 传输格式
      if (o._contentCd == EHttpContent.Binary) {
         // 二进制内容
         //if (MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)) {
         //   handle.setRequestHeader('Accept-Charset', 'x-user-defined');
         //   handle.responseType = 'arraybuffer';
         //} else {
         //   handle.overrideMimeType('text/plain; charset=x-user-defined');
         //   if (o._asynchronous) {
         //      handle.responseType = 'arraybuffer';
         //   }
         //}
      } else {
         // 文本内容
         handle.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      }
      // 设置自定义头信息
      var heads = o._heads;
      var count = heads.count();
      if (count > 0) {
         // 设置头信息
         for (var i = 0; i < count; i++) {
            var headName = heads.name(i);
            var headValue = heads.value(i);
            handle.setRequestHeader(headName, headValue);
         }
      }
      // 数据长度
      //if (!MO.Window.Browser.isBrowser(MO.EBrowser.Chrome)) {
      //   var contentLength = o._contentLength;
      //   if (contentLength > 0) {
      //      handle.setRequestHeader('content-length', contentLength);
      //   }
      //}
   }

   //==========================================================
   // <T>设置接收信息。</T>
   //
   // @method
   //==========================================================
   public setOutputData() {
      var o = this;
      var handle = o._handle;
      // 传输格式
      if (o._contentCd == EHttpContent.Binary) {
         o._outputData = handle.response;
      } else {
         o._outputData = handle.responseText;
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @method
   // @return Object 内容
   //==========================================================
   public content() {
      return this._outputData;
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      // 重置链接
      this._handle.abort()
      // 清空属性
      this._attributes.clear();
      // 清空监听器
      //this.clearAllListeners();
   }

   //==========================================================
   // <T>同步发送页面请求。</T>
   //
   // @method
   //==========================================================
   public sendSync() {
      var o = this;
      var handle = o._handle;
      handle.open(o._methodCd, o._url, false);
      o.setHeaders();
      handle.send(o._inputData);
      o.setOutputData();
      o.onConnectionComplete();
      RLogger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
   }

   //==========================================================
   // <T>异步发送页面请求。</T>
   //
   // @method
   //==========================================================
   public sendAsync() {
      var handle = this._handle;
      handle.open(this._methodCd, this._url, true);
      this.setHeaders();
      handle.send(this._inputData);
      RLogger.info(this, 'Send http asynchronous request. (method={1}, url={2})', this._methodCd, this._url);
   }

   //==========================================================
   // <T>发送页面请求。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   //==========================================================
   public send(url, data) {
      var o = this;
      // 设置参数
      o._url = url;
      o._input = data;
      // 设置状态
      o._methodCd = (data != null) ? EHttpMethod.Post : EHttpMethod.Get;
      o._statusFree = false;
      // 发送信息
      o.onConnectionSend();
      if (o._asynchronous) {
         o.sendAsync();
      } else {
         o.sendSync();
      }
      return o.content();
   }

   //==========================================================
   // <T>发送页面请求。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   //==========================================================
   public send2(url, data) {
      var o = this;
      // 设置参数
      o._url = url;
      o._input = data;
      // 设置状态
      o._methodCd = EHttpMethod.Post;
      o._statusFree = false;
      // 发送信息
      o.onConnectionSend();
      if (o._asynchronous) {
         o.sendAsync();
      } else {
         o.sendSync();
      }
      return o.content();
   }

   //==========================================================
   // <T>发送页面请求。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   //==========================================================
   public dispose() {
      var o = this;
      // 释放属性
      o._heads = RObject.dispose(o._heads);
      o._attributes = RObject.dispose(o._attributes);
      o._event = RObject.dispose(o._event);
      o._input = null;
      o._inputData = null;
      o._output = null;
      o._outputData = null;
      var handle = o._handle;
      if (handle) {
         handle.onreadystatechange = null;
         o._handle = null;
      }
      // 父处理
      super.dispose();
   }
}
