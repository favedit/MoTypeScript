import {FListeners} from '../../common/lang/FListeners';
import {FAttributes} from '../../common/lang/FAttributes';
import {SEvent} from '../../common/lang/SEvent';
import {RString} from '../../common/lang/RString';
import {RLogger} from '../../common/lang/RLogger';
import {FConsole} from '../../core/FConsole';
import {EEvent} from '../EEvent';
import {SMouseEvent} from '../SMouseEvent';
import {SKeyboardEvent} from '../SKeyboardEvent';
import {SResizeEvent} from '../SResizeEvent';

//==========================================================
// <T>设备控制台。</T>
//==========================================================
export class FDeviceConsole extends FConsole {
   // @attribute
   public _optionSelect = true;
   // @attribute
   public static _eventMouse = new SMouseEvent();
   public static _eventKey = new SKeyboardEvent();
   public static _eventResize = new SResizeEvent();
   public static _eventVisibility = new SEvent();
   public static _eventOrientation = new SEvent();
   public static _eventUnload = new SEvent();
   //..........................................................
   // @html
   public _hWindow = null;
   public _hDocument = null;
   public _hContainer = null;
   // @attribute
   public static _cookies = new FAttributes();
   public static _localStorage = null;
   public static _sessionStorage = null;
   // @listeners
   public lsnsLoad = new FListeners();
   public lsnsLoaded = new FListeners();
   public lsnsUnload = new FListeners();
   public lsnsMouseDown = new FListeners();
   public lsnsMouseUp = new FListeners();
   public lsnsMouseOver = new FListeners();
   public lsnsMouseMove = new FListeners();
   public lsnsMouseWheel = new FListeners();
   public lsnsKeyDown = new FListeners();
   public lsnsKeyUp = new FListeners();
   public lsnsKeyPress = new FListeners();
   public lsnsResize = new FListeners();
   public lsnsVisibility = new FListeners();
   public lsnsOrientation = new FListeners();
   public lsnsDeviceError = new FListeners();

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>获得窗口对象。</T>
   //
   // @return 窗口对象
   //==========================================================
   public htmlWindow() {
      return this._hWindow;
   }

   //==========================================================
   // <T>获得配置选取。</T>
   //
   // @return 配置选取
   //==========================================================
   public get optionSelect() {
      return this._optionSelect;
   }

   //==========================================================
   // <T>设置配置选取。</T>
   //
   // @method
   // @param select:Boolean 配置选取
   //==========================================================
   public set optionSelect(select) {
      this._optionSelect = select;
      //if (MO.Window.Browser.isBrowser(EBrowser.FireFox)) {
      //   o._hContainer.style.MozUserSelect = select ? '' : 'none';
      //}
   }

   //==========================================================
   // <T>关联当前窗口。</T>
   // <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
   //
   // @method
   // @param hWindow:<Window> 窗口对象
   //==========================================================
   public setup(hWindow) {
      // 设置事件
      //this._eventVisibility.code = MO.EEvent.Visibility;
      //this._eventOrientation.code = MO.EEvent.Orientation;
      // 设置属性
      var hWindow = this._hWindow = hWindow;
      hWindow.__linker = this;
      var hDocument = this._hDocument = hWindow.document;
      hDocument.__linker = this;
      var hContainer = this._hContainer = hDocument.body;
      hContainer.__linker = this;
      // 关联鼠标事件
      //var visibilitychange = MO.Window.Browser.defineEventGet('visibilitychange');
      //if (MO.Window.Browser.supportHtml5()) {
      hContainer.addEventListener('mousedown', this.ohMouseDown, true);
      hContainer.addEventListener('mousemove', this.ohMouseMove, true);
      hContainer.addEventListener('mouseup', this.ohMouseUp, true);
      hContainer.addEventListener('mousewheel', this.ohMouseWheel, true);
      hContainer.addEventListener('keydown', this.ohKeyDown, true);
      hContainer.addEventListener('keyup', this.ohKeyUp, true);
      hContainer.addEventListener('keypress', this.ohKeyPress, true);
      //hDocument.addEventListener(visibilitychange, this.ohVisibility, true);
      //} else {
      hContainer.onmousedown = this.ohMouseDown;
      hContainer.onmousemove = this.ohMouseMove;
      hContainer.onmouseup = this.ohMouseUp;
      hContainer.onmousewheel = this.ohMouseWheel;
      hContainer.onkeydown = this.ohKeyDown;
      hContainer.onkeyup = this.ohKeyUp;
      hContainer.onkeypress = this.ohKeyPress;
      //hDocument['on' + visibilitychange] = this.ohVisibility;
      //}
      hWindow.onorientationchange = this.ohOrientation;
      hContainer.onresize = this.ohResize;
      hContainer.onselectstart = this.ohSelect;
      hContainer.onunload = this.ohUnload;
      // 读取COOKIES
      this._cookies.split(hDocument.cookie, '=', ';');
      // 检测事件
      //this._requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
      //this._cancelAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame;
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohMouseDown(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      var event = linker._eventMouse;
      event.code = EEvent.MouseDown;
      event.attachEvent(hEvent);
      linker.lsnsMouseDown.process(event);
   }

   //==========================================================
   // <T>鼠标移动处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohMouseMove(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      var event = linker._eventMouse;
      event.code = EEvent.MouseMove;
      event.attachEvent(hEvent);
      linker.lsnsMouseMove.process(event);
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohMouseUp(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      var event = linker._eventMouse;
      event.code = EEvent.MouseUp;
      event.attachEvent(hEvent);
      linker.lsnsMouseUp.process(event);
   }

   //==========================================================
   // <T>鼠标滚动处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohMouseWheel(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      var event = linker._eventMouse;
      event.code = EEvent.MouseWheel;
      event.attachEvent(hEvent);
      linker.lsnsMouseWheel.process(event);
   }

