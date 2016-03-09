import {FCommand} from '../FCommand';

export class FReplaceVariationCommand extends FCommand {
   // /**
   //  * @param {?} content
   //  * @param {?} dataAndEvents
   //  * @param {Object} meta
   //  * @return {undefined}
   //  */
   // public constructor(content, dataAndEvents, meta) {
   //    super();
   //    this.content = content;
   //    this.variationId = dataAndEvents;
   //    /** @type {Object} */
   //    this.meta = meta;
   // };

   // /**
   //  * @return {undefined}
   //  */
   // public onExecute() {
   //    if (this.variationId && (this.content && this.variationId !== this.content.variationId)) {
   //       var that = this.getVariationData();
   //       if (that) {
   //          this.saved[this.content.ID] = this.content.save();
   //          if (!(this.content instanceof hsw.model.Opening)) {
   //             this.content.topView = that.files.topView;
   //             this.content.model3d = that.files.modelGzNormalized || that.files.modelGz;
   //          }
   //          this.content.modelTexture = that.files.modelPng;
   //          this.content.variationId = this.variationId;
   //          this.mgr.complete(this);
   //       } else {
   //          assert(false, "expected variation id - " + this.variationId + " is not exists");
   //          this.mgr.cancel(this);
   //       }
   //    } else {
   //       this.mgr.cancel(this);
   //    }
   // };

   // /**
   //  * @return {?}
   //  */
   // public getVariationData() {
   //    return this.meta.variations.find(function(ignores) {
   //       return ignores.id === this.variationId;
   //    }, this);
   // };
}
//hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdReplaceVariation, "hsw.cmd.content.CmdReplaceVariation", "Replace Content Variation", []);
