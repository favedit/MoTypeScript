import {Linker} from '../../runtime/common/reflect/Linker';
import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {View} from '../../runtime/framework/view/View';
import {EventEnum} from '../../runtime/ui/EventEnum';
import {MouseEvent} from '../../runtime/ui/event/MouseEvent';
import {KeyboardService} from '../../runtime/ui/service/KeyboardService';
import {KeyCodeEnum} from '../../runtime/ui/KeyCodeEnum';
import {FCanvas} from '../../base/view/webgl/FCanvas';
import {Scene} from '../../plugin/cl3d/base/Scene';
import {DisplayLayer} from '../../plugin/cl3d/base/DisplayLayer';
import {PerspectiveCamera} from '../../runtime/graphic/camera/PerspectiveCamera';
import {Pipeline} from '../../plugin/cl3d/technique/pipeline/Pipeline';
import {ForwardPipeline} from '../../plugin/cl3d/technique/pipeline/ForwardPipeline';
import {PipelineService} from '../../plugin/cl3d/technique/pipeline/PipelineService';
import {ModelService} from '../../plugin/cl3d/shape/ModelService';
import {CubeRenderable} from '../../plugin/cl3d/shape/CubeRenderable';
import {SceneService} from '../../plugin/cl3d/shape/SceneService';
import {Settings} from '../application/Settings';
import {Application} from '../application/Application';
import {CatalogUi} from '../../frame/scene/CatalogUi';

//==========================================================
// <T>画板视图。</T>
//==========================================================
export class Canvas extends View {
   // 画板
   public application: Application;
   // 画板
   public canvas: FCanvas;
   // 场景
   public scene: Scene;
   // 背景层
   public backgroundLayer: DisplayLayer;
   // 内容层
   public contentLayer: DisplayLayer;
   // 内容层
   public camera: PerspectiveCamera;
   // 内容层
   public pipeline: Pipeline;

   protected _cameraMoveRate = 0.4;
   protected _cameraKeyRotation = 0.03;
   protected _cameraMouseRotation = 0.005;
   // 按键管理器
   @Linker(KeyboardService)
   public _keyboardConsole: KeyboardService;

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public onSetup(): void {
      super.onSetup();
      // 创建画板
      var parameters = new Object();
      var settings: Settings = <Settings>this.application.settings;
      var canvas = this.canvas = new FCanvas();
      canvas.hCanvas = settings.htmlCanvas3d;
      canvas.setup(settings);
      canvas.addListener(EventEnum.MouseMove, this, this.onMouseMove);
      var hCanvas = canvas.hCanvas;
      var context = canvas.graphicContent;
      // 创建场景
      var sceneService: SceneService = ServiceUtil.find(SceneService);
      var scene = this.scene = sceneService.allocByUrl(context, '${resource}/scene/pvw.sc.car.01.001.scene');
      scene.backgroundColor.set(0, 0, 0, 1);
      scene.loadListeners.register(this, this.onSceneLoad);
      //scene.lo
      // var scene: Scene = this.scene = new Scene();
      // scene.backgroundColor.set(0.2, 0.2, 0.2, 1);
      // var layer = this.backgroundLayer = new DisplayLayer();
      // scene.registerLayer('background', layer);
      // var layer = this.contentLayer = new DisplayLayer();
      // scene.registerLayer('content', layer);
      // 创建相机
      var camera = this.camera = new PerspectiveCamera();
      camera.position.set(0, 0, -20);
      camera.lookAt(0, 0, 0);
      camera.update();
      camera.projection.size.set(hCanvas.offsetWidth, hCanvas.offsetHeight);
      camera.projection.update();
      // 创建物件
      // var cube = new CubeRenderable();
      // cube.setup(context);
      // this.contentLayer.pushRenderable(cube);
      // 设置渲染管道
      var pipelineConsole = ServiceUtil.find(PipelineService);
      var pipeline = this.pipeline = pipelineConsole.alloc(context, ForwardPipeline);
      pipeline.scene = scene;
      pipeline.camera = camera;
   }

   //==========================================================
   // <T>场景加载处理。</T>
   //==========================================================
   public onSceneLoad(sender, event) {
      var scene = event.sender;
      var mainUi = this.application.mainUi;
      var catalogUi: CatalogUi = <CatalogUi>mainUi.searchChild('scene.catalog');
      catalogUi.loadScene(scene);
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
      var keyUp = keyboardConsole.isKeyPress(KeyCodeEnum.W)
      var keyDown = keyboardConsole.isKeyPress(KeyCodeEnum.S)
      if (keyUp && !keyDown) {
         camera.doWalk(distance);
      } else if (!keyUp && keyDown) {
         camera.doWalk(-distance);
      }
      // 左右处理
      var rotation = this._cameraKeyRotation;
      var keyLeft = keyboardConsole.isKeyPress(KeyCodeEnum.A)
      var keyRight = keyboardConsole.isKeyPress(KeyCodeEnum.D)
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
   public onMouseMove(sender, event: MouseEvent) {
      //var renderable = this.pipeline.selectTest(event.offsetX, event.offsetY);
      //id_info.innerHTML = renderable + ' ' + event.offsetX + '-' + event.offsetY
      //console.log(renderable, event.x, event.y);
   }
}