import {Point2} from '../../../common/math/Point2';
import {FCurve} from '../brep/FCurve';
import {RCurve} from '../RCurve';
import {RShape} from '../RShape';

export class CubicBezierCurve extends FCurve {
   public v0;
   public v1;
   public v2;
   public v3;

   public constructor(v0, v1, v2, v3) {
      super();
      this.v0 = v0;
      this.v1 = v1;
      this.v2 = v2;
      this.v3 = v3;
   }

   public getPoint(t) {
      return new Point2(
         RShape.b3(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
         RShape.b3(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)
      )
   }

   public getTangent(t) {
      return new Point2(
         RCurve.tangentCubicBezier(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
         RCurve.tangentCubicBezier(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)
      ).normalize();
   }
}