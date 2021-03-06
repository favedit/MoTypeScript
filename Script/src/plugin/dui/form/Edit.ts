import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Property} from './runtime/common/reflect/Property';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {EditControl} from './EditControl';

//==========================================================
// <T>文本编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┐
// │hChangePanel<TD> │ hInputPanel<TD>      │hValueLine<TR>
// │hChangeIcon<IMG> │┌------------------┐│
// │                 ││hInput<INPUT>     ││
// │                 │└------------------┘│
// └-----------------┴----------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
export class Edit extends EditControl {
   // 输入宽度
   @Property('input_width', DataTypeEnum.String)
   public inputWidth: string;
   // 输入高度
   @Property('input_height', DataTypeEnum.String)
   public inputHeight: string;
   // 编辑长度
   @Property('edit_length', DataTypeEnum.Int32)
   public editLength: number;
   // o._unit                 = MO.Class.register(o, [new MO.APtyString('_unit'), new MO.AGetSet('_unit')]);
   // //..........................................................
   // // @attribute
   // o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged'));
   // //..........................................................
   // 内容表单
   public _hValueForm: HTMLTableElement;
   // 输入表单
   public _hInputPanel: HTMLTableCellElement;
   // 输入框
   public _hInput: HTMLInputElement;
   // //..........................................................
   // // @event
   // o.onBuildEditValue      = MO.FDuiEdit_onBuildEditValue;
   // o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiEdit_onInputEdit);

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
      var hValuePanel = this._hValuePanel;
      var hValueForm = this._hValueForm = context.appendTable(hValuePanel);
      var hValueLine = context.appendTableRow(hValueForm);
      HtmlUtil.setSize(hValueForm, this.inputWidth, this.inputHeight);
      //..........................................................
      // 建立改变栏
      //this._hChangePanel = context.appendTableCell(hValueLine);
      //this.onBuildEditChange(event);
      //..........................................................
      // 建立输入栏
      var hInputPanel = this._hInputPanel = context.appendTableCell(hValueLine);
      var hInput = this._hInput = context.appendEdit(hInputPanel);
      //this.attachEvent('onInputEdit', hInput, this.onInputEdit);
      // 设置可以输入的最大长度
      if (this.editLength) {
         hInput.maxLength = this.editLength;
      }
   }

   // //==========================================================
   // // <T>编辑控件中数据修改处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiEdit_onInputEdit = function FDuiEdit_onInputEdit(p) {
   //    var o = this;
   //    // 刷新数据
   //    o.refreshValue();
   // }

   // //==========================================================
   // // <T>格式化显示内容。</T>
   // //
   // // @method
   // // @param value:String 数据
   // // @return 内容
   // //==========================================================
   // MO.FDuiEdit_formatText = function FDuiEdit_formatText(value) {
   //    var o = this;
   //    var result = MO.Lang.String.nvl(value);
   //    //if(ECase.Upper == o.editCase){
   //    //   r = MO.Lang.String.toUpper(r);
   //    //}else if(ECase.Lower == o.editCase){
   //    //   r = MO.Lang.String.toLower(r);
   //    //}
   //    o._dataDisplay = result;
   //    return result;
   // }

   // //==========================================================
   // // <T>格式化数据内容。</T>
   // //
   // // @method
   // // @param value:String 内容
   // // @return 数据
   // //==========================================================
   // MO.FDuiEdit_formatValue = function FDuiEdit_formatValue(value) {
   //    return value;
   // }

   // //==========================================================
   // // <T>获取数据。</T>
   // //
   // // @method
   // // @return String 数据
   // //==========================================================
   // MO.FDuiEdit_get = function FDuiEdit_get() {
   //    var o = this;
   //    var value = o._hInput.value;
   //    return value;
   // }

   // //==========================================================
   // // <T>设置数据。</T>
   // //
   // // @method
   // // @param value:String 数据
   // //==========================================================
   // MO.FDuiEdit_set = function FDuiEdit_set(value) {
   //    var o = this;
   //    // 设置数据
   //    o._dataValue = value;
   //    // 设置文本
   //    var text = MO.Lang.String.nvl(value);
   //    o._hInput.value = text;
   //    // 设置修改状态
   //    o.changeSet(false);
   // }

   // //==========================================================
   // // <T>刷新数据。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEdit_refreshValue = function FDuiEdit_refreshValue() {
   //    var o = this;
   //    // 内容改变通知
   //    o.processDataChangedListener(o);
   // }

   // //==========================================================
   // // <T>根据当前状态刷新样式。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEdit_refreshStyle = function FDuiEdit_refreshStyle() {
   //    var o = this;
   //    o.__base.FDuiEditControl.refreshStyle.call(o);
   //    // 计算样式
   //    var inputStyle = null;
   //    if (o._statusEditable) {
   //       if (o._statusValueHover) {
   //          inputStyle = 'InputHover';
   //       } else {
   //          inputStyle = 'InputNormal';
   //       }
   //    } else {
   //       inputStyle = 'InputReadonly';
   //    }
   //    // 设置样式
   //    var hInput = o._hInput;
   //    hInput.className = o.styleName(inputStyle);
   //    hInput.readOnly = !o._statusEditable;
   // }

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEdit_dispose = function FDuiEdit_dispose() {
   //    var o = this
   //    // 释放属性
   //    o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   //    // 父处理
   //    o.__base.FDuiEditControl.dispose.call(o);
   // }
}
