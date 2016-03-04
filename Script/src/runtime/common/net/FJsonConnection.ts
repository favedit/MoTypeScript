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
   //..........................................................
   // @attribute
   protected _contentCd = EHttpContent.Text;
   // @attribute
   protected _content = null;

   //==========================================================
   // <T>事件响应处理。</T>
   //
   // @method
   //==========================================================
   public onConnectionComplete() {
      var o = this;
      o._statusFree = true;
      // 解析内容
      var content = null;
      var data = o._outputData;
      if (data) {
         //content = o._content = JSON.parse(data);
      }
      // 加载处理
      var event = o._event;
      event.connection = o;
      event.data = data;
      event.content = content;
      //o.processLoadListener(event);
      // 完成处理
      //o.processCompleteListener(event);
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return Object 内容
   //==========================================================
   public content() {
      return this._content;
   }
}
