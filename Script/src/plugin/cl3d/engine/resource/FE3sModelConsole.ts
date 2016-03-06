//==========================================================
// <T>资源模型管理器。</T>
// <P>http://{server}:{port}/cloud.content.model.wv?code={code}&version={version}</P>
//
// @author maocy
// @history 150128
//==========================================================
export class FE3sModelConsole{
//    o = MO.Class.inherits(this, o, MO.FConsole);
//    //..........................................................
//    // @attribute
//    o._models           = MO.Class.register(o, new MO.AGetter('_models'));
//    o._meshs            = MO.Class.register(o, new MO.AGetter('_meshs'));
//    o._skeletons        = MO.Class.register(o, new MO.AGetter('_skeletons'));
//    o._animations       = MO.Class.register(o, new MO.AGetter('_animations'));
//    //..........................................................
//    // @method
//    o.construct         = MO.FE3sModelConsole_construct;
//    // @method
//    o.findModel         = MO.FE3sModelConsole_findModel;
//    o.findMesh          = MO.FE3sModelConsole_findMesh;
//    o.findSkeleton      = MO.FE3sModelConsole_findSkeleton;
//    o.findAnimation     = MO.FE3sModelConsole_findAnimation;
//    // @method
//    o.unserialMesh      = MO.FE3sModelConsole_unserialMesh;
//    o.unserialSkeleton  = MO.FE3sModelConsole_unserialSkeleton;
//    o.unserialAnimation = MO.FE3sModelConsole_unserialAnimation;
//    // @method
//    o.load              = MO.FE3sModelConsole_load;
//    o.loadByGuid        = MO.FE3sModelConsole_loadByGuid;
//    o.loadByCode        = MO.FE3sModelConsole_loadByCode;
//    // @method
//    o.dispose           = MO.FE3sModelConsole_dispose;
//    return o;
// }

// //==========================================================
// // <T>构造处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3sModelConsole_construct = function FE3sModelConsole_construct(){
//    var o = this;
//    o.__base.FConsole.construct.call(o);
//    // 设置变量
//    o._models = new MO.TDictionary();
//    o._meshs = new MO.TDictionary();
//    o._skeletons = new MO.TDictionary();
//    o._animations = new MO.TDictionary();
//    // 注册资源类型
//    //var rc = MO.Console.find(MO.FResourceConsole);
//    //var rp = MO.Class.create(MO.FResourcePipeline);
//    //var rt = MO.Class.create(MO.FResourceType);
//    //rt.setCode('resource3d.model');
//    //rt._pipeline = rp;
//    //rc.registerType(rt);
//    //rc.factory().register('resource3d.model', FE3sModel);
// }

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

// //==========================================================
// // <T>加载指定参数的模型资源。</T>
// //
// // @param args:SE3sLoadArgs 加载参数
// // @return FE3sModel 模型资源
// //==========================================================
// MO.FE3sModelConsole_load = function FE3sModelConsole_load(args){
//    var o = this;
//    // 生成地址
//    var vendor = MO.Console.find(MO.FE3sVendorConsole).find(MO.EE3sResource.Model);
//    var identity = null;
//    var guid = args.guid;
//    if(!MO.Lang.String.isEmpty(guid)){
//       vendor.set('guid', guid);
//       identity = guid;
//    }
//    var code = args.code;
//    if(!MO.Lang.String.isEmpty(code)){
//       vendor.set('code', code);
//       identity = code;
//    }
//    MO.Assert.debugNotEmpty(identity);
//    var url = vendor.makeUrl();
//    // 查找模型
//    var models = o._models;
//    var model = models.get(identity);
//    if(model){
//       return model;
//    }
//    // 创建模型资源
//    model = MO.Class.create(MO.FE3sModel);
//    model.setGuid(identity);
//    model.setVendor(vendor);
//    model.setSourceUrl(url);
//    MO.Console.find(MO.FResourceConsole).load(model);
//    // 存储模型
//    models.set(identity, model);
//    return model;
// }

// //==========================================================
// // <T>加载唯一编码的模型资源。</T>
// //
// // @param guid:String 唯一编号
// // @return FE3sModel 模型资源
// //==========================================================
// MO.FE3sModelConsole_loadByGuid = function FE3sModelConsole_loadByGuid(guid){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.guid = guid;
//    var model = o.load(args);
//    MO.Memory.free(args);
//    return model;
// }

// //==========================================================
// // <T>加载指定代码的模型资源。</T>
// //
// // @param code:String 代码
// // @return FE3sModel 模型资源
// //==========================================================
// MO.FE3sModelConsole_loadByCode = function FE3sModelConsole_loadByCode(code){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.code = code;
//    var model = o.load(args);
//    MO.Memory.free(args);
//    return model;
// }

// //==========================================================
// // <T>释放处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3sModelConsole_dispose = function FE3sModelConsole_dispose(){
//    var o = this;
//    // 释放属性
//    o._models = MO.Lang.Object.free(o._models);
//    o._meshs = MO.Lang.Object.free(o._meshs);
//    o._skeletons = MO.Lang.Object.free(o._skeletons);
//    o._animations = MO.Lang.Object.free(o._animations);
//    // 父处理
//    o.__base.FConsole.dispose.call(o);
// }
}