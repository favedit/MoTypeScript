import {DataContentEnum} from '../../runtime/common/lang/DataContentEnum';
import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {Linker} from '../../runtime/common/reflect/Linker';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {MemoryUtil} from '../../runtime/common/MemoryUtil';
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
   public _materials: Dictionary<FMaterialResource> = null;
   // 资源控制台
   @Linker(FResourceConsole)
   protected _resourceConsole: FResourceConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._materials = new Dictionary<FMaterialResource>();
   }

   //==========================================================
   // <T>获得材质集合。</T>
   //
   // @return 材质集合
   //==========================================================
   public get materials(): Dictionary<FMaterialResource> {
      return this._materials;
   }

   //==========================================================
   // <T>根据名称查找材质。</T>
   //
   // @param code 代码
   // @return 材质
   //==========================================================
   public find(code) {
      return this._materials.get(code);
   }

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
      var url:string = args.url;
      var identity:string = url;
      // 查找模板
      var materials = this._materials;
      var material: FMaterialResource = materials.get(identity);
      if (material) {
         return material;
      }
      // 创建模板
      material = ClassUtil.create(FMaterialResource);
      material.guid = identity;
      //template.setVendor(vendor);
      // 创建加载器
      this._resourceConsole.loadContent(DataContentEnum.Json, material, url);
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
      var args = MemoryUtil.alloc(SLoadArgs);
      args.guid = guid;
      var material = this.load(args);
      MemoryUtil.free(args);
      return material;
   }

   //==========================================================
   // <T>加载指定代码的材质资源。</T>
   //
   // @param code 代码
   // @return 材质资源
   //==========================================================
   public loadByCode(code): FMaterialResource {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.code = code;
      var material = this.load(args);
      MemoryUtil.free(args);
      return material;
   }

   //==========================================================
   // <T>加载指定地址的材质资源。</T>
   //
   // @param url 网络地址
   // @return 材质资源
   //==========================================================
   public loadByUrl(url: string): FMaterialResource {
      var args = MemoryUtil.alloc(SLoadArgs);
      args.url = url;
      var material = this.load(args);
      MemoryUtil.free(args);
      return material;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this._materials = ObjectUtil.dispose(this._materials);
      // 父处理
      super.dispose();
   }
}