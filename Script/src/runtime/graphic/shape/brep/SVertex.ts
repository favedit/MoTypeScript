import {SPoint3} from '../../common/math/SPoint3';
import {SColor4} from '../../common/math/SColor4';

//==========================================================
// <T>点。</T>
//==========================================================
export class SVertex {
   // 默认颜色
   public static DefaultColor = new SColor4(1, 1, 1, 1);
   // 位置
   public position: SPoint3;
   // 颜色
   public color: SColor4;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(position: SPoint3, color?: SColor4) {
      this.position = position;
      this.color = color || SVertex.DefaultColor;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.position = null;
      this.color = null;
   }
}