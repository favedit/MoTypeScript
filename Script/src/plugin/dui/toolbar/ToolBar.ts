import {AlignEnum} from './runtime/ui/AlignEnum';
import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {RenderContext} from '../RenderContext';
import {Container} from '../Container';
import {ToolButton} from './ToolButton';

//==========================================================
// <T>界面工具栏。</T>
//
//  hPanel<TABLE>
// ┌-----------------┬-----------------┬-----------------┬-----------------┐
// │hButtonPanel<TD> │hButtonPanel<TD> │hButtonPanel<TD> │...              │hLine<TR>
// │(Button1)        │(Button2)        │(Button3)        │                 │
// └-----------------┴-----------------┴-----------------┴-----------------┘
//
// @author maocy
// @history 150121
//==========================================================
export class ToolBar extends Container {
   //    //..........................................................
   //    // @property EUiAlign 对齐枚举
   //    o._alignCd = MO.Class.register(o, new MO.APtyEnum('_alignCd', null, MO.EUiAlign, MO.EUiAlign.Left));
   //    // @property EUiDirection 方向枚举
   public directionCd: DirectionEnum;
   //    // @property EUiMerge 合并枚举
   //    o._mergeCd = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   //    //..........................................................
   //    // @style
   //    o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //    o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   //    //..........................................................
   // 横向容器
   public _hLine: HTMLTableRowElement;
   //    //..........................................................
   //    // @event
   //    o.onBuildPanel = MO.FDuiToolBar_onBuildPanel;
   //    o.onEnter = MO.Method.empty;
   //    o.onLeave = MO.Method.empty;
   //    //..........................................................
   //    // @method
   //    o.appendChild = MO.FDuiToolBar_appendChild;
   //    o.removeChild = MO.FDuiToolBar_removeChild;
   //    // @method
   //    o.dispose = MO.FDuiToolBar_dispose;
   //    return o;
   // }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.directionCd = DirectionEnum.Horizontal;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createTable(this.styleName('Panel'));
   }

   //==========================================================
   // <T>追加一个子控件。</T>
   //
   // @param control 子控件
   //==========================================================
   public appendChild(control) {
      var context = this.context;
      // 父处理
      super.appendChild(control);
      // 按键处理
      if (control instanceof ToolButton) {
         var hPanel = this._hPanel;
         var hLine = this._hLine;
         // 横向排布
         if (this.directionCd == DirectionEnum.Horizontal) {
            if (!hLine) {
               hLine = this._hLine = context.appendTableRow(hPanel);
            }
         }
         // 纵向排布
         if (this.directionCd == DirectionEnum.Vertical) {
            hLine = context.appendTableRow(hPanel);
         }
         // 建立按键
         var hCell = context.appendTableCell(hLine, this.styleName('ButtonPanel'));
         //hc._hParentLine = hl;
         control._hPanelCell = hCell;
         control.setPanel(hCell);
      }
   }

   // //==========================================================
   // // <T>移除一个子控件。</T>
   // //
   // // @method
   // // @param p:control:FDuiControl 子控件
   // //==========================================================
   // MO.FDuiToolBar_removeChild = function FDuiToolBar_removeChild(p) {
   //    var o = this;
   //    // 按键处理
   //    if (MO.Class.isClass(p, MO.MUiToolButton)) {
   //       var hp = p._hParent;
   //       var hl = p._hParentLine;
   //       hl.removeChild(hp);
   //       p._hParent = null;
   //       p._hParentLine = null;
   //    }
   //    // 父处理
   //    o.__base.FDuiContainer.removeChild.call(o, p);
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiToolBar_dispose = function FDuiToolBar_dispose() {
   //    var o = this;
   //    o._hLine = MO.Window.Html.free(o._hLine);
   //    o.__base.FDuiContainer.dispose.call(o);
   // }
}