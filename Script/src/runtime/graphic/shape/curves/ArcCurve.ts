import {Curve} from '../brep/Curve';
import {EllipseCurve} from './EllipseCurve';

export class ArcCurve extends EllipseCurve {
   public constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
      super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
   }
}
