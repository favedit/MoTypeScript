import {FError} from '../../../runtime/common/lang/FError';
import {RBoolean} from '../../../runtime/common/lang/RBoolean';
import {RString} from '../../../runtime/common/lang/RString';
import {REnum} from '../../../runtime/common/lang/REnum';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {FTagContext} from '../../../runtime/common/tag/FTagContext';
import {RConsole} from '../../../runtime/core/RConsole';
import {FRegion} from '../base/FRegion';
import {EFillMode} from './EFillMode';
import {ECullMode} from './ECullMode';
import {EDepthMode} from './EDepthMode';
import {EBlendMode} from './EBlendMode';
import {EShader} from './EShader';
import {SEffectInfo} from './SEffectInfo';
import {FContent} from './FContent';
import {FProgramParameter} from './FProgramParameter';
import {FProgramAttribute} from './FProgramAttribute';
import {FProgramSampler} from './FProgramSampler';
import {FShaderTemplate} from './FShaderTemplate';
import {FEffectConsole} from './FEffectConsole';

//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FEffect extends FContent {
   // @attribute
   public ready = null;
   public code: string = null;
   // @attribute
   public stateFillCd = EFillMode.Face;
   public stateCullCd = ECullMode.Front;
   public stateDepth = true;
   public stateDepthCd = EDepthMode.LessEqual;
   public stateDepthWrite = true;
   public stateBlend = true;
   public stateBlendSourceCd = EBlendMode.SrcAlpha;
   public stateBlendTargetCd = EBlendMode.OneMinusSrcAlpha;
   public stateAlphaTest = false;
   // @attribute
   public optionShadow = false;
   public optionLightMap = false;
   public optionFog = false;
   // @attribute
   public program = null;
   public vertexTemplate = null;
   public fragmentTemplate = null;
   public _vertexSource: string;
   public _fragmentSource: string;
   
   // @method
   //o.setup = MO.Method.empty;

   //==========================================================
   // <T>测试是否准备好x。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   public testReady() {
      return this.ready;
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:Object 数据
   // @param count:Integer 个数
   //==========================================================
   public setParameter(name, value, count) {
      this.program.setParameter(name, value, count);
   }

   //==========================================================
   // <T>设置取样器。</T>
   //
   // @method
   // @param name:String 名称
   // @param texture:FG3dTexture 纹理
   //==========================================================
   public setSampler(name, texture) {
      this.program.setSampler(name, texture);
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param tagContext:FTagContext 模板环境
   // @param effectInfo:SG3dEffectInfo 渲染信息
   //==========================================================
   public buildInfo(tagContext, effectInfo) {
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param region:MG3dRegion 渲染区域
   // @param renderable:MG3dRenderable 渲染对象
   //==========================================================
   public drawRenderable(region, renderable) {
      var context = this.graphicContext;
      var program = this.program;
      // 绑定所有属性流
      if (program.hasAttribute()) {
         var attributes = program.attributes();
         var attributeCount = attributes.count();
         for (var i = 0; i < attributeCount; i++) {
            var attribute = attributes.value(i);
            if (attribute._statusUsed) {
               var linker = attribute._linker;
               var vertexBuffer = renderable.findVertexBuffer(linker);
               if (!vertexBuffer) {
                  throw new FError(this, "Can't find renderable vertex buffer. (linker={1})", linker);
               }
               program.setAttribute(attribute._name, vertexBuffer, vertexBuffer._formatCd);
            }
         }
      }
      // 绘制处理
      var indexBuffer = renderable.indexBuffer();
      context.drawTriangles(indexBuffer, 0, indexBuffer.count());
   }

   //==========================================================
   // <T>绘制渲染集合。</T>
   //
   // @method
   // @param region:MG3dRegion 渲染区域
   // @param renderables:TObjects 渲染集合
   // @param offset:Integer 开始位置
   // @param count:Integer 总数
   //==========================================================
   public drawRenderables(region, renderables, offset, count) {
      // 选择技术
      this.graphicContext.setProgram(this.program);
      // 绘制所有对象
      for (var i = 0; i < count; i++) {
         var renderable = renderables.at(offset + i);
         this.drawRenderable(region, renderable);
      }
   }

   //==========================================================
   // <T>绘制渲染集合。</T>
   //
   // @method
   // @param region:MG3dRegion 渲染区域
   // @param renderables:TObjects 渲染集合
   // @param offset:Integer 开始位置
   // @param count:Integer 总数
   //==========================================================
   public drawGroup(region, renderables, offset, count) {
      this.drawRenderables(region, renderables, offset, count);
   }

   //==========================================================
   // <T>绘制渲染集合。</T>
   //
   // @method
   // @param region:MG3dRegion 渲染区域
   // @param offset:Integer 开始位置
   // @param count:Integer 总数
   //==========================================================
   public drawRegion(region:FRegion, offset:number, count:number) {
      // 根据效果类型进行分组
      var renderabels = region.renderables;
      for (var n:number = 0; n < count;) {
         // 获得分组
         var groupBegin = n;
         var groupEnd = count;
         var groupRenderable = renderabels.at(offset + groupBegin);
         var groupMaterial = groupRenderable.materialReference;
         for (var i = n; i < count; i++) {
            var renderable = renderabels.at(offset + i);
            var material = renderable.materialReference;
            if (groupMaterial != material) {
               groupEnd = i;
               break;
            }
            n++;
         }
         // 绘制当前渲染组
         this.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
      }
   }

   //==========================================================
   // <T>加载配置信息。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      var context = this.graphicContext;
      var program = this.program = context.createProgram();
      // 加载配置
      var xnodes = xconfig.nodes();
      var count = xnodes.count();
      for (var i = 0; i < count; i++) {
         var xnode = xnodes.get(i);
         if (xnode.isName('State')) {
            // 设置状态
            var name = xnode.get('name');
            var value = xnode.get('value');
            if (name == 'fill_mode') {
               this.stateFillCd = REnum.encode(EFillMode, value);
            } else if (name == 'cull_mode') {
               this.stateCullCd = REnum.encode(ECullMode, value);
            } else if (name == 'depth_mode') {
               this.stateDepth = true;
               this.stateDepthCd = REnum.encode(EDepthMode, value);
            } else if (name == 'depth_write') {
               this.stateDepthWrite = RBoolean.parse(value);
            } else if (name == 'blend_mode') {
               this.stateBlend = RBoolean.parse(value);
               if (this.stateBlend) {
                  this.stateBlendSourceCd = REnum.encode(EBlendMode, xnode.get('source'));
                  this.stateBlendTargetCd = REnum.encode(EBlendMode, xnode.get('target'));
               }
            } else if (name == 'alpha_test') {
               this.stateAlphaTest = RBoolean.parse(value);
            }
         } else if (xnode.isName('Option')) {
            // 设置配置
            var name = xnode.get('name');
            var value = xnode.get('value');
            if (name == 'shadow') {
               this.optionShadow = RBoolean.parse(value);
            } else if (name == 'lightmap') {
               this.optionLightMap = RBoolean.parse(value);
            } else if (name == 'fog') {
               this.optionFog = RBoolean.parse(value);
            }
         } else if (xnode.isName('Parameter')) {
            // 设置参数
            var parameter:FProgramParameter = RClass.create(FProgramParameter);
            parameter.loadConfig(xnode);
            program.parameters().set(parameter.name, parameter);
         } else if (xnode.isName('Attribute')) {
            // 设置属性
            var attribute:FProgramAttribute = RClass.create(FProgramAttribute);
            attribute.loadConfig(xnode);
            program.attributes().set(attribute.name, attribute);
         } else if (xnode.isName('Sampler')) {
            // 设置取样
            var sampler:FProgramSampler = RClass.create(FProgramSampler);
            sampler.loadConfig(xnode);
            program.samplers().set(sampler.name, sampler);
         } else if (xnode.isName('Source')) {
            // 设置代码
            var name = xnode.get('name');
            if (name == 'vertex') {
               this._vertexSource = xnode.value();
            } else if (name == 'fragment') {
               this._fragmentSource = xnode.value();
            } else {
               throw new FError(this, 'Unknown source type. (name={1})', name);
            }
         } else {
            throw new FError(this, 'Unknown config type. (name={1})', xnode.name());
         }
      }
      // 建立代码模板
      var vertexTemplate = this.vertexTemplate = RClass.create(FShaderTemplate);
      vertexTemplate.load(this._vertexSource);
      var fragmentTemplate = this.fragmentTemplate = RClass.create(FShaderTemplate);
      fragmentTemplate.load(this._fragmentSource);
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @param effectInfo 效果信息
   //==========================================================
   public build(effectInfo:SEffectInfo) {
      var program = this.program;
      var parameters = program.parameters();
      var parameterCount = parameters.count();
      // 设置环境
      //var tagContext = RInstance.get(sk.common.tag.FTagContext);
      var tagContext = new FTagContext();
      this.buildInfo(tagContext, effectInfo);
      // 生成顶点代码
      var source = this.vertexTemplate.parse(tagContext);
      var formatSource = RString.formatLines(source);
      program.upload(EShader.Vertex, formatSource);
      // 生成像素代码
      var source = this.fragmentTemplate.parse(tagContext);
      for (var i = 0; i < parameterCount; i++) {
         var parameter = parameters.at(i);
         var parameterName = parameter.name;
         var parameterDefine = parameter.define;
         if (parameterDefine) {
            source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
         }
      }
      var formatSource = RString.formatLines(source);
      program.upload(EShader.Fragment, formatSource);
      // 编译处理
      program.build();
      program.link();
   }

   //==========================================================
   // <T>加载渲染器。</T>
   //
   // @method
   //==========================================================
   public load() {
      var xconfig = RConsole.find(FEffectConsole).loadConfig(this.code);
      this.loadConfig(xconfig);
   }
}
