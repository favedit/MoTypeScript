import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import { ECommandState } from './ECommandState';
import {Linker} from '../../../runtime/common/reflect/Linker';
import { FCommandConsole } from './FCommandConsole';
//==========================================================
// <T>命令控制台。</T>
//
// @author maocy
// @history 160308
//==========================================================
export class FCommand extends ObjectBase {
   // 代码
   public code: string = null;
   // 状态
   public state: ECommandState = ECommandState.Created;
   // 描述
   public description: string = null;
   // 控制器
   @Linker(FCommandConsole)
   public console:FCommandConsole;
   // 保存数据
   public saveData:ObjectBase;

   //==========================================================
   // <T>是否可挂起。</T>
   //==========================================================
   public canSuspend() {
      return false;
   }

   //==========================================================
   // <T>挂起处理。</T>
   //==========================================================
   public onSuspend() {
   }

   //==========================================================
   // <T>挂起处理。</T>
   //==========================================================
   public suspend() {
      this.onSuspend();
   }

   //==========================================================
   // <T>继续处理。</T>
   //==========================================================
   public onResume() {
   }

   //==========================================================
   // <T>继续处理。</T>
   //==========================================================
   public resume() {
      this.onResume();
   }

   //==========================================================
   // <T>是否能够撤销重做。</T>
   //==========================================================
   public canUndoRedo() {
      return false;
   }

   //==========================================================
   // <T>撤销处理。</T>
   //==========================================================
   public onUndo = function() {
      return true;
   }

   //==========================================================
   // <T>撤销处理。</T>
   //==========================================================
   public undo = function() {
      return this.onUndo();
   }

   //==========================================================
   // <T>重做处理。</T>
   //==========================================================
   public onRedo = function() {
      return true;
   }

   //==========================================================
   // <T>重做处理。</T>
   //==========================================================
   public redo = function() {
      return this.onRedo();
   }

   //==========================================================
   // <T>执行处理。</T>
   //==========================================================
   public onExecute(): any {
      return null;
   }

   //==========================================================
   // <T>执行处理。</T>
   //==========================================================
   public execute(): any {
      return this.onExecute();
   }

   public onCleanup(event) {
   }

   public canCompleteContinuous() {
      return false;
   }

   public complete(event) {
      this.onCleanup(event);
      if (this.canUndoRedo()) {
         return this;
      }
   }

   public commit() {
   }

   public cancel(event?) {
      this.onCleanup(event);
      if (this.canUndoRedo()) {
         this.onUndo();
      }
   }

   public onReceive(keepData, opt_attributes, userid, chunk, serviceName) {
      // if (keepData === hsw.app.ViewEventTypeEnum.active) {
      //    return this.mgr.cancel(this), false;
      // }
   }

   public receive(name, opt_attributes, userid) {
      //assert(!userid, "command.receive allows only 2 parameters - function receive(msg, param)");
      //return this.onReceive(name, opt_attributes, userid);
   }

   public willDirtyDataModel() {
      return true;
   }
}