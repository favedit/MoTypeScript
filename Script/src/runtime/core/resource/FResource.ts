import {FResourceObject} from './FResourceObject';

//==========================================================
// <T>资源对象。</T>
//
// @class
// @author maocy
// @version 150721
//==========================================================
export class FResource extends FResourceObject {
   // 类型代码
   public typeCode: string = null;
   // 版本号
   public version: number = null;

   //==========================================================
   // <T>加载内容。</T>
   //
   // @param content 内容
   //==========================================================
   public loadContent(content: any): void {
   }
}
