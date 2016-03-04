import {FObject} from '../../../../runtime/common/lang/FObject';

//==========================================================
// <T>图形数据。</T>
//
// @class
// @author maocy
// @history 150308
//==========================================================
export class FFloatStream extends FObject {
   //_length = MO.Class.register(o, new MO.AGetter('_length'), 0);
   _length = 0;
   //_memory = MO.Class.register(o, new MO.AGetter('_memory'), null);
   _memory = null;
   _position = 0;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   public constructor() {
      super();
      //var o = this;
      //o.__base.FObject.construct.call(o);
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
      o._memory = new Float32Array(length);
   }

   //==========================================================
   // <T>写入4个浮点数。</T>
   //
   // @method
   // @param value1:Float 浮点数1
   // @param value2:Float 浮点数2
   // @param value3:Float 浮点数3
   // @param value4:Float 浮点数4
   //==========================================================
   public writeFloat4(value1, value2, value3, value4) {
      var o = this;
      o._memory[o._position++] = value1;
      o._memory[o._position++] = value2;
      o._memory[o._position++] = value3;
      o._memory[o._position++] = value4;
   }

   //==========================================================
   // <T>写入颜色。</T>
   //
   // @method
   // @param value:SColor4 颜色
   //==========================================================
   public writeColor4(value) {
      this.writeFloat4(value.red, value.green, value.blue, value.alpha);
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this._position = 0;
   }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   public clear() {
      this._position = 0;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @author maocy
   //==========================================================
   public dispose() {
      this._memory = null;
      // 父处理
      super.dispose();
   }
}
