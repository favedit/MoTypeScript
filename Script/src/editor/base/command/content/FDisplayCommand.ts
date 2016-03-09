import {FCommand} from '../FCommand';

export class FDisplayCommand extends FCommand {

   // /**
   //  * @param {?} content
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayContent = function(content) {
   //    hsw.cmd.Command.call(this);
   //    this.content = content;
   // };
   // goog.inherits(hsw.cmd.content.CmdDisplayContent, hsw.cmd.Command);

   // hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdDisplayContent, "hsw.cmd.content.CmdDisplayContent", "Display one Content", []);
   // /**
   //  * @param {Object} conditional
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayContent.prototype.onExecute = function(conditional) {
   //    if (this.content.isFlagOff(hsw.core.brep.EntityFlagEnum.hidden) === conditional) {
   //       this.mgr.cancel(this);
   //    }
   //    this._switchFlag(conditional);
   //    this.mgr.complete(this);
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayContent.prototype.onUndo = function() {
   //    this._switchFlag(!this.show);
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayContent.prototype.onRedo = function() {
   //    this._switchFlag(this.show);
   // };

   // /**
   //  * @param {boolean} conditional
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayContent.prototype._switchFlag = function(conditional) {
   //    var result = this.content;
   //    if (conditional) {
   //       result.setFlagOff(hsw.core.brep.EntityFlagEnum.hidden);
   //    } else {
   //       result.setFlagOn(hsw.core.brep.EntityFlagEnum.hidden);
   //       if (!result.group) {
   //          hsw.selection.Manager.instance().unselect(result);
   //       }
   //    }
   // };
}