import {FObject} from '../../../runtime/common/lang/FObject';
import {SMatrix3d} from '../../../runtime/common/math/SMatrix3d';
import {FRegion} from './FRegion';

//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 160305
//==========================================================
export class FDrawable extends FObject {
   // 父对象
   public parent: any = null;

   // 可见性
   public visible = true;

   public currentMatrix = null;
   public matrix = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.currentMatrix = new SMatrix3d();
      this.matrix = new SMatrix3d();
   }
   
   //==========================================================
   // <T>测试可见性。</T>
   //
   // @method
   // @return Boolean 可见性
   //==========================================================
   public testVisible(): boolean {
      return this.visible;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @param region 区域
   //==========================================================
   public process(region: FRegion) {
   }
}