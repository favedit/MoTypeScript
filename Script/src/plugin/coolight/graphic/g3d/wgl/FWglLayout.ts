import {FG3dLayout} from '../FG3dLayout';

//==========================================================
// <T>WebGL渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
export class FWglLayout extends FG3dLayout {
   // @attribute
   protected _handle = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      var o = this;
      //o.__base.FG3dLayout.setup.call(o);
      // 创建层
      var c = o._graphicContext;
      o._handle = c._handleLayout.createVertexArrayOES();
   }

   //==========================================================
   // <T>绑定处理。</T>
   //
   // @method
   //==========================================================
   public bind() {
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(o._handle);
   }

   //==========================================================
   // <T>解除绑定处理。</T>
   //
   // @method
   //==========================================================
   public unbind() {
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(null);
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   public active() {
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(o._handle);
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   public deactive() {
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(null);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      var c = o._graphicContext;
      // 释放对象
      var layout = o._handle;
      if (layout) {
         c._handleLayout.deleteVertexArrayOES(layout);
         o._handle = null;
      }
      // 父处理
      super.dispose();
   }
}
