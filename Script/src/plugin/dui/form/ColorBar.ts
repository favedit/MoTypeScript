import {RenderContext} from '../RenderContext';

//==========================================================
// <T>颜色编辑框。</T>
//
//  hPanel<TABLE>
// ┌--------------------┬----------------------------------------------------------------┬-------------------┐
// │ hColorPanel<TD>    │ hSlidePanel<TD>                                                │ hInputPanel<TD>   │
// │┌----------------┐│┌---------------┬---------------┬---------------┐           │┌---------------┐│
// ││                │││hSlideRowUL<TD>│hSlideRowUM<TD>│hSlideRowUR<TD>│hSlideRowUp││               ││
// ││                ││├---------------┼---------------┼---------------┤           ││               ││
// ││hColorImage<IMG>│││hSlideRowML<TD>│hSlideRowMM<TD>│hSlideRowMR<TD>│hSlideRow  ││hInput<INPUT>  ││
// ││                ││├---------------┼---------------┼---------------┤           ││               ││
// ││                │││hSlideRowBL<TD>│hSlideRowBM<TD>│hSlideRowBR<TD>│hSlideDown ││               ││
// │└----------------┘│└---------------┴---------------┴---------------┘           │└---------------┘│
// └--------------------┴----------------------------------------------------------------┴-------------------┘
//
// @class
// @author maocy
// @version 150201
//==========================================================
export class ColorBar {

   // @attribute
   public _draging = false;
   // @attribute
   public control = null;
   public typeCd = null;
   // @attribute
   public minValue = 0;
   public maxValue = 1;
   //..........................................................
   // @html
   public hPanel = null;
   // @html
   public hColorPanel = null;
   public hColorImage = null;
   // @html
   public hSlidePanel = null;
   public hSlideForm = null;
   public hSlideRowUL = null;
   public hSlideRowUM = null;
   public hSlideRowUR = null;
   public hSlideRowML = null;
   public hSlideRowMM = null;
   public hSlideRowMR = null;
   public hSlideRowBL = null;
   public hSlideRowBM = null;
   public hSlideRowBR = null;

   public hSlideRowUp = null;
   public hSlideRow = null;
   public hSlideRowDown = null;
   // @html
   public hInputPanel = null;
   public hInput = null;

   // //==========================================================
   // // <T>鼠标落下处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.SDuiColorBar_onMouseDown = function SDuiColorBar_onMouseDown(p) {
   //    var o = this;
   //    var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   //    o._draging = true;
   //    MO.Window.setOptionSelect(false);
   //    o.changeSlide(x);
   // }

   // //==========================================================
   // // <T>鼠标移动处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.SDuiColorBar_onMouseMove = function SDuiColorBar_onMouseMove(p) {
   //    var o = this;
   //    if (o._draging) {
   //       var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   //       o.changeSlide(x);
   //    }
   // }

   // //==========================================================
   // // <T>鼠标抬起处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.SDuiColorBar_onMouseUp = function SDuiColorBar_onMouseUp(p) {
   //    var o = this;
   //    o._draging = false;
   //    MO.Window.setOptionSelect(true);
   // }

   //==========================================================
   // <T>构件处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件
   //==========================================================
   public build(content: RenderContext) {
      var control = this.control;
      var hPanel = this.hPanel;
      var hRow = content.appendTableRow(hPanel);
      //..........................................................
      // 创建颜色块
      var hc = this.hColorPanel = content.appendTableCell(hRow);
      hc.width = '13px';
      hc.style.padding = '2px';
      this.hColorImage = content.appendIcon(hc, null, 'n', 11, 11);
      //..........................................................
      // 创建滑动块
      var hc = this.hSlidePanel = content.appendTableCell(hRow);
      hc.style.padding = '2px';
      hc.vAlign = 'middle';
      var hf = this.hSlideForm = content.appendTable(hc);
      //hf.__pbar = o;
      hf.width = '100%';
      hf.style.height = '9px';
      hf.style.cursor = 'pointer';
      // 建立上区域
      var hl = this.hSlideRowUp = content.appendTableRow(hf);
      hl.style.height = '3px';
      this.hSlideRowUL = content.appendTableCell(hl);
      var hc = this.hSlideRowUM = content.appendTableCell(hl);
      hc.width = '2px';
      hc.bgColor = '#EEEEEE';
      var hc = this.hSlideRowUR = content.appendTableCell(hl);
      // 建立中区域
      var hl = this.hSlideRow = content.appendTableRow(hf);
      hl.style.height = '3px';
      var hc = this.hSlideRowML = content.appendTableCell(hl);
      hc.bgColor = '#999999';
      var hc = this.hSlideRowMM = content.appendTableCell(hl);
      hc.width = '2px';
      hc.bgColor = '#EEEEEE';
      var hc = this.hSlideRowMR = content.appendTableCell(hl);
      hc.bgColor = '#999999';
      // 建立下区域
      var hl = this.hSlideRowDown = content.appendTableRow(hf);
      hl.style.height = '3px';
      this.hSlideRowBL = content.appendTableCell(hl);
      var hc = this.hSlideRowBM = content.appendTableCell(hl);
      hc.width = '2px';
      hc.bgColor = '#EEEEEE';
      this.hSlideRowBR = content.appendTableCell(hl);
      //..........................................................
      // 创建输入块
      var hc = this.hInputPanel = content.appendTableCell(hRow, this.control.styleName('InputPanel'));
      hc.width = '36px';
      var he = this.hInput = content.appendEdit(hc, this.control.styleName('Input'));
      //he._pbar = o;
      //control.attachEvent('onInputKeyPress', he, control.onInputKeyPress);
      //control.attachEvent('onInputEdit', he, control.onInputEdit);
      //control.attachEvent('onInputChange', he, control.onInputChange);
   }

