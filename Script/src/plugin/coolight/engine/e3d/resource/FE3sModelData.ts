//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
export class FE3sModelData{
//    o = MO.Class.inherits(this, o, MO.FE3sResource);
//    //..........................................................
//    // @attribute
//    o._typeName      = 'Model';
//    // @attribute
//    o._meshes        = MO.Class.register(o, new MO.AGetter('_meshes'));
//    o._skeletons     = MO.Class.register(o, new MO.AGetter('_skeletons'));
//    o._animations    = MO.Class.register(o, new MO.AGetter('_animations'));
//    //..........................................................
//    o.construct      = MO.FE3sModelData_construct;
//    // @method
//    o.findMeshByCode = MO.FE3sModelData_findMeshByCode;
//    // @method
//    o.unserialize    = MO.FE3sModelData_unserialize;
//    return o;
// }

// //==========================================================
// // <T>构造处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3sModelData_construct = function FE3sModelData_construct(){
//    var o = this;
//    o.__base.FE3sResource.construct.call(o);
//    // 设置属性
// }

// //==========================================================
// // <T>根据代码查找网格。</T>
// //
// // @method
// // @param code:String 代码
// // @return FE3sMesh 网格
// //==========================================================
// MO.FE3sModelData_findMeshByCode = function FE3sModelData_findMeshByCode(code){
//    var meshes = this._meshes;
//    var count = meshes.count();
//    for(var i = 0; i < count; i++){
//       var mesh = meshes.at(i);
//       if(mesh.code() == code){
//          return mesh;
//       }
//    }
//    return null;
// }

// //==========================================================
// // <T>从输入流里反序列化信息内容</T>
// //
// // @param input:FByteStream 数据流
// // @return 处理结果
// //==========================================================
// MO.FE3sModelData_unserialize = function FE3sModelData_unserialize(input){
//    // 读取父信息
//    var o = this;
//    o.__base.FE3sResource.unserialize.call(o, input);
//    //..........................................................
//    // 存储模型
//    var modelConsole = MO.Console.find(MO.FE3sModelConsole);
//    modelConsole.models().set(o.guid(), o);
//    //..........................................................
//    // 读取几何体集合
//    var meshCount = input.readInt32();
//    if(meshCount > 0){
//       var meshes = o._meshes = new MO.TDictionary();
//       for(var i = 0; i < meshCount; i++){
//          // 创建网格
//          var mesh = modelConsole.unserialMesh(input)
//          meshes.set(mesh.guid(), mesh);
//       }
//    }
//    //..........................................................
//    // 读取骨骼集合
//    var skeletonCount = input.readInt32();
//    if(skeletonCount > 0){
//       var skeletons = o._skeletons = new MO.TDictionary();
//       for(var i = 0; i < skeletonCount; i++){
//          // 创建骨骼
//          var skeleton = modelConsole.unserialSkeleton(input)
//          skeletons.set(skeleton.guid(), skeleton);
//       }
//    }
//    //..........................................................
//    // 读取动画集合
//    var animationCount = input.readInt32();
//    if(animationCount > 0){
//       var animations = o._animations = new MO.TDictionary();
//       for(var i = 0; i < animationCount; i++){
//          // 创建动画
//          var animation = modelConsole.unserialAnimation(o, input)
//          animations.set(animation.guid(), animation);
//       }
//    }
//    //..........................................................
//    MO.Logger.info(o, "Unserialize model data success. (guid={1}, code={2}, mesh_count={3}, skeleton_count={4}, animation_count={5})", o._guid, o._code, meshCount, skeletonCount, animationCount);
// }
}