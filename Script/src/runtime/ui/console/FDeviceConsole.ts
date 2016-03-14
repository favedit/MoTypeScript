import {EPlatform} from '../../common/EPlatform';
import {FListeners} from '../../common/lang/FListeners';
import {FAttributes} from '../../common/lang/FAttributes';
import {FError} from '../../common/lang/FError';
import {SEvent} from '../../common/lang/SEvent';
import {RString} from '../../common/lang/RString';
import {RLogger} from '../../common/lang/RLogger';
import {REnum} from '../../common/lang/REnum';
import {ALinker} from '../../common/reflect/ALinker';
import {FConsole} from '../../core/FConsole';
import {FEnvironmentConsole} from '../../core/console/FEnvironmentConsole';
import {EEvent} from '../event/EEvent';
import {SMouseEvent} from '../event/SMouseEvent';
import {SKeyboardEvent} from '../event/SKeyboardEvent';
import {SResizeEvent} from '../event/SResizeEvent';
import {EDevice} from '../EDevice';
import {ESoftware} from '../ESoftware';
import {EBrowser} from '../EBrowser';
import {EOrientation} from '../EOrientation';
import {SBrowserCapability} from './SBrowserCapability';

//==========================================================
// <T>设备控制台。</T>
//==========================================================
export class FDeviceConsole extends FConsole {
   // @attribute
   public _optionSelect = true;
   // @attribute
   public _eventMouse = new SMouseEvent();
   public _eventKey = new SKeyboardEvent();
   public _eventResize = new SResizeEvent();
   public _eventVisibility = new SEvent();
   public _eventOrientation = new SEvent();
   public _eventUnload = new SEvent();
   //..........................................................
   // @attribute
   public _agent = null;
   public _capability: SBrowserCapability = null;
   public _defineProperties = null;
   public _defineEvents = null;
   public _defineMethods = null;
   // @attribute
   public _platformCd = EPlatform.Unknown;
   public _deviceCd = EDevice.Unknown;
   public _softwareCd = ESoftware.Unknown;
   public _typeCd = EBrowser.Unknown;
   public _orientationCd = EOrientation.Horizontal;
   public _supportHtml5 = false;
   //..........................................................
   // @html
   public _hWindow = null;
   public _hDocument = null;
   public _hContainer = null;
   // @attribute
   public _cookies = new FAttributes();
   public _localStorage = null;
   public _sessionStorage = null;
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
   //..........................................................
   @ALinker(FEnvironmentConsole)
   protected _environmentConsole: FEnvironmentConsole = null;

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
   // <T>获得信息。</T>
   //
   // @return 信息
   //==========================================================
   public agent() {
      return this._agent;
   }

   //==========================================================
   // <T>获得浏览器环境信息。</T>
   //
   // @return 浏览器环境信息
   //==========================================================
   public get capability(): SBrowserCapability {
      return this._capability;
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
      if (this.isBrowser(EBrowser.FireFox)) {
         this._hContainer.style.MozUserSelect = select ? '' : 'none';
      }
   }

   //===========================================================
   // <T>判断是否指定浏览器。</T>
   //
   // @param browserCd:EBrowser 浏览器类型
   // @return 是否指定浏览器
   //===========================================================
   public isBrowser(browserCd) {
      return this._typeCd == browserCd;
   }

   //===========================================================
   // <T>返回屏幕方向。</T>
   //
   // @method
   // @return 屏幕方向
   //===========================================================
   public get orientationCd() {
      return this._orientationCd;
   }

   //===========================================================
   // <T>设置屏幕方向。</T>
   //
   // @method
   // @param orientationCd:EOrientation 屏幕方向
   //===========================================================
   public set setOrientationCd(orientationCd) {
      this._orientationCd = orientationCd;
   }

   //===========================================================
   // <T>判断是否横屏。</T>
   //
   // @method
   // @return 是否横屏
   //===========================================================
   public isOrientationHorizontal() {
      return this._orientationCd == EOrientation.Horizontal;
   }

   //===========================================================
   // <T>判断是否垂直。</T>
   //
   // @method
   // @return 是否垂直
   //===========================================================
   public isOrientationVertical() {
      return this._orientationCd == EOrientation.Vertical;
   }

