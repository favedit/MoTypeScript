import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {EnvironmentService} from '../../../runtime/core/service/EnvironmentService';
import {FApplication as FBaseApplication} from '../../base/application/FApplication';
import {SSettings} from '../../../runtime/framework/SSettings';
import {FCanvasView} from '../view/FCanvasView';

export class FApplication extends FBaseApplication {
   // 画板视图
   public canvasView: FCanvasView;
   
   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(settings: SSettings) {
      super.setup(settings);
      // 设置环境
      var environmentConsole = ServiceUtil.find(EnvironmentService);
      environmentConsole.registerValue('resource', '/sk/res');
      // 选择视图
      var canvasView = this.canvasView = new FCanvasView()
      this.registerView(canvasView);
      this.selectView(canvasView);
   }
}