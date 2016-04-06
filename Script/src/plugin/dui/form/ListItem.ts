import {StringUtil} from './runtime/common/lang/StringUtil';
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
export class ListItem extends Control {
   public icon: string;
   //    //..........................................................
   //    // @style
   //    o._styleNormal = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   //    o._styleHover = MO.Class.register(o, new MO.AStyle('_styleHover'));
   //    o._styleSelect = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   //    o._styleIconPanel = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   //    o._styleIcon = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   //    o._styleLabel = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   //    //..........................................................
   //    // @attribute
   //    o._checked = false;
   //    //..........................................................
   //    // @html
   //    o._hPanel = null;
   public _hIconPanel;
   public _hIcon;
   public _hLabel;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      // 建立编辑控件
      this._hPanel = context.createTableRow(this.styleName('Normal'));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @param context 参数集合
   //==========================================================
   public onBuild(context: RenderContext) {
      // 建立控件
      super.onBuild(context);
      var hPanel = this._hPanel;
      //..........................................................
      // 建立图标区域
      this._hIconPanel = context.appendTableCell(hPanel, this.styleName('IconPanel'))
      if (this.icon) {
         this._hIcon = context.appendIcon(this._hIconPanel, this.styleName('Icon'), this.icon);
      }
      // 建立文本区域
      this._hLabel = context.appendTableCell(hPanel, this.styleName('Label'));
      if (this.label) {
         this.setLabel(this.label);
      }
      // 关联事件
      this.attachEvent('onClick', hPanel);
   }

   // //==========================================================
   // // <T>响应鼠标进入事件</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListItem_onEnter = function FDuiListItem_onEnter() {
   //    var o = this;
   //    o.__base.FDuiControl.onEnter.call(o);
   //    o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   // }

   // //==========================================================
   // // <T>响应鼠标离开事件</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListItem_onLeave = function FDuiListItem_onLeave() {
   //    var o = this;
   //    o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   //    o.__base.FDuiControl.onLeave.call(o);
   // }

   // //==========================================================
   // // <T>点击事件处理。</T>
   // //
   // // @method
   // // @param p:event:SEvent 事件信息
   // //==========================================================
   // MO.FDuiListItem_onClick = function FDuiListItem_onClick(p) {
   //    var o = this;
   //    o._parent.clickItem(o);
   // }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @param value 标签内容
   //==========================================================
   public setLabel(value) {
      this.label = value;
      this._hLabel.innerHTML = StringUtil.nvl(value);
   }

   // //==========================================================
   // // <T>设置选中状态。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListItem_setChecked = function FDuiListItem_setChecked(p) {
   //    var o = this;
   //    o._checked = p;
   //    if (o._hIcon) {
   //       o._hIcon.style.display = p ? 'block' : 'none';
   //    } else {
   //       o._hIconPanel.innerHTML = p ? 'O' : '';
   //    }
   //    o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListItem_dispose = function FDuiListItem_dispose() {
   //    var o = this;
   //    o._hPanel = MO.Window.Html.free(o._hPanel);
   //    o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   //    o._hIcon = MO.Window.Html.free(o._hIcon);
   //    o._hLabel = MO.Window.Html.free(o._hLabel);
   //    o.__base.FDuiControl.dispose.call(o);
   // }
}