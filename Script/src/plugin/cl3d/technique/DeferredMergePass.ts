import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {Texture} from '../../../runtime/graphic/material/Texture';
import {EffectConsole} from '../graphic/EffectConsole';
import {PlaneRenderable} from '../shape/PlaneRenderable';
import {DeferredMergeAutomaticEffect} from './effect/DeferredMergeAutomaticEffect';
import {TechniquePass} from './TechniquePass';
import {Region} from '../base/Region';
import {PoolTextureService} from '../pool/PoolTextureService';
import {WglFlatTexture} from '../graphic/wgl/WglFlatTexture';

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
   public textureDepth: Texture;
   // 法线纹理
   public textureNormal: Texture;
   // 颜色纹理
   public textureColor: Texture;

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
      var context = this.graphicContext;
      // 创建平面对象
      var renderable = this._renderable = new PlaneRenderable();
      renderable.linkGraphicContext(context);
      renderable.setup();
   }

   //==========================================================
   // <T>首次绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawFirst(region: Region) {
      var context = this.graphicContext;
      var renderable = this._renderable;
      // 获得渲染器
      var effectConsole: EffectConsole = ServiceUtil.find(EffectConsole);
      var effect = this._renderableEffect = <DeferredMergeAutomaticEffect>effectConsole.find(context, region, renderable);
      renderable.effectSet(effect.code, effect);
      // 设置材质
      var material = renderable.material;
      material.setTexture('depth', this.textureDepth = this.inputTextures.get('depth'));
      material.setTexture('normal', this.textureNormal = this.inputTextures.get('normal'));
      material.setTexture('color', this.textureColor = this.inputTextures.get('color'));
   }

   //==========================================================
   // <T>开始绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawBegin(region: Region): boolean {
      super.drawBegin(region);
      // 设置渲染目标
      var context = this.graphicContext;
      context.setRenderTarget(null);
      context.clearColorDepth(region.backgroundColor);
      // 绘制处理
      var effect = this._renderableEffect;
      context.setProgram(effect.program);
      effect.drawRenderable(region, this._renderable);
      return false;
   }
}