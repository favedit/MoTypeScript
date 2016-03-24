import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil'
import {Technique} from './Technique';
import {TechniqueModeEnum} from './TechniqueModeEnum'
import {GeneralColorPass} from './GeneralColorPass'

//==========================================================
// <T>通用渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class GeneralTechnique extends Technique {
   // 颜色过程
   public _passColor: GeneralColorPass;

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
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
      this.registerMode(TechniqueModeEnum.Ambient);
      this.registerMode(TechniqueModeEnum.DiffuseLevel);
      this.registerMode(TechniqueModeEnum.DiffuseColor);
      this.registerMode(TechniqueModeEnum.SpecularLevel);
      this.registerMode(TechniqueModeEnum.SpecularColor);
      this.registerMode(TechniqueModeEnum.Result);
      //..........................................................
      // 创建颜色处理过程
      var pass = this._passColor = ClassUtil.create(GeneralColorPass);
      pass.linkGraphicContext(this.graphicContext);
      pass.setup();
      this.pushPass(pass);
   }
}