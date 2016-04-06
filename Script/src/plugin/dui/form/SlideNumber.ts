import {RenderContext} from '../RenderContext';
import {EditControl} from './EditControl';
import {SlideBlock} from './SlideBlock';

//==========================================================
// <T>数字编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬---------------------------------┬--------------------┐
// │hChangePanel<TD> │ hInputPanel<TD>                 │ hAdjustPanel<TD>   │hValueLine<TR>
// │                 │                                 │ hAdjustForm<TABLE> │
// │hChangeIcon<IMG> │┌-----------------------------┐│┌----------------┐│
// │                 ││                             │││hUpPanel<TD>    ││
// │                 ││                             │││hUpIcon<IMG>    ││
// │                 ││hInput<INPUT>                ││├----------------┤│
// │                 ││                             │││hDownPanel<TD>  ││
// │                 ││                             │││hDownIcon<IMG>  ││
// │                 │└-----------------------------┘│└----------------┘│
// └-----------------┴---------------------------------┴--------------------┘
//
// @class
// @author maocy
// @version 150131
//==========================================================
export class SlideNumber extends EditControl {
   //    //..........................................................
   //    // @property
   //    o._inputSize = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   //    //..........................................................
   //    // @style
   //    o._styleSlidePanel = MO.Class.register(o, new MO.AStyle('_styleSlidePanel'));
   //    o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   //    o._styleInput = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //    o._styleAdjustForm = MO.Class.register(o, new MO.AStyle('_styleAdjustForm'));
   //    o._styleUpPanel = MO.Class.register(o, new MO.AStyle('_styleUpPanel'));
   //    o._styleDownPanel = MO.Class.register(o, new MO.AStyle('_styleDownPanel'));
   //    //..........................................................
   //    // @attribute
   //    o._innerOriginValue = null;
   //    o._innerDataValue = null;
   //    // @attribute
   public _valueMin;
   public _valueMax;
   public _valuePrecision = 3;
   public _editLength;
   protected _slide: SlideBlock;
   //    //..........................................................
   //    // @html
   //    o._hInput = null;
   //    o._iconUp = null;
   //    o._iconDown = null;
   protected _hValueForm;
   protected _hValueLine;
   protected _hChangePanel;
   protected _hSlidePanel;
   protected _hInputPanel;
   protected _hInput;
   protected _hAdjustPanel;
   protected hAdjustForm;
   protected _hUpIcon;
   protected _hDownIcon;

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
      var hp = this._hValuePanel;
      hp.className = this.styleName('ValuePanel');
      var hValueForm = this._hValueForm = context.appendTable(hp);
      //hValueForm.__linker = this;
      hValueForm.width = '100%';
      var hValueLine = this._hValueLine = context.appendTableRow(hValueForm);
      //..........................................................
      // 建立改变栏
      this._hChangePanel = context.appendTableCell(hValueLine);
      //this.onBuildEditChange(context);
      //..........................................................
      // 建立滑动栏
      var hsp = this._hSlidePanel = context.appendTableCell(hValueLine, this.styleName('SlidePanel'));
      var slide = this._slide = new SlideBlock();
      slide.control = this;
      slide.hPanel = hsp;
      slide.setRange(this._valueMin, this._valueMax);
      slide.onSlideChange = this.onSlideChange;
      slide.build(context);
      //..........................................................
      // 建立输入栏
      var hep = this._hInputPanel = context.appendTableCell(hValueLine);
      var he = this._hInput = context.appendEdit(hep, this.styleName('Input'));
      //this.attachEvent('onInputKeyPress', he, this.onInputKeyPress);
      //this.attachEvent('onInputEdit', he, this.onInputEdit);
      //this.attachEvent('onInputChange', he, this.onInputChange);
      // 设置大小
      //HtmlUtil.setSize(hep, this._inputSize);
      // 设置可以输入的最大长度
      if (this._editLength) {
         he.maxLength = this._editLength;
      }
      //..........................................................
      // 建立调整栏
      var hap = this._hAdjustPanel = context.appendTableCell(hValueLine);
      hap.style.borderLeft = '1px solid #666666';
      hap.width = '12px';
      var haf = this.hAdjustForm = context.appendTable(hap, this.styleName('AdjustForm'));
      // 建立上按键
      var hc = context.appendTableRowCell(haf);
      hc.className = this.styleName('UpPanel');
      var hi = this._hUpIcon = context.appendIcon(hc, null, 'control.number.up');
      hi.align = 'center';
      //o.attachEvent('onUpMouseDown', hi);
      // 建立下按键
      var hc = context.appendTableRowCell(haf);
      hc.className = this.styleName('DownPanel');
      var hi = this._hDownIcon = context.appendIcon(hc, null, 'control.number.down');
      //o.attachEvent('onDownMouseDown', hi);
   }

   // //==========================================================
   // // <T>滑动栏鼠标落下处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiSlideNumber_onMouseCaptureStart = function FDuiSlideNumber_onMouseCaptureStart(p) {
   //    var o = this;
   //    var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   //    if (c) {
   //       c.onMouseDown(p);
   //    }
   // }

   // //==========================================================
   // // <T>滑动栏鼠标移动处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiSlideNumber_onMouseCapture = function FDuiSlideNumber_onMouseCapture(p) {
   //    var o = this;
   //    var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   //    if (c) {
   //       c.onMouseMove(p);
   //    }
   // }

   // //==========================================================
   // // <T>滑动栏鼠标抬起处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiSlideNumber_onMouseCaptureStop = function FDuiSlideNumber_onMouseCaptureStop(p) {
   //    var o = this;
   //    var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   //    if (c) {
   //       c.onMouseUp(p);
   //    }
   // }

   //==========================================================
   // <T>滑动栏数据变动处理。 </T>
   //
   // @param p:value:Number 内容
   //==========================================================
   public onSlideChange(p) {
      // 设置输入内容
      //this.setInputValue(p);
      // 刷新数据
      //this.refreshValue();
   }

   // //==========================================================
   // // <T>编辑控件中键盘按下处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiSlideNumber_onInputKeyPress = function FDuiSlideNumber_onInputKeyPress(p) {
   //    var o = this;
   //    var c = p.keyCode;
   //    // 检查输入字符是否为浮点数，否则给清除输入内容
   //    if (!MO.RKeyboard.isFloatKey(c)) {
   //       p.cancel();
   //    }
   // }

   // //==========================================================
   // // <T>编辑控件中数据修改处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiSlideNumber_onInputEdit = function FDuiSlideNumber_onInputEdit(p) {
   //    var o = this;
   //    // 设置滑动栏
   //    var v = o._hInput.value;
   //    o._slide.set(v);
   //    // 刷新数据
   //    o.refreshValue();
   // }

   // //==========================================================
   // // <T>编辑控件完成处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiSlideNumber_onInputChange = function FDuiSlideNumber_onInputChange(p) {
   //    var o = this;
   //    // 设置数据内容
   //    var v = o._hInput.value;
   //    o._slide.set(v);
   //    o.setInputValue(v);
   //    // 刷新数据
   //    o.refreshValue();
   // }

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSlideNumber_construct = function FDuiSlideNumber_construct() {
   //    var o = this;
   //    o.__base.FDuiEditControl.construct.call(o);
   //    o._inputSize = new MO.SSize2(120, 0);
   // }

   // //==========================================================
   // // <T>获得数据。</T>
   // //
   // // @method
   // // @return String 数据
   // //==========================================================
   // MO.FDuiSlideNumber_get = function FDuiSlideNumber_get(p) {
   //    var o = this;
   //    // 获得显示
   //    var v = o._hInput.value;
   //    var r = MO.Lang.Float.parse(v);
   //    return MO.Lang.Float.toRange(r, o._valueMin, o._valueMax);
   // }

   // //==========================================================
   // // <T>设置数据。</T>
   // //
   // // @method
   // // @param p:value:String 数据
   // //==========================================================
   // MO.FDuiSlideNumber_set = function FDuiSlideNumber_set(p) {
   //    var o = this;
   //    o.__base.FDuiEditControl.set.call(o, p);
   //    // 获得内容
   //    var v = MO.Lang.String.nvl(p, '0');
   //    o._innerOriginValue = v;
   //    o._innerDataValue = v;
   //    // 设置显示
   //    o._slide.set(v);
   //    o.setInputValue(v);
   //    // 设置修改状态
   //    o.changeSet(false);
   // }

   // //==========================================================
   // // <T>设置输入数据。</T>
   // //
   // // @method
   // // @param p:value:String 数据
   // //==========================================================
   // MO.FDuiSlideNumber_setInputValue = function FDuiSlideNumber_setInputValue(p) {
   //    var o = this;
   //    // 设置显示
   //    var v = MO.Lang.Float.parse(p);
   //    if (isNaN(v)) {
   //       return;
   //    }
   //    v = MO.Lang.Float.toRange(v, o._valueMin, o._valueMax);
   //    o._dataDisplay = MO.Lang.Float.format(v, 0, null, 2, null);
   //    o._hInput.value = o._dataDisplay;
   // }

   // //==========================================================
   // // <T>刷新数据。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSlideNumber_refreshValue = function FDuiSlideNumber_refreshValue() {
   //    var o = this;
   //    // 内容改变通知
   //    o.processDataChangedListener(o);
   // }
}