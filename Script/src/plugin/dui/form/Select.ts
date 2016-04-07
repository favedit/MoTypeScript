import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Property} from './runtime/common/reflect/Property';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {EditControl} from './EditControl';
import {SelectItem} from './SelectItem';

//==========================================================
// <T>下拉选择框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┬-----------------┐
// │hChangePanel<TD> │ hInputPanel<TD>      │ hDropPanel<TD>  │hValueLine<TR>
// │hChangeIcon<IMG> │┌------------------┐│┌-------------┐│
// │                 ││hInput<INPUT>     │││hDrop<IMG>   ││
// │                 │└------------------┘│└-------------┘│
// └-----------------┴----------------------┴-----------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
export class Select extends EditControl {
   // 输入宽度
   @Property('input_width', DataTypeEnum.String)
   public inputWidth: string;
   // 输入高度
   @Property('input_height', DataTypeEnum.String)
   public inputHeight: string;
   // 编辑长度
   @Property('edit_length', DataTypeEnum.Int32)
   public editLength: number;
   //    // @property
   //    o._inputSize = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   //    //..........................................................
   //    // @attribtue
   //    o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //    //..........................................................
   protected _emptyItem: SelectItem;
   // 页面元素
   protected _hValueForm: HTMLTableElement;
   protected _hValueLine: HTMLTableRowElement;
   protected _hInputPanel: HTMLTableCellElement;
   protected _hInput: HTMLInputElement;
   protected _hDropPanel: HTMLTableCellElement;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //this._inputSize = new MO.SSize2();
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
      var hValuePanel = this._hValuePanel;
      var hValueForm = this._hValueForm = context.appendTable(hValuePanel);
      var hValueLine = this._hValueLine = context.appendTableRow(hValueForm);
      HtmlUtil.setSize(hValueForm, this.inputWidth, this.inputHeight);
      //..........................................................
      // 建立改变栏
      this._hChangePanel = context.appendTableCell(hValueLine);
      this.onBuildEditChange(context);
      //..........................................................
      // 建立输入栏
      var hInputPanel = this._hInputPanel = context.appendTableCell(hValueLine, this.styleName('InputPanel'));
      var hInput = this._hInput = context.appendEdit(hInputPanel);
      //this.attachEvent(hInput, EventEnum.DoubleClick, this.onDoubleClick);
      //this.attachEvent(hInput, EventEnum.KeyDown, this.onKeyDown);
      //o.attachEvent('onInputEdit', hInput, o.onInputEdit);
      // 设置可以输入的最大长度
      if (this.editLength) {
         hInput.maxLength = this.editLength;
      }
      //..........................................................
      // 建立下拉栏
      var hDropPanel = this._hDropPanel = context.appendTableCell(hValueLine);
      this.onBuildEditDrop(context);
      //..........................................................
      // 创建空行
      var item = this._emptyItem = ClassUtil.create(SelectItem);
      item.build(context);
      this.push(item);
   }

   // //==========================================================
   // // <T>鼠标点击修改标志。</T>
   // //
   // // @method
   // // @param event:SEvent 事件信息
   // //==========================================================
   // MO.FDuiSelect_onDropClick = function FDuiSelect_onDropClick(event) {
   //    this.drop();
   // }

   // //==========================================================
   // // <T>响应编辑按键事件。</T>
   // //
   // // @method
   // // @param event:SEvent 事件信息
   // //==========================================================
   // MO.FDuiSelect_onKeyDown = function FDuiSelect_onKeyDown(event) {
   //    var o = this;
   //    // 获得编辑中
   //    var editor = o._editor;
   //    if (editor && editor._statusEditing && (editor._source == o)) {
   //       editor.onEditKeyDown(event);
   //       return;
   //    }
   //    // 下拉展开
   //    if (event.keyCode == MO.EKeyCode.Down) {
   //       o.drop();
   //    }
   // }

   // //==========================================================
   // // <T>构建对象。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSelect_construct = function FDuiSelect_construct() {
   //    var o = this;
   //    o.__base.FDuiEditControl.construct.call(o);
   //    // 设置属性
   //    o._inputSize = new MO.SSize2();
   // }

   // //==========================================================
   // // <T>创建子节点。</T>
   // //
   // // @method
   // // @param xconfig:TXmlNode 配置节点
   // // @return FDuiControl 控件
   // //==========================================================
   // MO.FDuiSelect_createChild = function FDuiSelect_createChild(xconfig) {
   //    // 创建实例
   //    var control = MO.Dui.Control.newInstance(xconfig);
   //    control._parent = this;
   //    return control;
   // }

   // //==========================================================
   // // <T>根据项目名称查找项目。</T>
   // //
   // // @method
   // // @param label:String 项目名称
   // // @return FDuiSelectItem 项目
   // //==========================================================
   // MO.FDuiSelect_findItemByLabel = function FDuiSelect_findItemByLabel(label) {
   //    var o = this;
   //    var components = o._components;
   //    if (components) {
   //       var count = components.count();
   //       for (var i = 0; i < count; i++) {
   //          var component = components.at(i);
   //          if (MO.Lang.String.equals(component.label(), label, true)) {
   //             return component;
   //          }
   //       }
   //    }
   //    return null;
   // }

   // //==========================================================
   // // <T>根据项目数据查找项目。</T>
   // //
   // // @method
   // // @param dataValue:String 项目数据
   // // @return FDuiSelectItem 项目
   // //==========================================================
   // MO.FDuiSelect_findItemByValue = function FDuiSelect_findItemByValue(dataValue) {
   //    var o = this;
   //    var components = o._components;
   //    if (components) {
   //       var count = components.count();
   //       for (var i = 0; i < count; i++) {
   //          var component = components.at(i);
   //          if (MO.Lang.String.equals(component.dataValue(), dataValue, true)) {
   //             return component;
   //          }
   //       }
   //    }
   //    return null;
   // }

   // //==========================================================
   // // <T>格式化内容为数据。</T>
   // //
   // // @method
   // // @param label:String 标签
   // // @return String 数据
   // //==========================================================
   // MO.FDuiSelect_formatValue = function FDuiSelect_formatValue(label) {
   //    var o = this;
   //    var item = o.findItemByLabel(label);
   //    if (item) {
   //       return MO.Lang.String.nvl(item.dataValue());
   //    }
   //    return item;
   // }

   // //==========================================================
   // // <T>格式化数据为内容。</T>
   // //
   // // @method
   // // @param value:String 数据
   // // @return String 标签
   // //==========================================================
   // MO.FDuiSelect_formatDisplay = function FDuiSelect_formatDisplay(value) {
   //    var o = this;
   //    var label = '';
   //    var item = o.findItemByValue(value);
   //    if (item) {
   //       label = MO.Lang.String.nvl(item.label());
   //    }
   //    return label;
   // }

   // //==========================================================
   // // <T>获得数据。</T>
   // //
   // // @method
   // // @return String 数据
   // //==========================================================
   // MO.FDuiSelect_get = function FDuiSelect_get() {
   //    var o = this;
   //    var value = null;
   //    // 获得项目
   //    var text = o._hInput.value;
   //    var item = o.findItemByLabel(text);
   //    if (item) {
   //       value = item.dataValue();
   //    }
   //    return value;
   // }

   // //==========================================================
   // // <T>设置数据。</T>
   // //
   // // @method
   // // @param value:String 数据
   // //==========================================================
   // MO.FDuiSelect_set = function FDuiSelect_set(value) {
   //    var o = this;
   //    var text = null;
   //    // 查找项目
   //    var item = o.findItemByValue(value);
   //    if (item) {
   //       text = item.label();
   //    }
   //    // 设置内容
   //    o._hInput.value = MO.Lang.String.nvl(text);
   //    // 设置修改状态
   //    o.changeSet(false);
   // }

   // //==========================================================
   // // <T>设置项目。</T>
   // //
   // // @method
   // // @param item:FDuiSelectItem 项目
   // //==========================================================
   // MO.FDuiSelect_selectItem = function FDuiSelect_selectItem(item) {
   //    var o = this;
   //    // 设置显示
   //    o._hInput.value = MO.Lang.String.nvl(item.label());
   //    // 刷新数据
   //    o.refreshValue();
   // }

   // //==========================================================
   // // <T>刷新数据。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSelect_refreshValue = function FDuiSelect_refreshValue() {
   //    var o = this;
   //    // 内容改变通知
   //    o.processDataChangedListener(o);
   // }

   // //==========================================================
   // // <T>根据当前状态刷新样式。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSelect_refreshStyle = function FDuiSelect_refreshStyle() {
   //    var o = this;
   //    o.__base.FDuiEditControl.refreshStyle.call(o);
   //    o.__base.MDuiEditDrop.refreshStyle.call(o);
   //    // 设置编辑样式
   //    var hInput = o._hInput;
   //    var inputStyle = null;
   //    if (o._statusEditable) {
   //       if (o._statusValueHover) {
   //          inputStyle = 'InputHover';
   //       } else {
   //          inputStyle = 'InputNormal';
   //       }
   //    } else {
   //       inputStyle = 'InputReadonly';
   //    }
   //    hInput.className = o.styleName(inputStyle);
   //    hInput.readOnly = !o._statusEditable;
   // }

   // //==========================================================
   // // <T>下拉操作。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSelect_drop = function FDuiSelect_drop() {
   //    var o = this;
   //    //if(o.canDrop() && o.canEdit && o.items.count() > 0 && o._editable){
   //    if (o.hasComponent()) {
   //       //if(!o._editRefer){
   //       //   return RMessage.fatal(o, null, 'Edit refer is null.');
   //       //}
   //       // 获得内容
   //       var value = o.get();
   //       // 显示编辑框
   //       var editor = o._editor = MO.Console.find(MO.FDuiEditorConsole).focus(o, MO.FDuiSelectEditor, o._name);
   //       editor.buildItems(o);
   //       editor.set(value);
   //       editor.show();
   //    }
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSelect_dispose = function FDuiSelect_dispose() {
   //    var o = this;
   //    o.__base.FDuiEditControl.dispose.call(o);
   // }










   // //==========================================================
   // // <T>响应编辑完成事件。</T>
   // //
   // // @method
   // // @param e:editor:FEditor 编辑器
   // //==========================================================
   // MO.FDuiSelect_onEditEnd = function FDuiSelect_onEditEnd(e) {
   //    var o = this;
   //    if (e) {
   //       o.set(e.get());
   //       // 重新校验数据
   //       o._invalidText = o.validText(o.text());
   //       o.refreshStyle();
   //    }
   //    o.onDataEditEnd(o);
   // }

   // //==========================================================
   // // <T>加载设置。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSelect_loadConfig = function FDuiSelect_loadConfig(c) {
   //    var o = this;
   //    o.__base.FDuiEditControl.loadConfig.call(o, c);
   //    if (o.dataEmpty) {
   //       o.items.create();
   //    }
   //    // 如果不允许输入，则创建一个空白行作为清空
   //    if (!o.editCheck) {
   //       o.items.create('', '');
   //    }
   //    o.items.loadConfig(c);
   //    var ns = c.nodes;
   //    if (ns) {
   //       var nc = ns.count;
   //       for (var n = 0; n < nc; n++) {
   //          var p = ns.get(n);
   //          if (p.isName('Event')) {
   //             var e = MO.Class.create(FEvent);
   //             e.loadConfig(p);
   //             o.push(e);
   //          }
   //       }
   //    }
   //    return EStatus.Stop;
   // }

   // //==========================================================
   // // <T>失去焦点。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiSelect_doBlur = function FDuiSelect_doBlur() {
   //    var o = this;
   //    o.__base.FDuiEditControl.doBlur.call(o);
   //    if (o._editor) {
   //       o._editor.hide();
   //    }
   // }
}