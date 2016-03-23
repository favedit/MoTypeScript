import {RConsole} from '../../../runtime/core/RConsole';
import {FContent} from '../graphic/FContent';
import {FEffectConsole} from '../graphic/FEffectConsole';

//==========================================================
// <T>渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FTechniquePass extends FContent {
   // @attribute
   public technique;
   public fullCode: string;
   public code: string;
   public index: number;
   public finish: boolean;
   // @attribute
   public materialMap;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.finish = false;
   }

   //==========================================================
   // <T>获得全代码。</T>
   //
   // @method
   // @return String 全代码
   //==========================================================
   public setup() {
      //var o = this;
      //var map = o._materialMap = MO.Class.create(MO.FG3dMaterialMap);
      //map.linkGraphicContext(o);
      //map.setup(MO.EG3dMaterialMap.Count, 32);
   }

   //==========================================================
   // <T>排序渲染对象处理。</T>
   //
   // @method
   // @param source:FG3dRenderable 区域
   // @param target:FG3dRenderable 目标
   //==========================================================
   public sortRenderables(source, target) {
      var sourceMaterial = source.material;
      var targetMaterial = target.material;
      // 按照效果排序
      if (sourceMaterial.optionAlpha && targetMaterial.optionAlpha) {
         if (sourceMaterial.sortLevel != targetMaterial.sortLevel) {
            return sourceMaterial.sortLevel - targetMaterial.sortLevel;
         }
         var sourceEffect = source.activeEffect;
         var targetEffect = target.activeEffect;
         if (sourceEffect == targetEffect) {
            // 按照材质排序
            var sourceReference = source.materialReference;
            var targetReference = target.materialReference;
            if (sourceReference && targetReference) {
               return sourceReference.hashCode() - targetReference.hashCode();
            }
         }
         return sourceEffect.hashCode - targetEffect.hashCode;
      } else if (sourceMaterial.optionAlpha && !targetMaterial.optionAlpha) {
         return 1;
      } else if (!sourceMaterial.optionAlpha && targetMaterial.optionAlpha) {
         return -1;
      } else {
         if (sourceMaterial.sortLevel != targetMaterial.sortLevel) {
            return sourceMaterial.sortLevel - targetMaterial.sortLevel;
         }
         var sourceEffect = source.activeEffect();
         var targetEffect = target.activeEffect();
         if (sourceEffect == targetEffect) {
            // 按照材质排序
            var sourceReference = source.materialReference;
            var targetReference = target.materialReference;
            if (sourceReference && targetReference) {
               return sourceReference.hashCode - targetReference.hashCode;
            }
         }
         return sourceEffect.hashCode - targetEffect.hashCode;
      }
   }

   //==========================================================
   // <T>激活效果器。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   // @param renderables:TObjects 渲染集合
   //==========================================================
   public activeEffects(region, renderables) {
      var spaceName = region.spaceName;
      var effectConsole = RConsole.find(FEffectConsole);
      // 关联渲染器
      var count = renderables.count();
      for (var i = 0; i < count; i++) {
         var renderable = renderables.at(i);
         var info = renderable.selectInfo(spaceName);
         if (!info.effect) {
            info.effect = effectConsole.find(this.graphicContext, region, renderable);
         }
      }
   }

   //==========================================================
   // <T>开始绘制处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawBegin(region) {
      this.technique.clear(region.backgroundColor);
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawRegion(region) {
      // 获得渲染集合
      var renderables = region.renderables;
      var count = renderables.count();
      if (count == 0) {
         return;
      }
      //..........................................................
      //var statistics = region._statistics;
      //statistics._frameDrawSort.begin();
      // 激活效果器
      this.activeEffects(region, renderables);
      // 控件排序
      renderables.sort(this.sortRenderables);
      //statistics._frameDrawSort.end();
      //..........................................................
      // 材质映射
      var capability = this.graphicContext.capability;
      if (capability.optionMaterialMap) {
         var mm = this.materialMap;
         //mm.resize(MO.EG3dMaterialMap.Count, count);
         //var mm = region.materialMap();
         for (var i = 0; i < count; i++) {
            var r = renderables.get(i);
            r._materialId = i;
            var m = r.material();
            var mi = m.info();
            //mm.setUint8(i, MO.EG3dMaterialMap.AmbientColor, mi.ambientColor);
            //mm.setUint8(i, MO.EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
            //mm.setUint8(i, MO.EG3dMaterialMap.SpecularColor, mi.specularColor);
            //mm.setUint8(i, MO.EG3dMaterialMap.ReflectColor, mi.reflectColor);
            //mm.setUint8(i, MO.EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
         }
         mm.update();
         region._materialMap = mm;
      }
      //..........................................................
      // 根据效果类型进行分组
      for (var n: number = 0; n < count;) {
         // 获得分组
         var groupBegin: number = n;
         var groupEnd: number = count;
         var effect = renderables.at(groupBegin).activeEffect();
         for (var i = n; i < count; i++) {
            var activeEffect = renderables.at(i).activeEffect();
            if (effect != activeEffect) {
               groupEnd = i;
               break;
            }
            n++;
         }
         // 绘制当前渲染组
         effect.drawRegion(region, groupBegin, groupEnd - groupBegin);
      }
   }

   //==========================================================
   // <T>结束绘制处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawEnd(region) {
   }
}
