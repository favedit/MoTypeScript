import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {FRegion} from '../../base/FRegion';
import {FDeferredTechnique} from '../FDeferredTechnique';
import {FSelectTechnique} from '../FSelectTechnique';
import {FTechniqueConsole} from '../FTechniqueConsole';
import {FPipeline} from './FPipeline';

//==========================================================
// <T>渲染属性类型枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
export class FDeferredPipeline extends FPipeline{

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
      super.setup();
      // 设置渲染区域
      this.region = new FRegion();
      // 设置渲染技术
      var techniqueConsole: FTechniqueConsole = ServiceUtil.find(FTechniqueConsole);
      this.drawTechnique = techniqueConsole.find(this._graphicContext, FDeferredTechnique);
      this.selectTechnique = <FSelectTechnique>techniqueConsole.find(this._graphicContext, FSelectTechnique);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess(): boolean {
      var context = this._graphicContext;
      if (!context) {
         return false;
      }
      var stage = this.scene;
      if (!stage) {
         return false;
      }
      var technique = this.drawTechnique;
      if (!technique) {
         return false;
      }
      var region: FRegion = this.region;
      region.camera = this.camera;
      region.backgroundColor = stage.backgroundColor;
      // 统计处理
      //var statistics = region._statistics = this._statistics;
      //statistics.resetFrame();
      //statistics._frame.begin();
      //..........................................................
      //statistics._frameProcess.begin();
      // 更新区域（更新光源相机等特殊处理）
      context.prepare();
      //technique.updateRegion(region);
      // 清空区域
      region.prepare();
      //region.change();
      // 处理所有层
      var layers = stage.layers;
      var layerCount = layers.count();
      for (var i = 0; i < layerCount; i++) {
         var layer = layers.at(i);
         // 过滤单个层渲染信息
         region.reset();
         //layer.process(region);
         layer.filterRenderables(region);
         region.update();
      }
      // 处理所有渲染集合
      // RConsole.find(FE3dStageConsole).process(region);
      //statistics._frameProcess.end();
      //..........................................................
      // 绘制舞台
      //statistics._frameDraw.begin();
      if (region.isChanged()) {
         technique.drawStage(stage, region);
      }
      //statistics._frameDraw.end();
      //..........................................................
      // 处理完成
      //statistics._frame.end();
      return true;
   }
}
