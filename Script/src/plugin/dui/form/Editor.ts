import {LoggerUtil} from './runtime/common/lang/LoggerUtil';
import {LayerEnum} from './runtime/ui/LayerEnum';
import {RenderContext} from '../RenderContext';
import {Control} from './Control';

//==========================================================
// <T>编辑器控件的基类。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
export class Editor extends Control {
   //    // @property
   //    o._visible = false;
   //    o._statusVisible = false;
   //    //..........................................................
   //    // @style
   //    o._styleEdit = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   public _statusEditing = false;
   public _source;
   //    // @html
   //    o._hEdit = null;
   //    // @listener
   public lsnEditBegin;
   public lsnEditCancel;
   public lsnEditEnd;

   // //==========================================================
   // // <T>处理开始编辑事件。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditor_onEditBegin = function FDuiEditor_onEditBegin() {
   //    this.editBegin();
   // }

   // //==========================================================
   // // <T>处理数据变更事件。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditor_onEditChanged = function FDuiEditor_onEditChanged() {
   //    var o = this;
   //    MO.Logger.debug(o, 'Edit changed');
   //    var g = o.storage = MO.Lang.Object.nvlObj(o.storage);
   //    if (g.value == o.value()) {
   //       if (o.changed) {
   //          //o._source.onEditChanged(o, false);
   //          o.changed = false;
   //       }
   //    } else {
   //       if (!o.changed) {
   //          //o._source.onEditChanged(o, true);
   //          o.changed = true;
   //       }
   //    }
   // }

   //==========================================================
   // <T>处理结束编辑事件。</T>
   //
   // @method
   //==========================================================
   public onEditEnd() {
      var source = this._source;
      // 编辑完成
      LoggerUtil.debug(this, 'Editor end. (control={1})', source);
      this.hide();
      // 处理完成事件
      if (this.lsnEditEnd) {
         this.lsnEditEnd.process(this);
      }
      // 清空数据
      source._editor = null;
      this._source = null;
      this._statusEditing = false;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      var hPanel = this._hPanel = context.createSpan(context);
      //hPanel.__linker = this;
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      this._hPanel.style.zIndex = LayerEnum.Editor;
   }

   // //==========================================================
   // // <T>设置属性。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditor_get = function FDuiEditor_get(name) {
   // }

   // //==========================================================
   // // <T>获取属性。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditor_set = function FDuiEditor_set(name, value) {
   // }

   // //==========================================================
   // // <T>失去焦点。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditor_doBlur = function FDuiEditor_doBlur() {
   //    var o = this;
   //    var s = o._source;
   //    if (s) {
   //       o.editCancel();
   //       if (MO.Class.isClass(s, MO.MDuiFocus)) {
   //          s.doBlur();
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>获得底板。</T>
   // //
   // // @method
   // // @param panelCd:EPanel 底板类型
   // //==========================================================
   // MO.FDuiEditor_panel = function FDuiEditor_panel(panelCd) {
   //    var o = this;
   //    if (panelCd == MO.EPanel.Edit) {
   //       return o._hEdit;
   //    } else if (panelCd == MO.EPanel.Focus) {
   //       return o._hEdit;
   //    }
   //    return o.__base.FDuiControl.panel.call(o, panelCd);
   // }

   // //==========================================================
   // // <T>关联控件。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditor_linkControl = function FDuiEditor_linkControl(c) {
   //    var o = this;
   //    o._source = c;
   // }

   //==========================================================
   // <T>开始编辑。</T>
   //
   // @method
   //==========================================================
   public editBegin() {
      var source = this._source;
      // 编辑开始
      LoggerUtil.debug(this, 'Editor begin. (control={1})', source);
      // 处理开始事件
      if (this.lsnEditCancel) {
         this.lsnEditCancel.process(this);
      }
      // 设置数据
      source._editor = this;
      this._statusEditing = true;
   }

   //==========================================================
   // <T>取消编辑。</T>
   //
   // @method
   //==========================================================
   public editCancel() {
      var source = this._source;
      // 编辑完成
      LoggerUtil.debug(this, 'Editor cancel. (control={1})', source);
      this.hide();
      // 处理取消事件
      if (this.lsnEditCancel) {
         this.lsnEditCancel.process(this);
      }
      // 清空数据
      source._editor = null;
      this._source = null;
      this._statusEditing = false;
   }

   //==========================================================
   // <T>结束编辑。</T>
   //
   // @method
   //==========================================================
   public editEnd() {
      this.onEditEnd();
   }

   //==========================================================
   // <T>重置操作。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this.lsnEditBegin = null;
      this.lsnEditCancel = null;
      this.lsnEditEnd = null;
   }

   // //==========================================================
   // // <T>设置控件的隐藏和显示。</T>
   // //
   // // @method
   // // @param p:visible:Boolean 是否显示
   // //==========================================================
   // MO.FDuiEditor_setVisible = function FDuiEditor_setVisible(p) {
   //    var o = this;
   //    o.__base.FDuiControl.setVisible.call(o, p);
   //    if (p) {
   //       o.editBegin();
   //       o.focus();
   //    }
   // }

   // //==========================================================
   // // <T>释放对象。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiEditor_dispose = function FDuiEditor_dispose() {
   //    var o = this;
   //    o.__base.FDuiControl.dispose.call(o);
   //    o._hEdit = null;
   // }
}