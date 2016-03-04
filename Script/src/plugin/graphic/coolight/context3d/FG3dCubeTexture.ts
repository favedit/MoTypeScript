import {FG3dTexture} from './FG3dTexture';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FG3dCubeTexture extends FG3dTexture {
   //..........................................................
   // @attribute
   size: number = 0;
   //..........................................................
   // @method
   //o.construct = MO.FG3dTexture_construct;
   // @method
   //o.upload    = MO.Method.virtual(o, 'upload');
   //o.update    = MO.Method.empty;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      //o._textureCd = MO.EG3dTexture.Cube;
   }
}