﻿import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {Texture} from '../../../runtime/graphic/material/Texture';
import {Region} from '../base/Region';
import {Content} from '../graphic/Content';
import {EffectConsole} from '../graphic/EffectConsole';
import {Technique} from './Technique';

//==========================================================
// <T>渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class TechniquePass extends Content {
   // @attribute
   public technique: Technique;
   public fullCode: string;
   public code: string;
   public index: number;
   public finish: boolean;
   protected _first: boolean;
   public inputTextures: Dictionary<Texture>;
   public outputTextures: Dictionary<Texture>;
   // @attribute
   //public materialMap;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._first = true;
      this.finish = false;
      this.inputTextures = new Dictionary<Texture>();
      this.outputTextures = new Dictionary<Texture>();
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
      var effectConsole = ServiceUtil.find(EffectConsole);
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
   // <T>首次绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawFirst(region: Region) {
   }

   //==========================================================
   // <T>开始绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawBegin(region: Region): boolean {
      if (this._first) {
         this.drawFirst(region);
         this._first = false;
      }
      return true;
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawRegion(region: Region) {
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
      // var capability = this.graphicContext.capability;
      // if (capability.optionMaterialMap) {
      //    var mm = this.materialMap;
      //    //mm.resize(MO.EG3dMaterialMap.Count, count);
      //    //var mm = region.materialMap();
      //    for (var i = 0; i < count; i++) {
      //       var renderable: any = renderables.get(i);
      //       renderable._materialId = i;
      //       var material = renderable.material;
      //       //mm.setUint8(i, MO.EG3dMaterialMap.AmbientColor, mi.ambientColor);
      //       //mm.setUint8(i, MO.EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
      //       //mm.setUint8(i, MO.EG3dMaterialMap.SpecularColor, mi.specularColor);
      //       //mm.setUint8(i, MO.EG3dMaterialMap.ReflectColor, mi.reflectColor);
      //       //mm.setUint8(i, MO.EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
      //    }
      //    mm.update();
      //    //region._materialMap = mm;
      // }
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

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this.inputTextures = ObjectUtil.dispose(this.inputTextures);
      this.outputTextures = ObjectUtil.dispose(this.outputTextures);
      // 父处理
      super.dispose();
   }
}
