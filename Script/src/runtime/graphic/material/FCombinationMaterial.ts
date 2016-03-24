import {Objects} from '../../../runtime/common/lang/Objects';
import {RObject} from '../../../runtime/common/lang/RObject';
import {FMaterial} from './FMaterial';

//==========================================================
// <T>复合渲染材质。</T>
//
// @author maocy
// @history 160316
//==========================================================
export class FCombinationMaterial extends FMaterial {
   // 材质集合 
   protected _materials: Objects<FMaterial>;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性 
      this._materials = new Objects<FMaterial>();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this._materials = RObject.dispose(this._materials);
      // 父处理
      super.dispose();
   }
}