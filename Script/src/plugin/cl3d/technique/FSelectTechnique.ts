import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {FTechnique} from './FTechnique';
import {FRenderable} from '../base/FRenderable';
import {FRegion} from '../base/FRegion';
import {ETechniqueMode} from './ETechniqueMode'
import {FSelectPass} from './FSelectPass';

//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class FSelectTechnique extends FTechnique {
   // 选择过程
   protected _passSelect: FSelectPass;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'select';
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
      this.registerMode(ETechniqueMode.Result);
      //..........................................................
      // 创建选取处理过程
      var pass = this._passSelect = ClassUtil.create(FSelectPass);
      pass.linkGraphicContext(this._graphicContext);
      pass.setup();
      this.pushPass(pass);
   }

   //==========================================================
   // <T>测试信息。</T>
   //
   // @param region 渲染区域
   //==========================================================
   public test(region: FRegion, x: number, y: number) {
      // 设置区域属性
      region.selectPosition.set(x, y);
      // 绘制所有过程
      this.drawRegion(region);
      // 返回选中内容
      return this._passSelect.selectRenderable;
   }
}