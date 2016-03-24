import {ScopeEnum} from '../../runtime/common/lang/ScopeEnum'
import {ObjectPools} from '../../runtime/common/lang/ObjectPools'
import {RString} from '../../runtime/common/lang/RString'
import {RObject} from '../../runtime/common/lang/RObject'
import {RAssert} from '../../runtime/common/RAssert'
import {RMemory} from '../../runtime/common/RMemory'
import {ALinker} from '../../runtime/common/reflect/ALinker'
import {RClass} from '../../runtime/common/reflect/RClass'
import {FProcessLoadConsole} from '../../runtime/core/console/FProcessLoadConsole'
import {FConsole} from '../../runtime/core/FConsole'
import {RConsole} from '../../runtime/core/RConsole'
import {SLoadArgs} from '../resource/SLoadArgs'
import {FRenderModelConsole} from './render/FRenderModelConsole'
import {FModel} from './FModel'

//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FModelConsole extends FConsole {
   // 缓冲集合
   protected _pools: ObjectPools;
   // 加载管理器
   @ALinker(FProcessLoadConsole)
   protected _processLoadConsole: FProcessLoadConsole;
   // 渲染模型管理器
   @ALinker(FRenderModelConsole)
   protected _renderModelConsole: FRenderModelConsole;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._pools = RClass.create(ObjectPools);
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
      var identity: string = null;
      var guid: string = args.guid;
      if (!RString.isEmpty(guid)) {
         identity = guid;
      }
      var code: string = args.code;
      if (!RString.isEmpty(code)) {
         identity = code;
      }
      var url: string = args.url;
      if (!RString.isEmpty(url)) {
         identity = url;
      }
      RAssert.debugNotEmpty(identity);
      // 尝试从缓冲池中取出
      var model: FModel = this._pools.alloc(identity);
      if (!model) {
         // 加载渲染对象
         var renderable = this._renderModelConsole.load(args);
         RAssert.debugNotNull(renderable);
         // 加载模型
         model = RClass.create(FModel);
         model.linkGraphicContext(context);
         //model.setPoolCode(identity);
         model.renderable = renderable;
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
      var args = RMemory.alloc(SLoadArgs);
      args.context = context;
      args.guid = guid;
      var model = this.alloc(args);
      RMemory.free(args);
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
      var args = RMemory.alloc(SLoadArgs);
      args.context = context;
      args.code = code;
      var model = this.alloc(args);
      RMemory.free(args);
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
      var args = RMemory.alloc(SLoadArgs);
      args.context = context;
      args.url = url;
      var model = this.alloc(args);
      RMemory.free(args);
      return model;
   }

   //==========================================================
   // <T>释放一个模型。</T>
   //
   // @param model 渲染模型
   //==========================================================
   public free(model) {
      // 放到缓冲池
      var code = model.poolCode();
      this._pools.free(code, model);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._pools = RObject.dispose(this._pools);
      // 父处理
      super.dispose();
   }
}
