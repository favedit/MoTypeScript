import {FDataStream} from './FDataStream'

//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FByteStream extends FDataStream {
   //..........................................................
   protected _length: number = 0;
   protected _memory = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>设置长度。</T>
   //
   // @method
   // @param length:Integer 长度
   //==========================================================
   public setLength(length) {
      this._length = length;
      this._memory = new ArrayBuffer(length);
      this.viewer = new DataView(this._memory);
   }

   //==========================================================
   // <T>反转数据处理。</T>
   //
   // @method
   //==========================================================
   public flip() {
      this._length = this.position;
      this.position = 0;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @author maocy
   //==========================================================
   public dispose() {
      this.viewer = null;
      this._memory = null;
      super.dispose();
   }
}
