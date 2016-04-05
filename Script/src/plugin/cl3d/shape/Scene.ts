import {Event} from '../../runtime/common/lang/Event';
import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {Listeners} from '../../runtime/common/lang/Listeners';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {MemoryUtil} from '../../../runtime/common/MemoryUtil';
import {AssertUtil} from '../../runtime/common/AssertUtil';
import {ProcessLoadHook} from '../../../runtime/core/service/ProcessLoadHook';
import {Scene as BaseScene} from '../base/Scene';
import {SceneResource} from '../resource/SceneResource';
import {SceneLayer} from './SceneLayer';

//==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class Scene extends BaseScene {
   // 准备好
   public ready: boolean;
   // 资源对象
   public resource: SceneResource;
   // 加载钩子
   public loadHook: ProcessLoadHook;
   // 加载监听器
   public loadListeners: Listeners;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.loadHook = new ProcessLoadHook(this);
      this.loadListeners = new Listeners();
      // 创建显示层
      // var layer = this._layer = MO.Class.create(MO.FDisplayLayer);
      // this.registerLayer('Layer', layer);
      // // 创建精灵集合
      // this._sprites = new MO.TObjects();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.ready;
   }

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dScene_onProcess = function FE3dScene_onProcess(){
   //    var o = this;
   //    o.__base.FE3dSpace.onProcess.call(o);
   //    //..........................................................
   //    // 脏处理
   //    if(o._dirty){
   //       var s = o._region.allRenderables();
   //       for(var i = s.count() - 1; i >= 0; i--){
   //          var r = s.getAt(i);
   //          r.resetInfos();
   //       }
   //       o._dirty = false;
   //    }
   // }

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dScene_construct = function FE3dScene_construct(){
   //    var o = this;
   //    o.__base.FE3dSpace.construct.call(o);
   // }

   // //==========================================================
   // // <T>创建区域。</T>
   // //
   // // @method
   // // @return FE3dRegion 区域
   // //==========================================================
   // MO.FE3dScene_createRegion = function FE3dScene_createRegion(){
   //    return MO.Class.create(MO.FE3dSceneRegion);
   // }

   // //==========================================================
   // // <T>加载技术资源。</T>
   // //
   // // @method
   // // @param p:resource:FE3sSceneTechnique 技术资源
   // //==========================================================
   // MO.FE3dScene_loadTechniqueResource = function FE3dScene_loadTechniqueResource(p){
   //    var o = this;
   //    o._technique._resource = p;
   // }

   // //==========================================================
   // // <T>加载区域资源。</T>
   // //
   // // @method
   // // @param resource:FE3sSceneRegion 区域资源
   // //==========================================================
   // MO.FE3dScene_loadRegionResource = function FE3dScene_loadRegionResource(resource){
   //    var o = this;
   //    o._region.loadResource(resource);
   //    //............................................................
   //    // 设置相机
   //    var rc = resource.camera();
   //    var rcv = rc.projection();
   //    // 加载投影
   //    var c = o.camera();
   //    c._resource = rc;
   //    var cp = c.projection();
   //    c.position().assign(rc.position());
   //    c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
   //    c.update();
   //    // 设置投影
   //    cp.size().assign(o._graphicContext.size());
   //    cp._angle = rcv.angle();
   //    cp._znear = rcv.znear();
   //    cp._zfar = rcv.zfar();
   //    cp.update();
   //    //............................................................
   //    // 设置光源
   //    var rl = resource.light();
   //    var rlc = rl.camera();
   //    var rlv = rlc.projection();
   //    var light = o.directionalLight();
   //    light._resource = rl;
   //    var lightCamera = light.camera();
   //    var lightProjection = lightCamera.projection();
   //    // 设置光源相机
   //    lightCamera.position().set(1, 1, -1);
   //    lightCamera.lookAt(0, 0, 0);
   //    //lc.direction().assign(rlc.direction());
   //    //lc.update();
   //    lightCamera.position().assign(rlc.position());
   //    //lc.direction().assign(rlc.direction());
   //    lightCamera.update();
   //    // 设置光源投影
   //    //lp.size().set(2048, 2048);
   //    lightProjection.size().set(1024, 1024);
   //    //lp._angle = rlv.angle();
   //    lightProjection._angle = 60;
   //    lightProjection._znear = rlv.znear();
   //    lightProjection._zfar = rlv.zfar();
   //    lightProjection.update();
   // }

   // //==========================================================
   // // <T>加载显示资源。</T>
   // //
   // // @method
   // // @param p:resource:FE3sSceneDisplay 显示资源
   // //==========================================================
   // MO.FE3dScene_loadDisplayResource = function FE3dScene_loadDisplayResource(layer, resource){
   //    var o = this;
   //    // 加载场景显示资源
   //    var display = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneDisplay);
   //    display.linkGraphicContext(o);
   //    display.loadResource(resource);
   //    MO.Console.find(MO.FE3dSceneConsole).loadDisplay(display);
   //    // 放入集合
   //    layer.pushDisplay(display);
   // }

   // //==========================================================
   // // <T>加载天空资源。</T>
   // //
   // // @method
   // // @param resource:FE3sSceneLayer 层资源
   // //==========================================================
   // MO.FE3dScene_loadLayerResource = function FE3dScene_loadLayerResource(resource){
   //    var o = this;
   //    // 加载场景显示层资源
   //    var layer = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneLayer);
   //    layer.loadResource(resource);
   //    var displays = resource.displays();
   //    if(displays){
   //       var count = displays.count();
   //       for(var i = 0; i < count; i++){
   //          var display = displays.at(i);
   //          o.loadDisplayResource(layer, display);
   //       }
   //    }
   //    o.registerLayer(resource.code(), layer)
   // }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @method
   // @param resource:FE3sScene 资源
   //==========================================================
   public loadResource(resource: SceneResource) {
      AssertUtil.debugNotNull(resource);
      // // 选择技术
      // this.selectTechnique(this, MO.FE3dGeneralTechnique);
      // // 加载技术资源
      // this.loadTechniqueResource(resource.technique());
      // // 加载区域资源
      // this.loadRegionResource(resource.region());
      // 加载层集合
      var layersResource = resource.layers;
      if (layersResource) {
         var layerCount = layersResource.count();
         for (var i = 0; i < layerCount; i++) {
            var layerResource = layersResource.at(i);
            var layer: SceneLayer = ClassUtil.create(SceneLayer);
            layer.linkGraphicContext(this.graphicContext);
            layer.loadResource(layerResource);
            layer.matrix.setScaleAll(0.1);
            layer.matrix.update();
            layer.matrix.addRotationX(-Math.PI / 2);
            this.registerLayer(layer.name, layer);
         }
      }
   }

   // //==========================================================
   // // <T>测试是否准备好。</T>
   // //
   // // @method
   // // @param Boolean 是否准备好
   // //==========================================================
   // MO.FE3dScene_testReady = function FE3dScene_testReady(){
   //    return this._ready;
   // }

   // //==========================================================
   // // <T>场景脏处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dScene_dirty = function FE3dScene_dirty(){
   //    this._dirty = true;
   // }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   public processLoad() {
      if (this.ready) {
         return true;
      }
      if (!this.resource.testReady()) {
         return false;
      }
      // 加载资源
      this.loadResource(this.resource);
      this.ready = true;
      // 派发事件
      var event = MemoryUtil.alloc(Event);
      event.sender = this;
      this.loadListeners.process(event);
      //MemoryUtil.free(event);
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.loadHook = ObjectUtil.dispose(this.loadHook);
      this.loadListeners = ObjectUtil.dispose(this.loadListeners);
      super.dispose();
   }
}