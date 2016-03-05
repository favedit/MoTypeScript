import {FObject} from '../lang/FObject';
import {FAttributes} from '../lang/FAttributes';
import {FString} from '../lang/FString';
import {RBoolean} from '../lang/RBoolean';
import {RObject} from '../lang/RObject';
import {RString} from '../lang/RString';

//==========================================================
// <T>标签环境类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTagContext extends FObject {
   //..........................................................
   // @attribute
   public trimLeft = false;
   public trimRight = false;
   public _attributes: FAttributes = null;
   public _source = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._attributes = new FAttributes();
      this._source = new FString();
   }

   //==========================================================
   // <T>收集处理。</T>
   //
   // @method
   //==========================================================
   public instanceAlloc() {
      this._attributes.clear();
   }

   //==========================================================
   // <T>取得属性值。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 默认值
   // @return String 内容
   //==========================================================
   public get(name: string, defaultValue: any = null) {
      return this._attributes.get(name, defaultValue);
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   //==========================================================
   public set(name: string, value: any) {
      this._attributes.set(name, value);
   }

   //==========================================================
   // <T>设置布尔属性值。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   //==========================================================
   public setBoolean(name: string, value: boolean) {
      this._attributes.set(name, RBoolean.toString(value));
   }

   //==========================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return TString 代码
   //==========================================================
   public source() {
      return this._source.toString();
   }

   //==========================================================
   // <T>输出文本。</T>
   //
   // @method
   // @param String 文本
   //==========================================================
   public write(source) {
      if (!RString.isEmpty(source)) {
         this._source.append(source);
      }
   }

   //==========================================================
   // <T>重置代码内容。</T>
   //
   // @method
   //==========================================================
   public resetSource(p) {
      this._source.clear();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._attributes = RObject.dispose(this._attributes);
      this._source = RObject.dispose(this._source);
      super.dispose();
   }
}
