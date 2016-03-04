import {EScope} from '../../../../runtime/common/lang/EScope';
import {RString} from '../../../../runtime/common/lang/RString';
import {RClass} from '../../../../runtime/common/reflect/RClass';
import {FError} from '../../../../runtime/common/lang/FError';
import {RLogger} from '../../../../runtime/common/lang/RLogger';
import {FConsole} from '../../../../runtime/core/FConsole';
import {RAssert} from '../../../../runtime/common/RAssert';

//==========================================================
// <T>效果器管理器。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FG3dEffectConsole extends FConsole {
   // @attribute
   _scopeCd = EScope.Local;
   // @attribute
   _configs = null;
   _loadEffects = null;
   _registerEffects = null;
   _templateEffects = null;
   _effects = null;
   _effectInfo = null;
   _tagContext = null;
   // @attribute
   _thread = null;
   _interval = 300;

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess() {
      var o = this;
      var effects = o._loadEffects;
      effects.record();
      while (effects.next()) {
         var effect = effects.current();
         if (effect.processLoad()) {
            effects.removeCurrent();
         }
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      //o._configs = new MO.TDictionary();
      //o._loadEffects = new MO.TLooper();
      //o._registerEffects = new MO.TDictionary();
      //o._templateEffects = new MO.TDictionary();
      //o._effects = new MO.TDictionary();
      //o._effectInfo = new MO.SG3dEffectInfo();
      //o._tagContext = MO.Class.create(MO.FTagContext);
   }

   //==========================================================
   // <T>注册一个效果器。</T>
   //
   // @method
   // @param name:String 名称
   // @param effect:FG3dEffect 效果器
   //==========================================================
   public register(name, effect) {
      RAssert.debugNotEmpty(name);
      RAssert.debugNotNull(effect);
      this._registerEffects.set(name, effect);
   }

   //==========================================================
   // <T>注销一个效果器。</T>
   //
   // @method
   // @param name:String 名称
   //==========================================================
   public unregister(name) {
      RAssert.debugNotEmpty(name);
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
      var o = this;
      var clazz = o._registerEffects.get(name);
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
   // @method
   // @param context:FG3dContext 渲染环境
   // @param effectInfo:SG3dEffectInfo 效果环境
   // @param region:FG3dRegion 渲染区域
   // @param renderable:FG3dRenderable 渲染对象
   // @return FG3dEffect 效果器
   //==========================================================
   public buildEffectInfo(context, effectInfo, region, renderable) {
      var o = this;
      var capability = context.capability();
      // 设置技术
      var technique = region.technique();
      effectInfo.techniqueModeCode = technique.activeMode().code();
      effectInfo.optionMerge = renderable._optionMerge;
      if (effectInfo.optionMerge) {
         effectInfo.mergeCount = renderable.mergeMaxCount();
         effectInfo.mergeStride = renderable.mergeStride();
      }
      // 设置材质
      var mi = renderable.material().info();
      effectInfo.optionNormalInvert = mi.optionNormalInvert;
      effectInfo.optionColor = mi.optionColor;
      effectInfo.optionAmbient = mi.optionAmbient;
      effectInfo.optionDiffuse = mi.optionDiffuse;
      effectInfo.optionSpecular = mi.optionSpecular;
      effectInfo.optionReflect = mi.optionReflect;
      effectInfo.optionRefract = mi.optionRefract;
      // 设置定点属性
      effectInfo.vertexCount = renderable.vertexCount();
      // 设置顶点信息
      var vertexBuffers = renderable.vertexBuffers();
      var count = vertexBuffers.count();
      for (var i = 0; i < count; i++) {
         var vertexBuffer = vertexBuffers.at(i);
         var vertexCode = vertexBuffer.code();
         // 法线压缩判定（临时处理）
         if (vertexCode == 'normal') {
            var stride = vertexBuffer.stride();
            if (stride == 4) {
               effectInfo.optionNormalCompress = true;
            } else {
               effectInfo.optionNormalCompress = false;
            }
         }
         if (RString.isEmpty(vertexCode)) {
            throw new FError(o, 'Vertex buffer code is empty.');
         }
         effectInfo.attributes.push(vertexCode);
      }
      // 设置纹理信息
      var textures = renderable.textures();
      if (textures) {
         var count = textures.count();
         for (var i = 0; i < count; i++) {
            var textureCode = textures.name(i);
            if (RString.isEmpty(textureCode)) {
               throw new FError(o, 'Texture code is empty.');
            }
            effectInfo.samplers.push(textureCode);
         }
      }
      // 设置骨头信息
      var bones = renderable.bones();
      if (bones) {
         var boneCount = bones.count();
         effectInfo.vertexBoneCount = boneCount;
         var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
         if (boneCount > boneLimit) {
            boneCount = boneLimit;
         }
         renderable._boneLimit = boneCount;
         effectInfo.vertexBoneLimit = boneCount;
      }
   }

   //==========================================================
   // <T>获得渲染器模板。</T>
   //
   // @method
   // @param context:FG3dContext 环境对象
   // @param code:String 代码
   // @return FG3dEffect 渲染器模板
   //==========================================================
   public findTemplate(context, code) {
      var o = this;
      var effects = o._templateEffects;
      var effect = effects.get(code);
      if (effect == null) {
         // 创建效果器
         var effect = o.create(context, code);
         effect.load();
         RLogger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
         // 存储效果器
         effects.set(code, effect);
      }
      return effect;
   }

   //==========================================================
   // <T>根据渲染对象获得效果器。</T>
   //
   // @method
   // @param context:FG3dContext 环境对象
   // @param region:FG3dRegion 渲染区域
   // @param renderable:FG3dRenderable 渲染对象
   // @return FG3dEffect 效果器
   //==========================================================
   public find(context, region, renderable) {
      var o = this;
      // 获得环境
      //if (!MO.Class.isClass(context, MO.FGraphicContext)) {
      //   context = context.graphicContext();
      //}
      //if (!MO.Class.isClass(context, MO.FGraphicContext)) {
      //   throw new sk.common.lang.FError(o, 'Unknown context.');
      //}
      // 获得效果名称
      var effectCode = renderable.material().info().effectCode;
      if (RString.isEmpty(effectCode)) {
         effectCode = 'automatic'
      }
      if (effectCode == 'skeleton' || effectCode == 'skeleton.4') {
         if (renderable.bones() == null) {
            effectCode = 'automatic'
         }
      }
      var effectFlag = region.spaceName() + '.' + effectCode;
      // 查找模板
      var effectTemplate = o.findTemplate(context, effectFlag);
      if (effectTemplate) {
         // 生成标志
         var effectInfo = o._effectInfo;
         effectInfo.reset();
         o.buildEffectInfo(context, effectInfo, region, renderable);
         effectTemplate.buildInfo(o._tagContext, effectInfo);
         var flag = effectFlag + o._tagContext.code;
         // 查找效果器
         var effects = o._effects;
         var effect = effects.get(flag);
         if (!effect) {
            // 创建效果器
            effect = o.create(context, effectFlag);
            effect._flag = flag;
            effect.load();
            effect.build(o._effectInfo);
            RLogger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
         }
         // 存储效果器
         effects.set(flag, effect);
      }
      return effect;
   }

   //==========================================================
   // <T>加载配置文件。</T>
   //
   // @method
   // @param name:String 路径
   // @return TXmlNode 节点
   //==========================================================
   public loadConfig(name) {
      var o = this;
      // 查找配置
      var xconfig = o._configs.get(uri);
      if (!xconfig) {
         // 生成地址
         var uri = "{resource}/shader/" + name + ".xml";
         //var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parseUrl(uri);
         // 获得网络数据
         //xconfig = MO.Class.create(MO.FXmlConnection).send(url);
         // 加载配置信息
         o._configs.set(name, xconfig);
      }
      return xconfig;
   }
}
