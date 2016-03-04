//==========================================================
// <T>渲染布局取样器。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
export class SG3dLayoutBuffer {
   // @attribute
   slot = null;
   buffer = null;
   index = null;
   formatCd = null;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   dispose() {
      var o = this;
      o.slot = null;
      o.buffer = null;
      o.index = null;
      o.formatCd = null;
   }
}