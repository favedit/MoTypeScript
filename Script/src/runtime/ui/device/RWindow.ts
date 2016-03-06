import {FError} from '../../common/lang/FError';
import {FAttributes} from '../../common/lang/FAttributes';
import {FListeners} from '../../common/lang/FListeners';
import {SEvent} from '../../common/lang/SEvent';
import {RObject} from '../../common/lang/RObject';
import {RString} from '../../common/lang/RString';
import {SMouseEvent} from './SMouseEvent';
import {SKeyboardEvent} from './SKeyboardEvent';
import {SResizeEvent} from './SResizeEvent';

//==========================================================
// <T>页面窗口的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
export class RWindow {
   // @attribute
   public static _optionSelect = true;
   // @attribute
   public static _statusError = false;
   public static _statusEnable = true;
   public static _disableDeep = 0;
   // @attribute
   public static _cookies = new FAttributes();
   public static _localStorage = null;
   public static _sessionStorage = null;
   // @attribute
   public static _eventMouse = new SMouseEvent();
   public static _eventKey = new SKeyboardEvent();
   public static _eventResize = new SResizeEvent();
   public static _eventVisibility = new SEvent();
   public static _eventOrientation = new SEvent();
   public static _eventUnload = new SEvent();
   //..........................................................
   // @html
   public static _hWindow = null;
   public static _hDocument = null;
   public static _hContainer = null;
   public static _hDisablePanel = null;
   public static _hDisableImage = null;
   //..........................................................
   // @listeners
   public static lsnsLoad = new FListeners();
   public static lsnsLoaded = new FListeners();
   public static lsnsUnload = new FListeners();
   public static lsnsMouseDown = new FListeners();
   public static lsnsMouseUp = new FListeners();
   public static lsnsMouseOver = new FListeners();
   public static lsnsMouseMove = new FListeners();
   public static lsnsMouseWheel = new FListeners();
   public static lsnsKeyDown = new FListeners();
   public static lsnsKeyUp = new FListeners();
   public static lsnsKeyPress = new FListeners();
   public static lsnsResize = new FListeners();
   public static lsnsVisibility = new FListeners();
   public static lsnsOrientation = new FListeners();
   public static lsnsDeviceError = new FListeners();

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohMouseDown(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      //var event = o._eventMouse;
      //event.code = MO.EEvent.MouseDown;
      //event.attachEvent(hEvent);
      //o.lsnsMouseDown._listeners.at(0).process(event);
      //o.lsnsMouseDown._listeners.at(1).process(event);
      //o.lsnsMouseDown._listeners.at(2).process(event);
      //o.lsnsMouseDown._listeners.at(3).process(event);
      //o.lsnsMouseDown.process(event);
   }

   //==========================================================
   // <T>鼠标移动处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohMouseMove(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      //var event = o._eventMouse;
      //event.code = MO.EEvent.MouseMove;
      //event.attachEvent(hEvent);
      //o.lsnsMouseMove.process(event);
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohMouseUp(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      //var event = o._eventMouse;
      //event.code = MO.EEvent.MouseUp;
      //event.attachEvent(hEvent);
      //o.lsnsMouseUp.process(event);
   }

