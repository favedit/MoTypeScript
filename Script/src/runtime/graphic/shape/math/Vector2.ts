/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

export class Vector2 {

   public x: number;

   public y: number;

   public constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
   }

   public get width(): number {
      return this.x;
   }

   public set width(value: number) {
      this.x = value;
   }

   public get height(): number {
      return this.y;
   }

   public set height(value: number) {
      this.y = value;
   }

   public set(x: number, y: number) {
      this.x = x;
      this.y = y;
      return this;
   }

   public setScalar(scalar: number) {
      this.x = scalar;
      this.y = scalar;
      return this;
   }

   public setX(x: number) {
      this.x = x;
      return this;
   }

   public setY(y: number) {
      this.y = y;
      return this;
   }

   public setComponent(index: number, value: number) {
      switch (index) {
         case 0: this.x = value; break;
         case 1: this.y = value; break;
         default: throw new Error('index is out of range: ' + index);
      }
   }

   public getComponent(index: number) {
      switch (index) {
         case 0: return this.x;
         case 1: return this.y;
         default: throw new Error('index is out of range: ' + index);
      }
   }

   public clone(): Vector2 {
      return new (this as any).constructor(this.x, this.y);
   }

   public copy(v): Vector2 {
      this.x = v.x;
      this.y = v.y;
      return this;
   }

   public add(v: Vector2, w?: Vector2): Vector2 {
      if (w !== undefined) {
         console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
         return this.addVectors(v, w);
      }
      this.x += v.x;
      this.y += v.y;
      return this;
   }

   public addScalar(s: number): Vector2 {
      this.x += s;
      this.y += s;
      return this;
   }

   public addVectors(a: Vector2, b: Vector2): Vector2 {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
   }

   public addScaledVector(v: Vector2, s: number): Vector2 {
      this.x += v.x * s;
      this.y += v.y * s;
      return this;
   }

   public sub(v: Vector2, w?: Vector2): Vector2 {
      if (w !== undefined) {
         console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
         return this.subVectors(v, w);
      }
      this.x -= v.x;
      this.y -= v.y;
      return this;
   }

   public subScalar(s: number): Vector2 {
      this.x -= s;
      this.y -= s;
      return this;
   }

   public subVectors(a: Vector2, b: Vector2): Vector2 {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
   }

   public multiply(v: Vector2): Vector2 {
      this.x *= v.x;
      this.y *= v.y;
      return this;
   }

   public multiplyScalar(scalar: number): Vector2 {
      if (isFinite(scalar)) {
         this.x *= scalar;
         this.y *= scalar;
      } else {
         this.x = 0;
         this.y = 0;
      }
      return this;
   }

   public divide(v: Vector2): Vector2 {
      this.x /= v.x;
      this.y /= v.y;
      return this;
   }

   public divideScalar(scalar: number): Vector2 {
      return this.multiplyScalar(1 / scalar);
   }

   public min(v: Vector2): Vector2 {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      return this;
   }

   public max(v: Vector2): Vector2 {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      return this;
   }

   public clamp(min: Vector2, max: Vector2): Vector2 {
      // This function assumes min < max, if this assumption isn't true it will not operate correctly
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      return this;
   }

   private _clampScalar_min: Vector2;
   private _clampScalar_max: Vector2;
   public clampScalar(minVal, maxVal): Vector2 {
      if (this.min === undefined) {
         this._clampScalar_min = new Vector2();
         this._clampScalar_max = new Vector2();
      }
      this._clampScalar_min.set(minVal, minVal);
      this._clampScalar_max.set(maxVal, maxVal);
      return this.clamp(this._clampScalar_min, this._clampScalar_max);
   }

   public clampLength(min: number, max: number): Vector2 {
      var length = this.length();
      this.multiplyScalar(Math.max(min, Math.min(max, length)) / length);
      return this;
   }

   public floor(): Vector2 {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
   }

   public ceil(): Vector2 {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
   }

   public round(): Vector2 {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
   }

   public roundToZero(): Vector2 {
      this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
      return this;
   }

   public negate(): Vector2 {
      this.x = - this.x;
      this.y = - this.y;
      return this;
   }

   public dot(v: Vector2): number {
      return this.x * v.x + this.y * v.y;
   }

   public lengthSq(): number {
      return this.x * this.x + this.y * this.y;
   }

   public length(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
   }

   public lengthManhattan(): number {
      return Math.abs(this.x) + Math.abs(this.y);
   }

   public normalize(): Vector2 {
      return this.divideScalar(this.length());
   }

   public angle(): number {
      // computes the angle in radians with respect to the positive x-axis
      var angle = Math.atan2(this.y, this.x);
      if (angle < 0) angle += 2 * Math.PI;
      return angle;
   }

   public distanceTo(v: Vector2): number {
      return Math.sqrt(this.distanceToSquared(v));
   }

   public distanceToSquared(v: Vector2): number {
      var dx = this.x - v.x, dy = this.y - v.y;
      return dx * dx + dy * dy;
   }

   public setLength(length: number): Vector2 {
      return this.multiplyScalar(length / this.length());
   }

   public lerp(v: Vector2, alpha: number): Vector2 {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
   }

   public lerpVectors(v1: Vector2, v2: Vector2, alpha: number): Vector2 {
      this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
      return this;
   }

   public equals(v: Vector2): boolean {
      return (v.x === this.x) && (v.y === this.y);
   }

   public fromArray(array: Array<number>, offset: number): Vector2 {
      if (offset === undefined) {
         offset = 0;
      }
      this.x = array[offset];
      this.y = array[offset + 1];
      return this;
   }

   public toArray(array: Array<number>, offset: number): Array<number> {
      if (array === undefined) {
         array = [];
      }
      if (offset === undefined) {
         offset = 0;
      }
      array[offset] = this.x;
      array[offset + 1] = this.y;
      return array;
   }

   public fromAttribute(attribute: any, index: number, offset: number): Vector2 {
      if (offset === undefined) {
         offset = 0;
      }
      index = index * attribute.itemSize + offset;
      this.x = attribute.array[index];
      this.y = attribute.array[index + 1];
      return this;
   }

   public rotateAround(center: Vector2, angle: number): Vector2 {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var x = this.x - center.x;
      var y = this.y - center.y;
      this.x = x * c - y * s + center.x;
      this.y = x * s + y * c + center.y;
      return this;
   }
}
