import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {RenderContext} from './RenderContext';
import {Container} from './Container';
import {ListItem} from './ListItem';

//==========================================================
// <T>列表控件。</T>
//
//  hPanel<TABLE>
// ┌----------------------------------------┬-┐
// │ hForm<TABLE>                           │ │
// │┌------------------------------------┐│S│
// ││(LitItem)                           ││c│
// │├------------------------------------┤│r│
// ││(LitItem)                           ││o│
// │├------------------------------------┤│l│
// ││(LitItem)                           ││l│
// │└------------------------------------┘│ │
// └----------------------------------------┴-┘
//
// @class
// @author maocy
// @history 150224
//==========================================================
export class ListBox extends Container {
   //    o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiHorizontal, MO.MListenerClick);
   //    //..........................................................
   //    // @property
   //    o._sizeCd = MO.EUiSize.Horizontal
   //    //..........................................................
   //    // @style
   //    o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //    //..........................................................
   //    // @html
   //    o._hForm = null;

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      // 建立编辑控件
      this._hPanel = context.createTable(this.styleName('Panel'));
   }

   //==========================================================
   // <T>创建一个列表项目。</T>
   //
   // @param icon 图标
   // @param label 标签
   // @return 列表项目
   //==========================================================
   public createItem(icon, label) {
      var item = ClassUtil.create(ListItem);
      item.build(this._hPanel);
      item.setLabel(label);
      return item;
   }

   //==========================================================
   // <T>追加一个控件容器。</T>
   //
   // @method
   // @return control:FControl 控件
   //==========================================================
   public appendChild(control) {
      this._hPanel.appendChild(control._hPanel);
   }

   // //==========================================================
   // // <T>点击一个列表项目。</T>
   // //
   // // @method
   // // @param item:FDuiListItem 列表项目
   // //==========================================================
   // MO.FDuiListBox_clickItem = function FDuiListBox_clickItem(item) {
   //    var o = this;
   //    // 选中项目
   //    var components = o._components;
   //    if (components) {
   //       var count = components.count();
   //       for (var i = 0; i < count; i++) {
   //          var component = components.at(i);
   //          if (MO.Class.isClass(component, MO.FDuiListItem)) {
   //             component.setChecked(component == item);
   //          }
   //       }
   //    }
   //    // 事件处理
   //    var event = new MO.SEvent(o);
   //    event.item = item;
   //    o.processClickListener(event);
   //    event.dispose();
   // }

   // //==========================================================
   // // <T>清空处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListBox_clear = function FDuiListBox_clear() {
   //    var o = this;
   //    var components = o._components;
   //    if (components) {
   //       var count = components.count();
   //       for (var i = 0; i < count; i++) {
   //          var component = components.at(i);
   //          if (MO.Class.isClass(component, MO.FDuiListItem)) {
   //             o._hPanel.removeChild(component._hPanel);
   //          }
   //          component.dispose();
   //       }
   //       components.clear();
   //       o._controls.clear();
   //    }
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiListBox_dispose = function FDuiListBox_dispose() {
   //    var o = this;
   //    o.__base.FContainer.dispose.call(o);
   // }
}