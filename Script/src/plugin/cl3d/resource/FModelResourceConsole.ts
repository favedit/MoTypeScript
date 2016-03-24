import {EDataContent} from '../../runtime/common/lang/EDataContent';
import {FDictionary} from '../../runtime/common/lang/FDictionary';
import {RObject} from '../../runtime/common/lang/RObject';
import {ALinker} from '../../runtime/common/reflect/ALinker';
import {RClass} from '../../runtime/common/reflect/RClass';
import {RMemory} from '../../runtime/common/RMemory';
import {FResourceConsole} from '../../runtime/core/resource/FResourceConsole';
import {FConsole} from '../../runtime/core/FConsole';
import {SLoadArgs} from './SLoadArgs';
import {FModelResource} from './FModelResource';

//==========================================================
// <T>资源模型管理器。</T>
// <P>http://{server}:{port}/cloud.content.model.wv?code={code}&version={version}</P>
//
// @author maocy
// @history 150128
//==========================================================
export class FModelResourceConsole extends FConsole {
   // 模型集合
   protected _models: FDictionary<FModelResource>;
   // 资源控制台
   @ALinker(FResourceConsole)
   protected _resourceConsole: FResourceConsole;
   //    o._meshs            = MO.Class.register(o, new MO.AGetter('_meshs'));
   //    o._skeletons        = MO.Class.register(o, new MO.AGetter('_skeletons'));
   //    o._animations       = MO.Class.register(o, new MO.AGetter('_animations'));

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._models = new FDictionary<FModelResource>();
      // this._meshs = new MO.TDictionary();
      // this._skeletons = new MO.TDictionary();
      // this._animations = new MO.TDictionary();
      // 注册资源类型
      //var rc = MO.Console.find(MO.FResourceConsole);
      //var rp = MO.Class.create(MO.FResourcePipeline);
      //var rt = MO.Class.create(MO.FResourceType);
      //rt.setCode('resource3d.model');
      //rt._pipeline = rp;
      //rc.registerType(rt);
      //rc.factory().register('resource3d.model', FE3sModel);
   }

   //==========================================================
   // <T>获得模型集合。</T>
   //
   // @return 模型集合
   //==========================================================
   public models(): FDictionary<FModelResource> {
      return this._models;
   }

   // //==========================================================
   // // <T>根据唯一编号查找模型。</T>
   // //
   // // @method
   // // @param guid:String 唯一编号
   // // @return FE3sModel 模型
   // //==========================================================
   // MO.FE3sModelConsole_findModel = function FE3sModelConsole_findModel(guid){
   //    return this._models.get(guid);
   // }

   // //==========================================================
   // // <T>根据唯一编号查找网格。</T>
   // //
   // // @method
   // // @param guid:String 唯一编号
   // // @return FE3sMesh 网格
   // //==========================================================
   // MO.FE3sModelConsole_findMesh = function FE3sModelConsole_findMesh(guid){
   //    return this._meshs.get(guid);
   // }

   // //==========================================================
   // // <T>根据唯一编号查找骨骼。</T>
   // //
   // // @method
   // // @param guid:String 唯一编号
   // // @return FE3sSkeleton 骨骼
   // //==========================================================
   // MO.FE3sModelConsole_findSkeleton = function FE3sModelConsole_findSkeleton(guid){
   //    return this._skeletons.get(guid);
   // }

   // //==========================================================
   // // <T>根据唯一编号查找动画。</T>
   // //
   // // @method
   // // @param guid:String 唯一编号
   // // @return FE3sAnimation 动画
   // //==========================================================
   // MO.FE3sModelConsole_findAnimation = function FE3sModelConsole_findAnimation(guid){
   //    return this._animations.get(guid);
   // }

   // //==========================================================
   // // <T>反序列化网格。</T>
   // //
   // // @method
   // // @param input:FByteStream 数据流
   // // @return FE3sMesh 网格
   // //==========================================================
   // MO.FE3sModelConsole_unserialMesh = function FE3sModelConsole_unserialMesh(input){
   //    var o = this;
   //    var mesh = MO.Class.create(MO.FE3sModelMesh);
   //    mesh.unserialize(input);
   //    var guid = mesh.guid();
   //    o._meshs.set(guid, mesh);
   //    return mesh;
   // }

   // //==========================================================
   // // <T>反序列化骨骼。</T>
   // //
   // // @method
   // // @param input:FByteStream 数据流
   // // @return FE3sSkeleton 骨骼
   // //==========================================================
   // MO.FE3sModelConsole_unserialSkeleton = function FE3sModelConsole_unserialSkeleton(input){
   //    var o = this;
   //    var skeleton = MO.Class.create(MO.FE3sSkeleton);
   //    skeleton.unserialize(input);
   //    var guid = skeleton.guid();
   //    o._skeletons.set(guid, skeleton);
   //    return skeleton;
   // }

   // //==========================================================
   // // <T>反序列化动画。</T>
   // //
   // // @method
   // // @param model:FEs3Model 模型
   // // @param input:FByteStream 数据流
   // // @return FE3sAnimation 动画
   // //==========================================================
   // MO.FE3sModelConsole_unserialAnimation = function FE3sModelConsole_unserialAnimation(model, input){
   //    var o = this;
   //    var animation = MO.Class.create(MO.FE3sAnimation);
   //    animation._model = model;
   //    animation.unserialize(input);
   //    var guid = animation.guid();
   //    o._animations.set(guid, animation);
   //    return animation;
   // }

   //==========================================================
   // <T>加载指定参数的模型资源。</T>
   //
   // @param args:SE3sLoadArgs 加载参数
   // @return FE3sModel 模型资源
   //==========================================================
   public load(args: SLoadArgs) {
      // 生成地址
      // var vendor = MO.Console.find(MO.FE3sVendorConsole).find(MO.EE3sResource.Model);
      // var identity = null;
      // var guid = args.guid;
      // if(!MO.Lang.String.isEmpty(guid)){
      //    vendor.set('guid', guid);
      //    identity = guid;
      // }
      // var code = args.code;
      // if(!MO.Lang.String.isEmpty(code)){
      //    vendor.set('code', code);
      //    identity = code;
      // }
      // MO.Assert.debugNotEmpty(identity);
      // var url = vendor.makeUrl();
      var url = args.url;
      var identity = url;
      // 查找模型
      var models = this._models;
      var model: FModelResource = models.get(identity);
      if (model) {
         return model;
      }
      // 创建模型资源
      model = RClass.create(FModelResource);
      //model.setGuid(identity);
      //model.setVendor(vendor);
      //model.setSourceUrl(url);
      // 创建加载器
      this._resourceConsole.loadContent(EDataContent.Binary, model, url);
      // 存储模型
      models.set(identity, model);
      return model;
   }

   //==========================================================
   // <T>加载唯一编码的模型资源。</T>
   //
   // @param guid 唯一编号
   // @return 模型资源
   //==========================================================
   public loadByGuid(guid: string): FModelResource {
      var args = RMemory.alloc(SLoadArgs);
      args.guid = guid;
      var model = this.load(args);
      RMemory.free(args);
      return model;
   }

   //==========================================================
   // <T>加载指定代码的模型资源。</T>
   //
   // @param code 代码
   // @return 模型资源
   //==========================================================
   public loadByCode(code: string): FModelResource {
      var args = RMemory.alloc(SLoadArgs);
      args.code = code;
      var model = this.load(args);
      RMemory.free(args);
      return model;
   }

   //==========================================================
   // <T>加载指定地址的模型资源。</T>
   //
   // @param url 网络地址
   // @return 模型资源
   //==========================================================
   public loadByUrl(url: string): FModelResource {
      var args = RMemory.alloc(SLoadArgs);
      args.url = url;
      var model = this.load(args);
      RMemory.free(args);
      return model;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._models = RObject.dispose(this._models, true);
      // this._meshs = RObject.free(this._meshs);
      // this._skeletons = RObject.free(this._skeletons);
      // this._animations = RObject.free(this._animations);
      // 父处理
      super.dispose();
   }
}