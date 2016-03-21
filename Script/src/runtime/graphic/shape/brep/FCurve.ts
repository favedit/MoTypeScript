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
   // <T>返回在curve对象上t点(取值范围0.0-1.0之间)的矢量。</T>
   // <P>取值范围是 0.0 - 1.0,将曲线作为一个整体,一个点在这个整体的位置。</P>
   // <P>虚基类方法,需要在子类中重写具体实现。</P>
   //
   // @param t 取值范围是0.0 - 1.0,将曲线作为一个整体,一个点在这个整体的位置
   //==========================================================
   public getPoint(t): any {
      return null;
   }

   //==========================================================
   // <T>法获得一个点u在曲线上的相对位置,用弧长表示。</T>
   //
   // @param u 表示距离,通过调用getUtoTmapping方法,换算成t
   // @return 返回点u在曲线上的相对位置,用弧长表示
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
