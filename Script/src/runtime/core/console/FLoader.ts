import {FObject} from '../../common/lang/FObject';

//==========================================================
// <T>加载器。</T>
//
// @class
// @author maocy
// @version 160306
//==========================================================
export abstract class FLoader extends FObject {
   // @attribute
   public url: any = null;
   // @attribute
   public content: any = null;
   // @attribute
   public data: any = null;

   //==========================================================
   // <T>数据处理。</T>
   //==========================================================
   public abstract process(): void;
}