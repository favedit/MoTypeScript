import {RuntimeUtil} from './runtime/common/RuntimeUtil';
import {EnvironmentService} from './runtime/core/service/EnvironmentService';
import {ServiceUtil} from './runtime/core/ServiceUtil';
import {DeviceService} from './runtime/ui/service/DeviceService';
import {RenderContext} from './plugin/dui/RenderContext';
import {Render} from './plugin/dui/Render';

// 初始化空间
import * as mo from '../../index';
RuntimeUtil.namespace(mo, 'mo');
(window as any).mo = (window as any).mo || mo;

// 启动应用
export class Editor {

   public settings;

   public application;

   public setup(hWindow: Window) {
      // 设置参数
      var settings = this.settings = new mo.editor.design.application.Settings();
      settings.hWindow = hWindow;
      settings.hDocument = hWindow.document;
      settings.hPanel = hWindow.document.body as HTMLBodyElement;
      settings.size.set(800, 400);
   }

   public setEnvironment(name: string, value: string) {
      // 设置环境
      var environmentConsole = ServiceUtil.find(EnvironmentService);
      environmentConsole.registerValue(name, value);
   }

   public startup(): any {
      var application = this.application = new mo.editor.design.application.Application();
      application.setup(this.settings);
      application.start();
      (window as any).MoApplication = application;
      return application;
   }

}
