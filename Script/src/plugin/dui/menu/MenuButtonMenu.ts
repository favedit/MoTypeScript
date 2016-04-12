import {Listeners} from './runtime/common/lang/Listeners';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {Linker} from './runtime/common/reflect/Linker';
import {EventEnum} from './runtime/ui/EventEnum';
import {AlignEnum} from './runtime/ui/AlignEnum';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {PopupService} from './service/PopupService';
import {RenderContext} from './RenderContext';
import {Component} from './Component';
import {Control} from './Control';
import {AbstractMenuButtn} from './AbstractMenuButtn';
import {MenuButton} from './MenuButton';
import {PopupMenu} from './PopupMenu';
import {MenuBar} from './MenuBar';

//==========================================================
// <T>菜单展开按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
export class MenuButtonMenu extends MenuButton {
   //    // Property
   //    o._action = MO.Class.register(o, new MO.APtyString('action', null));
   //    o._target = MO.Class.register(o, new MO.APtyString('target', null));
   //    o._page = MO.Class.register(o, new MO.APtyString('page'));
   //    o._hotkey = MO.Class.register(o, new MO.APtyString('hotkey'));
   //    o._method = MO.Class.register(o, new MO.APtyString('method'));
   //    o._attributes = MO.Class.register(o, new MO.APtyString('attributes'));
   //    // Attribute
   public _disabled: boolean;
   //..........................................................
   // @attribute
   protected _menu: PopupMenu;
   protected _statusDrop: boolean;
   // Html
   protected _hDropPanel;
   protected _hDrop;
   protected hButton;
   protected hButtonLine;
   protected hButtonPanel;
   protected hLabel;
   protected hIcon;
   protected hText;
   // 弹出服务
   @Linker(PopupService)
   protected _popupService: PopupService;

   //==========================================================
   // <T>构建对象。</T>
   //==========================================================
   public constructor() {
      super();
      // 创建弹出窗口
      var menu = this._menu = new PopupMenu();
      menu.opener = this;
      this.push(menu);
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createDiv();
   }

   //==========================================================
   // <T>建立下拉按钮。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onBuildDrop(context: RenderContext) {
      var hPanel = this._hDropPanel;
      // 创建下拉栏
      //hPanel.className = this.styleName('Drop', Dropable);
      hPanel.className = this.styleName('Drop');
      var hDrop = this._hDrop = context.appendIcon(hPanel, null, 'control.drop');
      hDrop.style.width = '16px';
      hDrop.style.borderLeft = '1 solid #CCCCCC';
      hDrop.style.cursor = 'hand';
      // 绑定事件
      // this.attachEvent(hDrop, EventEnum.Enter, this.onDropEnter);
      // this.attachEvent(hDrop, EventEnum.Leave, this.onDropLeave);
      // this.attachEvent(hDrop, EventEnum.Click, this.onDropClick);
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @param context 参数集合
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 建立下拉按键
      //var hDropPanel = this._hDropPanel = context.appendTableCell(this._hLine);
      //this.onBuildDrop(context);
      //o._hDropIcon = MO.Window.Builder.appendIcon(h, o.styleIcon('Drop'));
      //o.attachEvent('onDropClick', hDropPanel);
      // 建立弹出菜单
      this._menu.build(context);
   }

   //==========================================================
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      this._menu.appendDisplay(control);
   }

   //==========================================================
   // <T>移除一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public removeDisplay(control: Control) {
      this._menu.removeDisplay(control);
   }

   // // ------------------------------------------------------------
   // MO.FDuiMenuButtonMenu_oeEnable = function FDuiMenuButtonMenu_oeEnable(event) {
   //    var o = this;
   //    o.base.FDuiControl.oeEnable.call(o, event);
   //    o.hPanel.className = o.style('Button');
   //    if (o._iconDisable && o._icon) {
   //       o.hIcon.src = RRes._iconPath(o._icon);
   //    }
   //    return MO.EEventStatus.Stop;
   // }

   // // ------------------------------------------------------------
   // MO.FDuiMenuButtonMenu_oeDisable = function FDuiMenuButtonMenu_oeDisable(event) {
   //    var o = this;
   //    o.base.FDuiControl.oeDisable.call(o, event);
   //    o.hPanel.className = o.style('Disable');
   //    if (o._iconDisable) {
   //       o.hIcon.src = RRes._iconPath(o._iconDisable);
   //    }
   //    return MO.EEventStatus.Stop;
   // }

   // // ------------------------------------------------------------
   // MO.FDuiMenuButtonMenu_onEnter = function FDuiMenuButtonMenu_onEnter() {
   //    var o = this;
   //    if (!o._disabled) {
   //       o.hPanel.className = o.style('Hover');
   //    }
   // }

   // // ------------------------------------------------------------
   // MO.FDuiMenuButtonMenu_onLeave = function FDuiMenuButtonMenu_onLeave() {
   //    var o = this;
   //    if (!o._disabled) {
   //       o.hPanel.className = o.style('Panel');
   //    }
   // }

   // // ------------------------------------------------------------
   // public onMouseDown() {
   //    var o = this;
   //    if (!o._disabled) {
   //       o.hPanel.className = o.style('Press');
   //    }
   // }
   // // ------------------------------------------------------------
   // public onMouseUp() {
   //    var o = this;
   //    if (!o._disabled) {
   //       o.hPanel.className = o.style('Hover');
   //    }
   // }
   // // ------------------------------------------------------------
   // public onClick() {
   //    var o = this;
   //    if (!o._disabled) {
   //       MO.Console.find(MO.FFocusConsole).focus(o);
   //       if (o._action) {
   //          eval(o._action);
   //       }
   //       if (o._page || o._method) {
   //          var form = MO.Window.Html.form(o.hButton);
   //          var p = RPage.parse(o._page);
   //          if (o._method) {
   //             p._action = o._method;
   //          }
   //          p.split(o._attributes);
   //          p.post(form, o._target);
   //       }
   //       o.processClick();
   //    }
   // }

   //==========================================================
   // <T>添加一个菜单选项到这个菜单里。</T>
   //
   // @param component 组件
   //==========================================================
   public push(component: Component) {
      if (component instanceof AbstractMenuButtn) {
         this._menu.push(component);
      } else {
         super.push(component);
      }
   }

   //==========================================================
   // <T>弹出下拉框。</T>
   //
   // @method
   //==========================================================
   public drop(flag) {
      if (!this._disabled) {
         this._statusDrop = !this._statusDrop;
         if (this._statusDrop) {
            this._hForm.className = this.styleName('Press');
            this._menu.drop(this._hDropPanel, AlignEnum.BottomRight);
            this._popupService.show(this._menu);
         } else {
            this._hForm.className = this.styleName('Normal');
            this._menu.hide();
         }
      }
   }

   //==========================================================
   // <T>点击处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   public doClick() {
      //super.doClick();
      // 下拉处理
      this.drop(!this._statusDrop);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // this.hPanel = MO.Window.Html.free(this.hPanel);
      // this.hButton = MO.Window.Html.free(this.hButton);
      // this.hIcon = null;
      // this.hButtonLine = null;
      // this.hLabel = null;
      super.dispose();
   }
}