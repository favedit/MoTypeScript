import {EDataType} from '../lang/EDataType';
import {FString} from '../lang/FString';
import {FError} from '../lang/FError'
import {FDataView} from './FDataView'

//==========================================================
// <T>数据流基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class FDataStream extends FDataView {
   //..........................................................
   // @attribute
   protected _viewer: DataView = null;
   protected _endianCd: boolean = false;
   protected _position: number = 0;

   //==========================================================
   // <T>测试字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public testString() {
      var position = this._position;
      var length = this._viewer.getUint16(position, this._endianCd);
      position += 2;
      var result = new FString();
      for (var i = 0; i < length; i++) {
         var value = this._viewer.getUint16(position, this._endianCd);
         position += 2;
         result.push(String.fromCharCode(value));
      }
      return result.flush();
   }

   //==========================================================
   // <T>读取布尔值。</T>
   //
   // @method
   // @return Boolean 布尔值
   //==========================================================
   public readBoolean() {
      var o = this;
      var value = o._viewer.getInt8(o._position);
      o._position++;
      return value > 0;
   }

   //==========================================================
   // <T>读取有8位有符号整数。</T>
   //
   // @method
   // @return Integer 8位有符号整数
   //==========================================================
   public readInt8() {
      var o = this;
      var value = o._viewer.getInt8(o._position);
      o._position++;
      return value;
   }

   //==========================================================
   // <T>读取有16位有符号整数。</T>
   //
   // @method
   // @return Integer 16位有符号整数
   //==========================================================
   public readInt16() {
      var o = this;
      var value = o._viewer.getInt16(o._position, o._endianCd);
      o._position += 2;
      return value;
   }

   //==========================================================
   // <T>读取有32位有符号整数。</T>
   //
   // @method
   // @return Integer 32位有符号整数
   //==========================================================
   public readInt32() {
      var o = this;
      var value = o._viewer.getInt32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }

   //==========================================================
   // <T>读取有64位有符号整数。</T>
   //
   // @method
   // @return Integer 64位有符号整数
   //==========================================================
   public readInt64() {
      var value1 = this._viewer.getInt32(this._position, this._endianCd);
      this._position += 4;
      var value2 = this._viewer.getInt32(this._position, this._endianCd);
      this._position += 4;
      return value2 << 32 + value1;
   }

   //==========================================================
   // <T>读取有8位无符号整数。</T>
   //
   // @method
   // @return Integer 8位无符号整数
   //==========================================================
   public readUint8() {
      var o = this;
      var value = o._viewer.getUint8(o._position);
      o._position += 1;
      return value;
   }

   //==========================================================
   // <T>读取有16位无符号整数。</T>
   //
   // @method
   // @return Integer 16位无符号整数
   //==========================================================
   public readUint16() {
      var o = this;
      var value = o._viewer.getUint16(o._position, o._endianCd);
      o._position += 2;
      return value;
   }

   //==========================================================
   // <T>读取有32位无符号整数。</T>
   //
   // @method
   // @return Integer 32位无符号整数
   //==========================================================
   public readUint32() {
      var o = this;
      var value = o._viewer.getUint32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }

   //==========================================================
   // <T>读取有64位无符号整数。</T>
   //
   // @method
   // @return Integer 64位无符号整数
   //==========================================================
   public readUint64() {
      var o = this;
      var endianCd = o._endianCd;
      var value1 = o._viewer.getUint32(o._position, endianCd);
      o._position += 4;
      var value2 = o._viewer.getUint32(o._position, endianCd);
      o._position += 4;
      var value = 0;
      if (endianCd) {
         value = (value2 << 32) + value1;
      } else {
         value = (value1 << 32) + value2;
      }
      return value;
   }

   //==========================================================
   // <T>读取浮点数。</T>
   //
   // @method
   // @return Number 浮点数
   //==========================================================
   public readFloat() {
      var o = this;
      var value = o._viewer.getFloat32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }

   //==========================================================
   // <T>读取双精度浮点数。</T>
   //
   // @method
   // @return Number 双精度浮点数
   //==========================================================
   public readDouble() {
      var o = this;
      var value = o._viewer.getFloat64(o._position, o._endianCd);
      o._position += 8;
      return value;
   }

   //==========================================================
   // <T>读取字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public readString() {
      var o = this;
      var viewer = o._viewer;
      var endianCd = o._endianCd;
      var position = o._position;
      var length = viewer.getUint16(position, endianCd);
      position += 2;
      var value = new FString();
      for (var i = 0; i < length; i++) {
         var character = viewer.getUint16(position, endianCd);
         value.push(String.fromCharCode(character));
         position += 2;
      }
      o._position = position;
      return value.flush();
   }

   //==========================================================
   // <T>读取字节数组。</T>
   //
   // @method
   // @param data:ArrayBuffer 数组
   // @param offset:Integer 开始位置
   // @param length:Integer 长度
   // @return Integer 读取长度
   //==========================================================
   public readBytes(data, offset, length) {
      var o = this;
      var viewer = o._viewer;
      // 检查长度
      if (length <= 0) {
         return;
      }
      // 暂时不支持开始位置选择
      if (offset != 0) {
         throw new FError(o, 'Unsupport.');
      }
      var position = o._position;
      var endianCd = o._endianCd;
      // 8字节复制
      if (length % 8 == 0) {
         var array = new Float64Array(data);
         var count = length >> 3;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getFloat64(position, endianCd);
            position += 8;
         }
         o._position = position;
         return;
      }
      // 4字节复制
      if (length % 4 == 0) {
         var array = new Uint32Array(data);
         var count = length >> 2;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getUint32(position, endianCd);
            position += 4;
         }
         o._position = position;
         return;
      }
      // 2字节复制
      if (length % 2 == 0) {
         var array = new Uint16Array(data);
         var count = length >> 1;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getUint16(position, endianCd);
            position += 2;
         }
         o._position = position;
         return;
      }
      // 逐字节复制
      var array = new Uint8Array(data);
      for (var i = 0; i < length; i++) {
         array[i] = viewer.getUint8(position++);
      }
      o._position = position;
   }

   //==========================================================
   // <T>读取类型数据。</T>
   //
   // @method
   // @param dataCd:EDataType 数据类型
   // @return Object 数据
   //==========================================================
   public readData(dataCd): any {
      var o = this;
      switch (dataCd) {
         case EDataType.Int8:
            return o.readInt8();
         case EDataType.Int16:
            return o.readInt16();
         case EDataType.Int32:
            return o.readInt32();
         case EDataType.Int64:
            return o.readInt64();
         case EDataType.Uint8:
            return o.readUint8();
         case EDataType.Uint16:
            return o.readUint16();
         case EDataType.Uint32:
            return o.readUint32();
         case EDataType.Uint64:
            return o.readUint64();
         case EDataType.Float32:
            return o.readFloat();
         case EDataType.Float64:
            return o.readDouble();
         case EDataType.String:
            return o.readString();
      }
      throw new FError(o, 'Unknown data cd. (data_cd={1})', dataCd);
   }

   //==========================================================
   // <T>写入布尔值。</T>
   //
   // @method
   // @return value:Boolean 布尔值
   //==========================================================
   public writeBoolean(value) {
      var o = this;
      o._viewer.setInt8(o._position, (value > 0) ? 1 : 0);
      o._position++;
   }

   //==========================================================
   // <T>写入8位有符号整数。</T>
   //
   // @method
   // @return value:Integer 8位有符号整数
   //==========================================================
   public writeInt8(value) {
      var o = this;
      o._viewer.setInt8(o._position, value);
      o._position++;
   }

   //==========================================================
   // <T>写入16位有符号整数。</T>
   //
   // @method
   // @return value:Integer 16位有符号整数
   //==========================================================
   public writeInt16(value) {
      var o = this;
      o._viewer.setInt16(o._position, value, o._endianCd);
      o._position += 2;
   }

   //==========================================================
   // <T>写入32位有符号整数。</T>
   //
   // @method
   // @return value:Integer 32位有符号整数
   //==========================================================
   public writeInt32(value) {
      var o = this;
      o._viewer.setInt32(o._position, value, o._endianCd);
      o._position += 4;
   }

   //==========================================================
   // <T>写入64位有符号整数。</T>
   //
   // @method
   // @return value:Integer 64位有符号整数
   //==========================================================
   public writeInt64(value) {
      var o = this;
      o._viewer.setInt32(o._position, value, o._endianCd);
      o._viewer.setInt32(o._position, value >> 32, o._endianCd);
      o._position += 8;
   }

   //==========================================================
   // <T>写入8位无符号整数。</T>
   //
   // @method
   // @return value:Integer 8位无符号整数
   //==========================================================
   public writeUint8(value) {
      var o = this;
      o._viewer.setUint8(o._position, value);
      o._position += 1;
   }

   //==========================================================
   // <T>写入16位无符号整数。</T>
   //
   // @method
   // @return value:Integer 16位无符号整数
   //==========================================================
   public writeUint16(value) {
      var o = this;
      o._viewer.setUint16(o._position, value, o._endianCd);
      o._position += 2;
   }

   //==========================================================
   // <T>写入32位无符号整数。</T>
   //
   // @method
   // @return value:Integer 32位无符号整数
   //==========================================================
   public writeUint32(value) {
      var o = this;
      o._viewer.setUint32(o._position, value, o._endianCd);
      o._position += 4;
   }

   //==========================================================
   // <T>写入64位无符号整数。</T>
   //
   // @method
   // @return value:Integer 64位无符号整数
   //==========================================================
   public writeUint64(value) {
      var o = this;
      o._viewer.setUint32(o._position, value, o._endianCd);
      o._viewer.setUint32(o._position, value >> 32, o._endianCd);
      o._position += 8;
   }

   //==========================================================
   // <T>写入浮点数。</T>
   //
   // @method
   // @return value:Number 浮点数
   //==========================================================
   public writeFloat(value) {
      var o = this;
      o._viewer.setFloat32(o._position, value, o._endianCd);
      o._position += 4;
   }

   //==========================================================
   // <T>写入双精度浮点数。</T>
   //
   // @method
   // @return value:Number 双精度浮点数
   //==========================================================
   public writeDouble(value) {
      var o = this;
      o._viewer.setFloat64(o._position, value, o._endianCd);
      o._position += 8;
   }

   //==========================================================
   // <T>写入字符串。</T>
   //
   // @method
   // @return value:String 字符串
   //==========================================================
   public writeString(value) {
      var o = this;
      var viewer: DataView = o._viewer;
      var length = value.length;
      var endianCd = o._endianCd;
      var position = o._position;
      viewer.setUint16(position, length, endianCd);
      position += 2;
      for (var i = 0; i < length; i++) {
         viewer.setUint16(position, value.charCodeAt(i), endianCd);
         position += 2;
      }
      o._position = position;
   }

   //==========================================================
   // <T>写入字节数组。</T>
   //
   // @method
   // @param data:ArrayBuffer 数组
   // @param offset:Integer 开始位置
   // @param length:Integer 长度
   // @return Integer 读取长度
   //==========================================================
   public writeBytes(data, offset, length) {
      var o = this;
      var viewer = o._viewer;
      // 检查长度
      if (length <= 0) {
         return;
      }
      // 暂时不支持开始位置选择
      if (offset != 0) {
         throw new FError(this, 'Unsupport.');
      }
      var position = o._position;
      var endianCd = o._endianCd;
      // 8字节复制
      if (length % 8 == 0) {
         var array = new Float64Array(data);
         var count = length >> 3;
         for (var i = 0; i < count; i++) {
            viewer.setFloat64(position, array[i], endianCd);
            position += 8;
         }
         o._position = position;
         return;
      }
      // 4字节复制
      if (length % 4 == 0) {
         var array = new Uint32Array(data);
         var count = length >> 2;
         for (var i = 0; i < count; i++) {
            viewer.setUint32(position, array[i], endianCd);
            position += 4;
         }
         o._position = position;
         return;
      }
      // 2字节复制
      if (length % 2 == 0) {
         var array = new Uint16Array(data);
         var count = length >> 1;
         for (var i = 0; i < count; i++) {
            viewer.setUint16(position, array[i], endianCd);
            position += 2;
         }
         o._position = position;
         return;
      }
      // 逐字节复制
      var array = new Uint8Array(data);
      for (var i = 0; i < length; i++) {
         viewer.setUint8(position++, array[i]);
      }
      o._position = position;
   }

   //==========================================================
   // <T>写入类型数据。</T>
   //
   // @method
   // @param dataCd:EDataType 数据类型
   // @param value:Object 数据
   //==========================================================
   public writeData(dataCd, value) {
      var o = this;
      switch (dataCd) {
         case EDataType.Int8:
            return o.writeInt8(value);
         case EDataType.Int16:
            return o.writeInt16(value);
         case EDataType.Int32:
            return o.writeInt32(value);
         case EDataType.Int64:
            return o.writeInt64(value);
         case EDataType.Uint8:
            return o.writeUint8(value);
         case EDataType.Uint16:
            return o.writeUint16(value);
         case EDataType.Uint32:
            return o.writeUint32(value);
         case EDataType.Uint64:
            return o.writeUint64(value);
         case EDataType.Float32:
            return o.writeFloat(value);
         case EDataType.Float64:
            return o.writeDouble(value);
         case EDataType.String:
            return o.writeString(value);
      }
      throw new FError(o, 'Unknown data cd. (data_cd={1})', dataCd);
   }
}
