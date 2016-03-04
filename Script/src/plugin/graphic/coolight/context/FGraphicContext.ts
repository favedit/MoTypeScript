import {FObject} from '../../../../runtime/common/lang/FObject';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {SSize2} from '../../../../runtime/common/math/SSize2';

//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FGraphicContext extends FObject {
   //o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   //_size = MO.Class.register(o, new MO.AGetter('_size'));
   _size: SSize2 = null;
   //_hCanvas = MO.Class.register(o, new MO.AGetter('_hCanvas', 'htmlCanvas'));
   _hCanvas = null;
   //..........................................................
   // @method
   //o.construct = MO.FGraphicContext_construct;
   // @method
   //o.linkCanvas = MO.Method.virtual(o, 'linkCanvas');
   // @method
   //o.dispose = MO.FGraphicContext_dispose;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._size = new SSize2(1280, 720);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._size = RObject.dispose(this._size);
      this._hCanvas = null;
      // 父处理
      super.dispose();
   }
}
