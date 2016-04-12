import {Listeners} from './runtime/common/lang/Listeners';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from './RenderContext';
import {AbstractMenuButtn} from './AbstractMenuButtn';
import {MenuBar} from './MenuBar';

//==========================================================
// <T>菜单分割按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
export class MenuButtonSplit extends AbstractMenuButtn {

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @param context 参数集合
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 设置样式
      var hPanel = this._hPanel;
      if (this.parent instanceof MenuBar) {
         hPanel.className = this.styleName('PanelVertical');
      } else {
         hPanel.className = this.styleName('PanelHorizontal');
      }
   }

}
