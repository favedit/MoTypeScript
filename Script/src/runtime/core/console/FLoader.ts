import {EDataContent} from '../../common/lang/EDataContent';
import {FObject} from '../../common/lang/FObject';

//==========================================================
// <T>加载器。</T>
//
// @class
// @author maocy
// @version 160306
//==========================================================
export abstract class FLoader extends FObject {
   // 内容类型
   public contentCd: EDataContent = EDataContent.Unknown;
   // 内容
   public content: any = null;
   // 数据
   public data: any = null;
   // 网络地址
   public url: string = null;

   //==========================================================
   // <T>数据处理。</T>
   //==========================================================
   public abstract process(): void;
}