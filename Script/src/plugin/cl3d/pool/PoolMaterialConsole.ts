import {ScopeEnum} from '../../runtime/common/lang/ScopeEnum';
import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {Linker} from '../../runtime/common/reflect/Linker';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {Fatal} from '../../runtime/common/lang/Fatal';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {AssertUtil} from '../../runtime/common/AssertUtil';
import {Service} from '../../runtime/core/Service';
import {ProcessLoadService} from '../../runtime/core/service/ProcessLoadService';
import {MaterialResourceConsole} from '../resource/MaterialResourceConsole';
import {PoolMaterial} from './PoolMaterial';
import {PoolMaterialLoader} from './loader/PoolMaterialLoader';

//==========================================================
// <T>渲染材质控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class PoolMaterialConsole extends Service {
   // 材质集合
   protected _materials;
   @Linker(MaterialResourceConsole)
   protected _materialResourceConsole: MaterialResourceConsole;
   // 处理加载控制台
   @Linker(ProcessLoadService)
   protected _processLoadConsole: ProcessLoadService;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._materials = new Dictionary();
   }

   //==========================================================
   // <T>获得材质集合。</T>
   //
   // @return 材质集合
   //==========================================================
   public get materials() {
      return this._materials;
   }

   //==========================================================
   // <T>加载一个渲染模型。</T>
   //
   // @method
   // @param context:FG3dContext 环境
   // @param guid:String 唯一编号
   // @return FRenderModel 渲染模型
   //==========================================================
   // public loadMaterial(context, material) {
   //    // 检查参数
   //    if (!context) {
   //       throw new FError(this, 'Graphics context is empty');
   //    }
   //    // 获得路径
   //    var resource = this._materialResourceConsole.loadByUrl(url);
   //    // 创建材质
   //    material = RClass.create(FE3rMaterial);
   //    material.linkGraphicContext(context);
   //    material.resource = resource;
   //    this._materials.set(url, material);
   //    // 追加到加载队列
   //    this._processLoadConsole.push(material);
   //    return material;
   // }

   //==========================================================
   // <T>加载一个渲染材质。</T>
   //
   // @param context 渲染环境
   // @param url 网络地址
   // @return 渲染材质
   //==========================================================
   public loadByUrl(context, url) {
      AssertUtil.debugNotNull(context);
      AssertUtil.debugNotEmpty(url);
      // 查找材质
      var material: PoolMaterial = this._materials.get(url);
      if (material) {
         return material;
      }
      // 获得路径
      var resource = this._materialResourceConsole.loadByUrl(url);
      // 创建材质
      material = ClassUtil.create(PoolMaterial);
      material.linkGraphicContext(context);
      material.resource = resource;
      this._materials.set(url, material);
      // 追加到加载队列
      this._processLoadConsole.push(material);
      return material;
   }

   //==========================================================
   // <T>加载一个渲染模型。</T>
   //
   // @method
   // @param context:FG3dContext 环境
   // @param guid:String 唯一编号
   // @return FRenderModel 渲染模型
   //==========================================================
   public loadLoaderByUrl(context, url) {
      // 检查参数
      if (!context) {
         throw new Fatal(this, 'Graphics context is empty');
      }
      if (!url) {
         throw new Fatal(this, 'Material guid is empty');
      }
      // 查找材质
      var loader: PoolMaterialLoader = this._materials.get(url);
      if (loader) {
         return loader;
      }
      // 获得路径
      var resource = this._materialResourceConsole.loadByUrl(url);
      // 创建材质
      loader = ClassUtil.create(PoolMaterialLoader);
      loader.graphicContext = context;
      loader.resource = resource;
      this._materials.set(url, loader);
      // 追加到加载队列
      this._processLoadConsole.push(loader);
      return loader;
   }

   // //==========================================================
   // // <T>加载一个渲染模型。</T>
   // //
   // // @method
   // // @param context:FG3dContext 环境
   // // @param guid:String 唯一编号
   // // @return FRenderModel 渲染模型
   // //==========================================================
   // public load(context, guid) {
   //    // 检查参数
   //    if (!context) {
   //       throw new FError(this, 'Graphics context is empty');
   //    }
   //    if (!guid) {
   //       throw new FError(this, 'Material guid is empty');
   //    }
   //    // 查找材质
   //    var material = this._materials.get(guid);
   //    if (material) {
   //       return material;
   //    }
   //    // 获得路径
   //    var resource = this._materialResourceConsole.loadByUrl(guid);
   //    // 创建材质
   //    material = RClass.create(MO.FE3rMaterial);
   //    material.linkGraphicContext(context);
   //    material.loadResource(resource);
   //    material.load();
   //    this._materials.set(guid, material);
   //    return material;
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放处理
      this._materials = ObjectUtil.dispose(this._materials);
      // 父处理
      super.dispose();
   }
}