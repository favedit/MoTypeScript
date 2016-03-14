import {FError} from '../../common/lang/FError';
import {FAttributes} from '../../common/lang/FAttributes';
import {FListeners} from '../../common/lang/FListeners';
import {SEvent} from '../../common/lang/SEvent';
import {RObject} from '../../common/lang/RObject';
import {RString} from '../../common/lang/RString';

//==========================================================
// <T>页面窗口的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
export class RWindow {
   // @attribute
   public static _statusError = false;
   public static _statusEnable = true;
   public static _disableDeep = 0;
   //..........................................................
   // @html
   public static _hDisablePanel = null;
   public static _hDisableImage = null;

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
      ////o.lsnsDeviceError.process(event);
   }


   //==========================================================
   // <T>获得COOKIE集合。</T>
   //
   // @method
   // @param value:String 标题
   //==========================================================
   public static cookies() {
      //return this._cookies;
   }

   //==========================================================
   // <T>获得COOKIE内容。</T>
   //
   // @method
   // @param name:String 名称
   // @return String 内容
   //==========================================================
   public static cookie(name) {
      //return this._cookies.get(name);
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
      //this._hContainer.disabled = true;
   }

   //==========================================================
   // <T>使窗口的变为可用状态。</T>
   //
   // @method
   //==========================================================
   public static windowEnable() {
      //this._hContainer.disabled = false;
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
      // var o = this;
      // var h = o.makeDisablePanel(f);
      // var st = h.style;
      // if (!v) {
      //    var hd = o._hDocument;
      //    var s = o._hDisablePanel.style;
      //    s.left = '0px';
      //    s.top = '0px';
      //    s.width = (hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth) + 'px';
      //    s.height = (hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight) + 'px';
      //    if (!h._linked) {
      //       o._hContainer.appendChild(h);
      //       h._linked = true;
      //    }
      // } else {
      //    o.windowEnable();
      //    if (h._linked) {
      //       o._hContainer.removeChild(h);
      //       h._linked = false;
      //    }
      // }
      // o._statusEnable = v;
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
}
