import {FError} from '../../common/lang/FError';
import {RLogger} from '../../common/lang/RLogger';
import {EDevice} from './EDevice';
import {ESoftware} from './ESoftware';
import {EBrowser} from './EBrowser';
import {EOrientation} from './EOrientation';
import {SBrowserCapability} from './SBrowserCapability';

//==========================================================
// <T>运行信息管理类。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
export class RBrowser {
   // @attribute
   public static _agent = null;
   public static _capability = null;
   public static _defineProperties = null;
   public static _defineEvents = null;
   public static _defineMethods = null;
   // @attribute
   public static _deviceCd = EDevice.Unknown;
   public static _softwareCd = ESoftware.Unknown;
   public static _typeCd = EBrowser.Unknown;
   public static _orientationCd = EOrientation.Horizontal;
   public static _supportHtml5 = false;
   public static _hostPath = '';
   public static _contentPath = '';

   //===========================================================
   // <T>日志输出处理。</T>
   //
   // @method
   // @param event:Object 事件信息
   //===========================================================
   public static onLog(event) {
      (console as any).log(event.message);
   }

   //===========================================================
   // <T>构造处理。</T>
   //
   // @method
   //===========================================================
   public static construct() {
      var o: any = this;
      var code = o._agent = window.navigator.userAgent.toString();
      var agent = code.toLowerCase();
      var properties = o._defineProperties = new Object();
      var events = o._defineEvents = new Object();
      var methods = o._defineMethods = new Object();
      var capability = o._capability = new SBrowserCapability();
      // 判断设备类型
      if (agent.indexOf("android") != -1) {
         o._typeCd = EDevice.Mobile;
         o._softwareCd = ESoftware.Android;
      }
      // 判断浏览器类型
      if (agent.indexOf("chrome") != -1) {
         o._typeCd = EBrowser.Chrome;
      } else if (agent.indexOf("firefox") != -1) {
         o._typeCd = EBrowser.FireFox;
      } else if ((agent.indexOf("msie") != -1) || (agent.indexOf("windows") != -1)) {
         o._typeCd = EBrowser.Explorer;
      } else if ((agent.indexOf("safari") != -1) || (agent.indexOf("applewebkit") != -1)) {
         o._typeCd = EBrowser.Safari;
      } else {
         alert('Unknown browser.\n' + agent);
         return;
      }
      // 是否移动或PC模式
      /*var platformCd = MO.EPlatform.Mobile;
      var environmentConsole = MO.Console.find(MO.FEnvironmentConsole);
      if (MO.Lang.String.contains(agent, 'android', 'ipad', 'iphone', 'midp', 'rv:1.2.3.4', 'windows ce', 'windows mobile')) {
         platformCd = MO.EPlatform.Mobile;
         environmentConsole.registerValue(MO.EConstant.DeviceType, 'mb');
      } else {
         platformCd = MO.EPlatform.Pc;
         environmentConsole.registerValue(MO.EConstant.DeviceType, 'pc');
      }
      MO.Runtime.setPlatformCd(platformCd);
      // 判断浏览器是否需要声音确认
      if (MO.Lang.String.contains(agent, 'android 5.1', 'iphone', 'ipad')) {
         capability.soundConfirm = true;
      }
      // 判断浏览器是否支持画面缩放
      if (MO.Lang.String.contains(agent, 'mqqbrowser')) {
         capability.canvasScale = false;
      }
      // 注册输出接口
      if (o._typeCd == MO.EBrowser.Chrome) {
         MO.Logger.lsnsOutput.register(o, o.onLog);
      }
      // 输出日志
      MO.Logger.debug(o, 'Parse browser agent. (platform_cd={1}, type_cd={2})', MO.Lang.Enum.decode(MO.EPlatform, platformCd), MO.Lang.Enum.decode(MO.EBrowser, o._typeCd));
      // 是否支持HTML5
      if (window.applicationCache) {
         o._supportHtml5 = true;
      }
      // 检测是否支持声音完成(360浏览器不支持声音完成相应)
      var external = window.external;
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
      var pixelRatio = window.devicePixelRatio;
      if (pixelRatio) {
         if (MO.Runtime.isPlatformMobile()) {
            // 强制不要超过3倍
            capability.pixelRatio = Math.min(pixelRatio, 3);
            MO.Logger.debug(o, 'Parse browser agent. (pixel_ratio={1}, capability_ratio={2})', pixelRatio, capability.pixelRatio);
         }
      }
      if (window.Worker) {
         //capability.optionProcess = true;
      }
      if (window.localStorage) {
         capability.optionStorage = true;
      }
      try {
         new Blob(["Test"], { 'type': 'text/plain' });
         capability.blobCreate = true;
      } catch (e) {
         MO.Logger.warn(o, 'Browser blob not support.');
      }
      // 设置函数
      var hDocument = window.document;
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
      }*/
      // 计算方向
      o.refreshOrientation();
      RLogger.debug(o, 'Browser connect. (agent={1})', o._agent);
   }

