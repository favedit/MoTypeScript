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
   // @param i:min:Number 最小值
   // @param a:max:Number 最大值
   //==========================================================
   public setRange(i, a) {
      if (i != null) {
         this.minValue = FloatUtil.parse(i);
      }
      if (a != null) {
         this.maxValue = FloatUtil.parse(a);
      }
      this.range = this.maxValue - this.minValue;
   }

   //==========================================================
   // <T>设置滑动内容。</T>
   //
   // @param p:value:Number 内容
   //==========================================================
   public setSlideValue(p) {
      var w = this.hSlideForm.offsetWidth;
      if (w > 0) {
         var v = (p - this.minValue) / this.range * w;
         this.hSlideML.width = IntegerUtil.toRange(v, 1, w - 1);
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return Number 内容
   //==========================================================
   public get(p) {
      var w = this.hSlideForm.offsetWidth - 3;
      var v = (p / w) * this.range + this.minValue;
      return v;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param p:value:Number 内容
   //==========================================================
   public set(p) {
      // 设置宽度
      this.setSlideValue(p);
   }

   //==========================================================
   // <T>滑动变更处理。</T>
   //
   // @method
   // @param p:value:Number 内容
   //==========================================================
   public changeSlide(p) {
      var control = this.control;
      // 设置滑动
      var w = this.hSlideForm.offsetWidth - 3;
      this.hSlideML.width = IntegerUtil.toRange(p, 1, w - 1);
      // 获得数值
      var v = (p / w) * this.range + this.minValue;
      v = FloatUtil.toRange(v, this.minValue, this.maxValue);
      // 设置内容
      this.onSlideChange.call(control, v);
   }
}