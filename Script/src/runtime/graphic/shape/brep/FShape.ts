import {FPath} from './FPath';

export class FShape extends FPath {

   public holes;

   public constructor() {
      super();
      this.holes = [];
   }

   // Convenience method to return ExtrudeGeometry
   public extrude(options) {
      //return new THREE.ExtrudeGeometry(this, options);
   }

   // Convenience method to return ShapeGeometry
   public makeGeometry = function(options) {
      //return new THREE.ShapeGeometry(this, options);
   }

   // Get points of holes
   public getPointsHoles(divisions) {
      var holesPts = [];
      for (var i = 0, l = this.holes.length; i < l; i++) {
         holesPts[i] = this.holes[i].getPoints(divisions);
      }
      return holesPts;
   }

   // Get points of shape and holes (keypoints based on segments parameter)
   public extractAllPoints(divisions) {
      return {
         shape: this.getPoints(divisions),
         holes: this.getPointsHoles(divisions)
      }
   }

   public extractPoints(divisions) {
      return this.extractAllPoints(divisions);
   }
}