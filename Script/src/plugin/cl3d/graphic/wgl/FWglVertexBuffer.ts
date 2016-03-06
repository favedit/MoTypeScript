import {FError} from '../../../../runtime/common/lang/FError';
import {EAttributeFormat} from '../EAttributeFormat';
import {FVertexBuffer} from '../FVertexBuffer';

//==========================================================
// <T>WebGL渲染顶点流。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FWglVertexBuffer extends FVertexBuffer {
   // 句柄
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
   // @param data:Array 数据
   // @param stride:Integer 宽度
   // @param count:Integer 总数
   // @param remain:Boolean 保留数据
   //==========================================================
   public upload(data: any, stride: number = 0, count: number = 0, remain: boolean = false) {
      var context = this.graphicContext;
      var graphics = context.handle;
      // 设置数据
      if (remain) {
         this.data = data;
      }
      this.stride = stride;
      this.count = count;
      // 获得数据
      var arrays = null;
      var dataClass = data.constructor;
      if ((dataClass == Array) || (dataClass == ArrayBuffer)) {
         switch (this.formatCd) {
            case EAttributeFormat.Float1:
            case EAttributeFormat.Float2:
            case EAttributeFormat.Float3:
            case EAttributeFormat.Float4:
               arrays = new Float32Array(data);
               break;
            case EAttributeFormat.Byte4:
            case EAttributeFormat.Byte4Normal:
               arrays = new Uint8Array(data);
               break;
            default:
               throw new FError(this, 'Unknown data type.');
         }
      } else if (dataClass == Uint8Array) {
         arrays = data;
      } else if (dataClass == Float32Array) {
         arrays = data;
      } else {
         throw new FError(this, 'Upload vertex data type is invalid. (data={1})', data);
      }
      // 绑定数据
      graphics.bindBuffer(graphics.ARRAY_BUFFER, this.handle);
      context.checkError('bindBuffer', 'Bindbuffer');
      // 上传数据
      graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
      context.checkError('bufferData', 'bufferData');
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var graphic = this.graphicContext.handle;
      // TODO：待优化
      //this._resource = null;
      // 释放对象
      var buffer = this.handle;
      if (buffer) {
         graphic.deleteBuffer(buffer);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
