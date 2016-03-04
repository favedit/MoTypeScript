export class Bound extends goog.math.Rect {
	constructor(left: number, top: number, width: number, height: number) {
		super(left, top, width, height);
	}

	isValid() {
		return isFinite(this.top) && (isFinite(this.left) && (0 <= this.width && 0 <= this.height));
	}

	expandMargin = function(opt_attributes, off) {
		var b = new Bound(this.left, this.top, this.width, this.height);
		b.left -= opt_attributes;
		b.top -= off;
		b.width += 2 * opt_attributes;
		b.height += 2 * off;
		return b;
	};

	reset() {
		/** @type {number} */
		this.top = this.left = Infinity;
		/** @type {number} */
		this.width = this.height = 0;
	};

	center() {
		return {
			x: this.left + 0.5 * this.width,
			y: this.top + 0.5 * this.height
		};
	};

	appendPoint(rect) {
		if(!isFinite(this.left) || isNaN(this.left)) {
			this.left = rect.x;
			this.top = rect.y;
		} else {
			if(rect.x < this.left) {
				this.width += this.left - rect.x;
				this.left = rect.x;
			} else {
				/** @type {number} */
				this.width = Math.max(this.width, rect.x - this.left);
			}
			if(rect.y < this.top) {
				this.height += this.top - rect.y;
				this.top = rect.y;
			} else {
				/** @type {number} */
				this.height = Math.max(this.height, rect.y - this.top);
			}
		}
	}

	appendBound(src) {
		this.appendPoint({
			x: src.left,
			y: src.top
		});
		this.appendPoint({
			x: src.left + src.width,
			y: src.top
		});
		this.appendPoint({
			x: src.left,
			y: src.top + src.height
		});
		this.appendPoint({
			x: src.left + src.width,
			y: src.top + src.height
		});
	}



}
