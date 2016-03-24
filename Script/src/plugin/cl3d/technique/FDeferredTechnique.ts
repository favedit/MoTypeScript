import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil'
import {FTechnique} from './FTechnique';
import {ETechniqueMode} from './ETechniqueMode'
import {FDeferredDataPass} from './FDeferredDataPass'
import {FDeferredMergePass} from './FDeferredMergePass'

//==========================================================
// <T>通用渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class FDeferredTechnique extends FTechnique {
   // 数据过程
   public _passData: FDeferredDataPass;
   // 合并过程
   public _passMerge: FDeferredMergePass;

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
      this.registerMode(ETechniqueMode.Ambient);
      this.registerMode(ETechniqueMode.DiffuseLevel);
      this.registerMode(ETechniqueMode.DiffuseColor);
      this.registerMode(ETechniqueMode.SpecularLevel);
      this.registerMode(ETechniqueMode.SpecularColor);
      this.registerMode(ETechniqueMode.Result);
      //..........................................................
      // 创建数据处理过程
      var passData = this._passData = ClassUtil.create(FDeferredDataPass);
      passData.linkGraphicContext(this._graphicContext);
      passData.setup();
      this.pushPass(passData);
      // 创建合并处理过程
      var passMerge = this._passMerge = ClassUtil.create(FDeferredMergePass);
      passMerge.linkGraphicContext(this._graphicContext);
      passMerge.setup();
      this.pushPass(passMerge);
      //..........................................................
      // 设置关联
      //passData.
   }
}