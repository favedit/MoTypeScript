export class FSelectionConsole {

   public _pickResultByEntityId = {};
   public signalSelectionChanged = null;

   public constructor() {
      this._pickResultByEntityId = {};
      //this.signalSelectionChanged = new hsw.util.Signal(this);
   };

   public static _instance;
   public static instance() {
      this._instance = this._instance || new FSelectionConsole();
      return this._instance;
   };

   public select(item, onComplete) {
      // assert(item instanceof hsw.core.brep.Entity, "usage error.");
      // if (item) {
      //    for (; item.group;) {
      //       item = item.group;
      //    }
      //    if (item.canSelect()) {
      //       item.setFlagOn(hsw.core.brep.EntityFlagEnum.selected);
      //       this._pickResultByEntityId[item.ID] = sk_create("hsw.selection.PickResult", hsw.selection.PickResult, item, onComplete);
      //       this.signalSelectionChanged.dispatch();
      //    }
      // }
   }

   public unselect(item) {
      // assert(item instanceof hsw.core.brep.Entity, "usage error.");
      // if (item) {
      //    for (; item.group;) {
      //       item = item.group;
      //    }
      //    item.setFlagOff(hsw.core.brep.EntityFlagEnum.selected);
      //    delete this._pickResultByEntityId[item.ID];
      //    this.signalSelectionChanged.dispatch();
      // }
   }

   public unselectAll() {
      var self = this;
      Object.keys(this._pickResultByEntityId).forEach(function(timeoutKey) {
         self.unselect(self._pickResultByEntityId[timeoutKey].entity);
      });
   };

   public hasSelected(item) {
      //assert(item && item instanceof hsw.core.brep.Entity, "usage error.");
      if (!item) {
         return false;
      }
      for (; item.group;) {
         item = item.group;
      }
      return void 0 !== this._pickResultByEntityId[item.ID];
   };

   public pickResultById(timeoutKey) {
      return this._pickResultByEntityId[timeoutKey];
   };

   public selected(dataAndEvents) {
      var proto = this;
      var key = false !== dataAndEvents;
      return Object.keys(this._pickResultByEntityId).map(function(i) {
         return key ? proto._pickResultByEntityId[i].entity : proto._pickResultByEntityId[i];
      });
   };

}