﻿import {Objects} from '../../../runtime/common/lang/Objects';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {Scene} from '../base/Scene';
import {Region} from '../base/Region';
import {Content} from '../graphic/Content';
import {TechniqueMode} from './TechniqueMode';
import {TechniquePass} from './TechniquePass';

//==========================================================
// <T>渲染技术。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class Technique extends Content {
   // @attribute
   public code = null;
   public activeMode = null;
   public modes: Objects<TechniqueMode> = null;
   public passes: Objects<TechniquePass> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.modes = new Objects<TechniqueMode>();
      this.passes = new Objects<TechniquePass>();
   }

   //==========================================================
   // <T>注册技术模式。</T>
   //
   // @method
   // @param code 代码
   // @return 技术模式
   //==========================================================
   public registerMode(code: string): TechniqueMode {
      var mode: TechniqueMode = ClassUtil.create(TechniqueMode);
      mode.code = code;
      this.modes.push(mode);
      this.activeMode = mode;
      return mode;
   }

   //==========================================================
   // <T>选择技术模式。</T>
   //
   // @param code 代码
   // @return 技术模式
   //==========================================================
   public selectMode(p) {
   }

   //==========================================================
   // <T>增加过程模式。</T>
   //
   // @param code 代码
   // @return 技术模式
   //==========================================================
   public pushPass(pass: TechniquePass): void {
      AssertUtil.debugNotNull(pass);
      pass.technique = this;
      this.passes.push(pass);
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param color:SColor4 颜色
   //==========================================================
   public clear(color): void {
      var context = this._graphicContext;
      // 设置渲染目标
      context.setRenderTarget(null);
      // 清除颜色
      context.clear(color.red, color.green, color.blue, color.alpha, 1);
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param depth 深度
   //==========================================================
   public clearDepth(depth: number = 1): void {
      var context = this._graphicContext;
      context.clearDepth(depth);
   }

   //==========================================================
   // <T>排序渲染对象处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   public sortRenderables(a, b) {
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region 区域
   //==========================================================
   public drawRegion(region: Region) {
      // 设置区域属性
      region.technique = this;
      // 绘制所有过程
      var passes = this.passes;
      var count = passes.count();
      for (var i = 0; i < count; i++) {
         var pass = passes.at(i);
         region.setTechniquePass(pass, (i == count - 1));
         pass.drawRegion(region);
      }
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawStage(stage: Scene, region: Region) {
      var layers = stage.layers;
      var layerCount = layers.count();
      // 设置区域属性
      region.technique = this;
      // 绘制所有过程
      var passes = this.passes;
      var count = passes.count();
      for (var passIndex = 0; passIndex < count; passIndex++) {
         // 选择过程
         var pass = passes.at(passIndex);
         pass.drawBegin(region);
         // 绘制舞台层
         for (var layerIndex = 0; layerIndex < layerCount; layerIndex++) {
            var layer = layers.at(layerIndex);
            // 选用技术
            //var layerTechnique = layer.technique();
            //if (!layerTechnique) {
            //   layerTechnique = this;
            //}
            var layerTechnique: Technique = this;
            // 渲染单个层
            region.reset();
            region.renderables.assign(layer.visibleRenderables);
            if (layer.optionClearDepth) {
               layerTechnique.clearDepth();
            }
            // 绘制过程区域
            region.setTechniquePass(pass, (passIndex == count - 1));
            pass.drawRegion(region);
         }
         pass.drawEnd(region);
      }
      // 绘制处理
      this.present(region);
   }

   //==========================================================
   // <T>绘制完成处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   public present(p) {
      this.graphicContext.present();
   }
}
