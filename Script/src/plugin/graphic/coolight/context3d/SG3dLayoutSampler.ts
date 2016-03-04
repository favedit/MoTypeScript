//==========================================================
// <T>渲染布局取样器。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
export class SG3dLayoutSampler {
   // @attribute
   slot = null;
   index = -1;
   texture = null;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      o.slot = null;
      o.index = -1;
      o.texture = null;
   }
}