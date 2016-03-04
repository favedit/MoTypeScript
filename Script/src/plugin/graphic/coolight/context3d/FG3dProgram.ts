import {FError} from '../../../../runtime/common/lang/FError';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {RTypeArray} from '../../../../runtime/common/lang/RTypeArray';
import {FDictionary} from '../../../../runtime/common/lang/FDictionary';
import {SMatrix3d} from '../../../../runtime/common/math/SMatrix3d';
import {SPoint3} from '../../../../runtime/common/math/SPoint3';
import {SPoint4} from '../../../../runtime/common/math/SPoint4';
import {SVector3} from '../../../../runtime/common/math/SVector3';
import {SVector4} from '../../../../runtime/common/math/SVector4';
import {SColor4} from '../../../../runtime/common/math/SColor4';
import {RClass} from '../../../../runtime/common/reflect/RClass';
import {FG3dObject} from './FG3dObject';
import {FG3dProgramAttribute} from './FG3dProgramAttribute';
import {FG3dProgramSampler} from './FG3dProgramSampler';
import {FG3dProgramParameter} from './FG3dProgramParameter';

//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dProgram extends FG3dObject {
   //..........................................................
   // @attribute
   _attributes = null;
   _parameters = null;
   _samplers = null;
   // @attribute
   _vertexShader = null;
   _fragmentShader = null;
   // @method
   //o.vertexShader = MO.Method.virtual(o, 'vertexShader');
   //o.fragmentShader = MO.Method.virtual(o, 'fragmentShader');
   // @method
   //o.upload = MO.Method.virtual(o, 'upload');
   // @method

   //==========================================================
   // <T>判断是否含有属性。</T>
   //
   // @method
   // @return 是否含有
   //==========================================================
   public hasAttribute() {
      var o = this;
      var r = o._attributes;
      return r ? !r.isEmpty() : false;
   }

   //==========================================================
   // <T>注册一个属性。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return 属性
   //==========================================================
   public registerAttribute(n) {
      var o = this;
      var r = RClass.create(FG3dProgramAttribute);
      r._name = n;
      o.attributes().set(n, r);
      return r;
   }

   //==========================================================
   // <T>根据名称查找一个属性。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return 属性
   //==========================================================
   public findAttribute(n) {
      return this._attributes ? this._attributes.get(n) : null;
   }

   //==========================================================
   // <T>获得属性集合。</T>
   //
   // @method
   // @return 属性集合
   //==========================================================
   public attributes() {
      var o = this;
      var r = o._attributes;
      if (r == null) {
         r = o._attributes = new FDictionary();
      }
      return r;
   }

   //==========================================================
   // <T>判断是否含有参数。</T>
   //
   // @method
   // @return 是否含有
   //==========================================================
   public hasParameter() {
      var o = this;
      var r = o._parameters;
      return r ? !r.isEmpty() : false;
   }

   //==========================================================
   // <T>注册一个参数。</T>
   //
   // @method
   // @param pn:name:String 名称
   // @param pf:formatCd:EG3dParameterFormat 格式
   // @return 参数
   //==========================================================
   public registerParameter(pn, pf) {
      var o = this;
      var r = RClass.create(FG3dProgramParameter);
      r._name = pn;
      r.formatCd = pf;
      o.parameters().set(pn, r);
      return r;
   }

   //==========================================================
   // <T>根据名称查找一个参数。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return 参数
   //==========================================================
   public findParameter(n) {
      return this._parameters ? this._parameters.get(n) : null;
   }

   //==========================================================
   // <T>获得参数集合。</T>
   //
   // @method
   // @return 参数集合
   //==========================================================
   public parameters() {
      var o = this;
      var r = o._parameters;
      if (r == null) {
         r = o._parameters = new FDictionary();
      }
      return r;
   }

   //==========================================================
   // <T>判断是否含有取样。</T>
   //
   // @method
   // @return 是否含有
   //==========================================================
   public hasSampler() {
      var o = this;
      var r = o._samplers;
      return r ? !r.isEmpty() : false;
   }

   //==========================================================
   // <T>注册一个取样器。</T>
   //
   // @method
   // @param pn:name:String 名称
   // @return 参数
   //==========================================================
   public registerSampler(pn) {
      var o = this;
      var r = RClass.create(FG3dProgramSampler);
      r._name = pn;
      o.samplers().set(pn, r);
      return r;
   }

   //==========================================================
   // <T>根据名称查找一个取样器。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return 参数
   //==========================================================
   public findSampler(n) {
      return this._samplers ? this._samplers.get(n) : null;
   }

   //==========================================================
   // <T>获得取样集合。</T>
   //
   // @method
   // @return 取样集合
   //==========================================================
   public samplers() {
      var o = this;
      var r = o._samplers;
      if (r == null) {
         r = o._samplers = new FDictionary();
      }
      return r;
   }

   //==========================================================
   // <T>设置属性。</T>
   //
   // @method
   // @param pn:name:String 名称
   // @param pb:buffer:Object 数据
   // @param pf:format:Integer 格式
   //==========================================================
   public setAttribute(pn, pb, pf) {
      var o = this;
      // 获得定义
      var p = o.findAttribute(pn);
      if (p == null) {
         throw new FError(o, 'Bind invalid attribute. (name={1})', pn);
      }
      // 设置内容
      o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param pn:name:String 名称
   // @param pv:value:Object 数据
   // @param pc:count:Integer 个数
   //==========================================================
   public setParameter(pn, pv, pc) {
      var o = this;
      // 获得定义
      var p = o.findParameter(pn);
      if (p == null) {
         throw new FError(o, 'Bind invalid parameter. (name={1})', pn);
      }
      // 转换数据
      var d = null;
      var t = pv.constructor;
      if ((t == Float32Array) || (t == SMatrix3d)) {// || (t == sk.common.math.SPerspectiveMatrix3d)) {
         d = pv;
      } else if (t == SColor4) {
         d = RTypeArray.float4();
         d[0] = pv.red;
         d[1] = pv.green;
         d[2] = pv.blue;
         d[3] = pv.alpha;
      } else if ((t == SPoint3) || (t == SVector3)) {
         d = RTypeArray.float3();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
      } else if ((t == SPoint4) || (t == SVector4)) {
         d = RTypeArray.float4();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
         d[3] = pv.w;
      } else {
         throw new FError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
      }
      // 检查数据变更
      if (p.attachData(d)) {
         // 设置内容
         o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
      }
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param pn:name:String 名称
   // @param px:Number X数据
   // @param py:Number Y数据
   // @param pz:Number Z数据
   // @param pw:Number W数据
   //==========================================================
   public setParameter4(pn, px, py, pz, pw) {
      var v = RTypeArray.float4();
      v[0] = px;
      v[1] = py;
      v[2] = pz;
      v[3] = pw;
      this.setParameter(pn, v, 1);
   }

   //==========================================================
   // <T>设置取样器。</T>
   //
   // @method
   // @param name:String 名称
   // @param texture:FG3dTexture 纹理
   //==========================================================
   public setSampler(name, texture) {
      var o = this;
      // 获得定义
      var sampler = o.findSampler(name);
      if (!sampler) {
         throw new FError(o, 'Bind invalid sampler. (name={1})', name);
      }
      // 设置内容
      o._graphicContext.bindTexture(sampler._slot, sampler._index, texture);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性集合
      this._attributes = RObject.dispose(this._attributes, true);
      this._parameters = RObject.dispose(this._parameters, true);
      this._samplers = RObject.dispose(this._samplers, true);
      // 释放对象
      this._vertexShader = RObject.dispose(this._vertexShader);
      this._fragmentShader = RObject.dispose(this._fragmentShader);
      // 父处理
      super.dispose();
   }
}
