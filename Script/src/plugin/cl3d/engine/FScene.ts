import {FObjects} from '../../../runtime/common/lang/FObjects';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {FScene as FBaseScene} from '../base/FScene';
import {FDisplay} from '../base/FDisplay';
import {FSceneStatistics} from './FSceneStatistics';

//==========================================================
// <T>三维舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FScene extends FBaseScene {
   //    // @attribute
   public _statistics: FSceneStatistics = null;
   //    // @attribute
   //    o._technique              = MO.Class.register(o, new MO.AGetter('_technique'));
   //    o._region                 = MO.Class.register(o, new MO.AGetter('_region'));
   protected _allDisplays: FObjects<FDisplay> = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      /// 创建统计
      this._statistics = RClass.create(FSceneStatistics);
      //   MO.Console.find(MO.FStatisticsConsole).register('engine.stage', this._statistics);
      //   // 创建显示集合
      this._allDisplays = new FObjects<FDisplay>();
      //   // 创建区域
      //   var region = this._region = this.createRegion();
      //   region._timer = this._timer;
   }

   // //==========================================================
   // // <T>创建区域。</T>
   // //
   // // @method
   // // @return FE3dRegion 区域
   // //==========================================================
   // public createRegion() {
   //     return MO.Class.create(MO.FE3dRegion);
   // }

   // //==========================================================
   // // <T>关联图形环境。</T>
   // //
   // // @method
   // // @param context:FGraphicContext 图形环境
   // //==========================================================
   // public linkGraphicContext(context) {
   //     var o = this;
   //     o.__base.MGraphicObject.linkGraphicContext.call(o, context);
   //     // 创建背景色
   //     var region = o._region;
   //     if (region) {
   //         region.linkGraphicContext(context);
   //     }
   // }

   // //==========================================================
   // // <T>配置处理。</T>
   // //
   // // @method
   // //==========================================================
   // public setup() {
   //     var o = this;
   //     o.__base.FStage.construct.call(o);
   //     // 创建背景色
   //     o._region.linkGraphicContext(o);
   //     o._region.setup();
   // }

   // //==========================================================
   // // <T>获得相机。</T>
   // //
   // // @method
   // // @return FG3dCamera 相机
   // //==========================================================
   // public camera() {
   //     return this._region.camera();
   // }

   // //==========================================================
   // // <T>获得投影。</T>
   // //
   // // @method
   // // @return FG3dProjection 投影
   // //==========================================================
   // public projection() {
   //     return this._region.camera().projection();
   // }

   // //==========================================================
   // // <T>获得方向光。</T>
   // //
   // // @method
   // // @return FG3dDirectionalLight 方向光
   // //==========================================================
   // public directionalLight() {
   //     return this._region.directionalLight();
   // }

   // //==========================================================
   // // <T>计算屏幕位置。</T>
   // //
   // // @method
   // // @return FG3dDirectionalLight 方向光
   // //==========================================================
   // public calculateScreenPosition(outputPosition, inputPosition, modelMatrix) {
   //     var o = this;
   //     var graphicContext = o._graphicContext;
   //     var size = graphicContext.size();
   //     var camera = o.camera();
   //     var matrix = MO.Lang.Math.matrix;
   //     matrix.identity();
   //     matrix.append(modelMatrix);
   //     matrix.append(camera.matrix());
   //     matrix.append(camera.projection().matrix());
   //     var point3 = matrix.transformPoint3(inputPosition);
   //     var cz = 1 / point3.z;
   //     outputPosition.x = size.width * (point3.x * cz + 1) * 0.5;
   //     outputPosition.y = size.height * (1 - point3.y * cz) * 0.5;
   //     return outputPosition;
   // }

   // //==========================================================
   // // <T>选择渲染技术。</T>
   // //
   // // @method
   // // @param context:FG3dContext 环境
   // // @param clazz:Function 类对象
   // //==========================================================
   // public selectTechnique(context, clazz) {
   //     var o = this;
   //     var techniqueConsole = MO.Console.find(MO.FG3dTechniqueConsole);
   //     var technique = o._technique = techniqueConsole.find(context, clazz);
   //     return technique;
   // }

   //==========================================================
   // <T>过滤显示集合。</T>
   //
   // @method
   // @param displays:TObjects 显示集合
   //==========================================================
   public filterDisplays(displays) {
      // 过滤显示层集合
      var layers = this.layers;
      var count: number = layers.count();
      for (var n: number = 0; n < count; n++) {
         var layer = layers.at(n);
         layer.filterDisplays(displays);
      }
   }

   //==========================================================
   // <T>获得所有显示集合。</T>
   //
   // @method
   // @return TObjects 显示集合
   //==========================================================
   public allDisplays() {
      var displays = this._allDisplays;
      displays.clear();
      this.filterDisplays(displays);
      return displays;
   }
}