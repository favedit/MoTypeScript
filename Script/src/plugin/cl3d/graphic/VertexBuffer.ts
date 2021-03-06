import {Buffer} from './Buffer';
import {AttributeFormatEnum} from './AttributeFormatEnum';

//==========================================================
// <T>渲染顶点流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export abstract class VertexBuffer extends Buffer {
   // 格式
   public formatCd = AttributeFormatEnum.Unknown;
   // 位宽
   public stride = 0;
   // 总数
   public count = 0;

   //==========================================================
   // <T>上传数据</T>
   //
   // @param data 数据
   //==========================================================
   public abstract upload(data: any, stride?: number, count?: number, remain?: boolean): void;
}
