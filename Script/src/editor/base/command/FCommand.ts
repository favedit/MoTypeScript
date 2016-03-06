export class FCommand {

   public onExecute() {
      //assert(false);
   }
   public execute(o, event, onComplete, errorFn, shallow, time) {
      // return this.onExecute(o, event, onComplete, errorFn, shallow, time);
   }

   public canSuspend() {
      return true;
   }

   public onSuspend() {
   }

   public suspend() {
      this.onSuspend();
   }

   public onResume() {
   }

   public resume() {
      this.onResume();
   }

   public canUndoRedo() {
      return true;
   }

   public onUndo = function() {
   }

   public undo = function() {
      this.onUndo();
   }

   public onRedo = function() {
   }

   public redo = function() {
      this.onRedo();
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

   public cancel(event) {
      this.onCleanup(event);
      if (this.canUndoRedo()) {
         this.onUndo();
      }
   }

   public onReceive = function(keepData, opt_attributes, userid, chunk, serviceName) {
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