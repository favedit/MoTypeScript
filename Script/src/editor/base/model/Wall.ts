import {Point} from "./Point";
import {Edge} from '../core/brep/Edge';

export class Wall extends Edge {
	height3d: number;
	pattern: string;
	prev;

	edge;

	next;

	ID;

	from;

	to;

	width;

	contents;
	openings;

	wallType;
	isLoadBearing;
	constructor(from: Point, to: Point) {
		super(from, to);

		this.contents = {};
		this.openings = {};
		this.pattern = "DiagonalDown";

		this.isLoadBearing = !1
	}

}
