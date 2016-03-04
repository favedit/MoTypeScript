import {SPoint3} from '../../runtime/common/math/SPoint3';
import {SSize3} from '../../runtime/common/math/SSize3';
import {FContentObject} from './FContentObject';
import {FContentNode} from './FContentNode';

//==========================================================
// <T>产品信息。</T>
//==========================================================
export class FProductMeta extends FContentObject {

   protected _guid: string;

   protected _id: number;

   protected _version: number;

   protected _name: string;

   protected _label: string;

   protected _size: SSize3;

   protected _unit: string;

   protected _previewUrl: string;

   protected _topUrl: string;

   protected _detailUrl: string;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
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
      config.guid = this._guid;
      config.id = this._id;
      config.version = this._version;
      config.name = this._name;
      config.label = this._label;
      config.size = this._size;
      config.unit = this._unit;
      config.preview_url = this._previewUrl;
      config.top_url = this._topUrl;
      config.detail_url = this._detailUrl;
   }
}
