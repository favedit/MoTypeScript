import {EventTarget} from '../../core/EventTarget';
import {Display} from '../base/Display';
export const LayerEventEnum = {
    childAdded: "childadded",
    childRemoved: "childremoved"
};

declare var goog;
declare var hsw;

export class Layer extends EventTarget {
	logger;

	_threeObjectContainer;

	_children;
	id;

	contains(obj) {

	}
	add(obj: Display) {
		this.contains(obj) ? this.logger.info("trying to add an existing object to this layer. skipped.") : (this._children.push(obj),
			this._threeObjectContainer.add((obj as any).node),
			this.dispatchEvent(new goog.events.Event(hsw.view.webgl3d.LayerEventEnum.childAdded, {
				Layer: this,
				ViewObject: obj
			})),
			this.logger.fine("layer[" + this.id + "] count = " + this._children.length))
	}
}
