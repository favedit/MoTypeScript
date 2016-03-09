import {FCommand} from '../FCommand';

export class FMoveContentsCommand extends FCommand {

   // /**
   //  * @param {?} text
   //  * @return {undefined}
   //  */
   // public constructor(text) {
   //    super();
   //    this.contents = text;
   //    this.signalHostChanged = sk_create("hsw.util.Signal", hsw.util.Signal);
   // };
   // /**
   //  * @return {?}
   //  */
   // public canSuspend() {
   //    return false;
   // };

   // /**
   //  * @return {undefined}
   //  */
   // public onCleanup() {
   // };

   // /**
   //  * @param {Object} label
   //  * @return {undefined}
   //  */
   // public onExecute(label) {
   //    var arrayOutput = this.subs;
   //    this.contents.forEach(function(attributes) {
   //       attributes = this.mgr.createCommand(hsw.cmd.content.CmdMoveContent, attributes);
   //       arrayOutput.push(attributes);
   //    }, this);
   //    var d3 = hsw.selection.Manager.instance();
   //    this.contents.forEach(function(current) {
   //       if (!d3.hasSelected(current)) {
   //          d3.select(current);
   //       }
   //    });
   //    if (!label) {
   //       label = {};
   //    }
   //    /** @type {boolean} */
   //    label.select = false;
   //    this.mainContent = label.entity && this.contents.includes(label.entity) ? label.entity : this.contents[0];
   //    hsw.cmd.content.CmdMoveContents.superClass_.onExecute.call(this, label);
   // };

   // /**
   //  * @return {?}
   //  */
   // public _isContentsMoved() {
   //    return this.subs.some(function(dataAndEvents) {
   //       return dataAndEvents.isContentMoved();
   //    });
   // };

   // /**
   //  * @param {string} keepData
   //  * @param {Object} opt_attributes
   //  * @return {?}
   //  */
   // public onReceive(keepData, opt_attributes) {
   //    return "dragend" === keepData ? (this._isContentsMoved() ? this.mgr.complete(this) : this.mgr.cancel(this), false) : [keepData, opt_attributes];
   // };
}

// hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdMoveContents, "hsw.cmd.content.CmdMoveContents", "Move content", ["move"]);
