export class EventTarget {
	static MAX_ANCESTORS_ = 1E3;
    parentEventTarget_: any;
    actualEventTarget_: this;
    eventTargetListeners_: any;
	constructor() {

	}

	getParentEventTarget() {
		return this.parentEventTarget_
	}

	setParentEventTarget(a) {
		this.parentEventTarget_ = a
	}

	addEventListener(a, b, c, d) {
	}

	removeEventListener = function(a, b, c, d) {
	}

	dispatchEvent(event: any) {

	}

	listenEvent(obj, eventType, callback) {

	}
}
