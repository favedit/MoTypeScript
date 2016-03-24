import {FloatUtil} from '../../../runtime/common/lang/RFloat';
import {SColor4} from '../../../runtime/common/math/SColor4';

//==========================================================
// <T>材质信息。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class SMaterialInfo {
   //..........................................................
   // @attribute 效果名称
   public effectCode = 'automatic';
   // @attribute 变换名称
   public transformName = null;
   //..........................................................
   // @attribute 设置深度
   public optionDepth = null;
   // @attribute 设置写入深度
   public optionDepthWrite = null;
   // @attribute 设置双面
   public optionDouble = null;
   // @attribute 设置法线反向
   public optionNormalInvert = null;
   // @attribute 设置影子
   public optionShadow = null;
   // @attribute 设置自阴影
   public optionShadowSelf = null;
   //..........................................................
   // @attribute 设置光源
   //o.optionLight          = null;
   // @attribute 设置合并
   //o.optionMerge          = null;
   // @attribute 设置排序
   public optionSort = null;
   // @attribute 排序级别
   public sortLevel = null;
   // @attribute 设置比较
   //o.optionCompare        = null;
   // @attribute 设置动态
   //o.optionDynamic        = null;
   //..........................................................
   // @attribute 存储纹理
   //o.coordRateWidth       = 1.0;
   //o.coordRateHeight      = 1.0;
   // @attribute 透明信息
   public optionAlpha = null;
   public alphaBase = 1.0;
   public alphaRate = 1.0;
   public alphaLevel = 1.0;
   public alphaMerge = 1.0;
   // @attribute 颜色信息
   public optionColor = null;
   public colorMin = 0.0;
   public colorMax = 1.0;
   public colorBalance = 0.5;
   public colorRate = 1.0;
   //..........................................................
   // @attribute 设置光信息
   public optionVertex = null;
   public vertexColor = new SColor4();
   // @attribute 设置光信息
   public optionAmbient = null;
   public ambientColor = new SColor4();
   public ambientShadow = 1.0;
   // @attribute 散射光信息
   public optionDiffuse = null;
   public diffuseColor = new SColor4();
   public diffuseShadow = 1.0;
   // @attribute 散射光视角信息
   public optionDiffuseView = null;
   public diffuseViewColor = new SColor4();
   public diffuseViewShadow = 1.0;
   // @attribute 高光信息
   public optionSpecular = null;
   public specularColor = new SColor4();
   public specularBase = 1.0;
   public specularLevel = 1.0;
   public specularAverage = 1.0;
   public specularShadow = 1.0;
   public specularInfo = null;
   // @attribute 高光视角信息
   public optionSpecularView = null;
   public specularViewColor = new SColor4();
   public specularViewBase = 1.0;
   public specularViewRate = 1.0;
   public specularViewAverage = 1.0;
   public specularViewShadow = 1.0;
   public specularViewInfo = null;
   // @attribute 反射信息
   public optionReflect = null;
   public reflectColor = new SColor4();
   public reflectMerge = 1.0;
   public reflectShadow = 1.0;
   // @attribute 折射信息
   public optionRefract = null;
   public refractFrontColor = new SColor4();
   public refractBackColor = new SColor4();
   // @attribute 不透明信息
   public optionOpacity = null;
   public opacityColor = new SColor4();
   public opacityRate = 1.0;
   public opacityAlpha = 1.0;
   public opacityDepth = 1.0;
   public opacityTransmittance = 1.0;
   // @attribute 发光信息
   public optionEmissive = null;
   public emissiveColor = new SColor4();

   //==========================================================
   // <T>接收数据信息。</T>
   //
   // @method
   // @param info:SG3dMaterialInfo 材质信息
   //==========================================================
   public assign(info) {
      var o = this;
      // 设置属性
      o.effectCode = info.effectCode;
      //o.transformName = info.transformName;
      // 设置配置
      o.optionDepth = info.optionDepth;
      o.optionDepthWrite = info.optionDepthWrite;
      o.optionDouble = info.optionDouble;
      o.optionNormalInvert = info.optionNormalInvert;
      o.optionShadow = info.optionShadow;
      o.optionShadowSelf = info.optionShadowSelf;
      o.optionSort = info.optionSort;
      o.sortLevel = info.sortLevel;
      // 设置透明
      o.optionAlpha = info.optionAlpha;
      o.alphaBase = info.alphaBase;
      o.alphaRate = info.alphaRate;
      o.alphaLevel = info.alphaLevel;
      o.alphaMerge = info.alphaMerge;
      // 设置颜色
      o.optionColor = info.optionColor;
      o.colorMin = info.colorMin;
      o.colorMax = info.colorMax;
      o.colorBalance = info.colorBalance;
      o.colorRate = info.colorRate;
      // 设置顶点颜色
      o.optionVertex = info.optionVertex;
      o.vertexColor.assign(info.vertexColor);
      // 设置环境
      o.optionAmbient = info.optionAmbient;
      o.ambientColor.assign(info.ambientColor);
      o.ambientShadow = info.ambientShadow;
      // 设置散射
      o.optionDiffuse = info.optionDiffuse;
      o.diffuseColor.assign(info.diffuseColor);
      o.diffuseShadow = info.diffuseShadow;
      // 设置散射视角
      o.optionDiffuseView = info.optionDiffuseView;
      o.diffuseViewColor.assign(info.diffuseViewColor);
      o.diffuseViewShadow = info.diffuseViewShadow;
      // 设置高光
      o.optionSpecular = info.optionSpecular;
      o.specularColor.assign(info.specularColor);
      o.specularBase = info.specularBase;
      o.specularLevel = info.specularLevel;
      o.specularAverage = info.specularAverage;
      o.specularShadow = info.specularShadow;
      // 设置高光视角
      o.optionSpecularView = info.optionSpecularView;
      o.specularViewColor.assign(info.specularViewColor);
      o.specularViewBase = info.specularViewBase;
      o.specularViewRate = info.specularViewRate;
      o.specularViewAverage = info.specularViewAverage;
      o.specularViewShadow = info.specularViewShadow;
      // 设置反射
      o.optionReflect = info.optionReflect;
      o.reflectColor.assign(info.reflectColor);
      o.reflectMerge = FloatUtil.toRange(info.reflectMerge, 0, 2);
      o.reflectShadow = info.reflectShadow;
      // 设置折射
      o.optionRefract = info.optionRefract;
      o.refractFrontColor.assign(info.refractFrontColor);
      //o.refractFrontMerge = info.refractFrontMerge;
      //o.refractFrontShadow = info.refractFrontShadow;
      o.refractBackColor.assign(info.refractBackColor);
      //o.refractBackMerge = info.refractBackMerge;
      //o.refractBackShadow = info.refractBackShadow;
      // 设置不透明
      o.optionOpacity = info.optionOpacity;
      o.opacityColor.assign(info.opacityColor);
      o.opacityRate = info.opacityRate;
      o.opacityAlpha = info.optionAlpha;
      o.opacityDepth = info.opacityDepth;
      o.opacityTransmittance = info.optionTransmittance;
      // 设置发光
      o.optionEmissive = info.optionEmissive;
      o.emissiveColor.assign(info.emissiveColor);
   }

   //==========================================================
   // <T>计算数据信息。</T>
   //
   // @method
   // @param info:SG3dMaterialInfo 材质信息
   //==========================================================
   public calculate(info) {
      var o = this;
      // 设置属性
      o.effectCode = info.effectCode;
      o.transformName = info.transformName;
      // 设置配置
      o.optionDepth = info.optionDepth;
      o.optionDepthWrite = info.optionDepthWrite;
      o.optionDouble = info.optionDouble;
      o.optionNormalInvert = info.optionNormalInvert;
      o.optionShadow = info.optionShadow;
      o.optionShadowSelf = info.optionShadowSelf;
      o.optionSort = info.optionSort;
      o.sortLevel = info.sortLevel;
      // 设置透明
      o.optionAlpha = info.optionAlpha;
      o.alphaBase = info.alphaBase;
      o.alphaRate = info.alphaRate;
      o.alphaLevel = info.alphaLevel;
      o.alphaMerge = info.alphaMerge;
      // 设置颜色
      o.optionColor = info.optionColor;
      o.colorMin = info.colorMin;
      o.colorMax = info.colorMax;
      o.colorBalance = info.colorBalance;
      o.colorRate = info.colorRate;
      // 设置环境
      o.optionVertex = info.optionVertex;
      o.vertexColor.assignPower(info.vertexColor);
      // 设置环境
      o.optionAmbient = info.optionAmbient;
      o.ambientColor.assignPower(info.ambientColor);
      o.ambientShadow = info.ambientShadow;
      // 设置散射
      o.optionDiffuse = info.optionDiffuse;
      o.diffuseColor.assignPower(info.diffuseColor);
      o.diffuseShadow = info.diffuseShadow;
      // 设置散射视角
      o.optionDiffuseView = info.optionDiffuseView;
      o.diffuseViewColor.assignPower(info.diffuseViewColor);
      o.diffuseViewShadow = info.diffuseViewShadow;
      // 设置高光
      o.optionSpecular = info.optionSpecular;
      o.specularColor.assignPower(info.specularColor);
      o.specularBase = info.specularBase;
      o.specularLevel = info.specularLevel;
      o.specularAverage = info.specularAverage;
      o.specularShadow = info.specularShadow;
      // 设置高光视角
      o.optionSpecularView = info.optionSpecularView;
      o.specularViewColor.assignPower(info.specularViewColor);
      o.specularViewBase = info.specularViewBase;
      o.specularViewRate = info.specularViewRate;
      o.specularViewAverage = info.specularViewAverage;
      o.specularViewShadow = info.specularViewShadow;
      // 设置反射
      o.optionReflect = info.optionReflect;
      o.reflectColor.assignPower(info.reflectColor);
      o.reflectMerge = FloatUtil.toRange(info.reflectMerge, 0, 2);
      o.reflectShadow = info.reflectShadow;
      // 设置折射
      o.optionRefract = info.optionRefract;
      o.refractFrontColor.assignPower(info.refractFrontColor);
      //o.refractFrontMerge = info.refractFrontMerge;
      //o.refractFrontShadow = info.refractFrontShadow;
      o.refractBackColor.assignPower(info.refractBackColor);
      //o.refractBackMerge = info.refractBackMerge;
      //o.refractBackShadow = info.refractBackShadow;
      // 设置不透明
      o.optionOpacity = info.optionOpacity;
      o.opacityColor.assignPower(info.opacityColor);
      o.opacityRate = info.opacityRate;
      o.opacityAlpha = info.optionAlpha;
      o.opacityDepth = info.opacityDepth;
      o.opacityTransmittance = info.optionTransmittance;
      // 设置发光
      o.optionEmissive = info.optionEmissive;
      o.emissiveColor.assignPower(info.emissiveColor);
   }

   //==========================================================
   // <T>重置数据内容。</T>
   //
   // @method
   //==========================================================
   public reset() {
      var o = this;
      // 设置属性
      o.optionDepth = true;
      o.optionDepthWrite = true;
      o.optionDouble = false;
      o.optionNormalInvert = false;
      o.optionShadow = true;
      o.optionShadowSelf = true;
      o.optionSort = true;
      o.sortLevel = 0;
      // 设置属性
      //o.coordRateWidth = 1;
      //o.coordRateHeight = 1;
      // 设置属性
      o.optionAlpha = false;
      o.alphaBase = 0.2;
      o.alphaRate = 1;
      o.alphaLevel = 1;
      o.alphaMerge = 1;
      // 设置属性
      o.optionColor = true;
      o.colorMin = 0;
      o.colorMax = 1;
      o.colorBalance = 0.5;
      o.colorRate = 1;
      // 设置属性
      o.optionVertex = true;
      o.vertexColor.set(1, 1, 1, 1);
      // 设置属性
      o.optionAmbient = true;
      o.ambientColor.set(0.5, 0.5, 0.5, 1);
      o.ambientShadow = 1;
      // 设置属性
      o.optionDiffuse = true;
      o.diffuseColor.set(0.5, 0.5, 0.5, 1);
      o.diffuseShadow = 1;
      // 设置属性
      o.optionDiffuseView = true;
      o.diffuseViewColor.set(1, 1, 1, 1);
      o.diffuseViewShadow = 1;
      // 设置属性
      o.optionSpecular = true;
      o.specularColor.set(0.5, 0.5, 0.5, 1);
      o.specularBase = 0;
      o.specularLevel = 16;
      o.specularAverage = 1;
      o.specularShadow = 1;
      // 设置属性
      o.optionSpecularView = true;
      o.specularViewColor.set(1, 1, 1, 1);
      o.specularViewBase = 0;
      o.specularViewRate = 16;
      o.specularViewAverage = 1;
      o.specularViewShadow = 1;
      // 设置属性
      o.optionReflect = true;
      o.reflectColor.set(1, 1, 1, 1);
      o.reflectMerge = 1;
      o.reflectShadow = 1;
      // 设置属性
      o.optionRefract = true;
      o.refractFrontColor.set(1, 1, 1, 1);
      //o.refractFrontMerge = 1;
      //o.refractFrontShadow = 1;
      o.refractBackColor.set(1, 1, 1, 1);
      //o.refractBackMerge = 1;
      //o.refractBackShadow = 1;
      // 设置属性
      o.optionOpacity = true;
      o.opacityColor.set(1, 1, 1, 1);
      o.opacityRate = 1;
      o.opacityAlpha = 1;
      o.opacityDepth = 1;
      o.opacityTransmittance = 1;
      // 设置属性
      o.optionEmissive = true;
      o.emissiveColor.set(1, 1, 1, 1);
   }
}
