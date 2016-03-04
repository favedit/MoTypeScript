import {FObjects} from '../../../../runtime/common/lang/FObjects';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {SSize2} from '../../../../runtime/common/math/SSize2';
import {SColor4} from '../../../../runtime/common/math/SColor4';
import {FG3dObject} from './FG3dObject';

//==========================================================
// <T>渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
export class FG3dRenderTarget extends FG3dObject {
   // @attribute
   //o._size = MO.Class.register(o, new MO.AGetter('_size'));
   protected _size: SSize2 = new SSize2();
   //o._color = MO.Class.register(o, new MO.AGetter('_color'));
   protected _color: SColor4 = new SColor4(0, 0, 0, 1);
   protected _textures: FObjects = new FObjects();

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>设置质量类型。</T>
   //
   // @method
   // @return qualityCd 质量类型
   //==========================================================
   public setQualityCd(qualityCd) {
      var o = this;
      var size = o._size;
      /*switch (qualityCd) {
         case MO.EGraphicQuality.Highest:
            size.set(4096, 4096);
            break;
         case MO.EGraphicQuality.High:
            size.set(2048, 2048);
            break;
         case MO.EGraphicQuality.Middle:
            size.set(1024, 1024);
            break;
         case MO.EGraphicQuality.Low:
            size.set(512, 512);
            break;
         case MO.EGraphicQuality.Lowest:
            size.set(256, 256);
            break;
         default:
            size.set(64, 64);
      }*/
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return TObjects 纹理集合
   //==========================================================
   public textures() {
      var o = this;
      var textures = o._textures;
      if (!textures) {
         textures = o._textures = new FObjects();
      }
      return textures;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._size = RObject.dispose(this._size);
      this._color = RObject.dispose(this._color);
      this._textures = RObject.dispose(this._textures);
      // 父处理
      super.dispose();
   }
}
