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
import {TemplateResource} from '../resource/TemplateResource';
import {TemplateResourceConsole} from '../resource/TemplateResourceConsole';
import {Template} from './Template';

//==========================================================
// <T>模板控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class TemplateService extends Service {
   // 缓冲集合
   protected _pools: ObjectPools;
   // 加载处理器
   @Linker(TemplateResourceConsole)
   protected _resourceConsole: TemplateResourceConsole;
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

   //==========================================================
   // <T>根据信息收集一个模板实例。</T>
   //
   // @method
   // @param args 加载参数
   // @return 渲染模板
   //==========================================================
   public alloc(args: LoadArgs): Template {
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
      var template: Template = this._pools.alloc(identity);
      if (!template) {
         // 加载渲染对象
         var resource = this._resourceConsole.load(args);
         AssertUtil.debugNotNull(resource);
         // 加载模板
         template = ClassUtil.create(Template);
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
   // @param context 渲染环境
   // @param guid 唯一编号
   // @return 渲染模板
   //==========================================================
   public allocByGuid(context, guid): Template {
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.guid = guid;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>根据代码收集一个渲染模板。</T>
   //
   // @param context 渲染环境
   // @param code 唯一编号
   // @return 渲染模板
   //==========================================================
   public allocByCode(context, code): Template {
      var args = MemoryUtil.alloc(LoadArgs);
      args.context = context;
      args.code = code;
      var template = this.alloc(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>根据代码收集一个渲染模板。</T>
   //
   // @param context 渲染环境
   // @param url 网络地址
   // @return 渲染模板
   //==========================================================
   public allocByUrl(context, url: string): Template {
      var args = MemoryUtil.alloc(LoadArgs);
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
   //==========================================================
   public dispose() {
      // 释放属性
      this._pools = ObjectUtil.dispose(this._pools);
      // 父处理
      super.dispose();
   }
}