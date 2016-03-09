import {FCommand} from '../FCommand';

export class FDuplicateCommand extends FCommand {

   // /**
   //  * @param {?} src
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDuplicateContent = function(src) {
   //    hsw.cmd.Command.call(this);
   //    this.src = src;
   // };
   // goog.inherits(hsw.cmd.content.CmdDuplicateContent, hsw.cmd.Command);

   // hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdDuplicateContent, "hsw.cmd.content.CmdDuplicateContent", "Duplicate one Content", []);
   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDuplicateContent.prototype.onExecute = function() {
   //    log("todo ----- duplicate content logic here: src=" + this.src.ID);
   //    var element = this.src.clone();
   //    element.x = this.src.x + 0.5;
   //    /** @type {number} */
   //    element.y = this.src.y - 0.5;
   //    var container = this.src.parents[Object.keys(this.src.parents)[0]];
   //    if (container.hasChild(element)) {
   //       container.removeChild(element.ID);
   //    }
   //    container.addChild(element);
   //    element.assignTo(null);
   //    this.saved = this.dup = element;
   //    this.host = element.getHost();
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDuplicateContent.prototype.onCleanup = function() {
   // };

   // /**
   //  * @param {string} keepData
   //  * @param {Object} opt_attributes
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDuplicateContent.prototype.onReceive = function(keepData, opt_attributes) {
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDuplicateContent.prototype.onUndo = function() {
   //    this.src.parents[Object.keys(this.src.parents)[0]].removeChild(this.saved.ID);
   //    this.saved.assignTo(null);
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDuplicateContent.prototype.onRedo = function() {
   //    this.src.parents[Object.keys(this.src.parents)[0]].addChild(this.saved);
   //    this.saved.assignTo(this.host);
   // };

}