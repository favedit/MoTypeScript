import {RuntimeUtil} from '../../runtime/common/RuntimeUtil';
import {ServiceUtil} from '../../runtime/core/ServiceUtil';
import {EnvironmentService} from '../../runtime/core/service/EnvironmentService';
import {DeviceService} from '../../runtime/ui/service/DeviceService';
// import {ForwardPipeline} from '../../plugin/cl3d/technique/pipeline/ForwardPipeline';
// import {FSimpleScene} from '../../plugin/cl3d/framework/FSimpleScene';
// import {TemplateService} from '../../plugin/cl3d/shape/TemplateService';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {RenderContext} from '../../plugin/dui/RenderContext';
import {Render} from '../../plugin/dui/Render';
import {React} from '../../plugin/dui/React';
import {Edit} from '../../plugin/dui/form/Edit';

import {ToolBar} from '../../plugin/dui/toolbar/ToolBar';
import {ToolButton} from '../../plugin/dui/toolbar/ToolButton';

// import {SpaceUi} from '../../editor/design/SpaceUi';

// 初始化空间
import * as mo from '../../index';
RuntimeUtil.namespace(mo, 'mo');
(window as any).mo = (window as any).mo || mo;


//............................................................
export class FormTest {

   public canvas;
   public context;
   public render: Render;

   public constructor() {
   }

   public setup(hWindow) {
      var deviceService = ServiceUtil.find(DeviceService);
      deviceService.setup(hWindow);
      // 设置环境
      var render = this.render = new Render(hWindow.document.body);
      render.setup();
      // 设置环境
      var context = this.context = new RenderContext();
      context.hDocument = hWindow.document;
      // //............................................................
      // // 创建画板
      // var canvas = this.canvas = new FCanvas();
      // canvas.size.set(800, 400);
      // canvas.setup(hWindow.document.body);
      // var context = this.context = canvas.graphicContext;
      // // 创建场景
      // var scene = this.scene = canvas.scene = new FSimpleScene();
      // scene.linkGraphicContext(context);
      // scene.setup();
      // // scene.backgroundColor.set(1, 1, 1, 1);
      // scene.backgroundColor.set(0, 0, 0, 1);
      // // 创建相机
      // var camera = canvas.camera;
      // camera.position.set(0, 0, -20);
      // camera.lookAt(0, 0, 0);
      // camera.update();
   }

   public setEnvironment(name: string, value: string) {
      // 设置环境
      var environmentConsole = ServiceUtil.find(EnvironmentService);
      environmentConsole.registerValue(name, value);
   }

   public testEdit(): any {
      // var edit = new Edit();
      // edit.label = "test";
      // this.render.render(edit);
      // //edit.build(this.context);
      // return edit;
   }

   public testFrameSet(): any {
      // var edit = new Edit();
      // edit.label = "test";
      // this.render.render(edit);
      // //edit.build(this.context);
      // return edit;
   }

   public onButtonCreateClick(): any {
      // var edit = new Edit();
      // edit.label = "test";
      // this.render.render(edit);
      // //edit.build(this.context);
      // return edit;
   }

   public testToolBar(): any {
      // var spaceUi = new SpaceUi();
      // this.render.render(spaceUi, window.document.body);
      // spaceUi.setParentPanel(window.document.body);
      // var data =
      //    <ToolBar>
      //       <ToolButton icon='tools.create' label='新建' onclick='{this.onButtonCreateClick()}'></ToolButton>
      //       <ToolButton icon='tools.preview' label='打开'></ToolButton>
      //       <ToolButton icon='tools.save' label='保存'></ToolButton>
      //    </ToolBar>;
      // this.render.render(data, window.document.body);
      // data.setParentPanel(window.document.body);
   }
}