   //==========================================================
   // <T>获得信息。</T>
   //
   // @method
   // @return String 信息
   //==========================================================
   public static agent() {
      return this._agent;
   }

   //==========================================================
   // <T>获得浏览器环境信息。</T>
   //
   // @method
   // @return Object 浏览器环境信息
   //==========================================================
   public static capability() {
      return this._capability;
   }

   //==========================================================
   // <T>获得定义属性集合。</T>
   //
   // @method
   // @return Object 定义属性集合
   //==========================================================
   public static defineProperties() {
      return this._defineProperties;
   }

   //==========================================================
   // <T>获得定义属性。</T>
   //
   // @method
   // @return String 定义属性
   //==========================================================
   public static definePropertyGet(name) {
      return this._defineProperties[name];
   }

   //==========================================================
   // <T>获得定义事件集合。</T>
   //
   // @method
   // @return Object 定义事件集合
   //==========================================================
   public static defineEvents() {
      return this._defineEvents;
   }

   //==========================================================
   // <T>获得定义事件。</T>
   //
   // @method
   // @return String 定义事件
   //==========================================================
   public static defineEventGet(name) {
      return this._defineEvents[name];
   }

   //==========================================================
   // <T>获得定义函数集合。</T>
   //
   // @method
   // @return Object 定义函数集合
   //==========================================================
   public static defineMethods() {
      return this._defineMethods;
   }

   //==========================================================
   // <T>获得定义函数。</T>
   //
   // @method
   // @return String 定义函数名称
   //==========================================================
   public static defineMethodGet(name) {
      return this._defineMethods[name];
   }

   //==========================================================
   // <T>测试是否支持HTML5规范。</T>
   //
   // @method
   // @return 是否支持
   //==========================================================
   public static supportHtml5() {
      return this._supportHtml5;
   }

   //===========================================================
   // <T>获得主机路径。</T>
   //
   // @method
   // @param uri:String 路径
   // @return String 主机路径
   //===========================================================
   public static hostPath(uri) {
      var o = this;
      if (uri) {
         return o._hostPath + uri;
      }
      return o._hostPath;
   }

   //===========================================================
   // <T>设置主机路径。</T>
   //
   // @method
   // @param host:String 主机路径
   //===========================================================
   public static setHostPath(host) {
      this._hostPath = host;
   }

   //===========================================================
   // <T>获得内容路径。</T>
   //
   // @method
   // @param uri:String 路径
   // @return String 内容路径
   //===========================================================
   public static contentPath(uri) {
      var o = this;
      if (uri) {
         return o._contentPath + uri;
      }
      return o._contentPath;
   }

   //===========================================================
   // <T>设置内容路径。</T>
   //
   // @method
   // @param path:String 路径
   //===========================================================
   public static setContentPath(path) {
      this._contentPath = path;
   }

   //===========================================================
   // <T>获得浏览器类型。</T>
   //
   // @method
   // @return 浏览器类型
   //===========================================================
   public static typeCd() {
      return this._typeCd;
   }

   //===========================================================
   // <T>判断是否指定浏览器。</T>
   //
   // @param browserCd:EBrowser 浏览器类型
   // @return 是否指定浏览器
   //===========================================================
   public static isBrowser(browserCd) {
      return this._typeCd == browserCd;
   }

   //===========================================================
   // <T>返回屏幕方向。</T>
   //
   // @method
   // @return 屏幕方向
   //===========================================================
   public static orientationCd() {
      return this._orientationCd;
   }

   //===========================================================
   // <T>设置屏幕方向。</T>
   //
   // @method
   // @param orientationCd:EOrientation 屏幕方向
   //===========================================================
   public static setOrientationCd(orientationCd) {
      this._orientationCd = orientationCd;
   }

