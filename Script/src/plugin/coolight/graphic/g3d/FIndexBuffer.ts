import {FBuffer} from './FBuffer';
import {EIndexStride} from './EIndexStride';
import {EDrawMode} from './EDrawMode';

//==========================================================
// <T>渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export abstract class FIndexBuffer extends FBuffer {
   // 索引方式
   public strideCd: EIndexStride = EIndexStride.Uint16;
   // 总数
   public count: number = 0;
   // 绘制模式
   public drawModeCd: EDrawMode = EDrawMode.Triangles;
   // 线宽
   public lineWidth: number = 1;

   //==========================================================
   // <T>上传数据</T>
   //
   // @method
   // @param data:Uin16Array 数据
   // @param count:Integer 总数
   // @param remain:Boolean 保留数据
   //==========================================================
   public abstract upload(data: any, count?: number, remain?: boolean):void;
}
