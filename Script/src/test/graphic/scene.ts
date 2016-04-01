import {RuntimeUtil} from '../../runtime/common/RuntimeUtil';
import {ServiceUtil} from '../../runtime/core/ServiceUtil';
import {EnvironmentService} from '../../runtime/core/service/EnvironmentService';
import {DeviceService} from '../../runtime/ui/service/DeviceService';
import {ForwardPipeline} from '../../plugin/cl3d/technique/pipeline/ForwardPipeline';
import {FSimpleScene} from '../../plugin/cl3d/framework/FSimpleScene';
import {SceneService} from '../../plugin/cl3d/shape/SceneService';
import {FCanvas} from '../../plugin/cl3d/framework/FCanvas';

// 初始化空间
import * as mo from '../../index';
RuntimeUtil.namespace(mo, 'mo');
(window as any).mo = (window as any).mo || mo;

//............................................................
export class SceneTest {

   public canvas: FCanvas;
   public context;
   public scene;

   public constructor() {
   }

   public setup(hWindow) {
      // 设置环境
      var deviceService = ServiceUtil.find(DeviceService);
      deviceService.setup(hWindow);
      //............................................................
      // 创建画板
      var canvas = this.canvas = new FCanvas();
      canvas.size.set(800, 400);
      canvas.setup(hWindow.document.body);
      var context = this.context = canvas.graphicContext;
      // 创建相机
      var camera = canvas.camera;
      camera.position.set(0, 0, -20);
      camera.lookAt(0, 0, 0);
      camera.update();
   }

   public setEnvironment(name: string, value: string) {
      // 设置环境
      var environmentConsole = ServiceUtil.find(EnvironmentService);
      environmentConsole.registerValue(name, value);
   }

   public load(url: string): any {
      // 创建模板
      var sceneService: SceneService = ServiceUtil.find(SceneService);
      //var template = templateService.allocByUrl(context, '/sk/res/model/xiong/xiong.template');
      //template.matrix.setScaleAll(0.05);
      //var template = templateService.allocByUrl(context, '/sk/res/model/pvw.show.item.001/item.template');
      var scene = this.scene = sceneService.allocByUrl(this.context, url);
      //var template = templateService.allocByUrl(context, '${resource}/template/pvw.sc.car.01.001.template');
      //scene.matrix.setScaleAll(0.01);
      //scene.matrix.updateForce();
      //scene.matrix.addRotationX(-Math.PI / 2);
      //template.matrix.addRotationY(Math.PI);
      //this.scene.contentLayer.push(scene);
      // 创建场景
      // scene.backgroundColor.set(1, 1, 1, 1);
      scene.backgroundColor.set(0, 0, 0, 1);
      // 设置显示
      this.canvas.scene = scene;
      return scene;
   }

   public start() {
      // 启动绘制
      //(<ForwardPipeline>canvas.pipeline).optionShadow = true;
      this.canvas.start();
   }
}
