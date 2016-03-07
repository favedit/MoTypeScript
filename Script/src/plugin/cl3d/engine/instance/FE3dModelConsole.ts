import {EScope} from '../../runtime/common/lang/EScope'
import {FObjectPools} from '../../runtime/common/lang/FObjectPools'
import {RString} from '../../runtime/common/lang/RString'
import {RAssert} from '../../runtime/common/RAssert'
import {RMemory} from '../../runtime/common/RMemory'
import {ALinker} from '../../runtime/common/reflect/ALinker'
import {RClass} from '../../runtime/common/reflect/RClass'
import {FProcessLoadConsole} from '../../runtime/core/console/FProcessLoadConsole'
import {FConsole} from '../../runtime/core/FConsole'
import {RConsole} from '../../runtime/core/RConsole'
import {SLoadArgs} from '../resource/SLoadArgs'
import {FE3rModelConsole} from '../render/FE3rModelConsole'
import {FE3dModel} from './FE3dModel'

//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FE3dModelConsole extends FConsole {
   // 缓冲集合
   protected _pools: FObjectPools = null;
   // 加载处理器
   @ALinker(FProcessLoadConsole)
   protected _processLoadConsole: FProcessLoadConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.scopeCd = EScope.Local;
      this._pools = RClass.create(FObjectPools);
   }

   //==========================================================
   // <T>根据信息收集一个模型实例。</T>
   //
   // @method
   // @param args:SE3sLoadArgs 加载参数
   // @return FE3dModel 渲染模型
   //==========================================================
   public alloc(args) {
      // 获得环境
      var context = args.context;
      RAssert.debugNotNull(context);
      // 获得标识
      var identity = null;
      var guid = args.guid;
      if (!RString.isEmpty(guid)) {
         identity = guid;
      }
      var code = args.code;
      if (!RString.isEmpty(code)) {
         identity = code;
      }
      var url = args.url;
      if (!RString.isEmpty(url)) {
         identity = url;
      }
      RAssert.debugNotEmpty(identity);
      // 尝试从缓冲池中取出
      var model = this._pools.alloc(identity);
      if (!model) {
         // 加载渲染对象
         var renderable = RConsole.find(FE3rModelConsole).load(args);
         RAssert.debugNotNull(renderable);
         // 加载模型
         model = RClass.create(FE3dModel);
         model.linkGraphicContext(context);
         model.setPoolCode(identity);
         model.setRenderable(renderable);
         // 追加到加载队列
         this._processLoadConsole.push(model);
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
   public allocByGuid(context, guid) {
      //var args = RMemory.alloc(SLoadArgs);
      var args = SLoadArgs.innerAlloc();
      args.context = context;
      args.guid = guid;
      var model = this.alloc(args);
      SLoadArgs.innerFree(args);
      //RMemory.free(args);
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
   public allocByCode(context, code) {
      //var args = RMemory.alloc(SLoadArgs);
      var args = SLoadArgs.innerAlloc();
      args.context = context;
      args.code = code;
      var model = this.alloc(args);
      SLoadArgs.innerFree(args);
      //RMemory.free(args);
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
   public allocByUrl(context, url) {
      //var args = RMemory.alloc(SLoadArgs);
      var args = SLoadArgs.innerAlloc();
      args.context = context;
      args.url = url;
      var model = this.alloc(args);
      SLoadArgs.innerFree(args);
      //RMemory.free(args);
      return model;
   }

   // //==========================================================
   // // <T>释放一个模型。</T>
   // //
   // // @method
   // // @param model:FE3dModel 渲染模型
   // //==========================================================
   // MO.FE3dModelConsole_free = function FE3dModelConsole_free(model){
   //    var o = this;
   //    // 放到缓冲池
   //    var code = model.poolCode();
   //    o._pools.free(code, model);
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      // this._pools = MO.Lang.Object.dispose(this._pools);
      // 父处理
      super.dispose();
   }
}
