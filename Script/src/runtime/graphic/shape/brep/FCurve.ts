//import {FObjects} from '../../common/lang/FObjects';
//import {SVertex} from '../core/SVertex';

//==========================================================
// <T>线段。</T>
//==========================================================
export abstract class FCurve {

   private __arcLengthDivisions;
   public needsUpdate;
   public cacheArcLengths;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
   }

   //==========================================================
   // <T>获得点信息。</T>
   // <P>percent：0~1之间，比率</P>
   //==========================================================
   public getPoint(percent): any {
      return null;
   }

   //==========================================================
   // <T>获得点信息。</T>
   // <P>percent：0~1之间，比率</P>
   //==========================================================
   public getPointAt(u) {
      var t = this.getUtoTmapping(u);
      return this.getPoint(t);
   }

   //==========================================================
   // <T>获得点集合。</T>
   //==========================================================
   public getPoints(divisions) {
      if (!divisions) divisions = 5;
      var d, pts = [];
      for (d = 0; d <= divisions; d++) {
         pts.push(this.getPoint(d / divisions));
      }
      return pts;
   }

   //==========================================================
   // <T>获得空间点集合。</T>
   //==========================================================
   public getSpacedPoints(divisions) {
      if (!divisions) divisions = 5;
      var d, pts = [];
      for (d = 0; d <= divisions; d++) {
         pts.push(this.getPointAt(d / divisions));
      }
      return pts;
   }

   //==========================================================
   // <T>获得长度。</T>
   //==========================================================
   public getLength() {
      var lengths = this.getLengths();
      return lengths[lengths.length - 1];
   }

   //==========================================================
   // <T>获得长度集合。</T>
   //==========================================================
   public getLengths(divisions?: any) {
      if (!divisions) {
         divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions) : 200;
      }
      if (this.cacheArcLengths && (this.cacheArcLengths.length === divisions + 1) && !this.needsUpdate) {
         return this.cacheArcLengths;
      }
      this.needsUpdate = false;
      var cache = [];
      var current, last = this.getPoint(0);
      var p, sum = 0;
      cache.push(0);
      for (p = 1; p <= divisions; p++) {
         current = this.getPoint(p / divisions);
         sum += current.distanceTo(last);
         cache.push(sum);
         last = current;
      }
      this.cacheArcLengths = cache;
      return cache;
   }

   //==========================================================
   // <T>更新长度集合。</T>
   //==========================================================
   public updateArcLengths() {
      this.needsUpdate = true;
      this.getLengths();
   }

   //==========================================================
   // <T>获得点映射。</T>
   //==========================================================
   public getUtoTmapping(u, distance?: any) {
      var arcLengths = this.getLengths();
      var i = 0, il = arcLengths.length;
      var targetArcLength;
      if (distance) {
         targetArcLength = distance;
      } else {
         targetArcLength = u * arcLengths[il - 1];
      }
      var low = 0, high = il - 1, comparison;
      while (low <= high) {
         i = Math.floor(low + (high - low) / 2);
         comparison = arcLengths[i] - targetArcLength;
         if (comparison < 0) {
            low = i + 1;
         } else if (comparison > 0) {
            high = i - 1;
         } else {
            high = i;
            break;
         }
      }
      i = high;
      if (arcLengths[i] === targetArcLength) {
         var t = i / (il - 1);
         return t;
      }
      var lengthBefore = arcLengths[i];
      var lengthAfter = arcLengths[i + 1];
      var segmentLength = lengthAfter - lengthBefore;
      var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
      var t = (i + segmentFraction) / (il - 1);
      return t;
   }

   //==========================================================
   // <T>获得方向。</T>
   //==========================================================
   public getTangent(t) {
      var delta = 0.0001;
      var t1 = t - delta;
      var t2 = t + delta;
      // Capping in case of danger
      if (t1 < 0) t1 = 0;
      if (t2 > 1) t2 = 1;
      var pt1 = this.getPoint(t1);
      var pt2 = this.getPoint(t2);
      var vec = pt2.clone().sub(pt1);
      return vec.normalize();
   }

   //==========================================================
   // <T>获得方向位置。</T>
   //==========================================================
   public getTangentAt(u) {
      var t = this.getUtoTmapping(u);
      return this.getTangent(t);
   }
}
