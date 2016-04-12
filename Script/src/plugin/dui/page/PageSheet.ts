import {Listeners} from './runtime/common/lang/Listeners';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {RenderContext} from './RenderContext';
import {Layout} from './form/Layout';
import {PageControl} from './PageControl';

//==========================================================
// <T>多页控件的页控件。</T>
//
//  hPanel<TD>
// ┌--------------------------------------------------------┐
// │                                        hTitlePanel<TD> │
// │┌------------┬------------------------┬------------┐│
// ││hTopL<TD>   │hTop<TD>                │hTopR<TD>   ││
// │├------------┼------------------------┼------------┤│
// ││            │┌--------------------┐│            ││
// ││hLeft<TD>   ││hButton<DIV>        ││hRight<TD>  ││
// ││            │└--------------------┘│            ││
// │├------------┼------------------------┼------------┤│
// ││hBottomL<TD>│hBottom<TD>             │hBottomR<TD>││
// │└------------┴------------------------┴------------┘│
// └--------------------------------------------------------┘
//  hDataPanel<TR>
// ┌--------------------------------------------------------┐
// │hContainer<DIV>                                         │
// └--------------------------------------------------------┘
//
// @class
// @author maocy
// @history 150202
//==========================================================
export class PageSheet extends Layout {
   // 图标
   public _icon;
   //    //..........................................................
   //    // @attribtue
   //    o._top               = 0;
   public pageControl: PageControl;
   public index;
   public _selected: boolean = false;
   //    o._hasBuilded        = false;
   //..........................................................
   // @listener
   public selectListeners: Listeners;
   //..........................................................
   // Html
   public _hPanel;
   public _hButtonPanel;
   public _hForm;
   public _hTopL;
   public _hTop;
   public _hTopR;
   public _hLeft;
   public _hButton;
   public _hIcon;
   public _hText;
   public _hBottomL;
   public _hBottom;
   public _hBottomR;
   public _hRight;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.selectListeners = new Listeners(this);
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = this._hContainer = context.createDiv(this.styleName('Panel'));
      hPanel.style.width = '100%';
      hPanel.style.height = '100%';
      var hForm = this._hPanelForm = context.appendTable(hPanel);
      hForm.style.width = '100%';
      hForm.style.height = '100%';
   }

   //==========================================================
   // <T>按键获得热点处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   public onButtonEnter(event) {
      if (!this._selected) {
         this._hButton.className = this.styleName('ButtonHover');
      }
   }

   //==========================================================
   // <T>按键失去热点处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   public onButtonLeave(event) {
      if (!this._selected) {
         this._hButton.className = this.styleName('Button');
      }
   }

   //==========================================================
   // <T>头部区域鼠标落下处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   public onHeadMouseDown(event) {
      var pageControl = this.parent as PageControl;
      pageControl.select(this);
   }

   //==========================================================
   // <T>改变大小处理。</T>
   //
   // @param event 事件信息
   //==========================================================
   public oeResize(event: DispatchEvent) {
      if (event.isAfter()) {
         var hPanel = this._hPanel;
         var hParent = hPanel.parentElement;
         hPanel.style.width = hParent.offsetWidth + 'px';
         hPanel.style.height = hParent.offsetHeight + 'px';
      }
   }

   //==========================================================
   // <T>内部选中处理。</T>
   //
   // @param flag 选中标志
   //==========================================================
   public innerSelect(flag: boolean) {
      var pageControl = this.parent as PageControl;
      // if(flag && !this._statusBuild){
      //    this.buildChildren();
      //    this._hasBuilded = true;
      // }
      var first = (this.index == 0);
      var prior = (pageControl._activeSheet.index - 1 == this.index);
      // Select
      if (this._selected != flag) {
         if (flag) {
            // this.lsnsSelect.process();
         }
         this._selected = flag;
      }
      // 设置样式
      this._hButton.className = flag ? this.styleName('ButtonSelect') : this.styleName('Button');
      this._hTop.className = flag ? this.styleName('TopSelect') : this.styleName('Top');
      this._hLeft.className = flag ? this.styleName('LeftSelect') : (first ? this.styleName('Right') : this.styleName('Left'));
      this._hBottomL.className = flag ? this.styleName('BottomSelect') : this.styleName('Bottom');
      this._hBottom.className = flag ? this.styleName('BottomSelect') : this.styleName('Bottom');
      this._hBottomR.className = flag ? this.styleName('BottomSelect') : this.styleName('Bottom');
      this._hRight.className = flag ? this.styleName('RightSelect') : (prior ? this.styleName('RightPrior') : this.styleName('Right'));
      // 设置表单可见性
      HtmlUtil.visibleSet(this._hForm, flag);
   }

   //==========================================================
   // <T>选中处理。</T>
   //
   // @param flag 选中标志
   //==========================================================
   public select(flag: boolean) {
      this.innerSelect(flag);
      if (flag) {
         //this.psRefresh();
         //this.psResize();
      }
   }

   //==========================================================
   // <T>设置可见处理。</T>
   //
   // @method
   // @param flag:Boolean 可见标志
   //==========================================================
   public setVisible(flag: boolean) {
      HtmlUtil.visibleSet(this._hPanel, flag);
   }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiPageSheet_dispose = function FDuiPageSheet_dispose(){
   //    var o = this;
   //    o._hButton = MO.Window.Html.free(o._hButton);
   //    o._hTop = MO.Window.Html.free(o._hTop);
   //    o._hLeft = MO.Window.Html.free(o._hLeft);
   //    o._hBottomL = MO.Window.Html.free(o._hBottomL);
   //    o._hBottom = MO.Window.Html.free(o._hBottom);
   //    o._hBottomR = MO.Window.Html.free(o._hBottomR);
   //    o._hRight = MO.Window.Html.free(o._hRight);
   //    // 父处理
   //    o.__base.FDuiLayout.dispose.call(o);
   // }
}
