import {FObjects} from '../../../../runtime/common/lang/FObjects';
import {RClass} from '../../../../runtime/common/reflect/RClass';
import {RAssert} from '../../../../runtime/common/RAssert';
import {FG3dObject} from './FG3dObject';
import {FG3dTechniqueMode} from './FG3dTechniqueMode';

//==========================================================
// <T>渲染技术。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dTechnique extends FG3dObject {
   // @attribute
   //_code = MO.Class.register(o, new MO.AGetter('_code'));
   protected _code = null;
   //_activeMode = MO.Class.register(o, new MO.AGetter('_activeMode'));
   protected _activeMode = null;
   //_modes = MO.Class.register(o, new MO.AGetter('_modes'));
   protected _modes: FObjects = new FObjects();
   //_passes = MO.Class.register(o, new MO.AGetter('_passes'));
   protected _passes: FObjects = new FObjects();

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>注册技术模式。</T>
   //
   // @method
   // @param p:code:String 代码
   // @return FG3dTechniqueMode 技术模式
   //==========================================================
   public registerMode(p) {
      var o = this;
      var m = RClass.create(FG3dTechniqueMode);
      m.setCode(p);
      o._modes.push(m);
      o._activeMode = m;
      return m;
   }

   //==========================================================
   // <T>选择技术模式。</T>
   //
   // @method
   // @param p:code:String 代码
   // @return FG3dTechniqueMode 技术模式
   //==========================================================
   public selectMode(p) {
      var o = this;
   }

   //==========================================================
   // <T>增加过程模式。</T>
   //
   // @method
   // @param p:code:String 代码
   // @return FG3dTechniqueMode 技术模式
   //==========================================================
   public pushPass(pass) {
      var o = this;
      RAssert.debugNotNull(pass);
      pass.setTechnique(o);
      o._passes.push(pass);
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param color:SColor4 颜色
   //==========================================================
   public clear(color) {
      var o = this;
      var context = o._graphicContext;
      // 设置渲染目标
      context.setRenderTarget(null);
      // 清除颜色
      context.clear(color.red, color.green, color.blue, color.alpha, 1);
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param depth:Number 深度
   //==========================================================
   public clearDepth(depth) {
      var o = this;
      if (depth == null) {
         depth = 1;
      }
      var context = o._graphicContext;
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
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawRegion(region) {
      var o = this;
      // 设置区域属性
      region.setTechnique(o);
      // 绘制所有过程
      var passes = o._passes;
      var count = passes.count();
      for (var i = 0; i < count; i++) {
         var pass = passes.at(i);
         region.setTechniquePass(pass, (i == count - 1));
         pass.drawRegion(region);
      }
   }

   //==========================================================
   // <T>绘制完成处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   public present(p) {
      this._graphicContext.present();
   }
}
