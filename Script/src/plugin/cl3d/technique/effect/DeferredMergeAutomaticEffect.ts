import {AutomaticEffect} from './AutomaticEffect';

//==========================================================
// <T>延迟合并渲染器。</T>
//
// @author maocy
// @history 160324
//==========================================================
export class DeferredMergeAutomaticEffect extends AutomaticEffect {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.code = 'deferred.merge.automatic';
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @param region 渲染区域
   // @param renderable 渲染对象
   //==========================================================
   public drawRenderable(region, renderable) {
      var program = this.program;
      // 绑定材质
      this.bindMaterial(renderable.material);
      // 绘制处理
      super.drawRenderable(region, renderable);
   }
}