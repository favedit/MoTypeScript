import {RConsole} from '../../../runtime/core/RConsole';
import {FEnvironmentConsole} from '../../../runtime/core/console/FEnvironmentConsole';
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
      var environmentConsole = RConsole.find(FEnvironmentConsole);
      environmentConsole.registerValue('resource', '/sk/res');
      // 选择视图
      var canvasView = this.canvasView = new FCanvasView()
      this.registerView(canvasView);
      this.selectView(canvasView);
   }
}