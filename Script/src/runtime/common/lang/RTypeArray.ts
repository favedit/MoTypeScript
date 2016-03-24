import {DataTypeEnum} from './DataTypeEnum';
import {FError} from './FError';

//==========================================================
// <T>类型数组的工具类</T>
//
// @reference
// @author maocy
// @version 150112
//==========================================================
export class RTypeArray {
   // @attribute
   private static _float3 = null;
   private static _float4 = null;
   private static _data = new Object();

   //==========================================================
   // <T>获得3元素浮点数。</T>
   //
   // @method
   // @return Float32Array 浮点数
   //==========================================================
   public static float3() {
      var o = this;
      var value = o._float3;
      if (value == null) {
         value = o._float3 = new Float32Array(3);
      }
      return value;
   }

   //==========================================================
   // <T>获得4元素浮点数。</T>
   //
   // @method
   // @return Float32Array 浮点数
   //==========================================================
   public static float4() {
      var o = this;
      var value = o._float4;
      if (value == null) {
         value = o._float4 = new Float32Array(4);
      }
      return value;
   }

   //==========================================================
   // <T>创建定长的数组。</T>
   //
   // @method
   // @param typeCd:EDataType 数据类型
   // @param length:Integer 数据长度
   // @return Array 数组
   //==========================================================
   public static createArray(typeCd, length) {
      switch (typeCd) {
         case DataTypeEnum.Boolean:
         case DataTypeEnum.Int8:
            return new Int8Array(length);
         case DataTypeEnum.Int16:
            return new Int16Array(length);
         case DataTypeEnum.Int32:
            return new Int32Array(length);
         case DataTypeEnum.Uint8:
            return new Uint8Array(length);
         case DataTypeEnum.Uint16:
            return new Uint16Array(length);
         case DataTypeEnum.Uint32:
            return new Uint32Array(length);
         case DataTypeEnum.Float32:
            return new Float32Array(length);
         case DataTypeEnum.Float64:
            return new Float64Array(length);
      }
      throw new FError('Create unknown type array. (type={1}, length={2})', typeCd, length);
   }

   //==========================================================
   // <T>获得唯一的临时数组。</T>
   //
   // @method
   // @param typeCd:EDataType 数据类型
   // @param length:Integer 数据长度
   // @return Array 数组
   //==========================================================
   public static findTemp(typeCd, length) {
      var o = this;
      var data = o._data;
      // 获得类型集合
      var collection = data[typeCd];
      if (collection == null) {
         collection = data[typeCd] = new Object();
      }
      // 获得类型长度
      var result = collection[length];
      if (result == null) {
         result = collection[length] = o.createArray(typeCd, length);
      }
      return result;
   }
}
