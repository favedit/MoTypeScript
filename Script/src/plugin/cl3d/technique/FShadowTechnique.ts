import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil'
import {FRegion} from '../base/FRegion';
import {ETechniqueMode} from './ETechniqueMode'
import {FTechnique} from './FTechnique';
import {FShadowDepthPass} from './FShadowDepthPass';
import {FShadowColorPass} from './FShadowColorPass';

//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class FShadowTechnique extends FTechnique {
   // 深度渲染过程
   public passDepth: FShadowDepthPass;
   // 颜色渲染过程
   public passColor: FShadowColorPass;

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
      this.registerMode(ETechniqueMode.Ambient);
      this.registerMode(ETechniqueMode.DiffuseLevel);
      this.registerMode(ETechniqueMode.DiffuseColor);
      this.registerMode(ETechniqueMode.SpecularLevel);
      this.registerMode(ETechniqueMode.SpecularColor);
      this.registerMode(ETechniqueMode.Result);
      //..........................................................
      // 创建光深处理过程
      var passDepth: FShadowDepthPass = this.passDepth = ClassUtil.create(FShadowDepthPass);
      passDepth.linkGraphicContext(this);
      passDepth.setup();
      this.pushPass(passDepth);
      // 创建颜色处理过程
      var passColor: FShadowColorPass = this.passColor = ClassUtil.create(FShadowColorPass);
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