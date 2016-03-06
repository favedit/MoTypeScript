//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FE3rModelConsole{
//    o = MO.Class.inherits(this, o, MO.FConsole);
//    //..........................................................
//    // @attribute
//    o._scopeCd       = MO.EScope.Local;
//    // @attribute
//    o._models        = MO.Class.register(o, new MO.AGetter('_models'));
//    o._meshs         = MO.Class.register(o, new MO.AGetter('_meshs'));
//    o._dynamicMeshs  = null;
//    //..........................................................
//    // @method
//    o.construct      = MO.FE3rModelConsole_construct;
//    // @method
//    o.registerModel  = MO.FE3rModelConsole_registerModel;
//    o.registerMesh   = MO.FE3rModelConsole_registerMesh;
//    // @method
//    o.findModel      = MO.FE3rModelConsole_findModel;
//    o.findMesh       = MO.FE3rModelConsole_findMesh;
//    // @method
//    o.load           = MO.FE3rModelConsole_load;
//    o.loadByGuid     = MO.FE3rModelConsole_loadByGuid;
//    o.loadByCode     = MO.FE3rModelConsole_loadByCode;
//    o.loadMeshByGuid = MO.FE3rModelConsole_loadMeshByGuid;
//    o.loadMeshByCode = MO.FE3rModelConsole_loadMeshByCode;
//    o.merge          = MO.FE3rModelConsole_merge;
//    return o;
// }

// //==========================================================
// // <T>构造处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3rModelConsole_construct = function FE3rModelConsole_construct(){
//    var o = this;
//    o.__base.FConsole.construct.call(o);
//    // 设置属性
//    o._models = new MO.TDictionary();
//    o._meshs = new MO.TDictionary();
//    o._dynamicMeshs = new MO.TDictionary();
// }

// //==========================================================
// // <T>注册一个模型。</T>
// //
// // @method
// // @param code:String 代码
// // @param model:FE3rModel 模型
// //==========================================================
// MO.FE3rModelConsole_registerModel = function FE3rModelConsole_registerModel(code, model){
//    MO.Assert.debugNotEmpty(code);
//    MO.Assert.debugNotNull(model);
//    this._models.set(code, model);
// }

// //==========================================================
// // <T>注册一个网格。</T>
// //
// // @method
// // @param code:String 代码
// // @param mesh:FE3rMesh 模型
// //==========================================================
// MO.FE3rModelConsole_registerMesh = function FE3rModelConsole_registerMesh(code, mesh){
//    MO.Assert.debugNotEmpty(code);
//    MO.Assert.debugNotNull(mesh);
//    this._meshs.set(code, mesh);
// }

// //==========================================================
// // <T>根据唯一编号查找渲染模型。</T>
// //
// // @method
// // @param guid:String 唯一编号
// // @return FE3sModel 渲染模型
// //==========================================================
// MO.FE3rModelConsole_findModel = function FE3rModelConsole_findModel(guid){
//    return this._models.get(guid);
// }

// //==========================================================
// // <T>根据唯一编号查找渲染网格。</T>
// //
// // @method
// // @param guid:String 唯一编号
// // @return FE3sMesh 渲染网格
// //==========================================================
// MO.FE3rModelConsole_findMesh = function FE3rModelConsole_findMesh(guid){
//    return this._meshs.get(guid);
// }

// //==========================================================
// // <T>加载一个渲染模型。</T>
// //
// // @method
// // @param args:SE3sLoadArgs 加载参数
// // @return FE3rModel 渲染模型
// //==========================================================
// MO.FE3rModelConsole_load = function FE3rModelConsole_load(args){
//    var o = this;
//    // 获得环境
//    var context = args.context;
//    MO.Assert.debugNotNull(context);
//    // 获得标识
//    var identity = null;
//    var guid = args.guid;
//    if(!MO.Lang.String.isEmpty(guid)){
//       identity = guid;
//    }
//    var code = args.code;
//    if(!MO.Lang.String.isEmpty(code)){
//       identity = code;
//    }
//    MO.Assert.debugNotEmpty(identity);
//    // 查找模型
//    var models = o._models;
//    var model = models.get(identity);
//    if(!model){
//       // 获得路径
//       var resource = MO.Console.find(MO.FE3sModelConsole).load(args);
//       // 加载模型
//       model = MO.Class.create(MO.FE3rModel);
//       model.linkGraphicContext(context);
//       model.setCode(identity);
//       model.setResource(resource);
//       models.set(identity, model);
//       // 追加到加载队列
//       MO.Console.find(MO.FProcessLoadConsole).push(model);
//    }
//    return model;
// }

