import {RObject} from '../../../../runtime/common/lang/RObject';
import {SVector3} from '../../../../runtime/common/math/SVector3';
import {FG3dLight} from './FG3dLight';
import {FG3dCamera} from './FG3dCamera';

//==========================================================
// <T>方向光源。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dDirectionalLight extends FG3dLight {
   // @attribute
   //_camera      = MO.Class.register(o, new MO.AGetter('_camera'));
   protected _camera = null;
   //_viewport    = MO.Class.register(o, new MO.AGetter('_viewport'));
   protected _viewport = null;
   //_direction   = MO.Class.register(o, new MO.AGetter('_direction'));
   protected _direction: SVector3 = new SVector3();
   // @attribute
   protected _classCamera = FG3dCamera;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //o._camera = MO.Class.create(o._classCamera);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._camera = RObject.dispose(this._camera);
      this._direction = RObject.dispose(this._direction);
      // 父处理
      super.dispose();
   }
}
