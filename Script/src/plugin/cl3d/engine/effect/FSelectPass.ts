import {SPoint2} from '../../../../runtime/common/math/SPoint2';
import {RConsole} from '../../../../runtime/core/RConsole';
// import {FEffectConsole} from '../FEffectConsole';
// import {ESamplerFilter} from '../ESamplerFilter';
// import {FTechniquePass} from '../FTechniquePass';

//==========================================================
// <T>阴影深度渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dSelectPass{
//export class FG3dSelectPass extends FTechniquePass {
   // // @attribute
   // protected _code = 'select';
   // //protected _texture = MO.Class.register(o, new MO.AGetter('_texture'));
   // protected _texture = null;
   // protected _renderTarget = null;
   // protected _position: SPoint2 = new SPoint2();
   // protected _data = new Uint8Array(4);

   // //==========================================================
   // // <T>配置处理。</T>
   // //
   // // @method
   // //==========================================================
   // public setup() {
   //    var o = this;
   //    //o.__base.FG3dTechniquePass.setup.call(o);
   //    var c = o._graphicContext;
   //    // 创建平面
   //    var T = o._texture = c.createFlatTexture();
   //    T.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
   //    T.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   //    // 创建渲染目标
   //    var t = o._renderTarget = c.createRenderTarget();
   //    t.size().set(1, 1);
   //    t.textures().push(T);
   //    t.build();
   // }

   // //==========================================================
   // // <T>激活效果器。</T>
   // //
   // // @method
   // // @param region:FG3dRetion 区域
   // // @param renderables:TObjects 渲染集合
   // //==========================================================
   // public activeEffects(region, renderables) {
   //    var o = this;
   //    var spaceName = region.spaceName();
   //    // 关联渲染器
   //    var count = renderables.count();
   //    for (var i = 0; i < count; i++) {
   //       var renderable = renderables.at(i);
   //       if (renderable.optionSelect()) {
   //          var info = renderable.selectInfo(spaceName);
   //          if (!info.effect) {
   //             info.effect = RConsole.find(FG3dEffectConsole).find(o._graphicContext, region, renderable);
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>绘制区域处理。</T>
   // //
   // // @method
   // // @param region:FG3dRetion 区域
   // //==========================================================
   // public drawRegion(region) {
   //    var o = this;
   //    var context = o._graphicContext;
   //    var handle = context.handle();
   //    // 设置渲染目标
   //    context.setRenderTarget(o._renderTarget);
   //    context.clear(0, 0, 0, 0, 1, 1);
   //    //..........................................................
   //    // 绘制处理
   //    var renderables = region.allRenderables();
   //    // 激活效果器
   //    o.activeEffects(region, renderables);
   //    // 绘制非界面处理
   //    var renderableCount = renderables.count();
   //    for (var i = 0; i < renderableCount; i++) {
   //       var renderable = renderables.at(i);
   //       if (renderable.optionSelect()) {
   //          var effect = renderable.activeEffect();
   //          context.setProgram(effect.program());
   //          var display = renderable.display();
   //          if (!display) {
   //             effect.drawRenderable(region, renderable, i);
   //          } else if (!display._optionFace) {
   //             effect.drawRenderable(region, renderable, i);
   //          }
   //       }
   //    }
   //    // 绘制界面处理
   //    context.clearDepth(1);
   //    for (var i = 0; i < renderableCount; i++) {
   //       var renderable = renderables.at(i);
   //       if (renderable.optionSelect()) {
   //          var effect = renderable.activeEffect();
   //          context.setProgram(effect.program());
   //          var display = renderable.display();
   //          if (display && display._optionFace) {
   //             effect.drawRenderable(region, renderable, i);
   //          }
   //       }
   //    }
   //    //..........................................................
   //    // 读取输出
   //    handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, o._data);
   //    var index = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
   //    //o._selectRenderable = null;
   //    if (index != 0) {
   //       //o._selectRenderable = renderables.get(index - 1);
   //    }
   // }
}
