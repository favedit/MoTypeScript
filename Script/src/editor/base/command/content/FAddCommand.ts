import {FContent} from '../../model/FContent';
import {FCommand} from '../FCommand';

export class FAddCommand extends FCommand{
   // // 内容对象
   // public content: FContent = null;

   // /**
   //  * @param {?} e
   //  * @param {Object} transform
   //  * @param {(number|string)} dataAndEvents
   //  * @return {undefined}
   //  */
   // public constructor(contentInfo, position, rotation) {
   //    super();
   //    //fassert(contentInfo);
   //    this._position = position || {x: 0, y: 0, z: void 0};
   //    this._rotation = rotation || 0;
   //    this._contentInfo = contentInfo;
   //    //assert(this._contentInfo, "Can not get content infomation from Catalog Manager");
   // };

   // /**
   //  * @return {undefined}
   //  */
   // public onExecute() {
   //    //log("add content, id=" + this._contentInfo.seekId + ", location=[" + this._position.x + ", " + this._position.y + "].", LogLevelEnum.info, "hsw.cmd.content.CmdAddContent");
   //    /** @type {function (): undefined} */
   //    var Content = hsw.model.Content;
   //    switch (this._contentInfo.entityType) {
   //       case hsw.catalog.ContentTypeEnum.door:
   //          /** @type {function (): undefined} */
   //          Content = hsw.model.Door;
   //          break;
   //       case hsw.catalog.ContentTypeEnum.window:
   //          /** @type {function (): undefined} */
   //          Content = hsw.model.Window;
   //          break;
   //       case hsw.catalog.ContentTypeEnum.hole:
   //          /** @type {function (): undefined} */
   //          Content = hsw.model.Hole;
   //    }
   //    this.content = new Content;
   //    this.content.initByMeta(this._contentInfo);
   //    this.content.x = this._position.x;
   //    this.content.y = this._position.y;
   //    if ("undefined" !== typeof this._position.z) {
   //       this.content.z = this._position.z;
   //    } else {
   //       if (this.content.type === hsw.catalog.ContentTypeEnum.ceiling_attachment || this.content.type === hsw.catalog.ContentTypeEnum.ceiling) {
   //          Content = hsw.app.Base.getApp().floorplan;
   //          /** @type {number} */
   //          this.content.z = Content.global_wall_height3d - this.content.ZLength * this.content.ZScale;
   //       }
   //    }
   //    this.content.rotation = this._rotation;
   //    this.saved[this.content.ID] = this.content.save();
   //    Content = hsw.app.Base.getApp().floorplan;
   //    Content.addChild(this.content);
   // };

   // /**
   //  * @return {undefined}
   //  */
   // public onCleanup = function() {
   //    delete this._contentInfo;
   // };

   // /**
   //  * @param {string} dataName
   //  * @param {Object} attributes
   //  * @return {?}
   //  */
   // public onReceive(dataName, attributes) {
   //    var o = attributes.event;
   //    var node = this.content;
   //    var a = attributes.pick ? attributes.pick.reduce(function(result, data) {
   //       if (!result) {
   //          if (data.ID !== node.ID) {
   //             /** @type {Element} */
   //             result = data;
   //          }
   //       }
   //       return result;
   //    }, void 0) : void 0;
   //    if ("mouseup" === dataName) {
   //       if (node instanceof hsw.model.Opening) {
   //          if (!(a instanceof hsw.model.Wall)) {
   //             this.mgr.cancel();
   //          }
   //       }
   //       this.mgr.complete();
   //    } else {
   //       if ("mousemove" === dataName && 0 === o.button) {
   //          node.x = attributes.position[0];
   //          node.y = attributes.position[1];
   //          node.assignTo(a);
   //          if (node instanceof hsw.model.Opening) {
   //             if (a && a instanceof hsw.model.Wall) {
   //                o = hsw.util.Math.getPerpendicularIntersect(node, a.from, a.to);
   //                node.x = o.x;
   //                node.y = o.y;
   //                node.rotation = hsw.util.Math.getAngleHorizontaleCCW(a.from, a.to);
   //             } else {
   //                if (!(a && a instanceof hsw.model.Room)) {
   //                   node.assignTo(null);
   //                }
   //             }
   //          }
   //       } else {
   //          return hsw.cmd.content.CmdAddContent.superClass_.onReceive.call(this, dataName, attributes);
   //       }
   //    }
   // };
}

//hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdAddContent, "hsw.cmd.group.CmdAddContent", "Add content", []);
