export class Signal {

   protected EVENT_TYPE = "signal";

   protected defaultTarget = null;

   //protected eventTarget = new goog.events.EventTarget
   protected eventTarget = null;

   public constructor(target) {
      this.defaultTarget = target;
      this.eventTarget = new goog.events.EventTarget
   }

   // public listen(a, b, c) {
   //    "object" === typeof b ? (c = b, b = !1) : b = b || !1;
   //    return goog.events.listen(this.eventTarget, this.EVENT_TYPE, a, b, c)
   // }
   //
   // public unlisten(a, b, c) {
   //    "object" === typeof b ? (c = b, b = !1) : b = b || !1;
   //    return goog.events.unlisten(this.eventTarget, this.EVENT_TYPE, a, b, c)
   // }
   //
   // public unlistenByKey(a) {
   //    return goog.events.unlistenByKey(a)
   // }
   //
   // public Hook(a) {
   //    this._defaultListernerScope = a;
   //    this._evtKeys = []
   // }
   //
   // protected listen(a, b, c) {
   //    c = c || this._defaultListernerScope;
   //    a = a.listen(b, c);
   //    this._evtKeys.push(a)
   // }
   //
   // public unlistenAll() {
   //    this._evtKeys.forEach(function(a) {
   //       goog.events.unlistenByKey(a)
   //    });
   //    this._evtKeys.length = 0
   // }
   //
   // public dispatch(a, b) {
   //    b = b || this.defaultTarget || this;
   //    var c = new goog.events.Event(this.EVENT_TYPE, b);
   //    c.data = a;
   //    return this.eventTarget.dispatchEvent(c)
   // }
}
