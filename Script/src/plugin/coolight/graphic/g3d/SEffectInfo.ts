import {FArray} from '../../../../runtime/common/lang/FArray';
// import {EG3dCullMode} from './EG3dCullMode';
// import {EG3dDepthMode} from './EG3dDepthMode';
// import {EG3dBlendMode} from './EG3dBlendMode';

//==========================================================
// <T>效果器信息。</T>
//
// @author maocy
// @history 150113
//==========================================================
export class SEffectInfo {
   // @attribute 代码
   public code = null;
   public techniqueCode = null;
   public techniqueModeCode = null;
   // @attribute 状态
   public optionMerge = null;
   public mergeCount = null;
   // @attribute 状态
   public fillModeCd = null;
   public optionCullMode = null;
   public cullModeCd = null;
   public optionDepthTest = null;
   public depthModeCd = null;
   public optionDepthWrite = null;
   public optionBlendMode = null;
   public blendSourceMode = null;
   public blendTargetMode = null;
   public optionAlphaTest = null;
   public optionNormalInvert = null;
   public optionNormalCompress = null;
   // @attribute 配置
   public supportInstance = null;
   // @attribute 顶点模式
   public vertexCount = 0;
   public vertexColor = null;
   public vertexCoord = null;
   public vertexNormal = null;
   public vertexNormalFull = null;
   public vertexSkeleton = null;
   public vertexBoneCount = 0;
   // @attribute 像素模式
   public fragmentAlpha = null;
   public fragmentBump = null;
   public fragmentAmbient = null;
   public fragmentDiffuse = null;
   public fragmentDiffuseView = null;
   public fragmentSpecularColor = null;
   public fragmentSpecularLevel = null;
   public fragmentSpecularView = null;
   public fragmentEnvironment = null;
   public fragmentLight = null;
   public fragmentReflect = null;
   public fragmentRefract = null;
   public fragmentEmissive = null;
   public fragmentHeight = null;
   // @attribute 参数信息
   public attributes: FArray = new FArray();
   public samplers: FArray = new FArray();

   //==========================================================
   // <T>判断是否存在属性信息。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return Boolean 是否存在
   //==========================================================
   public attributeContains(p) {
      return this.attributes.contains(p);
   }

   //==========================================================
   // <T>判断是否存在取样信息。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return Boolean 是否存在
   //==========================================================
   public samplerContains(p) {
      return this.samplers.contains(p);
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      var o = this;
      // @attribute 代码
      o.code = null;
      // @attribute 状态
      o.optionMerge = false;
      o.mergeCount = 0;
      // @attribute 状态
      //o.fillModeCd = EG3dFillMode.Fill;
      // o.optionCullMode = true;
      // o.cullModeCd = EG3dCullMode.Front;
      // o.optionDepthTest = true;
      // o.depthModeCd = EG3dDepthMode.Less;
      // o.optionDepthWrite = true;
      // o.optionBlendMode = false;
      // o.blendSourceMode = EG3dBlendMode.SrcAlpha;
      // o.blendTargetMode = EG3dBlendMode.OneMinusSrcAlpha;
      o.optionAlphaTest = false;
      o.optionNormalInvert = false;
      o.optionNormalCompress = true;
      // @attribute 配置
      o.supportInstance = false;
      // @attribute 顶点模式
      o.vertexCount = 0;
      o.vertexColor = false;
      o.vertexCoord = false;
      o.vertexNormal = false;
      o.vertexNormalFull = false;
      o.vertexSkeleton = false;
      o.vertexBoneCount = 0;
      // @attribute 像素模式
      o.fragmentAlpha = false;
      o.fragmentBump = false;
      o.fragmentAmbient = false;
      o.fragmentDiffuse = false;
      o.fragmentDiffuseView = false;
      o.fragmentSpecularColor = false;
      o.fragmentSpecularLevel = false;
      o.fragmentSpecularView = false;
      o.fragmentEnvironment = false;
      o.fragmentLight = false;
      o.fragmentReflect = false;
      o.fragmentRefract = false;
      o.fragmentEmissive = false;
      o.fragmentHeight = false;
      // @attribute 参数信息
      o.attributes.clear();
      o.samplers.clear();
   }
}
