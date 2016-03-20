import {ETexture} from './ETexture';
import {FTexture} from './FTexture';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FCubeTexture extends FTexture {
   // 大小
   public size: number = 0;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.textureCd = ETexture.Cube;
   }

   //o.upload    = MO.Method.virtual(o, 'upload');
   //o.update    = MO.Method.empty;
}