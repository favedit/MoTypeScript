import {Listeners} from './runtime/common/lang/Listeners';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from './RenderContext';
import {Control} from './Control';
import {AbstractMenuButtn} from './AbstractMenuButtn';
import {MenuBar} from './MenuBar';

//==========================================================
// <T>界面菜单按键。</T>
//
//  hParent<TD>
//  hPanel<DIV>
// ┌-------------------------------------------------------------┐
// │ hForm<TABLE>                                                │
// │┌--------------┬---------------┬---------------┐         │
// ││hIconPanel<TD>│hSpacePanel<TD>│hLabelPanel<TD>│hLine<TR>│
// ││hIcon<IMG>    │               │               │         │
// │└--------------┴---------------┴---------------┘         │
// └-------------------------------------------------------------┘
//
// @face
// @author maocy
// @history 150121
//==========================================================
export class MenuButton extends AbstractMenuButtn {
   // @property
   public icon;
   public iconDisable;
   public hotkey;
   public _disabled: boolean;
   // o._action = MO.Class.register(o, new MO.APtyString('_action'));
   // //..........................................................
   // // @attribute
   // o._listenersClick = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   //..........................................................
   // @html
   public _hParent;
   public _hForm;
   public _hLine;
   public _hIconPanel;
   public _hIcon;
   public _hSpacePanel;
   public _hLabelPanel;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createDiv(this.styleName('Normal'));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @param context 参数集合
   //==========================================================
   public onBuild(context:RenderContext) {
      super.onBuild(context);
      // 设置面板
      var hPanel = this._hPanel;
      this.attachEvent(hPanel, EventEnum.MouseDown, this.onMouseDown);
      this.attachEvent(hPanel, EventEnum.MouseUp, this.onMouseUp);
      // 建立表单
      var hForm = this._hForm = context.appendTable(hPanel);
      var hLine = this._hLine = context.appendTableRow(hForm);
      // 建立图标
      if (this.icon) {
         var hc = this._hIconPanel = context.appendTableCell(hLine, this.styleName('IconPanel'));
         this._hIcon = context.appendIcon(hc, null, this.icon);
      }
      // 建立分割
      if (this.icon && this.label) {
         this._hSpacePanel = context.appendTableCell(hLine, this.styleName('SpacePanel'));
      }
      // 建立标签
      if (this.label) {
         var hLabelPanel = this._hLabelPanel = context.appendTableCell(hLine, this.styleName('LabelPanel'));
         hLabelPanel.noWrap = true;
         // 设置标签
         this.setLabel(this.label);
      }
      // 建立热键
      if (this.hotkey) {
         //MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
      }
      // 建立提示
      if (this.hint) {
         this.setHint(this.hint);
      }
   }

   //==========================================================
   // <T>鼠标进入处理。</T>
   //
   // @param event 事件
   //==========================================================
   public onEnter(p) {
      if (!this._disabled) {
         this._hPanel.className = this.styleName('Hover');
      }
   }

   //==========================================================
   // <T>鼠标离开处理。</T>
   //
   // @param event 事件
   //==========================================================
   public onLeave() {
      if (!this._disabled) {
         this._hPanel.className = this.styleName('Normal');
      }
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @param event 事件
   //==========================================================
   public onMouseDown() {
      if (!this._disabled) {
         this._hPanel.className = this.styleName('Press');
         this.click();
      }
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @param event 事件
   //==========================================================
   public onMouseUp() {
      if (!this._disabled) {
         this._hPanel.className = this.styleName('Hover');
      }
   }

   //==========================================================
   // <T>设置图标。</T>
   //
   // @param icon 图标
   //==========================================================
   public setIcon(icon) {
      this.icon = icon;
      if (this._hIcon) {
         this._hIcon.src = this.renderContext.iconPath(icon);
      }
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @param label 标签
   //==========================================================
   public setLabel(label) {
      var text = StringUtil.nvl(label);
      this.label = text;
      HtmlUtil.textSet(this._hLabelPanel, text);
   }

   //==========================================================
   // <T>设置提示。</T>
   //
   // @param hint 提示
   //==========================================================
   public setHint(hint) {
      this.hint = hint;
      var text = StringUtil.nvl(hint);
      if (this.hint) {
         if (this.hotkey) {
            text += ' [' + this.hotkey + ']';
         }
      }
      this._hPanel.title = text;
   }

   //==========================================================
   // <T>设置控件的可操作和禁止。</T>
   //
   // @param value 是否可操作
   //==========================================================
   public setEnable(value: boolean) {
      super.setEnable(value);
      // 允许处理
      var context = this.renderContext;
      if (value) {
         this._hPanel.className = this.styleName('Button');
         if (this.iconDisable && this.icon) {
            this._hIcon.src = context.iconPath(this.icon);
         }
      } else {
         this._hPanel.className = this.styleName('Disable');
         if (this.iconDisable) {
            this._hIcon.src = context.iconPath(this.iconDisable);
         }
      }
   }

   //==========================================================
   // <T>点击处理。</T>
   //
   // @param event 事件
   //==========================================================
   public click() {
      if (!this._disabled) {
         // MO.Console.find(MO.FDuiFocusConsole).blur();
         // MO.Logger.debug(this, 'Menu button click. (label={1})', this._label);
         // // 执行监听信息
         // var event = new MO.SClickEvent(this);
         // this.processClickListener(event);
         // event.dispose();
         // // 执行脚本
         // if (this._action) {
         //    eval(this._action);
         // }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      // this._hForm = MO.Window.Html.free(this._hForm);
      // this._hLine = MO.Window.Html.free(this._hLine);
      // this._hIconPanel = MO.Window.Html.free(this._hIconPanel);
      // this._hIcon = MO.Window.Html.free(this._hIcon);
      // this._hSpacePanel = MO.Window.Html.free(this._hSpacePanel);
      // this._hLabelPanel = MO.Window.Html.free(this._hLabelPanel);
      // 父处理
      super.dispose();
   }
}