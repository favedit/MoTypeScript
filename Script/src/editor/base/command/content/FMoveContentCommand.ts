import {FCommand} from '../FCommand';

export class FMoveContentCommand extends FCommand {

   // /**
   //  * @param {Object} v
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent = function(v) {
   //    hsw.cmd.Command.call(this);
   //    for (; v.group;) {
   //       v = v.group;
   //    }
   //    /** @type {Object} */
   //    this.content = v;
   //    this.snappedEntity = void 0;
   //    /** @type {number} */
   //    this.snapScreenOffset = 30;
   //    /** @type {number} */
   //    this.snapOffset = this.defaultSnapOffset = 0.2;
   //    /** @type {boolean} */
   //    this.isAutoFit = false;
   //    this.signalHostChanged = sk_create("hsw.util.Signal", hsw.util.Signal);
   // };

   // /**
   //  * @return {?}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.canSuspend = function() {
   //    return false;
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.onCleanup = function() {
   //    /** @type {null} */
   //    this.snappingHelper = null;
   // };

   // /**
   //  * @param {Array} v00
   //  * @param {number} v11
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.move = function(v00, v11) {
   //    var result = this.content;
   //    var vars = this.basePoint;
   //    var shiftPressed = v11.shiftKey;
   //    var hz = result.z;
   //    result.x = vars.x + v00[0];
   //    result.y = vars.y + v00[1];
   //    if (v00[2]) {
   //       result.z = vars.z + v00[2];
   //       if (0 > result.z) {
   //          if (!v11.ctrlKey) {
   //             /** @type {number} */
   //             result.z = 0;
   //          }
   //       }
   //    }
   //    if (shiftPressed) {
   //       this._keepOnXYPlane(hz, v11.vectors);
   //    }
   //    if (!v11.ctrlKey) {
   //       if (this.constraintInRoom) {
   //          this.tryConstrainInRoom(v00);
   //       }
   //       if (this.snappingHelper) {
   //          if (!this.snappingHelper.doSnapping({
   //             snapOffset: this.snapOffset,
   //             autoFitEnable: this.autoFitDirectionEnable,
   //             ignoreSnapOffset: this.ignoreSnapOffset,
   //             vectors: v11.vectors,
   //             notZ: shiftPressed,
   //             defaultGround: this.defaultGround
   //          }).some(function(dataAndEvents) {
   //             return dataAndEvents instanceof hsw.model.CoWall || dataAndEvents instanceof hsw.model.Content ? (this.snappedEntity = dataAndEvents, true) : false;
   //          }, this)) {
   //             this.snappedEntity = void 0;
   //          }
   //       }
   //    }
   // };

   // /**
   //  * @param {?} position
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.moveto = function(position) {
   //    var result = this.content;
   //    if (void 0 !== position.x) {
   //       result.x = position.x;
   //    }
   //    if (void 0 !== position.y) {
   //       result.y = position.y;
   //    }
   //    if (void 0 !== position.z) {
   //       result.z = 0 > position.z ? 0 : position.z;
   //    }
   // };

   // /**
   //  * @param {?} v00
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.tryConstrainInRoom = function(v00) {
   //    if (!(this.content instanceof hsw.model.Opening) && this.room) {
   //       var suiteView = this.room.toPolygon();
   //       if (suiteView && !hsw.util.Math.isPointInPolygon(this.content, suiteView)) {
   //          var client = void 0;
   //          var computed = void 0;
   //          this.content.refreshBoundInternal();
   //          this.content.outline.forEach(function(b) {
   //             var a = hsw.util.Math.closestPointToPolygon(b, suiteView);
   //             if (a) {
   //                var current = hsw.util.Math.pointLength(a, b);
   //                if (void 0 === computed || current > computed) {
   //                   computed = current;
   //                   client = {
   //                      x: a.x - b.x,
   //                      y: a.y - b.y
   //                   };
   //                }
   //             }
   //          });
   //          if (client) {
   //             this.content.x += client.x;
   //             this.content.y += client.y;
   //          }
   //       }
   //       /** @type {number} */
   //       v00 = this.content.ZScale * this.content.ZLength;
   //       if (0 < this.content.z + v00 - this.room.ceilingHeight3d) {
   //          /** @type {number} */
   //          this.content.z = this.room.ceilingHeight3d - v00;
   //       }
   //    }
   // };

   // /**
   //  * @param {Error} v1
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype._autoFitContent = function(v1) {
   //    if (this.autoFitDirectionEnable || this.content instanceof hsw.model.Opening) {
   //       if (hsw.util.Wall.autoFitToWall(v1, this.content)) {
   //          if (this.content instanceof hsw.model.Opening) {
   //             /** @type {boolean} */
   //             this.isAutoFit = true;
   //          }
   //       }
   //    }
   // };

   // /**
   //  * @param {?} a
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype._addToHost = function(a) {
   //    var b = a;
   //    if (a) {
   //       if (a instanceof hsw.model.CoWall) {
   //          b = a.edge;
   //       }
   //    }
   //    if (this.content instanceof hsw.model.Content) {
   //       a = this.content.getHost();
   //       if (a !== b) {
   //          this.content.assignTo(b);
   //          this.signalHostChanged.dispatch({
   //             oldHost: a,
   //             newHost: b
   //          });
   //       }
   //    }
   // };

   // /**
   //  * @param {boolean} $
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.onExecute = function($) {
   //    this.room = hsw.util.Room.getRoomContentIn(this.content);
   //    /** @type {boolean} */
   //    this.constraintInRoom = $ ? !!$.constraintInRoom : false;
   //    this.wallSnapEnable = $ ? $.wallSnapEnable : this.wallSnapEnable;
   //    this.ceilingSnapEnable = $ ? $.ceilingSnapEnable : this.ceilingSnapEnable;
   //    this.contentSnapEnable = $ && void 0 !== $.contentSnapEnable ? !!$.contentSnapEnable : hsw.core.Config.CONTENT_SNAP_ENABLE;
   //    this.floorSnapEnable = $ ? $.floorSnapEnable : this.floorSnapEnable;
   //    this.contentFaceSnappingEnable = $ ? $.contentFaceSnappingEnable : this.contentFaceSnappingEnable;
   //    this.ignoreSnapOffset = $ ? $.ignoreSnapOffset : this.ignoreSnapOffset;
   //    this.defaultGround = $ ? $.defaultGround : this.defaultGround;
   //    /** @type {boolean} */
   //    var b = $ && false === $.select ? false : true;
   //    var autoFitDirectionEnable = this._getDefAutofit();
   //    this.autoFitDirectionEnable = $ && void 0 !== $.autoFitDirectionEnable ? !!$.autoFitDirectionEnable : autoFitDirectionEnable;
   //    this.basePoint = {
   //       x: this.content.x,
   //       y: this.content.y,
   //       z: this.content.z
   //    };
   //    this.snappingHelper = sk_create("hsw.snapping.Helper", hsw.snapping.Helper, this.content, {
   //       wallSnapEnable: this.wallSnapEnable,
   //       ceilingSnapEnable: this.ceilingSnapEnable,
   //       contentSnapEnable: this.contentSnapEnable,
   //       floorSnapEnable: this.floorSnapEnable,
   //       contentFaceSnappingEnable: this.contentFaceSnappingEnable
   //    });
   //    if (b) {
   //       $ = hsw.selection.Manager.instance();
   //       if (!hsw.util.Selection.hasOnlySelected(this.content)) {
   //          $.unselectAll();
   //          $.select(this.content);
   //       }
   //    }
   //    this._saveRestoreData();
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype._onUndoRedo = function() {
   //    var self = this.saved;
   //    this._saveRestoreData();
   //    this.content.x = self.x;
   //    this.content.y = self.y;
   //    this.content.z = self.z;
   //    this.content.rotation = self.rotation;
   //    if (this.content.getHost() !== self.host) {
   //       this.content.assignTo(self.host);
   //    }
   // };

   // /**
   //  * @return {undefined}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype._saveRestoreData = function() {
   //    this.saved = {
   //       x: this.content.x,
   //       y: this.content.y,
   //       z: this.content.z,
   //       rotation: this.content.rotation,
   //       host: this.content.getHost()
   //    };
   // };

   // /**
   //  * @return {?}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.isContentMoved = function() {
   //    return !hsw.util.Math.nearlyEquals(this.saved.x, this.content.x) || (!hsw.util.Math.nearlyEquals(this.saved.y, this.content.y) || (!hsw.util.Math.nearlyEquals(this.saved.z, this.content.z) || this.saved.host !== this.content.getHost()));
   // };

   // /**
   //  * @param {string} type
   //  * @param {Object} e
   //  * @return {?}
   //  */
   // hsw.cmd.content.CmdMoveContent.prototype.onReceive = function(type, e) {
   //    /** @type {boolean} */
   //    var ret = true;
   //    var y;
   //    var x;
   //    switch (type) {
   //       case "dragstart":
   //          this.basePoint = {
   //             x: this.content.x,
   //             y: this.content.y,
   //             z: this.content.z
   //          };
   //          break;
   //       case "mousemove":
   //          if (e.position && (y = e.position[0] - this.basePoint.x, x = e.position[1] - this.basePoint.y, e.offset = 2 < e.position.length ? [y, x, e.position[2] - this.basePoint.z] : [y, x], this.isAutoFit)) {
   //             /** @type {boolean} */
   //             this.isAutoFit = false;
   //             break;
   //          }
   //          ;
   //       case "dragmove":
   //          if (!e.offset) {
   //             return;
   //          }
   //          x = e.offset;
   //          if (e.modelToScreen) {
   //             /** @type {number} */
   //             this.snapOffset = this.snapScreenOffset / e.modelToScreen;
   //          }
   //          if (this.snapOffset > this.defaultSnapOffset) {
   //             this.snapOffset = this.defaultSnapOffset;
   //          }
   //          y = {
   //             ctrlKey: e.event.ctrlKey,
   //             shiftKey: e.event.shiftKey,
   //             vectors: e.vectors
   //          };
   //          this.move(x, y);
   //          y = this.snappedEntity || (e.host || hsw.util.Room.getRoomContentIn(this.content));
   //          this._autoFitContent(y);
   //          this._addToHost(y);
   //          break;
   //       case "mouseup":
   //          ;
   //       case "dragend":
   //          if (this.isContentMoved()) {
   //             this.mgr.complete(this);
   //          } else {
   //             this.mgr.cancel(this);
   //          }
   //          break;
   //       case "moveto":
   //          this.moveto(e.position);
   //          break;
   //       default:
   //          ret = hsw.cmd.content.CmdMoveContent.superClass_.onReceive.call(this, type, e);
   //    }
   //    return ret;
   // };

   // hsw.cmd.content.CmdMoveContent.prototype._keepOnXYPlane = function() {
   //    var geometry = new THREE.PlaneGeometry(1E4, 1E4);
   //    var material = new THREE.MeshBasicMaterial({
   //       side: THREE.DoubleSide
   //    });
   //    var object = new THREE.Mesh(geometry, material);
   //    return function(recurring, array) {
   //       if (array) {
   //          if (!hsw.util.Math.nearlyEquals(object.position.z, recurring)) {
   //             /** @type {number} */
   //             object.position.z = recurring;
   //             object.updateMatrix();
   //             object.updateMatrixWorld();
   //          }
   //          var nodek;
   //          array.some(function(d) {
   //             var vector = new THREE.Vector3(d.start.x, d.start.y, d.start.z);
   //             d = (new THREE.Vector3(d.end.x, d.end.y, d.end.z)).sub(vector).normalize();
   //             vector = (new THREE.Raycaster(vector, d)).intersectObject(object);
   //             if (0 < vector.length) {
   //                return nodek = vector[0], true;
   //             }
   //          });
   //          var current = this.content;
   //          if (nodek) {
   //             current.x = nodek.point.x;
   //             current.y = nodek.point.y;
   //             current.z = nodek.point.z;
   //          } else {
   //             /** @type {number} */
   //             current.z = recurring;
   //          }
   //       }
   //    };
   // } ();

   // hsw.cmd.content.CmdMoveContent.prototype._getDefAutofit = function() {
   //    var set = new Set;
   //    "appliance/refrigerator;bath/cornered bath;build element/background wall;build element/baseboad - ceramic;build element/baseboad - wood;build elements/fireplace;build element/molding;build element/wall upholstery;lighting/wall lamp;shower/floor based shower room;storage unit/armoire;storage unit/dresser;storage unit/floor-based storage unit;storage unit/shelf - floor-based;storage unit/stackable storage unit;storage unit/wall-attached storage unit".split(";").forEach(function(ref) {
   //       set.add(ref);
   //    });
   //    var opts = hsw.catalog.ContentTypeEnum;
   //    /** @type {Array} */
   //    var core_rnotwhite = [/wall-attached/, opts.general_attach_to_wall, opts.sofa, opts.chair, opts.bed, opts.table, opts.mirror, opts.media_unit, opts.cabinet, opts.bath, opts.toilet, opts.basin, opts.vanity, opts.laundry, opts.electronics, opts.curtain];
   //    /** @type {null} */
   //    opts = null;
   //    return function() {
   //       var options = this.content;
   //       return options.type === hsw.catalog.ContentTypeEnum.wall_attachment ? true : (options = options.metadata ? options.metadata.contentType : null) && (options.isTypeOf(core_rnotwhite) || set.has(options.getTypeString()));
   //    };
   // } ();

}
//hsw.cmd.Manager.instance().register(hsw.cmd.content.CmdMoveContent, "hsw.cmd.content.CmdMoveContent", "Move content", ["move"]);
