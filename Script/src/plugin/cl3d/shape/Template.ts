import {Event} from '../../runtime/common/lang/Event';
import {Listeners} from '../../../runtime/common/lang/Listeners';
import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {MemoryUtil} from '../../../runtime/common/MemoryUtil';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {Material} from '../../../runtime/graphic/material/Material';
import {Actor} from '../base/Actor';
import {Region} from '../base/Region';
import {TemplateResource} from '../resource/TemplateResource';
import {ModelResource} from '../resource/ModelResource';
import {ModelResourceConsole} from '../resource/ModelResourceConsole';
import {MaterialResource} from '../resource/MaterialResource';
import {MaterialResourceConsole} from '../resource/MaterialResourceConsole';
import {TemplateRenderable} from './TemplateRenderable';

//==========================================================
// <T>渲染模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class Template extends Actor {
   // 数据准备标志
   public dataReady: boolean;
   // 准备标志
   public ready: boolean;
   // 模板资源
   public resource: TemplateResource;
   // 网格集合
   public meshRenderables: Objects<TemplateRenderable>;
   // 材质集合
   public meshMaterials: Objects<Material>;
   // 加载监听器
   public loadListeners: Listeners;
   // 材质管理器
   @Linker(MaterialResourceConsole)
   protected _materialResourceConsole: MaterialResourceConsole;
   // 模型管理器
   @Linker(ModelResourceConsole)
   protected _modelResourceConsole: ModelResourceConsole;
   //    // @attribute
   //    o._skeletons       = MO.Class.register(o, new MO.AGetter('_skeletons'));
   //    o._animations      = MO.Class.register(o, new MO.AGetter('_animations'));

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.dataReady = false;
      this.ready = false;
      this.meshRenderables = new Objects<TemplateRenderable>();
      this.meshMaterials = new Objects<Material>();
      this.loadListeners = new Listeners();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.ready;
   }

   //==========================================================
   // <T>根据代码查找网格。</T>
   //
   // @param code 代码
   // @return 网格
   //==========================================================
   public findMeshByCode(code) {
      var meshs = this.meshRenderables;
      for (var i = meshs.count() - 1; i >= 0; i--) {
         var mesh = meshs.at(i);
         if (mesh.name == code) {
            return mesh;
         }
      }
      return null;
   }

   // //==========================================================
   // // <T>增加一个渲染骨骼。</T>
   // //
   // // @method
   // // @param p:skeleton:FE3rSkeleton 渲染骨骼
   // //==========================================================
   // MO.FE3dTemplate_pushSkeleton = function FE3dTemplate_pushSkeleton(p){
   //    var o = this;
   //    var r = o._skeletons;
   //    if(!r){
   //       r = o._skeletons = new MO.TDictionary();
   //    }
   //    if(!o._activeSkeleton){
   //       o._activeSkeleton = p;
   //    }
   //    r.set(p._resource.guid(), p);
   // }

   // //==========================================================
   // // <T>根据唯一编号查找一个渲染动画。</T>
   // //
   // // @method
   // // @param p:guid:String 唯一编号
   // // @return FE3rAnimation 渲染动画
   // //==========================================================
   // MO.FE3dTemplate_findAnimation = function FE3dTemplate_findAnimation(p){
   //    var s = this._animations;
   //    return s ? s.get(p) : null;
   // }

   // //==========================================================
   // // <T>增加一个渲染动画。</T>
   // //
   // // @method
   // // @param p:animation:FE3rAnimation 渲染动画
   // //==========================================================
   // MO.FE3dTemplate_pushAnimation = function FE3dTemplate_pushAnimation(p){
   //    var o = this;
   //    var r = o._animations;
   //    if(!r){
   //       r = o._animations = new MO.TDictionary();
   //    }
   //    var pr = p.resource();
   //    r.set(pr.guid(), p);
   // }

   // //==========================================================
   // // <T>加载骨骼集合。</T>
   // //
   // // @method
   // // @param p:animations:TObjects 骨骼集合
   // //==========================================================
   // MO.FE3dTemplate_loadSkeletons = function FE3dTemplate_loadSkeletons(p){
   //    var o = this;
   //    var c = p.count();
   //    if(c > 0){
   //       var ks = o.skeletons();
   //       for(var i = 0; i < c; i++){
   //          var r = p.at(i);
   //          // 创建骨骼
   //          var s = MO.Class.create(MO.FE3rSkeleton);
   //          s.loadResource(r);
   //          o.pushSkeleton(s);
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>关联渲染动画。</T>
   // //
   // // @method
   // // @param p:animation:FE3rAnimation 渲染动画
   // //==========================================================
   // MO.FE3dTemplate_linkAnimation = function FE3dTemplate_linkAnimation(p){
   //    var o = this;
   //    var ts = p.tracks();
   //    var c = ts.count();
   //    for(var i = 0; i < c; i++){
   //       var t = ts.getAt(i);
   //       var mc = t._resource._meshCode;
   //       if(mc){
   //          var m = o.findMeshByCode(mc);
   //          m._activeTrack = t;
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>加载动画集合。</T>
   // //
   // // @method
   // // @param p:animations:TObjects 动画集合
   // //==========================================================
   // MO.FE3dTemplate_loadAnimations = function FE3dTemplate_loadAnimations(p){
   //    var o = this;
   //    var c = p.count();
   //    if(c > 0){
   //       for(var i = 0; i < c; i++){
   //          var r = p.getAt(i);
   //          // 查找是否存在
   //          var a = o.findAnimation(r.guid());
   //          if(a){
   //             continue;
   //          }
   //          // 创建渲染动画
   //          var a = null;
   //          if(r.skeleton()){
   //             a = MO.Class.create(MO.FE3rSkeletonAnimation);
   //          }else{
   //             a = MO.Class.create(MO.FE3rMeshAnimation);
   //          }
   //          a._display = o;
   //          a.loadResource(r);
   //          o.pushAnimation(a);
   //       }
   //    }
   // }

   //==========================================================
   // <T>加载资源模板。</T>
   //
   // @method
   // @param resource:FE3sTemplate 资源模板
   //==========================================================
   public loadResource(resource: TemplateResource) {
      // 设置属性
      this.name = resource.name;
      this.label = resource.label;
      // 加载渲染集合
      var renderableResources = resource.renderables;
      var count = renderableResources.count();
      for (var i = 0; i < count; i++) {
         var renderableResource = renderableResources.at(i);
         // 加载资源
         var renderable = new TemplateRenderable();
         renderable.linkGraphicContext(this.graphicContext);
         renderable.loadResource(renderableResource);
         this.meshRenderables.push(renderable);
      }
   }

   //==========================================================
   // <T>加载网格集合处理。</T>
   //==========================================================
   public loadMeshs() {
      var meshs = this.meshRenderables;
      var meshCount = meshs.count();
      for (var i = 0; i < meshCount; i++) {
         // 加载网格
         var mesh = meshs.at(i);
         mesh.load();
         // 设置材质
         this.meshMaterials.pushUnique(mesh.material);
         // 放入显示
         this.pushRenderable(mesh);
      }
   }

   // //==========================================================
   // // <T>重新加载资源。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dTemplate_reloadResource = function FE3dTemplate_reloadResource(){
   //    var o = this;
   //    var sprites = o._sprites;
   //    if(sprites){
   //       var count = sprites.count();
   //       for(var i = 0; i < count; i++){
   //          var sprite = sprites.at(i);
   //          sprite.reloadResource();
   //       }
   //    }
   // }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @return 处理结果
   //==========================================================
   public processLoad(): boolean {
      var ready = this.ready;
      if (!ready) {
         var resource = this.resource;
         // 加载资源
         if (!this.dataReady) {
            if (!resource.testReady()) {
               return false;
            }
            this.loadResource(resource);
            this.dataReady = true;
         }
         // 加载渲染集合
         var meshs = this.meshRenderables;
         if (meshs) {
            var meshCount = meshs.count();
            // 测试全部加载完成
            for (var i = 0; i < meshCount; i++) {
               var mesh = meshs.at(i);
               if (!mesh.testReady()) {
                  return false;
               }
            }
            // 加载全部渲染对象
            this.loadMeshs();
         }
         // 关联动画
         // var animations = this._animations;
         // if (animations) {
         //    var animationCount = animations.count();
         //    for (var i = 0; i < animationCount; i++) {
         //       var animation = animations.at(i);
         //       if (animation.resource().skeleton() == null) {
         //          this.linkAnimation(animation);
         //       }
         //    }
         // }
         // 加载完成
         ready = this.ready = true;
         // 事件发送
         var event = MemoryUtil.alloc(Event);
         event.sender = this;
         this.loadListeners.process(event);
      }
      return ready;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public process(region: Region): boolean {
      // 处理动画集合
      //var as = o._animations;
      //if(as){
      //   var c = as.count();
      //   for(var i = 0; i < c; i++){
      //      as.valueAt(i).record();
      //   }
      //}
      // 父处理
      var result = super.process(region);
      // 处理动画集合
      //var k = o._activeSkeleton;
      //if(k && as){
      //   var c = as.count();
      //   for(var i = 0; i < c; i++){
      //      as.valueAt(i).process(k);
      //   }
      //}
      return result;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this.resource = null;
      this.meshRenderables = ObjectUtil.dispose(this.meshRenderables);
      this.meshMaterials = ObjectUtil.dispose(this.meshMaterials);
      this.loadListeners = ObjectUtil.dispose(this.loadListeners);
      // 父处理
      super.dispose();
   }
}