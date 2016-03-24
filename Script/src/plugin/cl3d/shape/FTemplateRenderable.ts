import {StringUtil} from '../../../runtime/common/lang/StringUtil';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {FRenderable} from '../base/FRenderable';
import {FRenderModelConsole} from '../shape/render/FRenderModelConsole';
import {FE3rMaterialConsole} from '../shape/render/FE3rMaterialConsole';
import {ProcessLoadService} from '../runtime/core/service/ProcessLoadService'

//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FTemplateRenderable extends FRenderable {
   //    // @attribute
   protected _ready = false;
   protected _dataReady = false;
   //    // @attribute
   //    o._model            = null;
   //    o._materialCode     = null;
   //    o._materialResource = null;
   public _resource;
   public _model;
   public materialLoader;
   // public _material;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 准备好
   //==========================================================
   public testReady() {
      if (!this._ready) {
         if (this._dataReady) {
            // 测试模型加载状态
            if (!this._model.testReady()) {
               return false;
            }
            // 测试材质加载状态
            var materialLoader: any = this.materialLoader;
            if (materialLoader) {
               if (!materialLoader.testReady()) {
                  return false;
               }
            }
            // 加载完成
            this._ready = true;
         }
      }
      return this._ready;
   }

   // //==========================================================
   // // <T>测试是否可见。</T>
   // //
   // // @method
   // // @return Boolean 是否可见
   // //==========================================================
   // MO.FE3dTemplateRenderable_testVisible = function FE3dTemplateRenderable_testVisible(p){
   //    var o = this;
   //    var result = false;
   //    if(o._ready){
   //       result = o.__base.FE3dMeshRenderable.testVisible.call(o);
   //    }
   //    return result;
   // }

   // //==========================================================
   // // <T>计算轮廓大小。</T>
   // //
   // // @method
   // // @param flag:Boolean 标志
   // // @return SOutline3 轮廓
   // //==========================================================
   // MO.FE3dTemplateRenderable_calculateOutline = function FE3dTemplateRenderable_calculateOutline(flag){
   //    var o = this;
   //    var outline = o._outline;
   //    if(outline.isEmpty() || flag){
   //       var resource = o._resource
   //       var meshResource = resource.mesh();
   //       var meshOutline = meshResource.outline();
   //       outline.calculateFrom(meshOutline, o._currentMatrix);
   //    }
   //    return outline;
   // }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @method
   // @param resource:FE3sTemplateRenderable 资源
   //==========================================================
   public loadResource(resource) {
      // 设置资源
      this._resource = resource;
      //............................................................
      // 设置数据
      //this._matrix.assign(resource.matrix());
      // 加载模型
      //var modelGuid = resource.modelGuid();
      var modelUrl = resource.modelUrl;
      //this._model = RConsole.find(FE3rModelConsole).loadByGuid(this, modelGuid);
      this._model = ServiceUtil.find(FRenderModelConsole).loadByUrl(this, modelUrl);
      // 设置资源
      //var materialGuid = resource.materialGuid();
      var materialUrl = resource.materialUrl;
      if (!StringUtil.isEmpty(materialUrl)) {
         //var material = this.material = this.materialReference = RConsole.find(FE3rMaterialConsole).loadByUrl(this, materialUrl);
         //this.material = this.materialReference = RConsole.find(FE3rMaterialConsole).loadByUrl(this, materialUrl);
         this.materialLoader = ServiceUtil.find(FE3rMaterialConsole).loadLoaderByUrl(this, materialUrl);
         //RConsole.find(FProcessLoadConsole).push();
         //this._materialResource = material.resource();
         //this.pushMaterial(material);
      }
      //..........................................................
      // 加载材质集合
      // var template = this._display._parent;
      // var materialRefers = resource.materialRefers();
      // if (materialRefers) {
      //    var count = materialRefers.count();
      //    for (var i = 0; i < count; i++) {
      //       var materialRefer = materialRefers.at(i);
      //       var materialGuid = materialRefer.guid();
      //       var material = template.findMaterial(materialGuid);
      //       this.pushMaterial(material);
      //       this._material = material;
      //    }
      // }
      //..........................................................
      // 设置空材质
      // if (!this._material) {
      //    this._material = this._materialReference = RClass.create(FE3dMaterial);
      // }
      this._dataReady = true;
   }

   // //==========================================================
   // // <T>重新加载资源。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3dTemplateRenderable_reloadResource = function FE3dTemplateRenderable_reloadResource(){
   //    var o = this;
   //    var material = o._material;
   //    material.calculate(o._materialResource);
   //    material.update();
   // }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @method
   // @param p:resource:FE3sTemplateRenderable 资源
   //==========================================================
   public load() {
      //var display = this._display;
      var resource = this._resource;
      //var modelResource = resource.model();
      //..........................................................
      // 加载材质
      // var textures = this.material.textures;
      // if (textures) {
      //    var count = textures.count();
      //    for (var i = 0; i < count; i++) {
      //       var bitmap = textures.at(i);
      //       //this.pushTexture(bitmap);
      //    }
      // }
      //..........................................................
      // 加载骨骼
      // var skeletonResources = modelResource.skeletons();
      // if(skeletonResources){
      //    display.loadSkeletons(skeletonResources);
      // }
      // 加载动画
      // var animationResources = modelResource.animations();
      // if(animationResources){
      //    display.loadAnimations(animationResources);
      // }
      //..........................................................
      // 设置网格
      //var meshResource = resource.meshCode;
      //var meshGuid = resource.meshGuid();
      var model = this._model;
      var meshCode = resource.meshCode;
      //var mesh = model.findMeshByCode(meshCode);
      var mesh = model.meshes.first();
      AssertUtil.debugNotNull(mesh);
      this.vertexBuffers = mesh.vertexBuffers;
      this.indexBuffers = mesh.indexBuffers;
      this.material = this.materialLoader.material;
      //var renderable = this._renderable = MO.Console.find(MO.FE3rModelConsole).findMesh(meshGuid);
      //RAssert.debugNotNull(renderable);
      // var vertexBuffers = renderable.vertexBuffers();
      // var vertexBufferCount = vertexBuffers.count();
      // for (var i = 0; i < vertexBufferCount; i++) {
      //    var vertexBuffer = vertexBuffers.at(i);
      //    this._vertexBuffers.set(vertexBuffer.code(), vertexBuffer);
      // }
      // 设置蒙皮
      // var skins = renderable.skins();
      // if (skins) {
      //    var displaySkeleton = display._activeSkeleton;
      //    // 获得激活皮肤
      //    var skin = this._activeSkin = skins.first();
      //    var streams = skin.streams();
      //    var streamCount = streams.count();
      //    for (var i = 0; i < streamCount; i++) {
      //       var stream = streams.at(i);
      //       var buffer = stream.buffer();
      //       this._vertexBuffers.set(buffer.code(), buffer);
      //    }
      //    // 获得骨头集合
      //    var skinResource = skin.resource();
      //    var boneReferResources = skinResource.boneRefers();
      //    var c = boneReferResources.count();
      //    if (c > 0) {
      //       var bones = this._bones = new MO.TObjects();
      //       for (var i = 0; i < c; i++) {
      //          var boneReferResource = boneReferResources.at(i);
      //          var boneReferIndex = boneReferResource.index();
      //          var bone = displaySkeleton.bones().get(boneReferIndex);
      //          if (!bone) {
      //             throw new MO.TError(this, 'Bone is not exist.');
      //          }
      //          bones.push(bone);
      //       }
      //    }
      // }
      // 加载完成
      this._ready = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}