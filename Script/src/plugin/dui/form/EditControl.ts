import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {Property} from './runtime/common/reflect/Property';
import {LabelModeEnum} from './runtime/ui/LabelModeEnum';
import {LabelPositionEnum} from './runtime/ui/LabelPositionEnum';
import {AlignEnum} from './runtime/ui/AlignEnum';
import {EventEnum} from './runtime/ui/EventEnum';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {Control} from '../Control';

//==========================================================
// <T>数据控件的基类。</T>
// <P>当对象实现MDrapable接口时候，才会创建下拉元素。</P>
//
//  hPanel<TABLE>
// ┌-----------------------------------┬-------------------------------------┐
// │ hLabelPanel<TD>                   │ hEditPanel<TD>                      │
// │ hLabelForm<TABLE>                 │ hEditForm<TABLE>                    │
// │                                   │ hEditLine<TR>                       │
// │┌--------------┬---------------┐│┌-----------------┬--------------┐│
// ││hIconPanel<TD>│hTextPanel<TD> │││hValuePanel<TD>  │hHintPanel<TD>││
// ││hIcon<IMG>    │hText<SPAN>    │││(Border)         │hHint<IMG>    ││
// │└--------------┴---------------┘│└-----------------┴--------------┘│
// └-----------------------------------┴-------------------------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
export class EditControl extends Control {
   // 标签模式
   @Property('label_mode_cd', DataTypeEnum.Enum, LabelModeEnum.All, LabelModeEnum)
   public labelModeCd: LabelModeEnum;
   // 标签位置
   @Property('label_position_cd', DataTypeEnum.Enum, LabelPositionEnum.Left, LabelPositionEnum)
   public labelPositionCd: LabelPositionEnum;
   // 标签宽度
   @Property('label_width', DataTypeEnum.String)
   public labelWidth: string;
   // 标签高度
   @Property('label_height', DataTypeEnum.String)
   public labelHeight: string;
   // 标签宽度
   @Property('label_align_cd', DataTypeEnum.Enum, AlignEnum.Left, AlignEnum)
   public labelAlignCd: AlignEnum;
   // 标签颜色
   @Property('label_color', DataTypeEnum.String)
   public labelColor: string;
   // 编辑单位
   @Property('edit_unit', DataTypeEnum.String)
   public editUnit: string;
   // 编辑宽度
   @Property('edit_width', DataTypeEnum.String)
   public editWidth: string;
   // 编辑高度
   @Property('edit_height', DataTypeEnum.String)
   public editHeight: string;
   // 编辑颜色
   @Property('edit_color', DataTypeEnum.String)
   public editColor: string;
   // //..........................................................
   // 设置内容样式
   protected _optionValueStyle: boolean;
   // 可编辑状态
   protected _statusEditable: boolean;
   // 内容热点状态
   protected _statusValueHover: boolean;
   // o._progressing            = false;
   // //..........................................................
   // 底板
   protected _hPanel: HTMLTableElement;
   // 标签面板
   protected _hLabelPanel: HTMLTableCellElement;
   // 标签容器
   protected _hLabelForm: HTMLTableElement;
   // 标签图标面板
   protected _hIconPanel: any;
   // 标签图标
   protected _hIcon: HTMLImageElement;
   // 标签文字面板
   protected _hTextPanel: any;
   // 标签文字
   protected _hText: any;
   // 编辑面板
   protected _hEditPanel: HTMLTableCellElement;
   // 编辑容器
   protected _hEditForm: HTMLTableElement;
   // 编辑控件
   protected _hEdit;
   // 编辑内容面板
   protected _hValuePanel: HTMLTableCellElement;
   // 编辑内容表单
   protected _hValueForm: any;
   // 内容变更底板
   protected _hChangePanel: any;
   // 内容变更图标
   protected _hChangeIcon: HTMLImageElement;
   // 下拉底板
   protected _hDropPanel: any;
   // 下拉图标
   protected _hDropIcon: HTMLImageElement;
   // 提示底板
   protected _hHintPanel;
   // 提示图标
   protected _hHintIcon;
   // 单位
   protected _hUnit;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.labelModeCd = LabelModeEnum.All;
      this.labelPositionCd = LabelPositionEnum.Left;
      this._optionValueStyle = true;
      this._statusEditable = true;
   }

   //==========================================================
   // <T>建立标签图标。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildLabelIcon(context: RenderContext) {
      // if (this._labelIcon) {
      //    this._hIcon = context.appendIcon(this._hIconPanel, null, this._labelIcon);
      // } else {
      //    this._hIcon = context.appendIcon(this._hIconPanel, null, 'n', 16, 16);
      // }
   }

   //==========================================================
   // <T>建立标签文本。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildLabelText(context: RenderContext) {
      this._hText = context.appendSpan(this._hTextPanel);
   }

   //==========================================================
   // <T>建立标签。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildLabel(context: RenderContext) {
      var hLabelForm = this._hLabelForm = context.appendTable(this._hLabelPanel, this.styleName('LabelPanel'));
      var hLabelLine = context.appendTableRow(hLabelForm);
      // 建立标签图标
      var hIconPanel = this._hIconPanel = context.appendTableCell(hLabelLine);
      hIconPanel.width = '20px';
      this.onBuildLabelIcon(context);
      // 建立标签文字
      var hTextPanel = this._hTextPanel = context.appendTableCell(hLabelLine);
      hTextPanel.noWrap = true;
      this.onBuildLabelText(context);
      // 设置标签尺寸
      HtmlUtil.setSize(hLabelForm, this.labelWidth, this.labelHeight);
      // 设置标签对齐
      if (this.labelAlignCd) {
         //hTextPanel.align = this._labelAlignCd;
         //hTextPanel.style.paddingRight = 4;
      }
      // 设置标签颜色
      if (this.labelColor) {
         this._hText.style.color = this.labelColor;
      }
   }

   //==========================================================
   // <T>鼠标进入修改标志。</T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onChangeEnter(e) {
      var o = this;
      //var t = null;
      //if(MO.Lang.String.isEmpty(o.dataValue)){
      //   t = RContext.get('MDuiEditChange:change.empty');
      //}else{
      //   t = RContext.get('MDuiEditChange:change.restore', o.dataValue);
      //}
      //o.hChangeIcon.title = t;
   }

   //==========================================================
   // <T>鼠标离开修改标志。</T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onChangeLeave(e) {
      var o = this;
      //var t = null;
      //if(MO.Lang.String.isEmpty(o.dataValue)){
      //   t = RContext.get('MDuiEditChange:change.empty');
      //}else{
      //   t = RContext.get('MDuiEditChange:change.restore', o.dataValue);
      //}
      //o.hChangeIcon.title = t;
   }

   //==========================================================
   // <T>鼠标点击修改标志。</T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onChangeClick(e) {
      //this.set(this.dataValue);
   }

   //==========================================================
   // <T>建立编辑修改标志。</T>
   //
   // @method
   // @param p:arguments:SArguments 参数集合
   //==========================================================
   public onBuildEditChange(context: RenderContext) {
      // 设置底板
      var hPanel = this._hChangePanel;
      hPanel.className = this.styleName('ChangePanel', EditControl);
      // 设置事件
      this.attachEvent(hPanel, EventEnum.Enter, this.onChangeEnter);
      this.attachEvent(hPanel, EventEnum.Leave, this.onChangeLeave);
      this.attachEvent(hPanel, EventEnum.Click, this.onChangeClick);
      // 建立图标
      this._hChangeIcon = context.appendIcon(hPanel, this.styleName('ChangeIcon', EditControl), 'control.change');
   }

   //==========================================================
   // <T>建立编辑内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
   }

   //==========================================================
   // <T>鼠标进入修改标志。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onDropEnter(e) {
      var o = this;
      //var t = null;
      //if(MO.Lang.String.isEmpty(o.dataValue)){
      //   t = RContext.get('MDuiEditDrop:Drop.empty');
      //}else{
      //   t = RContext.get('MDuiEditDrop:Drop.restore', o.dataValue);
      //}
      //o.hDropIcon.title = t;
   }

   //==========================================================
   // <T>鼠标离开修改标志。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onDropLeave(e) {
      var o = this;
      //var t = null;
      //if(MO.Lang.String.isEmpty(o.dataValue)){
      //   t = RContext.get('MDuiEditDrop:Drop.empty');
      //}else{
      //   t = RContext.get('MDuiEditDrop:Drop.restore', o.dataValue);
      //}
      //o.hDropIcon.title = t;
   }

   //==========================================================
   // <T>鼠标点击修改标志。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onDropClick(e) {
      //this.set(this.dataValue);
   }

   //==========================================================
   // <T>建立编辑下拉标志。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditDrop(context: RenderContext) {
      // 设置底板
      var hDropPanel = this._hDropPanel;
      hDropPanel.align = 'center';
      hDropPanel.className = this.styleName('DropPanel', EditControl);
      this.attachEvent(hDropPanel, EventEnum.Enter, this.onDropEnter);
      this.attachEvent(hDropPanel, EventEnum.Leave, this.onDropLeave);
      this.attachEvent(hDropPanel, EventEnum.Click, this.onDropClick);
      // 设置图标
      var hDropIcon = this._hDropIcon = context.appendIcon(hDropPanel, this.styleName('DropIcon'), 'control.drop');
      hDropIcon.align = 'absmiddle';
   }

   //==========================================================
   // <T>当该内容获得热点时的处理</T>
   //
   // @param event:TEvent 事件对象
   //==========================================================
   public onValueEnter(event) {
      this._statusValueHover = true;
      this.refreshStyle();
   }

   //==========================================================
   // <T>当该内容失去热点时的处理</T>
   //
   // @param event:TEvent 事件对象
   //==========================================================
   public onValueLeave(event) {
      this._statusValueHover = false;
      this.refreshStyle();
   }

   //==========================================================
   // <T>建立编辑器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEdit(context: RenderContext) {
      /// 建立控件表格
      var hEditForm = this._hEditForm = context.appendTable(this._hEditPanel, this.styleName('EditPanel'));
      var hEditLine = context.appendTableRow(hEditForm);
      // 建立编辑面板
      var hValuePanel = this._hValuePanel = context.appendTableCell(hEditLine);
      this.attachEvent(hValuePanel, EventEnum.Enter, this.onValueEnter);
      this.attachEvent(hValuePanel, EventEnum.Leave, this.onValueLeave);
      this.onBuildEditValue(context);
      // 设置大小
      HtmlUtil.setSize(hEditForm, this.editWidth, this.editHeight);
      //if(o.validRequire){
      //var hccc = o.hControlRow.insertCell();
      //hccc.width = 30;
      //hccc.style.border = '1px solid red';
      //hccc.align = 'center';
      //var hCk1 = o.hRight = document.createElement('IMG');
      //var hCk2 = o.hError = document.createElement('IMG');
      //hCk1.src = o.styleIconPath('Right', FDuiEditControl);
      //hCk2.src = o.styleIconPath('Error', FDuiEditControl);
      //hccc.appendChild(hCk1);
      //hccc.appendChild(hCk2);
      //hCk2.style.padding = 10;
      //hCk1.style.display = 'none';
      //hCk2.style.display = 'none';
      //}
      // 设置编辑框的信息
      // var he = this.hEdit;
      // if(he){
      //    if(this.editAlign){
      //       he.style.textAlign = this.editAlign;
      //    }
      //    // 关联编辑事件
      //    this.linkEvent(this, 'onFocus', he);
      //    this.linkEvent(this, 'onBlur', he);
      //    this.linkEvent(this, 'onDataClick', he);
      //    this.linkEvent(this, 'onDataDoubleClick', he);
      //    this.linkEvent(this, 'onDataKeyDown', he);
      //    this.linkEvent(this, 'onDataChange', he);
      // }
      // 建立提示区
      if (this.hint) {
         var hHintPanel = this._hHintPanel = context.appendTableCell(hEditLine);
         hHintPanel.width = '13px';
         hHintPanel.align = 'right';
         hHintPanel.vAlign = 'top';
         var hHintIcon = this._hHintIcon = context.appendIcon(hHintPanel, 'ctl.hint');
         hHintIcon.title = this.hint;
         //hHintIcon._pname = 'hHintIcon';
      }
      // 建立编辑单位信息
      if (this.editUnit) {
         var hUnit = this._hUnit = context.appendTableCell(hEditLine);
         hUnit.className = this.styleName('EditUnit');
         hUnit.innerHTML = '&nbsp;' + this.editUnit;
         //hUnit._pname = 'hUnit';
      }
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
   // <T>建立显示框架。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context: RenderContext) {
      // 处理宽度小于标签宽度和编辑框宽度的情况，将宽度值设置为空
      //if(o.labelWidth && o.editWidth && o.width){
      //   if(MO.Lang.Integer.parse(o.width) < MO.Lang.Integer.parse(o.labelWidth) + MO.Lang.Integer.parse(o.editWidth)){
      //      o.width = null;
      //   }
      //}
      //..........................................................
      // 建立底板控件
      super.onBuild(context);
      var hPanel = this._hPanel;
      //..........................................................
      // 建立标签和控件区域
      var labelModeCd = this.labelModeCd;
      var hLabelPanel = null;
      var hEditPanel = null;
      if (labelModeCd == LabelModeEnum.Label) {
         // 只建立标签的情况
         hLabelPanel = context.appendTableCell(context.appendTableRow(hPanel));
      } else if (labelModeCd == LabelModeEnum.Hidden) {
         // 只建立编辑框的情况
         hEditPanel = context.appendTableCell(context.appendTableRow(hPanel));
      } else {
         // 全部建立的情况
         var labelPositionCd = this.labelPositionCd;
         if (labelPositionCd == LabelPositionEnum.Top) {
            hLabelPanel = context.appendTableRowCell(hPanel);
            hEditPanel = context.appendTableRowCell(hPanel);
         } else if (labelPositionCd == LabelPositionEnum.Right) {
            var hRow = context.appendTableRow(hPanel);
            hEditPanel = context.appendTableCell(hRow);
            hLabelPanel = context.appendTableCell(hRow);
         } else if (labelPositionCd == LabelPositionEnum.Bottom) {
            hEditPanel = context.appendTableRowCell(hPanel);
            hLabelPanel = context.appendTableRowCell(hPanel);
         } else {
            var hRow = context.appendTableRow(hPanel);
            hLabelPanel = context.appendTableCell(hRow);
            hEditPanel = context.appendTableCell(hRow);
         }
      }
      this._hLabelPanel = hLabelPanel;
      this._hEditPanel = hEditPanel;
      //..........................................................
      // 建立标签对象
      if (hLabelPanel) {
         this.onBuildLabel(context);
         hLabelPanel.appendChild(this._hLabelForm);
         // 设置名称
         this.setLabel(this.label);
         // 标签操作
         //var hl = o.hLabel;
         //if(hl){
         //   // 设置必须检查
         //   if(o.validRequire){
         //      hl.style.color = EUiColor.Require;
         //   }
         //   // 如果当前控件支持列表接口
         //   if(MO.Class.isClass(o, MListView)){
         //      o.setLabelStyle(hl);
         //   }
         //}
      }
      //..........................................................
      // 建立控件对象
      if (hEditPanel) {
         this.onBuildEdit(context);
      }
      // 刷新样式
      this.refreshStyle();
   }

   // //==========================================================
   // // <T>处理工作模式转换。</T>
   // //
   // // @method
   // // @param event:SUiDispatchEvent 事件信息
   // // @return EEventStatus 处理状态
   // //==========================================================
   // MO.FDuiEditControl_oeMode = function FDuiEditControl_oeMode(event) {
   //    var o = this;
   //    o.__base.FDuiControl.oeMode.call(o, event);
   //    o.__base.MUiDisplay.oeMode.call(o, event);
   //    o.__base.MUiEditable.oeMode.call(o, event);
   //    // 根据工作模式获得设置信息
   //    //o._editable = o.canEdit(event.mode);
   //    //o._validable = o.canValid(event.mode);
   //    // 如果在加载中不设置工作模式，由加载处理设置信息
   //    //if(!o._progressing){
   //    //   o.setEditable(o._editable);
   //    //}
   //    // 返回处理结果
   //    return MO.EEventStatus.Stop;
   // }

   // //==========================================================
   // // <T>处理数据加载中和加载完成处理。</T>
   // //
   // // @method
   // // @param event:SUiDispatchEvent 事件信息
   // // @return EEventStatus 处理状态
   // //==========================================================
   // MO.FDuiEditControl_oeProgress = function FDuiEditControl_oeProgress(event) {
   //    var o = this;
   //    // 加载中不做处理
   //    if (o._progressing && event.enable) {
   //       return MO.EEventStatus.Stop;
   //    }
   //    // 根据状态设置信息
   //    o._progressing = event.enable;
   //    if (event.enable) {
   //       var ea = o._editable;
   //       o.setEditable(false);
   //       o._editable = ea;
   //    } else {
   //       o.setEditable(o._editable);
   //    }
   //    return MO.EEventStatus.Stop;
   // }

   // //==========================================================
   // // <T>加载数据单元处理。</T>
   // //
   // // @method
   // // @param event:SUiDispatchEvent 事件信息
   // // @return EEventStatus 处理状态
   // //==========================================================
   // MO.FDuiEditControl_oeLoadUnit = function FDuiEditControl_oeLoadUnit(event) {
   //    var o = this;
   //    var unit = event.unit;
   //    // 获得数据内容
   //    var dataName = o._dataName;
   //    if (!MO.Lang.String.isEmpty(dataName)) {
   //       var text = unit.get(dataName);
   //       o.set(text);
   //    }
   //    return MO.EEventStatus.Stop;
   // }

   // //==========================================================
   // // <T>存储数据单元处理。</T>
   // //
   // // @method
   // // @param event:SUiDispatchEvent 事件信息
   // // @return EEventStatus 处理状态
   // //==========================================================
   // MO.FDuiEditControl_oeSaveUnit = function FDuiEditControl_oeSaveUnit(event) {
   //    var o = this;
   //    var unit = event.unit;
   //    // 设置数据内容
   //    var dataName = o._dataName;
   //    if (!MO.Lang.String.isEmpty(dataName)) {
   //       var text = o.text();
   //       if (!MO.Lang.String.isEmpty(text)) {
   //          unit.set(dataName, text)
   //       }
   //    }
   //    return MO.EEventStatus.Stop;
   // }

   //==========================================================
   // <T>设置改变标志内容。</T>
   //
   // @param flag 标志
   //==========================================================
   public changeSet(flag: boolean) {
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @return 数据
   //==========================================================
   public get(): any {
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @param value 数据
   //==========================================================
   public set(value: any) {
   }

   //==========================================================
   // <T>获得底板。</T>
   //
   // @method
   // @param panelCd:EPanel 类型
   // @return HtmlTag 页面元素
   //==========================================================
   public getPanel(panelCd: PanelEnum) {
      if (panelCd == PanelEnum.Edit) {
         return this._hEdit;
      } else if (panelCd == PanelEnum.Focus) {
         return this._hEdit;
      }
      return super.getPanel(panelCd);
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @param value 标签内容
   //==========================================================
   public setLabel(value) {
      this.label = value;
      if (this._hText) {
         this._hText.innerHTML = StringUtil.nvl(value);
      }
   }

   //==========================================================
   // <T>设置编辑对象的可编辑性。</T>
   //
   // @param value 可编辑性
   //==========================================================
   public setEditable(value: boolean) {
      // 设置属性
      this._statusEditable = value;
      // 刷新样式
      this.refreshStyle();
   }

   // //==========================================================
   // // <T>获得编辑区大小。</T>
   // //
   // // @method
   // // @param rectangle:SRectangle 矩形
   // // @return SRectangle 矩形
   // //==========================================================
   // MO.FDuiEditControl_calculateValueRectangle = function FDuiEditControl_calculateValueRectangle(rectangle) {
   //    var o = this;
   //    if (!rectangle) {
   //       rectangle = new MO.SRectangle();
   //    }
   //    var hPanel = o._hValuePanel;
   //    var position = MO.Window.Html.clientPosition(hPanel);
   //    rectangle.left = position.x;
   //    rectangle.top = position.y;
   //    rectangle.width = hPanel.offsetWidth;
   //    rectangle.height = hPanel.offsetHeight;
   //    return rectangle;
   // }

   //==========================================================
   // <T>根据当前状态刷新样式。</T>
   //==========================================================
   public refreshStyle() {
      if (this._optionValueStyle) {
         var hForm = this._hValueForm;
         if (hForm) {
            if (this._statusEditable) {
               if (this._statusValueHover) {
                  hForm.className = this.styleName('ValueHover', EditControl);
               } else {
                  hForm.className = this.styleName('ValueNormal', EditControl);
               }
            } else {
               hForm.className = this.styleName('ValueReadonly', EditControl);
            }
         }
      }
   }

   //==========================================================
   // <T>释放对象。</T>
   //==========================================================
   public dispose() {
      // // 释放属性
      // this._labelSize = MO.Lang.Object.dispose(this._labelSize);
      // this._editSize = MO.Lang.Object.dispose(this._editSize);
      // // 释放页面元素
      this._hLabelPanel = HtmlUtil.dispose(this._hLabelPanel);
      this._hLabelForm = HtmlUtil.dispose(this._hLabelForm);
      // this._hIconPanel = MO.Window.Html.free(this._hIconPanel);
      // this._hIcon = MO.Window.Html.free(this._hIcon);
      // this._hTextPanel = MO.Window.Html.free(this._hTextPanel);
      // this._hText = MO.Window.Html.free(this._hText);
      // this._hEditPanel = MO.Window.Html.free(this._hEditPanel);
      // this._hEditForm = MO.Window.Html.free(this._hEditForm);
      // this._hValuePanel = MO.Window.Html.free(this._hValuePanel);
      // this._hDropPanel = MO.Window.Html.free(this._hDropPanel);
      // 父处理
      super.dispose();
   }
}