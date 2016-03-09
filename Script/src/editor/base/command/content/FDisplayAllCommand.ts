import {FCommand} from '../FCommand';

export class FDisplayAllCommand {

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayAllContent = function() {
   //    hsw.cmd.Command.call(this);
   //    /** @type {Array} */
   //    this._invisibleContents = [];
   //    /** @type {Array} */
   //    this._invisibleWalls = [];
   // };
   // goog.inherits(hsw.cmd.content.CmdDisplayAllContent, hsw.cmd.Command);

   // hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdDisplayAllContent, "hsw.cmd.content.CmdDisplayAllContent", "Display all hidden content", []);
   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayAllContent.prototype.onExecute = function() {
   //    var floorplan = hsw.app.Base.getApp().floorplan;
   //    floorplan.forEachContent(function(spaceName) {
   //       if (!spaceName.isFlagOff(hsw.core.brep.EntityFlagEnum.hidden)) {
   //          this._invisibleContents.push(spaceName);
   //          spaceName.setFlagOff(hsw.core.brep.EntityFlagEnum.hidden);
   //       }
   //    }, this);
   //    floorplan.forEachWall(function(test) {
   //       if (!test.isFlagOff(hsw.core.brep.EntityFlagEnum.hidden)) {
   //          this._invisibleWalls.push(test);
   //          test.setFlagOff(hsw.core.brep.EntityFlagEnum.hidden);
   //          test.from.setFlagOff(hsw.core.brep.EntityFlagEnum.hidden);
   //          test.to.setFlagOff(hsw.core.brep.EntityFlagEnum.hidden);
   //          test.updateConnectedEdges();
   //       }
   //    }, this);
   //    if (0 < this._invisibleContents.length || 0 < this._invisibleWalls.length) {
   //       this.mgr.complete(this);
   //    } else {
   //       this.mgr.cancel(this);
   //    }
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayAllContent.prototype.onUndo = function() {
   //    this._invisibleContents.forEach(function($timeout) {
   //       $timeout.setFlagOn(hsw.core.brep.EntityFlagEnum.hidden);
   //    });
   //    this._invisibleWalls.forEach(function($timeout) {
   //       $timeout.setFlagOn(hsw.core.brep.EntityFlagEnum.hidden);
   //       $timeout.updateConnectedEdges();
   //    });
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdDisplayAllContent.prototype.onRedo = function() {
   //    this._invisibleContents.forEach(function($timeout) {
   //       $timeout.setFlagOff(hsw.core.brep.EntityFlagEnum.hidden);
   //    });
   //    this._invisibleWalls.forEach(function($timeout) {
   //       $timeout.setFlagOff(hsw.core.brep.EntityFlagEnum.hidden);
   //       $timeout.updateConnectedEdges();
   //    });
   // };
}