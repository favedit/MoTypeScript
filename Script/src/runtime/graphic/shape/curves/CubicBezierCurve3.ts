import {Point3} from '../../../common/math/Point3';
import {FCurve} from '../brep/FCurve';
import {RShape} from '../RShape';

export class CubicBezierCurve3 extends FCurve {

   public v0;
   public v1;
   public v2;
   public v3;

   public constructor(v0?:any, v1?:any, v2?:any, v3?:any) {
      super();
      this.v0 = v0;
      this.v1 = v1;
      this.v2 = v2;
      this.v3 = v3;
   }

   public getPoint(t): any {
      return new Point3(
         RShape.b3(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
         RShape.b3(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y),
         RShape.b3(t, this.v0.z, this.v1.z, this.v2.z, this.v3.z)
      )
   }
}