import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Fatal} from './runtime/common/lang/Fatal';
import {HexUtil} from './runtime/common/lang/HexUtil';
import {IntegerUtil} from './runtime/common/lang/IntegerUtil';
import {Property} from './runtime/common/reflect/Property';
import {Color4} from './runtime/common/math/Color4';
import {RenderContext} from '../RenderContext';
import {EditControl} from './EditControl';
import {ColorPowerChannel} from './ColorPowerChannel';
import {ColorPowerRate} from './ColorPowerRate';

//==========================================================
// <T>颜色强度编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┬--------------------------------┐
// │hChangePanel<TD> │ hColorPanel<TD>      │ hChannelPanel<TD>              │hValueLine<TR>
// │hChangeIcon<IMG> │┌------------------┐│┌----------------------------┐│
// │                 ││hColorImage<IMG>  │││hChannelForm<TABLE>         ││
// │                 │└------------------┘│└----------------------------┘│
// └-----------------┴----------------------┴--------------------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
export class ColorPower extends EditControl {
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
   // @attribute
   protected _innerOriginValue;
   protected _innerDataValue;
   // @attribute
   protected _barRed = null;
   protected _barGreen = null;
   protected _barBlue = null;
   protected _barPower = null;
   // 页面元素
   protected _hValueForm;
   protected _hValueLine;
   protected _hColorPanel;
   protected _hColorImage;
   protected _hChannelPanel;
   protected _hChannelForm;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._innerOriginValue = new Color4();
      this._innerDataValue = new Color4();
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
      var h = this._hValuePanel;
      h.className = this.styleName('ValuePanel');
      var hf = this._hValueForm = context.appendTable(h);
      hf.width = '100%';
      var hl = this._hValueLine = context.appendTableRow(hf);
      //..........................................................
      // 建立改变栏
      this._hChangePanel = context.appendTableCell(hl);
      this.onBuildEditChange(context);
      //..........................................................
      // 建立颜色栏
      var hcp = this._hColorPanel = context.appendTableCell(hl);
      hcp.width = '16px';
      hcp.style.padding = '2px';
      this._hColorImage = context.appendIcon(hcp, null, 'n', 14, 65);
      //..........................................................
      var hcp = this._hChannelPanel = context.appendTableCell(hl);
      var hcf = this._hChannelForm = context.appendTable(hcp, null, 0, 1, 0);
      //hcf.__linker = this;
      hcf.width = '100%';
      // 建立红色输入栏
      var channel = this._barRed = new ColorPowerChannel();
      channel.control = this;
      channel.typeCd = 'red';
      channel.hPanel = hcf;
      channel.build(context);
      // 建立绿色输入栏
      var channel = this._barGreen = new ColorPowerChannel();
      channel.control = this;
      channel.typeCd = 'green';
      channel.hPanel = hcf;
      channel.build(context);
      // 建立蓝色输入栏
      var channel = this._barBlue = new ColorPowerChannel();
      channel.control = this;
      channel.typeCd = 'blue';
      channel.hPanel = hcf;
      channel.build(context);
      // 建立强度输入栏
      var channel = this._barPower = new ColorPowerRate();
      channel.control = this;
      channel.typeCd = 'power';
      channel.setRange(this.valueMin, this.valueMax);
      channel.hPanel = hcf;
      channel.build(context);
   }

   // //==========================================================
   // // <T>滑动栏鼠标落下处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiColorPower_onMouseCaptureStart = function FDuiColorPower_onMouseCaptureStart(p) {
   //    var o = this;
   //    var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   //    if (b) {
   //       b.onMouseDown(p);
   //    }
   // }

   // //==========================================================
   // // <T>滑动栏鼠标移动处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiColorPower_onMouseCapture = function FDuiColorPower_onMouseCapture(p) {
   //    var o = this;
   //    var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   //    if (b) {
   //       b.onMouseMove(p);
   //    }
   // }

   // //==========================================================
   // // <T>滑动栏鼠标抬起处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiColorPower_onMouseCaptureStop = function FDuiColorPower_onMouseCaptureStop(p) {
   //    var o = this;
   //    var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   //    if (b) {
   //       b.onMouseUp(p);
   //    }
   // }

   // //==========================================================
   // // <T>编辑控件中键盘按下处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiColorPower_onInputKeyPress = function FDuiColorPower_onInputKeyPress(p) {
   //    var o = this;
   //    var c = p.keyCode;
   //    // 检查输入字符是否控制按键
   //    if (MO.RKeyboard.isControlKey(c)) {
   //       return;
   //    }
   //    // 检查输入字符是否为浮点数，否则给清除输入内容
   //    if (!MO.RKeyboard.isFloatKey(c)) {
   //       p.cancel();
   //    }
   // }

   // //==========================================================
   // // <T>编辑控件中处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiColorPower_onInputEdit = function FDuiColorPower_onInputEdit(p) {
   //    var o = this;
   //    var hs = p.hSender;
   //    var b = hs._pbar;
   //    if (b) {
   //       b.changeInputEdit();
   //    }
   //    // 内容改变通知
   //    o.processDataChangedListener(o);
   // }

   // //==========================================================
   // // <T>编辑控件完成处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiColorPower_onInputChange = function FDuiColorPower_onInputChange(p) {
   //    var o = this;
   //    var hs = p.hSender;
   //    var b = hs._pbar;
   //    if (b) {
   //       b.changeInputChange();
   //    }
   //    // 内容改变通知
   //    o.processDataChangedListener(o);
   // }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @return 数据
   //==========================================================
   public get() {
      var value = this._innerDataValue;
      // 获得数据
      value.red = this._barRed.get();
      value.green = this._barGreen.get();
      value.blue = this._barBlue.get();
      value.alpha = this._barPower.get();
      return value;
   }

   //==========================================================
   // <T>设置显示数据。</T>
   //==========================================================
   public setDisplayColor() {
      var value = this._innerDataValue;
      // 设置颜色
      var va = value.alpha;
      var vr = HexUtil.format(IntegerUtil.toRange(parseInt((value.red * va * 255) as any), 0, 255), 2);
      var vg = HexUtil.format(IntegerUtil.toRange(parseInt((value.green * va * 255) as any), 0, 255), 2);
      var vb = HexUtil.format(IntegerUtil.toRange(parseInt((value.blue * va * 255) as any), 0, 255), 2);
      this._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @param value 数据
   //==========================================================
   public set(value) {
      // 设置显示
      if (value instanceof Color4) {
         this._innerOriginValue.assign(value);
         this._innerDataValue.assign(value);
      } else {
         throw new Fatal(this, 'Invalid value format.');
      }
      // 设置颜色
      this.setDisplayColor();
      // 设置数据
      var data = this._innerDataValue;
      this._barRed.set(data.red);
      this._barGreen.set(data.green);
      this._barBlue.set(data.blue);
      this._barPower.set(data.alpha);
      // 设置修改状态
      this.changeSet(false);
   }

   // //==========================================================
   // // <T>设置显示数据。</T>
   // //
   // // @method
   // // @param p:value:String 数据
   // //==========================================================
   // MO.FDuiColorPower_setDisplay = function FDuiColorPower_setDisplay() {
   //    var o = this;
   //    // 设置颜色
   //    o.setDisplayColor();
   //    // 设置内容
   //    var v = o._innerDataValue;
   //    o._barRed.set(v.red);
   //    o._barGreen.set(v.green);
   //    o._barBlue.set(v.blue);
   //    o._barPower.set(v.alpha);
   // }

   // //==========================================================
   // // <T>刷新数据。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiColorPower_refreshValue = function FDuiColorPower_refreshValue() {
   //    var o = this;
   //    o.get();
   //    o.setDisplayColor();
   //    // 内容改变通知
   //    o.processDataChangedListener(o);
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      super.dispose();
   }
}