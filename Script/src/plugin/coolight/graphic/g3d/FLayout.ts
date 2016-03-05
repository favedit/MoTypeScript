import {FObjects} from '../../../../runtime/common/lang/FObjects';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {FContent} from './FContent';

//==========================================================
// <T>渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
export class FLayout extends FContent {
   // 缓冲集合
   public _buffers: FObjects<any> = null;
   // 取样集合
   public _samplers: FObjects<any> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   // @return TObjects 元素集合
   //==========================================================
   public constructor() {
      super()
   }

   //==========================================================
   // <T>关联取样集合。</T>
   //
   // @method
   // @param buffers:TObjects 取样集合
   //==========================================================
   public linkBuffers(buffers) {
      if (!buffers.isEmpty()) {
         var items = this._buffers;
         if (!items) {
            items = this._buffers = new FObjects();
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
      var context = this.graphicContext;
      var buffers = this._buffers;
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
      if (!samplers.isEmpty()) {
         var items = this._samplers;
         if (!items) {
            items = this._samplers = new FObjects();
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
      var context = this.graphicContext;
      var samplers = this._samplers;
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
      var context = this.graphicContext;
      var samplers = this._samplers;
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
