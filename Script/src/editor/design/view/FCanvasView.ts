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
import {FModelConsole} from '../../plugin/cl3d/shape/FModelConsole';
import {FCube} from '../../plugin/cl3d/shape/FCube';
import {SSettings} from '../application/SSettings';
import {EEvent} from '../../runtime/ui/EEvent';
import {SMouseEvent} from '../../runtime/ui/event/SMouseEvent';

declare var id_info;

//==========================================================
// <T>画板视图。</T>
//==========================================================
export class FCanvasView extends FView {
   // 画板
   public canvas: FCanvas;
   // 场景
   public scene: FScene;
   // 背景层
   public backgroundLayer: FDisplayLayer;
   // 内容层
   public contentLayer: FDisplayLayer;
   // 内容层
   public camera: FPerspectiveCamera;
   // 内容层
   public pipeline: FPipeline;

   _cameraMoveRate = 0.4;
   _cameraKeyRotation = 0.03;
   _cameraMouseRotation = 0.005;
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
      scene.backgroundColor.set(0.2, 0.2, 0.2, 1);
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
      var cube = new FCube();
      cube.setup(context);
      this.contentLayer.pushRenderable(cube);
      // 设置渲染管道
      var pipelineConsole = RConsole.find(FPipelineConsole);
      var pipeline = this.pipeline = pipelineConsole.alloc(context, FForwardPipeline);
      pipeline.scene = scene;
      pipeline.camera = camera;
   }

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