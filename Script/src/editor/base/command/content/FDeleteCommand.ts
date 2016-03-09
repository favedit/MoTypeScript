import {FCommand} from '../FCommand';

export class FDeleteCommand extends FCommand {

   /**
    * @param {?} content
    * @return {undefined}
    */
   hsw.cmd.content.CmdDeleteContent = function(content) {
      hsw.cmd.Command.call(this);
      this.content = content;
   };
   goog.inherits(hsw.cmd.content.CmdDeleteContent, hsw.cmd.Command);

   hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdDeleteContent, "hsw.cmd.content.CmdDeleteContent", "Delete Content", []);
   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdDeleteContent.prototype.onExecute = function() {
      var options = this.content;
      hsw.selection.Manager.instance().unselect(options);
      var parent = options.getUniqueParent();
      assert(parent, "Content should have parent container");
      this.parent = parent;
      this.host = options.getHost();
      this._delete();
      this.mgr.complete(this);
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdDeleteContent.prototype.onUndo = function() {
      var suiteView = this.content;
      suiteView.setFlagOff(hsw.core.brep.EntityFlagEnum.removed);
      if (this.parent) {
         this.parent.addChild(suiteView);
         suiteView.assignTo(this.host);
         this.parent.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.entityDirty, {}));
      }
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdDeleteContent.prototype.onRedo = function() {
      this._delete();
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdDeleteContent.prototype._delete = function() {
      var t = this.content;
      t.setFlagOn(hsw.core.brep.EntityFlagEnum.removed);
      if (this.parent) {
         this.parent.removeChild(t.ID);
         t.assignTo(null);
         this.parent.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.entityDirty, {}));
      }
      t.forEachContent(function(isXML) {
         if (this.host && this.host instanceof hsw.model.Room) {
            isXML.assignTo(this.host);
         } else {
            var suiteView = hsw.util.Room.getRoomContentIn(isXML);
            isXML.assignTo(suiteView);
         }
      }, this);
   };
}