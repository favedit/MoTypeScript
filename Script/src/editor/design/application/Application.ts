import {ServiceUtil} from './runtime/core/ServiceUtil';
import {EnvironmentService} from './runtime/core/service/EnvironmentService';
import {Application as BaseApplication} from './base/application/FApplication';
import {Render} from './plugin/dui/Render';
import {Canvas} from './view/webgl3d/Canvas';
import {MainUi} from '../frame/MainUi';
import {Settings} from './Settings';

export class Application extends BaseApplication {
   // 渲染器
   public setting: Settings;

   // 渲染器
   public render: Render;

   // 渲染器
   public mainUi: MainUi;

   // 画板视图
   public canvasView: Canvas;

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(settings: Settings) {
      super.setup(settings);
      // 设置环境
      var render = this.render = new Render(settings.hPanel);
      render.setup();
      // 创建界面
      var mainUi = this.mainUi = new MainUi();
      this.render.render(mainUi, settings.hPanel);
      // 选择视图
      var hCanvas3d = settings.hDocument.getElementById('id_canvas3d');
      (this.settings as any).htmlCanvas3d = hCanvas3d;
      var canvasView = this.canvasView = new Canvas();
      canvasView.application = this;
      canvasView.setup();
      this.registerView(canvasView);
      this.selectView(canvasView);
   }

   //==========================================================
   // <T>改变大小事件</T>
   //==========================================================
   public onResize(sender, event) {
      super.onResize(sender, event);
      // 界面处理时间
      this.mainUi.processResize(event);
   }

   //==========================================================
   // <T>改变大小事件</T>
   //==========================================================
   public start() {
      super.start();
      // 界面大小处理
      this.mainUi.processResize();
   }
}