import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Listeners} from './runtime/common/lang/Listeners';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {Property} from './runtime/common/reflect/Property';
import {EventEnum} from './runtime/ui/EventEnum';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {ClickEvent} from './runtime/ui/event/ClickEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {Control} from '../Control';
import {Floating} from '../Floating';

//==========================================================
// <T>弹出式菜单。</T>
//
// @class
// @author maocy
// @history 150402
//==========================================================
export class PopupMenu extends Floating {
   //    // @attribute
   //    o._visible        = false;
   //    o._statusVisible  = false;
   //..........................................................
   // @html
   protected _hForm;
   protected _hLineTop;
   protected _hContainerPanel;
   protected _hLineBottom;
   protected _hContainer;
   protected _hLabel;
   protected _hButtonPanel;
   protected _hIcon;
   protected _hText;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createDiv(this.styleName('Panel'));
   }

   //==========================================================
   // <T>建立按键布局。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context) {
      super.onBuild(context);
      var hPanel = this._hPanel;
      // 创建表单
      var hForm = this._hForm = context.appendTable(hPanel, this.styleName('Form'));
      // 创建上边线
      var hLineTop = this._hLineTop = context.appendTableCell(hForm);
      hLineTop.bgColor = '#666666';
      hLineTop.height = '2px';
      // 创建容器
      var hContainerPanel = this._hContainerPanel = context.appendTableCell(hForm);
      // 创建下边线
      var hLineBottom = this._hLineBottom = context.appendTableCell(hForm);
      hLineBottom.bgColor = '#666666';
      hLineBottom.height = '2px';

      //var hd = o._hFormPanel = context.append(hc, 'DIV')
      //hd.style.width = '100%';
      //hd.style.height = '100%';
      var hContainer = this._hContainer = context.appendTable(hContainerPanel, this.styleName('Container'));
      // Insert first
      //var h = o._hLabel = o._hContainer.insertRow().insertCell();
      //h.className = o.styleName('Label');
      //RBuilder.appendEmpty(h);
      // Insert buttom
      //o._hLastRow = o._hContainer.insertRow();
      //var h = o._hLastRow.insertCell();
      //RBuilder.appendEmpty(h, 1, 4);
      //o.setVisible(false);
   }

   // //==========================================================
   // // <T>ʧȥ���㴦����</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiPopupMenu_doBlur = function FDuiPopupMenu_doBlur(){
   //    var o = this;
   //    //if(o._opener){
   //    //   o._opener.onBlur();
   //    //}else{
   //    //   o.hide();
   //    //}
   // }

   // //==========================================================
   // // <T>׷���ӿؼ���</T>
   // //
   // // @method
   // // @param control:FDuiControl �ؼ�
   // //==========================================================
   // MO.FDuiPopupMenu_appendChild = function FDuiPopupMenu_appendChild(control){
   //    var o = this;
   //    var hButtonPanel = context.appendTableRowCell(o._hContainer);
   //    hButtonPanel.className = o.styleName('Button');
   //    hButtonPanel.appendChild(control._hPanel);
   // }

   //==========================================================
   // <T>显示处理。</T>
   //
   // @param visible
   //==========================================================
   public drop(hDropPanel, positionCd, v?: any) {
      var hPanel = this._hPanel;
      var opener = this.opener;
      // 设置可见
      this.setVisible(true);
      // �����ߴ�
      var hOpener = opener._hPanel;
      var openerWidth = hOpener.offsetWidth;
      var openerHeight = hOpener.offsetHeight;
      // �����ߴ�
      var width = hPanel.offsetWidth;
      var height = hPanel.offsetHeight;
      var style = hPanel.style;
      if (width < openerWidth) {
         width = openerWidth;
      }
      if (height > 300) {
         this._hContainerPanel.style.overflowY = 'scroll';
         style.height = height + 'px';
      }
      // ����λ��
      //o.setBounds(r.left, r.bottom);
      style.left = '3px';
      style.top = (openerHeight + 1) + 'px';
      style.width = width + 'px';
      //style.zIndex = MO.RDuiLayer.next();
      //o.focus();
   }

   //==========================================================
   // <T>设置可见性。</T>
   //
   // @param visible 可见性
   //==========================================================
   public setVisible(visible: boolean) {
      var opener = this.opener;
      this._statusVisible = visible;
      var hOpener = opener._hPanelCell;
      var hPanel = this.getPanel(PanelEnum.Container);
      if (visible) {
         hOpener.appendChild(hPanel);
      } else {
         hOpener.removeChild(hPanel);
      }
   }


   // // ------------------------------------------------------------
   // MO.FDuiPopupMenu_testInRange = function FDuiPopupMenu_testInRange(e){
   //    return this == RControl.htmlControl(e.srcElement, FDuiPopupMenu);
   // }

   // // ------------------------------------------------------------
   // MO.FDuiPopupMenu_dispose = function FDuiPopupMenu_dispose(e){
   //    var o = this;
   //    o._hContainer = MO.Window.Html.free(o._hContainer);
   //    o._hPanel = MO.Window.Html.free(o._hPanel);
   //    o._hLabel = MO.Window.Html.free(o._hLabel);
   //    o._hLastRow = MO.Window.Html.free(o._hLastRow);
   //    // ������
   //    o.__base.FDuiContainer.dispose.call(o);
   // }
}