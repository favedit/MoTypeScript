import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {FTexture} from '../../../runtime/graphic/material/FTexture';
import {EffectConsole} from '../graphic/EffectConsole';
import {PlaneRenderable} from '../shape/PlaneRenderable';
import {DeferredMergeAutomaticEffect} from './effect/DeferredMergeAutomaticEffect';
import {TechniquePass} from './TechniquePass';
import {Region} from '../base/Region';

//==========================================================
// <T>通用颜色渲染过程。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class DeferredMergePass extends TechniquePass {
   // 渲染对象
   protected _renderable: PlaneRenderable;
   // 渲染效果
   protected _renderableEffect: DeferredMergeAutomaticEffect;
   // 深度纹理
   public textureDepth: FTexture;
   // 法线纹理
   public textureNormal: FTexture;
   // 颜色纹理
   public textureColor: FTexture;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.code = 'merge';
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
      super.setup();
      // 创建平面对象
      var renderable = this._renderable = new PlaneRenderable();
      renderable.linkGraphicContext(this._graphicContext);
      renderable.setup();
   }

   //==========================================================
   // <T>首次绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawFirst(region: Region) {
      var context = this._graphicContext;
      var renderable = this._renderable;
      // 获得渲染器
      var effectConsole: EffectConsole = ServiceUtil.find(EffectConsole);
      var effect = this._renderableEffect = <DeferredMergeAutomaticEffect>effectConsole.find(context, region, renderable);
      renderable.effectSet(effect.code, effect);
      // 设置材质
      var material = renderable.material;
      material.setTexture('depth', this.textureDepth);
      material.setTexture('normal', this.textureNormal);
      material.setTexture('color', this.textureColor);
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawRegion(region: Region) {
      var context = this._graphicContext;
      var renderable = this._renderable;
      var effect = this._renderableEffect;
      // 设置渲染目标
      context.setRenderTarget(null);
      // 绘制处理
      context.setProgram(effect.program);
      effect.drawRenderable(region, renderable);
   }
}