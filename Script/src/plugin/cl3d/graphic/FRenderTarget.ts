import {FObjects} from '../../../runtime/common/lang/FObjects';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SSize2} from '../../../runtime/common/math/SSize2';
import {SColor4} from '../../../runtime/common/math/SColor4';
import {FContent} from './FContent';

//==========================================================
// <T>渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
export class FRenderTarget extends FContent {
   // @attribute
   public size: SSize2 = new SSize2();
   public color: SColor4 = new SColor4(0, 0, 0, 1);
   protected _textures: FObjects<any> = new FObjects();

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.size = new SSize2();
      this.color = new SColor4(0, 0, 0, 1);
      this._textures = new FObjects();
   }

   //==========================================================
   // <T>设置质量类型。</T>
   //
   // @method
   // @return qualityCd 质量类型
   //==========================================================
   public setQualityCd(qualityCd) {
      var o = this;
      var size = o.size;
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
   public get textures() {
      var textures = this._textures;
      if (!textures) {
         textures = this._textures = new FObjects();
      }
      return textures;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.size = RObject.dispose(this.size);
      this.color = RObject.dispose(this.color);
      this._textures = RObject.dispose(this._textures);
      // 父处理
      super.dispose();
   }
}
