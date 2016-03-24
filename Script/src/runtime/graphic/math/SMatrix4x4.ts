import {StringBuffer} from '../../common/lang/StringBuffer';
import {FloatUtil} from '../../common/lang/FloatUtil';
import {SPoint3} from '../../common/math/SPoint3';
import {RMath} from '../../common/math/RMath';

//==========================================================
// <T>四维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
export class SMatrix4x4 {
   // 数据
   protected _data: Array<number> = new Array<number>(16);

   //============================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return Float32Array 数据
   //============================================================
   public data() {
      return this._data;
   }

   //============================================================
   // <T>是否为单位化数据。</T>
   //
   // @method
   // @return 是否单位化
   //============================================================
   public isIdentityData() {
      var data = this._data;
      var v = RMath.identity4x4;
      for (var i = 0; i < 16; i++) {
         if (data[i] != v[i]) {
            return false;
         }
      }
      return true;
   }

   //============================================================
   // <T>单位化处理。</T>
   //
   // @method
   //============================================================
   public identityData() {
      var d = this._data;
      var v = RMath.identity4x4;
      for (var i = 0; i < 16; i++) {
         d[i] = v[i];
      }
      return this;
   }

   //============================================================
   // <T>判断数据内容是否相等。</T>
   //
   // @method
   // @param p:data:Array 数据
   // @return Boolean 是否相等
   //============================================================
   public equalsData(p) {
      var data = this._data;
      for (var i = 0; i < 16; i++) {
         if (data[i] != p[i]) {
            return false;
         }
      }
      return true;
   }

   //============================================================
   // <T>接收一个数据内容。</T>
   //
   // @method
   // @param values:Array 数据
   //============================================================
   public assignData(values) {
      var data = this._data;
      for (var n = 0; n < 16; n++) {
         data[n] = values[n];
      }
      return this;
   }

   //============================================================
   // <T>接收一个数据内容，返回是否修改。</T>
   //
   // @method
   // @param p:data:Array 数据
   //============================================================
   public attachData(p) {
      var r = false;
      var data = this._data;
      for (var i = 0; i < 16; i++) {
         var v = p[i];
         if (!r) {
            if (data[i] != v) {
               r = true;
            }
         }
         data[i] = v;
      }
      return r;
   }

   //============================================================
   // <T>追加一个数据内容。</T>
   //
   // @method
   // @param p:data:Array 数据
   //============================================================
   public appendData(p) {
      var data = this._data;
      // 矩阵计算
      var v00 = (data[0] * p[0]) + (data[1] * p[4]) + (data[2] * p[8]) + (data[3] * p[12]);
      var v01 = (data[0] * p[1]) + (data[1] * p[5]) + (data[2] * p[9]) + (data[3] * p[13]);
      var v02 = (data[0] * p[2]) + (data[1] * p[6]) + (data[2] * p[10]) + (data[3] * p[14]);
      var v03 = (data[0] * p[3]) + (data[1] * p[7]) + (data[2] * p[11]) + (data[3] * p[15]);
      var v04 = (data[4] * p[0]) + (data[5] * p[4]) + (data[6] * p[8]) + (data[7] * p[12]);
      var v05 = (data[4] * p[1]) + (data[5] * p[5]) + (data[6] * p[9]) + (data[7] * p[13]);
      var v06 = (data[4] * p[2]) + (data[5] * p[6]) + (data[6] * p[10]) + (data[7] * p[14]);
      var v07 = (data[4] * p[3]) + (data[5] * p[7]) + (data[6] * p[11]) + (data[7] * p[15]);
      var v08 = (data[8] * p[0]) + (data[9] * p[4]) + (data[10] * p[8]) + (data[11] * p[12]);
      var v09 = (data[8] * p[1]) + (data[9] * p[5]) + (data[10] * p[9]) + (data[11] * p[13]);
      var v10 = (data[8] * p[2]) + (data[9] * p[6]) + (data[10] * p[10]) + (data[11] * p[14]);
      var v11 = (data[8] * p[3]) + (data[9] * p[7]) + (data[10] * p[11]) + (data[11] * p[15]);
      var v12 = (data[12] * p[0]) + (data[13] * p[4]) + (data[14] * p[8]) + (data[15] * p[12]);
      var v13 = (data[12] * p[1]) + (data[13] * p[5]) + (data[14] * p[9]) + (data[15] * p[13]);
      var v14 = (data[12] * p[2]) + (data[13] * p[6]) + (data[14] * p[10]) + (data[15] * p[14]);
      var v15 = (data[12] * p[3]) + (data[13] * p[7]) + (data[14] * p[11]) + (data[15] * p[15]);
      // 复制内容
      data[0] = v00;
      data[1] = v01;
      data[2] = v02;
      data[3] = v03;
      data[4] = v04;
      data[5] = v05;
      data[6] = v06;
      data[7] = v07;
      data[8] = v08;
      data[9] = v09;
      data[10] = v10;
      data[11] = v11;
      data[12] = v12;
      data[13] = v13;
      data[14] = v14;
      data[15] = v15;
   }

