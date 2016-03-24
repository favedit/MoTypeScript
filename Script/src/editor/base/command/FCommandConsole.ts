import {Objects} from '../../../runtime/common/lang/Objects';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {Listeners} from '../../../runtime/common/lang/Listeners';
import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {FConsole} from '../../../runtime/core/FConsole';
import {FCommand} from './FCommand';
import {FTransactionConsole} from '../transaction/FTransactionConsole';

//==========================================================
// <T>命令控制台。</T>
//
// @author maocy
// @history 160308
//==========================================================
export class FCommandConsole extends FConsole {
   // 类型
   protected types: Dictionary<FCommand> = null;
   // 当前
   protected current: FCommand = null;
   // 队列
   protected pendings: Objects<FCommand> = null;
   // 事务控制台
   @Linker(FTransactionConsole)
   protected _transactionConsole: FTransactionConsole = null;
   // 监听器
   public commandStartingListeners: Listeners = null;
   public commandStarted: Listeners = null;
   public commandSuspending: Listeners = null;
   public commandSuspended: Listeners = null;
   public commandResuming: Listeners = null;
   public commandResumed: Listeners = null;
   public commandTerminating: Listeners = null;
   public commandTerminated: Listeners = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.commandStartingListeners = new Listeners(this);
      this.commandStarted = new Listeners(this);
      this.commandSuspending = new Listeners(this);
      this.commandSuspended = new Listeners(this);
      this.commandResuming = new Listeners(this);
      this.commandResumed = new Listeners(this);
      this.commandTerminating = new Listeners(this);
      this.commandTerminated = new Listeners(this);
      // this.clear();
      // this._transMgr = body.transManager;
      // goog.events.listen(body, hsw.app.ViewEventTypeEnum.active, function(entry) {
      //    if (!(entry.target && entry.target.before)) {
      //       this.receive(entry.type, entry.target);
      //    }
      // }, false, this);
   }

   //==========================================================
   // <T>注册命令。</T>
   //
   // @param command 命令
   //==========================================================
   public register = function(command: FCommand) {
      var code = command.code;
      this.types.set(code, command);
   }

   //==========================================================
   // <T>清空命令。</T>
   //==========================================================
   public clear() {
      this.current = null;
      this.pendings.clear();
   }

   //==========================================================
   // <T>执行处理。</T>
   //==========================================================
   public execute(command: FCommand) {
      LoggerUtil.info(this, "Execute command. (code={1})", command.code);
      // 挂起当前命令
      var current: FCommand = this.current;
      if (current) {
         if (current.canSuspend()) {
            LoggerUtil.info("Suspend command. (code={1})", current.code);
            // this.signalCommandSuspending.dispatch({cmd: current});
            current.suspend();
            this.pendings.push(current);
            // this.signalCommandSuspended.dispatch({cmd: current});
         } else {
            this.complete();
         }
      }
      // 执行对象
      var executeCommand: FCommand = this.current = command;
      //this.signalCommandStarting.dispatch({cmd: this.current});
      var result = executeCommand.execute();
      if (executeCommand) {
         //this.signalCommandStarted.dispatch({cmd: this.current});
      }
      return result;
   }

   //==========================================================
   // <T>完成处理。</T>
   //==========================================================
   public complete(item?, key?) {
      var current: FCommand = this.current;
      if (!item) {
         item = current;
      }
      if (item === current) {
         if (current) {
            LoggerUtil.info(this, "Complete command. (code={1})" + current.code);
            // this.signalCommandTerminating.dispatch({cmd: current});
            var camelKey = current.complete(key);
            if (camelKey) {
               this._transactionConsole.commit(camelKey);
            }
            /** @type {null} */
            this.current = null;
            //this.signalCommandTerminated.dispatch({cmd: current});
         }
         if (current && current.canCompleteContinuous()) {
            LoggerUtil.info(this, "Continues command. (code={1})", current.code);
            // current = this.createCommand(current.code);
            //this.execute(current, key);
         } else {
            var resume = this.current = this.pendings.pop();
            if (resume) {
               // this.signalCommandResuming.dispatch({cmd: this.current});
               resume.resume();
               // this.signalCommandResumed.dispatch({cmd: this.current});
            }
         }
         // if (hsw.app.Base.getApp().autoSave) {
         //    hsw.app.Base.getApp().autoSave();
         // }
         // if (item) {
         //    if (item.willDirtyDataModel()) {
         //       hsw.app.Base.getApp().floorplan.isDirty = true;
         //    }
         // }
      }
   }

   public cancel(event) {
      if (!event) {
         event = this.current;
      }
      if (event !== this.current) {
         //assert(false, "terminate a non-active command is not supported currently");
      } else {
         if (this.current) {
            event = this.current;
            LoggerUtil.info(this, "Cancel command. (code={1})", event.code);
            // this.signalCommandTerminating.dispatch({cmd: event});
            event.cancel();
            /** @type {null} */
            this.current = null;
            //this.signalCommandTerminated.dispatch({cmd: event});
         }
         if (this.current = this.pendings.pop()) {
            //this.signalCommandResuming.dispatch({cmd: this.current});
            this.current.resume();
            //this.signalCommandResumed.dispatch({cmd: this.current});
         }
         //if (hsw.app.Base.getApp().autoSave) {
         //   hsw.app.Base.getApp().autoSave();
         //}
      }
   }

   public receive(name, opt_attributes, userid) {
      if (!this.current) {
         return false;
      }
      name = this.current.receive(name, opt_attributes, userid);
      if ("undefined" === typeof name) {
         /** @type {boolean} */
         name = true;
      }
      return name;
   }


   public createCommand(name, opt_attributes, dataAndEvents, deepDataAndEvents, objectType, queryStr) {
      // if ("string" === typeof name && (name = this._cmdByType[name], !name)) {
      //    return;
      // }
      // if (name = new name(opt_attributes, dataAndEvents, deepDataAndEvents, objectType, queryStr)) {
      //    name.mgr = this;
      // }
      // return name;
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
}