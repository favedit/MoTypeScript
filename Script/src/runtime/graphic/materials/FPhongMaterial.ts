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
   // 透明基础
   public alphaBase: number;
   // 透明比率
   public alphaRate: number;
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
      this.code = "phong";
      this.alphaBase = 0.1;
      this.alphaRate = 1;
      this._ambientColor = new SColor4(0.7, 0.7, 0.7, 0.7);
      this._diffuseColor = new SColor4(0.6, 0.6, 0.6, 0.6);
      this.specularPower = 32;
   }

   //==========================================================
   // <T>获得环境光颜色。</T>
   //
   // @return 颜色
   //==========================================================
   public get ambientColor(): SColor4 {
      return this._ambientColor;
   }

   //==========================================================
   // <T>获得散射光颜色。</T>
   //
   // @return 颜色
   //==========================================================
   public get diffuseColor(): SColor4 {
      return this._diffuseColor;
   }

   //==========================================================
   // <T>重置内容。</T>
   //==========================================================
   public reset() {
      super.reset();
      this.alphaBase = 0.1;
      this.alphaRate = 1;
      this._ambientColor.set(1, 1, 1, 0.7);
      this._diffuseColor.set(1, 1, 1, 0.6);
      this.specularPower = 32;
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