//==========================================================
// <T>自循环节点。</T>
//
// @tool
// @author maocy
// @version 150110
//==========================================================
export class SLooperEntry {
   // @attribute
   prior = null;
   next = null;
   // @attribute
   value = null;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      o.prior = null;
      o.next = null;
      o.value = null;
   }
}
