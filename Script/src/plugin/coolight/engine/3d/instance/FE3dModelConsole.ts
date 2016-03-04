//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
MO.FE3dModelConsole = function FE3dModelConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = MO.EScope.Local;
   // @attribute
   o._pools      = MO.Class.register(o, new MO.AGetter('_pools'));
   //..........................................................
   // @method
   o.construct   = MO.FE3dModelConsole_construct;
   // @method
   o.alloc       = MO.FE3dModelConsole_alloc;
   o.allocByGuid = MO.FE3dModelConsole_allocByGuid;
   o.allocByCode = MO.FE3dModelConsole_allocByCode;
   o.free        = MO.FE3dModelConsole_free;
   // @method
   o.dispose     = MO.FE3dModelConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dModelConsole_construct = function FE3dModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._pools = MO.Class.create(MO.FObjectPools);
}

//==========================================================
// <T>根据信息收集一个模型实例。</T>
//
// @method
// @param args:SE3sLoadArgs 加载参数
// @return FE3dModel 渲染模型
//==========================================================
MO.FE3dModelConsole_alloc = function FE3dModelConsole_alloc(args){
   var o = this;
   // 获得环境
   var context = args.context;
   MO.Assert.debugNotNull(context);
   // 获得标识
   var identity = null;
   var guid = args.guid;
   if(!MO.Lang.String.isEmpty(guid)){
      identity = guid;
   }
   var code = args.code;
   if(!MO.Lang.String.isEmpty(code)){
      identity = code;
   }
   MO.Assert.debugNotEmpty(identity);
   // 尝试从缓冲池中取出
   var model = o._pools.alloc(identity);
   if(!model){
      // 加载渲染对象
      var renderable = MO.Console.find(MO.FE3rModelConsole).load(args);
      MO.Assert.debugNotNull(renderable);
      // 加载模型
      model = MO.Class.create(MO.FE3dModel);
      model.linkGraphicContext(context);
      model.setPoolCode(identity);
      model.setRenderable(renderable);
      // 追加到加载队列
      MO.Console.find(MO.FProcessLoadConsole).push(model);
   }
   return model;
}

//==========================================================
// <T>根据唯一编号加载一个模型。</T>
//
// @method
// @param context:MGraphicObject 渲染环境
// @param guid:String 唯一编码
// @return FE3dModel 渲染模型
//==========================================================
MO.FE3dModelConsole_allocByGuid = function FE3dModelConsole_allocByGuid(context, guid){
   var o = this;
   var args = MO.Memory.alloc(MO.SE3sLoadArgs);
   args.context = context;
   args.guid = guid;
   var model = o.alloc(args);
   MO.Memory.free(args);
   return model;
}

//==========================================================
// <T>根据代码加载一个模型。</T>
//
// @method
// @param context:MGraphicObject 渲染环境
// @param code:String 代码
// @return FE3dModel 渲染模型
//==========================================================
MO.FE3dModelConsole_allocByCode = function FE3dModelConsole_allocByCode(context, code){
   var o = this;
   var args = MO.Memory.alloc(MO.SE3sLoadArgs);
   args.context = context;
   args.code = code;
   var model = o.alloc(args);
   MO.Memory.free(args);
   return model;
}

//==========================================================
// <T>释放一个模型。</T>
//
// @method
// @param model:FE3dModel 渲染模型
//==========================================================
MO.FE3dModelConsole_free = function FE3dModelConsole_free(model){
   var o = this;
   // 放到缓冲池
   var code = model.poolCode();
   o._pools.free(code, model);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dModelConsole_dispose = function FE3dModelConsole_dispose(){
   var o = this;
   // 释放属性
   o._pools = MO.Lang.Object.dispose(o._pools);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
