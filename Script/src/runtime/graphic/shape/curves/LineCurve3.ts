import {Objects} from '../../../runtime/common/lang/Objects';
import {Point3} from '../../../runtime/common/math/Point3';
import {SVertex} from '../brep/SVertex';
import {FCurve} from '../brep/FCurve';

//==========================================================
// <T>直线线段。</T>
//==========================================================
export class LineCurve3 extends FCurve {
   // 开始点
   public start: Point3;
   // 结束点
   public end: Point3;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(start: Point3, end: Point3) {
      super();
      this.start = start;
      this.end = end;
   }

   //==========================================================
   // <T>输出所有点集合。</T>
   //==========================================================
   public writePoints(buffer: Objects<SVertex>): void {
      //buffer.push(this.start);
      //buffer.push(this.end);
   }

   public a(t) {
      var vector = new Point3();
      //vector.subVectors(this.v2, this.v1);
      //vector.multiplyScalar(t);
      //vector.add(this.v1);
      return vector;
   }
}