   //============================================================
   // <T>平移内容。</T>
   //
   // @method
   // @param x:Float X坐标
   // @param y:Float Y坐标
   // @param z:Float Z坐标
   //============================================================
   public addTranslate(x, y, z) {
      var value = RMath.value16;
      value[0] = 1;
      value[1] = 0;
      value[2] = 0;
      value[3] = 0;
      value[4] = 0;
      value[5] = 1;
      value[6] = 0;
      value[7] = 0;
      value[8] = 0;
      value[9] = 0;
      value[10] = 1;
      value[11] = 0;
      value[12] = x;
      value[13] = y;
      value[14] = z;
      value[15] = 1;
      this.appendData(value);
   }

   //============================================================
   // <T>X轴旋转内容。</T>
   //  1    0   0 0
   //  0  cos sin 0
   //  0 -sin cos 0
   //  0    0   0 1
   //
   // @method
   // @param p:value:Float 弧度
   //============================================================
   public addRotationX(p) {
      // 计算旋转
      var rs = Math.sin(p);
      var rc = Math.cos(p);
      // 追加内容
      var v = RMath.value16;
      v[0] = 1;
      v[1] = 0;
      v[2] = 0;
      v[3] = 0;
      v[4] = 0;
      v[5] = rc;
      v[6] = rs;
      v[7] = 0;
      v[8] = 0;
      v[9] = -rs;
      v[10] = rc;
      v[11] = 0;
      v[12] = 0;
      v[13] = 0;
      v[14] = 0;
      v[15] = 1;
      this.appendData(v);
   }

   //============================================================
   // <T>Y轴旋转内容。</T>
   //  cos   0  sin  0
   //  0     1    0  0
   //  -sin  0  cos  0
   //  0     0    0  1
   //
   // @method
   // @param p:value:Float 弧度
   //============================================================
   public addRotationY(p) {
      // 计算旋转
      var rs = Math.sin(p);
      var rc = Math.cos(p);
      // 追加内容
      var v = RMath.value16;
      v[0] = rc;
      v[1] = 0;
      v[2] = rs;
      v[3] = 0;
      v[4] = 0;
      v[5] = 1;
      v[6] = 0;
      v[7] = 0;
      v[8] = -rs;
      v[9] = 0;
      v[10] = rc;
      v[11] = 0;
      v[12] = 0;
      v[13] = 0;
      v[14] = 0;
      v[15] = 1;
      this.appendData(v);
   }

