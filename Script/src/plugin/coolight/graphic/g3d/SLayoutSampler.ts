//==========================================================
// <T>渲染布局取样器。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
export class SLayoutSampler {
   // @attribute
   public slot = null;
   public index = -1;
   public texture = null;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.slot = null;
      this.index = -1;
      this.texture = null;
   }
}