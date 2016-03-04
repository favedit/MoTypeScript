import {FDictionary} from './FDictionary'
import {FString} from './FString'
import {RString} from './RString'
import {RRuntime} from '../RRuntime'

//==========================================================
// <T>名称和内容都是字符串的关联保存表的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class FAttributes extends FDictionary {
   //==========================================================
   // <T>将内部所有内容目关联成一个字符串。</T>
   //
   // @method
   // @param split:String 分隔符
   // @return String 字符串
   //==========================================================
   public joinValue(split): string {
      var source: FString = new FString();
      var count = this._count;
      for (var i: number = 0; i < count; i++) {
         if (i > 0) {
            source.append(split);
         }
         source.append(this._values[i]);
      }
      return source.flush();
   }

   //==========================================================
   // <T>将内部所有项目关联成一个字符串。</T>
   //
   // @method
   // @param name:String 分隔名称的字符
   // @param value:String 分隔内容的字符
   // @return String 字符串
   //==========================================================
   public join(name, value): string {
      var source: FString = new FString();
      if (!name) {
         name = '=';
      }
      if (!value) {
         value = ',';
      }
      var count = this._count;
      for (var i = 0; i < count; i++) {
         if (i > 0) {
            source.append(value);
         }
         source.append(this._names[i]);
         source.append(name);
         source.append(this._values[i]);
      }
      return source.flush();
   }

   //==========================================================
   // <T>将字符串分割为子项。</T>
   //
   // @method
   // @param source:String 字符串
   // @param name:String 分隔名称的字符
   // @param value:String 分隔内容的字符
   //==========================================================
   public split(source, name, value): void {
      var o = this;
      var items = source.split(value);
      var count = items.length;
      for (var i = 0; i < count; i++) {
         var item = items[i];
         if (item.length) {
            var codes = item.split(name);
            if (codes.length == 2) {
               o.set(RString.trim(codes[0]), RString.trim(codes[1]));
            } else {
               o.set(RString.trim(item), '');
            }
         }
      }
   }

   //==========================================================
   // <T>将表中所有数据连接成一个字符串。</T>
   // <P>打包方式：项目1(名称长度的长度+名称长度+名称+内容长度的长度+内容长度+内容)+...。</P>
   //
   // @method
   // @return String 打包字符串
   //==========================================================
   public pack(): string {
      var source: FString = new FString();
      var count = this._count;
      var names = this._names;
      var values = this._values;
      for (var i = 0; i < count; i++) {
         var name = names[i];
         var value = values[i];
         var nameLength = name.length;
         source.append(nameLength.toString().length, nameLength, name);
         if (value != null) {
            var valueValue: string = value + '';
            var valueLength = valueValue.length;
            source.append(valueLength.toString().length, valueLength, valueValue);
         } else {
            source.append('0');
         }
      }
      return source.flush();
   }

   //==========================================================
   // <T>将一个打包字符串分解为所有子项。</T>
   //
   // @method
   // @param source:String 打包字符串
   //==========================================================
   public unpack(source): void {
      this._count = 0;
      var position = 0;
      var sourceLength = source.length;
      while (position < sourceLength) {
         // 解析名称
         var lengthLength = parseInt(source.substr(position++, 1));
         var length = parseInt(source.substr(position, lengthLength));
         var name = source.substr(position + lengthLength, length);
         position += lengthLength + length;
         // 解析内容
         lengthLength = parseInt(source.substr(position++, 1));
         var value = null;
         if (lengthLength > 0) {
            length = parseInt(source.substr(position, lengthLength));
            value = source.substr(position + lengthLength, length);
            position += lengthLength + length;
         }
         // 设置分解后的内容
         this.set(name, value);
      }
   }

   //==========================================================
   // <T>获得数组的内部信息。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public dump(): string {
      var result: FString = new FString();
      var count = this._count;
      result.append(RRuntime.className(this), ' : ', count);
      if (count > 0) {
         var names = this._names;
         var values = this._values;
         result.append(' (');
         for (var i = 0; i < count; i++) {
            if (i > 0) {
               result.append(', ');
            }
            result.append(names[i], '=', values[i]);
         }
         result.append(')');
      }
      return result.flush();
   }
}