   //============================================================
   // <T>Z轴旋转内容。</T>
   //  cos  sin  0 0
   //  -sin cos  1 0
   //  0      0  1 0
   //  0      0  0 1
   //
   // @method
   // @param p:value:Float 弧度
   //============================================================
   public addRotationZ(p) {
      // 计算旋转
      var rs = Math.sin(p);
      var rc = Math.cos(p);
      // 追加内容
      var v = RMath.value16;
      v[0] = rc;
      v[1] = rs;
      v[2] = 0;
      v[3] = 0;
      v[4] = -rs;
      v[5] = rc;
      v[6] = 1;
      v[7] = 0;
      v[8] = 0;
      v[9] = 0;
      v[10] = 1;
      v[11] = 0;
      v[12] = 0;
      v[13] = 0;
      v[14] = 0;
      v[15] = 1;
      this.appendData(v);
   }

   //============================================================
   // <T>设置旋转内容。</T>
   //  1    0   0 0
   //  0  cos sin 0
   //  0 -sin cos 0
   //  0    0   0 1
   //
   // @method
   // @param x:Float X弧度
   // @param y:Float Y弧度
   // @param z:Float Z弧度
   //============================================================
   public addRotation(x, y, z) {
      // 计算旋转
      var rsx = Math.sin(x);
      var rcx = Math.cos(x);
      var rsy = Math.sin(y);
      var rcy = Math.cos(y);
      var rsz = Math.sin(z);
      var rcz = Math.cos(z);
      // 追加内容
      var v = RMath.value16;
      v[0] = rcy * rcz;
      v[1] = rcy * rsz;
      v[2] = -rsy;
      v[3] = 0;
      v[4] = rsx * rsy * rcz - rcx * rsz;
      v[5] = rsx * rsy * rsz + rcx * rcz;
      v[6] = rsx * rcy;
      v[7] = 0;
      v[8] = rcx * rsy * rcz + rsx * rsz;
      v[9] = rcx * rsy * rsz - rsx * rcx;
      v[10] = rcx * rcy;
      v[11] = 0;
      v[12] = 0;
      v[13] = 0;
      v[14] = 0;
      v[15] = 1;
      this.appendData(v);
   }

   //============================================================
   // <T>增加轴旋转内容。</T>
   //
   // @method
   // @param axis:SVector3 轴
   // @param angle:Float 角度
   //============================================================
   public addRotationAxis(axis, angle) {
      // 计算旋转
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var t = 1 - c;
      var x = axis.x;
      var y = axis.y;
      var z = axis.z;
      var tx = t * x;
      var ty = t * y;
      // 追加内容
      var v = RMath.value16;
      v[0] = tx * x + c;
      v[1] = tx * y - s * z;
      v[2] = tx * z + s * y;
      v[3] = 0;
      v[4] = tx * y + s * z;
      v[5] = ty * y + c;
      v[6] = ty * z - s * x;
      v[7] = 0;
      v[8] = tx * z - s * y;
      v[9] = ty * z + s * x;
      v[10] = t * z * z + c;
      v[11] = 0;
      v[12] = 0;
      v[13] = 0;
      v[14] = 0;
      v[15] = 1;
      this.appendData(v);
   }

   //============================================================
   // <T>设置缩放内容。</T>
   //
   // @method
   // @param x:Float X比例
   // @param y:Float Y比例
   // @param z:Float Z比例
   //============================================================
   public addScale(x, y, z) {
      var v = RMath.value16;
      v[0] = x;
      v[1] = 0;
      v[2] = 0;
      v[3] = 0;
      v[4] = 0;
      v[5] = y;
      v[6] = 0;
      v[7] = 0;
      v[8] = 0;
      v[9] = 0;
      v[10] = z;
      v[11] = 0;
      v[12] = 0;
      v[13] = 0;
      v[14] = 0;
      v[15] = 1;
      this.appendData(v);
   }

   //============================================================
   // <T>单位化矩阵。</T>
   //
   // @method
   // @return Boolean 是否成功
   //============================================================
   public normalize() {
      var o = this;
      var data = o._data;
      var m44 = data[15];
      if (m44 == 0) {
         return false;
      } else if (m44 == 1) {
         return true;
      } else {
         var scale = 1 / m44
         for (var i = 0; i < 16; i++) {
            data[i] = data[i] * scale;
         }
         return true
      }
   }

