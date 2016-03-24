import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil'
import {Technique} from './Technique';
import {FRegion} from '../base/FRegion';
import {TechniqueModeEnum} from './TechniqueModeEnum'
import {ControlPass} from './ControlPass'

//==========================================================
// <T>控件渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class ControlTechnique extends Technique {
   // 渲染过程
   protected _passControl:ControlPass;

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.code = "control";
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
      this.registerMode(TechniqueModeEnum.Result);
      //..........................................................
      // 创建选取处理过程
      var pass = this._passControl = ClassUtil.create(ControlPass);
      pass.linkGraphicContext(this);
      pass.setup();
      this.pushPass(pass);
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param p:region:FG3dRegion 区域
   //==========================================================
   public drawRegion(region) {
      if (region.renderables().isEmpty()) {
         return;
      }
      // 清空深度
      this._graphicContext.clearDepth(1);
      // 绘制区域
      super.drawRegion.call(this, region);
   }
}