import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Size2} from '../../../runtime/common/math/Size2';
import {Color4} from '../../../runtime/common/math/Color4';
import {Content} from './Content';

//==========================================================
// <T>渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
export class RenderTarget extends Content {
   // @attribute
   public size: Size2 = new Size2();
   public color: Color4 = new Color4(0, 0, 0, 1);
   protected _textures: Objects<any> = new Objects();

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.size = new Size2();
      this.color = new Color4(0, 0, 0, 1);
      this._textures = new Objects();
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
         textures = this._textures = new Objects();
      }
      return textures;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.size = ObjectUtil.dispose(this.size);
      this.color = ObjectUtil.dispose(this.color);
      this._textures = ObjectUtil.dispose(this._textures);
      // 父处理
      super.dispose();
   }
}
