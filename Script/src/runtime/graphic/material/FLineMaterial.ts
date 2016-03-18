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
export class FLineMaterial extends FMaterial {
   // 线颜色
   protected _lineColor: SColor4;
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
      this._lineColor = new SColor4(1, 1, 1, 1);
      this.lineWidth = 1;
   }

   //==========================================================
   // <T>获得线颜色。</T>
   //
   // @return 颜色
   //==========================================================
   public get lineColor(): SColor4 {
      return this._lineColor;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this._lineColor = RObject.dispose(this._lineColor);
      // 父处理
      super.dispose();
   }
}