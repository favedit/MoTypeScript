import {Vector2} from './Vector2';

/**
 * @author bhouston / http://clara.io
 */
export class Box2 {

   public min;

   public max;

   public constructor(min, max) {
      this.min = (min !== undefined) ? min : new Vector2(+ Infinity, + Infinity);
      this.max = (max !== undefined) ? max : new Vector2(- Infinity, - Infinity);
   }

   public set(min, max) {
      this.min.copy(min);
      this.max.copy(max);
      return this;
   }

   public setFromPoints(points) {
      this.makeEmpty();
      for (var i = 0, il = points.length; i < il; i++) {
         this.expandByPoint(points[i]);
      }
      return this;
   }

   private _setFromCenterAndSize_v1 = new Vector2();
   public setFromCenterAndSize(center, size) {
      var halfSize = this._setFromCenterAndSize_v1.copy(size).multiplyScalar(0.5);
      this.min.copy(center).sub(halfSize);
      this.max.copy(center).add(halfSize);
      return this;
   }

   public clone() {
      return new (this as any).constructor().copy(this);
   }

   public copy(box) {
      this.min.copy(box.min);
      this.max.copy(box.max);
      return this;
   }

   public makeEmpty() {
      this.min.x = this.min.y = + Infinity;
      this.max.x = this.max.y = - Infinity;
      return this;
   }

   public puisEmpty() {
      // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
      return (this.max.x < this.min.x) || (this.max.y < this.min.y);
   }

   public center(optionalTarget) {
      var result = optionalTarget || new Vector2();
      return result.addVectors(this.min, this.max).multiplyScalar(0.5);
   }

   public size(optionalTarget) {
      var result = optionalTarget || new Vector2();
      return result.subVectors(this.max, this.min);
   }

   public expandByPoint(point) {
      this.min.min(point);
      this.max.max(point);
      return this;
   }

   public expandByVector(vector) {
      this.min.sub(vector);
      this.max.add(vector);
      return this;
   }

   public expandByScalar(scalar) {
      this.min.addScalar(- scalar);
      this.max.addScalar(scalar);
      return this;
   }

   public containsPoint(point) {
      if (point.x < this.min.x || point.x > this.max.x ||
         point.y < this.min.y || point.y > this.max.y) {
         return false;
      }
      return true;
   }

   public containsBox(box) {
      if ((this.min.x <= box.min.x) && (box.max.x <= this.max.x) &&
         (this.min.y <= box.min.y) && (box.max.y <= this.max.y)) {
         return true;
      }
      return false;
   }

   public getParameter(point, optionalTarget) {
      // This can potentially have a divide by zero if the box
      // has a size dimension of 0.
      var result = optionalTarget || new Vector2();
      return result.set(
         (point.x - this.min.x) / (this.max.x - this.min.x),
         (point.y - this.min.y) / (this.max.y - this.min.y)
      );
   }

   public intersectsBox(box) {
      // using 6 splitting planes to rule out intersections.
      if (box.max.x < this.min.x || box.min.x > this.max.x ||
         box.max.y < this.min.y || box.min.y > this.max.y) {
         return false;
      }
      return true;
   }

   public clampPoint(point, optionalTarget) {
      var result = optionalTarget || new Vector2();
      return result.copy(point).clamp(this.min, this.max);
   }

   private _distanceToPoint_v1 = new Vector2();
   public distanceToPoint(point) {
      var clampedPoint = this._distanceToPoint_v1.copy(point).clamp(this.min, this.max);
      return clampedPoint.sub(point).length();
   };

   public intersect(box) {
      this.min.max(box.min);
      this.max.min(box.max);
      return this;
   }

   public union(box) {
      this.min.min(box.min);
      this.max.max(box.max);
      return this;
   }

   public translate(offset) {
      this.min.add(offset);
      this.max.add(offset);
      return this;
   }

   public equals(box) {
      return box.min.equals(this.min) && box.max.equals(this.max);
   }
}
