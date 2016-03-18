import {EScope} from '../../common/lang/EScope';
import {FListeners} from '../../common/lang/FListeners';
import {RObject} from '../../common/lang/RObject';
import {ALinker} from '../../common/reflect/ALinker';
import {FConsole} from '../../core/FConsole';
import {RHtml} from '../utility/RHtml';
import {FDeviceConsole} from './FDeviceConsole';
import {EEvent} from '../event/EEvent';
import {SMouseEvent} from '../event/SMouseEvent';

//==========================================================
// <T>鼠标对象控制台。</T>
//
// @console
// @author maocy
// @version 150203
//==========================================================
export class FMouseConsole extends FConsole {
   // 鼠标事件
   protected _eventMouse: SMouseEvent;
   // 鼠标单击监听器
   protected _clickListeners: FListeners;
   // 鼠标双击监听器
   protected _doubleClickListeners: FListeners;
   // 鼠标落下监听器
   protected _mouseDownListeners: FListeners;
   // 鼠标移动监听器
   protected _mouseMoveListeners: FListeners;
   // 鼠标抬起监听器
   protected _mouseUpListeners: FListeners;
   // 鼠标进入监听器
   protected _mouseEnterListeners: FListeners;
   // 鼠标离开监听器
   protected _mouseLeaveListeners: FListeners;
   // 鼠标滚动监听器
   protected _mouseWheelListeners: FListeners;
   // 设备控制台
   @ALinker(FDeviceConsole)
   protected _deviceConsole: FDeviceConsole;

   //protected _activeCapture = null;
   //protected _captures = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.scopeCd = EScope.Local;
      // 设置属性
      this._eventMouse = new SMouseEvent();
      this._clickListeners = new FListeners();
      this._doubleClickListeners = new FListeners();
      this._mouseDownListeners = new FListeners();
      this._mouseMoveListeners = new FListeners();
      this._mouseUpListeners = new FListeners();
      this._mouseEnterListeners = new FListeners();
      this._mouseLeaveListeners = new FListeners();
      this._mouseWheelListeners = new FListeners();
      //o._captures = new TObjects();
      // 注册事件
      //RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      //RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      //RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }

