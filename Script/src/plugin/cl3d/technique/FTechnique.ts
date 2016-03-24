import {Objects} from '../../../runtime/common/lang/Objects';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {RAssert} from '../../../runtime/common/RAssert';
import {FScene} from '../base/FScene';
import {FRegion} from '../base/FRegion';
import {FContent} from '../graphic/FContent';
import {FTechniqueMode} from './FTechniqueMode';
import {FTechniquePass} from './FTechniquePass';

//==========================================================
// <T>渲染技术。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FTechnique extends FContent {
   // @attribute
   public code = null;
   public activeMode = null;
   public modes: Objects<FTechniqueMode> = null;
   public passes: Objects<FTechniquePass> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.modes = new Objects<FTechniqueMode>();
      this.passes = new Objects<FTechniquePass>();
   }

   //==========================================================
   // <T>注册技术模式。</T>
   //
   // @method
   // @param code 代码
   // @return 技术模式
   //==========================================================
   public registerMode(code: string): FTechniqueMode {
      var mode: FTechniqueMode = RClass.create(FTechniqueMode);
      mode.code = code;
      this.modes.push(mode);
      this.activeMode = mode;
      return mode;
   }

   //==========================================================
   // <T>选择技术模式。</T>
   //
   // @param code 代码
   // @return 技术模式
   //==========================================================
   public selectMode(p) {
   }

   //==========================================================
   // <T>增加过程模式。</T>
   //
   // @param code 代码
   // @return 技术模式
   //==========================================================
   public pushPass(pass: FTechniquePass): void {
      RAssert.debugNotNull(pass);
      pass.technique = this;
      this.passes.push(pass);
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param color:SColor4 颜色
   //==========================================================
   public clear(color): void {
      var context = this._graphicContext;
      // 设置渲染目标
      context.setRenderTarget(null);
      // 清除颜色
      context.clear(color.red, color.green, color.blue, color.alpha, 1);
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param depth 深度
   //==========================================================
   public clearDepth(depth: number = 1): void {
      var context = this._graphicContext;
      context.clearDepth(depth);
   }

   //==========================================================
   // <T>排序渲染对象处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   public sortRenderables(a, b) {
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region 区域
   //==========================================================
   public drawRegion(region: FRegion) {
      // 设置区域属性
      region.technique = this;
      // 绘制所有过程
      var passes = this.passes;
      var count = passes.count();
      for (var i = 0; i < count; i++) {
         var pass = passes.at(i);
         region.setTechniquePass(pass, (i == count - 1));
         pass.drawRegion(region);
      }
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawStage(stage: FScene, region: FRegion) {
      var layers = stage.layers;
      var layerCount = layers.count();
      // 设置区域属性
      region.technique = this;
      // 绘制所有过程
      var passes = this.passes;
      var count = passes.count();
      for (var passIndex = 0; passIndex < count; passIndex++) {
         // 选择过程
         var pass = passes.at(passIndex);
         pass.drawBegin(region);
         // 绘制舞台层
         for (var layerIndex = 0; layerIndex < layerCount; layerIndex++) {
            var layer = layers.at(layerIndex);
            // 选用技术
            //var layerTechnique = layer.technique();
            //if (!layerTechnique) {
            //   layerTechnique = this;
            //}
            var layerTechnique: FTechnique = this;
            // 渲染单个层
            region.reset();
            region.renderables.assign(layer.visibleRenderables);
            if (layer.optionClearDepth) {
               layerTechnique.clearDepth();
            }
            // 绘制过程区域
            region.setTechniquePass(pass, (passIndex == count - 1));
            pass.drawRegion(region);
         }
         pass.drawEnd(region);
      }
      // 绘制处理
      this.present(region);
   }

   //==========================================================
   // <T>绘制完成处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   public present(p) {
      this.graphicContext.present();
   }
}
