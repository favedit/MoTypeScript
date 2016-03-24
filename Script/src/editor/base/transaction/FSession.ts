import {FObject} from '../../../runtime/common/lang/FObject';
import {Objects} from '../../../runtime/common/lang/Objects';
import {FCompositeRequest} from './common/FCompositeRequest';
import {FRequest} from './FRequest';

//==========================================================
// <T>会话处理。</T>
//==========================================================
export class FSession extends FObject {
   public _undoStack: Objects<any> = null;
   public _redoStack: Objects<any> = null;

   //==========================================================
   // <T>请求处理。</T>
   //==========================================================
   public constructor() {
      super();
      this._undoStack = new Objects<any>();
      this._redoStack = new Objects<any>();
   };

   //==========================================================
   // <T>是否能够撤销。</T>
   //==========================================================
   public canUndo() {
      return !this._undoStack.isEmpty();
   };

   //==========================================================
   // <T>是否能够撤销。</T>
   //==========================================================
   public undo() {
      var copies = this._undoStack.pop();
      copies.undo();
      this._redoStack.push(copies);
   };

   //==========================================================
   // <T>是否能够重做。</T>
   //==========================================================
   public canRedo() {
      return this._redoStack.isEmpty();
   };

   //==========================================================
   // <T>是否能够撤销。</T>
   //==========================================================
   public redo() {
      var copies = this._redoStack.pop();
      copies.redo();
      this._undoStack.push(copies);
   };

   //==========================================================
   // <T>是否能够撤销。</T>
   //==========================================================
   public peekNextUndoRequest() {
      var undoStack = this._undoStack;
      var count = undoStack.count();
      return undoStack[count - 1];
   };

   //==========================================================
   // <T>是否能够撤销。</T>
   //==========================================================
   public peekNextRedoRequest() {
      var redoStack = this._redoStack;
      var count = redoStack.count();
      return redoStack[count - 1];
   };

   //==========================================================
   // <T>是否能够撤销。</T>
   //==========================================================
   public toRequest() {
      var request: FRequest = null;
      var undoStack: Objects<any> = this._undoStack;
      var count: number = undoStack.count();
      switch (count) {
         case 0:
            break;
         case 1:
            request = undoStack[0];
            break;
         default:
            request = new FCompositeRequest(undoStack);
      }
      return request;
   }

   //==========================================================
   // <T>提交处理</T>
   //==========================================================
   public commit(request: FRequest, flag: boolean) {
      // 提交处理
      if (!request.isCommitted) {
         request.commit();
      }
      // 当前请求和回退最后一个构成一个复合请求
      if (flag) {
         var undoRequest = this._undoStack.pop();
         if (undoRequest) {
            request = FCompositeRequest.create(undoRequest, request);
         }
      }
      this._undoStack.push(request);
      this._redoStack.clear();
   }
}