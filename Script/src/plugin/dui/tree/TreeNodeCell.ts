import {RenderContext} from '../RenderContext';
import {Control} from '../Control';
import {TreeView} from './TreeView';

//==========================================================
// <T>树目录节点格子控件。</T>
// 模板:
//  hPanel<TD>
// ┌------------------------------┐
// │┌----------┐┌------------┐│
// ││hIcon<IMG>││hLabel<SPAN>││
// │└----------┘└------------┘│
// └------------------------------┘
//
// @control
// @author maocy
// @version 150307
//==========================================================
export class TreeNodeCell extends Control {
   //    // @style
   //    o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //    o._styleCell = MO.Class.register(o, new MO.AStyle('_styleCell', 'Cell'));
   //..........................................................
   // @attribute
   public _tree: TreeView;
   //    o._column = null;
   //    o._level = 0;
   //    o._node = null;
   //    // @attribute
   //    o._listenersClick = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   //    o._listenersDoubleClick = MO.Class.register(o, new MO.AListener('_listenersDoubleClick', MO.EEvent.DoubleClick));
   //..........................................................
   // @html
   public _hPanel: HTMLTableCellElement;
   //    o._hImage = null;
   //    o._hIcon = null;
   //    o._hLabel = null;
   //    //..........................................................
   //    // @event
   //    o.onBuildPanel = MO.FDuiTreeNodeCell_onBuildPanel;
   //    o.onBuild = MO.FDuiTreeNodeCell_onBuild;
   //    o.onClick = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiTreeNodeCell_onClick);
   //    o.onDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiTreeNodeCell_onDoubleClick);
   //    //..........................................................
   //    // @method
   //    o.construct = MO.FDuiTreeNodeCell_construct;
   //    // @method
   //    o.icon = MO.FDuiTreeNodeCell_icon;
   //    o.setIcon = MO.FDuiTreeNodeCell_setIcon;
   //    o.get = MO.FDuiTreeNodeCell_get;
   //    o.set = MO.FDuiTreeNodeCell_set;
   //    return o;
   // }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createTableCell(this.styleName('Panel'));
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 建立底板
      // var t = this._tree;
      // var h = this._hPanel;
      // this.attachEvent('onClick', h);
      // this.attachEvent('onDoubleClick', h);
   }

   // //==========================================================
   // // <T>点击事件处理。</T>
   // //
   // // @method
   // // @param event:TEventProcess 事件
   // //==========================================================
   // MO.FDuiTreeNodeCell_onClick = function FDuiTreeNodeCell_onClick(event) {
   //    var o = this;
   //    event.treeNode = o._node;
   //    event.treeColumn = o._column;
   //    event.treeNodeCell = o;
   //    o.processClickListener(p);
   // }

   // //==========================================================
   // // <T>双击事件处理。</T>
   // //
   // // @method
   // // @param event:TEventProcess 事件
   // //==========================================================
   // MO.FDuiTreeNodeCell_onDoubleClick = function FDuiTreeNodeCell_onDoubleClick(event) {
   //    var o = this;
   //    event.treeNode = o._node;
   //    event.treeColumn = o._column;
   //    event.treeNodeCell = o;
   //    o.processDoubleClickListener(p);
   // }

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNodeCell_construct = function FDuiTreeNodeCell_construct() {
   //    var o = this;
   //    o.__base.FDuiControl.construct.call(o);
   //    // 初始化变量
   //    o._attributes = new MO.TAttributes();
   // }

   // //==========================================================
   // // <T>获得图标。</T>
   // //
   // // @method
   // // @return String 图标
   // //==========================================================
   // MO.FDuiTreeNodeCell_icon = function FDuiTreeNodeCell_icon() {
   //    return o._icon;
   // }

   // //==========================================================
   // // <T>设置类型名称。</T>
   // //
   // // @method
   // // @param String 类型名称
   // //==========================================================
   // MO.FDuiTreeNodeCell_setIcon = function FDuiTreeNodeCell_setIcon(p) {
   //    var o = this;
   //    var h = o._hIcon;
   //    if (!h) {
   //       // 建立图标
   //       h = o._hIcon = MO.Window.Builder.appendIcon(o._hPanel, null, null, 16, 16)
   //    }
   //    // 设置路径
   //    h.src = MO.RResource.iconPath(p);
   // }

   // //==========================================================
   // // <T>获取内容。</T>
   // //
   // // @method
   // // @return String 内容
   // //==========================================================
   // MO.FDuiTreeNodeCell_get = function FDuiTreeNodeCell_get() {
   // }

   // //==========================================================
   // // <T>设置内容。</T>
   // //
   // // @method
   // // @param p:value:String 内容
   // //==========================================================
   // MO.FDuiTreeNodeCell_set = function FDuiTreeNodeCell_set(p) {
   //    // 建立显示文本
   //    //o._hLabel = MO.Window.Builder.appendText(hnp, o.styleName('Label'));
   //    //o.setLabel(o._label);
   // }
}