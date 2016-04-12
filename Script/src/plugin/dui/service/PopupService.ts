import {ScopeEnum} from './runtime/common/lang/ScopeEnum';
import {Linker} from './runtime/common/reflect/Linker';
import {Service} from './runtime/core/Service';
import {MouseService} from './runtime/ui/service/MouseService';
import {Control} from './Control';
import {Floating} from './Floating';

//==========================================================
// <T>弹出控制台。</T>
//
// @class
// @author maocy
// @version 150402
//==========================================================
export class PopupService extends Service {
   // 激活的控件
   public activeControl: Floating;
   // 激活的控件
   @Linker(MouseService)
   protected _mouseService: MouseService;

   //==========================================================
   // <T>构建对象。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Global;
      // 注册鼠标事件
      var mouseService = this._mouseService;
      mouseService.mouseDownListeners.register(this, this.onMouseDown);
      mouseService.mouseWheelListeners.register(this, this.onMouseWheel);
   }

   //==========================================================
   // <T>处理鼠标按下事件。</T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   public onMouseDown(sender, event) {
      this.hide();
   }

   //==========================================================
   // <T>画面滚动事件。</T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onMouseWheel(sender, event) {
      this.hide();
   }

   //==========================================================
   // <T>显示一个控件。</T>
   //
   // @param control 控件
   //==========================================================
   public show(control: Control) {
      // 隐藏控件
      this.hide();
      // 显示当前控件
      if (control instanceof Floating) {
         this.activeControl = control;
      }
   }

   //==========================================================
   // <T>隐藏当前控件。</T>
   //==========================================================
   public hide() {
      // 隐藏控件
      var control = this.activeControl;
      if (control) {
         var floating = control as Floating;
         var opener = floating.opener;
         opener.drop(false);
      }
      this.activeControl = null;
   }

   //==========================================================
   // <T>释放对象。</T>
   //==========================================================
   public dispose() {
      this.activeControl = null;
      super.dispose();
   }
}