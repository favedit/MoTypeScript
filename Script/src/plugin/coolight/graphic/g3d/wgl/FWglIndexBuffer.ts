import {FError} from '../../../../../runtime/common/lang/FError';
import {FG3dIndexBuffer} from '../FG3dIndexBuffer';

//==========================================================
// <T>WebGL渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export class FWglIndexBuffer extends FG3dIndexBuffer {
   //..........................................................
   // @attribute
   protected _handle = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      var o = this;
      //o.__base.FG3dIndexBuffer.setup.call(o);
      o._handle = o._graphicContext._handle.createBuffer();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   public isValid() {
      var o = this;
      var handle = o._graphicContext._handle;
      return handle.isBuffer(o._handle);
   }

   //==========================================================
   // <T>上传数据</T>
   //
   // @method
   // @param data:Uin16Array 数据
   // @param count:Integer 总数
   // @param remain:Boolean 保留数据
   //==========================================================
   public upload(data, count, remain) {
      var EG3dIndexStride = EG3dIndexStride;
      var o = this;
      var context = o._graphicContext;
      var handle = context._handle;
      // 设置数据
      if (remain) {
         o._data = data;
      }
      o._count = count;
      // 获得数据
      var memory = null;
      if ((data.constructor == Array) || (data.constructor == ArrayBuffer)) {
         if (o._strideCd == EG3dIndexStride.Uint16) {
            memory = new Uint16Array(data);
         } else if (o._strideCd == EG3dIndexStride.Uint32) {
            memory = new Uint32Array(data);
         } else {
            throw new FError(o, 'Index stride is invalid.');
         }
      } else if (data.constructor == Uint16Array) {
         if (o._strideCd != EG3dIndexStride.Uint16) {
            throw new FError(o, 'Index stride16 is invalid.');
         }
         memory = data;
      } else if (data.constructor == Uint32Array) {
         if (o._strideCd != EG3dIndexStride.Uint32) {
            throw new FError(o, 'Index stride16 is invalid.');
         }
         memory = data;
      } else {
         throw new FError(o, 'Upload index data type is invalid. (value={1})', data);
      }
      // 上传数据
      handle.bindBuffer(handle.ELEMENT_ARRAY_BUFFER, o._handle);
      context.checkError('bindBuffer', 'Bind buffer failure.');
      handle.bufferData(handle.ELEMENT_ARRAY_BUFFER, memory, handle.STATIC_DRAW);
      context.checkError('bufferData', 'Upload buffer data. (count={1})', count);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      var context = o._graphicContext;
      // TODO：待优化
      // o._resource = null;
      // 释放对象
      var handle = o._handle;
      if (handle) {
         context._handle.deleteBuffer(handle);
         o._handle = null;
      }
      // 父处理
      super.dispose();
   }
}
