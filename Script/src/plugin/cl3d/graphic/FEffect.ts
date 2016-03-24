import {Objects} from '../../../runtime/common/lang/Objects';
import {Fatal} from '../../../runtime/common/lang/Fatal';
import {BooleanUtil} from '../../../runtime/common/lang/BooleanUtil';
import {StringUtil} from '../../../runtime/common/lang/StringUtil';
import {EnumUtil} from '../../../runtime/common/lang/EnumUtil';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {TagContext} from '../../../runtime/common/tag/TagContext';
import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {FRegion} from '../base/FRegion';
import {EFillMode} from './EFillMode';
import {ECullMode} from './ECullMode';
import {EDepthMode} from './EDepthMode';
import {EBlendMode} from './EBlendMode';
import {EShader} from './EShader';
import {SEffectInfo} from './SEffectInfo';
import {FContent} from './FContent';
import {FShaderTemplate} from './FShaderTemplate';
import {FProgramParameter} from './FProgramParameter';
import {FProgramAttribute} from './FProgramAttribute';
import {FProgramSampler} from './FProgramSampler';
import {FProgram} from './FProgram';
import {FEffectConsole} from './FEffectConsole';
import {FRenderable} from '../base/FRenderable';

//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FEffect extends FContent {
   // @attribute
   public ready: boolean;
   public code: string;
   public flag: string;
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
   public program: FProgram;
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
   public drawRenderable(region: FRegion, renderable: FRenderable) {
      var context = this.graphicContext;
      var program = this.program;
      // 绑定所有属性流
      if (program.hasAttribute()) {
         var attributes = program.attributes();
         var attributeCount = attributes.count();
         for (var i = 0; i < attributeCount; i++) {
            var attribute = attributes.value(i);
            if (attribute.statusUsed) {
               var linker = attribute.linker;
               var vertexBuffer = renderable.findVertexBuffer(linker);
               if (!vertexBuffer) {
                  throw new Fatal(this, "Can't find renderable vertex buffer. (linker={1})", linker);
               }
               program.setAttribute(attribute.name, vertexBuffer, vertexBuffer.formatCd);
            }
         }
      }
      // 绘制处理
      var indexBuffers = renderable.indexBuffers;
      var count = indexBuffers.count();
      for (var i = 0; i < count; i++) {
         var indexBuffer = indexBuffers.at(i);
         context.drawTriangles(indexBuffer, 0, indexBuffer.count);
      }
   }

   //==========================================================
   // <T>绘制渲染集合。</T>
   //
   // @param region 渲染区域
   // @param renderables 渲染集合
   // @param offset 开始位置
   // @param count 总数
   //==========================================================
   public drawRenderables(region: FRegion, renderables: Objects<FRenderable>, offset, count) {
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
   public drawRegion(region: FRegion, offset: number, count: number) {
      // 根据效果类型进行分组
      var renderabels = region.renderables;
      for (var n: number = 0; n < count;) {
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
               this.stateFillCd = EnumUtil.encode(EFillMode, value);
            } else if (name == 'cull_mode') {
               this.stateCullCd = EnumUtil.encode(ECullMode, value);
            } else if (name == 'depth_mode') {
               this.stateDepth = true;
               this.stateDepthCd = EnumUtil.encode(EDepthMode, value);
            } else if (name == 'depth_write') {
               this.stateDepthWrite = BooleanUtil.parse(value);
            } else if (name == 'blend_mode') {
               this.stateBlend = BooleanUtil.parse(value);
               if (this.stateBlend) {
                  this.stateBlendSourceCd = EnumUtil.encode(EBlendMode, xnode.get('source'));
                  this.stateBlendTargetCd = EnumUtil.encode(EBlendMode, xnode.get('target'));
               }
            } else if (name == 'alpha_test') {
               this.stateAlphaTest = BooleanUtil.parse(value);
            }
         } else if (xnode.isName('Option')) {
            // 设置配置
            var name = xnode.get('name');
            var value = xnode.get('value');
            if (name == 'shadow') {
               this.optionShadow = BooleanUtil.parse(value);
            } else if (name == 'lightmap') {
               this.optionLightMap = BooleanUtil.parse(value);
            } else if (name == 'fog') {
               this.optionFog = BooleanUtil.parse(value);
            }
         } else if (xnode.isName('Parameter')) {
            // 设置参数
            var parameter: FProgramParameter = ClassUtil.create(FProgramParameter);
            parameter.loadConfig(xnode);
            program.parameters().set(parameter.name, parameter);
         } else if (xnode.isName('Attribute')) {
            // 设置属性
            var attribute: FProgramAttribute = ClassUtil.create(FProgramAttribute);
            attribute.loadConfig(xnode);
            program.attributes().set(attribute.name, attribute);
         } else if (xnode.isName('Sampler')) {
            // 设置取样
            var sampler: FProgramSampler = ClassUtil.create(FProgramSampler);
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
               throw new Fatal(this, 'Unknown source type. (name={1})', name);
            }
         } else {
            throw new Fatal(this, 'Unknown config type. (name={1})', xnode.name());
         }
      }
      // 建立代码模板
      var vertexTemplate = this.vertexTemplate = ClassUtil.create(FShaderTemplate);
      vertexTemplate.load(this._vertexSource);
      var fragmentTemplate = this.fragmentTemplate = ClassUtil.create(FShaderTemplate);
      fragmentTemplate.load(this._fragmentSource);
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @param effectInfo 效果信息
   //==========================================================
   public build(effectInfo: SEffectInfo) {
      var program: any = this.program;
      var parameters = program.parameters();
      var parameterCount = parameters.count();
      // 设置环境
      //var tagContext = RInstance.get(sk.common.tag.FTagContext);
      var tagContext = new TagContext();
      this.buildInfo(tagContext, effectInfo);
      // 生成顶点代码
      var source = this.vertexTemplate.parse(tagContext);
      var formatSource = StringUtil.formatLines(source);
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
      var formatSource = StringUtil.formatLines(source);
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
      var xconfig = ServiceUtil.find(FEffectConsole).loadConfig(this.code);
      this.loadConfig(xconfig);
   }
}
