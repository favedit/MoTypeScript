import {RenderContext} from '../RenderContext';
import {Container} from '../Container';

//==========================================================
// <T>纵向布局控件。</T>
//
//  hPanel <TABLE>
// ┌------------------------------------┐
// │Control-1                           │
// ├------------------------------------┤
// │Control-2                           │
// ├------------------------------------┤
// │Control-3                           │
// └------------------------------------┘
//
// @class
// @author maocy
// @version 150420
//==========================================================
export class LayoutVertical extends Container {
   // 底板元素
   public _hPanel: HTMLTableElement;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createTable(this.styleName('Panel'));
   }

   //==========================================================
   // <T>追加一个控件容器。</T>
   //
   // @method
   // @return control:FControl 控件
   //==========================================================
   public appendChild(control) {
      var context = this.renderContext;
      // 追加子控件
      var hCell = context.appendTableRowCell(this._hPanel);
      hCell.appendChild(control._hPanel);
      // 设置高度
      var height = control.size().height;
      if (height) {
         hCell.style.height = height + 'px';
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}
