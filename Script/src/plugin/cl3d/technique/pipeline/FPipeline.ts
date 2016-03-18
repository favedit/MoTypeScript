import {FObject} from '../../../../runtime/common/lang/FObject';
import {FCamera} from '../../../runtime/graphic/camera/FCamera';
import {FContext} from '../../graphic/FContext';
import {FTechnique} from '../../graphic/FTechnique';
import {FScene} from '../../base/FScene';
import {FRegion} from '../../base/FRegion';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FPipeline extends FObject {
   // 环境
   public context: FContext = null;

   // 场景
   public scene: FScene = null;

   // 技术
   public technique: FTechnique = null;

   // 舞台
   public region: FRegion = null;

   // 舞台
   public camera: FCamera = null;

   // 激活状态
   public statusActive: boolean = false;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      //this.region = new FRegion();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess(): boolean {
      var context = this.context;
      if (!context) {
         return false;
      }
      var stage = this.scene;
      if (!stage) {
         return false;
      }
      var technique = this.technique;
      if (!technique) {
         return false;
      }
      var region: FRegion = this.region;
      (region as any).camera = this.camera;
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

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public process() {
      this.scene.process(this.region);
      this.onProcess();
   }

   //==========================================================
   // <T>启动处理。</T>
   //==========================================================
   public start() {
      this.statusActive = true;
   }

   //==========================================================
   // <T>停止处理。</T>
   //==========================================================
   public stop() {
      this.statusActive = false;
   }
}