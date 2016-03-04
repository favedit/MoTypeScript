//==========================================================
// <T>资源加载器。</T>
//
// @class
// @author maocy
// @version 160122
//==========================================================
MO.FResourceLoader = function FResourceLoader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   //..........................................................
   // @attribute
   o._resource      = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._url           = MO.Class.register(o, new MO.AGetSet('_url'));
   // @attribute
   o._statusLoading = MO.Class.register(o, new MO.AGetter('_statusLoading'));
   // @attribute
   o._loadListeners = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   //..........................................................
   // @method
   o.load           = MO.FResourceLoader_load;
   o.complete       = MO.FResourceLoader_complete;
   return o;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FResourceLoader_load = function FResourceLoader_load(){
   var o = this;
   o._statusLoading = true;
}

//==========================================================
// <T>完成处理。</T>
//
// @method
//==========================================================
MO.FResourceLoader_complete = function FResourceLoader_complete(){
   var o = this;
   o._statusLoading = false;
   // 加载事件处理
   o.processLoadListener();
}
