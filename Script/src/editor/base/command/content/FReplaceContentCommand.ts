import {FCommand} from '../FCommand';

export class FReplaceContentCommand extends FCommand {
   // /**
   //  * @param {Object} dataAndEvents
   //  * @param {?} deepDataAndEvents
   //  * @param {Object} transform
   //  * @param {(number|string)} rotation
   //  * @return {undefined}
   //  */
   // public constructor(dataAndEvents, deepDataAndEvents, transform, rotation) {
   //    super();
   //    this.newEntity = void 0;
   //    /** @type {Object} */
   //    this._toBeReplaced = dataAndEvents;
   //    this._contentInfo = deepDataAndEvents;
   //    this._position = transform || {
   //       x: this._toBeReplaced.x,
   //       y: this._toBeReplaced.y,
   //       z: this._toBeReplaced.z
   //    };
   //    this._rotation = rotation || this._toBeReplaced.rotation;
   // };

   // /**
   //  * @return {undefined}
   //  */
   // public onExecute() {
   //    var out = this.subs;
   //    var that = this.mgr;
   //    var copies;
   //    var query;
   //    var opt = hsw.selection.Manager.instance();
   //    this.selected = opt.selected()[0];
   //    if (this._toBeReplaced instanceof hsw.model.Group) {
   //       copies = that.createCommand(hsw.cmd.group.CmdDeleteGroup, this._toBeReplaced);
   //    } else {
   //       if (this._toBeReplaced.group) {
   //          this.currentGroup = this._toBeReplaced.group;
   //          this.currentGroup.remove(this._toBeReplaced);
   //       }
   //       copies = that.createCommand(hsw.cmd.content.CmdDeleteContent, this._toBeReplaced);
   //    }
   //    query = this._contentInfo.entityType === hsw.catalog.ContentTypeEnum.assembly ? that.createCommand(hsw.cmd.group.CmdAddAssembly, this._contentInfo, this._position, this._rotation) : that.createCommand(hsw.cmd.content.CmdAddContent, this._contentInfo, this._position, this._rotation);
   //    out.push(copies, query);
   //    hsw.cmd.content.CmdReplaceContent.superClass_.onExecute.call(this);
   //    this.newEntity = query.content || query.group;
   //    if (this.currentGroup) {
   //       this.currentGroup.add(this.newEntity);
   //    }
   //    if (this.selected) {
   //       opt.unselectAll();
   //       opt.select(this.currentGroup || this.newEntity);
   //    }
   //    that.complete(this);
   // };

   // /**
   //  * @return {?}
   //  */
   // public canUndoRedo() {
   //    return false;
   // };
}

//hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdReplaceContent, "hsw.cmd.content.CmdReplaceContent", "Replace content or assembly", []);
