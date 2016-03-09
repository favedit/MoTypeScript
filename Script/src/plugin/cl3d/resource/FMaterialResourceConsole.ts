import {EDataContent} from '../../runtime/common/lang/EDataContent';
import {FDictionary} from '../../runtime/common/lang/FDictionary';
import {RObject} from '../../runtime/common/lang/RObject';
import {ALinker} from '../../runtime/common/reflect/ALinker';
import {RClass} from '../../runtime/common/reflect/RClass';
import {RMemory} from '../../runtime/common/RMemory';
import {FResourceConsole} from '../../runtime/core/resource/FResourceConsole';
import {FConsole} from '../../runtime/core/FConsole';
import {SLoadArgs} from './SLoadArgs';
import {FMaterialResource} from './FMaterialResource';

//==========================================================
// <T>资源材质管理器。</T>
//
// @console
// @author maocy
// @history 150130
//==========================================================
export class FMaterialResourceConsole extends FConsole {
   // 模板集合
   public materials: FDictionary<FMaterialResource> = null;
   // 资源控制台
   @ALinker(FResourceConsole)
   protected _resourceConsole: FResourceConsole = null;

   //    // @attribute
   //    o._resources  = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.materials = new FDictionary<FMaterialResource>();
   }

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3sMaterialConsole_construct = function FE3sMaterialConsole_construct(){
   //    var o = this;
   //    o.__base.FConsole.construct.call(o);
   //    o._resources = new MO.TDictionary();
   //    o._materials = new MO.TDictionary();
   // }

   // //==========================================================
   // // <T>根据名称查找材质。</T>
   // //
   // // @param p:name:String 名称
   // // @return FE3sMaterial 材质
   // //==========================================================
   // MO.FE3sMaterialConsole_find = function FE3sMaterialConsole_find(p){
   //    return this._materials.get(p);
   // }

   // //==========================================================
   // // <T>反序列化一个材质。</T>
   // //
   // // @method
   // // @param input:FByteStream 输入流
   // // @return FE3sMaterial 材质
   // //==========================================================
   // MO.FE3sMaterialConsole_unserialize = function FE3sMaterialConsole_unserialize(input){
   //    var o = this;
   //    // 创建材质组
   //    var material = MO.Class.create(MO.FE3sMaterial);
   //    material.unserialize(input);
   //    // 存储材质组
   //    var materialGuid = material.guid();
   //    if(o._materials.contains(materialGuid)){
   //       throw new MO.TError(o, 'Material is already exists.');
   //    }
   //    o._materials.set(materialGuid, material);
   //    return material;
   // }


   // //==========================================================
   // // <T>加载指定代码的模型资源。</T>
   // //
   // // @param guid:String 唯一编号
   // // @return 处理结果
   // //==========================================================
   // MO.FE3sMaterialConsole_loadByGuid = function FE3sMaterialConsole_loadByGuid(guid){
   //    var o = this;
   //    var resources = o._resources;
   //    // 查找材质
   //    var resource = resources.get(guid);
   //    if(resource){
   //       return resource;
   //    }
   //    // 生成地址
   //    var vendor = MO.Console.find(MO.FE3sVendorConsole).find('material');
   //    vendor.set('guid', guid);
   //    var url = vendor.makeUrl();
   //    // 创建材质资源
   //    resource = MO.Class.create(MO.FE3sMaterialResource);
   //    resource.setGuid(guid);
   //    resource.setVendor(vendor);
   //    resource.setSourceUrl(url);
   //    MO.Console.find(MO.FResourceConsole).load(resource);
   //    // 存储材质资源
   //    resources.set(guid, resource);
   //    return resource;
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
      var materials = this.materials;
      var material: FMaterialResource = materials.get(identity);
      if (material) {
         return material;
      }
      // 创建模板
      material = RClass.create(FMaterialResource);
      //template.setGuid(identity);
      //template.setVendor(vendor);
      //template.setSourceUrl(url);
      // 创建加载器
      this._resourceConsole.loadContent(EDataContent.Json, material, url);
      materials.set(identity, material);
      return material;
   }

   //==========================================================
   // <T>加载唯一编码的材质资源。</T>
   //
   // @param guid 唯一编号
   // @return 材质资源
   //==========================================================
   public loadByGuid(guid): FMaterialResource {
      var args = RMemory.alloc(SLoadArgs);
      args.guid = guid;
      var template = this.load(args);
      RMemory.free(args);
      return template;
   }

   //==========================================================
   // <T>加载指定代码的材质资源。</T>
   //
   // @param code 代码
   // @return 材质资源
   //==========================================================
   public loadByCode(code): FMaterialResource {
      var args = RMemory.alloc(SLoadArgs);
      args.code = code;
      var template = this.load(args);
      RMemory.free(args);
      return template;
   }

   //==========================================================
   // <T>加载指定地址的材质资源。</T>
   //
   // @param url 网络地址
   // @return 材质资源
   //==========================================================
   public loadByUrl(url: string): FMaterialResource {
      var args = RMemory.alloc(SLoadArgs);
      args.url = url;
      var template = this.load(args);
      RMemory.free(args);
      return template;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      //this._resources = MO.Lang.Object.free(this._resources);
      this.materials = RObject.dispose(this.materials);
      // 父处理
      super.dispose();
   }
}