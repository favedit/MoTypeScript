import {RClass} from '../../../../runtime/common/reflect/RClass';
// import {FG3dTechnique} from '../FG3dTechnique';
// import {FG3dSelectPass} from './FG3dSelectPass';

//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
//export class FG3dSelectTechnique extends FG3dTechnique {
   export class FG3dSelectTechnique {
   // @attribute
   protected _code: string = 'select';
   // @attribute
   //_passSelect = MO.Class.register(o, new MO.AGetter('_passSelect'));
   protected _passSelect = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      var o = this;
      //o.__base.FG3dTechnique.setup.call(o);
      //..........................................................
      // 创建支持模式
      //o.registerMode(sk.graphic.context3d.EG3dTechniqueMode.Result);
      //..........................................................
      // 创建选取处理过程
      // var pass = o._passSelect = RClass.create(FG3dSelectPass);
      // pass.linkGraphicContext(o);
      // pass.setup();
      // o.pushPass(pass);
   }

   //==========================================================
   // <T>测试信息。</T>
   //
   // @method
   // @param region:FG3dRegion 渲染区域
   //==========================================================
   public test(region, x, y) {
      var o = this;
      // 设置区域属性
      region._selectX = x;
      region._selectY = y;
      // 绘制所有过程
      //o.drawRegion(region);
      // 返回选中内容
      return o._passSelect._selectRenderable;
   }
}