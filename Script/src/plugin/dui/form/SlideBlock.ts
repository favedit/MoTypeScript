import {IntegerUtil} from './runtime/common/lang/IntegerUtil';
import {FloatUtil} from './runtime/common/lang/FloatUtil';
import {RenderContext} from '../RenderContext';

//==========================================================
// <T>滑动框。</T>
//
//  hPanel<HtmlTag>
// ┌-----------------------------------------------------------------┐
// │ hSlidePanel<TD>                                                 │
// │┌---------------┬--------------------┬---------------┐       │
// ││hSlideUL<TD>   │hSlideUM<TD>        │hSlideUR<TD>   │hSlideU│
// │├---------------┼--------------------┼---------------┤       │
// ││hSlideML<TD>   │hSlideMM<TD>        │hSlideMR<TD>   │hSlideM│
// │├---------------┼--------------------┼---------------┤       │
// ││hSlideBL<TD>   │hSlideBM<TD>        │hSlideBR<TD>   │hSlideB│
// │└---------------┴--------------------┴---------------┘       │
// └-----------------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
export class SlideBlock {
   public control;
   // @attribute
   public _draging = false;
   // @attribute
   public stepValue = 1;
   public minValue = 0;
   public maxValue = 100;
   public range = 100;
   // @html
   public hPanel;
   // @html
   public hSlidePanel;
   public hSlideForm;
   public hSlideU;
   public hSlideUL;
   public hSlideUM;
   public hSlideUR;
   public hSlideM;
   public hSlideML;
   public hSlideMM;
   public hSlideMR;
   public hSlideB;
   public hSlideBL;
   public hSlideBM;
   public hSlideBR;

   public onSlideChange;

   // //==========================================================
   // // <T>鼠标落下处理。 </T>
   // //
   // // @param p:event:SEvent 事件对象
   // //==========================================================
   // MO.SDuiSlide_onMouseDown = function SDuiSlide_onMouseDown(p) {
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
   // MO.SDuiSlide_onMouseMove = function SDuiSlide_onMouseMove(p) {
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
   // MO.SDuiSlide_onMouseUp = function SDuiSlide_onMouseUp(p) {
   //    var o = this;
   //    o._draging = false;
   //    MO.Window.setOptionSelect(true);
   // }

   //==========================================================
   // <T>构件处理。</T>
   //
   // @param context 环境信息
   //==========================================================
   public build(context: RenderContext) {
      var control = this.control;
      //..........................................................
      // 创建滑动块
      var hSlideForm = this.hSlideForm = context.appendTable(this.hPanel);
      //hf.__pcapture = this;
      hSlideForm.width = '100%';
      hSlideForm.style.height = '9px';
      hSlideForm.style.cursor = 'pointer';
      // 建立上区域
      var hl = this.hSlideU = context.appendTableRow(hSlideForm);
      hl.style.height = '3px';
      this.hSlideUL = context.appendTableCell(hl);
      var hc = this.hSlideUM = context.appendTableCell(hl);
      hc.width = '2px';
      hc.bgColor = '#EEEEEE';
      var hc = this.hSlideUR = context.appendTableCell(hl);
      // 建立中区域
      var hl = this.hSlideM = context.appendTableRow(hSlideForm);
      hl.style.height = '3px';
      var hc = this.hSlideML = context.appendTableCell(hl);
      hc.bgColor = '#999999';
      var hc = this.hSlideMM = context.appendTableCell(hl);
      hc.width = '2px';
      hc.bgColor = '#EEEEEE';
      var hc = this.hSlideMR = context.appendTableCell(hl);
      hc.bgColor = '#999999';
      // 建立下区域
      var hl = this.hSlideB = context.appendTableRow(hSlideForm);
      hl.style.height = '3px';
      this.hSlideBL = context.appendTableCell(hl);
      var hc = this.hSlideBM = context.appendTableCell(hl);
      hc.width = '2px';
      hc.bgColor = '#EEEEEE';
      this.hSlideBR = context.appendTableCell(hl);
   }

   //==========================================================
   // <T>设置范围。</T>
   //
   // @param min 最小值
   // @param max 最大值
   //==========================================================
   public setRange(min: number, max: number) {
      if (min != null) {
         this.minValue = FloatUtil.parse(min);
      }
      if (max != null) {
         this.maxValue = FloatUtil.parse(max);
      }
      this.range = this.maxValue - this.minValue;
   }

   //==========================================================
   // <T>设置滑动内容。</T>
   //
   // @param value 内容
   //==========================================================
   public setSlideValue(value) {
      var width = this.hSlideForm.offsetWidth;
      if (width > 0) {
         var offset = (value - this.minValue) / this.range * width;
         this.hSlideML.width = IntegerUtil.toRange(offset, 1, width - 1);
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return 内容
   //==========================================================
   public get(p) {
      var width = this.hSlideForm.offsetWidth - 3;
      var value = (p / width) * this.range + this.minValue;
      return value;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @param value 内容
   //==========================================================
   public set(value) {
      // 设置宽度
      this.setSlideValue(value);
   }

   //==========================================================
   // <T>滑动变更处理。</T>
   //
   // @param value 内容
   //==========================================================
   public changeSlide(value) {
      var control = this.control;
      // 设置滑动
      var width = this.hSlideForm.offsetWidth - 3;
      this.hSlideML.width = IntegerUtil.toRange(value, 1, width - 1);
      // 获得数值
      var v = (value / width) * this.range + this.minValue;
      v = FloatUtil.toRange(v, this.minValue, this.maxValue);
      // 设置内容
      this.onSlideChange.call(control, v);
   }
}