   // //==========================================================
   // // <T>设置范围。</T>
   // //
   // // @method
   // // @param i:min:Number 最小值
   // // @param a:max:Number 最大值
   // //==========================================================
   // MO.SDuiColorBar_setRange = function SDuiColorBar_setRange(i, a) {
   //    var o = this;
   //    if (i != null) {
   //       o.minValue = i;
   //    }
   //    if (a != null) {
   //       o.maxValue = a;
   //    }
   // }

   // //==========================================================
   // // <T>设置颜色内容。</T>
   // //
   // // @method
   // // @param p:value:Number 内容 (0~255)
   // //==========================================================
   // MO.SDuiColorBar_setColorValue = function SDuiColorBar_setColorValue(p) {
   //    var o = this;
   //    // 计算内容
   //    var v = MO.Lang.Hex.format(p, 2);
   //    var c = null;
   //    switch (o.typeCd) {
   //       case 'red':
   //          c = v + '0000';
   //          break;
   //       case 'green':
   //          c = '00' + v + '00';
   //          break;
   //       case 'blue':
   //          c = '0000' + v;
   //          break;
   //       default:
   //          throw new MO.TError(o, 'Invalid type.');
   //    }
   //    // 设置颜色
   //    o.hColorImage.style.backgroundColor = '#' + c;
   // }

   // //==========================================================
   // // <T>设置滑动内容。</T>
   // //
   // // @method
   // // @param p:value:Number 内容
   // //==========================================================
   // MO.SDuiColorBar_setSlideValue = function SDuiColorBar_setSlideValue(p) {
   //    var o = this;
   //    var w = o.hSlideForm.offsetWidth;
   //    if (w > 0) {
   //       var v = p / o.maxValue * w;
   //       o.hSlideRowML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   //    }
   // }

   // //==========================================================
   // // <T>设置输入内容。</T>
   // //
   // // @method
   // // @param p:value:Number 内容
   // //==========================================================
   // MO.SDuiColorBar_setInputValue = function SDuiColorBar_setInputValue(p) {
   //    this.hInput.value = p;
   // }

   // //==========================================================
   // // <T>获得转换。</T>
   // //
   // // @method
   // // @param p:value:Number 内容
   // //==========================================================
   // MO.SDuiColorBar_convertGet = function SDuiColorBar_convertGet(p) {
   //    return p;
   // }

   // //==========================================================
   // // <T>获得内容。</T>
   // //
   // // @method
   // // @return Number 内容
   // //==========================================================
   // MO.SDuiColorBar_get = function SDuiColorBar_get() {
   //    var o = this;
   //    return o.convertGet(o.hInput.value);
   // }

   // //==========================================================
   // // <T>设置转换。</T>
   // //
   // // @method
   // // @param p:value:Number 内容
   // //==========================================================
   // MO.SDuiColorBar_convertSet = function SDuiColorBar_convertSet(p) {
   //    return p;
   // }

   // //==========================================================
   // // <T>设置内容。</T>
   // //
   // // @method
   // // @param p:value:Number 内容
   // //==========================================================
   // MO.SDuiColorBar_set = function SDuiColorBar_set(p) {
   //    var o = this;
   //    // 转换内容
   //    var v = o.convertSet(p);
   //    // 设置颜色
   //    o.setColorValue(v);
   //    // 设置宽度
   //    o.setSlideValue(v);
   //    // 设置颜色
   //    o.setInputValue(v);
   // }

   // //==========================================================
   // // <T>滑动转换。</T>
   // //
   // // @method
   // // @param p:value:Number 内容
   // //==========================================================
   // MO.SDuiColorBar_convertSlide = function SDuiColorBar_convertSlide(p) {
   //    return p;
   // }

   // //==========================================================
   // // <T>滑动变更处理。</T>
   // //
   // // @method
   // // @param p:value:Number 内容
   // //==========================================================
   // MO.SDuiColorBar_changeSlide = function SDuiColorBar_changeSlide(p) {
   //    var o = this;
   //    // 获得数值
   //    var w = o.hSlideForm.offsetWidth - 3;
   //    var v = o.convertSlide(p / w);
   //    // 设置内容
   //    o.set(v);
   //    // 刷新内容
   //    o.control.refreshValue();
   // }

   // //==========================================================
   // // <T>输入变更中处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.SDuiColorBar_changeInputEdit = function SDuiColorBar_changeInputEdit() {
   //    var o = this;
   //    // 获得数值
   //    var v = o.convertGet(o.hInput.value);
   //    // 设置颜色
   //    o.setColorValue(v);
   //    // 设置宽度
   //    o.setSlideValue(v);
   //    // 刷新内容
   //    o.control.refreshValue();
   // }

   // //==========================================================
   // // <T>输入变更完成处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.SDuiColorBar_changeInputChange = function SDuiColorBar_changeInputChange() {
   //    var o = this;
   //    // 获得数值
   //    var v = o.convertGet(o.hInput.value);
   //    o.set(v);
   //    // 刷新内容
   //    o.control.refreshValue();
   // }
}