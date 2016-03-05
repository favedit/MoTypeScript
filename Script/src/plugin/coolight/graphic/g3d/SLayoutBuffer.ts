//==========================================================
// <T>渲染布局取样器。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
export class SLayoutBuffer {
   // @attribute
   public slot = null;
   public buffer = null;
   public index = null;
   public formatCd = null;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.slot = null;
      this.buffer = null;
      this.index = null;
      this.formatCd = null;
   }
}