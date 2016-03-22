import {FDictionary} from '../../../runtime/common/lang/FDictionary';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SColor4} from '../../../runtime/common/math/SColor4';
import {FMaterial} from './FMaterial';
import {FTexture} from './FTexture';

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
   public ambientColor: SColor4;
   // 散射光颜色
   public diffuseColor: SColor4;
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
      this.effectCode = 'phong.automatic';
      this.alphaBase = 0.1;
      this.alphaRate = 1;
      this.ambientColor = new SColor4(0.4, 0.4, 0.4, 0.7);
      this.diffuseColor = new SColor4(0.6, 0.6, 0.6, 0.6);
      this.specularPower = 32;
   }

   //==========================================================
   // <T>重置内容。</T>
   //==========================================================
   public reset() {
      super.reset();
      this.alphaBase = 0.1;
      this.alphaRate = 1;
      this.ambientColor.set(1, 1, 1, 0.7);
      this.diffuseColor.set(1, 1, 1, 0.6);
      this.specularPower = 32;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this.ambientColor = RObject.dispose(this.ambientColor);
      this.diffuseColor = RObject.dispose(this.diffuseColor);
      // 父处理
      super.dispose();
   }
}