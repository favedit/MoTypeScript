import {ScopeEnum} from '../../runtime/common/lang/ScopeEnum'
import {Dictionary} from '../../runtime/common/lang/Dictionary'
import {Linker} from '../../runtime/common/reflect/Linker'
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil'
import {Fatal} from '../../runtime/common/lang/Fatal'
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil'
import {FConsole} from '../../runtime/core/FConsole'
import {ProcessLoadService} from '../../runtime/core/service/ProcessLoadService'
import {FMaterialResourceConsole} from '../../resource/FMaterialResourceConsole'
import {FE3rMaterial} from './FE3rMaterial'
import {FMaterialLoader} from './loader/FMaterialLoader';

//==========================================================
// <T>渲染材质控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FE3rMaterialConsole extends FConsole {
   // 材质集合
   protected _materials = null;
   @Linker(FMaterialResourceConsole)
   protected _materialResourceConsole: FMaterialResourceConsole;
   // 处理加载控制台
   @Linker(ProcessLoadService)
   protected _processLoadConsole: ProcessLoadService = null;

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
   // <T>加载一个渲染模型。</T>
   //
   // @method
   // @param context:FG3dContext 环境
   // @param guid:String 唯一编号
   // @return FRenderModel 渲染模型
   //==========================================================
   public loadByUrl(context, url) {
      // 检查参数
      if (!context) {
         throw new Fatal(this, 'Graphics context is empty');
      }
      if (!url) {
         throw new Fatal(this, 'Material guid is empty');
      }
      // 查找材质
      var material: FE3rMaterial = this._materials.get(url);
      if (material) {
         return material;
      }
      // 获得路径
      var resource = this._materialResourceConsole.loadByUrl(url);
      // 创建材质
      material = ClassUtil.create(FE3rMaterial);
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
      var loader: FMaterialLoader = this._materials.get(url);
      if (loader) {
         return loader;
      }
      // 获得路径
      var resource = this._materialResourceConsole.loadByUrl(url);
      // 创建材质
      loader = ClassUtil.create(FMaterialLoader);
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