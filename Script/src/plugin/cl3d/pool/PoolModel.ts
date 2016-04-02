import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {ModelResource} from '../resource/ModelResource';
import {PoolComponent} from './PoolComponent';
import {PoolModelMesh} from './PoolModelMesh';

//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
export class PoolModel extends PoolComponent {
   // 模型资源
   public resource: ModelResource;
   // 网格唯一编号字典
   public mesheGuids: Dictionary<PoolModelMesh>;
   // 网格代码字典
   public mesheCodes: Dictionary<PoolModelMesh>;
   // 骨骼集合
   public skeletons: any;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
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
   // <T>根据唯一编号查找网格。</T>
   //
   // @param guid 唯一编号
   // @return 网格
   //==========================================================
   public findMeshByGuid(guid: string): PoolModelMesh {
      var mesh = null;
      var meshs = this.mesheGuids;
      if (meshs) {
         mesh = meshs.get(guid);
      }
      return mesh;
   }

   //==========================================================
   // <T>根据代码查找网格。</T>
   //
   // @param code 代码
   // @return 网格
   //==========================================================
   public findMeshByCode(code: string): PoolModelMesh {
      var mesh = null;
      var meshs = this.mesheCodes;
      if (meshs) {
         mesh = meshs.get(code);;
      }
      return mesh;
   }

   // //==========================================================
   // // <T>加载骨骼资源。</T>
   // //
   // // @method
   // // @param resource:FE3sSkeleton 骨骼资源
   // //==========================================================
   // public loadSkeletonResource(resource){
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
   // @param resource 模型资源
   //==========================================================
   public loadResource(resource: ModelResource) {
      //var modelConsole = MO.Console.find(MO.FE3rModelConsole);
      // 读取网格集合
      var meshResources = resource.meshes;
      if (meshResources) {
         var mesheGuids = this.mesheGuids = new Dictionary<PoolModelMesh>();
         var mesheCodes = this.mesheCodes = new Dictionary<PoolModelMesh>();
         // 加载网格
         var meshCount = meshResources.count();
         for (var i = 0; i < meshCount; i++) {
            var meshResource = meshResources.at(i);
            // 创建渲染网格
            var mesh: PoolModelMesh = ClassUtil.create(PoolModelMesh);
            mesh.linkGraphicContext(this.graphicContext);
            mesh.loadResource(meshResource);
            mesheGuids.set(mesh.guid, mesh);
            mesheCodes.set(mesh.code, mesh);
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
      this.ready = true;
   }

   //==========================================================
   // <T>加载处理。</T>
   //==========================================================
   public processLoad() {
      // 检查数据已加载
      if (this.ready) {
         return true;
      }
      // 检查资源是否准备好
      if (!this.resource.testReady()) {
         return false;
      }
      // 加载资源
      this.loadResource(this.resource);
      LoggerUtil.debug(this, 'Load render model success. (code={1})', this.code);
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      //this._ready = false;
      this.resource = null;
      this.mesheGuids = ObjectUtil.dispose(this.mesheGuids);
      this.mesheCodes = ObjectUtil.dispose(this.mesheCodes);
      this.skeletons = ObjectUtil.dispose(this.skeletons);
      super.dispose();
   }
}