   //===========================================================
   // <T>获得鼠标单击监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get clickListeners(): FListeners {
      return this._clickListeners;
   }

   //===========================================================
   // <T>获得鼠标双击监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get doubleClickListeners(): FListeners {
      return this._doubleClickListeners;
   }

   //===========================================================
   // <T>获得鼠标落下监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get mouseDownListeners(): FListeners {
      return this._mouseDownListeners;
   }

   //===========================================================
   // <T>获得鼠标移动监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get mouseMoveListeners(): FListeners {
      return this._mouseMoveListeners;
   }

   //===========================================================
   // <T>获得鼠标抬起监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get mouseUpListeners(): FListeners {
      return this._mouseUpListeners;
   }

   //===========================================================
   // <T>获得鼠标进入监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get mouseEnterListeners(): FListeners {
      return this._mouseEnterListeners;
   }

   //===========================================================
   // <T>获得鼠标离开监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get mouseLeaveListeners(): FListeners {
      return this._mouseLeaveListeners;
   }

   //===========================================================
   // <T>获得鼠标滚动监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get mouseWheelListeners(): FListeners {
      return this._mouseWheelListeners;
   }

   //==========================================================
   // <T>初始化处理。</T>
   //==========================================================
   public initialize() {
      var deviceConsole = this._deviceConsole;
      var hContainer = deviceConsole.htmlContainer();
      hContainer._mouseConsole = this;
      // 关联鼠标事件
      var supportHtml5 = deviceConsole.supportHtml5();
      if (supportHtml5) {
         hContainer.addEventListener('click', this.ohClick, true);
         hContainer.addEventListener('dblclick', this.ohDoubleClick, true);
         hContainer.addEventListener('mousedown', this.ohMouseDown, true);
         hContainer.addEventListener('mousemove', this.ohMouseMove, true);
         hContainer.addEventListener('mouseup', this.ohMouseUp, true);
         hContainer.addEventListener('mouseenter', this.ohMouseEnter, true);
         hContainer.addEventListener('mouseleave', this.ohMouseLeave, true);
         hContainer.addEventListener('mousewheel', this.ohMouseWheel, true);
      } else {
         hContainer.onclick = this.ohClick;
         hContainer.ondblclick = this.ohDoubleClick;
         hContainer.onmousedown = this.ohMouseDown;
         hContainer.onmousemove = this.ohMouseMove;
         hContainer.onmouseup = this.ohMouseUp;
         hContainer.onmouseenter = this.ohMouseEnter;
         hContainer.onmouseleave = this.ohMouseLeave;
         hContainer.onmousewheel = this.ohMouseWheel;
      }
   }

   //==========================================================
   // <T>鼠标单击处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohClick(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.Click;
      event.attachEvent(hEvent);
      linker.onClick(linker, event);
   }

   //==========================================================
   // <T>鼠标双击处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohDoubleClick(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.DoubleClick;
      event.attachEvent(hEvent);
      linker.onDoubleClick(linker, event);
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohMouseDown(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.MouseDown;
      event.attachEvent(hEvent);
      linker.onMouseDown(linker, event);
   }

   //==========================================================
   // <T>鼠标移动处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohMouseMove(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.MouseMove;
      event.attachEvent(hEvent);
      linker.onMouseMove(linker, event);
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohMouseUp(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.MouseUp;
      event.attachEvent(hEvent);
      linker.onMouseUp(linker, event);
   }

   //==========================================================
   // <T>鼠标进入处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohMouseEnter(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.MouseEnter;
      event.attachEvent(hEvent);
      linker.onMouseEnter(linker, event);
   }

   //==========================================================
   // <T>鼠标离开处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohMouseLeave(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.MouseLeave;
      event.attachEvent(hEvent);
      linker.onMouseLeave(linker, event);
   }

   //==========================================================
   // <T>鼠标滚动处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohMouseWheel(hEvent) {
      var linker: FMouseConsole = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.htmlEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EEvent.MouseWheel;
      event.attachEvent(hEvent);
      linker.onMouseWheel(linker, event);
   }

   //==========================================================
   // <T>鼠标单击处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onClick(sender: any, event: SMouseEvent) {
      this._clickListeners.process(event);
   }

   //==========================================================
   // <T>鼠标双击处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onDoubleClick(sender: any, event: SMouseEvent) {
      this._doubleClickListeners.process(event);
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onMouseDown(sender: any, event: SMouseEvent) {
      // 检查来源
      //var linker = RHtml.searchLinker(event.hSource, MO.MMouseCapture);
      //var linker = null;
      //if (!linker) {
      //   return;
      //}
      // 检查测试
      //if (!linker.testMouseCapture()) {
      //   return;
      //}
      // 捕捉开始处理
      //this._activeCapture = linker;
      //this.captureStart(event);
      // 处理事件
      this._mouseDownListeners.process(event);
   }

   //==========================================================
   // <T>鼠标移动处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onMouseMove(sender: any, event: SMouseEvent) {
      // 检查拖拽处理
      //if (!this._activeCapture) {
      //   return;
      //}
      // 拖拽处理
      //this.capture(event);
      // 处理事件
      this._mouseMoveListeners.process(event);
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onMouseUp(sender: any, event: SMouseEvent) {
      // 检查拖拽处理
      //if (!this._activeCapture) {
      //   return;
      //}
      // 捕捉结束处理
      //this.captureStop(event);
      // 处理事件
      this._mouseUpListeners.process(event);
   }

   //==========================================================
   // <T>鼠标进入处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onMouseEnter(sender: any, event: SMouseEvent) {
      this._mouseEnterListeners.process(event);
   }

   //==========================================================
   // <T>鼠标离开处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onMouseLeave(sender: any, event: SMouseEvent) {
      this._mouseLeaveListeners.process(event);
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onMouseWheel(sender: any, event: SMouseEvent) {
      // 检查拖拽处理
      // if (!this._activeCapture) {
      //    return;
      // }
      // 捕捉结束处理
      // this.captureStop(p);
      // 处理事件
      this._mouseWheelListeners.process(event);
   }

   // //==========================================================
   // // <T>捕捉开始处理。</T>
   // //
   // // @method
   // // @param p:event:htmlEvent 事件
   // //==========================================================
   // public captureStart(p) {
   //    var capture = this._activeCapture;
   //    if (capture) {
   //       // RWindow.setOptionSelect(false);
   //       capture.onMouseCaptureStart(p);
   //    }
   // }

   // //==========================================================
   // // <T>捕捉处理。</T>
   // //
   // // @method
   // // @param p:event:htmlEvent 事件
   // //==========================================================
   // public capture(p) {
   //    var capture = this._activeCapture;
   //    if (capture) {
   //       if (capture.testMouseCapture()) {
   //          capture.onMouseCapture(p);
   //       } else {
   //          this.captureStop(p)
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>捕捉结束处理。</T>
   // //
   // // @method
   // // @param p:event:htmlEvent 事件
   // //==========================================================
   // public captureStop(p) {
   //    var capture = this._activeCapture;
   //    if (capture) {
   //       capture.onMouseCaptureStop(p);
   //       this._activeCapture = null;
   //    }
   //    // RWindow.setOptionSelect(true);
   // }

   //==========================================================
   // <T>注册一个鼠标捕捉对象。</T>
   //
   // @method
   // @param p:capture:MMouseCapture 鼠标捕捉
   //==========================================================
   // public register(p) {
   //    //this._captures.push(p);
   // }

   // //==========================================================
   // // <T>注销一个鼠标捕捉对象。</T>
   // //
   // // @method
   // // @param p:capture:MMouseCapture 鼠标捕捉
   // //==========================================================
   // public unregister(p) {
   //    //this._captures.remove(p);
   // }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   // public clear() {
   //    //this._captures.clear();
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._eventMouse = RObject.dispose(this._eventMouse);
      this._clickListeners = RObject.dispose(this._clickListeners);
      this._doubleClickListeners = RObject.dispose(this._doubleClickListeners);
      this._mouseDownListeners = RObject.dispose(this._mouseDownListeners);
      this._mouseMoveListeners = RObject.dispose(this._mouseMoveListeners);
      this._mouseUpListeners = RObject.dispose(this._mouseUpListeners);
      this._mouseEnterListeners = RObject.dispose(this._mouseEnterListeners);
      this._mouseLeaveListeners = RObject.dispose(this._mouseLeaveListeners);
      this._mouseWheelListeners = RObject.dispose(this._mouseWheelListeners);
      // 父处理
      super.dispose();
   }
}