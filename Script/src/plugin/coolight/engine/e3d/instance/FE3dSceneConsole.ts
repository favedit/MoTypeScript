//==========================================================
// <T>场景控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FE3dSceneConsole{
//    o = MO.Class.inherits(this, o, MO.FConsole);
//    //..........................................................
//    // @attribute
//    o._scopeCd      = MO.EScope.Local;
//    // @attribute
//    o._loadDisplays = null;
//    o._loadScenes   = null;
//    o._pools        = null;
//    // @attribute
//    o._thread       = null;
//    o._interval     = 100;
//    //..........................................................
//    // @event
//    o.onProcess     = MO.FE3dSceneConsole_onProcess;
//    //..........................................................
//    // @method
//    o.construct     = MO.FE3dSceneConsole_construct;
//    // @method
//    o.scenes        = MO.FE3dSceneConsole_scenes;
//    // @method
//    o.loadDisplay   = MO.FE3dSceneConsole_loadDisplay;
//    // @method
//    o.alloc         = MO.FE3dSceneConsole_alloc;
//    o.allocByGuid   = MO.FE3dSceneConsole_allocByGuid;
//    o.allocByCode   = MO.FE3dSceneConsole_allocByCode;
//    o.free          = MO.FE3dSceneConsole_free;
//    // @method
//    o.dispose       = MO.FE3dSceneConsole_dispose;
//    return o;
// }

// //==========================================================
// // <T>逻辑处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dSceneConsole_onProcess = function FE3dSceneConsole_onProcess(){
//    var o = this;
//    //..........................................................
//    // 处理加载显示
//    var displays = o._loadDisplays;
//    displays.record();
//    while(displays.next()){
//       var display = displays.current();
//       if(display.processLoad()){
//          displays.removeCurrent();
//       }
//    }
//    //..........................................................
//    // 处理加载场景
//    //var scenes = o._loadScenes;
//    //scenes.record();
//    //while(scenes.next()){
//    //   var scene = scenes.current();
//    //   if(scene.processLoad()){
//    //      scenes.removeCurrent();
//    //   }
//    //}
// }

// //==========================================================
// // <T>构造处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dSceneConsole_construct = function FE3dSceneConsole_construct(){
//    var o = this;
//    // 设置属性
//    o._loadDisplays = new MO.TLooper();
//    o._loadScenes = new MO.TLooper();
//    o._pools = MO.Class.create(MO.FObjectPools);
//    // 创建线程
//    var thread = o._thread = MO.Class.create(MO.FThread);
//    thread.setInterval(o._interval);
//    thread.addProcessListener(o, o.onProcess);
//    MO.Console.find(MO.FThreadConsole).start(thread);
// }

// //==========================================================
// // <T>获得场景集合。</T>
// //
// // @method
// // @return TDictionary 场景集合
// //==========================================================
// MO.FE3dSceneConsole_scenes = function FE3dSceneConsole_scenes(){
//    return this._scenes;
// }

// //==========================================================
// // <T>加载一个显示对象。</T>
// //
// // @method
// // @param display:FE3dSceneDisplay 显示对象
// //==========================================================
// MO.FE3dSceneConsole_loadDisplay = function FE3dSceneConsole_loadDisplay(display){
//    this._loadDisplays.push(display);
// }

// //==========================================================
// // <T>根据信息收集一个场景实例。</T>
// //
// // @method
// // @param args:SE3sLoadArgs 加载参数
// // @return FE3dScene 渲染场景
// //==========================================================
// MO.FE3dSceneConsole_alloc = function FE3dSceneConsole_alloc(args){
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
//    var scene = o._pools.alloc(identity);
//    if(!scene){
//       // 加载渲染对象
//       var resource = MO.Console.find(MO.FE3sSceneConsole).load(args);
//       // 加载模型
//       scene = MO.Class.create(MO.FE3dScene);
//       scene.linkGraphicContext(context);
//       scene.setPoolCode(identity);
//       scene.setResource(resource);
//       scene.setup();
//       // 追加到加载队列
//       MO.Console.find(MO.FProcessLoadConsole).push(scene);
//    }
//    return scene;
// }

// //==========================================================
// // <T>收集一个场景。</T>
// //
// // @method
// // @param context:FGraphicContext 渲染环境
// // @param guid:String 唯一编号
// // @return FE3dScene 渲染模型
// //==========================================================
// MO.FE3dSceneConsole_allocByGuid = function FE3dSceneConsole_allocByGuid(context, guid){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.context = context;
//    args.guid = guid;
//    var scene = o.alloc(args);
//    MO.Memory.free(args);
//    return scene;
// }

// //==========================================================
// // <T>收集一个场景。</T>
// //
// // @method
// // @param context:FGraphicContext 渲染环境
// // @param code:String 代码
// // @return FE3dScene 渲染模型
// //==========================================================
// MO.FE3dSceneConsole_allocByCode = function FE3dSceneConsole_allocByCode(context, code){
//    var o = this;
//    var args = MO.Memory.alloc(MO.SE3sLoadArgs);
//    args.context = context;
//    args.code = code;
//    var scene = o.alloc(args);
//    MO.Memory.free(args);
//    return scene;
// }

// //==========================================================
// // <T>释放一个场景。</T>
// //
// // @method
// // @param scene:FE3dScene 场景
// //==========================================================
// MO.FE3dSceneConsole_free = function FE3dSceneConsole_free(scene){
//    var o = this;
//    // 放到缓冲池
//    var code = scene.poolCode();
//    o._pools.free(code, scene);
// }

// //==========================================================
// // <T>释放处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dSceneConsole_dispose = function FE3dSceneConsole_dispose(){
//    var o = this;
//    // 释放属性
//    o._pools = MO.Lang.Object.dispose(o._pools);
//    // 父处理
//    o.__base.FConsole.dispose.call(o);
// }
}