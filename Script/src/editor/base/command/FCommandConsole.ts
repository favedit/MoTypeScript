import {Objects} from '../../../runtime/common/lang/Objects';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {Listeners} from '../../../runtime/common/lang/Listeners';
import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {Service} from '../../../runtime/core/Service';
import {FCommand} from './FCommand';
import {FTransactionConsole} from '../transaction/FTransactionConsole';

//==========================================================
// <T>命令控制台。</T>
//
// @author maocy
// @history 160308
//==========================================================
export class FCommandConsole extends Service {
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
   public commandStarting: Listeners = null;
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
      this.commandStarting = new Listeners(this);
      this.commandStarted = new Listeners(this);
      this.commandSuspending = new Listeners(this);
      this.commandSuspended = new Listeners(this);
      this.commandResuming = new Listeners(this);
      this.commandResumed = new Listeners(this);
      this.commandTerminating = new Listeners(this);
      this.commandTerminated = new Listeners(this);
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
         // 判断当前命令是否可挂起
         if (current.canSuspend()) {
            LoggerUtil.info("Suspend command. (code={1})", current.code);
            // 分发所有监听了挂起前操作的事件
            this.commandSuspending.process(current);
            current.suspend();
            this.pendings.push(current);
            // 分发所有监听了挂起后操作的事件
            this.commandSuspended.process(current);
         } else {
            // 如果当前事件不可挂起，直接先完成当前事件
            this.complete();
         }
      }
      // 将当前事件变更为当前事件进行执行
      var executeCommand: FCommand = this.current = command;
      this.commandStarting.process(executeCommand);
      var result = executeCommand.execute();
      if (executeCommand) {
         this.commandStarted.process(executeCommand);
      }
      return result;
   }

   //==========================================================
   // <T>完成处理。</T>
   //==========================================================
   public complete(command?: FCommand, key?) {
      if (!command) {
         command = this.current;
      }
      if (command === this.current) {
         var current = this.current;
         if (this.current) {
            this.commandTerminating.process(command);
            // var camelKey = current.complete(key);
            // if (camelKey) {
            //    this._transMgr.commit(camelKey);
            // }
            this.current = null;
            this.commandTerminated.process(command);
         }
         if (current && current.canCompleteContinuous()) {
            this.execute(current);
         } else {
            if (this.current = this.pendings.pop()) {
               this.commandResuming.process();
               this.current.resume();
               this.commandResumed.process(this.current);
            }
         }
      }
   }

   //==========================================================
   // <T>取消处理。</T>
   //==========================================================
   public cancel(command: FCommand) {
      if (!command) {
         command = this.current;
      }
      // 只有执行中的命令可以取消
      if (command === this.current) {
         if (this.current) {
            command = this.current;
            LoggerUtil.info(this, "Cancel command. (code={1})", command.code);
            this.commandTerminating.process(command);
            command.cancel();
            this.current = null;
            this.commandTerminated.process(command);
         }
         if (this.current = this.pendings.pop()) {
            this.commandResuming.process();
            this.current.resume();
            this.commandResumed.process(this.current);
         }
      }
   }

   //==========================================================
   // <T>创建命令。</T>
   //==========================================================
   public receive(name, opt_attributes, userid) {
      if (!this.current) {
         return false;
      }
      name = this.current.receive(name, opt_attributes, userid);
      if ("undefined" === typeof name) {
         name = true;
      }
      return name;
   }

   //==========================================================
   // <T>创建命令。</T>
   //==========================================================
   public createCommand(cmdName, opt_attributes, dataAndEvents, deepDataAndEvents, objectType, queryStr) {
      var clazz = cmdName;
      if ("string" === typeof cmdName) {
         if (this.types.contains(cmdName)) {
            clazz = this.types.get(cmdName);
         }
      }
      var ins = new clazz(opt_attributes, dataAndEvents, deepDataAndEvents, objectType, queryStr);
      ins.console = this;
      return ins;
   };

   //==========================================================
   // <T>获取执行中的命令（执行中的命令包含当前命令和挂起的命令）。</T>
   //==========================================================
   public getRunningCommands = function() {
      return this.current ? [this.current].concat(this._pendingStack) : [];
   };

   //==========================================================
   // <T>判断命令是否合法。</T>
   //==========================================================
   public isCommandAvailable = function(dataAndEvents) {
      return void 0 !== dataAndEvents;
   };
}