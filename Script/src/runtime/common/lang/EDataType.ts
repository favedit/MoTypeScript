//==========================================================
// <T>数据类型的工具类</T>
//
// @reference
// @author maocy
// @version 150112
//==========================================================
export enum EDataType {
   // @member 未知
   Unknown = 0,
   // @member 8位有符号整数
   Boolean = 1,
   // @member 8位有符号整数
   Int8 = 1,
   // @member 16位有符号整数
   Int16 = 2,
   // @member 32位有符号整数
   Int32 = 3,
   // @member 64位有符号整数
   Int64 = 4,
   // @member 8位无符号整数
   Uint8 = 5,
   // @member 16位无符号整数
   Uint16 = 6,
   // @member 32位无符号整数
   Uint32 = 7,
   // @member 64位无符号整数
   Uint64 = 8,
   // @member 16位浮点数
   Float16 = 9,
   // @member 32位浮点数
   Float32 = 10,
   // @member 64位浮点数
   Float64 = 11,
   // @member 字符串
   String = 12,
   // @member 数组集合
   Array = 13,
   // @member 结构
   Struct = 14,
   // @member 结构
   Structs = 15,
   // @member 对象
   Object = 16,
   // @member 对象集合
   Objects = 17,
   // @member 字典集合
   Dictionary = 18,
}
