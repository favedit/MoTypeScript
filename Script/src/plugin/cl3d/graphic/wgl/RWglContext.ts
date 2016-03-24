import {LoggerUtil} from '../../../../runtime/common/lang/LoggerUtil';
import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {SWglSetting} from './SWglSetting';
import {FWglContext} from './FWglContext';
import {FWglContext1} from './FWglContext1';
import {FWglContext2} from './FWglContext2';

//==========================================================
// <T>WebGL环境工具。</T>
//
// @author maocy
// @history 160323
//==========================================================
export class RWglContext {
   //==========================================================
   // <T>创建渲染环境。</T>
   // <P>总是创建支持的最高版本。</P>
   //
   // @param hCanvas 画板
   // @return 渲染环境
   //==========================================================
   public static create(hCanvas: HTMLCanvasElement, setting?: SWglSetting): FWglContext {
      AssertUtil.debugNotNull(hCanvas);
      AssertUtil.debugNotNull(hCanvas.getContext);
      // 设置参数
      if (!setting) {
         setting = new SWglSetting();
      }
      // 初始化对象
      var hHandle = null;
      var context: FWglContext = null;
      var codes = ['experimental-webgl2', 'webgl2', 'experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl']
      var count: number = codes.length;
      for (var n: number = 0; n < count; n++) {
         var code: string = codes[n];
         hHandle = hCanvas.getContext(code, setting);
         if (hHandle) {
            if (n < 2) {
               context = new FWglContext2();
            } else {
               context = new FWglContext1();
            }
            LoggerUtil.debug(null, 'Create context3d. (code={1}, handle={2})', code, hHandle);
            break;
         }
      }
      // 创建环境
      if (hHandle) {
         context.setup(hCanvas, hHandle);
      } else {
         LoggerUtil.error(null, 'Create context3d failure.');
         //var event = new SEvent(this);
         //event.code = MO.EGraphicError.UnsupportWebGL;
         //event.message = "Current browser can't support WebGL technique.";
         //MO.Window.processDeviceError(event);
         //event.dispose();
      }
      //o._contextAttributes = handle.getContextAttributes();
      return context;
   }
}