   //============================================================
   // <T>计算逆矩阵。</T>
   //
   // @method
   // @return Boolean 是否成功
   //============================================================
   public invert() {
      var o = this;
      var d = o._data;
      var v = RMath.value16;
      // 计算矩阵
      v[0] = (d[5] * d[10] * d[15]) - (d[5] * d[11] * d[14]) - (d[9] * d[6] * d[15]) + (d[9] * d[7] * d[14]) + (d[13] * d[6] * d[11]) - (d[13] * d[7] * d[10]);
      v[4] = -(d[4] * d[10] * d[15]) + (d[4] * d[11] * d[14]) + (d[8] * d[6] * d[15]) - (d[8] * d[7] * d[14]) - (d[12] * d[6] * d[11]) + (d[12] * d[7] * d[10]);
      v[8] = (d[4] * d[9] * d[15]) - (d[4] * d[11] * d[13]) - (d[8] * d[5] * d[15]) + (d[8] * d[7] * d[13]) + (d[12] * d[5] * d[11]) - (d[12] * d[7] * d[9]);
      v[12] = -(d[4] * d[9] * d[14]) + (d[4] * d[10] * d[13]) + (d[8] * d[5] * d[14]) - (d[8] * d[6] * d[13]) - (d[12] * d[5] * d[10]) + (d[12] * d[6] * d[9]);
      v[1] = -(d[1] * d[10] * d[15]) + (d[1] * d[11] * d[14]) + (d[9] * d[2] * d[15]) - (d[9] * d[3] * d[14]) - (d[13] * d[2] * d[11]) + (d[13] * d[3] * d[10]);
      v[5] = (d[0] * d[10] * d[15]) - (d[0] * d[11] * d[14]) - (d[8] * d[2] * d[15]) + (d[8] * d[3] * d[14]) + (d[12] * d[2] * d[11]) - (d[12] * d[3] * d[10]);
      v[9] = -(d[0] * d[9] * d[15]) + (d[0] * d[11] * d[13]) + (d[8] * d[1] * d[15]) - (d[8] * d[3] * d[13]) - (d[12] * d[1] * d[11]) + (d[12] * d[3] * d[9]);
      v[13] = (d[0] * d[9] * d[14]) - (d[0] * d[10] * d[13]) - (d[8] * d[1] * d[14]) + (d[8] * d[2] * d[13]) + (d[12] * d[1] * d[10]) - (d[12] * d[2] * d[9]);
      v[2] = (d[1] * d[6] * d[15]) - (d[1] * d[7] * d[14]) - (d[5] * d[2] * d[15]) + (d[5] * d[3] * d[14]) + (d[13] * d[2] * d[7]) - (d[13] * d[3] * d[6]);
      v[6] = -(d[0] * d[6] * d[15]) + (d[0] * d[7] * d[14]) + (d[4] * d[2] * d[15]) - (d[4] * d[3] * d[14]) - (d[12] * d[2] * d[7]) + (d[12] * d[3] * d[6]);
      v[10] = (d[0] * d[5] * d[15]) - (d[0] * d[7] * d[13]) - (d[4] * d[1] * d[15]) + (d[4] * d[3] * d[13]) + (d[12] * d[1] * d[7]) - (d[12] * d[3] * d[5]);
      v[14] = -(d[0] * d[5] * d[14]) + (d[0] * d[6] * d[13]) + (d[4] * d[1] * d[14]) - (d[4] * d[2] * d[13]) - (d[12] * d[1] * d[6]) + (d[12] * d[2] * d[5]);
      v[3] = -(d[1] * d[6] * d[11]) + (d[1] * d[7] * d[10]) + (d[5] * d[2] * d[11]) - (d[5] * d[3] * d[10]) - (d[9] * d[2] * d[7]) + (d[9] * d[3] * d[6]);
      v[7] = (d[0] * d[6] * d[11]) - (d[0] * d[7] * d[10]) - (d[4] * d[2] * d[11]) + (d[4] * d[3] * d[10]) + (d[8] * d[2] * d[7]) - (d[8] * d[3] * d[6]);
      v[11] = -(d[0] * d[5] * d[11]) + (d[0] * d[7] * d[9]) + (d[4] * d[1] * d[11]) - (d[4] * d[3] * d[9]) - (d[8] * d[1] * d[7]) + (d[8] * d[3] * d[5]);
      v[15] = (d[0] * d[5] * d[10]) - (d[0] * d[6] * d[9]) - (d[4] * d[1] * d[10]) + (d[4] * d[2] * d[9]) + (d[8] * d[1] * d[6]) - (d[8] * d[2] * d[5]);
      // 计算内容
      var r = d[0] * v[0] + d[1] * v[4] + d[2] * v[8] + d[3] * v[12];
      if (r == 0) {
         return false;
      }
      r = 1 / r;
      // 设置内容
      for (var i = 0; i < 16; i++) {
         d[i] = v[i] * r;
      }
      return true;
   }

