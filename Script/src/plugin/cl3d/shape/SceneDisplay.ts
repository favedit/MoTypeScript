import {Linker} from '../../runtime/common/reflect/Linker';
import {ProcessLoadHook} from '../../runtime/core/service/ProcessLoadHook';
import {ProcessLoadService} from '../../runtime/core/service/ProcessLoadService';
import {SceneDisplayResource} from '../resource/SceneDisplayResource';
import {Sprite} from './Sprite';
import {Template} from './Template';
import {TemplateService} from './TemplateService';

//==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
export class SceneDisplay extends Sprite {
   public ready:boolean;
   public loadHook:ProcessLoadHook;
   // 资源对象
   public resource: SceneDisplayResource;
   // 模板
   public template: Template;
   // 模板地址
   public templateUrl: string;
   // 模板服务
   @Linker(ProcessLoadService)
   protected _processLoadService: ProcessLoadService;
   // 模板服务
   @Linker(TemplateService)
   protected _templateService: TemplateService;
   // @attribute
   //    o._dataReady        = false;
   //    o._optionPlay       = false;
   //    o._optionMovie      = false;
   //    o._movieMatrix      = null;
   //    // @attribute
   //    o._resource         = null;
   //    // @attribute
   //    o._materials        = null;
   //    o._parentMaterials  = null;
   //    o._template         = null;
   //    o._sprite           = null;

   //==========================================================
   // <T>构造处理。</T>
   // @method
   //==========================================================
   public constructor() {
      super();
      this.loadHook = new ProcessLoadHook(this);
      // o._movieMatrix = new MO.SMatrix3d();
   }

   //==========================================================
   // <T>计算轮廓大小。</T>
   //
   // @method
   // @return SOutline3 轮廓
   //==========================================================
   public testReady(){
      return this.ready;
   }

   // //==========================================================
   // // <T>计算轮廓大小。</T>
   // //
   // // @method
   // // @return SOutline3 轮廓
   // //==========================================================
   // MO.FE3dSceneDisplay_calculateOutline = function FE3dSceneDisplay_calculateOutline(){
   //    return this._sprite.calculateOutline();
   // }

   // //==========================================================
   // // <T>获得网格渲染集合。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dSceneDisplay_meshRenderables = function FE3dSceneDisplay_meshRenderables(){
   //    var o = this;
   //    var sprite = o._template.sprite();
   //    return sprite.meshRenderables();
   // }

   //==========================================================
   // <T>加载空间资源。</T>
   //
   // @method
   // @param resource:FE3sSceneSpace 空间资源
   //==========================================================
   public loadResource(resource: SceneDisplayResource) {
      // var instanceConsole = MO.Console.find(MO.FE3dInstanceConsole);
      this.resource = resource;
      // 加载模板
      this.templateUrl = resource.templateUrl;
      this.template = this._templateService.allocByUrl(this.graphicContext, resource.templateUrl);
      this._processLoadService.push(this.loadHook);

      // // 设置矩阵
      // this._code = resource.code();
      // this._matrix.assign(resource.matrix());
      // // 加载动画集合
      // var movieResources = resource.movies();
      // if(movieResources){
      //    var movieCount = movieResources.count();
      //    for(var i = 0; i < movieCount; i++){
      //       var movieResource = movieResources.at(i);
      //       // 创建场景动画
      //       var movie = instanceConsole.create(MO.EE3dInstance.SceneMovie);
      //       movie.loadResource(movieResource);
      //       this.pushMovie(movie);
      //    }
      // }
      // // 设置材质集合
      // var materialResources = resource.materials();
      // if(materialResources){
      //    var materialCount = materialResources.count();
      //    var materials = this._materials = new MO.TDictionary();
      //    var parentMaterials = this._parentMaterials = new MO.TDictionary();
      //    for(var i = 0; i < materialCount; i++){
      //       var materialResource = materialResources.at(i);
      //       // 创建场景资源
      //       var material = instanceConsole.create(MO.EE3dInstance.SceneMaterial);
      //       material._display = this;
      //       material.loadSceneResource(materialResource);
      //       materials.set(materialResource.guid(), material);
      //       parentMaterials.set(materialResource.parentGuid(), material);
      //    }
      // }
      // // 加载显示内容
      // var templateGuid = resource.templateGuid();
      // this._template = MO.Console.find(MO.FE3dTemplateConsole).allocByGuid(this, templateGuid);
   }

   //==========================================================
   // <T>加载模板。</T>
   //
   // @param template 模板
   //==========================================================
   public loadTemplate(template:Template){
      //debugger
      //var resource = this.resource;
      //..........................................................
      // 重设变换，模型的变换矩阵在场景中无效。
      this.pushDisplay(this.template);
      // var meshs = this.template.meshs;
      // if(meshs){
      //    var count = meshs.count;
      //    var optionPlay = this._optionPlay;
      //    var count = sprites.count();
      //    for(var i = 0; i < count; i++){
      //       var sprite = sprites.at(i);
      //       sprite._optionPlay = optionPlay;
      //       sprite.matrix().identity();
      //    }
      // }
      //..........................................................
      // // 设置材质
      // var materials = this._materials;
      // var parentMaterials = this._parentMaterials;
      // var sprite = this._sprite = template.sprite();
      // var renderables = sprite.renderables();
      // var count = renderables.count();
      // for(var n = 0; n < count; n++){
      //    // 增加渲染对象
      //    var renderable = renderables.at(n);
      //    // 设置材质关联
      //    var material = renderable.material();
      //    var materialGuid = material.guid();
      //    if(parentMaterials){
      //       var displayMaterial = parentMaterials.get(materialGuid);
      //       if(displayMaterial){
      //          displayMaterial.loadParent(material);
      //          displayMaterial.reloadResource();
      //          renderable.setMaterial(displayMaterial);
      //       }
      //    }
      // }
      // this.pushDisplay(sprite);
      // //..........................................................
      // // 设置动画
      // var animations = sprite.animations();
      // if(animations){
      //    var animationCount = animations.count();
      //    for(var n = 0; n < animationCount; n++){
      //       var animation = animations.at(n);
      //       // 获得资源
      //       var animationResource = animation.resource();
      //       var animationGuid = animationResource.guid();
      //       // 获得场景动画资源
      //       var sceneAnimationResource = resource.findAnimation(animationGuid);
      //       if(!sceneAnimationResource){
      //          sceneAnimationResource = resource.syncAnimation(animationGuid);
      //          sceneAnimationResource._guid = animationResource._guid;
      //          sceneAnimationResource._code = animationResource._code;
      //          sceneAnimationResource._label = animationResource._label;
      //       }
      //       // 创建场景动画
      //       var sceneAnimation = MO.Class.create(MO.FE3dSceneAnimation);
      //       sceneAnimation.loadAnimation(animation);
      //       sceneAnimation.loadSceneResource(sceneAnimationResource);
      //       sceneAnimation.reloadResource();
      //       this.pushAnimation(sceneAnimation);
      //    }
      // }
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   public processLoad(){
      if(this.ready){
         return true;
      }
      // 加载模板
      var template = this.template;
      if(!template.testReady()){
         return false;
      }
      this.loadTemplate(template);
      this.ready = true;
      // 事件处理
      //this.processLoadListener(this);
      return true;
   }

   // //==========================================================
   // // <T>复制加载处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dSceneDisplay_clone = function FE3dSceneDisplay_clone(){
   // }
}