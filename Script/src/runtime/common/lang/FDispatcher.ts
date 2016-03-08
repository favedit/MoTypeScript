//==========================================================
// <T>调度器。</T>
//==========================================================
export class FDispatcher {
   public static MAX_ANCESTORS_ = null;
   public static parentEventTarget_ = null;
   public static actualEventTarget_ = null;
   public static eventTargetListeners_ = null;

   public constructor() {
   }

   public getParentEventTarget() {
      //return this.parentEventTarget_;
      return null;
   }

   public setParentEventTarget(a) {
      //return this.parentEventTarget_ = a;
      return null;
   }

   //==========================================================
   // <T>增加一个监听器。</T>
   //==========================================================
   public addEventListener(a, b, c, d) {
   }

   public removeEventListener = function(a, b, c, d) {
   }

   //==========================================================
   // <T>分发一个监听器。</T>
   //==========================================================
   public dispatchEvent(event: any) {
   }

   public listenEvent(obj, eventType, callback) {
   }
}