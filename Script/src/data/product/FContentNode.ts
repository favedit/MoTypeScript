import {FObjects} from '../../runtime/common/lang/FObjects';
import {SPoint3} from '../../runtime/common/math/SPoint3';
import {SSize3} from '../../runtime/common/math/SSize3';
import {FContentObject} from './FContentObject';
import {FContentCondition} from './FContentCondition';
import {FContentParameter} from './FContentParameter';

//==========================================================
// <T>内容节点。</T>
//
// @class
// @author maocy
// @version 160303
//==========================================================
export class FContentNode extends FContentObject {

   protected _classId: number;

   protected _classCode: string;

   protected _position: SPoint3;

   protected _realPosition: SPoint3;

   protected _size: SSize3;

   protected _realSize: SSize3;

   protected _isSelect: boolean;

   protected _isMove: boolean;

   protected _isDelete: boolean;

   protected _conditions: FObjects<FContentCondition> = null;

   protected _parameters: FObjects<FContentParameter> = null;

   protected _nodes: FObjects<FContentNode> = null;
   
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this._nodes = new FObjects<FContentNode>();
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
      config.id = '123';
      var meta: any = config.meta = new Object();
      meta.code = 'code';
      var materials: any = config.materials = new Array();
      var conditions: any = config.conditions = new Array();
      var content: any = config.content = new Object();
   }
}
