import {FError} from '../../../../runtime/common/lang/FError';
import {EG3dFillMode} from './EG3dFillMode';
import {EG3dCullMode} from './EG3dCullMode';
import {EG3dDepthMode} from './EG3dDepthMode';
import {EG3dBlendMode} from './EG3dBlendMode';
import {FG3dObject} from './FG3dObject';

//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dEffect extends FG3dObject {
   // @attribute
   protected _ready = null;
   //_code = MO.Class.register(o, new MO.AGetter('_code'));
   protected _code: string = null;
   // @attribute
   protected _stateFillCd = EG3dFillMode.Face;
   protected _stateCullCd = EG3dCullMode.Front;
   protected _stateDepth = true;
   protected _stateDepthCd = EG3dDepthMode.LessEqual;
   protected _stateDepthWrite = true;
   protected _stateBlend = true;
   protected _stateBlendSourceCd = EG3dBlendMode.SrcAlpha;
   protected _stateBlendTargetCd = EG3dBlendMode.OneMinusSrcAlpha;
   protected _stateAlphaTest = false;
   // @attribute
   protected _optionShadow = false;
   protected _optionLightMap = false;
   protected _optionFog = false;
   // @attribute
   //_program = MO.Class.register(o, new MO.AGetter('_program'));
   protected _program = null;
   protected _vertexTemplate = null;
   protected _fragmentTemplate = null;
   //..........................................................
   // @method
   //o.setup = MO.Method.empty;

   //==========================================================
   // <T>测试是否准备好x。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   public testReady() {
      return this._ready;
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
      this._program.setParameter(name, value, count);
   }

   //==========================================================
   // <T>设置取样器。</T>
   //
   // @method
   // @param name:String 名称
   // @param texture:FG3dTexture 纹理
   //==========================================================
   public setSampler(name, texture) {
      this._program.setSampler(name, texture);
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
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
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
                  throw new FError(o, "Can't find renderable vertex buffer. (linker={1})", linker);
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
      var o = this;
      // 选择技术
      o._graphicContext.setProgram(o._program);
      // 绘制所有对象
      for (var i = 0; i < count; i++) {
         var renderable = renderables.at(offset + i);
         o.drawRenderable(region, renderable);
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
   public drawRegion(region, offset, count) {
      var o = this;
      // 根据效果类型进行分组
      var renderabels = region.renderables();
      for (var n = 0; n < count;) {
         // 获得分组
         var groupBegin = n;
         var groupEnd = count;
         var groupRenderable = renderabels.at(offset + groupBegin);
         var groupMaterial = groupRenderable.materialReference();
         for (var i = n; i < count; i++) {
            var renderable = renderabels.at(offset + i);
            var material = renderable.materialReference();
            if (groupMaterial != material) {
               groupEnd = i;
               break;
            }
            n++;
         }
         // 绘制当前渲染组
         o.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
      }
   }

   //==========================================================
   // <T>加载配置信息。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      var o = this;
      var context = o._graphicContext;
      var program = o._program = context.createProgram();
      // 加载配置
      /*var xnodes = xconfig.nodes();
      var count = xnodes.count();
      for (var i = 0; i < count; i++) {
         var xnode = xnodes.get(i);
         if (xnode.isName('State')) {
            // 设置状态
            var name = xnode.get('name');
            var value = xnode.get('value');
            if (name == 'fill_mode') {
               o._stateFillCd = MO.Lang.Enum.parse(MO.EG3dFillMode, value);
            } else if (name == 'cull_mode') {
               o._stateCullCd = MO.Lang.Enum.parse(MO.EG3dCullMode, value);
            } else if (name == 'depth_mode') {
               o._stateDepth = true;
               o._stateDepthCd = MO.Lang.Enum.parse(MO.EG3dDepthMode, value);
            } else if (name == 'depth_write') {
               o._stateDepthWrite = MO.Lang.Boolean.parse(value);
            } else if (name == 'blend_mode') {
               o._stateBlend = MO.Lang.Boolean.parse(value);
               if (o._stateBlend) {
                  o._stateBlendSourceCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('source'));
                  o._stateBlendTargetCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('target'));
               }
            } else if (name == 'alpha_test') {
               o._stateAlphaTest = MO.RBoolean.parse(value);
            }
         } else if (xnode.isName('Option')) {
            // 设置配置
            var name = xnode.get('name');
            var value = xnode.get('value');
            if (name == 'shadow') {
               o._optionShadow = MO.Lang.Boolean.parse(value);
            } else if (name == 'lightmap') {
               o._optionLightMap = MO.Lang.Boolean.parse(value);
            } else if (name == 'fog') {
               o._optionFog = MO.Lang.Boolean.parse(value);
            }
         } else if (xnode.isName('Parameter')) {
            // 设置参数
            var parameter = MO.Class.create(MO.FG3dProgramParameter);
            parameter.loadConfig(xnode);
            program.parameters().set(parameter.name(), parameter);
         } else if (xnode.isName('Attribute')) {
            // 设置属性
            var attribute = MO.Class.create(MO.FG3dProgramAttribute);
            attribute.loadConfig(xnode);
            program.attributes().set(attribute.name(), attribute);
         } else if (xnode.isName('Sampler')) {
            // 设置取样
            var sampler = MO.Class.create(MO.FG3dProgramSampler);
            sampler.loadConfig(xnode);
            program.samplers().set(sampler.name(), sampler);
         } else if (xnode.isName('Source')) {
            // 设置代码
            var name = xnode.get('name');
            if (name == 'vertex') {
               o._vertexSource = xnode.value();
            } else if (name == 'fragment') {
               o._fragmentSource = xnode.value();
            } else {
               throw new MO.TError(o, 'Unknown source type. (name={1})', name);
            }
         } else {
            throw new MO.TError(o, 'Unknown config type. (name={1})', xnode.name());
         }
      }
      // 建立代码模板
      var vertexTemplate = o._vertexTemplate = MO.Class.create(MO.FG3dShaderTemplate);
      vertexTemplate.load(o._vertexSource);
      var fragmentTemplate = o._fragmentTemplate = MO.Class.create(MO.FG3dShaderTemplate);
      fragmentTemplate.load(o._fragmentSource);*/
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param p:effectInfo:SG3dEffectInfo 效果信息
   //==========================================================
   public build(p) {
      /*var o = this;
      var program = o._program;
      var parameters = program.parameters();
      var parameterCount = parameters.count();
      // 设置环境
      var tagContext = MO.RInstance.get(sk.common.tag.FTagContext);
      o.buildInfo(tagContext, p);
      // 生成顶点代码
      var source = o._vertexTemplate.parse(tagContext);
      var formatSource = MO.Lang.String.formatLines(source);
      program.upload(MO.EG3dShader.Vertex, formatSource);
      // 生成像素代码
      var source = o._fragmentTemplate.parse(tagContext);
      for (var i = 0; i < parameterCount; i++) {
         var parameter = parameters.at(i);
         var parameterName = parameter.name();
         var parameterDefine = parameter.define();
         if (parameterDefine) {
            source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
         }
      }
      var formatSource = MO.Lang.String.formatLines(source);
      program.upload(MO.EG3dShader.Fragment, formatSource);
      // 编译处理
      program.build();
      program.link();*/
   }

   //==========================================================
   // <T>加载渲染器。</T>
   //
   // @method
   //==========================================================
   public load() {
      //var xconfig = MO.Console.find(MO.FG3dEffectConsole).loadConfig(o._code);
      //o.loadConfig(xconfig);
   }
}
