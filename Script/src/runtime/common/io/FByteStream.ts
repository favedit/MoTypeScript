import {FDataStream} from './FDataStream'

//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FByteStream extends FDataStream {
   //..........................................................
   // @attribute
   //protected _length:number = MO.Class.register(o, new MO.AGetter('_length'), 0);
   protected _length: number = 0;
   //protected _memory = MO.Class.register(o, new MO.AGetter('_memory'));
   protected _memory = null;
   protected _viewer = null;

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
      var o = this;
      o._length = length;
      o._memory = new ArrayBuffer(length);
      o._viewer = new DataView(o._memory);
   }

   //==========================================================
   // <T>反转数据处理。</T>
   //
   // @method
   //==========================================================
   public flip() {
      this._length = this._position;
      this._position = 0;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @author maocy
   //==========================================================
   public dispose() {
      var o = this;
      o._viewer = null;
      o._memory = null;
      super.dispose();
   }
}
