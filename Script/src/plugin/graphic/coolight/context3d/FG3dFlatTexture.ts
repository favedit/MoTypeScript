import {RObject} from '../../../../runtime/common/lang/RObject';
import {SSize2} from '../../../../runtime/common/math/SSize2';
import {FG3dTexture} from './FG3dTexture';

//==========================================================
// <T>平面渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FG3dFlatTexture extends FG3dTexture {
   // @attribute
   //o._optionFlipY = MO.Class.register(o, new MO.AGetSet('_optionFlipY'), false);
   _optionFlipY = false;
   // @attribute
   //o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   _size: SSize2 = new SSize2();
   // @method
   //o.uploadData   = MO.Method.virtual(o, 'uploadData');
   //o.upload       = MO.Method.virtual(o, 'upload');
   //o.update       = MO.Method.empty;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //o._textureCd = MO.EG3dTexture.Flat2d;
      //o._size = new MO.SSize2();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._size = RObject.dispose(this._size);
      // 父处理
      super.dispose();
   }
}
