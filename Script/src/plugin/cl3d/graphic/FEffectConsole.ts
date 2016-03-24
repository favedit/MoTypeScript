import {ScopeEnum} from '../../../runtime/common/lang/ScopeEnum';
import {FError} from '../../../runtime/common/lang/FError';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {FLooper} from '../../../runtime/common/lang/FLooper';
import {StringUtil} from '../../../runtime/common/lang/StringUtil';
import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {FTagContext} from '../../../runtime/common/tag/FTagContext';
import {FXmlConnection} from '../../../runtime/common/net/FXmlConnection';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {FEnvironmentConsole} from '../../../runtime/core/console/FEnvironmentConsole';
import {FConsole} from '../../../runtime/core/FConsole';
import {RConsole} from '../../../runtime/core/RConsole';
import {FGraphicContext} from '../../../runtime/graphic/core/FGraphicContext';
import {FMaterial} from '../../../runtime/graphic/material/FMaterial';
import {FRenderable} from '../base/FRenderable';
import {FRegion} from '../base/FRegion';
import {SEffectInfo} from './SEffectInfo';
import {FEffect} from './FEffect';

//==========================================================
// <T>效果器管理器。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FEffectConsole extends FConsole {
   // @attribute
   public _configs: Dictionary<any>;
   public _loadEffects: FLooper;
   public _registerEffects: Dictionary<Function>;
   public _templateEffects: Dictionary<FEffect>;
   public _effects: Dictionary<FEffect>;
   public _effectInfo: SEffectInfo;
   public _tagContext: FTagContext;
   // @attribute
   public _thread;
   public _interval;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._configs = new Dictionary();
      this._loadEffects = new FLooper();
      this._registerEffects = new Dictionary<Function>();
      this._templateEffects = new Dictionary<FEffect>();
      this._effects = new Dictionary<FEffect>();
      this._effectInfo = new SEffectInfo();
      this._tagContext = RClass.create(FTagContext);
      this._interval = 300;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess() {
      var effects = this._loadEffects;
      effects.record();
      while (effects.next()) {
         var effect = effects.current();
         if (effect.processLoad()) {
            effects.removeCurrent();
         }
      }
   }

   //==========================================================
   // <T>注册一个效果器。</T>
   //
   // @method
   // @param name:String 名称
   // @param effect:FG3dEffect 效果器
   //==========================================================
   public register(name, effect) {
      AssertUtil.debugNotEmpty(name);
      AssertUtil.debugNotNull(effect);
      this._registerEffects.set(name, effect);
   }

   //==========================================================
   // <T>注销一个效果器。</T>
   //
   // @method
   // @param name:String 名称
   //==========================================================
   public unregister(name) {
      AssertUtil.debugNotEmpty(name);
      this._registerEffects.set(name, null);
   }

   //==========================================================
   // <T>创建效果器。</T>
   //
   // @method
   // @param context:FG3dContext 环境
   // @param name:String 名称
   //==========================================================
   public create(context, name) {
      var clazz = this._registerEffects.get(name);
      if (!clazz) {
         throw new FError(this, 'Unknown effect type name. (type={1})', clazz);
      }
      var effect = RClass.create(clazz);
      effect.linkGraphicContext(context);
      effect.setup();
      return effect;
   }

   //==========================================================
   // <T>建立效果器信息。</T>
   //
   // @param context 渲染环境
   // @param effectInfo 效果环境
   // @param region 渲染区域
   // @param renderable 渲染对象
   //==========================================================
   public buildEffectInfo(context, effectInfo: SEffectInfo, region: FRegion, renderable: FRenderable) {
      var capability = context.capability;
      // 设置技术
      var technique = region.technique;
      effectInfo.techniqueModeCode = technique.activeMode.code;
      //effectInfo.optionMerge = renderable._optionMerge;
      //if (effectInfo.optionMerge) {
      //   effectInfo.mergeCount = renderable.mergeMaxCount();
      //   effectInfo.mergeStride = renderable.mergeStride();
      //}
      // 设置材质
      // var materialInfo = renderable.material.info;
      // effectInfo.optionNormalInvert = materialInfo.optionNormalInvert;
      // effectInfo.optionColor = materialInfo.optionColor;
      // effectInfo.optionAmbient = materialInfo.optionAmbient;
      // effectInfo.optionDiffuse = materialInfo.optionDiffuse;
      // effectInfo.optionSpecular = materialInfo.optionSpecular;
      // effectInfo.optionReflect = materialInfo.optionReflect;
      // effectInfo.optionRefract = materialInfo.optionRefract;
      // 设置定点属性
      effectInfo.vertexCount = renderable.vertexCount;
      // 设置顶点信息
      var vertexBuffers = renderable.vertexBuffers;
      var count = vertexBuffers.count();
      for (var i = 0; i < count; i++) {
         var vertexBuffer = vertexBuffers.at(i);
         var vertexCode = vertexBuffer.code;
         AssertUtil.debugNotEmpty(vertexCode);
         // 法线压缩判定（临时处理）
         if (vertexCode == 'normal') {
            var stride = vertexBuffer.stride;
            if (stride == 4) {
               effectInfo.optionNormalCompress = true;
            } else {
               effectInfo.optionNormalCompress = false;
            }
         }
         effectInfo.attributes.push(vertexCode);
      }
      // 设置纹理信息
      var material: FMaterial = renderable.material;
      AssertUtil.debugNotNull(material);
      var textures = material.textures;
      if (textures) {
         var count: number = textures.count();
         for (var i: number = 0; i < count; i++) {
            var textureCode: string = textures.name(i);
            AssertUtil.debugNotEmpty(textureCode);
            effectInfo.samplers.push(textureCode);
         }
      }
      // 设置骨头信息
      // var bones = renderable.bones;
      // if (bones) {
      //    var boneCount = bones.count();
      //    effectInfo.vertexBoneCount = boneCount;
      //    var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
      //    if (boneCount > boneLimit) {
      //       boneCount = boneLimit;
      //    }
      //    renderable._boneLimit = boneCount;
      //    //effectInfo.vertexBoneLimit = boneCount;
      // }
   }

   //==========================================================
   // <T>获得渲染器模板。</T>
   //
   // @param context 环境对象
   // @param code 代码
   // @return 渲染器模板
   //==========================================================
   public findTemplate(context, code) {
      var effects = this._templateEffects;
      var effect: FEffect = effects.get(code);
      if (!effect) {
         // 创建效果器
         effect = this.create(context, code);
         effect.load();
         LoggerUtil.info(this, 'Create effect template. (code={1}, instance={2})', code, effect);
         // 存储效果器
         effects.set(code, effect);
      }
      return effect;
   }

   //==========================================================
   // <T>根据渲染对象获得效果器。</T>
   //
   // @param context 环境对象
   // @param region 渲染区域
   // @param renderable 渲染对象
   // @return 效果器
   //==========================================================
   public find(context, region, renderable) {
      // 获得环境
      if (context.graphicContext) {
         context = context.graphicContext;
      }
      AssertUtil.debugTrue(context instanceof FGraphicContext);
      // 获得效果名称
      var effectCode = renderable.material.effectCode;
      var effectFlag = region.spaceName + '.' + effectCode;
      // 查找模板
      var effectTemplate = this.findTemplate(context, effectFlag);
      if (effectTemplate) {
         // 生成标志
         var effectInfo = this._effectInfo;
         effectInfo.reset();
         this.buildEffectInfo(context, effectInfo, region, renderable);
         effectTemplate.buildInfo(this._tagContext, effectInfo);
         var flag = effectFlag + this._tagContext.code;
         // 查找效果器
         var effects = this._effects;
         var effect = effects.get(flag);
         if (!effect) {
            // 创建效果器
            effect = this.create(context, effectFlag);
            effect.flag = flag;
            effect.load();
            effect.build(this._effectInfo);
            LoggerUtil.info(this, 'Create effect. (name={1}, instance={2})', effectCode, effect);
         }
         // 存储效果器
         effects.set(flag, effect);
      }
      return effect;
   }

   //==========================================================
   // <T>加载配置文件。</T>
   //
   // @param name 路径
   // @return 节点
   //==========================================================
   public loadConfig(name) {
      // 查找配置
      var xconfig = this._configs.get(name);
      if (!xconfig) {
         // 生成地址
         var uri = "${resource}/shader/" + name + ".xml";
         var url = RConsole.find(FEnvironmentConsole).parseUrl(uri);
         // 获得网络数据
         xconfig = RClass.create(FXmlConnection).send(url);
         // 加载配置信息
         this._configs.set(name, xconfig);
      }
      return xconfig;
   }
}
