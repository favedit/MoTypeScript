import {FObjects} from '../../../runtime/common/lang/FObjects';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SColor4} from '../../../runtime/common/math/SColor4';
import {FMaterial} from './FMaterial';

//==========================================================
// <T>复合渲染材质。</T>
//
// @author maocy
// @history 160316
//==========================================================
export class FPhongMaterial extends FMaterial {
   // 环境光颜色
   protected _ambientColor: SColor4;
   // 散射光颜色
   protected _diffuseColor: SColor4;
   // 高光级别
   public specularPower: number;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._ambientColor = new SColor4();
      this._diffuseColor = new SColor4();
      this.specularPower = 16;
   }

   //==========================================================
   // <T>获得环境光颜色。</T>
   //
   // @return 颜色
   //==========================================================
   public get ambientColor() {
      return this._ambientColor;
   }

   //==========================================================
   // <T>获得散射光颜色。</T>
   //
   // @return 颜色
   //==========================================================
   public get diffuseColor() {
      return this._diffuseColor;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this._ambientColor = RObject.dispose(this._ambientColor);
      this._diffuseColor = RObject.dispose(this._diffuseColor);
      // 父处理
      super.dispose();
   }
}