import {SVector3} from '../../common/math/SVector3';
import {Curve} from './Curve';

export class CurvePath {

   public curves;
   public autoClose;
   public cacheLengths;

   public constructor() {
      this.curves = [];
      this.autoClose = false; // Automatically closes the path
   }

   public add(curve) {
      this.curves.push(curve);
   };

   public closePath() {
      var startPoint = this.curves[0].getPoint(0);
      var endPoint = this.curves[this.curves.length - 1].getPoint(1);
      if (!startPoint.equals(endPoint)) {
         //this.curves.push(new THREE.LineCurve(endPoint, startPoint));
      }
   }

   // To get accurate point with reference to
   // entire path distance at time t,
   // following has to be done:
   // 1. Length of each sub path have to be known
   // 2. Locate and identify type of curve
   // 3. Get t for the curve
   // 4. Return curve.getPointAt(t')
   public getPoint(t) {
      var d = t * this.getLength();
      var curveLengths = this.getCurveLengths();
      var i = 0;
      // To think about boundaries points.
      while (i < curveLengths.length) {
         if (curveLengths[i] >= d) {
            var diff = curveLengths[i] - d;
            var curve = this.curves[i];
            var u = 1 - diff / curve.getLength();
            return curve.getPointAt(u);
         }
         i++;
      }
      return null;
      // loop where sum != 0, sum > d , sum+1 <d
   }

   /*
   THREE.CurvePath.prototype.getTangent = function( t ) {
   };
   */

   // We cannot use the default THREE.Curve getPoint() with getLength() because in
   // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
   // getPoint() depends on getLength
   public getLength() {
      var lens = this.getCurveLengths();
      return lens[lens.length - 1];
   }

   // Compute lengths and cache them
   // We cannot overwrite getLengths() because UtoT mapping uses it.
   public getCurveLengths() {
      // We use cache values if curves and cache array are same length
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length) {
         return this.cacheLengths;
      }
      // Get length of sub-curve
      // Push sums into cached array
      var lengths = [], sums = 0;
      for (var i = 0, l = this.curves.length; i < l; i++) {
         sums += this.curves[i].getLength();
         lengths.push(sums);
      }
      this.cacheLengths = lengths;
      return lengths;
   }

   /**************************************************************
    *	Create Geometries Helpers
    **************************************************************/
   /// Generate geometry from path points (for Line or Points objects)
   public createPointsGeometry(divisions) {
      // var pts = this.getPoints(divisions);
      // return this.createGeometry(pts);
   }

   // Generate geometry from equidistant sampling along the path
   public createSpacedPointsGeometry(divisions) {
      // var pts = this.getSpacedPoints(divisions);
      // return this.createGeometry(pts);
   }

   public createGeometry(points) {
      // var geometry = new THREE.Geometry();
      // for (var i = 0, l = points.length; i < l; i++) {
      //    var point = points[i];
      //    geometry.vertices.push(new SVector3(point.x, point.y, point.z || 0));
      // }
      // return geometry;
   }
}