   //==========================================================
   // <T>键盘按下处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohKeyDown(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      var event = linker._eventKey;
      event.code = EEvent.KeyDown;
      event.attachEvent(hEvent);
      linker.lsnsKeyDown.process(event);
      // RLogger.debug(linker, 'Window key down. (key_code={1})', e.keyCode);
      // var s = e.srcElement ? e.srcElement : e.target;
      // var t = s.tagName;
      // if (EKeyCode.BackSpace == e.keyCode) {
      //    // 禁止在非输入框内输入退格键
      //    if ('INPUT' == t) {
      //       if (s.readOnly || 'checkbox' == s.type) {
      //          return RKey.eventClear(e);
      //       }
      //    } else if ('TEXTAREA' == t) {
      //       if (s.readOnly) {
      //          return RKey.eventClear(e);
      //       }
      //    } else {
      //       return RKey.eventClear(e);
      //    }
      // }
      // // 纷发按键消息
      // linker.__keyDownEvent.attach(e);
      // linker.lsnsKeyDown.process(linker.__keyDownEvent);
      // // 处理回车键
      // if (EKeyCode.Enter == e.keyCode) {
      //    if ('INPUT' == t) {
      //       if (REvent.process(s, e)) {
      //          RKey.eventClear(e);
      //       }
      //    }
      // }
   }

   //==========================================================
   // <T>键盘抬起处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohKeyUp(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      var event = linker._eventKey;
      event.code = EEvent.KeyUp;
      event.attachEvent(hEvent);
      linker.lsnsKeyUp.process(event);
   }

   //==========================================================
   // <T>键盘点击处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohKeyPress(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      var event = linker._eventKey;
      event.code = EEvent.KeyPress;
      event.attachEvent(hEvent);
      linker.lsnsKeyPress.process(event);
   }

   //==========================================================
   // <T>改变大小处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public ohResize(hEvent) {
      var linker = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      // 接收事件
      var event = linker._eventResize;
      event.code = EEvent.Resize;
      event.attachEvent(hEvent);
      linker.lsnsResize.process(event);
      // var h = linker._hDisablePanel;
      // if (h) {
      //    if ('block' == h.style.display) {
      //       var s = h.style;
      //       var hd = linker.hDocument;
      //       s.pixelLeft = 0;
      //       s.pixelTop = 0
      //       s.pixelWidth = hd.all ? linker._hContainer.scrollWidth : hd.documentElement.scrollWidth;
      //       s.pixelHeight = hd.all ? linker._hContainer.scrollHeight : hd.documentElement.scrollHeight;
      //    }
      // }
      // // 根据窗口大小，不发送重复事件
      // if (linker.oldBodyWidth == linker._hContainer.offsetWidth && linker.oldBodyHeight == linker._hContainer.offsetHeight) {
      //    return;
      // }
      // linker.oldBodyWidth = linker._hContainer.offsetWidth;
      // linker.oldBodyHeight = linker._hContainer.offsetHeight;
      // // 通知所有控件，窗口改变大小
      // linker.onResize();
      // linker.lsnsResize.process(e);
   }
   //==========================================================
   // <T>选取处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public static ohSelect(event) {
      var linker = (this as any).__linker;
      return linker._optionSelect;
   }

   //==========================================================
   // <T>可见性处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohVisibility(hEvent) {
      var linker = (this as any).__linker;
      // 刷新方向
      // var visibility = MO.Window.Browser.isVisibility();
      // // 分发消息
      // var event = linker._eventVisibility;
      // event.visibility = visibility;
      // linker.lsnsVisibility.process(event);
      // RLogger.debug(linker, 'Window visibility changed. (visibility={1})', visibility);
   }

   //==========================================================
   // <T>选取处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohOrientation(hEvent) {
      var linker = (this as any).__linker;
      // 刷新方向
      var orientationCd = linker.Browser.refreshOrientation();
      // 分发消息
      var event = linker._eventOrientation;
      event.orientationCd = orientationCd;
      linker.lsnsOrientation.process(event);
      RLogger.debug(linker, 'Window orientation changed. (orientation_cd={1})', orientationCd);
   }

   //==========================================================
   // <T>卸载处理处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public static ohUnload(event) {
      var linker = (this as any).__linker;
      // 释放处理
      var event = linker._eventUnload;
      linker.lsnsUnload.process(event);
      // 释放窗口
      linker.dispose();
   }


   //==========================================================
   // <T>设置标题。</T>
   //
   // @method
   // @param value:String 标题
   //==========================================================
   public setCaption(value) {
      top.document.title = RString.nvl(value);
   }

   //==========================================================
   // <T>设置状态。</T>
   //
   // @method
   // @param value:String 状态
   //==========================================================
   public setStatus(value) {
      window.status = RString.nvl(value);
   }


   //==========================================================
   // <T>请求动画回调。</T>
   //
   // @method
   // @param callback 回调函数
   // @param interval 调用间隔
   //==========================================================
   public static requestAnimationFrame(callback) {
      //var method = this._requestAnimationFrame;
      var method = null;
      if (method) {
         method(callback);
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>取消动画回调。</T>
   //
   // @method
   // @param callback 回调函数
   //==========================================================
   public static cancelRequestAnimationFrame(callback) {
      //var method = this._cancelAnimationFrame;
      var method = null;
      if (method) {
         method(callback);
         return true;
      }
      return false;
   }
}
