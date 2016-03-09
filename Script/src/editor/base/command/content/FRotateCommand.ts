import {FCommand} from '../FCommand';

export class FRotateCommand extends FCommand {

   /**
    * @param {(number|string)} a
    * @return {undefined}
    */
   hsw.cmd.content.CmdRotateContent = function(a) {
      hsw.cmd.Command.call(this);
      var b = hsw.selection.Manager.instance().selected()[0];
      if (b) {
         assert(b instanceof hsw.model.Content);
      }
      this.content = a || b;
      this.basePoint = {
         x: 0,
         y: 0
      };
      /** @type {number} */
      this.totalDelta = this.originalAngle = this.lastContentAngle = this.lastTargetingAngle = 0;
      /** @type {boolean} */
      this.snapEnabled = true;
   };
   goog.inherits(hsw.cmd.content.CmdRotateContent, hsw.cmd.Command);

   hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdRotateContent, "hsw.cmd.content.CmdRotateContent", "Rotate Content", []);
   /**
    * @param {Object} opt_attributes
    * @return {undefined}
    */
   hsw.cmd.content.CmdRotateContent.prototype.onExecute = function(opt_attributes) {
      var obj = this.content;
      if (!obj || obj instanceof hsw.model.Opening) {
         this.mgr.cancel(this);
      }
      this.basePoint.x = obj.x;
      this.basePoint.y = obj.y;
      this.lastTargetingAngle = this.lastContentAngle = this.originalAngle = obj.rotation;
      /** @type {number} */
      this.totalDelta = 0;
      if (obj instanceof hsw.model.Group) {
         obj.setFlagOn(hsw.model.GroupFlagEnum.boundingOff);
      }
      if (opt_attributes) {
         this.onReceive("dragmove", opt_attributes);
      }
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdRotateContent.prototype.onCleanup = function() {
      var content = this.content;
      if (content instanceof hsw.model.Group) {
         content.setFlagOff(hsw.model.GroupFlagEnum.boundingOff);
      }
   };

   /**
    * @param {string} key
    * @param {Object} attributes
    * @return {?}
    */
   hsw.cmd.content.CmdRotateContent.prototype.onReceive = function(key, attributes) {
      /** @type {boolean} */
      var obj = true;
      switch (key) {
         case "dragend":
            this.mgr.complete(this);
            break;
         case "dragmove":
            ;
         case "hotkey":
            if (isNaN(attributes)) {
               break;
            }
            /** @type {number} */
            var value = (this.lastTargetingAngle + attributes) % 360;
            /** @type {number} */
            this.lastTargetingAngle = value;
            if (this.snapEnabled) {
               value = hsw.util.Math.snapAngle(value);
            }
            this.lastContentAngle = this.content.rotation = value;
            /** @type {number} */
            this.totalDelta = value - this.originalAngle;
            break;
         default:
            obj = hsw.cmd.content.CmdRotateContent.superClass_.onReceive.call(this, key, attributes);
      }
      return obj;
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdRotateContent.prototype._onUndoRedo = function() {
      /** @type {number} */
      this.content.rotation = (this.content.rotation - this.totalDelta) % 360;
      /** @type {number} */
      this.totalDelta = -this.totalDelta;
   };
}