import {FObjects} from '../../../runtime/common/lang/FObjects';
import {SPoint3} from '../../../runtime/common/math/SPoint3';
import {SVertex} from '../../core/SVertex';
import {Curve} from '../brep/Curve';

//==========================================================
// <T>直线线段。</T>
//==========================================================
export class LineCurve3 extends Curve {
   // 开始点
   public start: SPoint3;
   // 结束点
   public end: SPoint3;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(start: SPoint3, end: SPoint3) {
      super();
      this.start = start;
      this.end = end;
   }

   //==========================================================
   // <T>输出所有点集合。</T>
   //==========================================================
   public writePoints(buffer: FObjects<SVertex>): void {
      buffer.push(this.start);
      buffer.push(this.end);
   }

   public a(t) {
      var vector = new SPoint3();
      //vector.subVectors(this.v2, this.v1);
      //vector.multiplyScalar(t);
      //vector.add(this.v1);
      return vector;
   }
}