// //==========================================================
// // <T>加载一个渲染模型。</T>
// //
// // @method
// // @param content:FG3dContext 环境
// // @param code:String 代码
// // @return FE3rModel 渲染模型
// //==========================================================
// MO.FE3rModelConsole_loadByGuid = function FE3rModelConsole_loadByGuid(context, guid){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.context = context;
//    args.guid = guid;
//    var model = o.load(args);
//    MO.Memory.free(args);
//    return model;
// }

// //==========================================================
// // <T>加载一个渲染模型。</T>
// //
// // @method
// // @param content:FG3dContext 环境
// // @param code:String 代码
// // @return FE3rModel 渲染模型
// //==========================================================
// MO.FE3rModelConsole_loadByCode = function FE3rModelConsole_loadByCode(context, code){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.context = context;
//    args.code = code;
//    var model = o.load(args);
//    MO.Memory.free(args);
//    return model;
// }

// //==========================================================
// // <T>加载一个渲染模型。</T>
// //
// // @method
// // @param content:FG3dContext 环境
// // @param guid:String 唯一编号
// // @return FE3rModel 渲染模型
// //==========================================================
// MO.FE3rModelConsole_loadMeshByGuid = function FE3rModelConsole_loadMeshByGuid(context, pg){
//    var o = this;
//    // 检查参数
//    if(!context){
//       throw new MO.TError('Graphics context is empty');
//    }
//    if(!guid){
//       throw new MO.TError('Model guid is empty');
//    }
//    // 查找模型
//    var m = o._models.get(pg);
//    if(m){
//       return m;
//    }
//    // 获得路径
//    var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
//    // 加载模型
//    m = MO.Class.create(MO.FE3rModel);
//    m.linkGraphicContext(pc);
//    m.setCode(pg);
//    m.setResource(rm);
//    o._models.set(pg, m);
//    // 测试是否已加载
//    if(rm.testReady()){
//       m.loadResource(rm);
//    }else{
//       // 追加到加载队列
//       MO.Console.find(MO.FProcessLoadConsole).push(m);
//    }
//    return m;
// }

// //==========================================================
// // <T>加载一个渲染模型。</T>
// //
// // @method
// // @param pc:content:FG3dContext 环境
// // @param pg:guid:String 唯一编号
// // @return FRenderModel 渲染模型
// //==========================================================
// MO.FE3rModelConsole_loadMeshByCode = function FE3rModelConsole_loadMeshByCode(context, pg){
//    var o = this;
//    // 检查参数
//    if(!MO.Class.isClass(context, MO.MGraphicObject)){
//       throw new MO.TError('Graphics context is empty');
//    }
//    if(MO.Lang.String.isEmpty(pg)){
//       throw new MO.TError('Model guid is empty');
//    }
//    //..........................................................
//    // 查找模型
//    var model = o._models.get(pg);
//    if(model){
//       return model;
//    }
//    //..........................................................
//    // 获得资源
//    var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
//    // 加载模型
//    model = MO.Class.create(MO.FE3rModel);
//    model.linkGraphicContext(pc);
//    model.setCode(pg);
//    model.setResource(resource);
//    o._models.set(pg, model);
//    // 测试是否已加载
//    if(rm.testReady()){
//       m.loadResource(rm);
//    }else{
//       // 追加到加载队列
//       MO.Console.find(MO.FProcessLoadConsole).push(m);
//    }
//    return m;
// }

// //==========================================================
// // <T>获得渲染网格集合。</T>
// //
// // @method
// // @param effect:FE3dEffect 渲染器
// // @param region:FE3dRegion 区域
// // @param offset:Integer 开始位置
// // @param count:Integer 总数
// // @return FE3rDynamicModel 动态网格
// //==========================================================
// MO.FE3rModelConsole_merge = function FE3rModelConsole_merge(effect, region, offset, count){
//    var o = this;
//    // 获得代码
//    var flag = 'merge';
//    var renderables = region.renderables();
//    for(var i = 0; i < count; i++){
//       var renderable = renderables.getAt(offset + i);
//       flag += '|' + renderable.hashCode();
//    }
//    // 合并网格
//    var model = o._dynamicMeshs.get(flag);
//    if(!model){
//       model = MO.Class.create(MO.FE3rDynamicModel);
//       model.linkGraphicContext(region);
//       for(var i = 0; i < count; i++){
//          var renderable = renderables.getAt(offset + i);
//          model.pushRenderable(renderable);
//       }
//       model.build();
//       o._dynamicMeshs.set(flag, model);
//       MO.Logger.info(o, 'Create merge model. (mesh={1}, renderables={2})', model.meshes().count(), model.renderables().count());
//    }
//    model.update();
//    return model;
// }
}