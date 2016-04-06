import {RenderContext} from './RenderContext';
import {Layout} from './Layout';

//==========================================================
// <T>面板控件。</T>
//
// @author maocy
// @version 150123
//==========================================================
export class Panel extends Layout {
   //    // @style
   //    o._sizeCd = MO.EUiSize.Horizontal;
   //    o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   //    o._styleLabel = MO.Class.register(o, new MO.AStyle('_styleLabel', 'Label'));
   //    o._styleBody = MO.Class.register(o, new MO.AStyle('_styleBody', 'Body'));
   //    //..........................................................
   //    // @html
   public _imagePlus = 'control.panel.plus';
   public _imageMinus = 'control.panel.minus';
   public _hImage: HTMLImageElement;
   public _hBody: HTMLDivElement;
   //    o._statusBody = true;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = context.createDiv(this.styleName('Panel'));
      // 创建名称栏
      var hTable = context.appendTable(hPanel, this.styleName('Label'));
      //this.attachEvent(hTable, 'onTitleClick');
      hTable.width = '100%';
      var hLine = context.appendTableRow(hTable);
      hLine.vAlign = 'middle';
      var hCell = context.appendTableCell(hLine);
      hCell.width = '20px';
      this._hImage = context.appendIcon(hCell, null, this._imageMinus);
      var hrt = context.appendTableCell(hLine);
      hrt.innerHTML = this.label;
      //var hl = MO.Window.Builder.appendDiv(h, o.styleName('Label'))
      //hl.innerHTML = o._label;
      // 创建内容栏
      var hBody = this._hBody = context.appendDiv(hPanel, this.styleName('Body'))
      this._hPanelForm = context.appendTable(hBody, this.styleName('Form'));
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @return HtmlTag 页面元素
   //==========================================================
   public onTitleClick(event) {
      // var status = !this._statusBody;
      // this._statusBody = status;
      // this._hImage.src = MO.Window.Resource.iconPath(status ? this._imageMinus : this._imagePlus);
      // MO.Window.Html.displaySet(this._hBody, status);
   }
}