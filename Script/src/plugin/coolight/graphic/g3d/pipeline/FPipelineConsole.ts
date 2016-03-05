import {RClass} from '../../../../runtime/common/reflect/RClass';
import {FConsole} from '../../../../runtime/core/FConsole';
import {FPipeline} from './FPipeline';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FPipelineConsole extends FConsole {

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public allocPipeline() :FPipeline{
      return RClass.create(FPipeline);
   }
}