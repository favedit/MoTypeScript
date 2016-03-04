 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dScene = function FE3dScene(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MPoolAble, MO.MLinkerResource, MO.MProcessLoad);
   //..........................................................
   // @attribute
   o._ready                = false;
   o._dataReady            = false;
   o._dirty                = false;
   //..........................................................
   // @event
   o.onProcess             = MO.FE3dScene_onProcess;
   //..........................................................
   // @method
   o.construct             = MO.FE3dScene_construct;
   o.createRegion          = MO.FE3dScene_createRegion;
   // @method
   o.loadTechniqueResource = MO.FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = MO.FE3dScene_loadRegionResource;
   o.loadDisplayResource   = MO.FE3dScene_loadDisplayResource;
   o.loadLayerResource     = MO.FE3dScene_loadLayerResource;
   o.loadResource          = MO.FE3dScene_loadResource;
   // @method
   o.testReady             = MO.FE3dScene_testReady;
   o.dirty                 = MO.FE3dScene_dirty;
   o.processLoad           = MO.FE3dScene_processLoad;
   // @method
   o.dispose               = MO.FE3dScene_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_onProcess = function FE3dScene_onProcess(){
   var o = this;
   o.__base.FE3dSpace.onProcess.call(o);
   //..........................................................
   // 脏处理
   if(o._dirty){
      var s = o._region.allRenderables();
      for(var i = s.count() - 1; i >= 0; i--){
         var r = s.getAt(i);
         r.resetInfos();
      }
      o._dirty = false;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_construct = function FE3dScene_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
}

//==========================================================
// <T>创建区域。</T>
//
// @method
// @return FE3dRegion 区域
//==========================================================
MO.FE3dScene_createRegion = function FE3dScene_createRegion(){
   return MO.Class.create(MO.FE3dSceneRegion);
}

//==========================================================
// <T>加载技术资源。</T>
//
// @method
// @param p:resource:FE3sSceneTechnique 技术资源
//==========================================================
MO.FE3dScene_loadTechniqueResource = function FE3dScene_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param resource:FE3sSceneRegion 区域资源
//==========================================================
MO.FE3dScene_loadRegionResource = function FE3dScene_loadRegionResource(resource){
   var o = this;
   o._region.loadResource(resource);
   //............................................................
   // 设置相机
   var rc = resource.camera();
   var rcv = rc.projection();
   // 加载投影
   var c = o.camera();
   c._resource = rc;
   var cp = c.projection();
   c.position().assign(rc.position());
   c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
   c.update();
   // 设置投影
   cp.size().assign(o._graphicContext.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar();
   cp.update();
   //............................................................
   // 设置光源
   var rl = resource.light();
   var rlc = rl.camera();
   var rlv = rlc.projection();
   var light = o.directionalLight();
   light._resource = rl;
   var lightCamera = light.camera();
   var lightProjection = lightCamera.projection();
   // 设置光源相机
   lightCamera.position().set(1, 1, -1);
   lightCamera.lookAt(0, 0, 0);
   //lc.direction().assign(rlc.direction());
   //lc.update();
   lightCamera.position().assign(rlc.position());
   //lc.direction().assign(rlc.direction());
   lightCamera.update();
   // 设置光源投影
   //lp.size().set(2048, 2048);
   lightProjection.size().set(1024, 1024);
   //lp._angle = rlv.angle();
   lightProjection._angle = 60;
   lightProjection._znear = rlv.znear();
   lightProjection._zfar = rlv.zfar();
   lightProjection.update();
}

//==========================================================
// <T>加载显示资源。</T>
//
// @method
// @param p:resource:FE3sSceneDisplay 显示资源
//==========================================================
MO.FE3dScene_loadDisplayResource = function FE3dScene_loadDisplayResource(layer, resource){
   var o = this;
   // 加载场景显示资源
   var display = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneDisplay);
   display.linkGraphicContext(o);
   display.loadResource(resource);
   MO.Console.find(MO.FE3dSceneConsole).loadDisplay(display);
   // 放入集合
   layer.pushDisplay(display);
}

//==========================================================
// <T>加载天空资源。</T>
//
// @method
// @param resource:FE3sSceneLayer 层资源
//==========================================================
MO.FE3dScene_loadLayerResource = function FE3dScene_loadLayerResource(resource){
   var o = this;
   // 加载场景显示层资源
   var layer = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneLayer);
   layer.loadResource(resource);
   var displays = resource.displays();
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         o.loadDisplayResource(layer, display);
      }
   }
   o.registerLayer(resource.code(), layer)
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sScene 资源
//==========================================================
MO.FE3dScene_loadResource = function FE3dScene_loadResource(resource){
   var o = this;
   // 选择技术
   o.selectTechnique(o, MO.FE3dGeneralTechnique);
   // 加载技术资源
   o.loadTechniqueResource(resource.technique());
   // 加载区域资源
   o.loadRegionResource(resource.region());
   // 加载层集合
   var layers = resource.layers();
   if(layers){
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         o.loadLayerResource(layer);
      }
   }
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @param Boolean 是否准备好
//==========================================================
MO.FE3dScene_testReady = function FE3dScene_testReady(){
   return this._ready;
}

//==========================================================
// <T>场景脏处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_dirty = function FE3dScene_dirty(){
   this._dirty = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_processLoad = function FE3dScene_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   // 加载资源
   o.loadResource(o._resource);
   o._ready = true;
   // 派发事件
   var event = MO.Memory.alloc(MO.SEvent);
   event.sender = o;
   o.processLoadListener(event);
   MO.Memory.free(event);
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_dispose = function FE3dScene_dispose(){
   var o = this;
   o.__base.FE3dSpace.dispose.call(o);
}
