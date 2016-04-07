import {EventEnum} from './runtime/ui/EventEnum';
import {SizeEnum} from './runtime/ui/SizeEnum';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from './RenderContext';
import {Layout} from './Layout';

//==========================================================
// <T>面板控件。</T>
//
// @author maocy
// @version 160407
//==========================================================
export class Panel extends Layout {
   // 展开图标
   protected _imagePlus = 'control.panel.plus';
   // 关闭图标
   protected _imageMinus = 'control.panel.minus';
   // 显示内容状态
   protected _statusBody: boolean;
   // 图像元素
   protected _hImage: HTMLImageElement;
   // 内容元素
   protected _hBody: HTMLDivElement;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.sizeCd = SizeEnum.Horizontal;
      this._statusBody = true;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = context.createDiv(this.styleName('Panel'));
      // 创建名称栏
      var hTable = context.appendTable(hPanel, this.styleName('Label'));
      this.attachEvent(hTable, EventEnum.Click, this.onTitleClick);
      hTable.width = '100%';
      var hLine = context.appendTableRow(hTable);
      hLine.vAlign = 'middle';
      var hCell = context.appendTableCell(hLine);
      hCell.width = '20px';
      this._hImage = context.appendIcon(hCell, null, this._imageMinus);
      // 创建名称
      var hLabel = context.appendTableCell(hLine);
      hLabel.innerHTML = this.label;
      //..........................................................
      // 创建内容栏
      var hBody = this._hBody = context.appendDiv(hPanel, this.styleName('Body'))
      this._hPanelForm = context.appendTable(hBody, this.styleName('Form'));
   }

   //==========================================================
   // <T>标题单击事件。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onTitleClick(sender, event) {
      var context = this.renderContext;
      var status = !this._statusBody;
      this._hImage.src = context.iconPath(status ? this._imageMinus : this._imagePlus);
      HtmlUtil.visibleSet(this._hBody, status);
      this._statusBody = status;
   }
}