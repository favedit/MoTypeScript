import {ObjectBase} from '../../../../runtime/common/lang/ObjectBase';
import {Listeners} from '../../../../runtime/common/lang/Listeners';
import {ObjectUtil} from '../../../../runtime/common/lang/ObjectUtil';
import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {Camera} from '../../../runtime/graphic/camera/Camera';
import {GraphicContext} from '../../graphic/GraphicContext';
import {Content} from '../../graphic/Content';
import {Technique} from '../Technique';
import {SelectTechnique} from '../SelectTechnique';
import {Scene} from '../../base/Scene';
import {Region} from '../../base/Region';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export abstract class Pipeline extends Content {
   // 场景
   public scene: Scene;
   // 绘制技术
   public drawTechnique: Technique;
   // 选择技术
   public selectTechnique: SelectTechnique;
   // 舞台
   public region: Region;
   // 相机
   public camera: Camera;
   // 激活状态
   public statusActive: boolean;
   // 进入帧监听器
   public enterFrameListeners: Listeners;
   // 离开帧监听器
   public leaveFrameListeners: Listeners;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.enterFrameListeners = new Listeners(this);
      this.leaveFrameListeners = new Listeners(this);
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess(): boolean {
      // 检查参数
      var context = this._graphicContext;
      AssertUtil.debugNotNull(context);
      var scene = this.scene;
      if (!scene) {
         return false;
      }
      var technique = this.drawTechnique;
      if (!technique) {
         return false;
      }
      var region: Region = this.region;
      region.camera = this.camera;
      region.backgroundColor = scene.backgroundColor;
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
      var layers = scene.layers;
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
         technique.draw(scene, region);
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
      // 进入帧处理
      this.enterFrameListeners.process();
      // 场景处理
      this.scene.process(this.region);
      // 渲染处理
      this.onProcess();
      // 离开帧处理
      this.leaveFrameListeners.process();
   }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public selectTest(x: number, y: number): any {
      return this.selectTechnique.test(this.region, x, y);
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

   //==========================================================
   // <T>停止处理。</T>
   //==========================================================
   public dispose() {
      this.enterFrameListeners = ObjectUtil.dispose(this.enterFrameListeners);
      this.leaveFrameListeners = ObjectUtil.dispose(this.leaveFrameListeners);
      super.dispose();
   }
}