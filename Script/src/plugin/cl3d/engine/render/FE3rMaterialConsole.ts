import {EScope} from '../../runtime/common/lang/EScope'
import {FDictionary} from '../../runtime/common/lang/FDictionary'
import {FError} from '../../runtime/common/lang/FError'
import {RObject} from '../../runtime/common/lang/RObject'
import {FConsole} from '../../runtime/core/FConsole'

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
   public load(context, guid) {
      // 检查参数
      if (!context) {
         throw new FError(this, 'Graphics context is empty');
      }
      if (!guid) {
         throw new FError(this, 'Material guid is empty');
      }
      // 查找材质
      var material = this._materials.get(guid);
      if (material) {
         return material;
      }
      // 获得路径
      // var resource = RConsole.find(FE3sMaterialConsole).find(guid);
      // // 创建材质
      // material = RClass.create(MO.FE3rMaterial);
      // material.linkGraphicContext(context);
      // material.loadResource(resource);
      // material.load();
      this._materials.set(guid, material);
      return material;
   }

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