import {StringUtil} from './runtime/common/lang/StringUtil';
import {LabelModeEnum} from './runtime/ui/LabelModeEnum';
import {LabelPositionEnum} from './runtime/ui/LabelPositionEnum';
import {AlignEnum} from './runtime/ui/AlignEnum';
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
   // // @property
   public labelModeCd: LabelModeEnum;
   public labelPositionCd: LabelPositionEnum;
   public _labelSize;
   public _labelAlignCd: AlignEnum;
   public _labelColor: string;
   // // @property
   // o._editSize               = MO.Class.register(o, new MO.APtySize2('_editSize'));
   // o._editColor              = MO.Class.register(o, new MO.APtyString('_editColor'));
   // //..........................................................
   // // @style
   // o._styleLabelPanel        = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   // o._styleEditPanel         = MO.Class.register(o, new MO.AStyle('_styleEditPanel'));
   // o._styleValuePanel        = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   // o._styleValueNormal       = MO.Class.register(o, new MO.AStyle('_styleValueNormal'));
   // o._styleValueHover        = MO.Class.register(o, new MO.AStyle('_styleValueHover'));
   // o._styleValueReadonly     = MO.Class.register(o, new MO.AStyle('_styleValueReadonly'));
   // o._styleInputPanel        = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   // o._styleInputNormal       = MO.Class.register(o, new MO.AStyle('_styleInputNormal'));
   // o._styleInputHover        = MO.Class.register(o, new MO.AStyle('_styleInputHover'));
   // o._styleInputReadonly     = MO.Class.register(o, new MO.AStyle('_styleInputReadonly'));
   // //..........................................................
   // // @attribute
   // o._optionValueStyle       = true;
   // // @attribute
   // o._statusValueHover       = false;
   // o._progressing            = false;
   // //..........................................................
   // // @html <TD> 标签面板
   public _hLabelPanel: HTMLTableCellElement;
   // @html <TABLE> 标签容器
   public _hLabelForm: HTMLTableElement;
   // @html <TD> 标签图标面板
   public _hIconPanel;
   // @html <IMG> 标签图标
   public _hIcon;
   // @html <TD> 标签文字面板
   public _hTextPanel;
   // @html <SPAN> 标签文字
   public _hText;
   // // @html <TD> 编辑面板
   public _hEditPanel: HTMLTableCellElement;
   // @html <TABLE> 编辑容器
   public _hEditForm: HTMLTableElement;
   // @html <TD> 编辑内容面板
   public _hValuePanel: HTMLTableCellElement;
   //o.hHintPanel            = null;
   //o.hHintIcon             = null;

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
      //this._labelSize = new SSize2(0, 0);
      //this._editSize = new SSize2(0, 0);
   }

   // //==========================================================
   // // <T>当该内容获得热点时的处理</T>
   // //
   // // @method
   // // @param event:TEvent 事件对象
   // //==========================================================
   // MO.FDuiEditControl_onValueEnter = function FDuiEditControl_onValueEnter(event) {
   //    var o = this;
   //    o._statusValueHover = true;
   //    o.refreshStyle();
   // }

   // //==========================================================
   // // <T>当该内容失去热点时的处理</T>
   // //
   // // @method
   // // @param event:TEvent 事件对象
   // //==========================================================
   // MO.FDuiEditControl_onValueLeave = function FDuiEditControl_onValueLeave(event) {
   //    var o = this;
   //    o._statusValueHover = false;
   //    o.refreshStyle();
   // }

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
      //MO.Window.Html.setSize(hLabelForm, this._labelSize);
      // 设置标签对齐
      if (this._labelAlignCd) {
         //hTextPanel.align = this._labelAlignCd;
         //hTextPanel.style.paddingRight = 4;
      }
      // 设置标签颜色
      if (this._labelColor) {
         this._hText.style.color = this._labelColor;
      }
   }

   //==========================================================
   // <T>建立编辑内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
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
      //this.attachEvent('onValueEnter', hValuePanel);
      //this.attachEvent('onValueLeave', hValuePanel);
      this.onBuildEditValue(context);
      // 设置大小
      //MO.Window.Html.setSize(hEditForm, this._editSize);
      //if(o.editWidth){
      //hc.width = o.editWidth;
      //}
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
      /*
      // 设置编辑框的信息
      var he = o.hEdit;
      if(he){
         if(o.editAlign){
            he.style.textAlign = o.editAlign;
         }
         // 关联编辑事件
         o.linkEvent(o, 'onFocus', he);
         o.linkEvent(o, 'onBlur', he);
         o.linkEvent(o, 'onDataClick', he);
         o.linkEvent(o, 'onDataDoubleClick', he);
         o.linkEvent(o, 'onDataKeyDown', he);
         o.linkEvent(o, 'onDataChange', he);

      }
      // 建立提示区
      if(o.hint){
         var hp = o.hHintPanel = hcr.insertCell();
         hp.width = 13;
         hp.align = 'right';
         hp.vAlign = 'top';
         var hi = o.hHintIcon = context.appendIcon(hp, 'ctl.hint');
         hi._pname = 'hHintIcon';
         hi.title = o.hint;
      }
      // 建立编辑单位信息
      if(o.editUnit){
         var h = o.hUnit = o.hControlRow.insertCell();
         h.className = o.styleName('EditUnit');
         h._pname = 'hUnit';
         h.innerHTML = '&nbsp;'+o.editUnit;
      }*/
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
      //this.refreshStyle();
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

   // //==========================================================
   // // <T>获得底板。</T>
   // //
   // // @method
   // // @param panelCd:EPanel 类型
   // // @return HtmlTag 页面元素
   // //==========================================================
   // MO.FDuiEditControl_panel = function FDuiEditControl_panel(panelCd) {
   //    var o = this;
   //    if (MO.EPanel.Edit == panelCd) {
   //       return o._hEdit;
   //    } else if (MO.EPanel.Focus == panelCd) {
   //       return o._hEdit;
   //    }
   //    return o.__base.FDuiControl.panel.call(o, panelCd);
   // }

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

   // //==========================================================
   // // <T>设置编辑对象的可编辑性。</T>
   // //
   // // @method
   // // @param value:Boolean 可编辑性
   // //==========================================================
   // MO.FDuiEditControl_setEditable = function FDuiEditControl_setEditable(value) {
   //    var o = this;
   //    // 设置属性
   //    o._statusEditable = value;
   //    // 刷新样式
   //    o.refreshStyle();
   // }

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

   // //==========================================================
   // // <T>根据当前状态刷新样式。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditControl_refreshStyle = function FDuiEditControl_refreshStyle() {
   //    var o = this;
   //    if (o._optionValueStyle) {
   //       var hForm = o._hValueForm;
   //       if (hForm) {
   //          if (o._statusEditable) {
   //             if (o._statusValueHover) {
   //                hForm.className = o.styleName('ValueHover');
   //             } else {
   //                hForm.className = o.styleName('ValueNormal');
   //             }
   //          } else {
   //             hForm.className = o.styleName('ValueReadonly');
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>释放对象。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditControl_dispose = function FDuiEditControl_dispose() {
   //    var o = this;
   //    // 释放属性
   //    o._labelSize = MO.Lang.Object.dispose(o._labelSize);
   //    o._editSize = MO.Lang.Object.dispose(o._editSize);
   //    // 释放页面元素
   //    o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   //    o._hLabelForm = MO.Window.Html.free(o._hLabelForm);
   //    o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   //    o._hIcon = MO.Window.Html.free(o._hIcon);
   //    o._hTextPanel = MO.Window.Html.free(o._hTextPanel);
   //    o._hText = MO.Window.Html.free(o._hText);
   //    o._hEditPanel = MO.Window.Html.free(o._hEditPanel);
   //    o._hEditForm = MO.Window.Html.free(o._hEditForm);
   //    o._hValuePanel = MO.Window.Html.free(o._hValuePanel);
   //    o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   //    // 父处理
   //    o.__base.MDuiEditDrop.dispose.call(o);
   //    o.__base.MDuiEditChange.dispose.call(o);
   //    o.__base.FDuiControl.dispose.call(o);
   // }
}