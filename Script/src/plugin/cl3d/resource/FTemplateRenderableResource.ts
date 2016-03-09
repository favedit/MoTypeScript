import {FListeners} from '../../../runtime/common/lang/FListeners';
import {ALinker} from '../../../runtime/common/reflect/ALinker';
import {FResourceObject} from './FResourceObject';
import {FModelResource} from './FModelResource';
import {FModelResourceConsole} from './FModelResourceConsole';
import {FMaterialResource} from './FMaterialResource';
import {FMaterialResourceConsole} from './FMaterialResourceConsole';

//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
export class FTemplateRenderableResource extends FResourceObject {
   public model: FModelResource = null;
   public modelUrl: string = null;
   public material: FMaterialResource = null;
   public materialUrl: string = null;
   // 材质管理器
   @ALinker(FMaterialResourceConsole)
   protected _materialResourceConsole: FMaterialResourceConsole = null;
   // 模型管理器
   @ALinker(FModelResourceConsole)
   protected _modelResourceConsole: FModelResourceConsole = null;



   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.typeName = 'TemplateRenderable';
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadConfig(config) {
      super.loadConfig(config);
      this.modelUrl = config.model_url;
      this.model = this._modelResourceConsole.loadByUrl(this.modelUrl);
      this.materialUrl = config.material_url;
      this.material = this._materialResourceConsole.loadByUrl(this.materialUrl);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}