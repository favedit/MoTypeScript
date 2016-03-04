import {Vertex} from "./Vertex";
import {Entity} from './Entity';


export class Edge extends Entity {
	from: Vertex;
	to: Vertex;
	coedge: boolean;
	constructor(from, to) {
		super();
		this.from = from;
		this.to = to;
		this.coedge = false;
	}
}
