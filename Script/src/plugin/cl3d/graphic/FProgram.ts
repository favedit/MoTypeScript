import {FObject} from '../../../runtime/common/lang/FObject';
import {FError} from '../../../runtime/common/lang/FError';
import {RObject} from '../../../runtime/common/lang/RObject';
import {RTypeArray} from '../../../runtime/common/lang/RTypeArray';
import {FDictionary} from '../../../runtime/common/lang/FDictionary';
import {SPoint3} from '../../../runtime/common/math/SPoint3';
import {SPoint4} from '../../../runtime/common/math/SPoint4';
import {SVector3} from '../../../runtime/common/math/SVector3';
import {SVector4} from '../../../runtime/common/math/SVector4';
import {SColor4} from '../../../runtime/common/math/SColor4';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {RAssert} from '../../../runtime/common/RAssert';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {EParameterFormat} from './EParameterFormat';
import {EShader} from './EShader';
import {FProgramAttribute} from './FProgramAttribute';
import {FProgramSampler} from './FProgramSampler';
import {FProgramParameter} from './FProgramParameter';
import {FVertexShader} from './FVertexShader';
import {FFragmentShader} from './FFragmentShader';
import {FContent} from './FContent';

//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
export abstract class FProgram extends FContent {
   //..........................................................
   // @attribute
   public _parameters: FDictionary<FProgramParameter> = null;
   public _attributes: FDictionary<FProgramAttribute> = null;
   public _samplers: FDictionary<FProgramSampler> = null;
   // @attribute
   public _vertexShader: FVertexShader = null;
   public _fragmentShader: FFragmentShader = null;

   //==========================================================
   // <T>判断是否含有参数。</T>
   //
   // @method
   // @return 是否含有
   //==========================================================
   public hasParameter(): boolean {
      var parameters = this._parameters;
      return parameters ? !parameters.isEmpty() : false;
   }

   //==========================================================
   // <T>注册一个参数。</T>
   //
   // @method
   // @param name:String 名称
   // @param formatCd:EG3dParameterFormat 格式
   // @return 参数
   //==========================================================
   public registerParameter(name: string, formatCd: EParameterFormat): void {
      var parameter = RClass.create(FProgramParameter);
      parameter._name = name;
      parameter.formatCd = formatCd;
      this.parameters().set(name, parameter);
      return parameter;
   }

   //==========================================================
   // <T>根据名称查找一个参数。</T>
   //
   // @method
   // @param name 名称
   // @return 参数
   //==========================================================
   public findParameter(name: string): FProgramParameter {
      return this._parameters ? this._parameters.get(name) : null;
   }

   //==========================================================
   // <T>获得参数集合。</T>
   //
   // @method
   // @return 参数集合
   //==========================================================
   public parameters(): FDictionary<FProgramParameter> {
      var parameters = this._parameters;
      if (parameters == null) {
         parameters = this._parameters = new FDictionary<FProgramParameter>();
      }
      return parameters;
   }
   //==========================================================
   // <T>判断是否含有属性。</T>
   //
   // @method
   // @return 是否含有
   //==========================================================
   public hasAttribute(): boolean {
      var attributes = this._attributes;
      return attributes ? !attributes.isEmpty() : false;
   }

   //==========================================================
   // <T>注册一个属性。</T>
   //
   // @param name 名称
   // @return 属性
   //==========================================================
   public registerAttribute(name: string): FProgramAttribute {
      var attribute: FProgramAttribute = RClass.create(FProgramAttribute);
      attribute.name = name;
      this.attributes().set(name, attribute);
      return attribute;
   }

   //==========================================================
   // <T>根据名称查找一个属性。</T>
   //
   // @method
   // @param name 名称
   // @return 属性
   //==========================================================
   public findAttribute(name: string): FProgramAttribute {
      return this._attributes ? this._attributes.get(name) : null;
   }

   //==========================================================
   // <T>获得属性集合。</T>
   //
   // @method
   // @return 属性集合
   //==========================================================
   public attributes(): FDictionary<FProgramAttribute> {
      var attributes = this._attributes;
      if (attributes == null) {
         attributes = this._attributes = new FDictionary<FProgramAttribute>();
      }
      return attributes;
   }

   //==========================================================
   // <T>判断是否含有取样。</T>
   //
   // @method
   // @return 是否含有
   //==========================================================
   public hasSampler(): boolean {
      var samplers = this._samplers;
      return samplers ? !samplers.isEmpty() : false;
   }

