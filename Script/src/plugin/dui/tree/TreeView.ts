import {Fatal} from './runtime/common/lang/Fatal';
import {Objects} from './runtime/common/lang/Objects';
import {Dictionary} from './runtime/common/lang/Dictionary';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {AssertUtil} from './runtime/common/AssertUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {Component} from '../Component';
import {Control} from '../Control';
import {Container} from '../Container';
import {TreeNodeType} from './TreeNodeType';
import {TreeColumn} from './TreeColumn';
import {TreeLevel} from './TreeLevel';
import {TreeNode} from './TreeNode';

//==========================================================
// <T>树目录控件。</T>
//  hPanel<TABLE>
// ┌-------------------------------------------------------┐
// │ hNodePanel<DIV>                                       │
// │┌---------------------------------------------------┐│
// ││ hNodeForm<TABLE>                                  ││
// ││┌-----------------------------------------------┐││
// │││hHeadLine<TR>                                  │││
// ││├-----------------------------------------------┤││
// │││(Nodes)                                        │││
// ││└-----------------------------------------------┘││
// │└---------------------------------------------------┘│
// └-------------------------------------------------------┘
//
// @control
// @author maocy
// @version 150119
//==========================================================
export class TreeView extends Container {
   // @property
   public optionCheck: boolean;
   public indent: number;
   //    //..........................................................
   //    // @style
   //    o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   //    o._styleNodePanel = MO.Class.register(o, new MO.AStyle('_styleNodePanel', 'NodePanel'));
   //    o._styleNodeForm = MO.Class.register(o, new MO.AStyle('_styleNodeForm', 'NodeForm'));
   //    //..........................................................
   //    // @attribute
   //protected _attributes;
   public nodeTypes: Dictionary<TreeNodeType>;
   public nodeColumns: Dictionary<TreeColumn>;
   public nodeLevels: Dictionary<TreeLevel>;
   public nodes: Objects<TreeNode>;
   public allNodes: Objects<TreeNode>;
   protected _defaultNodeType: TreeNodeType;
   public focusNode: TreeNode;
   protected _loadingNode: TreeNode;
   protected _freeNodes: Objects<TreeNode>;
   //..........................................................
   // @icon
   public iconPlus = 'control.treeview.plus';
   public iconMinus = 'control.treeview.minus';
   public iconNode = 'control.treeview.node';
   public iconLoading = 'control.treeview.loading';
   //..........................................................
   // @html
   protected _hNodeBody: HTMLTableCellElement;
   protected _hNodePanel: HTMLDivElement;
   protected _hNodeForm: HTMLTableElement;
   protected _hHeadLine: HTMLTableRowElement;
   protected _hNodeRows;
   //    //..........................................................
   //    // @listener
   //    o._listenersNodeEnter = MO.Class.register(o, new MO.AListener('_listenersNodeEnter'));
   //    o._listenersNodeLeave = MO.Class.register(o, new MO.AListener('_listenersNodeLeave'));
   //    o._listenersNodeClick = MO.Class.register(o, new MO.AListener('_listenersNodeClick'));


   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 初始化变量
      this.indent = 16;
      //this._attributes = new TAttributes();
      this.nodeTypes = new Dictionary<TreeNodeType>();
      this.nodeColumns = new Dictionary<TreeColumn>();
      this.nodeLevels = new Dictionary<TreeLevel>();
      this.nodes = new Objects<TreeNode>();
      this.allNodes = new Objects<TreeNode>();
      // 初始化变量
      this._freeNodes = new Objects<TreeNode>();
      // 创建默认类型
      this._defaultNodeType = ClassUtil.create(TreeNodeType);
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
   // <T>建立当前控件的显示框架。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 关联事件
      var hPanel = this._hPanel;
      //this.attachEvent(hPanel, EventEnum.Click, this.onClick);
      // 构建标题表格
      var hRow = context.appendTableRow(this._hPanel);
      var hNodeBody = this._hNodeBody = context.appendTableCell(hRow);
      //this.attachEvent(hNodeBody, EventEnum.Resize, );
      // 构建节点底板
      var hNodePanel = this._hNodePanel = context.appendDiv(hNodeBody, this.styleName('NodePanel'));
      // 构建节点表格
      var hNodeForm = this._hNodeForm = context.appendTable(hNodePanel, this.styleName('NodeForm'));
      hNodeForm.width = '100%';
      // 表格第一行是标题栏
      this._hHeadLine = context.appendTableRow(hNodeForm);
      this._hNodeRows = hNodeForm.children[0];
      // 构建加载中节点
      //var node = this._loadingNode = ClassUtil.create(TreeNode);
      //node._tree = this;
      //node._label = MO.RContext.get('FDuiTreeView:loading');
      //node._label = "Loading";
      //node._icon = this._iconLoading;
      //node.build(context);
      //o.appendNode(node);
      //node.hide();
      // 构建后处理
      // var ns = this.nodes;
      // if (!ns.isEmpty()) {
      //    var nc = ns.count();
      //    for (var i = 0; i < nc; i++) {
      //       //this.appendNode(ns.get(i));
      //    }
      // }
      //this.extendAuto();
      //RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.clear));
   }

   //==========================================================
   // <T>追加一个节点到自己到自己的父节点内。</T>
   // <P>如果父节点为空，则追加到跟节点下。</P>
   //
   // @param node 节点对象
   // @param parent 父节点
   //==========================================================
   public appendNode(parent: TreeNode, node: TreeNode) {
      // 检查是否已经关联
      if (node.statusLinked) {
         return;
      }
      // 放入表格中
      var hNodeRows = this._hNodeRows;
      if (parent) {
         var hParentPanel: HTMLTableRowElement = <HTMLTableRowElement>parent.getPanel(PanelEnum.Panel);
         if (!hParentPanel.parentElement) {
            hNodeRows.appendChild(hParentPanel);
         }
      }
      var hChildPanel: HTMLTableRowElement = <HTMLTableRowElement>node.getPanel(PanelEnum.Panel);
      if (!hChildPanel.parentElement) {
         hNodeRows.appendChild(hChildPanel);
      }
      // 放入指定位置
      if (parent) {
         // 计算最后一个已经连接节点的位置
         var lastNode = parent.searchLast();
         var hLastPanel = lastNode.getPanel(PanelEnum.Panel);
         var lastIndex = hLastPanel.rowIndex;
         // 关联节点
         //if (hChildPanel.rowIndex > lastIndex) {
         //   lastIndex++;
         //}
         HtmlUtil.tableMoveRow(this._hNodeForm, hChildPanel.rowIndex, lastIndex + 1);
         // 设置层次
         node.setLevel(parent.level + 1);
      } else {
         this._hNodeRows.appendChild(hChildPanel);
         node.setLevel(0);
      }
      node.statusLinked = true;
   }

   //==========================================================
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      var context = this.renderContext;
      // 按键处理
      if (control instanceof TreeNode) {
         this.appendNode(null, control as TreeNode);
      } else {
         throw new Fatal(this, 'Unknown control type.');
      }
   }

   //==========================================================
   // <T>改变大小处理。</T>
   //
   // @param event 事件信息
   //==========================================================
   public oeResize(event: DispatchEvent) {
      if (event.isAfter()) {
         var hNodeBody = this._hNodeBody;
         var hNodePanel = this._hNodePanel;
         hNodePanel.style.width = hNodeBody.offsetWidth + 'px';
         hNodePanel.style.height = hNodeBody.offsetHeight + 'px';
      }
   }

   // //==========================================================
   // // <T>节点点击事件处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件信息
   // //==========================================================
   // MO.FDuiTreeView_onNodeClick = function FDuiTreeView_onNodeClick(event) {
   //    var o = this;
   // }

   // //==========================================================
   // // <T>响应鼠标点击树节点复选框处理。</T>
   // //
   // // @method
   // // @param s:source:FControl 源控件
   // // @param e:event:TEvent 事件对象
   // //==========================================================
   // MO.FDuiTreeView_onClick = function FDuiTreeView_onClick(s, e) {
   //    var o = this;
   //    if (s.hSender == o._hNodePanel) {
   //       var node = o._focusNode;
   //       if (node) {
   //          node.select(false);
   //          o._focusNode = null;
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>响应鼠标点击树节点复选框处理。</T>
   // //
   // // @method
   // // @param s:source:FControl 源控件
   // // @param e:event:TEvent 事件对象
   // //==========================================================
   // MO.FDuiTreeView_onNodeCheckClick = function FDuiTreeView_onNodeCheckClick(s, e) {
   //    var o = this;
   //    if (s && MO.Class.isClass(s, FDuiTreeNode)) {
   //       var f = s.check();
   //       var cs = s.controls;
   //       if (cs) {
   //          for (var n = 0; n < cs.count; n++) {
   //             var nd = cs.value(n);
   //             if (nd && MO.Class.isClass(nd, FDuiTreeNode)) {
   //                nd.setCheck(f);
   //             }
   //          }
   //       }
   //       var p = s.parentNode;
   //       while (p) {
   //          if (f) {
   //             p.setCheck(f);
   //             p = p.parentNode;
   //          } else {
   //             var pcs = p.controls;
   //             var pcc = pcs.count;
   //             for (var n = 0; n < pcc; n++) {
   //                var pnd = pcs.value(n);
   //                if (pnd && MO.Class.isClass(pnd, FDuiTreeNode)) {
   //                   if (pnd.check()) {
   //                      return;
   //                   }
   //                }
   //             }
   //             p.setCheck(false);
   //             p = p.parentNode;
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>是否含有子节点。</T>
   // //
   // // @method
   // // @return Boolean 是否含有
   // //==========================================================
   // MO.FDuiTreeView_hasNode = function FDuiTreeView_hasNode() {
   //    return this._rootNode.hasChild();
   // }

   //==========================================================
   // <T>根据类型名称查找类型信息。</T>
   //
   // @param name 类型名称
   // @return 类型信息
   //==========================================================
   public findType(name: string): TreeNodeType {
      return this.nodeTypes.get(name);
   }

   // //==========================================================
   // // <T>查询所有节点中，找到指定名称的节点。</T>
   // //
   // // @method
   // // @param p:name:String 节点名称
   // // @return FDuiTreeNode 节点对象
   // //==========================================================
   // MO.FDuiTreeView_findByName = function FDuiTreeView_findByName(p) {
   //    var o = this;
   //    var ns = o._allNodes;
   //    var c = ns.count();
   //    if (c) {
   //       for (var i = 0; i < c; i++) {
   //          var n = ns.get(i);
   //          if (n._name == p) {
   //             return n;
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>查询所有节点中，找到指定标识的节点。</T>
   // //
   // // @method
   // // @param guid:String 节点标识
   // // @return FDuiTreeNode 节点对象
   // //==========================================================
   // MO.FDuiTreeView_findByGuid = function FDuiTreeView_findByGuid(guid) {
   //    var o = this;
   //    var nodes = o._allNodes;
   //    var count = nodes.count();
   //    if (count) {
   //       for (var i = 0; i < count; i++) {
   //          var node = nodes.getAt(i);
   //          if (node._guid == guid) {
   //             return node;
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>创建子控件。</T>
   // //
   // // @method
   // // @param x:config:TNode 数据节点
   // // @return 子对象
   // //==========================================================
   // MO.FDuiTreeView_createChild = function FDuiTreeView_createChild(x) {
   //    var o = this;
   //    var r = null;
   //    var n = x.name();
   //    switch (n) {
   //       case 'TreeColumn':
   //          r = MO.Class.create(MO.FDuiTreeColumn);
   //          break;
   //       case 'TreeLevel':
   //          r = MO.Class.create(MO.FDuiTreeLevel);
   //          break;
   //       case 'TreeNodeType':
   //          r = MO.Class.create(MO.FDuiTreeNodeType);
   //          break;
   //       case 'TreeNode':
   //          r = MO.Class.create(MO.FDuiTreeNode);
   //          break;
   //       default:
   //          throw new MO.TError(o, 'Unknown child type. (config={1})', x.xml());
   //    }
   //    r._tree = o;
   //    return r;
   // }

   // //==========================================================
   // // <T>追加子控件。</T>
   // //
   // // @method
   // // @param p:child:FDuiControl 子控件
   // //==========================================================
   // MO.FDuiTreeView_appendChild = function FDuiTreeView_appendChild(child) {
   //    var o = this;
   //    //var hc = o._hHeadLine.insertCell();
   //    //hc.height = '100%';
   //    //if(MO.Class.isClass(child, FTreeColumn)){
   //    //   hc.appendChild(child._hPanel);
   //    //}
   // }

   // //==========================================================
   // // <T>创建一个树节点。</T>
   // // <P>如果有删除的节点，则优先复用已删除的节点。</P>
   // //
   // // @method
   // // @return FDuiTreeNode 树节点
   // //==========================================================
   // MO.FDuiTreeView_createNode = function FDuiTreeView_createNode() {
   //    var o = this;
   //    // 创建节点
   //    var node = o._freeNodes.pop();
   //    if (!node) {
   //       node = MO.Class.create(MO.FDuiTreeNode);
   //       node._tree = o;
   //       node.build(o._hPanel);
   //    }
   //    // 放入所有节点中
   //    MO.Window.Html.visibleSet(node._hPanel, true);
   //    o._allNodes.push(node);
   //    return node;
   // }

   // //==========================================================
   // // <T>把xml解析为节点，添加到一个节点下面。</T>
   // //
   // // @method
   // // @todo: 未修复
   // // @param parent:parent:FDuiTreeNode 树节点
   // // @param config:config:TXmlDco XML文件
   // //==========================================================
   // MO.FDuiTreeView_appendNodes = function FDuiTreeView_appendNodes(parent, config) {
   //    parent = MO.RObject.nvl(parent, this.workNode, this.rootNode);
   //    if (config && config._nodes) {
   //       var count = config._nodes.count;
   //       if (count > 0) {
   //          parent.child = true;
   //          parent.loaded = true;
   //          for (var n = 0; n < count; n++) {
   //             var nc = config._nodes.get(n);
   //             if (nc && (nc.isName('Node') || nc.isName('TreeNode'))) {
   //                var tn = MO.Class.create(FDuiTreeNode);
   //                tn.parent = parent;
   //                tn._tree = this;
   //                tn.loadConfig(nc);
   //                if (nc._nodes) {
   //                   tn.icon = 'ctl.FBrowser_Folder';
   //                } else {
   //                   tn.icon = 'ctl.FBrowser_Txt';
   //                }
   //                tn.build(0);
   //                tn.hide();
   //                if (nc._nodes) {
   //                   this.tempAppendNodes(tn, nc);
   //                }
   //                parent.push(tn);
   //                this._allNodes.push(tn);
   //             }
   //          }
   //       }
   //    }
   //    this.rootNode.extend(true);
   // }

   // //==========================================================
   // // <T>设置当前树获得焦点的节点。</T>
   // //
   // // @method
   // // @param n:node:FDuiTreeNode 获得焦点的树节点
   // // @param s:select:Boolean 是否选中
   // //==========================================================
   // MO.FDuiTreeView_selectNode = function FDuiTreeView_selectNode(n, s) {
   //    var o = this;
   //    var fn = o._focusNode;
   //    if (s) {
   //       // 选中节点处理
   //       if (n) {
   //          if (fn) {
   //             if (fn == n) {
   //                return;
   //             }
   //             // 如果选中的不是文件夹，焦点节点才会失去焦点
   //             if (n.isFolder()) {
   //                fn.select(true);
   //             } else {
   //                fn.select(false);
   //             }
   //          }
   //          // 如果选中的不是文件夹，节点才可获得焦点
   //          if (!n.isFolder()) {
   //             n.select(true);
   //             o._focusNode = n;
   //          }
   //       }
   //    } else {
   //       // 非选中节点处理
   //       if (n) {
   //          n.select(false);
   //       }
   //       if (fn) {
   //          fn.select(false);
   //       }
   //    }
   // }

   //==========================================================
   // <T>增加一个子组件。</T>
   //
   // @param child 子组件
   //==========================================================
   public appendChild(child: Component) {
      super.appendChild(child);
      // 增加节点
      //child.tree = this;
      if (child instanceof TreeColumn) {
         var columnName = child.name;
         AssertUtil.debugNotEmpty(columnName);
         this.nodeColumns.set(columnName, child);
      } else if (child instanceof TreeLevel) {
         var levelName = child.name;
         AssertUtil.debugNotEmpty(levelName);
         this.nodeLevels.set(levelName, child);
      } else if (child instanceof TreeNodeType) {
         var typeName = child.name;
         AssertUtil.debugNotEmpty(typeName);
         this.nodeTypes.set(typeName, child);
      } else if (child instanceof TreeNode) {
         // 追加节点
         //this._nodes.push(child);
         //this._allNodes.push(child);
         // 追加节点显示
         //this.appendNode(child);
      }
   }

   //==========================================================
   // <T>移除一个树节点。</T>
   //
   // @method
   // @todo: 未修复
   // @param p:node:FTreeNode 目录节点
   //==========================================================
   public removeNode(oNode) {
      // if (oNode) {
      //    var nodes = new Array();
      //    var oLoopNode = null;
      //    var nCount = this._allNodes.length;
      //    for (var n = 0; n < nCount; n++) {
      //       oLoopNode = this._allNodes[n];
      //       if (oLoopNode != oNode) {
      //          nodes[nodes.length] = oLoopNode;
      //       }
      //    }
      //    this._allNodes = nodes;
      //    var oParent = oNode.parent;
      //    if (oParent) {
      //       nodes = new Array();
      //       nCount = oParent._nodes.length;
      //       for (var n = 0; n < nCount; n++) {
      //          oLoopNode = oParent._nodes[n];
      //          if (oLoopNode != oNode) {
      //             nodes[nodes.length] = oLoopNode;
      //          }
      //       }
      //       oParent._nodes = nodes;
      //       oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      //    }
      //    if (oParent._nodes.length == 0) {
      //       oParent.imageHTML.src = this.imgEmpty;
      //    }
      //    return true;
      // }
      // return false;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @param context 环境
   //==========================================================
   public buildNodes(parent: TreeNode, children: Objects<Component>) {
      if (children) {
         var count = children.count();
         for (var n = 0; n < count; n++) {
            var child = children.at(n);
            if (child instanceof TreeNode) {
               var node = child as TreeNode;
               this.appendNode(parent, node);
               this.buildNodes(node, node.children);
            }
         }
      }
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @param context 环境
   //==========================================================
   public builded() {
      super.builded();
      this.buildNodes(null, this.children);
   }

   // //==========================================================
   // // <T>移除一个树节点集合。</T>
   // //
   // // @method
   // // @todo: 未修复
   // // @param u:uuid:String 节点的XML表示字符串
   // // @return FDuiTreeNode 节点对象
   // //==========================================================
   // MO.FDuiTreeView_removeNodes = function FDuiTreeView_removeNodes(node) {
   //    var o = this;
   //    node = MO.RObject.nvl(node, o.workNode, o.rootNode);
   //    if (node.hasChild()) {
   //       node.removeChildren();
   //    }
   //    node.remove();
   // }

   // //==========================================================
   // // <T>释放一个树节点。</T>
   // // <P>从节点表格移出，但是不释放，用来再创建节点时使用。</P>
   // //
   // // @method
   // // @param node:FDuiTreeNode 树节点
   // //==========================================================
   // MO.FDuiTreeView_freeNode = function FDuiTreeView_freeNode(node) {
   //    var o = this;
   //    if (node._statusLinked) {
   //       node._statusLinked = false;
   //       // 隐藏处理
   //       o._hNodeRows.removeChild(node._hPanel);
   //       // 释放节点事件
   //       var cells = node.cells();
   //       if (cells) {
   //          var cellCount = cells.count();
   //          for (var i = 0; i < cellCount; i++) {
   //             var cell = cells.at(i);
   //             cell.clearAllListeners();
   //          }
   //       }
   //       // 移除处理
   //       o._allNodes.remove(node);
   //       o._freeNodes.push(node);
   //    }
   // }

   // //==========================================================
   // // <T>清空指定节点下所有子节点。</T>
   // //
   // // @method
   // // @todo: 未修复
   // // @param p:node:FDuiTreeNode 树节点
   // //==========================================================
   // MO.FDuiTreeView_clearNodes = function FDuiTreeView_clearNodes(node) {
   //    var o = this;
   //    if (node) {
   //       node.removeChildren();
   //    }
   //    var nodes = new Array();
   //    var oLoopNode = null;
   //    var nCount = o._allNodes.length;
   //    for (var n = 0; n < nCount; n++) {
   //       oLoopNode = o._allNodes[n];
   //       if (oLoopNode.parent != oNode) {
   //          nodes[nodes.length] = oLoopNode;
   //       } else {
   //          oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
   //       }
   //    }
   //    oNode.imageHTML.src = o.imgEmpty;
   //    o._allNodes = nodes;
   //    return true;
   // }

   // //==========================================================
   // // <T>点击目录节点处理。</T>
   // //
   // // @method
   // // @param node:FDuiTreeNode 树节点
   // //==========================================================
   // MO.FDuiTreeView_nodeClick = function FDuiTreeView_nodeClick(node) {
   //    var o = this;
   //    //o.lsnsClick.process(o, node);
   //    // 分发事件
   //    var event = new MO.SEvent();
   //    event.tree = o;
   //    event.node = node;
   //    o.onNodeClick(event);
   //    o.processNodeClickListener(event);
   //    event.dispose();
   // }

   // //==========================================================
   // // <T>计算当前高度。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeView_calculateHeight = function FDuiTreeView_calculateHeight() {
   //    var o = this;
   //    var ns = o._allNodes;
   //    var c = ns.count();
   //    for (var i = 0; i < c; i++) {
   //       var n = ns.get(i);
   //       if (MO.RHtml.displayGet(n._hPanel)) {
   //          c++;
   //       }
   //    }
   //    return c * 29;
   // }

   // //==========================================================
   // // <T>查找所有选中树节点集合。</T>
   // //
   // // @method
   // // @param u:uuid:String 节点的XML表示字符串
   // // @return FDuiTreeNode 节点对象
   // //==========================================================
   // MO.FDuiTreeView_fetchChangedChecks = function FDuiTreeView_fetchChangedChecks() {
   //    var o = this;
   //    // TreeView
   //    var treeView = new MO.TNode('TreeView');
   //    treeView.set('name', o.name);
   //    // TNode
   //    var rnd = MO.RObject.nvl(o.rootNode, o);
   //    var cs = rnd.controls;
   //    for (var n = 0; n < cs.count; n++) {
   //       var c = cs.value(n);
   //       c.pushChanged(treeView);
   //    }
   //    //var fc = RConsole.find(FDatasetConsole);
   //    //var g = new TDatasetTreeViewArg();
   //    //fc._treeUpdate(g);
   //    return treeView;
   // }

   // //==========================================================
   // // <T>展开所有设置过展开的节点。</T>
   // //
   // // @method
   // // @param n:node:FDuiTreeNode 要展开的节点，如果为空，则展开根节点
   // //==========================================================
   // MO.FDuiTreeView_extendAuto = function FDuiTreeView_extendAuto(n) {
   //    var o = this;
   //    var ns = n ? n._nodes : o._nodes;
   //    if (ns) {
   //       var nc = ns.count;
   //       if (nc) {
   //          for (var i = 0; i < nc; i++) {
   //             var fn = ns.get(i);
   //             fn.extend(fn._extended);
   //             if (fn._extended) {
   //                o.extendAuto(fn);
   //             }
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>展开所有的节点。</T>
   // //
   // // @method
   // // @param n:node:FDuiTreeNode 树的根节点
   // // @param f:flag:Boolean 是否展开
   // //==========================================================
   // MO.FDuiTreeView_extendAll = function FDuiTreeView_extendAll(n, f) {
   //    var o = this;
   //    var ns = n ? n._nodes : o._nodes;
   //    if (ns) {
   //       var nc = ns.count();
   //       if (nc) {
   //          for (var i = 0; i < nc; i++) {
   //             var fn = ns.get(i);
   //             fn.extend(f);
   //             o.extendAll(fn, f);
   //          }
   //       }
   //    }
   // }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   //==========================================================
   public refresh() {
      // if (this.parentObj) {
      //    this.parentObj.style.height = this.calculateHeight();
      // }
   }

   // //==========================================================
   // // <T>根据条件过滤显示节点列表。</T>
   // //
   // // @method
   // // @param pl:label:String 标签
   // // @param pa:String:String 属性集合
   // //==========================================================
   // MO.FDuiTreeView_filterNode = function FDuiTreeView_filterNode(pl, pa) {
   //    var o = this;
   //    var nc = o._allNodes.count();
   //    var nl = null;
   //    var na = null;
   //    if (!pl) {
   //       for (var i = 0; i < nc; i++) {
   //          var n = o._allNodes.get(i);
   //          if (!n.isDelete) {
   //             n.show(true);
   //          }
   //       }
   //    } else {
   //       label = label.toLowerCase();
   //       var arAttr = null;
   //       var nAttrCount = 0;
   //       if (pa) {
   //          pa = pa.toLowerCase();
   //          arAttr = pa.split("|");
   //          nAttrCount = arAttr.length;
   //       }
   //       for (var i = 0; i < nc; i++) {
   //          var n = o._allNodes.get(i);
   //          if (!n.isDelete) {
   //             nl = n.label.toLowerCase();
   //             if (arAttr) {
   //                na = n.linkAttr.toLowerCase();
   //                for (var s = 0; s < nAttrCount; s++) {
   //                   if (na.indexOf(arAttr[s]) != -1) {
   //                      n.show((nl.indexOf(label) != -1));
   //                      break;
   //                   }
   //                }
   //             } else {
   //                n.show((nl.indexOf(label) != -1));
   //             }
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>清空所有节点。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeView_clearAllNodes = function FDuiTreeView_clearAllNodes() {
   //    var o = this;
   //    // 清空节点
   //    var nodes = o._nodes;
   //    if (nodes) {
   //       var count = nodes.count();
   //       for (var i = count - 1; i >= 0; i--) {
   //          nodes.get(i).removeSelf();
   //       }
   //       nodes.clear();
   //    }
   //    o._allNodes.clear();
   //    // 清空焦点
   //    o._focusNode = null;
   // }

   // //==========================================================
   // // <T>清空处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeView_clear = function FDuiTreeView_clear() {
   //    var o = this;
   //    o.clearAllNodes();
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeView_dispose = function FDuiTreeView_dispose() {
   //    var o = this;
   //    // 清空属性
   //    o._nodes = MO.Lang.Object.dispose(o._nodes);
   //    o._allNodes = MO.Lang.Object.dispose(o._nodes);
   //    // 清空属性
   //    o._hNodePanel = null;
   //    o._hNodeForm = null;
   //    o._hHeadLine = null;
   //    // 父处理
   //    o.__base.FDuiContainer.dispose.call(o);
   // }
}