   //==========================================================
   // <T>变换顶点数据。</T>
   //
   // @method
   // @param outputData:Array 输出数据
   // @param outputIndex:Integer 输出位置
   // @param inputData:Array 输入数据
   // @param inputIndex:Integer 输入位置
   // @param count:Integer 个数
   //==========================================================
   public transform(outputData, outputIndex, inputData, inputIndex, count) {
      var data = this._data;
      for (var i = 0; i < count; i++) {
         var x = inputData[inputIndex++];
         var y = inputData[inputIndex++];
         var z = inputData[inputIndex++];
         outputData[outputIndex++] = (x * data[0]) + (y * data[4]) + (z * data[8]) + data[12];
         outputData[outputIndex++] = (x * data[1]) + (y * data[5]) + (z * data[9]) + data[13];
         outputData[outputIndex++] = (x * data[2]) + (y * data[6]) + (z * data[10]) + data[14];
      }
   }

   //==========================================================
   // <T>变换顶点数据。</T>
   //
   // @method
   // @param input:SPoint3 输入顶点
   // @param output:SPoint3 输出顶点
   //==========================================================
   public transformPoint3(input, output) {
      // 计算数据
      var data = this._data;
      var x = (input.x * data[0]) + (input.y * data[4]) + (input.z * data[8]) + data[12];
      var y = (input.x * data[1]) + (input.y * data[5]) + (input.z * data[9]) + data[13];
      var z = (input.x * data[2]) + (input.y * data[6]) + (input.z * data[10]) + data[14];
      // 设置结果
      var result = null;
      if (output) {
         result = output;
      } else {
         result = new SPoint3();
      }
      result.set(x, y, z);
      return result;
   }

   //==========================================================
   // <T>变换顶点数据。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   // @param output:SPoint3 输出顶点
   //==========================================================
   public transformValue3(x, y, z, output) {
      // 计算数据
      var data = this._data;
      var rx = (x * data[0]) + (y * data[4]) + (z * data[8]) + data[12];
      var ry = (x * data[1]) + (y * data[5]) + (z * data[9]) + data[13];
      var rz = (x * data[2]) + (y * data[6]) + (z * data[10]) + data[14];
      // 设置结果
      var result = null;
      if (output) {
         result = output;
      } else {
         result = new SPoint3();
      }
      result.set(rx, ry, rz);
      return result;
   }

