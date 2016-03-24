import {Fatal} from '../../../../runtime/common/lang/Fatal';
import {EIndexStride} from '../EIndexStride';
import {FIndexBuffer} from '../FIndexBuffer';


//==========================================================
// <T>WebGL渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export class FWglIndexBuffer extends FIndexBuffer {
   //..........................................................
   // @attribute
   public handle = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      var graphic = this.graphicContext.handle;
      this.handle = graphic.createBuffer();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   public isValid() {
      var graphic = this.graphicContext.handle;
      return graphic.isBuffer(this.handle);
   }

   //==========================================================
   // <T>上传数据</T>
   //
   // @method
   // @param data:Uin16Array 数据
   // @param count:Integer 总数
   // @param remain:Boolean 保留数据
   //==========================================================
   public upload(data: any, count?: number, remain: boolean = false): void {
      var context = this.graphicContext;
      var graphic = context.handle;
      // 设置数据
      if (remain) {
         this.data = data;
      }
      this.count = count;
      // 获得数据
      var memory = null;
      var dataClass = data.constructor;
      if ((dataClass == Array) || (dataClass == ArrayBuffer)) {
         if (this.strideCd == EIndexStride.Uint16) {
            memory = new Uint16Array(data);
         } else if (this.strideCd == EIndexStride.Uint32) {
            memory = new Uint32Array(data);
         } else {
            throw new Fatal(this, 'Index stride is invalid.');
         }
      } else if (dataClass == Uint16Array) {
         if (this.strideCd != EIndexStride.Uint16) {
            throw new Fatal(this, 'Index stride16 is invalid.');
         }
         memory = data;
      } else if (dataClass == Uint32Array) {
         if (this.strideCd != EIndexStride.Uint32) {
            throw new Fatal(this, 'Index stride16 is invalid.');
         }
         memory = data;
      } else {
         throw new Fatal(this, 'Upload index data type is invalid. (value={1})', data);
      }
      // 上传数据
      graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, this.handle);
      context.checkError('bindBuffer', 'Bind buffer failure.');
      graphic.bufferData(graphic.ELEMENT_ARRAY_BUFFER, memory, graphic.STATIC_DRAW);
      context.checkError('bufferData', 'Upload buffer data. (count={1})', count);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var graphic = this.graphicContext.handle;
      // TODO：待优化
      // o._resource = null;
      // 释放对象
      var handle = this.handle;
      if (handle) {
         graphic.deleteBuffer(handle);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
