import {EScope} from '../../runtime/common/lang/EScope'
import {FDictionary} from '../../runtime/common/lang/FDictionary'
import {ALinker} from '../../runtime/common/reflect/ALinker'
import {RClass} from '../../runtime/common/reflect/RClass'
import {FError} from '../../runtime/common/lang/FError'
import {RObject} from '../../runtime/common/lang/RObject'
import {FConsole} from '../../runtime/core/FConsole'
import {FProcessLoadConsole} from '../../runtime/core/console/FProcessLoadConsole'
import {FMaterialResourceConsole} from '../../resource/FMaterialResourceConsole'
import {FE3rMaterial} from './FE3rMaterial'
import {FE3rMaterialLoader} from './FE3rMaterialLoader';

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
   @ALinker(FMaterialResourceConsole)
   protected _materialResourceConsole: FMaterialResourceConsole;
   // 处理加载控制台
   @ALinker(FProcessLoadConsole)
   protected _processLoadConsole: FProcessLoadConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = EScope.Local;
      this._materials = new FDictionary();
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
         throw new FError(this, 'Graphics context is empty');
      }
      if (!url) {
         throw new FError(this, 'Material guid is empty');
      }
      // 查找材质
      var material: FE3rMaterial = this._materials.get(url);
      if (material) {
         return material;
      }
      // 获得路径
      var resource = this._materialResourceConsole.loadByUrl(url);
      // 创建材质
      material = RClass.create(FE3rMaterial);
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
         throw new FError(this, 'Graphics context is empty');
      }
      if (!url) {
         throw new FError(this, 'Material guid is empty');
      }
      // 查找材质
      var loader: FE3rMaterialLoader = this._materials.get(url);
      if (loader) {
         return loader;
      }
      // 获得路径
      var resource = this._materialResourceConsole.loadByUrl(url);
      // 创建材质
      loader = RClass.create(FE3rMaterialLoader);
      loader.linkGraphicContext(context);
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
      this._materials = RObject.dispose(this._materials);
      // 父处理
      super.dispose();
   }
}