
import {ViewEventTypeEnum} from '../app/ViewEventTypeEnum'
import {EntityEventEnum} from '../core/brep/EntityEventEnum'
import {CommandMessageEnum} from './CommandMessageEnum'
import {CommandStateEnum} from './CommandStateEnum'

/**
 * @return {undefined}
 */
export class Command {

   public saved = null;
   public mgr = null;
   public state = null;
   public showGizmo = null;

   public constructor() {
      this.saved = {};
		this.mgr = void 0;
		this.state = CommandStateEnum.created;
		this.showGizmo = true;
   }

	/**
	 * @param {Object} o
	 * @param {boolean} event
	 * @param {boolean} onComplete
	 * @param {Object} errorFn
	 * @param {Document} shallow
	 * @param {?} time
	 * @return {?}
	 */
	public execute(o, event, onComplete, errorFn, shallow, time) {
		return this.onExecute(o, event, onComplete, errorFn, shallow, time);
	}

	/**
	 * @param {Object} event
	 * @return {?}
	 */
	public complete(event) {
		this.onCleanup(event);
		if(this.canUndoRedo()) {
			return this;
		}
	}

	/**
	 * @param {Object} event
	 * @return {undefined}
	 */
	public cancel(event) {
		this.onCleanup(event);
		if(this.canUndoRedo()) {
			this.onUndo();
		}
	}

	/**
	 * @return {undefined}
	 */
	public suspend() {
		this.onSuspend();
	}

	/**
	 * @return {undefined}
	 */
	public resume() {
		this.onResume();
	}

	/**
	 * @param {string} name
	 * @param {Object} opt_attributes
	 * @param {?} userid
	 * @return {?}
	 */
	public receive(name, opt_attributes, userid) {
		//assert(!userid, "command.receive allows only 2 parameters - function receive(msg, param)");
		return this.onReceive(name, opt_attributes, userid);
	}

	/**
	 * @return {?}
	 */
	public canUndoRedo() {
		return true;
	}

	/**
	 * @return {?}
	 */
	public canSuspend() {
		return true;
	}

	/**
	 * @return {?}
	 */
	public canCompleteContinuous() {
		return false;
	}

	/**
	 * @return {?}
	 */
	public willDirtyDataModel() {
		return true;
	}

	/**
	 * @return {undefined}
	 */
	public onExecute(o, event, onComplete, errorFn, shallow, time) {
		//assert(false);
	}

	/**
	 * @return {undefined}
	 */
	public onCleanup(event) {
	}

	/**
	 * @return {undefined}
	 */
	public onSuspend() {
	}

	/**
	 * @return {undefined}
	 */
	public onResume() {
	}

	/**
	 * @param {string} keepData
	 * @param {Object} opt_attributes
	 * @param {?} userid
	 * @param {?} chunk
	 * @param {?} serviceName
	 * @return {?}
	 */
	public onReceive(keepData: any = null, opt_attributes: any = null, userid: any = null, chunk: any = null, serviceName: any = null) {
		if(keepData === ViewEventTypeEnum.active) {
			return this.mgr.cancel(this), false;
		}
	}

	/**
	 * @return {undefined}
	 */
	public commit() {
	}

	/**
	 * @return {undefined}
	 */
	public undo() {
		this.onUndo();
	}

	/**
	 * @return {undefined}
	 */
	public redo() {
		this.onRedo();
	}

	/**
	 * @return {undefined}
	 */
	public onUndo() {
		this._onUndoRedo();
	}

	/**
	 * @return {undefined}
	 */
	public onRedo() {
		this._onUndoRedo();
	}

	/**
	 * @return {undefined}
	 */
	private _onUndoRedo() {
		var ca = hsw.core.brep.Entity.prototype.database;
		var prevSources = {};
		var versions = {};
		var i;
		for(i in this.saved) {
			var c = ca[i];
			prevSources[i] = c.save();
			(goog as any).object.extend(versions, c.restore(this.saved[i]));
		}
		versions = Object.keys(versions).sort(function(whitespace, dataAndEvents) {
			return -1 === whitespace.indexOf(" + ") ? -1 : 1;
		});
		/** @type {number} */
		i = 0;
		c = (versions as any).length;
		for(; i < c; ++i) {
			var value = versions[i].split(" ");
			ca[value[0]].dispatchEvent(new goog.events.Event("-" === value[1] ? EntityEventEnum.childRemoved : EntityEventEnum.childAdded, {
				entity: ca[value[2]]
			}));
		}
		this.saved = prevSources;
	}

	/**
	 * @return {?}
	 */
	public drivenEntityIds() {
		/** @type {Array} */
		var out = [];
		var copies;
		for(copies in this.saved) {
			out.push(copies);
		}
		if(this instanceof hsw.cmd.CompositeCommand) {
			(this as any).subs.forEach(function($rootScope) {
				var copies;
				for(copies in $rootScope.saved) {
					out.push(copies);
				}
			});
		}
		return out;
	}
}
