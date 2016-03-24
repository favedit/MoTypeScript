import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {Fatal} from '../../../runtime/common/lang/Fatal';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {TypeArrayUtil} from '../../../runtime/common/lang/TypeArrayUtil';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {Point3} from '../../../runtime/common/math/Point3';
import {Point4} from '../../../runtime/common/math/Point4';
import {Vector3} from '../../../runtime/common/math/Vector3';
import {Vector4} from '../../../runtime/common/math/Vector4';
import {Color4} from '../../../runtime/common/math/Color4';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {ParameterFormatEnum} from './ParameterFormatEnum';
import {ShaderEnum} from './ShaderEnum';
import {ProgramAttribute} from './ProgramAttribute';
import {ProgramSampler} from './ProgramSampler';
import {ProgramParameter} from './ProgramParameter';
import {VertexShader} from './VertexShader';
import {FragmentShader} from './FragmentShader';
import {Content} from './Content';

//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
export abstract class Program extends Content {
   //..........................................................
   // @attribute
   public _parameters: Dictionary<ProgramParameter> = null;
   public _attributes: Dictionary<ProgramAttribute> = null;
   public _samplers: Dictionary<ProgramSampler> = null;
   // @attribute
   public _vertexShader: VertexShader = null;
   public _fragmentShader: FragmentShader = null;

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
   public registerParameter(name: string, formatCd: ParameterFormatEnum): void {
      var parameter = ClassUtil.create(ProgramParameter);
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
   public findParameter(name: string): ProgramParameter {
      return this._parameters ? this._parameters.get(name) : null;
   }

   //==========================================================
   // <T>获得参数集合。</T>
   //
   // @method
   // @return 参数集合
   //==========================================================
   public parameters(): Dictionary<ProgramParameter> {
      var parameters = this._parameters;
      if (parameters == null) {
         parameters = this._parameters = new Dictionary<ProgramParameter>();
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
   public registerAttribute(name: string): ProgramAttribute {
      var attribute: ProgramAttribute = ClassUtil.create(ProgramAttribute);
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
   public findAttribute(name: string): ProgramAttribute {
      return this._attributes ? this._attributes.get(name) : null;
   }

   //==========================================================
   // <T>获得属性集合。</T>
   //
   // @method
   // @return 属性集合
   //==========================================================
   public attributes(): Dictionary<ProgramAttribute> {
      var attributes = this._attributes;
      if (attributes == null) {
         attributes = this._attributes = new Dictionary<ProgramAttribute>();
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
   public registerSampler(name: string): ProgramSampler {
      var sampler = ClassUtil.create(ProgramSampler);
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
   public findSampler(name: string): ProgramSampler {
      return this._samplers ? this._samplers.get(name) : null;
   }

   //==========================================================
   // <T>获得取样集合。</T>
   //
   // @method
   // @return 取样集合
   //==========================================================
   public samplers(): Dictionary<ProgramSampler> {
      var samplers = this._samplers;
      if (samplers == null) {
         samplers = this._samplers = new Dictionary<ProgramSampler>();
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
      AssertUtil.debugNotNull(attribute);
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
      var parameter: ProgramParameter = this.findParameter(name);
      AssertUtil.debugNotNull(parameter);
      // 转换数据
      var data = null;
      var clazz = value.constructor;
      if ((clazz == Float32Array) || (clazz == SMatrix3d)) {// || (t == sk.common.math.SPerspectiveMatrix3d)) {
         data = value;
      } else if (clazz == Color4) {
         data = TypeArrayUtil.float4();
         data[0] = value.red;
         data[1] = value.green;
         data[2] = value.blue;
         data[3] = value.alpha;
      } else if ((clazz == Point3) || (clazz == Vector3)) {
         data = TypeArrayUtil.float3();
         data[0] = value.x;
         data[1] = value.y;
         data[2] = value.z;
      } else if ((clazz == Point4) || (clazz == Vector4)) {
         data = TypeArrayUtil.float4();
         data[0] = value.x;
         data[1] = value.y;
         data[2] = value.z;
         data[3] = value.w;
      } else {
         throw new Fatal(this, 'Bind invalid parameter type. (name={1}, type={2})', name, clazz);
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
      var data = TypeArrayUtil.float4();
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
         throw new Fatal(this, 'Bind invalid sampler. (name={1})', name);
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
   public abstract vertexShader(): VertexShader;

   //==========================================================
   // <T>获得像素渲染器。</T>
   //
   // @method
   // @return FFragmentShader 顶点渲染器
   //==========================================================
   public abstract fragmentShader(): FragmentShader;

   //==========================================================
   // <T>上传内容处理。</T>
   //
   // @method
   // @param shaderCd 渲染程序类型
   // @param source 渲染代码
   //==========================================================
   public abstract upload(shaderCd: ShaderEnum, source: string): void;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性集合
      this._attributes = ObjectUtil.dispose(this._attributes, true);
      this._parameters = ObjectUtil.dispose(this._parameters, true);
      this._samplers = ObjectUtil.dispose(this._samplers, true);
      // 释放对象
      this._vertexShader = ObjectUtil.dispose(this._vertexShader);
      this._fragmentShader = ObjectUtil.dispose(this._fragmentShader);
      // 父处理
      super.dispose();
   }
}
