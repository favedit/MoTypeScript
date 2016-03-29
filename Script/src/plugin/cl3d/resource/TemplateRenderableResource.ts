import {Listeners} from '../../../runtime/common/lang/Listeners';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {ResourceObject} from './ResourceObject';
import {ModelResource} from './ModelResource';
import {ModelResourceConsole} from './ModelResourceConsole';
import {MaterialResource} from './MaterialResource';
import {MaterialResourceConsole} from './MaterialResourceConsole';

//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
export class TemplateRenderableResource extends ResourceObject {
   public ready: boolean;
   public model: ModelResource;
   public modelUrl: string;
   public meshCode: string;
   public material: MaterialResource;
   public materialUrl: string;
   // 材质管理器
   @Linker(MaterialResourceConsole)
   protected _materialResourceConsole: MaterialResourceConsole;
   // 模型管理器
   @Linker(ModelResourceConsole)
   protected _modelResourceConsole: ModelResourceConsole;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.ready = false;
      this.typeName = 'TemplateRenderable';
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady(): boolean {
      // var ready = this.ready;
      // if (!ready) {
      //    if (!this.model.testReady()) {
      //       return false;
      //    }
      //    if (!this.material.testReady()) {
      //       return false;
      //    }
      //    ready = this.ready = true;
      // }
      // return ready;
      return true;
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadConfig(config) {
      super.loadConfig(config);
      this.modelUrl = config.model_url;
      this.meshCode = config.mesh_code;
      //this.model = this._modelResourceConsole.loadByUrl(this.modelUrl);
      this.materialUrl = config.material_url;
      //this.material = this._materialResourceConsole.loadByUrl(this.materialUrl);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}