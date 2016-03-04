//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
MO.REngine3d = function REngine3d(){
   var o = this;
   //..........................................................
   // @attribute
   o._setuped  = false;
   o._contexts = null;
   return o;
}

//==========================================================
// <T>配置处理</T>
//
// @method
//==========================================================
MO.REngine3d.prototype.onSetup = function RE3dEngine_onSetup(){
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   // 选取效果器
   effectConsole.register('select.select.flat', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.control', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.automatic', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.skeleton', MO.FG3dSelectSkeletonEffect);
   effectConsole.register('select.select.skeleton.4', MO.FG3dSelectSkeletonEffect);
   // 控件效果器
   effectConsole.register('control.control.automatic', MO.FE3dControlAutomaticEffect);
   effectConsole.register('control.control.control', MO.FE3dControlAutomaticEffect);
   // 通用效果器
   effectConsole.register('general.color.control', MO.FE3dControlAutomaticEffect);
   effectConsole.register('general.color.flat', MO.FE3dGeneralColorFlatEffect);
   effectConsole.register('general.color.fill', MO.FE3dGeneralColorFillEffect);
   effectConsole.register('general.color.automatic', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skin', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.parallax', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.video', MO.FE3dGeneralColorVideoEffect);
   effectConsole.register('general.color.video.mask', MO.FE3dGeneralColorVideoMaskEffect);
   effectConsole.register('general.color.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   // 阴影效果器
   effectConsole.register('shadow.depth.automatic', MO.FE3dShadowDepthAutomaticEffect);
   effectConsole.register('shadow.depth.skeleton', MO.FE3dShadowDepthSkeletonEffect);
   effectConsole.register('shadow.color.automatic', MO.FE3dShadowColorAutomaticEffect);
   effectConsole.register('shadow.color.skeleton', MO.FE3dShadowColorSkeletonEffect);
}

//==========================================================
// <T>卸载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.REngine3d.prototype.onUnload = function REngine3d_onUnload(event){
   this.dispose();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.REngine3d.prototype.setup = function REngine3d_setup(){
   var o = this;
   if(!o._setuped){
      // 设置处理
      o.onSetup();
      // 设置属性
      o._contexts = new MO.TObjects();
      // 注册事件
      MO.Window.lsnsUnload.register(o, o.onUnload);
      o._setuped = true;
   }
}

//==========================================================
// <T>获得环境集合。</T>
//
// @method
// @return TObjects 环境集合
//==========================================================
MO.REngine3d.prototype.contexts = function REngine3d_contexts(){
   return this._contexts;
}

//==========================================================
// <T>创建渲染环境。</T>
//
// @method
// @param clazz:Function 类对象
// @param hCanvas:HtmlCanvasTag 页面画板
// @param attributes:Object 参数集合
// @return FGraphicContext 绘制环境
//==========================================================
MO.REngine3d.prototype.createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
   var o = this;
   // 配置检查处理
   o.setup();
   // 创建类对象
   var context = MO.Class.create(clazz);
   if(attributes){
      context._optionAlpha = attributes.alpha;
      context._optionAntialias = attributes.antialias;
   }
   // 关联元素
   if(!context.linkCanvas(hCanvas)){
      return null;
   }
   // 保存环境
   o._contexts.push(context);
   return context;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.REngine3d.prototype.dispose = function REngine3d_dispose(){
   var o = this;
   var contexts = o._contexts;
   if(contexts){
      var count = contexts.count();
      for(var i = 0; i < count; i++){
         var context = contexts.at(i);
         context.dispose();
      }
      o._contexts = MO.Lang.Object.dispose(contexts);
   }
}
//..........................................................
// 实例化内容
MO.REngine3d = new MO.REngine3d();
MO.Graphic.Context3d = MO.REngine3d;
MO.Engine3d = MO.REngine3d;
