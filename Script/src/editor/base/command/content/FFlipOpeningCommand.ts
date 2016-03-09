import {FCommand} from '../FCommand';

export class FFlipOpeningCommand extends FCommand {

   /**
    * @param {Object} data
    * @param {string} dataAndEvents
    * @return {undefined}
    */
   public constructor(data, dataAndEvents) {
      super();
      assert(data && data instanceof hsw.model.Opening, "Only openings could be flipped.");
      /** @type {Object} */
      this.opening = data;
      /** @type {string} */
      this.isVertical = dataAndEvents;
   };

   public onExecute() {
      var transitions = {
         vertical: [1, 0, 3, 2],
         horizontal: [3, 2, 1, 0]
      };
      return function() {
         if (!this.opening) {
            this.mgr.cancel(this);
         }
         this.saved[this.opening.ID] = this.opening.save();
         this.opening.swing = transitions[this.isVertical ? "vertical" : "horizontal"][this.opening.swing];
         this.mgr.complete(this);
      };
   } ();
}

hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdFlipOpening, "hsw.cmd.content.CmdFlipOpening", "Flip openings", []);
