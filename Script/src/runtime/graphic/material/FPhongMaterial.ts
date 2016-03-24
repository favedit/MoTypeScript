import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Color4} from '../../../runtime/common/math/Color4';
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
   public ambientColor: Color4;
   // 散射光颜色
   public diffuseColor: Color4;
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
      this.ambientColor = new Color4(0.4, 0.4, 0.4, 0.7);
      this.diffuseColor = new Color4(0.6, 0.6, 0.6, 0.6);
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
      this.ambientColor = ObjectUtil.dispose(this.ambientColor);
      this.diffuseColor = ObjectUtil.dispose(this.diffuseColor);
      // 父处理
      super.dispose();
   }
}