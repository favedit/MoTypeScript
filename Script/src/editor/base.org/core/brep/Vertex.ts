import {Entity} from './Entity';
import {EntityEventEnum} from './EntityEventEnum';

/**
 * @param {?} v2
 * @param {?} v1
 * @return {undefined}
 */
export class Vertex extends Entity {
   __x = 0;
	__y = 0;

	public constructor(v2:any = null, v1 : any = null) {
		super();
		//this.defineField("x");
		//this.defineField("y");
		/** @type {number} */
		this.__x = Number(v2);
		/** @type {number} */
		this.__y = Number(v1);
	};
	//goog.inherits(hsw.core.brep.Vertex, hsw.core.brep.Entity);
	Class = "hsw.core.brep.Vertex";
	/** @type {string} *//**
	 * @param {string} item
	 * @param {string} graphics
	 * @param {?} opt_attributes
	 * @return {undefined}
	 */
	// public onFieldChanged(item, graphics, opt_attributes) {
	// 	this._invalidateSubgraph();
	// 	this.dispatchEvent(new goog.events.Event(EntityEventEnum.fieldChanged, {
	// 		fieldName: item,
	// 		oldValue: graphics,
	// 		newValue: opt_attributes
	// 	}));
	// };

	/**
	 * @return {undefined}
	 */
	// public onEntityDirty() {
	// 	super.onEntityDirty();
	// 	/** @type {boolean} */
	// 	this._boundDirty = true;
	// };
   //
	// /**
	//  * @param {?} v
	//  * @return {?}
	//  */
	// public equals(v) {
	// 	if(hsw.core.brep.Vertex.superClass_.equals.call(this, v)) {
	// 		return true;
	// 	}
	// 	if(!(v instanceof hsw.core.brep.Vertex)) {
	// 		return false;
	// 	}
	// 	var tolerance = hsw.core.Constants.TOLERANCE;
	// 	return Math.abs(this.x - v.x) < tolerance && Math.abs(this.y - v.y) < tolerance;
	// };
   //
	// /**
	//  * @return {undefined}
	//  */
	// public refreshBoundInternal() {
	// 	var child = this.boundInternal;
	// 	child.left = this.x;
	// 	child.top = this.y;
	// 	/** @type {number} */
	// 	child.width = child.height = 0;
	// };
   //
	// /**
	//  * @return {?}
	//  */
	// public dump() {
	// 	var pat = hsw.core.brep.Vertex.superClass_.dump.call(this);
	// 	pat.x = this.x;
	// 	pat.y = this.y;
	// 	return [pat];
	// };
   //
	// /**
	//  * @param {string} options
	//  * @param {Object} head
	//  * @return {undefined}
	//  */
	// public load(options, head) {
	// 	hsw.core.brep.Vertex.superClass_.load.call(this, options, head);
	// 	this.x = options.x;
	// 	this.y = options.y;
	// };
}
