import {FObjects} from '../../../runtime/common/lang/FObjects';
import {FDictionary} from '../../../runtime/common/lang/FDictionary';
import {FListeners} from '../../../runtime/common/lang/FListeners';
import {RObject} from '../../../runtime/common/lang/RObject';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {SColor4} from '../../../runtime/common/math/SColor4';
import {RAssert} from '../../../runtime/common/RAssert';
import {IScene} from '../../../runtime/graphic/IScene';
import {FGraphicObject} from '../../../runtime/graphic/context/FGraphicObject';
import {FDisplay} from './FDisplay';
import {FDisplayLayer} from './FDisplayLayer';
import {FRegion} from './FRegion';
import {FSceneStatistics} from './FSceneStatistics';

//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
export class FScene extends FGraphicObject implements IScene {
   // 激活状态
   public statusActive: boolean;
   // 背景颜色
   public backgroundColor: SColor4;
   // 显示层集合
   public layers: FDictionary<FDisplayLayer>;
   // 统计器
   protected _statistics: FSceneStatistics;
   // 全部显示集合
   protected _allDisplays: FObjects<FDisplay>;
   // 进入帧监听器集合
   public enterFrameListeners: FListeners;
   // 离开帧监听器集合
   public leaveFrameListeners: FListeners;

   //    // @attribute
   //    o._technique              = MO.Class.register(o, new MO.AGetter('_technique'));
   //    o._region                 = MO.Class.register(o, new MO.AGetter('_region'));
   //    o._code                = 'stage';
   //    o._size                = MO.Class.register(o, new MO.AGetter('_size'));
   //    o._timer               = MO.Class.register(o, new MO.AGetter('_timer'));

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      //this._size = new SSize2(1920, 1080);
      //this._timer = RClass.create(MO.FTimer);
      this.statusActive = false;
      this.backgroundColor = new SColor4(0.5, 0.5, 0.5, 1.0);
      this.layers = new FDictionary<FDisplayLayer>();
      this._statistics = RClass.create(FSceneStatistics);
      this._allDisplays = new FObjects<FDisplay>();
      // 设置变量
      this.enterFrameListeners = new FListeners(this);
      this.leaveFrameListeners = new FListeners(this);
      /// 创建统计
      //   MO.Console.find(MO.FStatisticsConsole).register('engine.stage', this._statistics);
      //   // 创建显示集合
      //   // 创建区域
      //   var region = this._region = this.createRegion();
      //   region._timer = this._timer;
   }

   //==========================================================
   // <T>注册一个显示层。</T>
   //
   // @param code 名称
   // @param layer 显示层
   //==========================================================
   public registerLayer(code: string, layer: FDisplayLayer): void {
      RAssert.debugNotEmpty(code);
      RAssert.debugNotNull(layer);
      // 存储层
      this.layers.set(code, layer);
   }

   //==========================================================
   // <T>注销一个显示层。</T>
   //
   // @param name 名称
   //==========================================================
   public unregisterLayer(code: string): void {
      RAssert.debugNotEmpty(code);
      // 清空层
      this.layers.set(code, null);
   }

   //==========================================================
   // <T>过滤显示集合。</T>
   //
   // @param displays 显示集合
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
   // @return 显示集合
   //==========================================================
   public allDisplays() {
      var displays = this._allDisplays;
      displays.clear();
      this.filterDisplays(displays);
      return displays;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      // 创建背景色
      //this._region.linkGraphicContext(this);
      //this._region.setup();
   }

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   public active(): void {
      // 设置状态
      this.statusActive = true;
      // 层集合处理
      var layers: FDictionary<FDisplayLayer> = this.layers;
      var count: number = layers.count();
      for (var n: number = 0; n < count; n++) {
         var layer: FDisplayLayer = layers.at(n);
         layer.active();
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public deactive(): void {
      // 层集合处理
      var layers: FDictionary<FDisplayLayer> = this.layers;
      var count: number = layers.count();
      for (var n: number = 0; n < count; n++) {
         var layer: FDisplayLayer = layers.at(n);
         layer.deactive();
      }
      // 设置状态
      this.statusActive = false;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public process(region: FRegion): boolean {
      // 设置计时器
      // var timer = this._timer;
      // if (!timer) {
      //    timer = RClass.create(FTimer);
      //    timer.setup();
      // }
      //..........................................................
      // 前处理
      //this.processEnterFrameListener(o);
      // 逻辑处理
      var layers = this.layers;
      var count = layers.count();
      for (var i = 0; i < count; i++) {
         var layer = layers.at(i);
         layer.process(region);
      }
      // 后处理
      //this.processLeaveFrameListener(o);
      //..........................................................
      // 计时器更新
      //timer.update();
      return true;
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
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.backgroundColor = RObject.dispose(this.backgroundColor);
      this.layers = RObject.dispose(this.layers);
      this.enterFrameListeners = RObject.dispose(this.enterFrameListeners);
      this.leaveFrameListeners = RObject.dispose(this.leaveFrameListeners);
      // 父处理
      super.dispose();
   }
}