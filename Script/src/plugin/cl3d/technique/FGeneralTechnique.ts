import {RClass} from '../../../runtime/common/reflect/RClass'
import {FTechnique} from '../graphic/FTechnique';
import {ETechniqueMode} from './ETechniqueMode'
import {FGeneralColorPass} from './FGeneralColorPass'

//==========================================================
// <T>通用渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class FGeneralTechnique extends FTechnique {
   // 颜色过程
   public _passColor = null;
   
   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public constructor() {
      super();
      this.code = "general";
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      //..........................................................
      // 创建支持模式
      this.registerMode(ETechniqueMode.Ambient);
      this.registerMode(ETechniqueMode.DiffuseLevel);
      this.registerMode(ETechniqueMode.DiffuseColor);
      this.registerMode(ETechniqueMode.SpecularLevel);
      this.registerMode(ETechniqueMode.SpecularColor);
      this.registerMode(ETechniqueMode.Result);
      //..........................................................
      // 创建颜色处理过程
      var pass = this._passColor = RClass.create(FGeneralColorPass);
      pass.linkGraphicContext(this.graphicContext);
      pass.setup();
      this.pushPass(pass);
   }
}