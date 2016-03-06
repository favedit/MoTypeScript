export class FCommandManager {

   protected static _instance;
   //    signalCommandStarting = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    signalCommandStarted = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    signalCommandSuspending = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    signalCommandSuspended = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    signalCommandResuming = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    signalCommandResumed = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    signalCommandTerminating = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    signalCommandTerminated = sk_create("hsw.util.Signal", hsw.util.Signal, this);
   //    this._cmdByType = {};
   //    /** @type {Array} */
   //    this._pendingStack = [];
   //    /** @type {null} */
   //    this._transMgr = null;
   // logger = log.logger("hsw.cmd.Manager");

   /**
    * @return {?}
    */
   public static instance() {
      this._instance = this._instance || new FCommandManager();
      return this._instance;
   }

   /**
    * @param {?} body
    * @return {undefined}
    */
   public init = function(body) {
      // this.clear();
      // this._transMgr = body.transManager;
      // goog.events.listen(body, hsw.app.ViewEventTypeEnum.active, function(entry) {
      //    if (!(entry.target && entry.target.before)) {
      //       this.receive(entry.type, entry.target);
      //    }
      // }, false, this);
   };

   public register = function(section, type, command) {
      // assert("string" === typeof type && "string" === typeof command, "typeName and description should be strings.");
      // section.description = section.prototype.description = command;
      // section.type = section.prototype.type = type;
      // /** @type {Function} */
      // this._cmdByType[type] = section;
   };

   public getRunningCommands = function() {
      return this.current ? [this.current].concat(this._pendingStack) : [];
   };

   /**
    * @param {string} dataAndEvents
    * @return {?}
    */
   public isCommandAvailable = function(dataAndEvents) {
      return void 0 !== dataAndEvents;
   };

   /**
    * @param {Function} name
    * @param {?} opt_attributes
    * @param {string} dataAndEvents
    * @param {string} deepDataAndEvents
    * @param {Window} objectType
    * @param {Array} queryStr
    * @return {?}
    */
   public createCommand = function(name, opt_attributes, dataAndEvents, deepDataAndEvents, objectType, queryStr) {
      // assert(name);
      // if ("string" === typeof name && (name = this._cmdByType[name], !name)) {
      //    return;
      // }
      // if (name = new name(opt_attributes, dataAndEvents, deepDataAndEvents, objectType, queryStr)) {
      //    name.mgr = this;
      // }
      // return name;
   };

   public clear() {
      // /** @type {number} */
      // this._pendingStack.length = 0;
      // this.current = void 0;
   }

   public execute(e, event, evt, onComplete, done, shallow) {
      // this.logger.info("execute cmd:" + e.type);
      // assert(e);
      // if (this.current) {
      //    var current = this.current;
      //    if (current.canSuspend()) {
      //       this.logger.info("suspend cmd:" + current.type);
      //       this.signalCommandSuspending.dispatch({
      //          cmd: current
      //       });
      //       this._pendingStack.push(this.current);
      //       this.current.suspend();
      //       this.signalCommandSuspended.dispatch({
      //          cmd: current
      //       });
      //    } else {
      //       this.complete();
      //    }
      // }
      // /** @type {Object} */
      // this.current = e;
      // this.signalCommandStarting.dispatch({
      //    cmd: this.current
      // });
      // e = this.current.execute(event, evt, onComplete, done, shallow);
      // if (this.current) {
      //    this.signalCommandStarted.dispatch({
      //       cmd: this.current
      //    });
      // }
      // return e;
   }

   public complete = function(item, key) {
      // if (!item) {
      //    item = this.current;
      // }
      // if (item === this.current) {
      //    var current = this.current;
      //    if (this.current) {
      //       this.logger.info("complete cmd:" + current.type);
      //       this.signalCommandTerminating.dispatch({
      //          cmd: current
      //       });
      //       var camelKey = current.complete(key);
      //       if (camelKey) {
      //          this._transMgr.commit(camelKey);
      //       }
      //       /** @type {null} */
      //       this.current = null;
      //       this.signalCommandTerminated.dispatch({
      //          cmd: current
      //       });
      //    }
      //    if (current && current.canCompleteContinuous()) {
      //       this.logger.info("continues cmd:" + current.type);
      //       current = this.createCommand(current.type);
      //       this.execute(current, key);
      //    } else {
      //       if (this.current = this._pendingStack.pop()) {
      //          this.signalCommandResuming.dispatch({
      //             cmd: this.current
      //          });
      //          this.current.resume();
      //          this.signalCommandResumed.dispatch({
      //             cmd: this.current
      //          });
      //       }
      //    }
      //    if (hsw.app.Base.getApp().autoSave) {
      //       hsw.app.Base.getApp().autoSave();
      //    }
      //    if (item) {
      //       if (item.willDirtyDataModel()) {
      //          /** @type {boolean} */
      //          hsw.app.Base.getApp().floorplan.isDirty = true;
      //       }
      //    }
      // }
   }

   public cancel(event) {
      // if (!event) {
      //    event = this.current;
      // }
      // if (event !== this.current) {
      //    assert(false, "terminate a non-active command is not supported currently");
      // } else {
      //    if (this.current) {
      //       event = this.current;
      //       this.logger.info("cancel cmd:" + event.type);
      //       this.signalCommandTerminating.dispatch({
      //          cmd: event
      //       });
      //       event.cancel();
      //       /** @type {null} */
      //       this.current = null;
      //       this.signalCommandTerminated.dispatch({
      //          cmd: event
      //       });
      //    }
      //    if (this.current = this._pendingStack.pop()) {
      //       this.signalCommandResuming.dispatch({
      //          cmd: this.current
      //       });
      //       this.current.resume();
      //       this.signalCommandResumed.dispatch({
      //          cmd: this.current
      //       });
      //    }
      //    if (hsw.app.Base.getApp().autoSave) {
      //       hsw.app.Base.getApp().autoSave();
      //    }
      // }
   }

   public receive(name, opt_attributes, userid) {
      // if (!this.current) {
      //    return false;
      // }
      // name = this.current.receive(name, opt_attributes, userid);
      // if ("undefined" === typeof name) {
      //    /** @type {boolean} */
      //    name = true;
      // }
      // return name;
   }
}