import {FObject} from '../lang/FObject';

//==========================================================
// <T>数据观察基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class FDataView extends FObject {
   //..........................................................
   // @attribute
   protected _viewer = null;
   //_endianCd = MO.Class.register(o, new MO.AGetSet('_endianCd'), false);
   protected endianCd: boolean = false;

   //==========================================================
   // <T>获得有8位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 8位有符号整数
   //==========================================================
   public getInt8(p) {
      return this._viewer.getInt8(p, this.endianCd);
   }

   //==========================================================
   // <T>获得有16位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 16位有符号整数
   //==========================================================
   public getInt16(p) {
      return this._viewer.getInt16(p, this.endianCd);
   }

   //==========================================================
   // <T>获得有32位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 32位有符号整数
   //==========================================================
   public getInt32(p) {
      return this._viewer.getInt32(p, this.endianCd);
   }

   //==========================================================
   // <T>获得有64位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 64位有符号整数
   //==========================================================
   public getInt64(p) {
      return this._viewer.getInt64(p, this.endianCd);
   }

   //==========================================================
   // <T>获得有8位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 8位无符号整数
   //==========================================================
   public getUint8(p) {
      return this._viewer.getUint8(p, this.endianCd);
   }

   //==========================================================
   // <T>获得有16位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 16位无符号整数
   //==========================================================
   public getUint16(p) {
      return this._viewer.getUint16(p, this.endianCd);
   }

   //==========================================================
   // <T>获得有32位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 32位无符号整数
   //==========================================================
   public getUint32(p) {
      return this._viewer.getUint32(p, this.endianCd);
   }

   //==========================================================
   // <T>获得有64位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Integer 64位无符号整数
   //==========================================================
   public getUint64(p) {
      return this._viewer.getUint64(p, this.endianCd);
   }

   //==========================================================
   // <T>获得浮点数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Number 浮点数
   //==========================================================
   public getFloat(p) {
      return this._viewer.getFloat32(p, this.endianCd);
   }

   //==========================================================
   // <T>获得双精度浮点数。</T>
   //
   // @param p:index:Integer 索引位置
   // @return Number 双精度浮点数
   //==========================================================
   public getDouble(p) {
      return this._viewer.getFloat64(p, this.endianCd);
   }

   //==========================================================
   // <T>设置有8位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 8位有符号整数
   //==========================================================
   public setInt8(p, v) {
      this._viewer.setInt8(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置有16位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 16位有符号整数
   //==========================================================
   public setInt16(p, v) {
      this._viewer.setInt16(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置有32位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 32位有符号整数
   //==========================================================
   public setInt32(p, v) {
      this._viewer.setInt32(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置有64位有符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 64位有符号整数
   //==========================================================
   public setInt64(p, v) {
      this._viewer.setInt64(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置有8位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 8位无符号整数
   //==========================================================
   public setUint8(p, v) {
      this._viewer.setUint8(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置有16位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 16位无符号整数
   //==========================================================
   public setUint16(p, v) {
      this._viewer.setUint16(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置有32位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 32位无符号整数
   //==========================================================
   public setUint32(p, v) {
      this._viewer.setUint32(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置有64位无符号整数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Integer 64位无符号整数
   //==========================================================
   public setUint64(p, v) {
      this._viewer.setUint64(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置浮点数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Number 浮点数
   //==========================================================
   public setFloat(p, v) {
      this._viewer.setFloat32(p, v, this.endianCd);
   }

   //==========================================================
   // <T>设置双精度浮点数。</T>
   //
   // @param p:index:Integer 索引位置
   // @param v:value:Number 双精度浮点数
   //==========================================================
   public setDouble(p, v) {
      this._viewer.setDouble(p, v, this.endianCd);
   }
}
