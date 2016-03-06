import {FCommand} from './FCommand';

export class FCompositeCommand extends FCommand{
   // hsw.cmd.CompositeCommand = function(dataAndEvents) {
   //    hsw.cmd.Command.call(this);
   //    this.subs = dataAndEvents || [];
   // };
   // goog.inherits(hsw.cmd.CompositeCommand, hsw.cmd.Command);

   // public onExecute = function(o, deepDataAndEvents, onComplete, errorFn, shallow) {
   //    this.subs.forEach(function(t) {
   //       t.onExecute(o, deepDataAndEvents, onComplete, errorFn, shallow);
   //    });
   // };

   // public onUndo = function() {
   //    /** @type {number} */
   //    var uid = this.subs.length - 1;
   //    for (; 0 <= uid; uid--) {
   //       this.subs[uid].onUndo();
   //    }
   // };

   // public onRedo = function() {
   //    this.subs.forEach(function(dataAndEvents) {
   //       dataAndEvents.onRedo();
   //    });
   // };

   // public onCleanup = function() {
   //    this.subs.forEach(function(dataAndEvents) {
   //       dataAndEvents.onCleanup();
   //    });
   // };

   // public receive = function(name, opt_attributes, userid, data, serviceName) {
   //    var coords = this.onReceive(name, opt_attributes, userid, data, serviceName);
   //    if (void 0 === coords) {
   //       /** @type {Array} */
   //       coords = [];
   //    } else {
   //       if (false === coords) {
   //          return;
   //       }
   //    }
   //    this.subs.forEach(function(me) {
   //       me.receive(coords[0], coords[1], coords[2], coords[3], coords[4]);
   //    });
   // };

   // public onReceive = function(keepData, opt_attributes, userid, chunk, serviceName) {
   //    return [keepData, opt_attributes, userid, chunk, serviceName];
   // };
}