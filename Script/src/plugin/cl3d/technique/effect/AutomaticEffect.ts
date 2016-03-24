import {Fatal} from '../../../../runtime/common/lang/Fatal';
import {StringBuffer} from '../../../../runtime/common/lang/StringBuffer';
import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {Effect} from '../../graphic/Effect';
import {Region} from '../../base/Region';
import {Renderable} from '../../base/Renderable';
import {ProgramAttribute} from '../../graphic/ProgramAttribute';
import {ProgramSampler} from '../../graphic/ProgramSampler';
import {VertexBuffer} from '../../graphic/VertexBuffer';
import {FMaterial} from '../../../../runtime/graphic/material/FMaterial';
import {EffectInfo} from '../graphic/EffectInfo';
import {AttributeEnum} from './AttributeEnum';
import {SamplerEnum} from './SamplerEnum';

//==========================================================
// <T>自动渲染器。</T>
//
// @author maocy
// @history 150114
//==========================================================
export class AutomaticEffect extends Effect {
   // @attribute
   protected _optionMerge = false;
   protected _optionBlendMode = true;
   // @attribute
   protected _supportInstance = false;
   protected _supportLayout = false;
   protected _supportMaterialMap = false;
   // @attribute
   protected _supportVertexColor = true;
   protected _supportVertexCoord = true;
   protected _supportVertexNormal = true;
   protected _supportVertexNormalFull = true;
   protected _supportVertexNormalCompress = false;
   protected _supportSkeleton = false;
   // @attribute
   protected _supportNormalInvert = true;
   protected _optionAmbient = true;
   protected _optionDiffuse = true;
   protected _optionSpecular = true;
   protected _optionReflect = true;
   protected _optionRefract = true;
   protected _dynamicVertexColor = true;
   protected _dynamicVertexCoord = true;
   protected _dynamicVertexNormal = true;
   protected _dynamicVertexNormalFull = true;
   protected _dynamicVertexNormalCompress = true;
   protected _dynamicInstance = true;
   protected _dynamicAlpha = true;
   protected _dynamicAmbient = true;
   protected _dynamicDiffuse = true;
   protected _dynamicDiffuseView = true;
   protected _dynamicSpecularColor = true;
   protected _dynamicSpecularLevel = true;
   protected _dynamicSpecularView = true;
   protected _dynamicLight = true;
   protected _dynamicReflect = true;
   protected _dynamicRefract = true;
   protected _dynamicEmissive = true;
   protected _dynamicHeight = true;
   protected _dynamicEnvironment = true;
   // @attribute
   protected _supportAlpha = true;
   protected _supportAmbient = true;
   protected _supportDiffuse = true;
   protected _supportDiffuseView = true;
   protected _supportSpecularColor = true;
   protected _supportSpecularLevel = true;
   protected _supportSpecularView = true;
   protected _supportLight = true;
   protected _supportReflect = true;
   protected _supportRefract = true;
   protected _supportEmissive = true;
   protected _supportHeight = true;
   protected _supportEnvironment = true;
   // @attribute
   protected _dynamicSkeleton = true;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      var context = this.graphicContext;
      var capability = context.capability;
      this._supportLayout = capability.optionLayout;
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param tagContext:FTagContext 模板环境
   // @param info:SG3dEffectInfo 渲染信息
   //==========================================================
   public buildInfo(tagContext, info: EffectInfo) {
      var context = this.graphicContext;
      var capability = context.capability;
      // 获得参数
      var flag = new StringBuffer();
      flag.append(info.techniqueModeCode)
      tagContext.set("technique.mode", info.techniqueModeCode);
      //............................................................
      // 支持纹理材质映射
      var om = this._optionMerge = info.optionMerge;
      if (om) {
         var mergeCount = info.mergeCount;
         var mergeStride = info.mergeStride;
         flag.append("|OI" + mergeCount);
         tagContext.setBoolean("option.instance", true);
         tagContext.set("instance.count", mergeCount);
         tagContext.set("instance.length", mergeStride * mergeCount);
      }
      //............................................................
      // 支持纹理材质映射
      if (capability.optionMaterialMap) {
         flag.append("|OM");
         tagContext.setBoolean("option.material.map", true);
         this._supportMaterialMap = true;
      }
      // 支持纹理法线反响
      if (info.optionNormalInvert) {
         flag.append("|ON");
         tagContext.setBoolean("option.normal.invert", true);
         this._supportNormalInvert = true;
      }
      // 支持纹理颜色
      if (info.optionColor) {
         flag.append("|OC");
         tagContext.setBoolean("option.color", true);
         this._optionAmbient = true;
      }
      // 支持纹理环境
      if (info.optionAmbient) {
         flag.append("|OA");
         tagContext.setBoolean("option.ambient", true);
         this._optionAmbient = true;
      }
      // 支持纹理散射
      if (info.optionDiffuse) {
         flag.append("|OD");
         tagContext.setBoolean("option.diffuse", true);
         this._optionDiffuse = true;
      }
      // 支持纹理高光
      if (info.optionSpecular) {
         flag.append("|OS");
         tagContext.setBoolean("option.specular", true);
         this._optionSpecular = true;
      }
      // 支持纹理反射
      if (info.optionReflect) {
         flag.append("|ORL");
         tagContext.setBoolean("option.reflect", true);
         this._optionReflect = true;
      }
      // 支持纹理折射
      if (info.optionRefract) {
         flag.append("|ORF");
         tagContext.setBoolean("option.refract", true);
         this._optionRefract = true;
      }
      //............................................................
      // 支持顶点颜色
      var ac = info.attributeContains(AttributeEnum.Color);
      this._dynamicVertexColor = (this._supportVertexColor && ac);
      if (this._dynamicVertexColor) {
         flag.append("|AC");
         tagContext.setBoolean("vertex.attribute.color", true);
      }
      // 支持顶点纹理
      var ad = info.attributeContains(AttributeEnum.Coord);
      this._dynamicVertexCoord = (this._supportVertexCoord && ad);
      if (this._dynamicVertexCoord) {
         flag.append("|AD");
         tagContext.setBoolean("vertex.attribute.coord", true);
      }
      // 支持法线
      var an = info.attributeContains(AttributeEnum.Normal);
      this._dynamicVertexNormal = (this._supportVertexNormal && an);
      if (this._dynamicVertexNormal) {
         flag.append("|AN");
         tagContext.setBoolean("vertex.attribute.normal", true);
      }
      // 支持全法线
      var ab = info.attributeContains(AttributeEnum.Binormal);
      var at = info.attributeContains(AttributeEnum.Tangent);
      var af = (an && ab && at);
      this._dynamicVertexNormalFull = (this._supportVertexNormalFull && af);
      if (this._dynamicVertexNormalFull) {
         flag.append("|ANF");
         tagContext.setBoolean("vertex.attribute.normal.full", true);
      }
      // 支持法线压缩
      this._dynamicVertexNormalCompress = info.optionNormalCompress;
      if (this._dynamicVertexNormalCompress) {
         flag.append("|ANC");
         tagContext.setBoolean("vertex.attribute.normal.compress", true);
      }
      //............................................................
      // 支持实例技术
      this._dynamicInstance = (this._supportInstance && capability.optionInstance);
      if (this._dynamicInstance) {
         flag.append("|SI");
         if (info) {
            tagContext.setBoolean("support.instance", true);
         }
      }
      // 支持骨骼技术
      this._dynamicSkeleton = this._supportSkeleton;
      if (this._dynamicSkeleton) {
         flag.append("|SS");
         if (info) {
            tagContext.setBoolean("support.skeleton", true);
         }
      }
      //............................................................
      // 支持透明技术
      var sdf = info.samplerContains(SamplerEnum.Diffuse);
      //var samplerAlpha  = info.samplerContains(ESampler.Alpha);
      //o._dynamicAlpha = (o._supportAlpha && samplerAlpha);
      this._dynamicAlpha = this._supportAlpha;
      if (this._dynamicAlpha) {
         flag.append("|RA");
         if (info) {
            tagContext.setBoolean("support.alpha", true);
         }
         this._optionBlendMode = true;
      } else {
         this._optionBlendMode = false;
      }
      // 支持环境色技术
      this._dynamicAmbient = this._supportAmbient;
      if (this._dynamicAmbient) {
         flag.append("|TA");
         if (info) {
            tagContext.setBoolean("support.ambient", true);
         }
         if (sdf) {
            flag.append("|TAS");
            if (info) {
               tagContext.setBoolean("support.ambient.sampler", true);
            }
         }
      }
      //............................................................
      // 支持透明纹理
      if (info.samplerContains(SamplerEnum.Alpha)) {
         tagContext.setBoolean("support.alpha.sampler", true);
      }
      //............................................................
      // 支持散射技术
      var snr = info.samplerContains(SamplerEnum.Normal);
      this._dynamicDiffuse = this._supportDiffuse && (this._dynamicVertexNormal || snr);
      if (this._supportDiffuse) {
         if (info) {
            tagContext.setBoolean("support.diffuse", true);
         }
         if (snr) {
            flag.append("|TDD");
            if (info) {
               tagContext.setBoolean("support.dump", true);
               tagContext.setBoolean("support.diffuse.dump", true);
            }
         } else if (this._dynamicVertexNormal) {
            flag.append("|TDN");
            if (info) {
               tagContext.setBoolean("support.diffuse.normal", true);
            }
         }
      }
      // 支持视角散射技术
      this._dynamicDiffuseView = (this._supportDiffuseView && (this._dynamicVertexNormal || snr));
      if (this._supportDiffuseView) {
         if (info) {
            tagContext.setBoolean("support.diffuse.view", true);
         }
         if (snr) {
            flag.append("|TDVD");
            if (info) {
               tagContext.setBoolean("support.dump", true);
               tagContext.setBoolean("support.diffuse.view.dump", true);
            }
         } else if (this._dynamicVertexNormal) {
            flag.append("|TDVN");
            if (info) {
               tagContext.setBoolean("support.diffuse.view.normal", true);
            }
         }
      }
      //............................................................
      // 支持高光技术
      var spc = info.samplerContains(SamplerEnum.SpecularColor);
      var spl = info.samplerContains(SamplerEnum.SpecularLevel);
      this._dynamicSpecularColor = (this._supportSpecularColor && spc);
      this._dynamicSpecularLevel = (this._supportSpecularLevel && spl);
      if ((this._dynamicSpecularColor || this._dynamicSpecularLevel) && this._dynamicVertexNormal) {
         flag.append("|TS");
         if (info) {
            tagContext.setBoolean("support.specular", true);
         }
         // 支持高光颜色技术
         if (this._dynamicSpecularColor) {
            flag.append("|TSC");
            if (info) {
               tagContext.setBoolean("support.specular.color", true);
            }
         }
         // 支持高光级别技术
         if (this._dynamicSpecularLevel) {
            flag.append("|TSL");
            if (info) {
               tagContext.setBoolean("support.specular.level", true);
            }
         } else {
            flag.append("|NSL");
            if (info) {
               tagContext.setBoolean("support.specular.normal", true);
            }
         }
      }
      // 支持视角高光技术
      this._dynamicSpecularView = this._supportSpecularView;
      if (this._dynamicSpecularView && this._dynamicVertexNormal) {
         flag.append("|TSV");
         if (info) {
            tagContext.setBoolean("support.specular.view", true);
         }
         // 支持高光颜色技术
         if (this._dynamicSpecularColor) {
            flag.append("|TSVC");
            if (info) {
               tagContext.setBoolean("support.specular.view.color", true);
            }
         }
         // 支持高光级别技术
         if (this._dynamicSpecularLevel) {
            flag.append("|TSVL");
            if (info) {
               tagContext.setBoolean("support.specular.view.level", true);
            }
         } else {
            flag.append("|NSVL");
            if (info) {
               tagContext.setBoolean("support.specular.view.normal", true);
            }
         }
      }
      //............................................................
      // 支持发光技术
      var slg = info.samplerContains(SamplerEnum.Light);
      this._dynamicLight = (this._supportLight && slg);
      if (this._dynamicLight) {
         flag.append("|TL");
         if (info) {
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.light", true);
         }
      }
      // 支持反射技术
      var slr = info.samplerContains(SamplerEnum.Reflect);
      this._dynamicReflect = (this._supportReflect && slr);
      if (this._dynamicReflect) {
         flag.append("|TRL");
         if (info) {
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.reflect", true);
         }
      }
      // 支持折射技术
      var slf = info.samplerContains(SamplerEnum.Refract);
      this._dynamicRefract = (this._supportRefract && slf);
      if (this._dynamicRefract) {
         flag.append("|TRF");
         if (info) {
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.refract", true);
         }
      }
      // 支持发光技术
      var sle = info.samplerContains(SamplerEnum.Emissive);
      this._dynamicEmissive = (this._supportEmissive && sle);
      if (this._dynamicEmissive) {
         flag.append("|TLE");
         if (info) {
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.emissive", true);
         }
      }
      //............................................................
      // 支持高度技术
      var shg = info.samplerContains(SamplerEnum.Height);
      this._dynamicHeight = (this._supportHeight && shg);
      if (this._dynamicHeight) {
         flag.append("|TH");
         if (info) {
            tagContext.setBoolean("support.height", true);
         }
      }
      //............................................................
      // 支持环境技术
      var sen = info.samplerContains(SamplerEnum.Environment);
      this._dynamicEnvironment = (this._supportEnvironment && sen);
      if (this._dynamicEnvironment) {
         flag.append("|TE");
         if (info) {
            tagContext.setBoolean("support.environment", true);
         }
      }
      //............................................................
      // 计算最大实例个数
      //o._dynamicInstance = o._supportInstance;
      //if(o._dynamicInstance){
      //var ic = capability.calculateInstanceCount(info.vertexBoneCount, info.vertexCount);
      //tagContext.set("instance.count", ic);
      //}
      // 计算骨头实例个数
      if (this._dynamicSkeleton) {
         var boneCount = capability.calculateBoneCount(info.vertexBoneCount, info.vertexCount);
         flag.append("|B" + boneCount);
         tagContext.set("bone.count", boneCount);
         tagContext.set("bone.array.count", boneCount * 3);
         tagContext.setBoolean("support.bone.weight.1", true);
         tagContext.setBoolean("support.bone.weight.2", true);
         tagContext.setBoolean("support.bone.weight.3", true);
         tagContext.setBoolean("support.bone.weight.4", true);
      }
      //............................................................
      // 设置代码
      tagContext.code = flag.flush();
   }

