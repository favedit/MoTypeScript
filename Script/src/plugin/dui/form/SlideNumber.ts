import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {FloatUtil} from './runtime/common/lang/FloatUtil';
import {Property} from './runtime/common/reflect/Property';
import {EventEnum} from './runtime/ui/EventEnum';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
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
   // 输入宽度
   @Property('input_width', DataTypeEnum.String)
   public inputWidth: string;
   // 输入高度
   @Property('input_height', DataTypeEnum.String)
   public inputHeight: string;
   // 最小值
   @Property('value_min', DataTypeEnum.Float32)
   public valueMin: number;
   // 最大值
   @Property('value_max', DataTypeEnum.Float32)
   public valueMax: number;
   // 值精度
   @Property('value_precision', DataTypeEnum.Float32)
   public valuePrecision: number;
   // 编辑长度
   @Property('edit_length', DataTypeEnum.Int32)
   public _editLength;
   // 数据内容
   protected _innerOriginValue;
   protected _innerDataValue;
   protected _slide: SlideBlock;
   // 页面元素
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
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.valuePrecision = 3;
   }

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
      this.onBuildEditChange(context);
      //..........................................................
      // 建立滑动栏
      var hsp = this._hSlidePanel = context.appendTableCell(hValueLine, this.styleName('SlidePanel'));
      var slide = this._slide = new SlideBlock();
      slide.control = this;
      slide.hPanel = hsp;
      slide.setRange(this.valueMin, this.valueMax);
      slide.onSlideChange = this.onSlideChange;
      slide.build(context);
      //..........................................................
      // 建立输入栏
      var hInputPanel = this._hInputPanel = context.appendTableCell(hValueLine);
      var hInput = this._hInput = context.appendEdit(hInputPanel, this.styleName('Input'));
      // this.attachEvent(hInput, EventEnum.KeyPress.this.onInputKeyPress);
      // this.attachEvent(hInput, EventEnum.KeyDown, this.onInputEdit);
      // this.attachEvent(hInput, EventEnum.Change, this.onInputChange);
      // 设置大小
      HtmlUtil.setSize(hInputPanel, this.inputWidth, this.inputHeight);
      // 设置可以输入的最大长度
      if (this._editLength) {
         hInput.maxLength = this._editLength;
      }
      //..........................................................
      // 建立调整栏
      var hap = this._hAdjustPanel = context.appendTableCell(hValueLine);
      hap.style.borderLeft = '1px solid #666666';
      hap.width = '12px';
      var hAdjustForm = this.hAdjustForm = context.appendTable(hap, this.styleName('AdjustForm'));
      // 建立上按键
      var hCell = context.appendTableRowCell(hAdjustForm);
      hCell.className = this.styleName('UpPanel');
      var hIcon = this._hUpIcon = context.appendIcon(hCell, null, 'control.number.up');
      hIcon.align = 'center';
      //this.attachEvent(hIcon, EventEnum.MouseDown, this.onUpMouseDown);
      // 建立下按键
      var hCell = context.appendTableRowCell(hAdjustForm);
      hCell.className = this.styleName('DownPanel');
      var hIcon = this._hDownIcon = context.appendIcon(hCell, null, 'control.number.down');
      //this.attachEvent(hIcon, EventEnum.MouseDown, this.onDownMouseDown);
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
   // @param value 内容
   //==========================================================
   public onSlideChange(p) {
      // 设置输入内容
      this.setInputValue(p);
      // 刷新数据
      this.refreshValue();
   }

   //==========================================================
   // <T>编辑控件中键盘按下处理。 </T>
   //
   // @param event 事件对象
   //==========================================================
   public onInputKeyPress(event) {
      var keyCode = event.keyCode;
      // 检查输入字符是否为浮点数，否则给清除输入内容
      // if (!RKeyboard.isFloatKey(keyCode)) {
      //    event.cancel();
      // }
   }

   //==========================================================
   // <T>编辑控件中数据修改处理。 </T>
   //
   // @param event 事件对象
   //==========================================================
   public onInputEdit(event) {
      // 设置滑动栏
      var value = this._hInput.value;
      this._slide.set(value);
      // 刷新数据
      this.refreshValue();
   }

   //==========================================================
   // <T>编辑控件完成处理。 </T>
   //
   // @param event 事件对象
   //==========================================================
   public onInputChange(event) {
      // 设置数据内容
      var value = this._hInput.value;
      this._slide.set(value);
      this.setInputValue(value);
      // 刷新数据
      this.refreshValue();
   }

   //==========================================================
   // <T>设置输入数据。</T>
   //
   // @param value 数据
   //==========================================================
   public setInputValue(value) {
      // 设置显示
      var data = FloatUtil.parse(value);
      if (isNaN(data)) {
         return;
      }
      data = FloatUtil.toRange(data, this.valueMin, this.valueMax);
      this._hInput.value = FloatUtil.format(data, 0, null, 2, null);
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @return 数据
   //==========================================================
   public get() {
      var value = FloatUtil.parse(this._hInput.value);
      return FloatUtil.toRange(value, this.valueMin, this.valueMax);
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @param value 数据
   //==========================================================
   public set(value) {
      // 获得内容
      var data = StringUtil.nvl(value, '0');
      this._innerOriginValue = data;
      this._innerDataValue = data;
      // 设置显示
      this._slide.set(data);
      this.setInputValue(data);
      // 设置修改状态
      this.changeSet(false);
   }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   public refreshValue() {
      // 内容改变通知
      // this.processDataChangedListener(this);
   }
}