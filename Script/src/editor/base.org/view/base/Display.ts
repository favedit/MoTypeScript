import {Layer} from "../webgl3d/Layer";
import {DisplayController} from "./DisplayController";
import {EventTarget} from '../../core/EventTarget';
import {Entity} from '../../core/brep/Entity';
export class Display extends EventTarget {
    _evtKeys: any;
    _signalHook: any;
    dirty: boolean;
    view: any;
    controller: DisplayController;
    geometry: any;
    layer: any;
    context: any;

	constructor(context, layer: any | Layer, entity: Entity, ctrl: DisplayController) {
		super();
		this.context = context;
		this.layer = layer;
		this.geometry = void 0;
		this.controller = ctrl;
		this.view = this.context.hscanvas;
		this.dirty = !1;
		this._signalHook;
		this._evtKeys = [];
		this.dirty = !0
	}
}
