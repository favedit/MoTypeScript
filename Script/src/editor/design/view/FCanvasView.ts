import {ALinker} from '../../runtime/common/reflect/ALinker';
import {RConsole} from '../../../runtime/core/RConsole';
import {FView} from '../../runtime/framework/view/FView';
import {FKeyboardConsole} from '../../runtime/ui/console/FKeyboardConsole';
import {EKeyCode} from '../../runtime/ui/EKeyCode';
import {FCanvas} from '../../base/view/webgl/FCanvas';
import {FScene} from '../../plugin/cl3d/base/FScene';
import {FDisplayLayer} from '../../plugin/cl3d/base/FDisplayLayer';
import {FPerspectiveCamera} from '../../runtime/graphic/camera/FPerspectiveCamera';
import {FPipeline} from '../../plugin/cl3d/technique/pipeline/FPipeline';
import {FForwardPipeline} from '../../plugin/cl3d/technique/pipeline/FForwardPipeline';
import {FPipelineConsole} from '../../plugin/cl3d/technique/pipeline/FPipelineConsole';
import {FE3dModelConsole} from '../../plugin/cl3d/shape/instance/FE3dModelConsole';
//import {FE3dTemplatelConsole} from '../../plugin/cl3d/shape/instance/FE3dTemplatelConsole';
import {FCube} from '../../plugin/cl3d/shape/FCube';
import {SSettings} from '../application/SSettings';
import {EEvent} from '../../runtime/ui/EEvent';
import {SMouseEvent} from '../../runtime/ui/event/SMouseEvent';

import {FTemplateResourceConsole} from '../../plugin/cl3d/resource/FTemplateResourceConsole';
import {FE3rMaterialConsole} from '../../plugin/cl3d/shape/render/FE3rMaterialConsole';
import {FE3dTemplateConsole} from '../../plugin/cl3d/shape/instance/FE3dTemplateConsole';

declare var id_info;

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
   // 内容层
   public pipeline: FPipeline = null;
   // 按键管理器
   @ALinker(FKeyboardConsole)
   public _keyboardConsole: FKeyboardConsole = null;

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public onSetup(): void {
      super.onSetup();
      // 创建画板
      var parameters = new Object();
      var settings: SSettings = this.application.settings;
      var canvas = this.canvas = new FCanvas();
      canvas.setup(settings);
      canvas.addListener(EEvent.MouseMove, this, this.onMouseMove);
      var hCanvas = canvas.hCanvas;
      var context = canvas.context;
      // 创建场景
      var scene: FScene = this.scene = new FScene();
      scene.backgroundColor.set(0.9, 0.9, 0.9, 1);
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
      //var cube = new mo.plugin.cl3d.shape.FSphere();
      // var cube = new FCube();
      // cube.setup(context);
      // this.contentLayer.pushRenderable(cube);

      // var modelConsole: FE3dModelConsole = RConsole.find(FE3dModelConsole);
      // var model = modelConsole.allocByUrl(context, '/sk/res/model/xiong/xiong.model');
      // model.matrix.tx = 0.2;
      // model.matrix.sx = 0.1;
      // model.matrix.sy = 0.1;
      // model.matrix.sz = 0.1;
      // model.matrix.updateForce();
      // model.matrix.addRotationX(-Math.PI / 2);
      // model.matrix.addRotationY(Math.PI);
      // this.contentLayer.pushDisplay(model);

      //var mrConsole: FE3rMaterialConsole = RConsole.find(FE3rMaterialConsole);
      //var material = mrConsole.loadByUrl(context, '/sk/res/model/xiong/xiong.material');
      
      // var trConsole:FTemplateResourceConsole = RConsole.find(FTemplateResourceConsole);
      // var templateResource = trConsole.loadByUrl('/sk/res/model/xiong/xiong.template');
      
      var trConsole:FE3dTemplateConsole = RConsole.find(FE3dTemplateConsole);
      var template = trConsole.allocByUrl(context, '/sk/res/model/xiong/xiong.template');
      this.contentLayer.pushDisplay(template);
      
      
      // 设置渲染管道
      var pipelineConsole = RConsole.find(FPipelineConsole);
      var pipeline = this.pipeline = pipelineConsole.alloc(context, FForwardPipeline);
      pipeline.scene = scene;
      pipeline.camera = camera;
      //pipeline.start();
   }

   _cameraMoveRate = 0.4;
   _cameraKeyRotation = 0.03;
   _cameraMouseRotation = 0.005;

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess() {
      super.onProcess();
      // 按键处理
      var camera = this.camera;
      var keyboardConsole = this._keyboardConsole;
      // 上下处理
      var distance = this._cameraMoveRate;
      var keyUp = keyboardConsole.isKeyPress(EKeyCode.W)
      var keyDown = keyboardConsole.isKeyPress(EKeyCode.S)
      if (keyUp && !keyDown) {
         camera.doWalk(distance);
      } else if (!keyUp && keyDown) {
         camera.doWalk(-distance);
      }
      // 左右处理
      var rotation = this._cameraKeyRotation;
      var keyLeft = keyboardConsole.isKeyPress(EKeyCode.A)
      var keyRight = keyboardConsole.isKeyPress(EKeyCode.D)
      if (keyLeft && !keyRight) {
         camera.doYaw(rotation);
      } else if (!keyLeft && keyRight) {
         camera.doYaw(-rotation);
      }
      camera.update();
      // 画板处理
      this.canvas.process();
      this.pipeline.process();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onMouseMove(sender, event: SMouseEvent) {
      //var renderable = this.pipeline.selectTest(event.offsetX, event.offsetY);
      //id_info.innerHTML = renderable + ' ' + event.offsetX + '-' + event.offsetY
      //console.log(renderable, event.x, event.y);
   }
}