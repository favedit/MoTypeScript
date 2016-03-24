import {Objects} from '../../../runtime/common/lang/Objects';
import {Point2} from '../../../runtime/common/math/Point2';
import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {FEffectConsole} from '../graphic/FEffectConsole';
import {ESamplerFilter} from '../graphic/ESamplerFilter';
import {TechniquePass} from './TechniquePass';
import {FRenderTarget} from '../graphic/FRenderTarget';
import {FFlatTexture} from '../graphic/FFlatTexture';
import {FRenderable} from '../base/FRenderable';
import {FRegion} from '../base/FRegion';

//==========================================================
// <T>阴影深度渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
// export class FG3dSelectPass{
export class SelectPass extends TechniquePass {
   // @attribute
   protected _texture: FFlatTexture;
   protected _renderTarget: FRenderTarget;
   protected _position: Point2 = new Point2();
   protected _data = new Uint8Array(4);
   public selectRenderable: FRenderable;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      this.code = 'select';
      var context = this._graphicContext;
      // 创建平面
      var texture = this._texture = context.createFlatTexture();
      texture.setFilterCd(ESamplerFilter.Nearest, ESamplerFilter.Nearest);
      texture.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      // 创建渲染目标
      var renderTarget = this._renderTarget = context.createRenderTarget();
      renderTarget.size.set(1, 1);
      renderTarget.textures.push(texture);
      renderTarget.build();
   }

   //==========================================================
   // <T>激活效果器。</T>
   //
   // @param region 区域
   // @param renderables 渲染集合
   //==========================================================
   public activeEffects(region: FRegion, renderables: Objects<FRenderable>) {
      var spaceName = region.spaceName;
      // 关联渲染器
      var count = renderables.count();
      for (var i = 0; i < count; i++) {
         var renderable: FRenderable = renderables.at(i);
         if (renderable.optionSelect) {
            var info = renderable.selectInfo(spaceName);
            if (!info.effect) {
               info.effect = ServiceUtil.find(FEffectConsole).find(this._graphicContext, region, renderable);
            }
         }
      }
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawRegion(region: FRegion) {
      var context = this._graphicContext;
      var handle = context.handle;
      // 设置渲染目标
      context.setRenderTarget(this._renderTarget);
      context.clear(0, 0, 0, 0, 1, 1);
      //..........................................................
      // 绘制处理
      var renderables = region.allRenderables;
      // 激活效果器
      this.activeEffects(region, renderables);
      // 绘制非界面处理
      var renderableCount = renderables.count();
      for (var i = 0; i < renderableCount; i++) {
         var renderable = renderables.at(i);
         if (renderable.optionSelect) {
            var effect = renderable.activeEffect();
            context.setProgram(effect.program);
            //var display = renderable.display();
            //if (!display) {
            effect.drawRenderable(region, renderable, i);
            //} else if (!display._optionFace) {
            //   effect.drawRenderable(region, renderable, i);
            //}
         }
      }
      // 绘制界面处理
      // context.clearDepth(1);
      // for (var i = 0; i < renderableCount; i++) {
      //    var renderable = renderables.at(i);
      //    if (renderable.optionSelect) {
      //       var effect = renderable.activeEffect();
      //       context.setProgram(effect.program());
      //       var display = renderable.display();
      //       if (display && display._optionFace) {
      //          effect.drawRenderable(region, renderable, i);
      //       }
      //    }
      // }
      //..........................................................
      // 读取输出
      handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, this._data);
      var index = this._data[0] + (this._data[1] << 8) + (this._data[2] << 16);
      this.selectRenderable = null;
      if (index != 0) {
         this.selectRenderable = renderables.get(index - 1);
      }
   }
}
