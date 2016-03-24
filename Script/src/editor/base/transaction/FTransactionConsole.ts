import {Objects} from '../../../runtime/common/lang/Objects';
import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {FConsole} from '../../../runtime/core/FConsole';
import {FCommand} from '../command/FCommand';
import {FSession} from './FSession';

//==========================================================
// <T>事务控制台。</T>
//==========================================================
export class FTransactionConsole extends FConsole {
   // 激活会话
   public _activeSession: FSession = null;
   // 会话栈
   public _sessionStack: Objects<FSession> = null;
      
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // this.signalCommitting = new hsw.util.Signal(this);
      // this.signalCommitted = new hsw.util.Signal(this);
      // this.signalUndoRedoStateChanged = new hsw.util.Signal(this);
      // this.signalUndoing = new hsw.util.Signal(this);
      // this.signalUndone = new hsw.util.Signal(this);
      // this.signalRedoing = new hsw.util.Signal(this);
      // this.signalRedone = new hsw.util.Signal(this);
      this._activeSession = new FSession();
      /** @type {Array} */
      this._sessionStack = new Objects<any>();
   }

   //==========================================================
   // <T>提交处理。</T>
   //==========================================================
   public commit(data, flag: boolean = false) {
      if (data) {
         // this.signalCommitting.dispatch({request: data});
         this._activeSession.commit(data, flag);
         // this.signalCommitted.dispatch({request: data});
         // this.signalUndoRedoStateChanged.dispatch();
      }
   };

   //==========================================================
   // <T>开始会话。</T>
   //==========================================================
   public startSession() {
      this._sessionStack.push(this._activeSession);
      this._activeSession = new FSession();
      // this.signalUndoRedoStateChanged.dispatch();
   };

   //==========================================================
   // <T>结束会话。</T>
   //==========================================================
   public endSession(failFunction) {
      if (this._sessionStack.isEmpty()) {
         LoggerUtil.warn(this, "EndSession when there is only default session in place.");
      } else {
         var pdataCur = null;
         if (failFunction) {
            pdataCur = this._activeSession.toRequest();
         }
         this._activeSession = this._sessionStack.pop();
         this.commit(pdataCur);
         // this.signalUndoRedoStateChanged.dispatch();
      }
   }

   //==========================================================
   // <T>是否能够撤销。</T>
   //==========================================================
   public canUndo(): boolean {
      return this._activeSession.canUndo();
   }

   //==========================================================
   // <T>撤销处理。</T>
   //==========================================================
   public undo() {
      if (this.canUndo()) {
         var undoManager = this._activeSession;
         var request = undoManager.peekNextUndoRequest();
         //this.signalUndoing.dispatch({request: request});
         undoManager.undo();
         //this.signalUndone.dispatch({request: request});
         //this.signalUndoRedoStateChanged.dispatch();
      }
   }

   //==========================================================
   // <T>是否能够重做。</T>
   //==========================================================
   public canRedo(): boolean {
      return this._activeSession.canRedo();
   }

   //==========================================================
   // <T>重做处理。</T>
   //==========================================================
   public redo() {
      if (this.canRedo()) {
         var activeSession = this._activeSession;
         var request = activeSession.peekNextRedoRequest();
         // this.signalRedoing.dispatch({request: request});
         activeSession.redo();
         //this.signalRedone.dispatch({request: request});
         //this.signalUndoRedoStateChanged.dispatch();
      }
   }

   //==========================================================
   // <T>清空处理。</T>
   //==========================================================
   public clear() {
      this._activeSession = new FSession();
      this._sessionStack.clear();
      // this.signalUndoRedoStateChanged.dispatch();
   }
}