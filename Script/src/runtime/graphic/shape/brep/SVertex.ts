import {Point3} from '../../common/math/Point3';
import {Color4} from '../../common/math/Color4';

//==========================================================
// <T>点。</T>
//==========================================================
export class SVertex {
   // 默认颜色
   public static DefaultColor = new Color4(1, 1, 1, 1);
   // 位置
   public position: Point3;
   // 颜色
   public color: Color4;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(position: Point3, color?: Color4) {
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