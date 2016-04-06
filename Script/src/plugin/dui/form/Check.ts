import {EventEnum} from './runtime/ui/EventEnum';
import {RenderContext} from './RenderContext';
import {EditControl} from './EditControl';

//==========================================================
// <T>复选框。</T>
//
// @class
// @author maocy
// @version 150216
//==========================================================
export class Check extends EditControl {
   //    // @attribute
   //    o._optionValueStyle = false;
   //    // @attribute
   //    o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // 输入框
   public _hInput: HTMLInputElement;
   //    //..........................................................
   //    // @event
   //    o.onBuildEditValue = MO.FDuiCheck_onBuildEditValue;
   //    o.onInputClick = MO.Class.register(o, new MO.AEventClick('onInputClick'), MO.FDuiCheck_onInputClick);

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiCheck_construct = function FDuiCheck_construct() {
   //    var o = this;
   //    // 父处理
   //    o.__base.FDuiEditControl.construct.call(o);
   //    // 设置属性
   //    o._editSize.set(60, 20);
   // }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
      var o = this;
      // 建立编辑控件
      var hInput = o._hInput = context.appendCheck(o._hValuePanel);
      hInput.style.cursor = 'hand';
      o.attachEvent(hInput, EventEnum.Click, this.onInputClick);
   }

   //==========================================================
   // <T>鼠标单击事件。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   public onInputClick(sender, event) {
      this.refreshValue();
   }

   // //==========================================================
   // // <T>获得数据。</T>
   // //
   // // @method
   // // @return String 数据
   // //==========================================================
   // MO.FDuiCheck_get = function FDuiCheck_get() {
   //    var o = this;
   //    var value = o._hInput.checked;
   //    return value;
   // }

   // //==========================================================
   // // <T>设置数据。</T>
   // //
   // // @method
   // // @param value:String 数据
   // //==========================================================
   // MO.FDuiCheck_set = function FDuiCheck_set(value) {
   //    var o = this;
   //    var dataValue = MO.Lang.Boolean.parse(value);
   //    // 设置数据
   //    o._dataValue = dataValue;
   //    // 设置显示
   //    o._hInput.checked = dataValue;
   //    // 设置修改状态
   //    o.changeSet(false);
   // }

   // //==========================================================
   // // <T>获得文本内容。</T>
   // //
   // // @method
   // // @return String 显示内容
   // //==========================================================
   // MO.FDuiCheck_text = function FDuiCheck_text() {
   //    var o = this;
   //    var value = this.get();
   //    var text = MO.Lang.Boolean.toString(value, o._valueTrue, o._valueFalse);
   //    return text;
   // }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   public refreshValue() {
      // 内容改变通知
      //this.processDataChangedListener(this);
   }

   // //==========================================================
   // // <T>根据当前状态刷新样式。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiCheck_refreshStyle = function FDuiCheck_refreshStyle() {
   //    var o = this;
   //    o.__base.FDuiEditControl.refreshStyle.call(o);
   //    // 设置编辑样式
   //    o._hInput.readOnly = !o._statusValueEdit;
   // }

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiCheck_dispose = function FDuiCheck_dispose() {
   //    var o = this
   //    // 释放属性
   //    o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   //    // 父处理
   //    o.__base.FDuiEditControl.dispose.call(o);
   // }
}