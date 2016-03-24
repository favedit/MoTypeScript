import {ServiceUtil} from '../../runtime/core/ServiceUtil';
import {FGeneralColorAutomaticEffect} from './technique/effect/FGeneralColorAutomaticEffect';
import {FGeneralColorLineEffect} from './technique/effect/FGeneralColorLineEffect';
import {FSelectAutomaticEffect} from './technique/effect/FSelectAutomaticEffect';
import {FShadowDepthAutomaticEffect} from './technique/effect/FShadowDepthAutomaticEffect';
import {FShadowColorAutomaticEffect} from './technique/effect/FShadowColorAutomaticEffect';
import {FDeferredDataPhongAutomaticEffect} from './technique/effect/FDeferredDataPhongAutomaticEffect';
import {FDeferredMergePhongAutomaticEffect} from './technique/effect/FDeferredMergePhongAutomaticEffect';
import {FEffectConsole} from './graphic/FEffectConsole';

//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export class REngine {
   //    //..........................................................
   //    // @attribute
   //    o._setuped  = false;
   //    o._contexts = null;

   //==========================================================
   // <T>配置处理</T>
   //
   // @method
   //==========================================================
   //public onSetup() {
   public static staticConstructor() {
      var effectConsole = ServiceUtil.find(FEffectConsole);
      // 选择效果器
      effectConsole.register('select.select.line.automatic', FSelectAutomaticEffect);
      effectConsole.register('select.select.phong.automatic', FSelectAutomaticEffect);
      // 通用效果器
      effectConsole.register('general.color.line.automatic', FGeneralColorLineEffect);
      effectConsole.register('general.color.phong.automatic', FGeneralColorAutomaticEffect);
      // 阴影效果器
      effectConsole.register('shadow.depth.line.automatic', FShadowDepthAutomaticEffect);
      effectConsole.register('shadow.depth.phong.automatic', FShadowDepthAutomaticEffect);
      effectConsole.register('shadow.color.line.automatic', FShadowColorAutomaticEffect);
      effectConsole.register('shadow.color.phong.automatic', FShadowColorAutomaticEffect);
      // 延迟渲染效果器
      effectConsole.register('deferred.data.line.automatic', FDeferredDataPhongAutomaticEffect);
      effectConsole.register('deferred.data.phong.automatic', FDeferredDataPhongAutomaticEffect);
      effectConsole.register('deferred.merge.line.automatic', FDeferredMergePhongAutomaticEffect);
      effectConsole.register('deferred.merge.phong.automatic', FDeferredMergePhongAutomaticEffect);

      // 选取效果器
      // effectConsole.register('select.select.flat', MO.FG3dSelectAutomaticEffect);
      // effectConsole.register('select.select.control', MO.FG3dSelectAutomaticEffect);
      // effectConsole.register('select.select.automatic', MO.FG3dSelectAutomaticEffect);
      // effectConsole.register('select.select.skeleton', MO.FG3dSelectSkeletonEffect);
      // effectConsole.register('select.select.skeleton.4', MO.FG3dSelectSkeletonEffect);
      // 控件效果器
      // effectConsole.register('control.control.automatic', MO.FE3dControlAutomaticEffect);
      // effectConsole.register('control.control.control', MO.FE3dControlAutomaticEffect);
      // 通用效果器
      // effectConsole.register('general.color.control', MO.FE3dControlAutomaticEffect);
      // effectConsole.register('general.color.flat', MO.FE3dGeneralColorFlatEffect);
      // effectConsole.register('general.color.fill', MO.FE3dGeneralColorFillEffect);
      // effectConsole.register('general.color.automatic', FGeneralColorAutomaticEffect);
      // effectConsole.register('general.color.skin', MO.FE3dGeneralColorAutomaticEffect);
      // effectConsole.register('general.color.parallax', MO.FE3dGeneralColorAutomaticEffect);
      // effectConsole.register('general.color.video', MO.FE3dGeneralColorVideoEffect);
      // effectConsole.register('general.color.video.mask', MO.FE3dGeneralColorVideoMaskEffect);
      // effectConsole.register('general.color.skeleton', MO.FE3dGeneralColorSkeletonEffect);
      // effectConsole.register('general.color.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
      // effectConsole.register('general.color.fur.skeleton', MO.FE3dGeneralColorSkeletonEffect);
      // effectConsole.register('general.color.fur.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
      // 阴影效果器
      // effectConsole.register('shadow.depth.automatic', MO.FE3dShadowDepthAutomaticEffect);
      // effectConsole.register('shadow.depth.skeleton', MO.FE3dShadowDepthSkeletonEffect);
      // effectConsole.register('shadow.color.automatic', MO.FE3dShadowColorAutomaticEffect);
      // effectConsole.register('shadow.color.skeleton', MO.FE3dShadowColorSkeletonEffect);
   }

   // //==========================================================
   // // <T>卸载处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件
   // //==========================================================
   // public onUnload(event) {
   //     this.dispose();
   // }

   // //==========================================================
   // // <T>配置处理。</T>
   // //
   // // @method
   // //==========================================================
   // public setup() {
   //     var o = this;
   //     if (!o._setuped) {
   //         // 设置处理
   //         o.onSetup();
   //         // 设置属性
   //         o._contexts = new MO.TObjects();
   //         // 注册事件
   //         MO.Window.lsnsUnload.register(o, o.onUnload);
   //         o._setuped = true;
   //     }
   // }

   // //==========================================================
   // // <T>获得环境集合。</T>
   // //
   // // @method
   // // @return TObjects 环境集合
   // //==========================================================
   // public contextsor() {
   //     return this._contexts;
   // }

   // //==========================================================
   // // <T>创建渲染环境。</T>
   // //
   // // @method
   // // @param clazz:Function 类对象
   // // @param hCanvas:HtmlCanvasTag 页面画板
   // // @param attributes:Object 参数集合
   // // @return FGraphicContext 绘制环境
   // //==========================================================
   // public createContext(clazz, hCanvas, attributes) {
   //     var o = this;
   //     // 配置检查处理
   //     o.setup();
   //     // 创建类对象
   //     var context = MO.Class.create(clazz);
   //     if (attributes) {
   //         context._optionAlpha = attributes.alpha;
   //         context._optionAntialias = attributes.antialias;
   //     }
   //     // 关联元素
   //     if (!context.linkCanvas(hCanvas)) {
   //         return null;
   //     }
   //     // 保存环境
   //     o._contexts.push(context);
   //     return context;
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // public dispose() {
   //     var o = this;
   //     var contexts = o._contexts;
   //     if (contexts) {
   //         var count = contexts.count();
   //         for (var i = 0; i < count; i++) {
   //             var context = contexts.at(i);
   //             context.dispose();
   //         }
   //         o._contexts = MO.Lang.Object.dispose(contexts);
   //     }
   // }
}