   //===========================================================
   // <T>判断是否横屏。</T>
   //
   // @method
   // @return 是否横屏
   //===========================================================
   public static isOrientationHorizontal() {
      return this._orientationCd == EOrientation.Horizontal;
   }

   //===========================================================
   // <T>判断是否垂直。</T>
   //
   // @method
   // @return 是否垂直
   //===========================================================
   public static isOrientationVertical() {
      return this._orientationCd == EOrientation.Vertical;
   }

   //===========================================================
   // <T>判断是否垂直。</T>
   //
   // @method
   // @return 是否垂直
   //===========================================================
   public static refreshOrientation() {
      var o: any = this;
      var orientation = window.orientation;
      if (orientation != null) {
         if ((window.orientation == 180) || (window.orientation == 0)) {
            o._orientationCd = EOrientation.Vertical;
         } else if ((window.orientation == 90) || (window.orientation == -90)) {
            o._orientationCd = EOrientation.Horizontal;
         } else {
            throw new FError(o, 'Unknown orientation mode.');
         }
      }
      return o._orientationCd;
   }

   //===========================================================
   // <T>判断是否可见。</T>
   //
   // @method
   // @return 是否可见
   //===========================================================
   public static isVisibility() {
      var name = this.definePropertyGet('hidden');
      return !window.document[name];
   }

   //===========================================================
   // <T>参数编码。</T>
   //
   // @method
   // @param value:String 参数
   // @return 编码字符串
   //===========================================================
   public static encode(value) {
      //return escape(value);
   }

   //===========================================================
   // <T>参数解码。</T>
   //
   // @method
   // @param value:String 参数
   // @return 解码字符串
   //===========================================================
   public static decode(value) {
      //return unescape(value);
   }

   //===========================================================
   // <T>URL参数编码。</T>
   //
   // @method
   // @param url:String 网络地址
   // @param flag:Boolean 是否全部
   // @return 编码字符串
   //===========================================================
   public static urlEncode(url, flag) {
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
   public static urlDecode(url, flag) {
      if (flag) {
         return decodeURIComponent(url);
      }
      return decodeURI(url);
   }

   //==========================================================
   // <T>设置窗口是否全屏。</T>
   //
   // @method
   // @param hWindow:HtmlWindow 页面窗口
   // @param flag:Boolean 标志
   //==========================================================
   public static fullscreen(hWindow, flag) {
      if (flag) {
         // 进入全屏模式
         if (hWindow.requestFullscreen) {
            hWindow.requestFullscreen();
         } else if (hWindow.mozRequestFullScreen) {
            hWindow.mozRequestFullScreen();
         } else if (hWindow.webkitRequestFullScreen) {
            hWindow.webkitRequestFullScreen();
         } else if (hWindow.msRequestFullscreen) {
            hWindow.msRequestFullscreen();
         }
      } else {
         // 退出全屏模式
         if (hWindow.exitFullscreen) {
            hWindow.exitFullscreen();
         } else if (hWindow.mozCancelFullScreen) {
            hWindow.mozCancelFullScreen();
         } else if (hWindow.webkitCancelFullScreen) {
            hWindow.webkitCancelFullScreen();
         } else if (hWindow.msExitFullscreen) {
            hWindow.msExitFullscreen();
         }
      }
   }

   //===========================================================
   // <T>下载数据块。</T>
   //
   // @method
   // @param fileName:String 文件名称
   // @param blob:Blob 数据块
   //===========================================================
   public static downloadBlob(fileName, blob) {
      var link = document.createElement('A');
      var event = document.createEvent("MouseEvents");
      //event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      //link.download = fileName;
      //link.href = URL.createObjectURL(blob);
      //link.dispatchEvent(event);
   }

   //===========================================================
   // <T>下载数据块。</T>
   //
   // @method
   // @param fileName:String 文件名称
   // @param text:String 文本内容
   //===========================================================
   public static downloadText(fileName, text) {
      //var blob = MO.Labg.Blob.fromText(text);
      //this.downloadBlob(fileName, blob);
   }

   //===========================================================
   // <T>存储设置。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //===========================================================
   public static saveConfig(xconfig) {
      var o = this;
      var xagent = xconfig.create('Agent');
      //xagent.setValue(o._agent);
   }
}
