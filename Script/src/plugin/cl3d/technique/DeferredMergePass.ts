import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {Texture} from '../../../runtime/graphic/material/Texture';
import {EffectConsole} from '../graphic/EffectConsole';
import {PlaneRenderable} from '../shape/PlaneRenderable';
import {DeferredMergeAutomaticEffect} from './effect/DeferredMergeAutomaticEffect';
import {TechniquePass} from './TechniquePass';
import {Region} from '../base/Region';
import {TextureService} from '../renderable/TextureService';
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
   // 素描纹理
   public textureSketchReady: boolean;
   public textureSketch1: Texture;
   public textureSketch2: Texture;
   public textureSketch3: Texture;

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
      var context = this._graphicContext;
      // 创建平面对象
      var renderable = this._renderable = new PlaneRenderable();
      renderable.linkGraphicContext(context);
      renderable.setup();
      // 加载纹理
      this.textureSketch1 = ServiceUtil.find(TextureService).loadByUrl(context, WglFlatTexture, '/sk/res/style/sketch/1.jpg');
      this.textureSketch2 = ServiceUtil.find(TextureService).loadByUrl(context, WglFlatTexture, '/sk/res/style/sketch/2.jpg');
      this.textureSketch3 = ServiceUtil.find(TextureService).loadByUrl(context, WglFlatTexture, '/sk/res/style/sketch/3.jpg');
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
   // <T>开始绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawBegin(region: Region): boolean {
      super.drawBegin(region);
      // 设置纹理
      if (!this.textureSketchReady) {
         if (this.textureSketch1.testReady() && this.textureSketch2.testReady() && this.textureSketch3.testReady()) {
            var material = this._renderable.material;
            material.setTexture('sketch1', this.textureSketch1);
            material.setTexture('sketch2', this.textureSketch2);
            material.setTexture('sketch3', this.textureSketch3);
            this.textureSketchReady = true;
         }
      }
      // 设置渲染目标
      var context = this._graphicContext;
      context.setRenderTarget(null);
      context.clearColorDepth(region.backgroundColor);
      // 绘制处理
      if (this.textureSketchReady) {
         var effect = this._renderableEffect;
         context.setProgram(effect.program);
         effect.drawRenderable(region, this._renderable);
      }
      return false;
   }
}