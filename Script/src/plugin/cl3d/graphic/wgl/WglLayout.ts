import {Layout} from '../Layout';

//==========================================================
// <T>WebGL渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
export class WglLayout extends Layout {
   // 句柄
   public handle: any;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      // 创建层
      this.handle = this._graphicContext.createVertexArrayObject();
   }

   //==========================================================
   // <T>绑定处理。</T>
   //
   // @method
   //==========================================================
   public bind() {
      this._graphicContext.bindVertexArrayObject(this.handle);
   }

   //==========================================================
   // <T>解除绑定处理。</T>
   //
   // @method
   //==========================================================
   public unbind() {
      this._graphicContext.bindVertexArrayObject(null);
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   public active() {
      this._graphicContext.bindVertexArrayObject(this.handle);
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   public deactive() {
      this._graphicContext.bindVertexArrayObject(null);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放对象
      var handle = this.handle;
      if (handle) {
         this._graphicContext.deleteVertexArrayObject(handle);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
