//import {CatmullRomCurve3} from './CatmullRomCurve3';

//export class ClosedSplineCurve3 extends CatmullRomCurve3 {
export class ClosedSplineCurve3 {
   public type;
   public closed;

   public constructor(points) {
      //super(points);
      this.type = 'catmullrom';
      this.closed = true;
   }
}