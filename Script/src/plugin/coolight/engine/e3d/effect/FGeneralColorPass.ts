import {FTechniquePass} from '../../../graphic/g3d/FTechniquePass';

//==========================================================
// <T>通用颜色渲染过程。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class FGeneralColorPass extends FTechniquePass {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'color';
   }
}