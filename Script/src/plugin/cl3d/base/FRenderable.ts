import {FObjects} from '../../../runtime/common/lang/FObjects';
import {IRenderable} from '../../../runtime/graphic/IRenderable';
import {FMaterial} from './material/FMaterial';
import {FDrawable} from './FDrawable';

//==========================================================
// <T>可绘制对象。</T>
//
// @class
// @author maocy
// @history 150312
//==========================================================
export class FRenderable extends FDrawable implements IRenderable{
   // 材质
   public material:FMaterial;
   // 材质参考
   public materialReference:FMaterial;
    //    // @attribute
    //    o._drawables      = null;
    //    //..........................................................
    //    // @method
    //    o.hasDrawable     = MO.FRenderable_hasDrawable;
    //    o.drawables       = MO.FRenderable_drawables;
    //    o.pushDrawable    = MO.FRenderable_pushDrawable;
    //    o.removeDrawable  = MO.FRenderable_removeDrawable;
    //    // @method
    //    o.filterDrawables = MO.FRenderable_filterDrawables;
    //    o.process         = MO.FRenderable_process;

    // //==========================================================
    // // <T>判断是否含有绘制对象。</T>
    // //
    // // @method
    // // @return Boolean 是否含有
    // //==========================================================
    // public hasDrawable() {
    //     var drawables = this._drawables;
    //     return drawables ? !drawables.isEmpty() : false;
    // }

    // //==========================================================
    // // <T>获得绘制集合。</T>
    // //
    // // @method
    // // @return TObjects 绘制集合
    // //==========================================================
    // public drawables() {
    //     var o = this;
    //     var drawables = o._drawables;
    //     if (!drawables) {
    //         drawables = o._drawables = new MO.TObjects();
    //     }
    //     return drawables;
    // }

    // //==========================================================
    // // <T>增加一个绘制对象。</T>
    // //
    // // @param drawable:FDrawable 绘制对象
    // //==========================================================
    // public pushDrawable(drawable) {
    //     var o = this;
    //     drawable._drawable = o;
    //     drawable._parent = o;
    //     o.drawables().push(drawable);
    // }

    // //==========================================================
    // // <T>移除一个绘制对象。</T>
    // //
    // // @param drawable:FDrawable 绘制对象
    // //==========================================================
    // public removeDrawable(drawable) {
    //     this._drawables.remove(drawable);
    // }

    // //==========================================================
    // // <T>过滤渲染集合。</T>
    // //
    // // @method
    // // @param region:FRegion 渲染区域
    // //==========================================================
    // public filterDrawables(region) {
    //     var o = this;
    //     // 检查可见性
    //     if (!o.testVisible()) {
    //         return false;
    //     }
    //     // 增加渲染对象
    //     region.pushRenderable(o);
    //     //..........................................................
    //     // 处理渲染集合
    //     var drawables = o._drawables;
    //     if (drawables) {
    //         var count = drawables.count();
    //         for (var i = 0; i < count; i++) {
    //             var drawable = drawables.getAt(i);
    //             if (drawable.testVisible()) {
    //                 region.pushRenderable(drawable);
    //             }
    //         }
    //     }
    //     return true;
    // }

    // //==========================================================
    // // <T>逻辑处理。</T>
    // //
    // // @method
    // // @param region:FG3dReigon 区域
    // //==========================================================
    // public process(region) {
    //     var o = this;
    //     o.__base.FDrawable.process.call(o, region);
    //     // 处理绘制集合
    //     var drawables = o._drawables;
    //     if (drawables) {
    //         var count = drawables.count();
    //         for (var i = 0; i < count; i++) {
    //             var drawable = drawables.getAt(i);
    //             drawable.process(region);
    //         }
    //     }
    // }
}

export type FRenderables = FObjects<FRenderable>;
