import {FObject} from '../../common/lang/FObject';

/**
* 资源基类。
*
* @class
* @author maocy
* @version 150105
*/
export class FResource extends FObject {
   /** 是否准备 */
   protected _ready: boolean = false;
   /** 类型代码 */
   protected _typeCode: string = null;
   /** 内容 */
   protected _content: any = null;
   //o._type         = MO.Class.register(o, new MO.AGetter('_type'));
   // @attribute
   //o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   //o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   //o._label = MO.Class.register(o, new MO.AGetSet('_label'));
   // @attribute
   //o._sourceUrl = MO.Class.register(o, new MO.AGetSet('_sourceUrl'));
   // @attribute
   //o._dataCompress = false;
   //o._dataBlock    = false;

   /**
   * 获得类型代码。
   *
   * @return 类型代码
   */
   public get typeCode(): string {
      return this._typeCode;
   }
   /**
   * 获得内容
   *
   * @return 内容
   */
   public get content(): any {
      return this._content;
   }
   
   /**
   * 测试是否准备好。
   *
   * @return 是否准备好
   */
   public testReady(): boolean {
      return this._ready;
   }
}
