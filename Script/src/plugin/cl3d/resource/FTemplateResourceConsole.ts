import {DataContentEnum} from '../../runtime/common/lang/DataContentEnum';
import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {Linker} from '../../runtime/common/reflect/Linker';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {MemoryUtil} from '../../runtime/common/MemoryUtil';
import {ResourceConsole} from '../../runtime/core/resource/ResourceConsole';
import {Service} from '../../runtime/core/Service';
import {SLoadArgs} from './SLoadArgs';
import {FTemplateResource} from './FTemplateResource';

//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
export class FTemplateResourceConsole extends Service {
   // 模板集合
   public templates:Dictionary<FTemplateResource> = null;
   // 资源控制台
   @Linker(ResourceConsole)
   protected _resourceConsole: ResourceConsole = null;
   // public serviceUrl = '/cloud.content.template.ws'

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.templates = new Dictionary<FTemplateResource>();
   }

   // //==========================================================
   // // <T>反序列化一个模板。</T>
   // //
   // // @method
   // // @param p:input:FByteStream 输入流
   // // @return FE3sTemplate 材质
   // //==========================================================
   // MO.FE3sTemplateConsole_unserialize = function FE3sTemplateConsole_unserialize(p){
   //    var o = this;
   //    // 创建材质组
   //    var r = MO.Class.create(MO.FE3sTemplate);
   //    r._dataReady = true;
   //    r.unserialize(p);
   //    // 存储材质组
   //    o._templates.set(r.guid(), r);
   //    return r;
   // }

   //==========================================================
   // <T>加载指定参数的模板资源。</T>
   //
   // @param args 加载参数
   // @return 模板资源
   //==========================================================
   public load(args: SLoadArgs) {
      // 生成地址
      // var vendor = MO.Console.find(MO.FE3sVendorConsole).find(MO.EE3sResource.Template);
      // var identity = null;
      // var guid = args.guid;
      // if (!MO.Lang.String.isEmpty(guid)) {
      //    vendor.set('guid', guid);
      //    identity = guid;
      // }
      // var code = args.code;
      // if (!MO.Lang.String.isEmpty(code)) {
      //    vendor.set('code', code);
      //    identity = code;
      // }
      // MO.Assert.debugNotEmpty(identity);
      // var url = vendor.makeUrl();
      var url = args.url;
      var identity = url;
      // 查找模板
      var templates = this.templates;
      var template: FTemplateResource = templates.get(identity);
      if (template) {
         return template;
      }
      // 创建模板
      template = ClassUtil.create(FTemplateResource);
      //template.setGuid(identity);
      //template.setVendor(vendor);
      //template.setSourceUrl(url);
      // 创建加载器
      this._resourceConsole.loadContent(DataContentEnum.Json, template, url);
      templates.set(identity, template);
      return template;
   }

   //==========================================================
   // <T>加载唯一编码的模板资源。</T>
   //
   // @param guid 唯一编号
   // @return 模板资源
   //==========================================================
   public loadByGuid(guid): FTemplateResource {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.guid = guid;
      var template = this.load(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>加载指定代码的模板资源。</T>
   //
   // @param code 代码
   // @return 模板资源
   //==========================================================
   public loadByCode(code): FTemplateResource {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.code = code;
      var template = this.load(args);
      MemoryUtil.free(args);
      return template;
   }

   //==========================================================
   // <T>加载指定地址的模板资源。</T>
   //
   // @param url 网络地址
   // @return 模板资源
   //==========================================================
   public loadByUrl(url: string): FTemplateResource {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.url = url;
      var template = this.load(args);
      MemoryUtil.free(args);
      return template;
   }

   // //==========================================================
   // // <T>更新处理。</T>
   // //
   // // @param p:config:TXmlNode 配置节点
   // //==========================================================
   // MO.FE3sTemplateConsole_update = function FE3sTemplateConsole_update(p){
   //    var o = this;
   //    // 生成地址
   //    var u = MO.RBrowser.hostPath(o._serviceUrl + '?action=update');
   //    // 发送数据
   //    MO.Console.find(MO.FXmlConsole).send(u, p);
   // }
}