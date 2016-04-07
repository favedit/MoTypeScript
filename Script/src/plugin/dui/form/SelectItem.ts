import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {BooleanUtil} from './runtime/common/lang/BooleanUtil';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {Property} from './runtime/common/reflect/Property';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {RenderContext} from './RenderContext';
import {Control} from './Control';

//==========================================================
// <T>Select下拉列表中每个选项的控件</T>
// <P>支持控件多选</P>
//
//  hPanel(TR)
// ┌--------------┬---------------------------------┬----------------┐
// │hIconPanel<TD>│hLabelPanel<TD>                  │hNotePanel<TD>  │
// │hIcon<IMG>    │                                 │                │
// └--------------┴---------------------------------┴----------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
export class SelectItem extends Control {
   // 选中
   @Property('checked', DataTypeEnum.Boolean)
   public checked: boolean;
   // 图标
   @Property('icon', DataTypeEnum.String)
   public icon: string;
   // 数据内容
   @Property('data_value', DataTypeEnum.String)
   public dataValue: string;
   // 备注
   @Property('note', DataTypeEnum.String)
   public note: string;
   //    o._listenersClick = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   // 面板
   public _hIconPanel;
   public _hIcon;
   public _hLabelPanel;
   public _hNotePanel;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createTableRow(this.styleName("Normal"));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @param context 参数集合
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 设置面板
      var hPanel = this._hPanel;
      this.attachEvent(hPanel, EventEnum.MouseDown, this.onMouseDown);
      // 创建图标
      var hIconPanel = this._hIconPanel = context.appendTableCell(hPanel, this.styleName("Icon"));
      hIconPanel.width = '18px';
      hIconPanel.align = 'center';
      //if(o._icon){
      //}
      // 创建文本
      var hIconPanel = this._hLabelPanel = context.appendTableCell(hPanel, this.styleName("Label"));
      if (this.label) {
         hIconPanel.innerHTML = this.label;
      } else {
         hIconPanel.innerHTML = '&nbsp;';
      }
      // 创建备注
      this._hNotePanel = context.appendTableCell(hPanel, this.styleName("Note"));
   }

   //==========================================================
   // <T>响应鼠标进入事件</T>
   //
   // @method
   //==========================================================
   public onEnter() {
      //super.onEnter();
      this._hPanel.className = BooleanUtil.parse(this.checked) ? this.styleName('Select') : this.styleName('Hover');
   }

   //==========================================================
   // <T>响应鼠标离开事件</T>
   //
   // @method
   //==========================================================
   public onLeave() {
      this._hPanel.className = BooleanUtil.parse(this.checked) ? this.styleName('Select') : this.styleName('Normal');
      //super.onLeave();
   }

   //==========================================================
   // <T>响应鼠标单击事件</T>
   //
   // @method
   //==========================================================
   public onMouseDown() {
      var o = this;
      //o.processClickListener(o);
      /*var o = this;
      o._checked = RBool.isTrue(o._checked) ? EBool.False : EBool.True;
      RBool.isTrue(o._checked) ? o.setChecked(true) : o.setChecked(false);
      var p = o.parent;
      p.hEdit._value = o._label;
      p.editStatus = EEditStatus.Ok;
      p.selectItem = o;
      p.inEdit = false;
      p.blur();*/
   }

   //==========================================================
   // <T>设置选中状态。</T>
   //
   // @method
   // @param value:Boolean 内容
   //==========================================================
   public setChecked(value) {
      this.checked = value;
      if (this._hIcon) {
         this._hIcon.style.display = value ? 'block' : 'none';
      } else {
         this._hIconPanel.innerHTML = value ? 'O' : '';
      }
      this._hPanel.className = value ? this.styleName('Select') : this.styleName('Normal');
   }

   //==========================================================
   // <T>设置数据值</T>
   //
   // @method
   //==========================================================
   public set(icon, label, value, note) {
      var context = this.renderContext;
      this.icon = StringUtil.nvl(icon);
      if (!StringUtil.isEmpty(this.icon)) {
         //this._hIcon = context.appendIcon(this._hIconPanel, this.styleIcon(this._icon));
      }
      this.label = StringUtil.nvl(label);
      //this._value = StringUtil.nvl(value);
      this.note = StringUtil.nvl(note);
      this._hLabelPanel.innerText = this.label;
      this._hNotePanel.innerText = this.note;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放面板
      this._hIconPanel = HtmlUtil.dispose(this._hIconPanel);
      this._hLabelPanel = HtmlUtil.dispose(this._hLabelPanel);
      this._hNotePanel = HtmlUtil.dispose(this._hNotePanel);
      // 父处理
      super.dispose();
   }
}