   //===========================================================
   // <T>判断是否可见。</T>
   //
   // @method
   // @return 是否可见
   //===========================================================
   public isVisibility() {
      var name = this.definePropertyGet('hidden');
      return !window.document[name];
   }

   //==========================================================
   // <T>获得定义属性集合。</T>
   //
   // @method
   // @return Object 定义属性集合
   //==========================================================
   public defineProperties() {
      return this._defineProperties;
   }

   //==========================================================
   // <T>获得定义属性。</T>
   //
   // @method
   // @return String 定义属性
   //==========================================================
   public definePropertyGet(name) {
      return this._defineProperties[name];
   }

   //==========================================================
   // <T>获得定义事件集合。</T>
   //
   // @method
   // @return Object 定义事件集合
   //==========================================================
   public defineEvents() {
      return this._defineEvents;
   }

   //==========================================================
   // <T>获得定义事件。</T>
   //
   // @method
   // @return String 定义事件
   //==========================================================
   public defineEventGet(name) {
      return this._defineEvents[name];
   }

   //==========================================================
   // <T>获得定义函数集合。</T>
   //
   // @method
   // @return Object 定义函数集合
   //==========================================================
   public defineMethods() {
      return this._defineMethods;
   }

   //==========================================================
   // <T>获得定义函数。</T>
   //
   // @method
   // @return String 定义函数名称
   //==========================================================
   public defineMethodGet(name) {
      return this._defineMethods[name];
   }

   //==========================================================
   // <T>测试是否支持HTML5规范。</T>
   //
   // @method
   // @return 是否支持
   //==========================================================
   public supportHtml5() {
      return this._supportHtml5;
   }

