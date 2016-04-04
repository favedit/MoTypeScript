import {ScrollEnum} from './runtime/ui/ScrollEnum';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {Container} from '../Container';

export class FramePage extends Container {

   protected _hPanel: HTMLTableCellElement;

   // //==========================================================
   // // <T>页面。</T>
   // //
   // // @class
   // // @author maocy
   // // @version 150120
   // //==========================================================
   // MO.FDuiFramePage = function FDuiFramePage(o) {
   //    o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //    //..........................................................
   //    // @style
   //    o._styleContainer = MO.Class.register(o, new MO.AStyle('_styleContainer'));
   //    //..........................................................
   //    // @html
   //    o._hContainer = null;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = context.createTableCell(this.styleClass || this.styleName('Panel'));
      //hPanel.vAlign = 'top';
      //hPanel.height = '100%';
      if (this.backColor) {
         hPanel.bgColor = this.backColor;
      }
   }

   //==========================================================
   // <T>创建控件布局。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context) {
      super.onBuild(context);
      // 设置滚动方式
      var hPanel = this._hPanel;
      if (this.scrollCd != ScrollEnum.None) {
         var hContainer = this._hContainer = context.appendDiv(hPanel, this.styleName('Container'));
         HtmlUtil.setStyleScroll(hContainer, this.scrollCd);
      } else {
         this._hContainer = hPanel;
      }
   }

   // //==========================================================
   // // <T>改变当前控件的显示大小。</T>
   // //
   // // @method
   // // @param e:event:TEventProcess 事件处理
   // // @return EEventStatus 处理状态
   // //==========================================================
   // MO.FDuiFramePage_oeResize = function FDuiFramePage_oeResize(p) {
   //    var o = this;
   //    var p = o._parent;
   //    if (p._directionCd == MO.EUiDirection.Horizontal) {
   //       // 横向排布
   //       //var v = o._hPanel.offsetHeight;
   //       //o._hContainer.style.height = v + 'px';
   //    } else if (p._directionCd == MO.EUiDirection.Vertical) {
   //       // 纵向排布
   //    } else {
   //       throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   //    }
   //    return MO.EEventStatus.Continue;
   // }

   // //==========================================================
   // // <T>增加一个控件。</T>
   // //
   // // @method
   // // @param control:FDuiControl 控件
   // //==========================================================
   // MO.FDuiFramePage_appendChild = function FDuiFramePage_appendChild(control) {
   //    var o = this;
   //    if (control._hPanel) {
   //       o._hContainer.appendChild(control._hPanel);
   //    }
   // }

   // //==========================================================
   // // <T>移除一个控件。</T>
   // //
   // // @method
   // // @param control:FDuiControl 控件
   // //==========================================================
   // MO.FDuiFramePage_removeChild = function FDuiFramePage_removeChild(control) {
   //    var o = this;
   //    o._hContainer.removeChild(control._hPanel);
   // }
}