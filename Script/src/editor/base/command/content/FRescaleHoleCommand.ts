import {FCommand} from '../FCommand';

export class FRescaleHoleCommand extends FCommand {

   /**
    * @param {?} dataAndEvents
    * @param {Object} config
    * @return {undefined}
    */
   hsw.cmd.content.CmdRescaleHole = function(dataAndEvents, config) {
      hsw.cmd.Command.call(this);
      this.hole = dataAndEvents;
      this.paramData = this.hole.paramData;
      /** @type {Object} */
      this.config = config;
   };
   goog.inherits(hsw.cmd.content.CmdRescaleHole, hsw.cmd.Command);

   hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdRescaleHole, "hsw.cmd.content.CmdRescaleHole", "Rescale Hole as Profile Config", []);
   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdRescaleHole.prototype.onExecute = function() {
      this.savedParams = this.hole.saveParams();
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._onUndoRedo = function() {
      var savedParams = this.hole.saveParams();
      this.hole.loadParams(this.savedParams);
      this.paramData = this.savedParams;
      this.savedParams = savedParams;
      this._updateHoleProfile();
   };

   /**
    * @param {string} key
    * @param {Object} attributes
    * @return {?}
    */
   hsw.cmd.content.CmdRescaleHole.prototype.onReceive = function(key, attributes) {
      /** @type {boolean} */
      var obj = false;
      switch (key) {
         case hsw.cmd.content.CmdRescaleHoleEnum.parameter:
            this._updateParameter(attributes.parameter, attributes.value);
            this._updateHoleProfile();
            /** @type {boolean} */
            obj = true;
            break;
         default:
            obj = hsw.cmd.content.CmdRescaleHole.superClass_.onReceive.call(this, key, attributes);
      }
      return obj;
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._updateHoleProfile = function() {
      this._updateHoleBounding();
      var text = this.config.template;
  /** @type {RegExp} */  var cx = /\${([^}]+)}/;
      var replacement;
      for (; replacement = cx.exec(text);) {
         replacement = hsw.util.Math.toPersistentPrecision(this._evaluateExp(replacement[1]));
         text = text.replace(cx, replacement);
      }
      this.hole.profile = text;
   };

   /**
    * @return {undefined}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._updateHoleBounding = function() {
      this.hole.XLength = this._evaluateExp(this.config.XLength);
      this.hole.ZLength = this._evaluateExp(this.config.ZLength);
   };

   /**
    * @param {string} text
    * @return {?}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._evaluateExp = function(text) {
      /** @type {RegExp} */
      var cx = /#([^#]+)#/;
      var value;
      for (; value = cx.exec(text);) {
         value = this._getParameter(value[1]).value;
         text = text.replace(cx, value);
      }
      return eval(text);
   };

   /**
    * @param {?} deepDataAndEvents
    * @return {?}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._getParameter = function(deepDataAndEvents) {
      return this._getItemById(deepDataAndEvents, this.paramData);
   };

   /**
    * @param {?} deepDataAndEvents
    * @return {?}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._getParamConfig = function(deepDataAndEvents) {
      return this._getItemById(deepDataAndEvents, this.config.parameters);
   };

   /**
    * @param {?} deepDataAndEvents
    * @param {Array} a
    * @return {?}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._getItemById = function(deepDataAndEvents, a) {
      /** @type {number} */
      var idx = 0;
      var len = a.length;
      for (; idx < len; idx++) {
         var next = a[idx];
         if (next.id === deepDataAndEvents) {
            return next;
         }
      }
   };

   /**
    * @param {?} deepDataAndEvents
    * @param {number} r
    * @return {undefined}
    */
   hsw.cmd.content.CmdRescaleHole.prototype._updateParameter = function(deepDataAndEvents, r) {
      var me = this._getParameter(deepDataAndEvents);
      if (this.hole.isFlagOn(hsw.model.ContentFlagEnum.scaleProportionConstrain)) {
         var sum = me.value;
         this.paramData.forEach(function(d) {
            /** @type {number} */
            d.value = d.value / sum * r;
         });
      } else {
         /** @type {number} */
         me.value = r;
      }
   };
}