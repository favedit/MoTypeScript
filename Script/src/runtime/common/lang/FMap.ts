import {RAssert} from '../RAssert';
import {RRuntime} from '../RRuntime';
import {FString} from './FString'
import {FObject} from './FObject';

//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
export class FMap extends FObject {
   // 总数
   protected _count: number = 0;
   // 对照表
   protected _table: any = new Object();
   // 名称集合
   protected _names: Array<any> = new Array<any>();
   // 内容集合
   protected _values: Array<any> = new Array<any>();

   //==========================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //==========================================================
   public isEmpty(): boolean {
      return this._count == 0;
   }

   //==========================================================
   // <T>获得总数。</T>
   //
   // @method
   // @return 总数
   //==========================================================
   public count(): number {
      return this._count;
   }

   //==========================================================
   // <T>判断是否含有指定的名称。</T>
   //
   // @method
   // @param name:String 名称
   // @return Boolean 是否含有
   //==========================================================
   public contains(name): boolean {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()]
         if (index != null) {
            return true;
         }
      }
      return false;
   }

   //==========================================================
   // <T>判断是否含有指定的内容。</T>
   //
   // @method
   // @param value:Object 内容
   // @return Boolean 是否含有
   //==========================================================
   public containsValue(value): boolean {
      var index: number = this.indexOfValue(value);
      return (index != -1);
   }

   //==========================================================
   // <T>查找指定名称在表中的索引位置，不存在则返回-1。</T>
   //
   // @method
   // @param name:String 名称
   // @return Integer 索引位置
   //==========================================================
   public indexOf(name): number {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()];
         if (index != null) {
            return index;
         }
      }
      return -1;
   }

   //==========================================================
   // <T>查找指定对象在表中的第一次出现的索引位置，不存在则返回-1。</T>
   //
   // @method
   // @param value:Object 内容
   // @return Integer 索引位置
   //==========================================================
   public indexOfValue(value): number {
      var o = this;
      var count = o._count;
      if (count > 0) {
         var values = o._values;
         for (var i = 0; i < count; i++) {
            if (values[i] == value) {
               return i;
            }
         }
      }
      return -1;
   }

   //==========================================================
   // <T>查找第一个内容。</T>
   //
   // @method
   // @return Object 内容
   //==========================================================
   public first(): any {
      var o = this;
      if (o._count > 0) {
         return o._values[0];
      }
      return null;
   }

   //==========================================================
   // <T>查找最后一个内容。</T>
   //
   // @method
   // @return Object 内容
   //==========================================================
   public last(): any {
      var o = this;
      if (o._count > 0) {
         return o._values[o._count - 1];
      }
      return null;
   }

   //==========================================================
   // <T>根据索引位置获得名称。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return String 名称
   //==========================================================
   public nameAt(index): any {
      return this._names[index];
   }

   //==========================================================
   // <T>根据索引位置获得名称。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return String 名称
   //==========================================================
   public name(index): any {
      return ((index >= 0) && (index < this._count)) ? this._names[index] : null;
   }

   //==========================================================
   // <T>根据索引位置获得内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 内容
   //==========================================================
   public at(index): any {
      return this._values[index];
   }

   //==========================================================
   // <T>根据索引位置获得内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 内容
   //==========================================================
   public valueAt(index): any {
      return this._values[index];
   }

   //==========================================================
   // <T>根据索引位置获得内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 内容
   //==========================================================
   public value(index): any {
      return ((index >= 0) && (index < this._count)) ? this._values[index] : null;
   }

   //==========================================================
   // <T>根据索引位置设置内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param value:Object 内容
   //==========================================================
   public setValueAt(index, value): any {
      this._values[index] = value;
   }

   //==========================================================
   // <T>根据索引位置设置内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param value:Object 内容
   //==========================================================
   public setValue(index, value): any {
      if ((index >= 0) && (index < this._count)) {
         this._values[index] = value;
      }
   }

   //==========================================================
   // <T>根据名称查找内容。</T>
   // <P>如果内容不存在，返回默认内容。</P>
   //
   // @method
   // @param name:String 名称
   // @param defaultValue:Object 默认内容
   // @return Object 内容
   //==========================================================
   public get(name, defaultValue: any = null): any {
      if (name != null) {
         var i = this._table[name.toString().toLowerCase()];
         if (i != null) {
            return this._values[i];
         }
      }
      return defaultValue;
   }

   //==========================================================
   // <T>根据名称设置内容。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:Object 默认内容
   // @return Object 内容
   //==========================================================
   public set(name, value): void {
      var o = this;
      RAssert.debugNotNull(name);
      var nameString = name.toString();
      var code = nameString.toLowerCase();
      var index = o._table[code];
      if ((index == null) || (index >= o._count)) {
         index = o._count++;
         o._names[index] = nameString;
         o._table[code] = index;
      }
      o._values[index] = value;
   }

   //==========================================================
   // <T>根据名称设置非空内容。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:Object 默认内容
   // @return Object 内容
   //==========================================================
   public setNvl(name, value): void {
      if (value) {
         this.set(name, value);
      }
   }

   //==========================================================
   // <T>将当前表内容全部置为另一个表的全部内容。</T>
   //
   // @method
   // @param map:TMap 表
   //==========================================================
   public assign(map): void {
      var o = this;
      o.clear();
      o.append(map);
   }

   //==========================================================
   // <T>在当前表中追加另一个表的全部内容。</T>
   //
   // @method
   // @param map:TMap 表
   //==========================================================
   public append(map): void {
      var o = this;
      if (map) {
         var count = map.count();
         for (var i = 0; i < count; i++) {
            var name = map.nameAt(i);
            var value = map.valueAt(i);
            o.set(name, value);
         }
      }
   }

   //==========================================================
   // <T>在索引位置插入一个新的名称和内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param name:String 名称
   // @param value:Object 内容
   //==========================================================
   public insert(index, name, value): void {
      var o = this;
      var count = o._count;
      if ((index >= 0) && (index <= count)) {
         var names = o._names;
         var values = o._values;
         for (var i = count; i > index; i--) {
            names[i] = names[i - 1];
            values[i] = values[i - 1];
         }
         names[index] = name;
         values[index] = value;
         o._count++;
         o.rebuild();
      }
   }

   //==========================================================
   // <T>删除索引位置的内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 删除的内容
   //==========================================================
   public remove(index): void {
      var o = this;
      var value = null;
      var count = o._count;
      if ((index >= 0) && (index < count)) {
         var names = o._names;
         var values = o._values;
         value = values[index];
         for (var i = index; i < count; i++) {
            names[i] = names[i + 1];
            values[i] = values[i + 1];
         }
         o._count--;
         o.rebuild();
      }
      return value;
   }

   //==========================================================
   // <T>删除指定名称的内容。</T>
   //
   // @method
   // @param name:String 名称
   // @return Object 删除的内容
   //==========================================================
   public removeName(name): void {
      var o = this;
      var index = o.indexOf(name);
      if (index != -1) {
         return o.remove(index);
      }
      return null;
   }

   //==========================================================
   // <T>删除指定的内容。</T>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   public removeValue(value): void {
      var o = this;
      var index = 0;
      var count = o._count;
      var names = o._names;
      var values = o._values;
      for (var i = 0; i < count; i++) {
         var find = values[i];
         if (find != value) {
            if (index != i) {
               names[index] = names[i];
               values[index] = find;
            }
            index++;
         }
      }
      o._count = index;
      o.rebuild();
   }

   //==========================================================
   // <T>根据对象内名称数组和内容数组重新建立对照表。</T>
   //
   // @method
   //==========================================================
   public rebuild(): void {
      var o = this;
      // 清除对照表数据
      var table = o._table;
      for (var name in table) {
         delete table[name];
      }
      // 重建对照表数据
      var count = o._count;
      var names = o._names;
      for (var i = 0; i < count; i++) {
         var code = names[i].toLowerCase();
         table[code] = i;
      }
   }

   //==========================================================
   // <T>调用函数处理。</T>
   //
   // @method
   // @param methodName:String 函数名称
   // @param parameter1:Object 参数1
   // @param parameter2:Object 参数2
   // @param parameter3:Object 参数3
   // @param parameter4:Object 参数4
   // @param parameter5:Object 参数5
   //==========================================================
   public invoke(methodName, parameter1, parameter2, parameter3, parameter4, parameter5): void {
      var o = this;
      var count = o._count;
      var values = o._values;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         var method = value[methodName];
         method.call(value, parameter1, parameter2, parameter3, parameter4, parameter5);
      }
   }

   //==========================================================
   // <T>清除所有内容。</T>
   //
   // @method
   //==========================================================
   public clear(): void {
      var o = this;
      o._count = 0;
      // 清除对照表数据
      var table = o._table;
      for (var name in table) {
         delete table[name];
      }
   }

   //==========================================================
   // <T>获得数组的内部信息。</T>
   //
   // @method
   // @return String 信息字符串
   //==========================================================
   public toString(): string {
      var result: FString = new FString();
      var count = this._count;
      var names = this._names;
      var values = this._values;
      for (var i = 0; i < count; i++) {
         var name = names[i];
         var value = values[i];
         result.append(name, '=', value);
      }
      return result.flush();
   }

   //==========================================================
   // <T>释放所有内容。</T>
   //
   // @method
   // @param flag:Boolean 标志
   //==========================================================
   public dispose(flag: boolean = false): void {
      var o = this;
      var count = o._count;
      // 清除对照表数据
      var table = o._table;
      if (table) {
         for (var name in table) {
            table[name] = null;
         }
         o._table = null;
      }
      // 清空名称集合
      var names = o._names;
      if (names) {
         for (var i = 0; i < count; i++) {
            names[i] = null;
         }
         o._names = null;
      }
      // 清空数据集合
      var values = o._values;
      if (values) {
         for (var i = 0; i < count; i++) {
            if (flag) {
               RRuntime.dispose(values[i]);
            }
            values[i] = null;
         }
         o._values = null;
      }
      // 清空属性
      o._count = 0;
   }
}
