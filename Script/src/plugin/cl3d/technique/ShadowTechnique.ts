import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil'
import {FRegion} from '../base/FRegion';
import {TechniqueModeEnum} from './TechniqueModeEnum'
import {Technique} from './Technique';
import {ShadowDepthPass} from './ShadowDepthPass';
import {ShadowColorPass} from './ShadowColorPass';

//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class ShadowTechnique extends Technique {
   // 深度渲染过程
   public passDepth: ShadowDepthPass;
   // 颜色渲染过程
   public passColor: ShadowColorPass;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'shadow';
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      //..........................................................
      // 创建支持模式
      this.registerMode(TechniqueModeEnum.Ambient);
      this.registerMode(TechniqueModeEnum.DiffuseLevel);
      this.registerMode(TechniqueModeEnum.DiffuseColor);
      this.registerMode(TechniqueModeEnum.SpecularLevel);
      this.registerMode(TechniqueModeEnum.SpecularColor);
      this.registerMode(TechniqueModeEnum.Result);
      //..........................................................
      // 创建光深处理过程
      var passDepth: ShadowDepthPass = this.passDepth = ClassUtil.create(ShadowDepthPass);
      passDepth.linkGraphicContext(this);
      passDepth.setup();
      this.pushPass(passDepth);
      // 创建颜色处理过程
      var passColor: ShadowColorPass = this.passColor = ClassUtil.create(ShadowColorPass);
      passColor.linkGraphicContext(this);
      passColor.setup();
      this.pushPass(passColor);
      // 设置深度纹理
      passColor.textureDepth = passDepth.textureDepth;
   }

   //==========================================================
   // <T>更新区域处理。</T>
   //
   // @param region 区域
   //==========================================================
   // public updateRegion(region: FRegion) {
   //    super.updateRegion(region);
   //    var g = this._graphicContext;
   //    var gs = g.size();
   //    // 更新相机
   //    var c = region.camera();
   //    //c.projection().size().assign(gs);
   //    // 更新光照
   //    var l = region.directionalLight();
   //    var lc = l.camera();
   //    //lc.projection().size().assign(gs);
   //    //lc.updateFlatCamera(c);
   // }
}