   //==========================================================
   // <T>注册一个取样器。</T>
   //
   // @method
   // @param name 名称
   // @return 参数
   //==========================================================
   public registerSampler(name: string): FProgramSampler {
      var sampler = RClass.create(FProgramSampler);
      sampler._name = name;
      this.samplers().set(name, sampler);
      return sampler;
   }

   //==========================================================
   // <T>根据名称查找一个取样器。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return 参数
   //==========================================================
   public findSampler(name: string): FProgramSampler {
      return this._samplers ? this._samplers.get(name) : null;
   }

   //==========================================================
   // <T>获得取样集合。</T>
   //
   // @method
   // @return 取样集合
   //==========================================================
   public samplers(): FDictionary<FProgramSampler> {
      var samplers = this._samplers;
      if (samplers == null) {
         samplers = this._samplers = new FDictionary<FProgramSampler>();
      }
      return samplers;
   }

   //==========================================================
   // <T>设置属性。</T>
   //
   // @method
   // @param name 名称
   // @param buffer 数据
   // @param format 格式
   //==========================================================
   public setAttribute(name, buffer, format) {
      // 获得定义
      var attribute = this.findAttribute(name);
      RAssert.debugNotNull(attribute);
      // 设置内容
      this._graphicContext.bindVertexBuffer(attribute.slot, buffer, 0, format);
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param name 名称
   // @param value 数据
   // @param count 个数
   //==========================================================
   public setParameter(name, value, count?:any) {
      // 获得定义
      var parameter: FProgramParameter = this.findParameter(name);
      RAssert.debugNotNull(parameter);
      // 转换数据
      var data = null;
      var clazz = value.constructor;
      if ((clazz == Float32Array) || (clazz == SMatrix3d)) {// || (t == sk.common.math.SPerspectiveMatrix3d)) {
         data = value;
      } else if (clazz == SColor4) {
         data = RTypeArray.float4();
         data[0] = value.red;
         data[1] = value.green;
         data[2] = value.blue;
         data[3] = value.alpha;
      } else if ((clazz == SPoint3) || (clazz == SVector3)) {
         data = RTypeArray.float3();
         data[0] = value.x;
         data[1] = value.y;
         data[2] = value.z;
      } else if ((clazz == SPoint4) || (clazz == SVector4)) {
         data = RTypeArray.float4();
         data[0] = value.x;
         data[1] = value.y;
         data[2] = value.z;
         data[3] = value.w;
      } else {
         throw new FError(this, 'Bind invalid parameter type. (name={1}, type={2})', name, clazz);
      }
      // 检查数据变更
      if (parameter.attachData(data)) {
         // 设置内容
         this._graphicContext.bindConst(null, parameter.slot, parameter.formatCd, data, count);
      }
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param name:String 名称
   // @param x X数据
   // @param y Y数据
   // @param z Z数据
   // @param w W数据
   //==========================================================
   public setParameter4(name, x, y, z, w) {
      var data = RTypeArray.float4();
      data[0] = x;
      data[1] = y;
      data[2] = z;
      data[3] = w;
      this.setParameter(name, data, 1);
   }

   //==========================================================
   // <T>设置取样器。</T>
   //
   // @method
   // @param name:String 名称
   // @param texture:FTexture 纹理
   //==========================================================
   public setSampler(name, texture) {
      // 获得定义
      var sampler = this.findSampler(name);
      if (!sampler) {
         throw new FError(this, 'Bind invalid sampler. (name={1})', name);
      }
      // 设置内容
      this._graphicContext.bindTexture(sampler.slot, sampler.index, texture);
   }

   //==========================================================
   // <T>获得顶点渲染器。</T>
   //
   // @method
   // @return FVertexShader 顶点渲染器
   //==========================================================
   public abstract vertexShader(): FVertexShader;

   //==========================================================
   // <T>获得像素渲染器。</T>
   //
   // @method
   // @return FFragmentShader 顶点渲染器
   //==========================================================
   public abstract fragmentShader(): FFragmentShader;

   //==========================================================
   // <T>上传内容处理。</T>
   //
   // @method
   // @param shaderCd 渲染程序类型
   // @param source 渲染代码
   //==========================================================
   public abstract upload(shaderCd: EShader, source: string): void;

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
