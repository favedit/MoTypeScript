//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sSceneConsole = function FE3sSceneConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._vendorCode = 'scene';
   o._dataUrl    = '/cloud.content.scene.wv'
   // @attribute
   o._scenes     = null;
   //..........................................................
   // @method
   o.construct   = MO.FE3sSceneConsole_construct;
   // @method
   o.load        = MO.FE3sSceneConsole_load;
   o.loadByGuid  = MO.FE3sSceneConsole_loadByGuid;
   o.loadByCode  = MO.FE3sSceneConsole_loadByCode;
   // @method
   o.dispose     = MO.FE3sSceneConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sSceneConsole_construct = function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._scenes = new MO.TDictionary();
}

//==========================================================
// <T>加载指定参数的场景资源。</T>
//
// @param args:SE3sLoadArgs 加载参数
// @return FE3sScene 资源场景
//==========================================================
MO.FE3sSceneConsole_load = function FE3sSceneConsole_load(args){
   var o = this;
   // 生成地址
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find(MO.EE3sResource.Scene);
   var identity = null;
   var guid = args.guid;
   if(!MO.Lang.String.isEmpty(guid)){
      vendor.set('guid', guid);
      identity = guid;
   }
   var code = args.code;
   if(!MO.Lang.String.isEmpty(code)){
      vendor.set('code', code);
      identity = code;
   }
   MO.Assert.debugNotEmpty(identity);
   var url = vendor.makeUrl();
   // 查找模型
   var scenes = o._scenes;
   var scene = scenes.get(identity);
   if(scene){
      return scene;
   }
   // 创建模型资源
   scene = MO.Class.create(MO.FE3sScene);
   scene.setGuid(identity);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(scene);
   // 存储模型
   scenes.set(identity, scene);
   return scene;
}

//==========================================================
// <T>加载唯一编码的场景资源。</T>
//
// @param guid:String 唯一编号
// @return FE3sScene 场景资源
//==========================================================
MO.FE3sSceneConsole_loadByGuid = function FE3sSceneConsole_loadByGuid(guid){
   var o = this;
   var args = MO.Memory.alloc(MO.SE3sLoadArgs);
   args.guid = guid;
   var scene = o.load(args);
   MO.Memory.free(args);
   return scene;
}

//==========================================================
// <T>加载指定代码的场景资源。</T>
//
// @param code:String 代码
// @return FE3sScene 场景资源
//==========================================================
MO.FE3sSceneConsole_loadByCode = function FE3sSceneConsole_loadByCode(code){
   var o = this;
   var args = MO.Memory.alloc(MO.SE3sLoadArgs);
   args.code = code;
   var scene = o.load(args);
   MO.Memory.free(args);
   return scene;
}


//==========================================================
// <T>加载指定代码的场景资源。</T>
//
// @param code:String 代码
// @return FE3sScene 场景资源
//==========================================================
MO.FE3sSceneConsole_dispose = function FE3sSceneConsole_dispose(code){
   var o = this;
   // 释放属性
   o._scenes = MO.Lang.Object.dispose(o._scenes, true);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
