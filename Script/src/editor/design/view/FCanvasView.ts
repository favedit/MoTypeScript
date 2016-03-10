import {FView} from '../../runtime/framework/view/FView';
import {SSettings} from '../../../runtime/framework/SSettings';
import {RConsole} from '../../../runtime/core/RConsole';
import {FCanvas} from '../../base/view/webgl/FCanvas';
import {FScene} from '../../plugin/cl3d/base/FScene';
import {FDisplayLayer} from '../../plugin/cl3d/base/FDisplayLayer';
import {FPerspectiveCamera} from '../../plugin/cl3d/graphic/FPerspectiveCamera';
import {FPipelineConsole} from '../../plugin/cl3d/graphic/pipeline/FPipelineConsole';
import {FTechniqueConsole} from '../../plugin/cl3d/graphic/FTechniqueConsole';
import {FCube} from '../../plugin/cl3d/engine/shape/FCube';
import {FRegion} from '../../plugin/cl3d/engine/FRegion';
import {FGeneralTechnique} from '../../plugin/cl3d/engine/effect/FGeneralTechnique';

//==========================================================
// <T>画板视图。</T>
//==========================================================
export class FCanvasView extends FView {
   // 画板
   public canvas: FCanvas = null;
   // 场景
   public scene: FScene = null;
   // 背景层
   public backgroundLayer: FDisplayLayer = null;
   // 内容层
   public contentLayer: FDisplayLayer = null;
   // 内容层
   public camera: FPerspectiveCamera = null;

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public onSetup(): void {
      super.onSetup();
      // 创建画板
      var parameters = new Object();
      var settings = this.application.settings;
      var canvas = this.canvas = new FCanvas();
      canvas.setup(settings);
      var hCanvas = canvas.hCanvas;
      var context = canvas.context;
      // 创建场景
      var scene: FScene = this.scene = new FScene();
      var layer = this.backgroundLayer = new FDisplayLayer();
      scene.registerLayer('background', layer);
      var layer = this.contentLayer = new FDisplayLayer();
      scene.registerLayer('content', layer);
      // 创建相机
      var camera = this.camera = new FPerspectiveCamera();
      camera.position.set(0, 0, -20);
      camera.lookAt(0, 0, 0);
      camera.update();
      camera.projection.size.set(hCanvas.offsetWidth, hCanvas.offsetHeight);
      camera.projection.update();
      // 创建物件
      //var cube = new mo.plugin.cl3d.engine.shape.FSphere();
      var cube = new FCube();
      cube.setup(context);
      this.contentLayer.pushRenderable(cube);
      // 设置渲染技术
      var techniqueConsole = RConsole.find(FTechniqueConsole);
      var technique = techniqueConsole.find(context, FGeneralTechnique);
      // 设置渲染管道
      var pipelineConsole = RConsole.find(FPipelineConsole);
      var pipeline = pipelineConsole.alloc();
      pipeline.context = context;
      pipeline.region = new FRegion();
      pipeline.technique = technique;
      pipeline.camera = camera;
      pipeline.scene = scene;
      pipeline.start();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess() {
      super.onProcess();
      this.canvas.process();
   }
}