import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {Container} from '../Container';

//==========================================================
// <T>横向布局控件。</T>
//
//  hPanel<TABLE>
// ┌----------------┬--------------┬--------------------┐
// │Control-1       │Control-2     │Control-3           │hLine<TR>
// └----------------┴--------------┴--------------------┘
//
// @class
// @author maocy
// @version 150420
//==========================================================
export class LayoutHorizontal extends Container {
   // 底板元素
   public _hPanel: HTMLTableElement;
   // 横线元素
   public _hLine: HTMLTableRowElement;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createTable(this.styleName('Panel'));
   }

   //==========================================================
   // <T>创建布局处理。</T>
   //
   // @return event 处理事件
   //==========================================================
   public onBuild(event) {
      super.onBuild(event);
      // 创建横向容器
      var context = this.renderContext;
      this._hLine = context.appendTableRow(this._hPanel);
   }

   //==========================================================
   // <T>追加一个控件容器。</T>
   //
   // @return control 控件
   //==========================================================
   public appendChild(control) {
      var context = this.renderContext;
      // 追加子控件
      var hCell = context.appendTableCell(this._hLine);
      hCell.appendChild(control._hPanel);
      // 设置位置
      var dockCd = control.dockCd;
      if (dockCd == 'left') {
         hCell.align = 'left';
      } else if (dockCd == 'center') {
         hCell.align = 'center';
      } else if (dockCd == 'right') {
         hCell.align = 'right';
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._hLine = HtmlUtil.dispose(this._hLine);
      // 父处理
      super.dispose();
   }
}
