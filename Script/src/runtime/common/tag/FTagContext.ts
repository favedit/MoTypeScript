import {ObjectBase} from '../lang/ObjectBase';
import {FAttributes} from '../lang/FAttributes';
import {FString} from '../lang/FString';
import {BooleanUtil} from '../lang/BooleanUtil';
import {ObjectUtil} from '../lang/ObjectUtil';
import {RString} from '../lang/RString';

//==========================================================
// <T>标签环境类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTagContext extends ObjectBase {
   public code: string;
   public trimLeft: boolean;
   public trimRight: boolean;
   public _attributes: FAttributes;
   public _source: FString;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.trimLeft = false;
      this.trimRight = false;
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
      this._attributes.set(name, BooleanUtil.toString(value));
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
      this._attributes = ObjectUtil.dispose(this._attributes);
      this._source = ObjectUtil.dispose(this._source);
      super.dispose();
   }
}
