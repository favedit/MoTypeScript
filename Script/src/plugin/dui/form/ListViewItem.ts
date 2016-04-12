import {StringUtil} from './runtime/common/lang/StringUtil';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {Control} from './Control';

//==========================================================
// <T>列表项控件。</T>
//
//  hLine<TR>
// ┌--------------┬-----------------------┐
// │┌----------┐│┌-------------------┐│
// ││hIcon<IMG>│││hLabel<SPAN>       ││
// │└----------┘│└-------------------┘│
// └--------------┴-----------------------┘
//
// @class
// @author maocy
// @history 150224
//==========================================================
export class ListViewItem extends Control {
   //    // @style
   //    o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //    o._styleNormal = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   //    o._styleHover = MO.Class.register(o, new MO.AStyle('_styleHover'));
   //    o._styleSelect = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   //    o._styleForm = MO.Class.register(o, new MO.AStyle('_styleForm'));
   //    o._styleContent = MO.Class.register(o, new MO.AStyle('_styleContent'));
   //    o._styleIconPanel = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   //    o._styleIcon = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   //    o._styleLabel = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   //..........................................................
   // @attribute
   public _checked = false;
   public _contentHeight = 28;
   //..........................................................
   // @html
   protected _hPanel;
   protected _hBorder;
   protected _hForm;
   protected _hContentForm;
   protected _hContentLine;
   protected _hIconPanel;
   protected _hIcon;
   protected _hLabel;
   protected _hLine1;
   protected _hLine2;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      // 建立编辑控件
      this._hPanel = context.createDiv(this.styleName('Panel'));
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 建立控件
      var hPanel = this._hPanel;
      //..........................................................
      // 建立边框
      var hBorder = this._hBorder = context.appendDiv(hPanel, this.styleName('Normal'));
      var hTable = this._hForm = context.appendTable(hBorder, this.styleName('Form'));
      var hLine1 = this._hLine1 = context.appendTableRowCell(hTable)
      var hLine2 = this._hLine2 = context.appendTableRowCell(hTable)
      hLine2.height = this._contentHeight;
      // 建立内容区域
      var hContentForm = this._hContentForm = context.appendTable(hLine2, this.styleName('Content'));
      var hContentLine = this._hContentLine = context.appendTableRow(hContentForm);
      // 建立图标区域
      this._hIconPanel = context.appendTableCell(hContentLine, this.styleName('IconPanel'))
      //this._hIcon = context.appendIcon(this._hIconPanel, this.styleName('Icon'), StringUtil.nvl(this._icon, 'tools.select'));
      //HtmlUtil.displaySet(this._hIcon, false);
      // 建立文本区域
      this._hLabel = context.appendTableCell(hContentLine, this.styleName('Label'));
      if (this.label) {
         this.setLabel(this.label);
      }
      // 关联事件
      //this.attachEvent('onClick', hPanel);
      //this.attachEvent('onDoubleClick', hPanel);
   }

   // //==========================================================
   // // <T>响应鼠标进入事件</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListViewItem_onEnter = function FDuiListViewItem_onEnter() {
   //    var o = this;
   //    o.__base.FDuiControl.onEnter.call(o);
   //    o._hBorder.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   // }

   // //==========================================================
   // // <T>响应鼠标离开事件</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListViewItem_onLeave = function FDuiListViewItem_onLeave() {
   //    var o = this;
   //    o._hBorder.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   //    o.__base.FDuiControl.onLeave.call(o);
   // }

   //==========================================================
   // <T>点击事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   public onClick(event) {
      if (this._checked) {
         //this.parent.doDoubleClickItem(this);
      } else {
         //this.parent.doClickItem(this);
      }
   }

   //==========================================================
   // <T>双击事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   public onDoubleClick(event) {
      //this.parent.doDoubleClickItem(this);
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:value:String 标签内容
   //==========================================================
   public setLabel(label) {
      this.label = label;
      this._hLabel.innerHTML = StringUtil.nvl(label);
   }

   //==========================================================
   // <T>设置选中状态。</T>
   //
   // @method
   // @param checked:Boolean 是否选中
   //==========================================================
   public setChecked(checked) {
      this._checked = checked;
      if (this._hIcon) {
         this._hIcon.style.display = checked ? 'block' : 'none';
      } else {
         this._hIconPanel.innerHTML = checked ? 'O' : '';
      }
      this._hBorder.className = checked ? this.styleName('Select') : this.styleName('Normal');
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this._hPanel = HtmlUtil.dispose(this._hPanel);
      this._hBorder = HtmlUtil.dispose(this._hBorder);
      this._hForm = HtmlUtil.dispose(this._hForm);
      this._hLine1 = HtmlUtil.dispose(this._hLine1);
      this._hLine2 = HtmlUtil.dispose(this._hLine2);
      this._hContentForm = HtmlUtil.dispose(this._hContentForm);
      this._hContentLine = HtmlUtil.dispose(this._hContentLine);
      this._hIconPanel = HtmlUtil.dispose(this._hIconPanel);
      this._hIcon = HtmlUtil.dispose(this._hIcon);
      this._hLabel = HtmlUtil.dispose(this._hLabel);
      super.dispose();
   }
}