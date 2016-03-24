import {Buffer} from './Buffer';
import {IndexStrideEnum} from './IndexStrideEnum';
import {DrawModeEnum} from './DrawModeEnum';

//==========================================================
// <T>渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export abstract class IndexBuffer extends Buffer {
   // 索引方式
   public strideCd: IndexStrideEnum = IndexStrideEnum.Uint16;
   // 总数
   public count: number = 0;
   // 绘制模式
   public drawModeCd: DrawModeEnum = DrawModeEnum.Triangles;
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
