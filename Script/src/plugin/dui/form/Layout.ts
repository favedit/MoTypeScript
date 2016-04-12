import {SetUtil} from './runtime/common/lang/SetUtil';
import {SizeEnum} from './runtime/ui/SizeEnum';
import {DockEnum} from './runtime/ui/DockEnum';
import {LayoutEnum} from './runtime/ui/LayoutEnum';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {Control} from '../Control';
import {Container} from '../Container';
import {RenderContext} from '../RenderContext';

//==========================================================
// <T>布局控件。</T>
//
//  hPanel/hPanelForm <TABLE>
// ┌----------------------------------------------------------┐
// │ hPanelTable<TABLE>                                       │hContainer<TD>
// │┌----------------┬--------------┬--------------------┐│
// ││Control-1       │Control-2     │Control-3           ││
// │└----------------┴--------------┴--------------------┘│
// ├----------------------------------------------------------┤
// │ hPanelTable<TABLE>                                       │
// │┌--------------┐                                        │
// ││Control-4     │                                        │
// │└--------------┘                                        │
// └----------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150122
//==========================================================
export class Layout extends Container {
   // MO.FDuiLayout = function FDuiLayout(o) {
   //    o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //    //..........................................................
   //    // @style
   //    o._styleForm = MO.Class.register(o, new MO.AStyle('_styleForm'));
   //    o._styleControlPanel = MO.Class.register(o, new MO.AStyle('_styleControlPanel'));
   //    //..........................................................
   //    //..........................................................
   //    // @html
   public _hPanelForm: HTMLTableElement;
   protected _hPanelTable;
   //protected _hPanelLine;
   protected _hPanelLast;
   protected _lastSplit;
   //    o._hContainer = null;
   //    // @html
   // }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = this._hPanelForm = context.createTable(this.styleName('Form'), null, 0, 1);
      // 设计模式
      if (this.layoutCd == LayoutEnum.Design) {
         var hRow = context.appendTableRow(hPanel);
         var hCell = context.appendTableCell(hRow);
         this._hContainer = hCell;
      }
   }

   // //==========================================================
   // // <T>设计开始处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiLayout_onDesignBegin = function FDuiLayout_onDesignBegin() {
   //    var o = this;
   //    o.__base.MDesign.onDesignBegin.call(o);
   // }

   // //==========================================================
   // // <T>设计结束处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiLayout_onDesignEnd = function FDuiLayout_onDesignEnd() {
   //    var o = this;
   //    o.__base.MDesign.onDesignEnd.call(o);
   // }

   // //==========================================================
   // // <T>设计处理。</T>
   // //
   // // @method
   // // @param p:event:TEventProcess 事件
   // //==========================================================
   // MO.FDuiLayout_oeDesign = function FDuiLayout_oeDesign(p) {
   //    var o = this;
   //    o.__base.FDuiContainer.oeDesign.call(o, p);
   //    if (p.isAfter()) {
   //       switch (p.layoutCd) {
   //          case MO.EDesign.Move:
   //             break;
   //          case MO.EDesign.Border:
   //             if (event.flag) {
   //                o._hPanel.border = 1;
   //                o._hPanel.style.border = '1 solid red';
   //             } else {
   //                o._hPanel.border = 0;
   //                o._hPanel.style.border = null;
   //             }
   //             break;
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>改变大小处理。</T>
   // //
   // // @method
   // // @param p:event:TEventProcess 事件
   // //==========================================================
   // MO.FDuiLayout_oeResize = function FDuiLayout_oeResize(p) {
   //    var o = this;
   //    o.__base.FDuiContainer.oeResize.call(o, p);
   //    if (p.isAfter()) {
   //       o.resize();
   //    }
   // }

   // //==========================================================
   // // <T>刷新处理。</T>
   // //
   // // @method
   // // @param p:event:TEventProcess 事件
   // //==========================================================
   // MO.FDuiLayout_oeRefresh = function FDuiLayout_oeRefresh(p) {
   //    var o = this;
   //    o.__base.FDuiContainer.oeDesign.call(o, p);
   //    if (p.isAfter()) {
   //       o.resize();
   //    }
   // }

   // //==========================================================
   // // <T>创建一个控件容器。</T>
   // //
   // // @method
   // // @param controlSource:MUiControl 来源控件
   // // @param controlTarget:MUiControl 目标控件
   // // @param index:Integer 索引位置
   // // @param copy:Boolean 是否复制
   // // @return HtmlTag 页面元素
   // //==========================================================
   // MO.FDuiLayout_insertPosition = function FDuiLayout_insertPosition(controlSource, controlTarget, index, copy) {
   //    var o = this;
   //    var components = o._components;
   //    var controls = o._controls;
   //    components.removeValue(controlSource);
   //    controls.removeValue(controlSource);
   //    if (controlTarget) {
   //       var index = components.indexOfValue(controlTarget);
   //       components.insert(index + index, controlSource.name, controlSource);
   //       var index = controls.indexOfValue(controlTarget);
   //       controls.insert(index + index, controlSource.name, controlSource);
   //    } else {
   //       components.set(controlSource.name, controlSource);
   //       controls.set(controlSource.name, controlSource);
   //    }
   // }

   // //==========================================================
   // // <T>创建一个控件容器。</T>
   // //
   // // @method
   // // @param cf:ControlFrom
   // // @param ct:ControlTarget
   // // @param pos:Position
   // // @param copy:copy
   // //==========================================================
   // MO.FDuiLayout_moveChild = function FDuiLayout_moveChild(cf, ct, pos, copy) {
   //    if (!(cf && ct && pos) || (cf == ct)) {
   //       return;
   //    }
   //    var o = this;
   //    var hPanel = o._hPanel;
   //    var moved = false;
   //    var cfh = MO.Class.isClass(cf, MO.MDuiHorizontal);
   //    var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
   //    var hCfTab = MO.Window.Html.parent(cf._hPanel, 'TABLE');
   //    var cth = MO.Class.isClass(ct, MO.MDuiHorizontal);
   //    var hTd = MO.Window.Html.parent(ct._hPanel, 'TD');
   //    var hTable = MO.Window.Html.parent(hTd, 'TABLE');
   //    switch (pos) {
   //       case EPosition.Before:
   //          var hRow = hTable.rows[0];
   //          for (var n = 0; n < hRow.cells.length; n++) {
   //             if (hRow.cells[n] == hTd) {
   //                var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex);
   //                hCell.appendChild(cf._hPanel);
   //                o.insertPosition(cf, ct, 0, copy);
   //                cf.nowrap = true;
   //                cf._hPanelLine = hTable;
   //                moved = true;
   //                break;
   //             }
   //          }
   //          break;
   //       case EPosition.After:
   //          var hRow = hTable.rows[0];
   //          for (var n = 0; n < hRow.cells.length; n++) {
   //             if (hRow.cells[n] == hTd) {
   //                var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
   //                var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex + 1);
   //                hCell.appendChild(cf._hPanel);
   //                o.insertPosition(cf, ct, 1, copy);
   //                cf.nowrap = false;
   //                cf._hPanelLine = hTable;
   //                ct.nowrap = true;
   //                moved = true;
   //                break;
   //             }
   //          }
   //          break;
   //       case EPosition.LineBefore:
   //          if (cth) {
   //             if (cfh) {
   //                o._hContainer.insertBefore(cf._hPanel, ct._hPanel);
   //             } else {
   //                var hNewTab = o.innerAppendLine();
   //                o._hContainer.insertBefore(hNewTab, ct._hPanel);
   //                var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
   //                hCell.appendChild(cf._hPanel);
   //                cf._hPanelLine = hNewTab;
   //             }
   //             o.insertPosition(cf, ct, 0, copy);
   //          } else {
   //             var count = o._hContainer.children.length;
   //             for (var n = 0; n < count; n++) {
   //                if (o._hContainer.children[n] == hTable) {
   //                   if (cfh) {
   //                      o._hContainer.insertBefore(cf._hPanel, hTable);
   //                   } else {
   //                      var hNewTab = o.innerAppendLine();
   //                      o._hContainer.insertBefore(hNewTab, hTable);
   //                      var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
   //                      hCell.appendChild(cf._hPanel);
   //                      cf._hPanelLine = hNewTab;
   //                      moved = true;
   //                   }
   //                   o.insertPosition(cf, ct, 0, copy);
   //                   cf.nowrap = false;
   //                   break;
   //                }
   //             }
   //          }
   //          break;
   //       case EPosition.LineAfter:
   //          if (cfh) {
   //             o._hContainer.appendChild(cf._hPanel);
   //          } else {
   //             var hNewTab = o.innerAppendLine();
   //             var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
   //             hCell.appendChild(cf._hPanel);
   //             hCell.appendChild(cf._hPanel);
   //             moved = true;
   //          }
   //          o.insertPosition(cf, null, 0, copy);
   //          ct.nowrap = false;
   //          cf.nowrap = false;
   //          break;
   //    }
   //    if (moved) {
   //       hCfTd.removeNode(true);
   //       if (hCfTab.rows[0].cells.length == 0) {
   //          hCfTab.removeNode(true);
   //       }
   //    }
   // }

   //==========================================================
   // <T>追加一个布局行。</T>
   //
   // @return 布局行
   //==========================================================
   public innerAppendLine() {
      var context = this.renderContext;
      var hLine = null;
      if (this.layoutCd == LayoutEnum.Design) {
         hLine = this._hPanelTable = context.appendTable(this._hContainer);
         hLine.style.paddingBottom = 4;
         hLine.width = '100%';
         this._hPanelLine = context.appendTableRow(hLine);
      } else {
         this._hPanelTable = null;
         this._hPanelLine = null;
      }
      return hLine;
   }

   //==========================================================
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      var context = this.renderContext;
      var hControlPanel = control.getPanel(PanelEnum.Panel);
      // 设计模式时
      if (this.layoutCd == LayoutEnum.Design) {
         // 追加第一行
         if (!this._hPanelLine) {
            this.innerAppendLine();
         }
         // 建立分割符
         // if (MO.Class.isClass(control, MO.MDuiHorizontal)) {
         //    if (this._hPanelTable.rows[0].cells.length == 0) {
         //       this._hContainer.insertBefore(control._hPanel, this._hPanelTable);
         //    } else {
         //       this._hContainer.appendChild(control._hPanel);
         //       this.innerAppendLine();
         //    }
         //    return;
         // }
         // 增加控件
         var hCell = context.appendTableCell(this._hPanelLine, this.styleName('ControlPanel'));
         if (!(control instanceof Layout)) {
            control._hPanelLine = this._hPanelTable;
         }
         hCell.appendChild(hControlPanel);
         control._hLayoutCell = hCell;
         // 追加下一行
         // if (!control.nowrap() && (this.controls.last() != control)) {
         //    this.innerAppendLine();
         // }
      } else {
         if (hControlPanel.style) {
            hControlPanel.style.paddingTop = '2px';
            hControlPanel.style.paddingBottom = '2px';
         }
         // 追加横向对象
         if (control.dockCd == DockEnum.Fill) {
            var hCell = context.appendTableRowCell(this._hPanelForm, this.styleName('ControlPanel'));
            hCell.appendChild(hControlPanel);
         } else if (control.sizeCd == SizeEnum.Fill) {
            var hCell = context.appendTableRowCell(this._hPanelForm, this.styleName('ControlPanel'));
            hCell.appendChild(hControlPanel);
         } else if (SetUtil.contains(control.sizeCd, SizeEnum.Horizontal) || '100%' == control.width) {
            // if (MO.Class.isClass(control, MO.FDuiSplit)) {
            //    this._lastSplit = control;
            // }
            // 追加一个新行
            var hLine = context.appendTableRow(this._hPanelForm);
            var hCell = context.appendTableCell(hLine, this.styleName('ControlPanel'));
            hCell.vAlign = 'top';
            hCell.appendChild(hControlPanel);
            control._hLayoutRow = hLine;
            this._hPanelLast = hCell;
            // 设置行高
            if (!SetUtil.contains(control.sizeCd, SizeEnum.Vertical)) {
               hCell.height = 1;
            } else if (control.height) {
               hCell.height = control.height;
            }
            this._hPanelLine = null;
         } else {
            // 增加普通对象
            if (!this._hPanelLine) {
               var hLine = context.appendTableRow(this._hPanelForm);
               hLine.height = 1;
               if (this._lastSplit) {
                  this._lastSplit.pushLine(hLine);
               }
               // 追加新的行表单
               var hCell = context.appendTableCell(hLine, this.styleName('ControlPanel'));
               hCell.vAlign = 'top';
               var ht = this._hPanelTable = context.appendTable(hCell);
               this._hPanelLine = context.appendTableRow(ht);
            }
            // 追加一个单元格
            var hCell = context.appendTableCell(this._hPanelLine, this.styleName('ControlPanel'))
            // 追加一般控件
            control._hLayoutRow = this._hPanelLine;
            this._hPanelLast = hCell;
            hCell.appendChild(hControlPanel);
            control._hLayoutCell = hCell;
            // 追加下一行
            if (!control.nowrap) {
               this._hPanelLine = null;
            }
         }
      }
   }

   // //==========================================================
   // // <T>改变大小处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiLayout_resize = function FDuiLayout_resize() {
   //    var o = this;
   //    var components = o._components;
   //    if (components) {
   //       // 如果含有表格或分页内嵌控件，则自动高度为100%
   //       var ha = false;
   //       var count = components.count();
   //       for (var n = 0; n < count; n++) {
   //          var component = components.at(n);
   //          if (MO.Class.isClass(component, MO.FDuiTable) || MO.Class.isClass(component, MO.FDuiPageControl)) {
   //             ha = true;
   //             break;
   //          }
   //       }
   //       //o.setSize('100%', ha ? '100%' : 1);
   //    }
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiLayout_dispose = function FDuiLayout_dispose() {
   //    var o = this;
   //    // 释放属性
   //    o._hPanelCurrent = null;
   //    o._hPanelTable = null;
   //    o._hPanel = null;
   //    o._hContainer = null;
   //    // 父处理
   //    o.__base.FDuiContainer.dispose.call(o);
   // }
}