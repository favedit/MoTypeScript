import {SMatrix3d} from './SMatrix3d';

//==========================================================
// <T>数学函数管理类</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
export class RConst {
   // @attribute
   public static matrix = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public static staticConstructor() {
      // 初始化属性
      this.matrix = new SMatrix3d();
   }
}
