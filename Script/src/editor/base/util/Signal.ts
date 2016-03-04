export class Signal {
    eventTarget: goog.events.EventTarget;
    defaultTarget: any;

    EVENT_TYPE = "signal";

	constructor(actor) {
		this.defaultTarget = actor;
		this.eventTarget = new goog.events.EventTarget();
	}

	listen(src, recurring, callback) {
		if("object" === typeof recurring) {
			/** @type {boolean} */
			callback = recurring;
			/** @type {boolean} */
			recurring = false;
		} else {
			recurring = recurring || false;
		}
		return goog.events.listen(this.eventTarget, this.EVENT_TYPE, src, recurring, callback);
	}

	unlisten(listener, recurring, opt_scope) {
		if("object" === typeof recurring) {
			/** @type {boolean} */
			opt_scope = recurring;
			/** @type {boolean} */
			recurring = false;
		} else {
			recurring = recurring || false;
		}
		return goog.events.unlisten(this.eventTarget, this.EVENT_TYPE, listener, recurring, opt_scope);
	}

	unlistenByKey(keepData) {
		return goog.events.unlistenByKey(keepData);
	}

	dispatch(opt_attributes, recurring) {
		recurring = recurring || (this.defaultTarget || this);
		var e = new goog.events.Event(this.EVENT_TYPE, recurring);
		/** @type {string} */
		(e as any).data = opt_attributes;
		return this.eventTarget.dispatchEvent(e);
	}
}
