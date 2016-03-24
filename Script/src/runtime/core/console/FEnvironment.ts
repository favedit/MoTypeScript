import {ObjectBase} from '../../common/lang/ObjectBase';
import {FDictionary} from '../../common/lang/FDictionary';

//==========================================================
// <T>环境信息。</T>
//
// @class
// @author maocy
// @version 150606
//==========================================================
export class FEnvironment extends ObjectBase {
   // 名称
   public name: string = null;
   // 内容
   public value: string = null;

   //==========================================================
   // <T>设置内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //==========================================================
   public set(name: string, value: string) {
      this.name = name;
      this.value = value;
   }
}

