import {Listeners} from './runtime/common/lang/Listeners';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from './RenderContext';
import {Control} from './Control';
import {Container} from './Container';
import {AbstractMenuButtn} from './AbstractMenuButtn';
import {MenuButton} from './MenuButton';

//==========================================================
// <T>界面菜单栏。</T>
//
//  hPanel<TABLE>
// ┌-----------------┬-----------------┬-----------------┬-----------------┐
// │hButtonPanel<TD> │hButtonPanel<TD> │hButtonPanel<TD> │...              │hLine<TR>
// │(Button1)        │(Button2)        │(Button3)        │                 │
// └-----------------┴-----------------┴-----------------┴-----------------┘
//
// @author maocy
// @history 150121
//==========================================================
export class MenuBar extends Container {
   //    // @property EUiMerge 合并枚举
   //    o._mergeCd = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   //..........................................................
   // @html
   public _hLine: HTMLTableRowElement;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = context.createTable(this.styleName('Panel'));
      this._hLine = context.appendTableRow(hPanel);
   }

   //==========================================================
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      super.appendDisplay(control);
      // 按键处理
      var context = this.renderContext;
      if (control instanceof AbstractMenuButtn) {
         var button = control as MenuButton;
         var hLine = this._hLine;
         // 建立按键
         var hCell = context.appendTableCell(hLine, this.styleName('ButtonPanel'));
         button._hParentLine = hLine;
         control.setParentPanel(hCell);
      }
   }

   //==========================================================
   // <T>移除一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public removeDisplay(control: Control) {
      // 按键处理
      if (control instanceof AbstractMenuButtn) {
         var button = control as MenuButton;
         var hParent = button._hParent;
         var hParentLine = button._hParentLine;
         hParentLine.removeChild(hParent);
         button._hParentLine = null;
         button._hParent = null;
      }
      // 父处理
      super.removeDisplay(control);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      //this._hLine = MO.Window.Html.free(o._hLine);
      super.dispose();
   }
}