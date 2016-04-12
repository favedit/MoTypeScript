import {PopupMenu} from '../menu/PopupMenu';
import {RenderContext} from './RenderContext';
import {Component} from './Component';
import {ToolButton} from './ToolButton';

//==========================================================
// <T>工具栏菜单按键。</T>
//
// @author maocy
// @history 150121
//==========================================================
export class ToolButtonMenu extends ToolButton {
   // @attribute
   protected _menu: PopupMenu;
   protected _statusDrop: boolean;
   //    //..........................................................
   //    // @html
   //    o._hDropPanel     = null;

   //==========================================================
   // <T>构建对象。</T>
   //==========================================================
   public constructor() {
      super();
      // 创建弹出窗口
      var menu = this._menu = new PopupMenu();
      menu.opener = this;
      this.push(menu);
   }

   // //==========================================================
   // // <T>构建页面对象。</T>
   // //
   // // @method
   // // @param e:event:TEvent 事件对象
   // //==========================================================
   // MO.FDuiToolButtonMenu_onBuild = function FDuiToolButtonMenu_onBuild(event){
   //    var o = this;
   //    o.__base.FDuiToolButton.onBuild.call(o, event);
   //    // 建立下拉按键
   //    var hDropPanel = o._hDropPanel = MO.Window.Builder.appendTableCell(o._hLine);
   //    o.onBuildDrop(hDropPanel);
   //    //o._hDropIcon = MO.Window.Builder.appendIcon(h, o.styleIcon('Drop'));
   //    //o.attachEvent('onDropClick', hDropPanel);
   //    // 建立弹出菜单
   //    o._menu.onBuild(event);
   // }

   // //==========================================================
   // // <T>鼠标进入按钮时处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiToolButtonMenu_onEnter = function FDuiToolButtonMenu_onEnter(event){
   //    var o = this;
   //    if(!o._statusDrop){
   //       o.__base.FDuiToolButton.onEnter.call(o, event);
   //       //if(!o._disabled){
   //       //   o._hDropIcon.src = o.styleIconPath('DropHover');
   //       //}
   //    }
   // }

   // //==========================================================
   // // <T>鼠标离开按钮时处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件对象
   // //==========================================================
   // MO.FDuiToolButtonMenu_onLeave = function FDuiToolButtonMenu_onLeave(event){
   //    var o = this;
   //    if(!o._statusDrop){
   //       o.__base.FDuiToolButton.onLeave.call(o, event);
   //       //if(!o._disabled){
   //          //o._hDropIcon.src = o.styleIconPath('Drop');
   //       //}
   //    }
   // }

   // //==========================================================
   // // <T>鼠标按下处理。</T>
   // //
   // // @method
   // // @param p:event:SEvent 事件
   // //==========================================================
   // MO.FDuiToolButtonMenu_onMouseDown = function FDuiToolButtonMenu_onMouseDown(){
   //    var o = this;
   //    //if(o.hintBox){
   //    //   o.hintBox.hide();
   //    //}
   //    if(!o._statusDrop){
   //       o._hForm.className = o.styleName('Press');
   //       o.doClick();
   //    }
   //    //if(!o._disabled){
   //    //}
   // }

   // //==========================================================
   // // <T>菜单失去焦点时处理。</T>
   // //
   // // @method
   // // @param e:event:TEvent 事件对象
   // //==========================================================
   // MO.FDuiToolButtonMenu_onBlur = function FDuiToolButtonMenu_onBlur(e){
   //    var o = this;
   //    //if(e){
   //    //   if(o._menu.testInRange(e)){
   //    //      return false;
   //    //   }
   //    //}
   //    //o.hPanel.className = o.style('Button');
   //    //o._menu.hide();
   // }

   // //==========================================================
   // // <T>创建子节点。</T>
   // //
   // // @method
   // // @param xconfig:TXmlNode 配置节点
   // // @return FDuiControl 控件
   // //==========================================================
   // MO.FDuiToolButtonMenu_createChild = function FDuiToolButtonMenu_createChild(xconfig){
   //    // 创建实例
   //    var control = MO.Dui.Control.newInstance(xconfig);
   //    control._parent = this;
   //    return control;
   // }

   //==========================================================
   // <T>添加一个菜单选项到这个菜单里。</T>
   //
   // @param component 组件
   //==========================================================
   public push(component: Component) {
      // if(component instanceof MenuButton){
      //    this._menu.push(component);
      // }else{
      //    this.__base.FDuiToolButton.push.call(this, component);
      // }
   }

   // //==========================================================
   // // <T>弹出下拉框。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiToolButtonMenu_drop = function FDuiToolButtonMenu_drop(flag){
   //    var o = this;
   //    if(!o._disabled){
   //       o._statusDrop = !o._statusDrop;
   //       if(o._statusDrop){
   //          o._hForm.className = o.styleName('Press');
   //          o._menu.show(o._hDropPanel, MO.EUiAlign.BottomRight);
   //          MO.Console.find(MO.FDuiPopupConsole).show(o._menu);
   //       }else{
   //          o._hForm.className = o.styleName('Normal');
   //          o._menu.hide();
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>点击处理。</T>
   // //
   // // @method
   // // @param p:event:SEvent 事件
   // //==========================================================
   // MO.FDuiToolButtonMenu_doClick = function FDuiToolButtonMenu_doClick(){
   //    var o = this;
   //    o.__base.FDuiToolButton.doClick.call(o);
   //    // 下拉处理
   //    o.drop(!o._statusDrop);
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiToolButtonMenu_dispose = function FDuiToolButtonMenu_dispose(){
   //    var o = this;
   //    // 释放处理
   //    o._hDropIcon = MO.Window.Html.free(o._hDropIcon);
   //    o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   //    // 父处理
   //    o.__base.FControl.dispose.call(o);
   // }
}