//==========================================================
// <T>可绘制对象。</T>
// <P>执行步骤：先所有对象逻辑处理用来计算，在绘制前，被使用对象进行更新。</P>
//
// @author maocy
// @history 160305
//==========================================================
export interface IDrawable {
   // 可见性
   visible: boolean;

   // 脏标志
   dirty: boolean;

   //==========================================================
   // <T>测试可见性。</T>
   //
   // @return Boolean 可见性
   //==========================================================
   testVisible(): boolean;

   //==========================================================
   // <T>测试脏状态。</T>
   //
   // @return Boolean 脏状态
   //==========================================================
   testDirty(): boolean;

   //==========================================================
   // <T>显示处理。</T>
   //==========================================================
   show(): void;

   //==========================================================
   // <T>隐藏处理。</T>
   //==========================================================
   hide(): void;

   // //==========================================================
   // // <T>脏处理。</T>
   // //
   // // @method
   // //==========================================================
   // public doDirty() {
   // }

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @param region 区域
   // //==========================================================
   // public process(region: FRegion) {
   // }

   // //==========================================================
   // // <T>更新处理。</T>
   // //
   // // @param region 区域
   // //==========================================================
   // public update(region: FRegion) {
   // }
}