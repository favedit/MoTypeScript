import {FCommand} from '../FCommand';

export class FScaleCommand extends FCommand{

   /**
    * @param {(number|string)} a
    * @return {undefined}
    */
   hsw.cmd.content.CmdScaleContent = function(a) {
      hsw.cmd.Command.call(this);
      var b = hsw.selection.Manager.instance().selected()[0];
      if (b) {
         assert(b instanceof hsw.model.Content);
      }
      this.content = a || b;
   };
   goog.inherits(hsw.cmd.content.CmdScaleContent, hsw.cmd.Command);

   hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdScaleContent, "hsw.cmd.content.CmdScaleContent", "Scale Content", []);
   /**
    * @param {number} a
    * @param {number} b
    * @param {number} I
    * @return {undefined}
    */
   public scale(a, b, I) {
      var sphereBoard = this.content;
      /** @type {number} */
      sphereBoard.XScale = a / sphereBoard.XLength;
      /** @type {number} */
      sphereBoard.YScale = b / sphereBoard.YLength;
      /** @type {number} */
      sphereBoard.ZScale = I / sphereBoard.ZLength;
   };

   /**
    * @param {Array} p
    * @param {?} h
    * @return {?}
    */
   public scalewithbase(p, h) {
      var pos = this.content;
      var v = {
         x: 0,
         y: 0
      };
      var abs_v = hsw.util.Math.rotatePointCW(v, {
         x: p[0],
         y: p[1]
      }, -pos.rotation);
      if (0 === h.x) {
         /** @type {number} */
         abs_v.x = 0;
      }
      if (0 === h.y) {
         /** @type {number} */
         abs_v.y = 0;
      }
      /** @type {number} */
      var locY = abs_v.x * h.x + pos.XLength * this.cscale.x;
      /** @type {number} */
      var YScale = abs_v.y * h.y + pos.YLength * this.cscale.y;
      if (0 >= locY || 0 >= YScale) {
         return false;
      }
      /** @type {number} */
      pos.XScale = locY / pos.XLength;
      /** @type {number} */
      pos.YScale = YScale / pos.YLength;
      abs_v.x *= 0.5;
      abs_v.y *= 0.5;
      v = hsw.util.Math.rotatePointCW(v, abs_v, pos.rotation);
      pos.x = this.contentpos.x + v.x;
      pos.y = this.contentpos.y + v.y;
   };

   /**
    * @return {undefined}
    */
   public reset() {
      var content = this.content;
      /** @type {number} */
      content.XScale = 1;
      /** @type {number} */
      content.YScale = 1;
      /** @type {number} */
      content.ZScale = 1;
   };

   /**
    * @param {Object} second
    * @return {undefined}
    */
   public onExecute(second) {
      this.saved[this.content.ID] = this.content.save();
   };

   /**
    * @param {string} name
    * @param {Object} attributes
    * @return {?}
    */
   public onReceive(name, attributes) {
      /** @type {boolean} */
      var el = true;
      switch (name) {
         case "scale":
            this.scale(attributes.x, attributes.y, attributes.z);
            break;
         case "reset":
            this.reset();
            break;
         case "dragstart":
            ;
         case "dragmove":
            ;
         case "dragend":
            ;
         case "click":
            if ("dragstart" === name && "dragscale" === attributes.scaletype) {
               this.contentpos = {
                  x: this.content.x,
                  y: this.content.y
               };
               this.cscale = {
                  x: this.content.XScale,
                  y: this.content.YScale,
                  z: this.content.ZScale
               };
            } else {
               if (this.content !== attributes.entity) {
                  this.mgr.complete();
               }
            }
            /** @type {boolean} */
            el = false;
            break;
         case "scalewithbase":
            this.scalewithbase(attributes.offset, attributes.flag);
            break;
         case hsw.app.ViewEventTypeEnum.active:
            /** @type {boolean} */
            el = false;
            break;
         default:
            el = hsw.cmd.content.CmdScaleContent.superClass_.onReceive.call(this, name, attributes);
      }
      return el;
   };
}