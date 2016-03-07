//==========================================================
// <T>模板控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FE3dTemplateConsole{
//    o = MO.Class.inherits(this, o, MO.FConsole);
//    //..........................................................
//    // @attribute
//    o._scopeCd    = MO.EScope.Local;
//    // @attribute
//    o._pools      = null;
//    //..........................................................
//    // @method
//    o.construct   = MO.FE3dTemplateConsole_construct;
//    // @method
//    o.alloc       = MO.FE3dTemplateConsole_alloc;
//    o.allocByGuid = MO.FE3dTemplateConsole_allocByGuid;
//    o.allocByCode = MO.FE3dTemplateConsole_allocByCode;
//    o.free        = MO.FE3dTemplateConsole_free;
//    // @method
//    o.dispose     = MO.FE3dTemplateConsole_dispose;
//    return o;
// }

// //==========================================================
// // <T>构造处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dTemplateConsole_construct = function FE3dTemplateConsole_construct(){
//    var o = this;
//    o.__base.FConsole.construct.call(o);
//    // 设置属性
//    o._pools = MO.Class.create(MO.FObjectPools);
// }

// //==========================================================
// // <T>根据信息收集一个模板实例。</T>
// //
// // @method
// // @param args:SE3sLoadArgs 加载参数
// // @return FE3dTemplate 渲染模板
// //==========================================================
// MO.FE3dTemplateConsole_alloc = function FE3dTemplateConsole_alloc(args){
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
//    // 尝试从缓冲池中取出
//    var template = o._pools.alloc(identity);
//    if(!template){
//       // 加载渲染对象
//       var resource = MO.Console.find(MO.FE3sTemplateConsole).load(args);
//       MO.Assert.debugNotNull(resource);
//       // 加载模板
//       template = MO.Class.create(MO.FE3dTemplate);
//       template.linkGraphicContext(context);
//       template.setPoolCode(identity);
//       template.setResource(resource);
//       // 追加到加载队列
//       MO.Console.find(MO.FProcessLoadConsole).push(template);
//    }
//    return template;
// }

// //==========================================================
// // <T>根据唯一编号收集一个渲染模板。</T>
// //
// // @method
// // @param context:FGraphicContext 渲染环境
// // @param guid:String 唯一编号
// // @return FE3dTemplate 渲染模板
// //==========================================================
// MO.FE3dTemplateConsole_allocByGuid = function FE3dTemplateConsole_allocByGuid(context, guid){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.context = context;
//    args.guid = guid;
//    var template = o.alloc(args);
//    MO.Memory.free(args);
//    return template;
// }

// //==========================================================
// // <T>根据代码收集一个渲染模板。</T>
// //
// // @method
// // @param context:FGraphicContext 渲染环境
// // @param code:String 唯一编号
// // @return FE3dTemplate 渲染模板
// //==========================================================
// MO.FE3dTemplateConsole_allocByCode = function FE3dTemplateConsole_allocByCode(context, code){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.context = context;
//    args.code = code;
//    var template = o.alloc(args);
//    MO.Memory.free(args);
//    return template;
// }

// //==========================================================
// // <T>释放一个渲染模板。</T>
// //
// // @method
// // @param template:FE3dTemplate 渲染模板
// //==========================================================
// MO.FE3dTemplateConsole_free = function FE3dTemplateConsole_free(template){
//    var o = this;
//    // 放到缓冲池
//    var code = template.poolCode();
//    o._pools.free(code, template);
// }

// //==========================================================
// // <T>释放处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dTemplateConsole_dispose = function FE3dTemplateConsole_dispose(){
//    var o = this;
//    // 释放属性
//    o._pools = MO.Lang.Object.dispose(o._pools);
//    // 父处理
//    o.__base.FConsole.dispose.call(o);
// }
}