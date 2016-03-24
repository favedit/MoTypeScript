import {ScopeEnum} from '../../runtime/common/lang/ScopeEnum';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {StringUtil} from '../../runtime/common/lang/StringUtil';
import {ObjectPools} from '../../runtime/common/lang/ObjectPools';
import {ALinker} from '../../runtime/common/reflect/ALinker';
import {RClass} from '../../runtime/common/reflect/RClass';
import {AssertUtil} from '../../runtime/common/AssertUtil';
import {MemoryUtil} from '../../runtime/common/MemoryUtil';
import {FConsole} from '../../runtime/core/FConsole';
import {RConsole} from '../../runtime/core/RConsole';
import {FProcessLoadConsole} from '../../runtime/core/console/FProcessLoadConsole';
import {SLoadArgs} from '../resource/SLoadArgs';
import {FTemplateResource} from '../resource/FTemplateResource';
import {FTemplateResourceConsole} from '../resource/FTemplateResourceConsole';
import {FTemplate} from './FTemplate';

//==========================================================
// <T>模板控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FTemplateConsole extends FConsole {
   // 缓冲集合
   protected _pools: ObjectPools;
   // 加载处理器
   @ALinker(FTemplateResourceConsole)
   protected _resourceConsole: FTemplateResourceConsole;
   // 加载处理器
   @ALinker(FProcessLoadConsole)
   protected _processLoadConsole: FProcessLoadConsole;

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
   // <T>根据信息收集一个模板实例。</T>
   //
   // @method
   // @param args 加载参数
   // @return 渲染模板
   //==========================================================
   public alloc(args) {
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
      var template: FTemplate = this._pools.alloc(identity);
      if (!template) {
         // 加载渲染对象
         var resource = this._resourceConsole.load(args);
         AssertUtil.debugNotNull(resource);
         // 加载模板
         template = RClass.create(FTemplate);
         template.linkGraphicContext(context);
         template.resource = resource;
         //template.setPoolCode(identity);
         //template.setResource(resource);
         // 追加到加载队列
         this._processLoadConsole.push(template);
      }
      return template;
   }

   //==========================================================
   // <T>根据唯一编号收集一个渲染模板。</T>
   //
   // @method
   // @param context:FGraphicContext 渲染环境
   // @param guid:String 唯一编号
   // @return FE3dTemplate 渲染模板
   //==========================================================
   public allocByGuid(context, guid) {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.context = context;
      args.guid = guid;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>根据代码收集一个渲染模板。</T>
   //
   // @method
   // @param context:FGraphicContext 渲染环境
   // @param code:String 唯一编号
   // @return FE3dTemplate 渲染模板
   //==========================================================
   public allocByCode(context, code) {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.context = context;
      args.code = code;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>根据代码收集一个渲染模板。</T>
   //
   // @method
   // @param context:FGraphicContext 渲染环境
   // @param url:String 唯一编号
   // @return FE3dTemplate 渲染模板
   //==========================================================
   public allocByUrl(context, url: string) {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.context = context;
      args.url = url;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>释放一个渲染模板。</T>
   //
   // @method
   // @param template:FE3dTemplate 渲染模板
   //==========================================================
   public free(template) {
      // 放到缓冲池
      //var code = template.poolCode();
      //this._pools.free(code, template);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      //this._pools = RObject.dispose(this._pools);
      // 父处理
      super.dispose();
   }
}