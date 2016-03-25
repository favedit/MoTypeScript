import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Color4} from '../../../runtime/common/math/Color4';
import {Material} from './Material';

//==========================================================
// <T>复合渲染材质。</T>
//
// @author maocy
// @history 160316
//==========================================================
export class LineMaterial extends Material {
   // 线颜色
   public lineColor: Color4;
   // 线宽度
   public lineWidth: number;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.code = "line";
      this.effectCode = 'line.automatic';
      this.lineColor = new Color4(1, 1, 1, 1);
      this.lineWidth = 1;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this.lineColor = ObjectUtil.dispose(this.lineColor);
      // 父处理
      super.dispose();
   }
}