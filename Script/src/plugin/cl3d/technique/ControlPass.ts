import {TechniquePass} from './TechniquePass';

//==========================================================
// <T>控件渲染过程。</T>
//
// @author maocy
// @history 150211
//==========================================================
export class ControlPass extends TechniquePass {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'control';
   }
}