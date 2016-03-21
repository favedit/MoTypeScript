import {FCurve} from '../brep/FCurve';
import {FEllipseCurve} from './FEllipseCurve';

export class ArcCurve extends FEllipseCurve {
   public constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
      super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
   }
}
