import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {BooleanUtil} from './runtime/common/lang/BooleanUtil';
import {Objects} from './runtime/common/lang/Objects';
import {Dictionary} from './runtime/common/lang/Dictionary';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {Property} from './runtime/common/reflect/Property';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {AssertUtil} from './runtime/common/AssertUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {Style} from './runtime/ui/Style';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {Component} from '../Component';
import {Control} from '../Control';
import {Container} from '../Container';
import {TreeNodeType} from './TreeNodeType';
import {TreeNodeCell} from './TreeNodeCell';
import {TreeView} from './TreeView';

//==========================================================
// <T>树目录节点组件。</T>
// 模板:
//  hPanel<TR>
// ┌---------------------------------------------┬-------------┐
// │ hNodePanel<TD>                              │             │
// │┌-----------┐┌----------┐┌------------┐│             │
// ││hImage<IMG>││hIcon<IMG>││hLabel<SPAN>││(Other cells)│
// │└-----------┘└----------┘└------------┘│             │
// └---------------------------------------------┴-------------┘
// Label = label (tag) [ note ]
//
// @component
// @author maocy
// @version 150119
//==========================================================
export class TreeNode extends Container {
   // 类型分组
   @Property('type_group', DataTypeEnum.String)
   public typeGroup;
   // 类型名称
   @Property('type_name', DataTypeEnum.String)
   public typeName;
   // 图标
   @Property('icon', DataTypeEnum.String)
   public icon: string;
   // 描述信息
   @Property('description', DataTypeEnum.String)
   public description: string;
   // 备注信息
   @Property('note', DataTypeEnum.String)
   public note: string;
   //..........................................................
   // @style
   @Style('Normal')
   public _styleNormal;
   @Style('Hover')
   public _styleHover;
   @Style('Select')
   public _styleSelect;
   @Style('Image')
   public _styleImage;
   @Style('Icon')
   public _styleIcon;
   @Style('IconDisable')
   public _styleIconDisable;
   @Style('Label')
   public _styleLabel;
   @Style('Cell')
   public _styleCell;
   //..........................................................
   // @attribute
   public tree: TreeView;
   public level: number;
   protected _valid: boolean;
   protected _child: boolean;
   public _checked: boolean;
   public _extended: boolean;
   protected _nodes: Objects<TreeNode>;
   protected _cells: Dictionary<TreeNodeCell>;
   // @attribute
   public statusLinked: boolean;
   protected _statusDisplay: boolean;
   protected _statusHover: boolean;
   protected _statusSelected: boolean;
   protected _statusLoaded: boolean;
   // 页面元素
   protected _hPanel: HTMLTableRowElement;
   protected _hNodePanel: HTMLTableCellElement;
   protected _hCheck: HTMLInputElement;
   protected _hImage: HTMLImageElement;
   protected _hIcon: HTMLImageElement;
   protected _hLabel: HTMLSpanElement;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.level = 0;
      this._statusDisplay = true;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createTableRow(this.styleName('Panel'));
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 查找树目录
      var tree = this.tree = <TreeView>this.findParent(TreeView);
      AssertUtil.debugNotNull(tree);
      AssertUtil.debugTrue(tree instanceof TreeView);
      // 建立底板
      var hPanel = this._hPanel;
      this.attachEvent(hPanel, EventEnum.Enter, this.onNodeEnter);
      this.attachEvent(hPanel, EventEnum.Leave, this.onNodeLeave);
      this.attachEvent(hPanel, EventEnum.MouseDown, this.onNodeClick);
      // 建立节点底版
      var hNodePanel = this._hNodePanel = context.appendTableCell(hPanel, this.styleName('Normal'));
      //hNodePanel.noWrap = true;
      hNodePanel.vAlign = 'middle';
      // 建立图片
      var hImage = this._hImage = context.appendIcon(hNodePanel, this.styleName('Image'), null, 16, 16);
      (hImage as any).__linkType = 'image';
      this.refreshImage();
      // 建立图标
      var hIcon = this._hIcon = context.appendIcon(hNodePanel, this.styleName('Icon'), null, 16, 16);
      (hIcon as any)._linkType = 'icon';
      this.setIcon(this.icon);
      // 建立复选框
      if (tree.optionCheck) {
         var hCheck = this._hCheck = context.appendCheck(hNodePanel);
         hCheck.width = '13px';
         hCheck.height = '13px';
         hCheck.style.borderWidth = '0px';
         this.setCheck(this._checked);
         //tree.linkEvent(this, 'onNodeCheckClick', hCheck);
      }
      // 建立显示文本
      this._hLabel = context.appendText(hNodePanel, this.styleName('Label'));
      this.setLabel(this.label);
      // 建立关联列
      var columns = tree.nodeColumns;
      if (columns) {
         var count = columns.count();
         for (var n = 0; n < count; n++) {
            var column = columns.at(n);
            var nodeCell = ClassUtil.create(TreeNodeCell);
            nodeCell._column = column;
            nodeCell.build(context);
            this.push(nodeCell);
         }
      }
   }

   //==========================================================
   // <T>鼠标移进节点的事件。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onNodeEnter(sender, event) {
      var tree = this.tree;
      if (!tree.focusNode || (tree.focusNode && (tree.focusNode != this))) {
         this._statusHover = true;
         this.refreshStyle();
         // 发送事件
         // var event = new SEvent();
         // event.tree = tree;
         // event.node = this;
         // tree.processNodeEnterListener(event);
         // event.dispose();
      }
   }

   //==========================================================
   // <T>鼠标移出节点的事件。</T>
   //
   // @method
   // @param event:TEvent 事件对象
   //==========================================================
   public onNodeLeave(sender, event) {
      var tree = this.tree;
      if (!tree.focusNode || (tree.focusNode && (tree.focusNode != this))) {
         this._statusHover = false;
         this.refreshStyle();
         // 发送事件
         // var event = new SEvent();
         // event.tree = tree;
         // event.node = this;
         // tree.processNodeLeaveListener(event);
         // event.dispose();
      }
   }

   //==========================================================
   // <T>鼠标点击节点的事件。</T>
   //
   // @param event 事件对象
   //==========================================================
   public onNodeClick(sender, event) {
      var tree = this.tree;
      var tagName = event.targetElement.tagName;
      // 处理复选框的情况
      if (tagName == 'INPUT') {
         return;
      }
      // 检查点击的是展开图标还是节点图标
      var isImg = false;
      if (tagName == 'IMG') {
         isImg = ('image' == event.hSender._linkType);
      }
      // 查询点击节点是否已获焦点对象的父节点
      var isParent = false;
      var find: any = tree.focusNode;
      while (find) {
         if (find == this) {
            isParent = true;
            break;
         }
         find = find.parent;
      }
      // 设置焦点节点
      if (!isImg || (isImg && (isParent || !this._child))) {
         tree.selectNode(this, true);
      }
      // 判断是否需要加载节点
      if (!this._statusLoaded && this._child) {
         this.extend(true);
         if (!isImg) {
            tree.nodeClick(this);
         }
      } else {
         // 已经是加载过的节点
         if (this._child) {
            if (this.isFolder()) {
               this.extend(!this._extended);
            } else {
               if (isImg) {
                  this.extend(!this._extended);
               } else {
                  this.extend(true);
               }
            }
         }
         if ((isImg && isParent) || (isImg && !this._child) || !isImg) {
            tree.nodeClick(this);
         }
      }
   }

   //==========================================================
   // <T>查找类型。</T>
   //
   // @return 类型
   //==========================================================
   public findType(): TreeNodeType {
      var tree = this.tree;
      var typeName = this.typeName;
      var type = null;
      if (!StringUtil.isEmpty(typeName)) {
         type = tree.findType(typeName);
      }
      return type;
   }

   //==========================================================
   // <T>设置类型代码。</T>
   //
   // @param value 类型代码
   //==========================================================
   public setTypeCode(value) {
      this.typeName = value;
      this.setIcon();
   }

   //==========================================================
   // <T>刷新标签内容。</T>
   //==========================================================
   public refreshLabel() {
      var hLabel = this._hLabel;
      if (hLabel) {
         var text = '';
         if (!StringUtil.isEmpty(this.label)) {
            text = '&nbsp;' + this.label;
         }
         if (!StringUtil.isEmpty(this.description)) {
            text += '&nbsp;<FONT color=blue>(' + this.description + ')</FONT>';
         }
         if (!StringUtil.isEmpty(this.note)) {
            text += '&nbsp;<FONT color=green>[ ' + this.note + ' ]</FONT>';
         }
         hLabel.innerHTML = text;
      }
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @param label 标签
   //==========================================================
   public setLabel(label: string) {
      this.label = StringUtil.empty(label);;
      this.refreshLabel();
   }

   //==========================================================
   // <T>设置描述。</T>
   //
   // @param description 描述
   //==========================================================
   public setDescription(description: string) {
      this.description = StringUtil.empty(description);
      this.refreshLabel();
   }

   //==========================================================
   // <T>设置备注。</T>
   //
   // @param note 备注
   //==========================================================
   public setNote(note: string) {
      this.note = StringUtil.empty(note);
      this.refreshLabel();
   }

   //==========================================================
   // <T>设置层次。</T>
   //
   // @param level 层次
   //==========================================================
   public setLevel(level) {
      // 设置属性
      this.level = level;
      // 设置页面
      var hPanel = this._hNodePanel;
      if (hPanel) {
         hPanel.style.paddingLeft = (this.tree.indent * level) + 'px';
      }
   }

   //==========================================================
   // <T>获取指定名称的格子。</T>
   //
   // @param name 名称
   // @return 格子
   //==========================================================
   public cell(name: string): TreeNodeCell {
      return this._cells.get(name);
   }

   //==========================================================
   // <T>获取节点选取。</T>
   //
   // @return 是否选取
   //==========================================================
   public isChecked() {
      return this._checked;
   }

   //==========================================================
   // <T>设置选中。</T>
   //
   // @param flag 选中
   //==========================================================
   public setCheck(flag: boolean) {
      this._checked = flag;
      // 属性集合控制
      var attributes = this.attributes;
      if (attributes) {
         var value = attributes.get('checked');
         if (!StringUtil.isEmpty(value)) {
            this._checked = BooleanUtil.parse(value);
            if (this._hCheck) {
               this._hCheck.checked = this._checked;
            }
         }
      }
   }

   //==========================================================
   // <T>刷新位图。</T>
   //==========================================================
   public refreshImage() {
      var tree = this.tree;
      var hImage = this._hImage;
      var icon = this._child ? tree.iconPlus : tree.iconNode;
      hImage.src = this.renderContext.iconPath(icon);
   }

   //==========================================================
   // <T>计算位图。</T>
   //
   // @method
   //==========================================================
   public calculateImage() {
      // var tree = this.tree;
      // var hImage = this._hImage;
      // var icon = null;
      // var count = this.nodeCount();
      // if (count) {
      //    icon = this._extended ? tree._iconMinus : tree._iconPlus;
      // } else {
      //    icon = tree._iconNode;
      // }
      // hImage.src = MO.RResource.iconPath(icon);
   }

   //==========================================================
   // <T>设置图标。</T>
   //
   // @param icon 图标
   //==========================================================
   public setIcon(icon?: string) {
      // 设置属性
      this.icon = icon;
      // 设置图标
      var hIcon = this._hIcon;
      if (hIcon) {
         var iconPath = null;
         if (this.icon) {
            iconPath = icon;
         } else {
            var type = this.findType();
            if (type) {
               iconPath = type.icon;
            }
         }
         if (iconPath) {
            hIcon.style.width = '16px';
            hIcon.style.height = '16px';
            hIcon.className = this._valid ? this.styleName('Icon') : this.styleName('IconDisable');
            hIcon.src = this.renderContext.iconPath(iconPath);
            HtmlUtil.visibleSet(hIcon, true);
         } else {
            HtmlUtil.visibleSet(hIcon, false);
         }
      }
   }

   //==========================================================
   // <T>是否是目录。</T>
   //
   // @method
   // @return Boolean 是否有子节点
   //==========================================================
   public isFolder() {
      var type = this.findType();
      if (type) {
         return type.storage == 'collections';
      }
      return false;
   }

   //==========================================================
   // <T>是否有子节点。</T>
   //
   // @return 是否有子节点
   //==========================================================
   public hasChild(): boolean {
      if (this._child) {
         var nodes = this._nodes;
         if (nodes) {
            return !nodes.isEmpty();
         }
      }
      return false;
   }

   //==========================================================
   // <T>查询顶层节点。</T>
   //
   // @return 顶层节点
   //==========================================================
   public topNode(): TreeNode {
      var node: any = this;
      while (node.parent) {
         if (node.parent instanceof TreeNode) {
            node = node.parent;
         } else {
            break;
         }
      }
      return this;
   }

   //==========================================================
   // <T>查询指定类型的顶层节点。</T>
   //
   // @param type 类型名称
   //==========================================================
   public topNodeByType(typeName: string): TreeNode {
      var node: TreeNode = this;
      while (node) {
         if (node.typeName == typeName) {
            return node;
         }
         node = node.parent as TreeNode;
      }
      return null;
   }

   //==========================================================
   // <T>获得节点数量。</T>
   //
   // @return 节点数量
   //==========================================================
   public nodeCount() {
      var nodes = this._nodes
      if (nodes) {
         return nodes.count();
      }
      return 0;
   }

   //==========================================================
   // <T>显示这个节点和他的子节点。</T>
   //==========================================================
   public show() {
      var tree = this.tree;
      // 显示自己
      HtmlUtil.visibleSet(this._hPanel, true);
      // 显示所有子节点
      var children = this.children;
      if (children) {
         var count = children.count();
         for (var i = 0; i < count; i++) {
            var node = children.at(i);
            if (node instanceof TreeNode) {
               // 判断是否要加到树目录
               // if (!node.statusLinked) {
               //    tree.appendNode(this, node);
               // }
               // 判断是否要显示
               if (node._statusDisplay) {
                  node.show();
                  //var hPanel = node.getPanel(PanelEnum.Panel);
                  //HtmlUtil.visibleSet(hPanel, true);
                  //if (node._extended) {
                  //   node.show();
                  //}
               }
            }
         }
      }
   }

   //==========================================================
   // <T>隐藏这个节点和他所有子节点。</T>
   //==========================================================
   public hide() {
      //var tree = this.tree;
      if (this._hPanel) {
         HtmlUtil.visibleSet(this._hPanel, false);
      }
      var children = this.children;
      if (children) {
         var count = children.count();
         for (var i = 0; i < count; i++) {
            var child = children.at(i);
            if (child instanceof TreeNode) {
               var childNode: TreeNode = child;
               childNode.hide();
            }
         }
      }
   }

   //==========================================================
   // <T>选中当前节点。</T>
   //
   // @param value 是否选中
   //==========================================================
   public select(flag: boolean) {
      this._statusSelected = flag;
      if (flag) {
         this._statusHover = false;
      }
      this.refreshStyle();
   }

   //==========================================================
   // <T>展开或隐藏子节点。</T>
   //
   // @param flag 标志
   //==========================================================
   public extend(flag: boolean) {
      var context = this.renderContext;
      var tree = this.tree;
      if (!this._statusLoaded && this._child) {
         // // 从服务器加载当前节点
         // if (tree.__loading) {
         //    //return alert(RContext.get('FTreeView:waiting'));
         //    return;
         // }
         // // 加载节点
         // tree.loadNode(this);
      } else {
         // 设置图片
         if (this._hImage && !this.hasChild()) {
            this._hImage.src = context.iconPath(tree.iconNode);
            return false;
         }
         this._extended = flag;
         if (this._child && this._hImage) {
            this._hImage.src = context.iconPath(flag ? tree.iconMinus : tree.iconPlus);
         }
         // 展开和隐藏节点
         var children = this.children;
         if (flag) {
            this.show();
         } else if (children) {
            var count = children.count();
            for (var i = count - 1; i >= 0; i--) {
               var child = children.get(i);
               if (child instanceof TreeNode) {
                  var childNode: TreeNode = child;
                  childNode.hide();
               }
            }
         }
      }
      // 刷新处理
      //tree.refresh();
   }

   // //==========================================================
   // // <T>展开或隐藏所有子节点。</T>
   // //
   // // @method
   // // @param p:flag:Boolean 标志
   // //==========================================================
   // MO.FDuiTreeNode_extendAll = function FDuiTreeNode_extendAll(p) {
   //    var o = this;
   //    // 当前节点
   //    o.extend(p);
   //    // 子节点
   //    var cs = o._components;
   //    if (cs) {
   //       var cc = cs.count();
   //       for (var i = 0; i < cc; i++) {
   //          var c = cs.value(i);
   //          c.extendAll(p);
   //       }
   //    }
   // }

   //==========================================================
   // <T>搜索当前节点下最后一个子节点。</T>
   //
   // @method
   // @return FDuiTreeNode 子节点
   //==========================================================
   public searchLast() {
      var nodes = this._nodes;
      if (nodes) {
         var count = nodes.count();
         for (var i = count - 1; i >= 0; i--) {
            var node = nodes.at(i)
            if (node.statusLinked) {
               return node.searchLast();
            }
         }
      }
      return this;
   }

   // //==========================================================
   // // <T>创建子节点。</T>
   // //
   // // @method
   // // @param xconfig:TNode 配置节点
   // //==========================================================
   // MO.FDuiTreeNode_createChild = function FDuiTreeNode_createChild(xconfig) {
   //    var o = this;
   //    var instance = null;
   //    if (xconfig.isName('Node') || xconfig.isName('TreeNode')) {
   //       instance = MO.Class.create(MO.FDuiTreeNode);
   //       instance._tree = o._tree;
   //    }
   //    return instance;
   // }

   // //==========================================================
   // // <T>追加一个字控件。</T>
   // //
   // // @method
   // // @param control:FDuiControl 控件
   // //==========================================================
   // MO.FDuiTreeNode_appendChild = function FDuiTreeNode_appendChild(control) {
   //    var o = this;
   //    if (MO.Class.isClass(control, MO.FDuiTreeNodeCell)) {
   //       o._hPanel.appendChild(control._hPanel);
   //    }
   // }

   //==========================================================
   // <T>追加一个子目录节点。</T>
   //
   // @param node 目录节点
   //==========================================================
   // public appendNode(node) {
   //    var tree = this.tree;
   //    tree.appendNode(this, node);
   //    //this.extend(true);
   // }

   //==========================================================
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      var tree = this.tree;
      // 增加一个树节点
      if (control instanceof TreeNode) {
         tree.appendNode(this, control as TreeNode);
         //this.appendNode(component);
         // this._statusLoaded = true;
         // // 增加子节点
         // var nodes = this._nodes;
         // if (!nodes) {
         //    nodes = this._nodes = new MO.TObjects();
         // }
         // component._tree = tree;
         // component._parent = this;
         // nodes.push(component);
         // tree._allNodes.pushUnique(component);
      }
      // 增加一个节点格子
      if (control instanceof TreeNodeCell) {
         // var cells = this.cells;
         // if (!cells) {
         //    cells = this.cells = new Dictionary<TreeNodeCell>();
         // }
         // component._parent = this;
         // component._tree = tree;
         // component._node = this;
         // cells.set(component._column._name, component);
      }
   }

   //==========================================================
   // <T>追加一个子组件。</T>
   //
   // @param child 子组件
   //==========================================================
   public push(child: Component) {
      super.push(child);
      //var tree = this.tree;
      // 增加一个树节点
      if (child instanceof TreeNode) {
         var treeNode = child as TreeNode;
         // 设置属性
         this._child = true;
         this._statusLoaded = true;
         // 增加子节点
         var nodes = this._nodes;
         if (!nodes) {
            nodes = this._nodes = new Objects<TreeNode>();
         }
         nodes.push(treeNode);
         // tree._allNodes.pushUnique(component);
      }
      // 增加一个节点格子
      if (child instanceof TreeNodeCell) {
         var cell = child as TreeNodeCell;
         // 增加格子
         var cells = this._cells;
         if (!cells) {
            cells = this._cells = new Dictionary<TreeNodeCell>();
         }
         // component._parent = this;
         // component._tree = tree;
         // component._node = this;
         //cells.set(cell._column._name, cell);
      }
   }


   // //==========================================================
   // // <T>移除指定子控件。</T>
   // //
   // // @method
   // // @param component:FComponent 组件对象
   // //==========================================================
   // MO.FDuiTreeNode_remove = function FDuiTreeNode_remove(component) {
   //    var o = this;
   //    // 检查类型
   //    if (MO.Class.isClass(component, MO.FDuiTreeNode)) {
   //       o._nodes.remove(component);
   //    }
   //    // 父处理
   //    o.__base.FDuiContainer.remove.call(o, component);
   // }

   // //==========================================================
   // // <T>删除当前节点。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNode_removeSelf = function FDuiTreeNode_removeSelf() {
   //    var o = this;
   //    // 未选中
   //    o._statusSelected = false;
   //    // 取消关联
   //    if (o._statusLinked) {
   //       // 删除所有子节点
   //       o.removeChildren();
   //       // 父节点刷新
   //       var parent = o._parent;
   //       if (MO.Class.isClass(parent, MO.FDuiTreeNode)) {
   //          parent.remove(o);
   //          parent.calculateImage();
   //       }
   //       // 删除自己
   //       o._tree.freeNode(o);
   //    }
   // }

   // //==========================================================
   // // <T>删除当前节点和所有子节点。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNode_removeChildren = function FDuiTreeNode_removeChildren() {
   //    var nodes = this._nodes;
   //    if (nodes) {
   //       var count = nodes.count();
   //       for (var i = count - 1; i >= 0; i--) {
   //          var node = nodes.get(i);
   //          if (node) {
   //             node.removeSelf();
   //          }
   //       }
   //       nodes.clear();
   //    }
   // }

   // //==========================================================
   // // <T>重置数据。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNode_reset = function FDuiTreeNode_reset() {
   //    var o = this;
   //    // 获取属性
   //    o._typeCode = null;
   //    o._guid = null;
   //    o._valid = true;
   //    o._icon = null;
   //    o._tag = null;
   //    o._note = null;
   //    o._child = false;
   //    o._checked = false;
   //    o._extended = true;
   //    // 还原状态
   //    o._statusLinked = false;
   //    o._statusDisplay = true;
   //    o._statusHover = false;
   //    o._extended = false;
   //    o._statusSelected = false;
   //    o._statusLoaded = false;
   //    o._level = 0;
   // }

   // //==========================================================
   // // <T>点击当前节点。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNode_click = function FDuiTreeNode_click() {
   //    var o = this;
   //    var tree = o._tree;
   //    tree.selectNode(o, true);
   //    tree.nodeClick(o);
   // }

   //==========================================================
   // <T>刷新节点的样式。</T>
   //==========================================================
   public refreshStyle() {
      var hCells = this._hPanel.cells;
      var count = hCells.length;
      for (var i = 0; i < count; i++) {
         var hCell = hCells[i];
         if (this._statusSelected) {
            hCell.className = this.styleName('Select');
         } else {
            if (this._statusHover) {
               hCell.className = this.styleName('Hover');
            } else {
               hCell.className = this.styleName('Normal');
            }
         }
      }
   }

   //==========================================================
   // <T>更新处理。</T>
   //==========================================================
   public update() {
      super.update();
      this.refreshLabel();
   }

   // //==========================================================
   // // <T>从数据节点中加载数据内容。</T>
   // //
   // // @method
   // // @param x:config:TNode 数据节点
   // //==========================================================
   // MO.FDuiTreeNode_propertyLoad = function FDuiTreeNode_propertyLoad(x) {
   //    var o = this;
   //    var t = o._tree;
   //    o.__base.FDuiContainer.propertyLoad.call(o, x);
   //    // 加载属性
   //    var attributes = o._attributes;
   //    if (attributes) {
   //       attributes.append(x.attrs);
   //    }
   //    var ap = x.get('attributes')
   //    if (ap) {
   //       o._attributes.unpack(ap);
   //    }
   // }

   // //==========================================================
   // // <T>存储数据内容到数据节点中。</T>
   // //
   // // @method
   // // @param x:config:TNode 数据节点
   // //==========================================================
   // MO.FDuiTreeNode_propertySave = function FDuiTreeNode_propertySave(x) {
   //    var o = this;
   //    o.__base.FDuiContainer.propertySave.call(o, x);
   //    // Property
   //    var t = o.type();
   //    x.set('type_code', t._code);
   //    x.set('storage', t._storage);
   //    //x.set('attributes', o._attributes.pack());
   // }

   // //==========================================================
   // // <T>从数据节点中加载数据内容。</T>
   // //
   // // @method
   // // @param x:config:TXmlNode 数据节点
   // //==========================================================
   // MO.FDuiTreeNode_loadConfig = function FDuiTreeNode_loadConfig(x) {
   //    var o = this;
   //    // 重置数据
   //    o.reset();
   //    // 加载属性
   //    o.propertyLoad(x);
   //    // 设置内容
   //    o.setLabel(o._label);
   //    o.setCheck(o._checked);
   //    o.setImage();
   //    o.setIcon(o._icon);
   // }

   // //==========================================================
   // // <T>释放对象。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNode_dispose = function FDuiTreeNode_dispose() {
   //    var o = this;
   //    o._hNodePanel = null;
   //    o._hImage = null;
   //    o._hIcon = null;
   //    o._hCheck = null;
   //    o._hLabel = null;
   //    o.__base.FDuiContainer.dispose.call(o);
   // }

   // //==========================================================
   // // <T>获得运行时内部信息。</T>
   // //
   // // @method
   // // @param s:dump:TString 调试内容
   // //==========================================================
   // MO.FDuiTreeNode_innerDump = function FDuiTreeNode_innerDump(s) {
   //    var o = this;
   //    s.append(RClass.name(o));
   //    s.append('[level=', o._level);
   //    if (o._typeCode) {
   //       s.append(' type=', o._typeCode.name);
   //    }
   //    s.append(', icon=', o._icon);
   //    s.append(', caption=', o._label);
   //    s.append(', child=', o._child);
   //    s.append(']');
   // }


   // //==========================================================
   // // <T>重新加载节点。</T>
   // //
   // // @method
   // // @param t:top:Boolean 是否顶层节点
   // //==========================================================
   // MO.FDuiTreeNode_reload = function FDuiTreeNode_reload(t) {
   //    var o = this;
   //    if (t) {
   //       o._tree.reload();
   //    } else {
   //       o._tree.reloadNode(o);
   //    }
   // }

   // //==========================================================
   // // <T>重新加载父节点。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNode_reloadParent = function FDuiTreeNode_reloadParent() {
   //    var o = this;
   //    if (o.parentNode) {
   //       o._tree.reloadNode(o.parentNode);
   //    } else {
   //       o._tree.reload();
   //    }
   // }

   // //==========================================================
   // // <T>加载一个查询节点。</T>
   // //
   // // @method
   // // @param x:node:TNode 设置节点
   // //==========================================================
   // MO.FDuiTreeNode_loadQuery = function FDuiTreeNode_loadQuery(x) {
   //    var o = this;
   //    var sl = MO.Lang.String.nvl(x.get('label'), o._label);
   //    var sn = MO.Lang.String.nvl(x.get('note'), o._note);
   //    var text = '&nbsp;' + sl;
   //    if (!MO.Lang.String.isEmpty(sn)) {
   //       text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   //    }
   //    o._hLabel.innerHTML = text;
   //    if (x.contains('visible')) {
   //       o._statusDisplay = RBool.isTrue(x.get('visible'));
   //       o.setVisible(o._statusDisplay);
   //    }
   // }

   // MO.FDuiTreeNode_findByName = function FDuiTreeNode_findByName(n) {
   //    var o = this;
   //    if (o.name == n) {
   //       return o;
   //    }
   //    var cs = o.components;
   //    if (cs) {
   //       var cc = cs.count;
   //       for (var i = 0; i < cc; i++) {
   //          var c = cs.value(i);
   //          if (c) {
   //             if (c.name == n) {
   //                return c;
   //             }
   //             if (c.components) {
   //                var f = c.findByName(n);
   //                if (f) {
   //                   return f;
   //                }
   //             }
   //          }
   //       }
   //    }
   //    return null;
   // }

   // //==========================================================
   // // 到节点的子节点里找找一个节点
   // //
   // // @method
   // // @param u:uuid:String 节点的XML表示字符串
   // // @return FDuiTreeNode 节点对象
   // //==========================================================
   // MO.FDuiTreeNode_findByUuid = function FDuiTreeNode_findByUuid(u) {
   //    var o = this;
   //    if (o._guid == u) {
   //       return o;
   //    }
   //    var cs = o.components;
   //    if (cs) {
   //       for (var n = 0; n < cs.count; n++) {
   //          var c = cs.value(n);
   //          if (c) {
   //             if (c._guid == u) {
   //                return c;
   //             }
   //             if (c.components) {
   //                var f = c.findByUuid(u);
   //                if (f) {
   //                   return f;
   //                }
   //             }
   //          }
   //       }
   //    }
   //    return null;
   // }

   // //==========================================================
   // // 把改变过的节点存放到树的节点里
   // //
   // // @method
   // //==========================================================
   // MO.FDuiTreeNode_pushChanged = function FDuiTreeNode_pushChanged(trd) {
   //    var o = this;
   //    //if(o.checkChanged()){
   //    var d = new MO.TNode();
   //    d.attrs = o._attributes;
   //    if (d.attrs) {
   //       d.attrs.set('checked', MO.Lang.Boolean.toString(o.check()));
   //    }
   //    trd.push(d);
   //    //}
   //    if (o.components && o.components.count > 0) {
   //       var cc = o.components.count;
   //       for (var n = 0; n < cc; n++) {
   //          var c = o.components.value(n);
   //          if (MO.Class.isClass(c, FDuiTreeNode)) {
   //             c.pushChanged(trd);
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // 到节点的子节点里找找一个节点
   // //
   // // @method
   // // @param u:uuid:String 节点的XML表示字符串
   // // @return FDuiTreeNode 节点对象
   // //==========================================================
   // MO.FDuiTreeNode_checkChanged = function FDuiTreeNode_checkChanged() {
   //    var o = this;
   //    if (o._checked != o.check()) {
   //       return true;
   //    }
   //    return false;
   // }

   // //---------------------------------------------------
   // MO.FDuiTreeNode_getFullPath = function FDuiTreeNode_getFullPath() {
   //    var o = this;
   //    var path = '';
   //    if (o._label) {
   //       path = o._label;
   //    }
   //    if (o.parent) {
   //       var s = o.parent.getFullPath();
   //       if (!MO.Lang.String.isEmpty(s)) {
   //          path = s + "/" + path;
   //       }
   //    }
   //    return path;
   // }
}