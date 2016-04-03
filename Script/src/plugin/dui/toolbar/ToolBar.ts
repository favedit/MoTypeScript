import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {AlignEnum} from './runtime/ui/AlignEnum';
import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {RenderContext} from '../RenderContext';
import {Control} from '../Control';
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
   protected _hPanel: HTMLTableElement;
   protected _hLine: HTMLTableRowElement;
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
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      var context = this.renderContext;
      // 父处理
      // super.appendDisplay(control);
      // 按键处理
      if (control instanceof ToolButton) {
         var toolButton = <ToolButton>control;
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
         toolButton.setParentPanel(hCell);
      }
   }

   //==========================================================
   // <T>移除一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public removeDisplay(control: Control) {
      // 按键处理
      if (control instanceof ToolButton) {
         var toolButton = <ToolButton>control;
         var hParent = toolButton.getPanel(PanelEnum.Parent);
         hParent.parentElement.removeChild(hParent);
         toolButton.setParentPanel(null);
      }
      // 父处理
      super.removeDisplay(control);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._hLine = HtmlUtil.dispose(this._hLine);
      super.dispose();
   }
}
