//==========================================================
// <T>界面菜单按键。</T>
//
//  hParent<TD>
//  hPanel<DIV>
// ┌-------------------------------------------------------------┐
// │ hForm<TABLE>                                                │
// │┌--------------┬---------------┬---------------┐         │
// ││hIconPanel<TD>│hSpacePanel<TD>│hLabelPanel<TD>│hLine<TR>│
// ││hIcon<IMG>    │               │               │         │
// │└--------------┴---------------┴---------------┘         │
// └-------------------------------------------------------------┘
//
// @face
// @author maocy
// @history 150121
//==========================================================
MO.FDuiSliderButton = function FDuiSliderButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiMenuButton);
   //..........................................................
   // @property
   o._icon            = MO.Class.register(o, new MO.APtyString('_icon'));
   o._iconDisable     = MO.Class.register(o, new MO.APtyString('_iconDisable'));
   o._hotkey          = MO.Class.register(o, new MO.APtyString('_hotkey'));
   o._action          = MO.Class.register(o, new MO.APtyString('_action'));
   //..........................................................
   // @style
   o._styleNormal     = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover      = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._stylePress      = MO.Class.register(o, new MO.AStyle('_stylePress'));
   o._styleDisable    = MO.Class.register(o, new MO.AStyle('_styleDisable'));
   o._styleIconPanel  = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   //..........................................................
   // @attribute
   o._disabled        = false;
   // @attribute
   o._listenersClick  = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   //..........................................................
   // @html
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   //..........................................................
   // @event
   o.onBuildPanel     = MO.FDuiSliderButton_onBuildPanel
   o.onBuild          = MO.FDuiSliderButton_onBuild;
   // @event
   o.onEnter          = MO.FDuiSliderButton_onEnter;
   o.onLeave          = MO.FDuiSliderButton_onLeave;
   o.onMouseDown      = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiSliderButton_onMouseDown);
   o.onMouseUp        = MO.Class.register(o, new MO.AEventMouseDown('onMouseUp'), MO.FDuiSliderButton_onMouseUp);
   //..........................................................
   // @method
   o.icon             = MO.FDuiSliderButton_icon;
   o.setIcon          = MO.FDuiSliderButton_setIcon;
   o.setLabel         = MO.FDuiSliderButton_setLabel;
   o.setHint          = MO.FDuiSliderButton_setHint;
   o.setEnable        = MO.FDuiSliderButton_setEnable;
   o.click            = MO.FDuiSliderButton_click;
   o.dispose          = MO.FDuiSliderButton_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDuiSliderButton_onBuildPanel = function FDuiSliderButton_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Normal'));
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDuiSliderButton_onBuild = function FDuiSliderButton_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   // 设置面板
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   // 建立表单
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   // 建立图标
   if(o._icon){
      var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hIconPanel, null, o._icon);
   }
   // 建立分割
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   // 建立标签
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      // 设置颜色
      if(o._foreColor){
         hLabelPanel.style.color = o._foreColor;
      }
      // 设置标签
      o.setLabel(o._label);
   }
   // 建立热键
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   // 建立提示
   if(o._hint){
      o.setHint(o._hint);
   }
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiSliderButton_onEnter = function FDuiSliderButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiSliderButton_onLeave = function FDuiSliderButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiSliderButton_onMouseDown = function FDuiSliderButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}

//==========================================================
// <T>鼠标抬起处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiSliderButton_onMouseUp = function FDuiSliderButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}

//==========================================================
// <T>获得图标。</T>
//
// @method
// @return String 图标
//==========================================================
MO.FDuiSliderButton_icon = function FDuiSliderButton_icon(){
   return this._icon;
}

//==========================================================
// <T>设置图标。</T>
//
// @method
// @param icon:String 图标
//==========================================================
MO.FDuiSliderButton_setIcon = function FDuiSliderButton_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
MO.FDuiSliderButton_setLabel = function FDuiSliderButton_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}

//==========================================================
// <T>设置提示。</T>
//
// @method
// @param hint:String 提示
//==========================================================
MO.FDuiSliderButton_setHint = function FDuiSliderButton_setHint(hint){
   var o = this;
   o._hint = hint;
   var text = MO.Lang.String.nvl(hint);
   if(o._hint){
      if(o._hotkey){
         text += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = text;
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param p:enable:Boolean 是否可操作
//==========================================================
MO.FDuiSliderButton_setEnable = function FDuiSliderButton_setEnable(p){
   var o = this;
   o.__base.FDuiControl.setEnable.call(o, p);
   // 允许处理
   if(p){
      o._hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o._hIcon.src = RRes._iconPath(o._icon);
      }
   }else{
      o._hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o._hIcon.src = RRes._iconPath(o._iconDisable);
      }
   }
}

//==========================================================
// <T>点击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiSliderButton_click = function FDuiSliderButton_click(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
      // 执行监听信息
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      // 执行脚本
      if(o._action){
         eval(o._action);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiSliderButton_dispose = function FDuiSliderButton_dispose(){
   var o = this;
   // 释放属性
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine = MO.Window.Html.free(o._hLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hSpacePanel = MO.Window.Html.free(o._hSpacePanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}
