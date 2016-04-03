import {Dictionary} from './runtime/common/lang/Dictionary';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {RenderContext} from './RenderContext';
import {Control} from './Control';

//==========================================================
// <T>所有容器控件的基类。</T>
//
// @author maocy
// @version 141231
//==========================================================
export class Container extends Control {
   // 控件集合
   // public _controls: Dictionary<Control>;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // //..........................................................
      // // @attributes
      // o._controls = null;
      // //..........................................................
      // // @process
      // o.oeDesign = MO.Method.empty;
   }

   // //==========================================================
   // // <T>创建一个控件容器。</T>
   // // <P>默认为DIV页面元素。</P>
   // //
   // // @param context 环境信息
   // //==========================================================
   // public onBuildPanel(context: RenderContext) {
   //    this._hPanel = context.createFragment();
   // }

   // //==========================================================
   // // <T>判断是否含有子控件。</T>
   // //
   // // @return 是否含有
   // //==========================================================
   // public hasControl() {
   //    var controls = this._controls;
   //    return controls ? !controls.isEmpty() : false;
   // }

   // //==========================================================
   // // <T>根据名称查找一个控件。</T>
   // //
   // // @param name 名称
   // // @return 控件
   // //==========================================================
   // public findControl(name: string): Control {
   //    var controls = this._controls;
   //    if (controls) {
   //       var count = controls.count();
   //       for (var i = 0; i < count; i++) {
   //          var control = controls.value(i);
   //          if (control.name == name) {
   //             return control;
   //          }
   //       }
   //    }
   //    return null;
   // }

   // //==========================================================
   // // <T>根据名称搜索一个控件。</T>
   // //
   // // @param name 名称
   // // @return 控件
   // //==========================================================
   // public searchControl(name: string): Control {
   //    var controls = this._controls;
   //    if (controls) {
   //       var count = controls.count();
   //       for (var i = 0; i < count; i++) {
   //          var control = controls.value(i);
   //          if (control.name == name) {
   //             return control;
   //          }
   //          if (control instanceof Container) {
   //             var findControl = control.searchControl(name);
   //             if (findControl) {
   //                return findControl;
   //             }
   //          }
   //       }
   //    }
   //    return null;
   // }


   // //==========================================================
   // // <T>获得控件集合。</T>
   // //
   // // @method
   // // @return TDictionary 控件集合
   // //==========================================================
   // MO.FDuiContainer_controls = function FDuiContainer_controls() {
   //    var o = this;
   //    var r = o._controls;
   //    if (r == null) {
   //       r = new MO.TDictionary();
   //       o._controls = r;
   //    }
   //    return r;
   // }

   // //==========================================================
   // // <T>根据底板类型得到相应的页面元素。</T>
   // //
   // // @method
   // // @param t:type:EPanel 底板类型
   // // @return HTML 页面元素
   // //==========================================================
   // MO.FDuiContainer_panel = function FDuiContainer_panel(t) {
   //    var o = this;
   //    if (t == MO.EPanel.Container) {
   //       return o._hPanel;
   //    }
   //    return o.__base.FDuiControl.panel.call(o, t);
   // }

   // //==========================================================
   // // <T>设置第一个可以获得焦点的子控件获得焦点。</T>
   // // <P>若有能获得焦点的控件，则返回第一个获得焦点的控件，若没有，则或什么都不返回。。</P>
   // //
   // // @method
   // // @return MDuiFocus 获得焦点的控件
   // //==========================================================
   // MO.FDuiContainer_focusFirstControl = function FDuiContainer_focusFirstControl() {
   //    var o = this;
   //    var cs = o._components;
   //    if (cs) {
   //       // 选择自己第一个可以获得焦点的控件
   //       var c = cs.count();
   //       for (var i = 0; i < c; i++) {
   //          var p = cs.valueAt(i);
   //          if (MO.Class.isClass(c, MO.MDuiFocus) && c.testFocus()) {
   //             // 不允许下拉控件获得第一个焦点
   //             if (!MO.Class.isClass(c, MO.FCalendar) && !MO.Class.isClass(c, MO.FSelect) && !MO.Class.isClass(c, MO.FNumber)) {
   //                return c.focus();
   //             }
   //          }
   //       }
   //       // 自己获得焦点
   //       MO.Console.find(MO.FFocusConsole).focus(o);
   //    }
   // }

   // //==========================================================
   // //<T>给当前控件的所有子控件设置属性。</T>
   // //
   // // @method
   // // @param p:property:Stirng 属性名称
   // // @param vs:values:Object 属性集合
   // //==========================================================
   // MO.FDuiContainer_setControlsProperty = function FDuiContainer_setControlsProperty(p, vs) {
   //    var o = this;
   //    var cs = o._controls;
   //    if (cs) {
   //       for (var i = cs.count() - 1; i >= 0; i--) {
   //          var c = cs.value(i);
   //          c[p] = vs[n];
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>递归存储所有子对象到XML设置信息中。</T>
   // //
   // // @method
   // // @param x:config:TNode XML节点
   // //==========================================================
   // MO.FDuiContainer_storeConfig = function FDuiContainer_storeConfig(x) {
   //    var o = this;
   //    // 存储当前组件信息
   //    x.name = MO.Class.name(o);
   //    o.saveConfig(x);
   //    // 存储所有子组件信息
   //    var ps = o._components;
   //    if (ps) {
   //       var c = ps.count();
   //       for (var i = 0; i < c; i++) {
   //          var p = ps.value(i);
   //          var xp = x.create(MO.Class.name(p));
   //          if (MO.Class.isClass(p, MO.FDuiContainer)) {
   //             p.storeConfig(xp);
   //          } else {
   //             p.saveConfig(xp);
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>创建子节点。</T>
   // //
   // // @method
   // // @param xconfig:TXmlNode 配置节点
   // // @return FDuiControl 控件
   // //==========================================================
   // public createChild(xconfig) {
   //    // // 创建实例
   //    // var control = MO.Dui.Control.newInstance(xconfig);
   //    // control._parent = this;
   //    // return control;
   // }

   //==========================================================
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(control: Control) {
      var hControlPanel = control.getPanel(PanelEnum.Panel);
      this._hPanel.appendChild(hControlPanel);
   }

   //==========================================================
   // <T>移除一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public removeDisplay(control: Control) {
   }

   // //==========================================================
   // // <T>将子控件放入自己的哈希表中</T>
   // //
   // // @method
   // // @param p:component:FComponent 组件对象
   // //==========================================================
   // public push(p) {
   //    // // 加载组件
   //    // this.__base.FDuiControl.push.call(this, p);
   //    // // 增加控件控件
   //    // if (MO.Class.isClass(p, MO.FDuiControl)) {
   //    //    // 存储控件
   //    //    this.controls().set(p._name, p);
   //    //    // 追加控件
   //    //    this.appendChild(p);
   //    // }
   // }

   // //==========================================================
   // // <T>移除指定子控件。</T>
   // //
   // // @method
   // // @param component:FComponent 组件对象
   // //==========================================================
   // public remove(component) {
   //    // // 检查类型
   //    // if (MO.Class.isClass(component, MO.FDuiControl)) {
   //    //    // 检查存在
   //    //    var controls = this._controls;
   //    //    if (!controls.contains(component.name())) {
   //    //       throw new MO.TError(this, 'Parameter component is not in this component. (name={1})', component.name());
   //    //    }
   //    //    // 移除处理
   //    //    controls.removeValue(component);
   //    //    // 移除控件
   //    //    this.removeChild(component);
   //    // }
   //    // // 父处理
   //    // this.__base.FDuiControl.remove.call(this, component);
   // }

   // //==========================================================
   // // <T>清空所有子控件。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiContainer_clear = function FDuiContainer_clear() {
   //    var o = this;
   //    // 清空控件
   //    var s = o._controls;
   //    if (s) {
   //       for (var i = s.count() - 1; i >= 0; i--) {
   //          o.removeChild(s.at(i));
   //       }
   //       s.clear();
   //    }
   //    // 父处理
   //    o.__base.FDuiControl.clear.call(o);
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiContainer_dispose = function FDuiContainer_dispose() {
   //    var o = this;
   //    // 释放控件集合
   //    var v = o._controls;
   //    if (v) {
   //       v.dispose();
   //       o._controls = null;
   //    }
   //    // 释放处理
   //    o.__base.FDuiControl.dispose.call(o);
   // }
}