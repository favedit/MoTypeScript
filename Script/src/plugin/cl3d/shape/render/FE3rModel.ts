import {FObjects} from '../../../runtime/common/lang/FObjects';
import {RObject} from '../../../runtime/common/lang/RObject';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {FModelResource} from '../../resource/FModelResource';
import {FE3rComponent} from './FE3rComponent';
import {FE3rModelMesh} from './FE3rModelMesh';

//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
export class FE3rModel extends FE3rComponent {
   public dataReady = false;
   //    // @attribute
   public resource: FModelResource = null;
   //    // @attribute
   public meshes: FObjects<FE3rModelMesh> = null;
   //    o._skeletons           = MO.Class.register(o, new MO.AGetter('_skeletons'));

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.dataReady;
   }

   // //==========================================================
   // // <T>根据唯一编号查找网格。</T>
   // //
   // // @param p:name:String 名称
   // //==========================================================
   // MO.FE3rModel_findMeshByGuid = function FE3rModel_findMeshByGuid(guid){
   //    var o = this;
   //    var mesh = o._meshes.search('_guid', guid);
   //    return null;
   // }

   //==========================================================
   // <T>根据唯一编号查找网格。</T>
   //
   // @param p:name:String 名称
   //==========================================================
   public findMeshByCode(code) {
      return this.meshes.search('code', code);
   }

   // //==========================================================
   // // <T>加载骨骼资源。</T>
   // //
   // // @method
   // // @param resource:FE3sSkeleton 骨骼资源
   // //==========================================================
   // MO.FE3rModel_loadSkeletonResource = function FE3rModel_loadSkeletonResource(resource){
   //    var o = this;
   //    var modelConsole = MO.Console.find(MO.FE3rModelConsole);
   //    // 加载骨骼皮肤
   //    var skinResources = resource.skins();
   //    if(skinResources){
   //       var skinCount = skinResources.count();
   //       for(var i = 0; i < skinCount; i++){
   //          var skinResource = skinResources.at(i);
   //          // 创建皮肤
   //          var skin = MO.Class.create(MO.FE3rSkin);
   //          skin.linkGraphicContext(o);
   //          skin.loadResource(skinResource)
   //          // 放入网格
   //          var meshGuid = skinResource.meshGuid();
   //          var mesh = modelConsole.findMesh(meshGuid);
   //          mesh.pushSkin(skin);
   //       }
   //    }
   // }

   //==========================================================
   // <T>加载模型资源。</T>
   //
   // @method
   // @param resource:FE3sModel 模型资源
   //==========================================================
   public loadResource(resource: FModelResource) {
      //var modelConsole = MO.Console.find(MO.FE3rModelConsole);
      // 读取网格集合
      var meshResources = resource.meshes;
      if (meshResources) {
         var meshes = this.meshes = new FObjects<FE3rModelMesh>();
         var meshCount = meshResources.count();
         for (var i = 0; i < meshCount; i++) {
            var meshResource = meshResources.at(i);
            // 创建渲染网格
            var mesh = RClass.create(FE3rModelMesh);
            mesh.linkGraphicContext(this.graphicContext);
            mesh.loadResource(meshResource);
            meshes.push(mesh);
            //modelConsole.registerMesh(mesh.guid(), mesh);
         }
      }
      // 读取骨骼集合
      // var skeletonResources = resource.skeletons();
      // if (skeletonResources) {
      //    var skeletonCount = skeletonResources.count();
      //    for (var i = 0; i < skeletonCount; i++) {
      //       var skeletonResource = skeletonResources.get(i);
      //       this.loadSkeletonResource(skeletonResource);
      //    }
      // }
      // 加载完成
      this.dataReady = true;
   }

   //==========================================================
   // <T>加载处理。</T>
   //==========================================================
   public processLoad() {
      // 检查数据已加载
      if (this.dataReady) {
         return true;
      }
      // 检查资源是否准备好
      if (!this.resource.testReady()) {
         return false;
      }
      // 加载资源
      this.loadResource(this.resource);
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      //this._ready = false;
      this.resource = null;
      this.meshes = RObject.dispose(this.meshes);
      //this._skeletons = RObject.dispose(this._skeletons);
      super.dispose();
   }
}