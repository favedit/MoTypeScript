import {Objects} from '../../common/lang/Objects';
import {Vector3} from '../../common/math/Vector3';
import {Color4} from '../../common/math/Color4';
import {ClassUtil} from '../../common/reflect/ClassUtil';

//==========================================================
// <T>三点面。</T>
//
// @author maocy
// @history 160318
//==========================================================
export class SFace3 {
   public a: number;
   public b: number;
   public c: number;
   public materialIndex: number;
   public normal: Vector3;
   public color: Color4;
   public vertexNormals: Array<Vector3>;
   public vertexColors: Array<Color4>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(a, b, c, normal?: any, color?: any, materialIndex: number = 0) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.normal = new Vector3();
      this.vertexNormals = new Array<Vector3>();
      this.color = new Color4();
      this.vertexColors = new Array<Color4>();
      this.materialIndex = materialIndex;
   }

   public assign(value: SFace3) {
      this.a = value.a;
      this.b = value.b;
      this.c = value.c;
      this.normal.assign(value.normal);
      this.color.assign(value.color);
      this.materialIndex = value.materialIndex;
      //for (var i = 0, il = value.vertexNormals.length; i < il; i++) {
      //  this.vertexNormals[i] = value.vertexNormals[i].clone();
      //}
      //for (var i = 0, il = value.vertexColors.length; i < il; i++) {
      //   this.vertexColors[i] = value.vertexColors[i].clone();
      //}
      return this;
   }

   public clone() {
      var instance = ClassUtil.create(SFace3);
      return instance.assign(this);
   }
}
