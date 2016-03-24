import {Listeners} from '../../../runtime/common/lang/Listeners';
import {Objects} from '../../../runtime/common/lang/Objects';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {FActor} from '../base/FActor';
import {TemplateResource} from '../resource/TemplateResource';
import {FModelResource} from '../resource/FModelResource';
import {FModelResourceConsole} from '../resource/FModelResourceConsole';
import {FMaterialResource} from '../resource/FMaterialResource';
import {FMaterialResourceConsole} from '../resource/FMaterialResourceConsole';
import {TemplateRenderable} from './TemplateRenderable';

//==========================================================
// <T>渲染模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class Template extends FActor {
   // @attribute
   public _dataReady: boolean;
   public _ready: boolean;
   public resource: any;
   public _meshs: any = new Objects<any>();
   // public renderables: any;
   //    // @attribute
   //    o._sprites         = MO.Class.register(o, new MO.AGetter('_sprites'));
   //    o._skeletons       = MO.Class.register(o, new MO.AGetter('_skeletons'));
   //    o._animations      = MO.Class.register(o, new MO.AGetter('_animations'));
   // 材质管理器
   @Linker(FMaterialResourceConsole)
   protected _materialResourceConsole: FMaterialResourceConsole = null;
   // 模型管理器
   @Linker(FModelResourceConsole)
   protected _modelResourceConsole: FModelResourceConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._dataReady = false;
      this._ready = false;
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
      return this._ready;
   }

   // //==========================================================
   // // <T>获得精灵。</T>
   // //
   // // @method
   // // @return FE3dSprite 精灵
   // //==========================================================
   // MO.FE3dTemplate_sprite = function FE3dTemplate_sprite(){
   //    return this._sprites.first();
   // }

   // //==========================================================
   // // <T>根据代码查找网格。</T>
   // //
   // // @method
   // // @param p:code:String 代码
   // // @return FE3sMesh 网格
   // //==========================================================
   // MO.FE3dTemplate_findMeshByCode = function FE3dTemplate_findMeshByCode(p){
   //    var s = this._sprites;
   //    for(var i = s.count() - 1; i >= 0; i--){
   //       var m = s.getAt(i);
   //       if(m._renderable._resource._code == p){
   //          return m;
   //       }
   //    }
   //    return null;
   // }

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
   // // <T>获得网格渲染集合。</T>
   // //
   // // @method
   // // @return TObjects 网格渲染集合
   // //==========================================================
   // MO.FE3dTemplate_sprites = function FE3dTemplate_sprites(){
   //    return this._sprites;
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
   // // <T>获得可见性。</T>
   // //
   // // @method
   // // @return Boolean 可见性
   // //==========================================================
   // MO.FE3dTemplate_visible = function FE3dTemplate_visible(){
   //    return this.sprite().visible();
   // }

   // //==========================================================
   // // <T>设置可见性。</T>
   // //
   // // @method
   // // @param visible:Boolean 可见性
   // //==========================================================
   // MO.FE3dTemplate_setVisible = function FE3dTemplate_setVisible(visible){
   //    this.sprite().setVisible(visible);
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
   public loadResource(resource) {
      var renderableResources = resource.renderables;
      var count = renderableResources.count();
      for (var i = 0; i < count; i++) {
         var renderableResource = renderableResources.at(i);
         var renderable = new TemplateRenderable();
         renderable.linkGraphicContext(this._graphicContext);
         renderable.loadResource(renderableResource);
         this._meshs.push(renderable);
      }
      // 加载技术
      //var technique = o.selectTechnique(o, MO.FE3dGeneralTechnique);
      //technique.setResource(resource.technique());
      // 父处理
      //o.__base.FE3dSpace.loadResource.call(o, resource);
      // 加载资源渲染集合
      // var displayResources = resource.displays();
      // if (displayResources) {
      //    var displayCount = displayResources.count();
      //    if (displayCount > 0) {
      //       for (var i = 0; i < displayCount; i++) {
      //          var displayResource = displayResources.at(i);
      //          var display = MO.Class.create(MO.FE3dTemplateDisplay);
      //          display._parent = this;
      //          display.linkGraphicContext(this);
      //          display.loadResource(displayResource);
      //          this._sprites.push(display);
      //       }
      //    }
      // }
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
      var ready = this._ready;
      if (!ready) {
         var resource = this.resource;
         // 加载资源
         if (!this._dataReady) {
            if (!resource.testReady()) {
               return false;
            }
            this.loadResource(resource);
            this._dataReady = true;
         }
         // 加载渲染集合
         var meshs = this._meshs;
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
            for (var i = 0; i < meshCount; i++) {
               var mesh = meshs.at(i);
               mesh.load();
               this.pushRenderable(mesh);
            }
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
         ready = this._ready = true;
         // 事件发送
         //var event = RMemory.alloc(SEvent);
         //event.sender = this;
         //this.processLoadListener(event);
         //RMemory.free(event);
      }
      return ready;
   }

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dTemplate_process = function FE3dTemplate_process(event){
   //    var o = this;
   //    // 处理动画集合
   //    //var as = o._animations;
   //    //if(as){
   //    //   var c = as.count();
   //    //   for(var i = 0; i < c; i++){
   //    //      as.valueAt(i).record();
   //    //   }
   //    //}
   //    // 父处理
   //    o.__base.FE3dSpace.process.call(o);
   //    // 处理动画集合
   //    //var k = o._activeSkeleton;
   //    //if(k && as){
   //    //   var c = as.count();
   //    //   for(var i = 0; i < c; i++){
   //    //      as.valueAt(i).process(k);
   //    //   }
   //    //}
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // this._sprites = RObject.dispose(this._sprites);
      super.dispose();
   }
}