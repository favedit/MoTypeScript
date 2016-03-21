import {SPoint3} from '../../common/math/SPoint3';
import {FCurve} from '../brep/FCurve';
import {RShape} from '../RShape';

export class FQuadraticBezierCurve3 extends FCurve {

   public v0;
   public v1;
   public v2;

   public constructor(v0, v1, v2) {
      super();
      this.v0 = v0;
      this.v1 = v1;
      this.v2 = v2;
   }

   public getPoint(t): any {
      return new SPoint3(
         RShape.b2(t, this.v0.x, this.v1.x, this.v2.x),
         RShape.b2(t, this.v0.y, this.v1.y, this.v2.y),
         RShape.b2(t, this.v0.z, this.v1.z, this.v2.z)
      )
   }
}