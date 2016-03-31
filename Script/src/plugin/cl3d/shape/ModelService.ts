import {ScopeEnum} from '../../runtime/common/lang/ScopeEnum'
import {ObjectPools} from '../../runtime/common/lang/ObjectPools'
import {StringUtil} from '../../runtime/common/lang/StringUtil'
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil'
import {AssertUtil} from '../../runtime/common/AssertUtil'
import {MemoryUtil} from '../../runtime/common/MemoryUtil'
import {Linker} from '../../runtime/common/reflect/Linker'
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil'
import {ProcessLoadService} from '../../runtime/core/service/ProcessLoadService'
import {Service} from '../../runtime/core/Service'
import {ServiceUtil} from '../../runtime/core/ServiceUtil'
import {LoadArgs} from '../resource/LoadArgs'
import {PoolModelConsole} from '../pool/PoolModelConsole'
import {Model} from './Model'

//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class ModelService extends Service {
   // 缓冲集合
   protected _pools: ObjectPools;
   // 加载管理器
   @Linker(ProcessLoadService)
   protected _processLoadConsole: ProcessLoadService;
   // 渲染模型管理器
   @Linker(PoolModelConsole)
   protected _renderModelConsole: PoolModelConsole;

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
      AssertUtil.debugNotNull(context);
      // 获得标识
      var identity: string = null;
      var guid: string = args.guid;
      if (!StringUtil.isEmpty(guid)) {
         identity = guid;
      }
      var code: string = args.code;
      if (!StringUtil.isEmpty(code)) {
         identity = code;
      }
      var url: string = args.url;
      if (!StringUtil.isEmpty(url)) {
         identity = url;
      }
      AssertUtil.debugNotEmpty(identity);
      // 尝试从缓冲池中取出
      var model: Model = this._pools.alloc(identity);
      if (!model) {
         // 加载渲染对象
         var renderable = this._renderModelConsole.load(args);
         AssertUtil.debugNotNull(renderable);
         // 加载模型
         model = ClassUtil.create(Model);
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
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.guid = guid;
      var model = this.alloc(args);
      MemoryUtil.free(args);
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
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.code = code;
      var model = this.alloc(args);
      MemoryUtil.free(args);
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
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.url = url;
      var model = this.alloc(args);
      MemoryUtil.free(args);
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
      this._pools = ObjectUtil.dispose(this._pools);
      // 父处理
      super.dispose();
   }
}
