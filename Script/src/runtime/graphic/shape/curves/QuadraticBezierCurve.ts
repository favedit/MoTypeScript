import {SPoint2} from '../../common/math/SPoint2';
import {CurveUtils} from '../CurveUtils';
import {ShapeUtils} from '../ShapeUtils';
import {Curve} from '../brep/Curve';

export class QuadraticBezierCurve extends Curve {
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
      // return new SPoint2(
      //    ShapeUtils.b2(t, this.v0.x, this.v1.x, this.v2.x),
      //    ShapeUtils.b2(t, this.v0.y, this.v1.y, this.v2.y)
      // )
   }

   public getTangent(t) {
      return new SPoint2(
         CurveUtils.tangentQuadraticBezier(t, this.v0.x, this.v1.x, this.v2.x),
         CurveUtils.tangentQuadraticBezier(t, this.v0.y, this.v1.y, this.v2.y)
      ).normalize();
   };
}