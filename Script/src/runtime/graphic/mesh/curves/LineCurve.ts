import {Curve} from '../brep/Curve';

export class LineCurve extends Curve {
   public v1;
   public v2;

   public constructor(v1, v2) {
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