   //============================================================
   // <T>构建一个矩阵。</T>
   //
   // @method
   // @param t:translation:SPoint3 位移
   // @param r:quaternion:SQuaternion 旋转
   // @param s:scale:SVector3 缩放
   //============================================================
   public build(t, r, s) {
      var d = this._data;
      var x2 = r.x * r.x;
      var y2 = r.y * r.y;
      var z2 = r.z * r.z;
      var xy = r.x * r.y;
      var xz = r.x * r.z;
      var yz = r.y * r.z;
      var wx = r.w * r.x;
      var wy = r.w * r.y;
      var wz = r.w * r.z;
      d[0] = (1 - 2 * (y2 + z2)) * s.x;
      d[1] = 2 * (xy - wz) * s.x;
      d[2] = 2 * (xz + wy) * s.x;
      d[3] = 0;
      d[4] = 2 * (xy + wz) * s.y;
      d[5] = (1 - 2 * (x2 + z2)) * s.y;
      d[6] = 2 * (yz - wx) * s.y;
      d[7] = 0;
      d[8] = 2 * (xz - wy) * s.z;
      d[9] = 2 * (yz + wx) * s.z;
      d[10] = (1 - 2 * (x2 + y2)) * s.z;
      d[11] = 0;
      d[12] = t.x;
      d[13] = t.y;
      d[14] = t.z;
      d[15] = 1;
   }

   //============================================================
   // <T>构建一个矩阵。</T>
   //
   // @method
   // @param t:translation:SPoint3 位移
   // @param r:quaternion:SQuaternion 旋转
   // @param s:scale:SVector3 缩放
   //============================================================
   public buildQuaternion(r) {
      var d = this._data;
      var x2 = r.x * r.x;
      var y2 = r.y * r.y;
      var z2 = r.z * r.z;
      var xy = r.x * r.y;
      var xz = r.x * r.z;
      var yz = r.y * r.z;
      var wx = r.w * r.x;
      var wy = r.w * r.y;
      var wz = r.w * r.z;
      d[0] = 1 - 2 * (y2 + z2);
      d[1] = 2 * (xy - wz);
      d[2] = 2 * (xz + wy);
      d[3] = 0;
      d[4] = 2 * (xy + wz);
      d[5] = 1 - 2 * (x2 + z2);
      d[6] = 2 * (yz - wx);
      d[7] = 0;
      d[8] = 2 * (xz - wy);
      d[9] = 2 * (yz + wx);
      d[10] = 1 - 2 * (x2 + y2);
      d[11] = 0;
      d[12] = 0;
      d[13] = 0;
      d[14] = 0;
      d[15] = 1;
   }

   //==========================================================
   // <T>写入数据。</T>
   //
   // @method
   // @param d:data:Array 数组
   // @param i:offset:Integer 索引位置
   //==========================================================
   public writeData(d, i) {
      var o = this;
      var pd = o._data;
      d[i++] = pd[0];
      d[i++] = pd[4];
      d[i++] = pd[8];
      d[i++] = pd[12];
      d[i++] = pd[1];
      d[i++] = pd[5];
      d[i++] = pd[9];
      d[i++] = pd[13];
      d[i++] = pd[2];
      d[i++] = pd[6];
      d[i++] = pd[10];
      d[i++] = pd[14];
      d[i++] = pd[3];
      d[i++] = pd[7];
      d[i++] = pd[11];
      d[i++] = pd[15];
   }

   //==========================================================
   // <T>写入数据。</T>
   //
   // @method
   // @param d:data:Array 数组
   // @param i:offset:Integer 索引位置
   //==========================================================
   public writeData4x3(d, i) {
      var o = this;
      var pd = o._data;
      d[i++] = pd[0];
      d[i++] = pd[4];
      d[i++] = pd[8];
      d[i++] = pd[12];
      d[i++] = pd[1];
      d[i++] = pd[5];
      d[i++] = pd[9];
      d[i++] = pd[13];
      d[i++] = pd[2];
      d[i++] = pd[6];
      d[i++] = pd[10];
      d[i++] = pd[14];
   }

   //==========================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      var d = this._data;
      var r = new StringBuffer();
      for (var y = 0; y < 4; y++) {
         if (y > 0) {
            r.append('|');
         }
         for (var x = 0; x < 4; x++) {
            var i = y * 4 + x;
            var v = d[i];
            if (x > 0) {
               r.append(',');
            }
            r.append(FloatUtil.format(v, 0, null, 3, null));
         }
      }
      return r.flush();
   }
}
