import {EHttpContent} from './EHttpContent';
import {FHttpConnection} from './FHttpConnection';

//==========================================================
// <T>配置通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
export class FJsonConnection extends FHttpConnection {
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
   // <T>事件响应处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionComplete() {
      this._statusFree = true;
      // 解析内容
      var content = null;
      var data = this._outputData;
      if (data) {
         content = this.content = JSON.parse(data);
      }
      // 加载处理
      var event = this._event;
      event.connection = this;
      event.data = data;
      event.content = content;
      this.loadListeners.process(event);
      // 完成处理
      this.completeListeners.process(event);
   }
}