   //==========================================================
   // <T>鼠标滚动处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohMouseWheel(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      //var event = o._eventMouse;
      //event.code = MO.EEvent.MouseWheel;
      //event.attachEvent(hEvent);
      //o.lsnsMouseWheel.process(event);
   }

   //==========================================================
   // <T>键盘按下处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohKeyDown(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      //var event = o._eventKey;
      //event.code = MO.EEvent.KeyDown;
      //event.attachEvent(hEvent);
      //o.lsnsKeyDown.process(event);
      //   MO.Logger.debug(o, 'Window key down. (key_code={1})', e.keyCode);
      //   var s = e.srcElement ? e.srcElement : e.target;
      //   var t = s.tagName;
      //   if(EKeyCode.BackSpace == e.keyCode){
      //      // 禁止在非输入框内输入退格键
      //      if('INPUT' == t){
      //         if(s.readOnly || 'checkbox' == s.type){
      //            return RKey.eventClear(e);
      //         }
      //      }else if('TEXTAREA' == t){
      //         if(s.readOnly){
      //            return RKey.eventClear(e);
      //         }
      //      }else{
      //         return RKey.eventClear(e);
      //      }
      //   }
      //   // 纷发按键消息
      //   o.__keyDownEvent.attach(e);
      //   o.lsnsKeyDown.process(o.__keyDownEvent);
      //   // 处理回车键
      //   if(EKeyCode.Enter == e.keyCode){
      //      if('INPUT' == t){
      //         if(REvent.process(s, e)){
      //            RKey.eventClear(e);
      //         }
      //      }
      //   }
   }

   //==========================================================
   // <T>键盘抬起处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohKeyUp(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      //var event = o._eventKey;
      //event.code = MO.EEvent.KeyUp;
      //event.attachEvent(hEvent);
      //o.lsnsKeyUp.process(event);
   }

   //==========================================================
   // <T>键盘点击处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohKeyPress(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      //var event = o._eventKey;
      //event.code = MO.EEvent.KeyPress;
      //event.attachEvent(hEvent);
      //o.lsnsKeyPress.process(event);
   }

   //==========================================================
   // <T>改变大小处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public static ohResize(hEvent) {
      //var o = MO.Window;
      //if (!hEvent) {
      //   hEvent = o._hWindow.event;
      //}
      // 接收事件
      //var event = o._eventResize;
      //event.code = MO.EEvent.Resize;
      //event.attachEvent(hEvent);
      //o.lsnsResize.process(event);
      //   var o = this;
      //   var h = o._hDisablePanel;
      //   if(h){
      //      if('block' == h.style.display){
      //         var s = h.style;
      //         var hd = o.hDocument;
      //         s.pixelLeft = 0;
      //         s.pixelTop = 0
      //         s.pixelWidth = hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth;
      //         s.pixelHeight = hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight;
      //      }
      //   }
      //   // 根据窗口大小，不发送重复事件
      //   if(o.oldBodyWidth == o._hContainer.offsetWidth && o.oldBodyHeight == o._hContainer.offsetHeight){
      //      return;
      //   }
      //   o.oldBodyWidth = o._hContainer.offsetWidth;
      //   o.oldBodyHeight = o._hContainer.offsetHeight;
      //   // 通知所有控件，窗口改变大小
      //   o.onResize();
      //   o.lsnsResize.process(e);
   }

   //==========================================================
   // <T>选取处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public static ohSelect(event) {
      //return MO.Window._optionSelect;
   }

   //==========================================================
   // <T>可见性处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohVisibility(hEvent) {
      //var o = MO.Window;
      // 刷新方向
      //var visibility = MO.Window.Browser.isVisibility();
      // 分发消息
      //var event = o._eventVisibility;
      //event.visibility = visibility;
      //o.lsnsVisibility.process(event);
      //MO.Logger.debug(o, 'Window visibility changed. (visibility={1})', visibility);
   }

   //==========================================================
   // <T>选取处理。</T>
   //
   // @method
   // @param hEvent:htmlEvent 事件
   //==========================================================
   public static ohOrientation(hEvent) {
      //var o = MO.Window;
      // 刷新方向
      //var orientationCd = o.Browser.refreshOrientation();
      // 分发消息
      //var event = o._eventOrientation;
      //event.orientationCd = orientationCd;
      //o.lsnsOrientation.process(event);
      //MO.Logger.debug(o, 'Window orientation changed. (orientation_cd={1})', orientationCd);
   }

   //==========================================================
   // <T>卸载处理处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public static ohUnload(event) {
      //var o = MO.Window;
      // 释放处理
      //var event = o._eventUnload;
      //o.lsnsUnload.process(event);
      // 释放窗口
      //o.dispose();
   }

   //==========================================================
   // <T>关联当前窗口。</T>
   // <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
   //
   // @method
   // @param hWindow:<Window> 窗口对象
   //==========================================================
   public static connect(hWindow) {
      var o = this;
      // 设置事件
      /*o._eventVisibility.code = MO.EEvent.Visibility;
      o._eventOrientation.code = MO.EEvent.Orientation;
      // 设置属性
      var hWindow = o._hWindow = hWindow;
      var hDocument = o._hDocument = hWindow.document;
      var hContainer = o._hContainer = hDocument.body;
      // 关联鼠标事件
      var visibilitychange = MO.Window.Browser.defineEventGet('visibilitychange');
      if (MO.Window.Browser.supportHtml5()) {
         hContainer.addEventListener('mousedown', o.ohMouseDown, true);
         hContainer.addEventListener('mousemove', o.ohMouseMove, true);
         hContainer.addEventListener('mouseup', o.ohMouseUp, true);
         hContainer.addEventListener('mousewheel', o.ohMouseWheel, true);
         hContainer.addEventListener('keydown', o.ohKeyDown, true);
         hContainer.addEventListener('keyup', o.ohKeyUp, true);
         hContainer.addEventListener('keypress', o.ohKeyPress, true);
         hDocument.addEventListener(visibilitychange, o.ohVisibility, true);
      } else {
         hContainer.onmousedown = o.ohMouseDown;
         hContainer.onmousemove = o.ohMouseMove;
         hContainer.onmouseup = o.ohMouseUp;
         hContainer.onmousewheel = o.ohMouseWheel;
         hContainer.onkeydown = o.ohKeyDown;
         hContainer.onkeyup = o.ohKeyUp;
         hContainer.onkeypress = o.ohKeyPress;
         hDocument['on' + visibilitychange] = o.ohVisibility;
      }
      hWindow.onorientationchange = o.ohOrientation;
      hContainer.onresize = o.ohResize;
      hContainer.onselectstart = o.ohSelect;
      hContainer.onunload = o.ohUnload;
      // 读取COOKIES
      o._cookies.split(hDocument.cookie, '=', ';');
      // 检测事件
      o._requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
      o._cancelAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame;
      */
   }

   //==========================================================
   // <T>获得窗口对象。</T>
   //
   // @method
   // @return HtmlTag 窗口对象
   //==========================================================
   public static htmlWindow() {
      return this._hWindow;
   }

   //==========================================================
   // <T>获得配置选取。</T>
   //
   // @method
   // @return Boolean 配置选取
   //==========================================================
   public static optionSelect() {
      return this._optionSelect;
   }

   //==========================================================
   // <T>设置配置选取。</T>
   //
   // @method
   // @param select:Boolean 配置选取
   //==========================================================
   public static setOptionSelect(select) {
      var o = this;
      o._optionSelect = select;
      //if (MO.Window.Browser.isBrowser(EBrowser.FireFox)) {
      //   o._hContainer.style.MozUserSelect = select ? '' : 'none';
      //}
   }

   //==========================================================
   // <T>获得错误状态。</T>
   //
   // @method
   // @return Boolean 错误状态
   //==========================================================
   public static statusError() {
      return this._statusError;
   }

   //==========================================================
   // <T>设置错误状态。</T>
   //
   // @method
   // @param value:Boolean 配置选取
   //==========================================================
   public static setStatusError(value) {
      this._statusError = value;
   }

   //==========================================================
   // <T>设置错误状态。</T>
   //
   // @method
   // @param value:Boolean 配置选取
   //==========================================================
   public static processDeviceError(event) {
      var o = this;
      o._statusError = true;
      o.lsnsDeviceError.process(event);
   }

   //==========================================================
   // <T>设置标题。</T>
   //
   // @method
   // @param value:String 标题
   //==========================================================
   public static setCaption(value) {
      top.document.title = RString.nvl(value);
   }

   //==========================================================
   // <T>设置状态。</T>
   //
   // @method
   // @param value:String 状态
   //==========================================================
   public static setStatus(value) {
      window.status = RString.nvl(value);
   }

   //==========================================================
   // <T>获得COOKIE集合。</T>
   //
   // @method
   // @param value:String 标题
   //==========================================================
   public static cookies() {
      return this._cookies;
   }

   //==========================================================
   // <T>获得COOKIE内容。</T>
   //
   // @method
   // @param name:String 名称
   // @return String 内容
   //==========================================================
   public static cookie(name) {
      return this._cookies.get(name);
   }

   //==========================================================
   // <T>获得存储对象。</T>
   //
   // @method
   // @param scopeCd:EScope 范围
   //==========================================================
   public static storage(scopeCd) {
      var o = this;
      /*
      switch (scopeCd) {
         case MO.EScope.Local:
            var storage = o._localStorage;
            if (!storage) {
               storage = o._localStorage = MO.Class.create(MO.FWindowStorage);
               storage.link(window.localStorage);
            }
            return storage;
         case MO.EScope.Session:
            var storage = o._sessionStorage;
            if (!storage) {
               storage = o._sessionStorage = MO.Class.create(MO.FWindowStorage);
               storage.link(window.sessionStorage);
            }
            return storage;
      }*/
      throw new FError(o, 'Unknown scope. (scope_cd={1})', scopeCd);
   }

   //==========================================================
   // <T>获得系统禁止时的页面层。</T>
   //
   // @method
   // @param f:flag:Boolean 是否显示图片层 true : 不显示图片
   // @return <DIV> 页面层
   //==========================================================
   public static makeDisablePanel(f) {
      var o = this;
      // 创建面板
      var hPanel = o._hDisablePanel;
      /*if (!hPanel) {
         hPanel = o._hDisablePanel = MO.Window.Builder.createDiv(o._hDocument, 'RWindow_Disable');
         hPanel.style.zIndex = 5000;
      }
      // 创建图片
      var hImage = o._hDisableImage;
      if (!hImage) {
         hImage = o._hDisableImage = MO.Window.Builder.appendIcon(hPanel);
         hImage.src = MO.RResource.iconPath('control.RWindow_Loading');
         hImage.style.margin = o._hContainer.offsetHeight / 2;
         hImage.style.display = 'none';
      }
      MO.Window.Html.visibleSet(hImage, f);*/
      return hPanel;
   }

   //==========================================================
   // <T>使窗口的变为可用状态。</T>
   //
   // @method
   //==========================================================
   public static windowDisable() {
      this._hContainer.disabled = true;
   }

   //==========================================================
   // <T>使窗口的变为可用状态。</T>
   //
   // @method
   //==========================================================
   public static windowEnable() {
      this._hContainer.disabled = false;
   }

   //==========================================================
   // <T>获得是否允许处理。</T>
   //
   // @method
   // @return 是否允许
   //==========================================================
   public static isEnable() {
      return this._statusEnable;
   }

   //==========================================================
   // <T>允许窗口操作。</T>
   //
   // @method
   //==========================================================
   public static enable() {
      var o = this;
      o._disableDeep--;
      if (o._disableDeep == 0) {
         //o.setEnable(true);
      }
   }

   //==========================================================
   // <T>禁止窗口操作。</T>
   //
   // @method
   //==========================================================
   public static disable() {
      var o = this;
      if (o._disableDeep == 0) {
         //o.setEnable(false);
      }
      o._disableDeep++;
   }

   //==========================================================
   // <T>设置窗口操作模式。</T>
   //
   // @method
   // @param v:value:Boolean 是否允许操作
   //==========================================================
   public static setEnable(v, f) {
      var o = this;
      var h = o.makeDisablePanel(f);
      var st = h.style;
      if (!v) {
         var hd = o._hDocument;
         var s = o._hDisablePanel.style;
         s.left = '0px';
         s.top = '0px';
         s.width = (hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth) + 'px';
         s.height = (hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight) + 'px';
         if (!h._linked) {
            o._hContainer.appendChild(h);
            h._linked = true;
         }
      } else {
         o.windowEnable();
         if (h._linked) {
            o._hContainer.removeChild(h);
            h._linked = false;
         }
      }
      o._statusEnable = v;
   }

   //==========================================================
   // <T>追加页面元素。</T>
   //
   // @method
   // @param hPanel:HtmlTag 页面元素
   //==========================================================
   public static appendElement(hPanel) {
      //MO.Assert.debugNotNull(hPanel);
      //this._hContainer.appendChild(hPanel);
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

   //==========================================================
   // <T>跳转到指定地址。</T>
   //
   // @method
   // @param url:String 网络地址
   //==========================================================
   public static redirect() {
   }

   //==========================================================
   // <T>历史前进一级。</T>
   //
   // @method
   //==========================================================
   public static historyForward() {
   }

   //==========================================================
   // <T>历史后退一级。</T>
   //
   // @method
   //==========================================================
   public static historyBack() {
   }

   //==========================================================
   // <T>释放窗口所有对象。</T>
   //==========================================================
   public static dispose() {
      var o: any = this;
      // 设置属性
      var hWindow = o._hWindow;
      var hDocument = o._hDocument;
      var hContainer = o._hContainer;
      // 关联鼠标事件
      //if (MO.Window.Browser.supportHtml5()) {
      hContainer.removeEventListener('mousedown', o.onMouseDown, true);
      hContainer.removeEventListener('mousemove', o.onMouseMove, true);
      hContainer.removeEventListener('mouseup', o.onMouseUp, true);
      hContainer.removeEventListener('mousewheel', o.onMouseWheel, true);
      hContainer.removeEventListener('keydown', o.onKeyDown, true);
      hContainer.removeEventListener('keyup', o.onKeyUp, true);
      hContainer.removeEventListener('keypress', o.onKeyPress, true);
      hWindow.removeEventListener('orientationchange', o.onOrientation);
      //} else {
      hContainer.onmousedown = null;
      hContainer.onmousemove = null;
      hContainer.onmouseup = null;
      hContainer.onmousewheel = null;
      hContainer.onkeydown = null;
      hContainer.onkeyup = null;
      hContainer.onkeypress = null;
      hWindow.onorientationchange = null;
      //}
      hContainer.onresize = null;
      hContainer.onselectstart = null;
      hContainer.onunload = null;
      // @attribute
      o._localStorage = RObject.dispose(o._localStorage);
      o._sessionStorage = RObject.dispose(o._sessionStorage);
      // @attribute
      o._hWindow = null;
      o._hDocument = null;
      o._hContainer = null;
      // @attribute
      o._eventMouse = RObject.dispose(o._eventMouse);
      o._eventKey = RObject.dispose(o._eventKey);
      o._eventResize = RObject.dispose(o._eventResize);
      o._eventOrientation = RObject.dispose(o._eventOrientation);
      o._eventUnload = RObject.dispose(o._eventUnload);
   }
}
