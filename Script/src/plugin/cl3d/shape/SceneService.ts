import {ScopeEnum} from '../../runtime/common/lang/ScopeEnum';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {StringUtil} from '../../runtime/common/lang/StringUtil';
import {ObjectPools} from '../../runtime/common/lang/ObjectPools';
import {Linker} from '../../runtime/common/reflect/Linker';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {AssertUtil} from '../../runtime/common/AssertUtil';
import {MemoryUtil} from '../../runtime/common/MemoryUtil';
import {Service} from '../../runtime/core/Service';
import {ProcessLoadService} from '../../runtime/core/service/ProcessLoadService';
import {LoadArgs} from '../resource/LoadArgs';
import {SceneResourceConsole} from '../resource/SceneResourceConsole';
import {Scene} from './Scene';

//==========================================================
// <T>场景控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class SceneService extends Service {
   //    // @attribute
   //    o._loadDisplays = null;
   //    o._loadScenes   = null;
   public _pools;
   // 加载处理器
   @Linker(SceneResourceConsole)
   protected _resourceConsole: SceneResourceConsole;
   // 加载处理器
   @Linker(ProcessLoadService)
   protected _processLoadConsole: ProcessLoadService;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._pools = ClassUtil.create(ObjectPools);
   }

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

   //==========================================================
   // <T>根据信息收集一个场景实例。</T>
   //
   // @method
   // @param args:SE3sLoadArgs 加载参数
   // @return FE3dScene 渲染场景
   //==========================================================
   public alloc(args: LoadArgs): Scene {
      // 获得环境
      var context = args.context;
      AssertUtil.debugNotNull(context);
      // 获得标识
      var identity = null;
      var guid = args.guid;
      if (!StringUtil.isEmpty(guid)) {
         identity = guid;
      }
      var code = args.code;
      if (!StringUtil.isEmpty(code)) {
         identity = code;
      }
      var url: string = args.url;
      if (!StringUtil.isEmpty(url)) {
         identity = url;
      }
      AssertUtil.debugNotEmpty(identity);
      // 尝试从缓冲池中取出
      var scene: Scene = this._pools.alloc(identity);
      if (!scene) {
         // 加载渲染对象
         var resource = this._resourceConsole.load(args);
         // 加载模型
         scene = ClassUtil.create(Scene);
         scene.linkGraphicContext(context);
         scene.resource = resource;
         //scene.setPoolCode(identity);
         //scene.setResource(resource);
         //scene.setup();
         // 追加到加载队列
         this._processLoadConsole.push(scene.loadHook);
      }
      return scene;
   }

   //==========================================================
   // <T>收集一个场景。</T>
   //
   // @param context 渲染环境
   // @param guid 唯一编号
   // @return 渲染场景
   //==========================================================
   public allocByGuid(context, guid): Scene {
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.guid = guid;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>收集一个场景。</T>
   //
   // @method
   // @param context 渲染环境
   // @param code 代码
   // @return 渲染场景
   //==========================================================
   public allocByCode(context, code): Scene {
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.code = code;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>根据代码收集一个渲染场景。</T>
   //
   // @param context 渲染环境
   // @param url 网络地址
   // @return 渲染场景
   //==========================================================
   public allocByUrl(context, url: string): Scene {
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.url = url;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   // //==========================================================
   // // <T>释放一个场景。</T>
   // //
   // // @method
   // // @param scene:FE3dScene 场景
   // //==========================================================
   // public free(scene){
   //    var o = this;
   //    // 放到缓冲池
   //    var code = scene.poolCode();
   //    o._pools.free(code, scene);
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._pools = ObjectUtil.dispose(this._pools);
      // 父处理
      super.dispose();
   }
}