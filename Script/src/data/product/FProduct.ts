import {FObjects} from '../../runtime/common/lang/FObjects';
import {RObject} from '../../runtime/common/lang/RObject';
import {FContentObject} from './FContentObject';
import {FContentNode} from './FContentNode';
import {FProductMeta} from './FProductMeta';
import {FContentVariable} from './FContentVariable';
import {FContentMaterial} from './FContentMaterial';

//==========================================================
// <T>产品信息。</T>
//==========================================================
export class FProduct extends FContentObject {

   protected _meta: FProductMeta;

   protected _variables: FObjects<FContentVariable>;

   protected _materials: FObjects<FContentMaterial>;

   protected _content: FContentNode;
   
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this._meta = new FProductMeta();
      this._variables = new FObjects<FContentVariable>();
      this._materials = new FObjects<FContentMaterial>();
      this._content = new FContentNode();
   }
   
   //==========================================================
   // <T>加载JSON内容。</T>
   //
   // @param config 配置对象
   //==========================================================
   public loadJson(config: any): void {
      super.loadJson(config);
   }

   //==========================================================
   // <T>保存JSON内容。</T>
   //
   // @param config 配置对象
   //==========================================================
   public saveJson(config: any): void {
      super.saveJson(config);
      this._meta.saveJson(config.meta = new Object());
      //this._variables.saveJson(config._variables = new Object());
      //this._materials.saveJson(config._materials = new Object());
      this._content.saveJson(config.content = new Object());
   }
   
   //==========================================================
   // <T>析构处理。</T>
   //==========================================================
   public dispose() {
      this._meta = RObject.dispose(this._meta);
      this._variables = RObject.dispose(this._variables);
      this._materials = RObject.dispose(this._materials);
      this._content = RObject.dispose(this._content);
      super.dispose();
   }
}