   //==========================================================
   // <T>绑定所有属性流。</T>
   //
   // @method
   // @param renderable 渲染对象
   //==========================================================
   public bindAttributes(renderable: Renderable) {
      var program = this.program;
      if (program.hasAttribute()) {
         var attributes = program.attributes();
         var count = attributes.count();
         for (var n = 0; n < count; n++) {
            var attribute: ProgramAttribute = attributes.at(n);
            if (attribute.statusUsed) {
               var buffer: VertexBuffer = renderable.findVertexBuffer(attribute.linker);
               program.setAttribute(attribute.name, buffer, buffer.formatCd);
            }
         }
      }
   }

   //==========================================================
   // <T>绑定所有取样器。</T>
   //
   // @method
   // @param region 渲染区域
   // @param renderable 渲染对象
   //==========================================================
   public bindSamplers(renderable: Renderable) {
      AssertUtil.debugNotNull(renderable);
      var program = this.program;
      // 绑定特定取样器
      //if (this._supportMaterialMap) {
      //   program.setSampler('fs_material', region.materialMap().texture());
      //}
      // 绑定取样器集合
      var material = renderable.material;
      if (program.hasSampler() && material) {
         var samplers = program.samplers();
         var count = samplers.count();
         for (var n = 0; n < count; n++) {
            var sampler: ProgramSampler = samplers.at(n);
            if (sampler.bind && sampler.statusUsed) {
               var name = sampler.name;
               var linker = sampler.linker;
               var texture = material.findTexture(linker);
               program.setSampler(name, texture);
            }
         }
      }
   }

