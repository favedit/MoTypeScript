import {SPoint2} from '../../common/math/SPoint2';
import {RCurve} from '../RCurve';
import {RShape} from '../RShape';
import {FCurve} from '../brep/FCurve';

export class FQuadraticBezierCurve extends FCurve {
   public v0;
   public v1;
   public v2;

   public constructor(v0, v1, v2) {
      super();
      this.v0 = v0;
      this.v1 = v1;
      this.v2 = v2;
   }

   public getPoint(t) {
      return new SPoint2(
         RShape.b2(t, this.v0.x, this.v1.x, this.v2.x),
         RShape.b2(t, this.v0.y, this.v1.y, this.v2.y)
      )
   }

   public getTangent(t) {
      return new SPoint2(
         RCurve.tangentQuadraticBezier(t, this.v0.x, this.v1.x, this.v2.x),
         RCurve.tangentQuadraticBezier(t, this.v0.y, this.v1.y, this.v2.y)
      ).normalize();
   }
}