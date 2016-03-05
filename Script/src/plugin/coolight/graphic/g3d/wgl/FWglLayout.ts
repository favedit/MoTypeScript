import {FLayout} from '../FLayout';

//==========================================================
// <T>WebGL渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
export class FWglLayout extends FLayout {
   // 句柄
   public handle = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      // 创建层
      var context = this.graphicContext;
      this.handle = context._handleLayout.createVertexArrayOES();
   }

   //==========================================================
   // <T>绑定处理。</T>
   //
   // @method
   //==========================================================
   public bind() {
      var context = this.graphicContext;
      context._handleLayout.bindVertexArrayOES(this.handle);
   }

   //==========================================================
   // <T>解除绑定处理。</T>
   //
   // @method
   //==========================================================
   public unbind() {
      var context = this.graphicContext;
      context._handleLayout.bindVertexArrayOES(null);
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   public active() {
      var context = this.graphicContext;
      context._handleLayout.bindVertexArrayOES(this.handle);
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   public deactive() {
      var context = this.graphicContext;
      context._handleLayout.bindVertexArrayOES(null);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var context = this.graphicContext;
      // 释放对象
      var layout = this.handle;
      if (layout) {
         context._handleLayout.deleteVertexArrayOES(layout);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
