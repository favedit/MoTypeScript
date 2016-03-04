import {EntityFlagEnum} from './EntityFlagEnum';
import {EntityEventEnum} from './EntityEventEnum';
import {Entity} from './Entity';

/** @type {string} *//**
 * @param {Object} c
 * @return {undefined}
 */
export class CoEdge extends Entity {
   public edge = null;
   //public partner = null;
   public reversed = null;
   public __prev = null;
   public __next = null;
   public __partner = null;


   public constructor(c) {
      super();
      //assert(c && (!c.coedge || !c.coedge.partner), "Invalid CoEdge is created!");
      //hsw.core.brep.Entity.call(this);
      /** @type {Object} */
      this.edge = c;
      if (c.coedge) {
         this.partner = c.coedge;
         /** @type {boolean} */
         this.reversed = !c.coedge.reversed;
      } else {
         c.coedge = this;
         /** @type {boolean} */
         this.reversed = false;
      }
      this.addChild(c.from, false);
      this.addChild(c.to, false);
   }
   //goog.inherits(hsw.core.brep.CoEdge, hsw.core.brep.Entity);

   public Class = "hsw.core.brep.CoEdge";
   /** @type {string} *//**
    * @param {?} owner
    * @param {?} cl
    * @return {?}
    */
   public static create(owner, cl) {
      //assert(owner instanceof hsw.core.brep.Vertex && cl instanceof hsw.core.brep.Vertex);
      var r20 = new hsw.core.brep.Edge(owner, cl);
      return new hsw.core.brep.CoEdge(r20);
   };

   public get bound() {
      return this.edge.bound;
   }

   public get prev() {
      return this.__prev;
   }

   public set prev(opt_attributes) {
      var graphics = this.__prev;
      if (graphics !== opt_attributes) {
         this.__prev = opt_attributes;
         this.onFieldChanged("prev", graphics, opt_attributes);
         if (graphics) {
            if (graphics.next === this) {
               graphics.next = void 0;
            }
         }
         if (opt_attributes) {
            opt_attributes.next = this;
         }
      }
   }

   public get next() {
      return this.__next;
   }

   public set next(opt_attributes) {
      var graphics = this.__next;
      if (graphics !== opt_attributes) {
         this.__next = opt_attributes;
         this.onFieldChanged("next", graphics, opt_attributes);
         if (graphics) {
            if (graphics.prev === this) {
               graphics.prev = void 0;
            }
         }
         if (opt_attributes) {
            opt_attributes.prev = this;
         }
      }
   }

   public get from() {
      return this.reversed ? this.edge.to : this.edge.from;
   }

   public set from(opt_attributes) {
      if (this.reversed) {
         this.edge.to = opt_attributes;
      } else {
         this.edge.from = opt_attributes;
      }
   }

   public get to() {
      return this.reversed ? this.edge.from : this.edge.to;
   }

   public set to(opt_attributes) {
      if (this.reversed) {
         this.edge.from = opt_attributes;
      } else {
         this.edge.to = opt_attributes;
      }
   }

   public get partner() {
      return this.__partner;
   }

   public set partner(opt_attributes) {
      if (opt_attributes !== this.__partner) {
         if (opt_attributes !== this) {
            if (this.__partner = opt_attributes) {
               opt_attributes.partner = this;
            }
         }
      }
   }

   public get fromTangent() {
      return (goog as any).math.Vec2.fromCoordinate(this.from).subtract(this.to);
   }

   public get toTangent() {
      return (goog as any).math.Vec2.fromCoordinate(this.to).subtract(this.from);
   }

   public get direction() {
      return (goog as any).math.Vec2.fromCoordinate(this.to).subtract(this.from);
   }

   public get middle() {
      return this.edge.middle;
   }

   public get length() {
      return this.edge.length;
   }

   public get rotation() {
      return -hsw.util.Math.getAngleHorizontaleCCW(this.from, this.to);
   }

   /**
    * @return {?}
    */
   public isValid() {
      return this.parents[Object.keys(this.parents)[0]] && (!this.isFlagOn(EntityFlagEnum.removed) && !this.isFlagOn(EntityFlagEnum.hidden));
   };

   /**
    * @return {undefined}
    */
   public onEntityDirty() {
      super.onEntityDirty.call(this);
      /** @type {boolean} */
      this.edge._boundDirty = true;
   };

   /**
    * @param {string} item
    * @param {Object} graphics
    * @param {?} opt_attributes
    * @return {undefined}
    */
   public onFieldChanged(item, graphics: any, opt_attributes) {
      this.dispatchEvent(new goog.events.Event(EntityEventEnum.fieldChanged, {
         fieldName: item,
         oldValue: graphics,
         newValue: opt_attributes
      }));
      /** @type {boolean} */
      var thisObj = "next" === item || "prev" === item;
      if (item = "from" === item || "to" === item) {
         (this as any).replaceChild(graphics ? graphics.ID : void 0, opt_attributes);
      }
      if (thisObj || item) {
         this._invalidateSubgraph();
      }
   };

   /**
    * @param {?} node
    * @param {boolean} recurring
    * @return {?}
    */
   public removeChild(node, recurring) {
      var value = super.removeChild.call(this, node, recurring);
      if (value) {
         if (value instanceof hsw.model.Point) {
            value._invalidateSubgraph();
         }
      }
      return value;
   };

   /**
    * @param {boolean} recurring
    * @return {undefined}
    */
   public removeAllChildren(recurring) {
      super.removeAllChildren.call(this, recurring);
      this.edge.removeAllChildren(recurring);
   };

   /**
    * @return {?}
    */
   public getConnectedEdges() {
      /** @type {Array} */
      var schema: any = [];
      var origin = this;
      /**
       * @param {?} module
       * @return {undefined}
       */
      var test = function(module) {
         Object.keys(module.parents).forEach(function(s: any) {
            s = module.parents[s];
            //assert(s && s instanceof hsw.core.brep.CoEdge);
            if (!(s === origin)) {
               if (!schema.includes(s)) {
                  schema.push(s);
               }
            }
         });
      };
      test(this.from);
      test(this.to);
      return schema;
   };

   /**
    * @return {undefined}
    */
   public updateConnectedEdges() {
      var self: any = this.getConnectedEdges();
      self.forEach(function(b) {
         if (b.isValid()) {
            b.onEntityDirty();
            if (b.prev && !self.includes(b.prev)) {
               b.prev.onEntityDirty();
            }
            if (b.next && !self.includes(b.next)) {
               b.next.onEntityDirty();
            }
         }
      });
   };

   /**
    * @param {?} o
    * @return {?}
    */
   public dump() {
      var that = super.dump();
      that.edge = this.edge ? this.edge.ID : void 0;
      that.partner = this.partner ? this.partner.ID : void 0;
      that.reversed = this.reversed;
      that.next = this.next ? this.next.ID : void 0;
      that.prev = this.prev ? this.prev.ID : void 0;
      return [that].concat(this.edge.dump());
   };
}