import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Property} from './runtime/common/reflect/Property';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from '../RenderContext';
import {EditControl} from './EditControl';

//==========================================================
// <T>文件编辑框。</T>
// 参照 http://blog.csdn.net/testcs_dn/article/details/8695532
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┐
// │hChangePanel<TD> │ hInputPanel<TD>      │hValueLine<TR>
// │hChangeIcon<IMG> │┌------------------┐│
// │                 ││hInput<INPUT>     ││
// │                 │└------------------┘│
// └-----------------┴----------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
export class ImageFile extends EditControl {
   // 输入宽度
   @Property('input_width', DataTypeEnum.String)
   public inputWidth: string;
   // 输入高度
   @Property('input_height', DataTypeEnum.String)
   public inputHeight: string;
   // 编辑长度
   @Property('edit_length', DataTypeEnum.Int32)
   public editLength: number;
   //    o._unit = MO.Class.register(o, new MO.APtyString('_unit'));
   //..........................................................
   // 页面元素
   protected _hValueForm;
   protected _hValueLine;
   protected _hInputPanel;
   protected _hInputEdit;
   protected _hInput;
   protected _hEditLine;
   protected _hBrowserPanel;
   protected _hBrowser;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildEditValue(context: RenderContext) {
      var hValuePanel = this._hValuePanel;
      hValuePanel.className = this.styleName('ValuePanel');
      var hValueForm = this._hValueForm = context.appendTable(hValuePanel);
      hValueForm.width = '100%';
      var hValueLine = this._hValueLine = context.appendTableRow(hValueForm);
      //..........................................................
      // 建立改变栏
      this._hChangePanel = context.appendTableCell(hValueLine);
      this.onBuildEditChange(context);
      //..........................................................
      // 建立输入栏
      var hInputPanel = this._hInputPanel = context.appendTableCell(hValueLine, this.styleName('InputPanel'));
      var hInputEdit = this._hInputEdit = context.appendEdit(hInputPanel, this.styleName('Input'));
      var hFile = this._hInput = context.appendFile(hInputPanel, this.styleName('File'));
      //this.attachEvent('onFileChange', hFile);
      //..........................................................
      var hBrowserPanel = this._hBrowserPanel = context.appendTableCell(hValueLine);
      hBrowserPanel.style.paddingLeft = '4px';
      var hBrowser = this._hBrowser = context.appendButton(hBrowserPanel, this.styleName('Browser'));
      hBrowser.value = '浏览...';
      //o.attachEvent('onInputEdit', he, o.onInputEdit);
      // 设置大小
      HtmlUtil.setSize(hInputPanel, this.inputWidth, this.inputHeight);
      HtmlUtil.setSize(hFile, this.inputWidth, this.inputHeight);
      // 设置可以输入的最大长度
      if (this.editLength) {
         hInputEdit.maxLength = this.editLength;
      }
   }

   //==========================================================
   // <T>浏览点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   public onFileChange(event) {
      // var hFile = this._hInput;
      // if (hFile.files) {
      //    if (hFile.files.length) {
      //       var file = hFile.files[0];
      //       // 设置文件内容
      //       var name = file.name;
      //       this._hInputEdit.value = name + ' (' + file.size + 'byte)';
      //       // 分发事件
      //       this.processDataChangedListener(event);
      //    }
      // }
   }

   //==========================================================
   // <T>格式化显示内容。</T>
   //
   // @method
   // @param p:value:String 数据
   // @return 内容
   //==========================================================
   public formatDisplay(p) {
      // var o = this;
      // var r = MO.Lang.String.nvl(p);
      // //if(ECase.Upper == o.editCase){
      // //   r = MO.Lang.String.toUpper(r);
      // //}else if(ECase.Lower == o.editCase){
      // //   r = MO.Lang.String.toLower(r);
      // //}
      // o._dataDisplay = r;
      // return r;
   }

   //==========================================================
   // <T>格式化数据内容。</T>
   //
   // @method
   // @param p:value:String 内容
   // @return 数据
   //==========================================================
   public formatValue(p) {
      return p;
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return String 数据
   //==========================================================
   public get() {
      // 获得显示
      //var r = this._hInput.value;
      //return r;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param p:value:String 数据
   //==========================================================
   public set(p) {
      // 设置显示
      //this._hInput.value = MO.Lang.String.nvl(p);
      //o.finded = v;
      //if(o.hChangeIcon){
      //   o.hChangeIcon.style.display = 'none';
      //}
   }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   public refreshValue() {
      // 内容改变通知
      // this.processDataChangedListener(this);
   }
}