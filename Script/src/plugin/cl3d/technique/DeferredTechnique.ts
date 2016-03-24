import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil'
import {Technique} from './Technique';
import {TechniqueModeEnum} from './TechniqueModeEnum'
import {DeferredDataPass} from './DeferredDataPass'
import {DeferredMergePass} from './DeferredMergePass'

//==========================================================
// <T>通用渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class DeferredTechnique extends Technique {
   // 数据过程
   public _passData: DeferredDataPass;
   // 合并过程
   public _passMerge: DeferredMergePass;

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.code = "deferred";
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      var context = this._graphicContext;
      context.enableDrawBuffers();
      //..........................................................
      // 创建支持模式
      this.registerMode(TechniqueModeEnum.Ambient);
      this.registerMode(TechniqueModeEnum.DiffuseLevel);
      this.registerMode(TechniqueModeEnum.DiffuseColor);
      this.registerMode(TechniqueModeEnum.SpecularLevel);
      this.registerMode(TechniqueModeEnum.SpecularColor);
      this.registerMode(TechniqueModeEnum.Result);
      //..........................................................
      // 创建数据处理过程
      var passData = this._passData = ClassUtil.create(DeferredDataPass);
      passData.linkGraphicContext(this._graphicContext);
      passData.setup();
      this.pushPass(passData);
      // 创建合并处理过程
      var passMerge = this._passMerge = ClassUtil.create(DeferredMergePass);
      passMerge.linkGraphicContext(this._graphicContext);
      passMerge.setup();
      this.pushPass(passMerge);
      //..........................................................
      // 设置关联
      //passData.
   }
}