   //==========================================================
   // <T>关联当前窗口。</T>
   // <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
   //
   // @param hWindow 窗口对象
   //==========================================================
   public setup(hWindow: any) {
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
      //..........................................................
      var code = this._agent = window.navigator.userAgent.toString();
      var agent = code.toLowerCase();
      var properties = this._defineProperties = new Object();
      var events = this._defineEvents = new Object();
      var methods = this._defineMethods = new Object();
      var capability = this._capability = new SBrowserCapability();
      // 判断设备类型
      if (agent.indexOf("android") != -1) {
         this._typeCd = EDevice.Mobile;
         this._softwareCd = ESoftware.Android;
      }
      // 判断浏览器类型
      if (agent.indexOf("chrome") != -1) {
         this._typeCd = EBrowser.Chrome;
      } else if (agent.indexOf("firefox") != -1) {
         this._typeCd = EBrowser.FireFox;
      } else if ((agent.indexOf("msie") != -1) || (agent.indexOf("windows") != -1)) {
         this._typeCd = EBrowser.Explorer;
      } else if ((agent.indexOf("safari") != -1) || (agent.indexOf("applewebkit") != -1)) {
         this._typeCd = EBrowser.Safari;
      } else {
         alert('Unknown browser.\n' + agent);
         return;
      }
      // 是否移动或PC模式
      var platformCd = EPlatform.Mobile;
      if (RString.contains(agent, 'android', 'ipad', 'iphone', 'midp', 'rv:1.2.3.4', 'windows ce', 'windows mobile')) {
         platformCd = EPlatform.Mobile;
         // this._environmentConsole.registerValue(EConstant.DeviceType, 'mb');
      } else {
         platformCd = EPlatform.Pc;
         // this._environmentConsole.registerValue(EConstant.DeviceType, 'pc');
      }
      this._platformCd = platformCd;
      // RRuntime.setPlatformCd(platformCd);
      // 判断浏览器是否需要声音确认
      if (RString.contains(agent, 'android 5.1', 'iphone', 'ipad')) {
         capability.soundConfirm = true;
      }
      // 判断浏览器是否支持画面缩放
      if (RString.contains(agent, 'mqqbrowser')) {
         capability.canvasScale = false;
      }
      // 注册输出接口
      if (this._typeCd == EBrowser.Chrome) {
         // RLogger.lsnsOutput.register(this, this.onLog);
      }
      // 输出日志
      RLogger.debug(this, 'Parse browser agent. (platform_cd={1}, type_cd={2})', REnum.decode(EPlatform, platformCd), REnum.decode(EBrowser, this._typeCd));
      // 是否支持HTML5
      if (hWindow.applicationCache) {
         this._supportHtml5 = true;
      }
      // 检测是否支持声音完成(360浏览器不支持声音完成相应)
      var external: any = hWindow.external;
      if (external) {
         if (external.twGetRunPath) {
            if ((agent.indexOf('360chrome') != -1) || (agent.indexOf('360se') != -1)) {
               capability.soundFinish = false;
            } else {
               var runPath = external.twGetRunPath().toLowerCase();
               if (runPath.indexOf('360se') != -1) {
                  capability.soundFinish = false;
               }
            }
         }
      }
      // 设置浏览器能力
      var pixelRatio = hWindow.devicePixelRatio;
      if (pixelRatio) {
         if (platformCd == EPlatform.Mobile) {
            // 强制不要超过3倍
            capability.pixelRatio = Math.min(pixelRatio, 3);
            RLogger.debug(this, 'Parse browser agent. (pixel_ratio={1}, capability_ratio={2})', pixelRatio, capability.pixelRatio);
         }
      }
      if (hWindow.Worker) {
         capability.optionProcess = true;
      }
      if (hWindow.localStorage) {
         capability.optionStorage = true;
      }
      try {
         new Blob(["Test"], { 'type': 'text/plain' });
         capability.blobCreate = true;
      } catch (e) {
         RLogger.warn(this, 'Browser blob not support.');
      }
      // 设置函数
      var visibilityChange = null;
      if (typeof hDocument.hidden !== "undefined") {
         properties['hidden'] = 'hidden';
         events['visibilitychange'] = 'visibilitychange';
      } else if (typeof hDocument.mozHidden !== "undefined") {
         properties['hidden'] = 'mozHidden';
         events['visibilitychange'] = 'mozvisibilitychange';
      } else if (typeof hDocument.msHidden !== "undefined") {
         properties['hidden'] = 'msHidden';
         events['visibilitychange'] = 'msvisibilitychange';
      } else if (typeof hDocument.webkitHidden !== "undefined") {
         properties['hidden'] = 'webkitHidden';
         events['visibilitychange'] = 'webkitvisibilitychange';
      }
      // 计算方向
      this.refreshOrientation();
      RLogger.debug(this, 'Browser connect. (agent={1})', this._agent);
      //..........................................................
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
   public ohSelect(event) {
      var linker = (this as any).__linker;
      return linker._optionSelect;
   }

   //==========================================================
   // <T>可见性处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public ohVisibility(hEvent) {
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
   public ohOrientation(hEvent) {
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
   public ohUnload(event) {
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
   public requestAnimationFrame(callback) {
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
   public cancelRequestAnimationFrame(callback) {
      //var method = this._cancelAnimationFrame;
      var method = null;
      if (method) {
         method(callback);
         return true;
      }
      return false;
   }

   //===========================================================
   // <T>判断是否垂直。</T>
   //
   // @method
   // @return 是否垂直
   //===========================================================
   public refreshOrientation() {
      var hWindow = this._hWindow;
      var orientation = hWindow.orientation;
      if (orientation != null) {
         if ((orientation == 180) || (orientation == 0)) {
            this._orientationCd = EOrientation.Vertical;
         } else if ((orientation == 90) || (orientation == -90)) {
            this._orientationCd = EOrientation.Horizontal;
         } else {
            throw new FError(this, 'Unknown orientation mode.');
         }
      }
      return this._orientationCd;
   }

   //===========================================================
   // <T>参数编码。</T>
   //
   // @method
   // @param value:String 参数
   // @return 编码字符串
   //===========================================================
   public encode(value) {
      return this._hWindow.escape(value);
   }

   //===========================================================
   // <T>参数解码。</T>
   //
   // @method
   // @param value:String 参数
   // @return 解码字符串
   //===========================================================
   public decode(value) {
      return this._hWindow.unescape(value);
   }

   //===========================================================
   // <T>URL参数编码。</T>
   //
   // @method
   // @param url:String 网络地址
   // @param flag:Boolean 是否全部
   // @return 编码字符串
   //===========================================================
   public urlEncode(url, flag) {
      if (flag) {
         return encodeURIComponent(url);
      }
      return encodeURI(url);
   }

   //===========================================================
   // <T>URL参数解码。</T>
   //
   // @method
   // @param url:String 网络地址
   // @param flag:Boolean 是否全部
   // @return 解码字符串
   //===========================================================
   public urlDecode(url, flag) {
      if (flag) {
         return decodeURIComponent(url);
      }
      return decodeURI(url);
   }


   //==========================================================
   // <T>设置窗口是否全屏。</T>
   //
   // @param hPanel 页面窗口
   // @param flag 标志
   //==========================================================
   public fullscreen(hPanel, flag) {
      if (flag) {
         // 进入全屏模式
         if (hPanel.requestFullscreen) {
            hPanel.requestFullscreen();
         } else if (hPanel.mozRequestFullScreen) {
            hPanel.mozRequestFullScreen();
         } else if (hPanel.webkitRequestFullScreen) {
            hPanel.webkitRequestFullScreen();
         } else if (hPanel.msRequestFullscreen) {
            hPanel.msRequestFullscreen();
         }
      } else {
         // 退出全屏模式
         if (hPanel.exitFullscreen) {
            hPanel.exitFullscreen();
         } else if (hPanel.mozCancelFullScreen) {
            hPanel.mozCancelFullScreen();
         } else if (hPanel.webkitCancelFullScreen) {
            hPanel.webkitCancelFullScreen();
         } else if (hPanel.msExitFullscreen) {
            hPanel.msExitFullscreen();
         }
      }
   }

   //===========================================================
   // <T>下载数据块。</T>
   //
   // @method
   // @param fileName:String 文件名称
   // @param text:String 文本内容
   //===========================================================
   public static downloadText(fileName, text) {
      // var blob = RBlob.fromText(text);
      // this.downloadBlob(fileName, blob);
   }

   //===========================================================
   // <T>下载数据块。</T>
   //
   // @method
   // @param fileName 文件名称
   // @param blob 数据块
   //===========================================================
   public static downloadBlob(fileName, blob) {
      var link: any = document.createElement('A');
      var event: any = document.createEvent("MouseEvents");
      event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.dispatchEvent(event);
   }

   //==========================================================
   // <T>释放窗口所有对象。</T>
   //==========================================================
   public dispose() {
      // 设置属性
      var hWindow = this._hWindow;
      var hDocument = this._hDocument;
      var hContainer = this._hContainer;
      // // 关联鼠标事件
      // //if (MO.Window.Browser.supportHtml5()) {
      // hContainer.removeEventListener('mousedown', this.onMouseDown, true);
      // hContainer.removeEventListener('mousemove', this.onMouseMove, true);
      // hContainer.removeEventListener('mouseup', this.onMouseUp, true);
      // hContainer.removeEventListener('mousewheel', this.onMouseWheel, true);
      // hContainer.removeEventListener('keydown', this.onKeyDown, true);
      // hContainer.removeEventListener('keyup', this.onKeyUp, true);
      // hContainer.removeEventListener('keypress', this.onKeyPress, true);
      // hWindow.removeEventListener('orientationchange', this.onOrientation);
      // //} else {
      // hContainer.onmousedown = null;
      // hContainer.onmousemove = null;
      // hContainer.onmouseup = null;
      // hContainer.onmousewheel = null;
      // hContainer.onkeydown = null;
      // hContainer.onkeyup = null;
      // hContainer.onkeypress = null;
      // hWindow.onorientationchange = null;
      // //}
      // hContainer.onresize = null;
      // hContainer.onselectstart = null;
      // hContainer.onunload = null;
      // // @attribute
      // this._localStorage = RObject.dispose(this._localStorage);
      // this._sessionStorage = RObject.dispose(this._sessionStorage);
      // // @attribute
      // this._hWindow = null;
      // this._hDocument = null;
      // this._hContainer = null;
      // // @attribute
      // this._eventMouse = RObject.dispose(this._eventMouse);
      // this._eventKey = RObject.dispose(this._eventKey);
      // this._eventResize = RObject.dispose(this._eventResize);
      // this._eventOrientation = RObject.dispose(this._eventOrientation);
      // this._eventUnload = RObject.dispose(this._eventUnload);
      super.dispose();
   }
}