   //==========================================================
   // <T>绑定所有取样器。</T>
   //
   // @method
   // @param renderable 渲染对象
   // @param material 渲染材质
   //==========================================================
   public bindMaterialSamplers(renderable: Renderable, material: FMaterial) {
      AssertUtil.debugNotNull(renderable);
      AssertUtil.debugNotNull(material);
      var program = this.program;
      // 绑定取样器集合
      if (program.hasSampler()) {
         var samplers = program.samplers();
         var count = samplers.count();
         for (var n = 0; n < count; n++) {
            var sampler: ProgramSampler = samplers.at(n);
            if (sampler.bind && sampler.statusUsed) {
               var linker = sampler.linker;
               var texture = material.findTexture(linker);
               program.setSampler(sampler.name, texture);
            }
         }
      }
   }

   //==========================================================
   // <T>绑定材质。</T>
   //
   // @param material 材质
   //==========================================================
   public bindMaterial(material: FMaterial) {
      AssertUtil.debugNotNull(material);
      var context = this.graphicContext;
      // 设置深度
      if (material.optionDepth) {
         context.setDepthMode(this.stateDepth, this.stateDepthCd);
      } else {
         context.setDepthMode(false);
      }
      // 设置深度输出
      context.setDepthMask(material.optionDepthWrite);
      // 设置透明
      if (material.optionAlpha) {
         context.setBlendFactors(this.stateBlend, this.stateBlendSourceCd, this.stateBlendTargetCd);
      } else {
         context.setBlendFactors(false);
      }
      // 设置双面
      if (material.optionDouble) {
         context.setCullingMode(false);
      } else {
         context.setCullingMode(this.stateDepth, this.stateCullCd);
      }
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param region 渲染区域
   // @param renderable  渲染对象
   //==========================================================
   public drawRenderable(region: Region, renderable: Renderable, index: number = 0) {
      var context = this.graphicContext;
      var program = this.program;
      // 绘制准备
      var info = (renderable as any).activeInfo;
      var layout = info.layout;
      if (!layout) {
         layout = info.layout = context.createLayout();
         // 绑定属性流集合
         if (this._supportLayout) {
            layout.bind();
            this.bindAttributes(renderable);
            layout.unbind();
            layout.active();
         } else {
            context.recordBegin();
            this.bindAttributes(renderable);
            context.recordEnd();
            layout.linkBuffers(context.recordBuffers);
         }
         // 绑定取样器集合
         context.recordBegin();
         this.bindSamplers(renderable);
         context.recordEnd();
         layout.linkSamplers(context.recordSamplers);
      } else {
         // 绑定所有属性流
         if (this._supportLayout) {
            layout.active();
         } else {
            layout.bindBuffers();
         }
         // 绑定取样器集合
         layout.bindSamplers();
      }
      //..........................................................
      // 绘制处理
      var indexCount = 0;
      var indexBuffers = (renderable as any).indexBuffers;
      if (indexBuffers) {
         indexCount = indexBuffers.count();
      }
      if (indexCount > 1) {
         var materials = (renderable as any).materials;
         for (var i = 0; i < indexCount; i++) {
            var indexBuffer = indexBuffers.at(i);
            if (materials) {
               var material = materials.at(i);
               if (material) {
                  this.bindMaterialSamplers(renderable, material);
               }
            }
            context.drawTriangles(indexBuffer);
         }
      } else if (indexCount == 1) {
         var indexBuffer = indexBuffers.first();
         context.drawTriangles(indexBuffer);
      } else {
         throw new Fatal(this, 'Index buffer is not found.');
      }
      // 取消绑定取样器集合（TODO：不执行也正确）
      // layout.unbindSamplers();
      //..........................................................
      // 绘制完成
      if (this._supportLayout) {
         layout.deactive();
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
      //  if(count > 1){
      //     var modelConsole = RConsole.find(FE3rModelConsole);
      //     var model = modelConsole.merge(this, region, offset, count);
      //     if(model){
      //        var context = this.graphicContext;
      //        var meshes = model.meshes();
      //        var meshCount = meshes.count();
      //        var spaceName = region.spaceName();
      //        // 获得首个渲染器
      //        var mesh = meshes.first();
      //        var info = mesh.selectInfo(spaceName);
      //        var effect = info.effect;
      //        if(!effect){
      //           effect = info.effect = MO.Console.find(MO.FG3dEffectConsole).find(context, region, mesh);
      //        }
      //        // 激活效果器
      //        for(var i = 1; i < meshCount; i++){
      //           var mesh = meshes.getAt(i);
      //           var info = mesh.selectInfo(spaceName);
      //           info.effect = effect;
      //        }
      //        // 绘制渲染集合
      //        return effect.drawRenderables(region, meshes, 0, meshCount);
      //     }
      //  }
      this.drawRenderables(region, renderables, offset, count);
   }
}
