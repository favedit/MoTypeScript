import {FObjects} from '../../../../runtime/common/lang/FObjects';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {FG3dObject} from './FG3dObject';

//==========================================================
// <T>渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
export class FG3dLayout extends FG3dObject {
   // @attribute
   //o._buffers = MO.Class.register(o, new MO.AGetter('_buffers'));
   protected _buffers: FObjects = null;
   //o._samplers = MO.Class.register(o, new MO.AGetter('_samplers'));
   protected _samplers: FObjects = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   // @return TObjects 元素集合
   //==========================================================
   public constructor() {
      super()
      //o.__base.FG3dObject.construct.call(o);
   }

   //==========================================================
   // <T>关联取样集合。</T>
   //
   // @method
   // @param buffers:TObjects 取样集合
   //==========================================================
   public linkBuffers(buffers) {
      var o = this;
      if (!buffers.isEmpty()) {
         var items = o._buffers;
         if (!items) {
            items = o._buffers = new FObjects();
         }
         items.assign(buffers);
      }
   }

   //==========================================================
   // <T>绑定所有集合。</T>
   //
   // @method
   //==========================================================
   public bindBuffers() {
      var o = this;
      var context = o._graphicContext;
      var buffers = o._buffers;
      if (buffers) {
         var count = buffers.count();
         for (var i = 0; i < count; i++) {
            var buffer = buffers.at(i);
            context.bindVertexBuffer(buffer.slot, buffer.buffer, buffer.index, buffer.formatCd);
         }
      }
   }

   //==========================================================
   // <T>关联取样集合。</T>
   //
   // @method
   // @param samplers:TObjects 取样集合
   //==========================================================
   public linkSamplers(samplers) {
      var o = this;
      if (!samplers.isEmpty()) {
         var items = o._samplers;
         if (!items) {
            items = o._samplers = new FObjects();
         }
         items.assign(samplers);
      }
   }

   //==========================================================
   // <T>绑定所有集合。</T>
   //
   // @method
   //==========================================================
   public bindSamplers() {
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if (samplers) {
         var count = samplers.count();
         for (var i = 0; i < count; i++) {
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, sampler.texture);
         }
      }
   }

   //==========================================================
   // <T>绑定所有集合。</T>
   //
   // @method
   //==========================================================
   public unbindSamplers() {
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if (samplers) {
         var count = samplers.count();
         for (var i = 0; i < count; i++) {
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, null);
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放对象
      this._buffers = RObject.dispose(this._buffers);
      this._samplers = RObject.dispose(this._samplers);
      // 父处理
      super.dispose();
   }
}
