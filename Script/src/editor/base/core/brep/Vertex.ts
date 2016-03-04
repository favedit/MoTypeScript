import {Constants} from '../Constants';
import {Entity} from './Entity';
import {EntityEventEnum} from './EntityEventEnum';

/**
 * @param {?} v2
 * @param {?} v1
 * @return {undefined}
 */
export class Vertex extends Entity {
	private __x = 0;
	private __y = 0;
	public x: any = 0;
	public y: any = 0;
	public Class: string = "hsw.core.brep.Vertex";

	public constructor(x: any = null, y: any = null) {
		super();
		this.defineField("x");
		this.defineField("y");
		/** @type {number} */
		this.__x = Number(x);
		/** @type {number} */
		this.__y = Number(y);
	}

	/** @type {string} *//**
	 * @param {string} item
	 * @param {string} graphics
	 * @param {?} opt_attributes
	 * @return {undefined}
	 */
	public onFieldChanged(item, graphics, opt_attributes) {
		this._invalidateSubgraph();
		this.dispatchEvent(new goog.events.Event(EntityEventEnum.fieldChanged, {
			fieldName: item,
			oldValue: graphics,
			newValue: opt_attributes
		}));
	}

	/**
	 * @return {undefined}
	 */
	public onEntityDirty() {
		super.onEntityDirty.call(this);
		/** @type {boolean} */
		this._boundDirty = true;
	}

	/**
	 * @param {?} v
	 * @return {?}
	 */
	public equals(v) {
		if(super.equals.call(this, v)) {
			return true;
		}
		if(!(v instanceof hsw.core.brep.Vertex)) {
			return false;
		}
		var tolerance = Constants.TOLERANCE;
		return Math.abs(this.x - v.x) < tolerance && Math.abs(this.y - v.y) < tolerance;
	}

	/**
	 * @return {undefined}
	 */
	public refreshBoundInternal() {
		var child = this.boundInternal;
		child.left = this.x;
		child.top = this.y;
		/** @type {number} */
		child.width = child.height = 0;
	}

	/**
	 * @param {string} options
	 * @param {Object} head
	 * @return {undefined}
	 */
	public load(options, head) {
		super.load.call(this, options, head);
		this.x = options.x;
		this.y = options.y;
	}

	/**
	 * @return {?}
	 */
	public dump() {
		var pat:any = super.dump();
		pat.x = this.x;
		pat.y = this.y;
		return [pat];
	}
}
