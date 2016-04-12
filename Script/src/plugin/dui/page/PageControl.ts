import {Dictionary} from './runtime/common/lang/Dictionary';
import {EventEnum} from './runtime/ui/EventEnum';
import {SizeEnum} from './runtime/ui/SizeEnum';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {RenderContext} from './RenderContext';
import {Component} from './Component';
import {Control} from './Control';
import {Container} from './Container';
import {PageSheet} from './PageSheet';

//==========================================================
// <T>多页控件。</T>
//
//  hPanel<Table>
// ┌--------------------------------------------------------┐
// │                                        hTitlePanel<TD> │
// │ hTitleForm<TABLE>                                      │
// │┌----------------------------------------------------┐│
// ││hTop<TR>                                            ││
// │├----------------------------------------------------┤│
// ││hLine<TR>                                           ││
// │├----------------------------------------------------┤│
// ││hBottom<TR>                                         ││
// │└----------------------------------------------------┘│
// ├--------------------------------------------------------┤
// │                                         hDataPanel<TD> │
// │ hDataForm<TABLE>                                       │
// │┌----------------------------------------------------┐│m
// │└----------------------------------------------------┘│
// └--------------------------------------------------------┘
//
// @class
// @author maocy
// @history 150202
//==========================================================
export class PageControl extends Container {
   // @attribute
   public _sheets: Dictionary<PageSheet>;
   public _activeSheet: PageSheet;
   //    o._esize = MO.EUiSize.Both;
   //..........................................................
   // @html
   public hTitleForm;
   public _hFirst;
   public _hFirstTop;
   public _hFirstBottom;
   public _hLast;
   public _hLastTop;
   public _hLastBottom;
   public _hTop;
   public _hLine;
   public _hBottom;
   public _hSheets;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.sizeCd = SizeEnum.Horizontal;
      this._sheets = new Dictionary<PageSheet>();
   }

   //==========================================================
   // <T>根据名称获得页面。</T>
   //
   // @param name 名称
   // @return 页面
   //==========================================================
   public sheet(name) {
      return this._sheets.get(name);
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   // <P>默认为DIV页面元素。</P>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = context.createTable(this.styleName('Panel'));
      hPanel.width = '100%';
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @param context 参数集合
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 获得底板
      var hPanel = this._hPanel;
      // 建立标题区
      var hc = context.appendTableRowCell(hPanel, this.styleName('TitlePanel'));
      var hf = this.hTitleForm = context.appendTable(hc, this.styleName('TitleForm'));
      hf.width = '100%';
      // 创建标题列
      var hr = this._hTop = context.appendTableRow(hf);
      hr.height = 1;
      this._hLine = context.appendTableRow(hf);
      var hr = this._hBottom = context.appendTableRow(hf);
      hr.height = 1;
      // 建立标题区左边第一列
      var hc = this._hFirstTop = context.appendTableCell(this._hTop);
      hc.width = '8px';
      //RBuilder.appendEmpty(hc);
      this._hFirst = context.appendTableCell(this._hLine);
      var hbc = this._hFirstBottom = context.appendTableCell(this._hBottom);
      hbc.className = this.styleName('Bottom', PageSheet);
      // 建立分隔区
      //var hc = context.appendTableRowCell(h);
      //hc.height = 2;
      // 建立标题区右边第一列
      var hc = this._hLastTop = context.appendTableCell(this._hTop);
      //hc.className = o.styleName('Top', PageSheet);
      //RBuilder.appendEmpty(hc);
      this._hLast = context.appendTableCell(this._hLine);
      var hc = this._hLastBottom = context.appendTableCell(this._hBottom);
      hc.className = this.styleName('Bottom', PageSheet);
   }

   //==========================================================
   // <T>改变大小处理。</T>
   //
   // @param event 事件信息
   //==========================================================
   public oeResize(event: DispatchEvent) {
      if (event.isAfter()) {
         // var hNodeBody = this._hNodeBody;
         // var hNodePanel = this._hNodePanel;
         // hNodePanel.style.width = hNodeBody.offsetWidth + 'px';
         // hNodePanel.style.height = hNodeBody.offsetHeight + 'px';
      }
   }

   // //==========================================================
   // // <T>刷新处理。</T>
   // //
   // // @method
   // // @param event:TEventProcess 事件处理
   // //==========================================================
   // MO.FDuiPageControl_oeRefresh = function FDuiPageControl_oeRefresh(event) {
   //    var o = this;
   //    var r = o.__base.FDuiContainer.oeRefresh.call(o, event);
   //    if (event.isBefore()) {
   //       // Select first
   //       if (o._sheets.count()) {
   //          /*for(var n=0; n<o._sheets.count; n++){
   //             var event = o._sheets.value(n);
   //             event.processBuildChildren();
   //             event.hasBuilded = true;
   //          }*/
   //          if (o._activeSheet) {
   //             o._activeSheet.oeRefresh(e);
   //          } else {
   //             var s = o._activeSheet = o._sheets.value(0);
   //             if (s) {
   //                s.innerSelect(true);
   //             }
   //          }
   //       }
   //    }
   //    return r;
   // }

   //==========================================================
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      var context = this.renderContext;
      // 追加子页面
      if (control instanceof PageSheet) {
         var pageSheet = control as PageSheet;
         var ci = this._hLast.cellIndex;
         // 追加标题顶边线
         var hc = pageSheet._hTopL = context.appendTableCell(this._hTop, null, ci);
         hc.width = '1px';
         hc.className = pageSheet.styleName('Top');
         var hc = pageSheet._hTop = context.appendTableCell(this._hTop, null, ci + 1);
         hc.className = pageSheet.styleName('Top');
         var hc = pageSheet._hTopR = context.appendTableCell(this._hTop, null, ci + 2);
         hc.width = '1px';
         hc.className = pageSheet.styleName('Top');
         // 建立左边线
         var hc = pageSheet._hLeft = context.appendTableCell(this._hLine, null, ci);
         hc.width = '1px';
         hc.className = pageSheet.styleName('Left');
         //RBuilder.appendEmpty(hc);
         // 建立按键
         var hc = pageSheet._hButtonPanel = context.appendTableCell(this._hLine, null, ci + 1);
         pageSheet.attachEvent(hc, EventEnum.Enter, pageSheet.onButtonEnter);
         pageSheet.attachEvent(hc, EventEnum.Leave, pageSheet.onButtonLeave);
         pageSheet.attachEvent(hc, EventEnum.MouseDown, pageSheet.onHeadMouseDown);
         hc.width = '1px';
         var hb = pageSheet._hButton = context.appendDiv(hc, pageSheet.styleName('Button'));
         // 建立按键图标
         if (pageSheet._icon) {
            pageSheet._hIcon = context.appendIcon(hb, null, pageSheet._icon);
         }
         // 建立按键标签
         if (pageSheet.label) {
            pageSheet._hText = context.appendSpan(hb, pageSheet.styleName('ButtonText'));
            pageSheet._hText.innerText = ' ' + pageSheet.label;
         }
         // 建立右边线
         var hc = pageSheet._hRight = context.appendTableCell(this._hLine, null, ci + 2);
         hc.width = '1px';
         hc.className = pageSheet.styleName('Right')
         //RBuilder.appendEmpty(hc);
         // 建立标题底边线
         var hc = pageSheet._hBottomL = context.appendTableCell(this._hBottom, null, ci);
         hc.width = '1px';
         hc.className = pageSheet.styleName('Bottom');
         var hc = pageSheet._hBottom = context.appendTableCell(this._hBottom, null, ci + 1);
         hc.className = pageSheet.styleName('Bottom');
         var hc = pageSheet._hBottomR = context.appendTableCell(this._hBottom, null, ci + 2);
         hc.width = '1px';
         hc.className = pageSheet.styleName('Bottom');
         //..........................................................
         // 追加数据信息
         var hr = context.appendTableRow(this._hPanel);
         if (pageSheet.index) {
            hr.style.display = 'none';
         }
         var hc = context.appendTableCell(hr);
         pageSheet._hForm = hr;
         hc.style.verticalAlign = 'top';
         hc.appendChild(pageSheet._hPanel);
      }
   }

   //==========================================================
   // <T>移除一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public removeDisplay(control: Control) {
      super.removeDisplay(control);
   }

   //==========================================================
   // <T>选中活动页面。</T>
   //
   // @param sheet 页面
   //==========================================================
   public select(sheet) {
      this._activeSheet = sheet;
      // 取消其他页选中
      var sheets = this._sheets;
      var count = sheets.count();
      for (var i = 0; i < count; i++) {
         var findSheet = sheets.at(i);
         if (findSheet != sheet) {
            findSheet.select(false);
         }
      }
      // 选中当前页
      sheet.select(true);
   }

   //==========================================================
   // <T>根据索引选中页面。</T>
   //
   // @param index 索引
   //==========================================================
   public selectByIndex(index) {
      var sheet = this._sheets.value(index);
      if (sheet) {
         this.select(sheet);
      }
   }

   //==========================================================
   // <T>将子控件放入自己的哈希表中</T>
   //
   // @param component 组件对象
   //==========================================================
   public push(component: Component) {
      // 增加处理
      if (component instanceof PageSheet) {
         var sheets = this._sheets;
         component.pageControl = this;
         component.index = sheets.count();
         sheets.set(component.name, component);
      }
      // 父处理
      super.push(component);
   }

   //==========================================================
   // <T>构建处理。</T>
   //==========================================================
   public builded() {
      super.builded();
      // 选中第一个
      this.selectByIndex(0);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      super.dispose();
   }
}