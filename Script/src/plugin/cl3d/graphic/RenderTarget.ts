import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Size2} from '../../../runtime/common/math/Size2';
import {Color4} from '../../../runtime/common/math/Color4';
import {Texture} from '../../../runtime/graphic/material/Texture';
import {Content} from './Content';

//==========================================================
// <T>渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
export class RenderTarget extends Content {
   // @attribute
   public optionDepth: boolean;
   public size: Size2;
   public color: Color4;
   protected _textures: Objects<Texture>;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.size = new Size2();
      this.color = new Color4(0, 0, 0, 1);
      this._textures = new Objects<Texture>();
   }

   //==========================================================
   // <T>构建处理。</T>
   //==========================================================
   public build() {
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
   // @return 纹理集合
   //==========================================================
   public get textures() {
      return this._textures;
   }

   //==========================================================
   // <T>增加一个纹理。</T>
   //
   // @param texture 纹理
   //==========================================================
   public pushTexture(texture: Texture) {
      var textures = this._textures;
      if (!textures) {
         textures = this._textures = new Objects<Texture>();
      }
      textures.push(texture);
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
