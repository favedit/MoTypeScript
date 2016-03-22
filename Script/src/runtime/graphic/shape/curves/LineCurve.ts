import {SPoint2} from '../../../runtime/common/math/SPoint2';
import {Curve} from '../brep/Curve';

export class LineCurve extends Curve {
   public v1: any;
   public v2: any;

   public constructor(v1: any, v2: any) {
      super();
      this.v1 = v1;
      this.v2 = v2;
   }

   public getPoint(t) {
      var point = this.v2.clone().sub(this.v1);
      point.multiplyScalar(t).add(this.v1);
      return point;
   }

   public getPointAt(u) {
      return this.getPoint(u);
   }

   public getTangent(t) {
      var tangent = this.v2.clone().sub(this.v1);
      return tangent.normalize();
   }
}
