import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectIdUtil} from '../../../runtime/common/lang/ObjectIdUtil';
import {Listeners} from '../../../runtime/common/lang/Listeners';
import {FNode} from '../../../runtime/framework/FNode';
//import {EntityFlagEnum} from './EntityFlagEnum';
//import {EntityEventEnum} from "./EntityEventEnum";
//import {Signal} from "../../util/Signal";
//import {Bound} from "./Bound";
//import * as core from '../package';

//==========================================================
// <T>实体。</T>
//==========================================================
export class FEntity extends FNode {
   // 实体编号
   public entityId: number = 0;
   // 实体编号
   // public children: FObjects<FEntity> = null;
   // 脏监听
   // public listenersDirty: FListeners = null;
   // _tempFlag: number;
   // _flag: number;
   // parents: {};
   // children: {};
   // boundInternal: any;
   // outline = [];
   // _boundDirty: boolean;
   // cache: {};
   // database: any = {};
   // userDefined: {};
   // signalDirty: any;

   //ID: any;
   //_fieldChangedCallback: any;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.entityId = ObjectIdUtil.nextId('entity');
      //this.listenersDirty = new FListeners(this);
      //this.children = new FObjects<FEntity>();
      //core.Id(this);
      // this._tempFlag = this._flag = 0;
      // this.parents = {};
      // this.children = {};
      // this.boundInternal = new hsw.core.brep.Bound(Infinity, Infinity, 0, 0);
      // this.outline = [];
      // this._boundDirty = !0;
      // this.cache = {};
      // this.database[this.ID] = this;
      // this.userDefined = {};
      // //this.signalDirty = new Signal(this)
      // this.signalDirty = new hsw.util.Signal(this);
   }

   //==========================================================
   // <T>增加一个子节点。</T>
   //==========================================================
   // public addChild(entity, recurring) {
   //    var children = this.children;
   //    if (children.contains(entity)) {
   //       // this.dispatchEvent(new goog.events.Event(EntityEventEnum.childAdded, {entity: obj})
   //    }
   //    // if (!this.children[obj.ID]) {
   //    //    return
   //    //       this.children[obj.ID] = obj, obj.parents[this.ID] = this,
   //    //       false !== recurring && (this.dispatchEvent(new goog.events.Event(EntityEventEnum.childAdded, {entity: obj})), obj._dispatchInvalidateSubgraph(true)),
   //    //       obj;
   //    // }
   // };


   // public clone(target?, deepDataAndEvents?, obj?, method?) {
   //    var o = new (eval((this as any).Class));
   //    o.restore(this.save());
   //    return o;
   // };

   // isFlagOn(deepDataAndEvents) {
   //    return hsw.util.Flag.isFlagOn(this._flag, deepDataAndEvents) || hsw.util.Flag.isFlagOn(this._tempFlag, deepDataAndEvents);
   // }

   // isFlagOff(deepDataAndEvents) {
   //    return hsw.util.Flag.isFlagOff(this._flag, deepDataAndEvents) && hsw.util.Flag.isFlagOff(this._tempFlag, deepDataAndEvents);
   // }

   // setFlagOn(dataAndEvents, deepDataAndEvents?) {
   //    var isFlagOn = this.isFlagOn(dataAndEvents);
   //    if (deepDataAndEvents) {
   //       this._tempFlag = hsw.util.Flag.setFlagOn(this._tempFlag, dataAndEvents);
   //    } else {
   //       this._flag = hsw.util.Flag.setFlagOn(this._flag, dataAndEvents);
   //    }
   //    if (!isFlagOn) {
   //       this.onFlagChanged(dataAndEvents);
   //    }
   // }

   // setFlagOff(deepDataAndEvents, dataAndEvents?) {
   //    var isFlagOff = this.isFlagOff(deepDataAndEvents);
   //    if (dataAndEvents) {
   //       this._tempFlag = hsw.util.Flag.setFlagOff(this._tempFlag, deepDataAndEvents);
   //    } else {
   //       this._flag = hsw.util.Flag.setFlagOff(this._flag, deepDataAndEvents);
   //    }
   //    if (isFlagOff !== this.isFlagOff(deepDataAndEvents)) {
   //       this.onFlagChanged(deepDataAndEvents);
   //    }
   // }

   // defineField(key, expectedNumberOfNonCommentArgs: any = null) {
   //    Object.defineProperty(this, key, {
   //       //writable: true,
   //       enumerable: true,
   //       configurable: false,
   // 		/**
   // 		 * @return {?}
   // 		 */
   //       get: function() {
   //          return this["__" + key];
   //       },
   // 		/**
   // 		 * @param {?} opt_attributes
   // 		 * @return {undefined}
   // 		 */
   //       set: function(opt_attributes) {
   //          var capture = this["__" + key];
   //          this["__" + key] = opt_attributes;
   //          if (this._fieldChangedCallback[key]) {
   //             this._fieldChangedCallback[key](this, key, capture, opt_attributes);
   //          }
   //       }
   //    });
   //    this._fieldChangedCallback = this._fieldChangedCallback || {};
   //    this._fieldChangedCallback[key] = expectedNumberOfNonCommentArgs || hsw.core.brep.Entity.defaultFieldChangedCallback;
   // };


   // defineReadonlyField(name, dataAndEvents) {
   //    Object.defineProperty(this, name, {
   //       //	writable: false,
   //       enumerable: true,
   //       configurable: false,
   // 		/**
   // 		 * @return {?}
   // 		 */
   //       get: function() {
   //          return this["__" + name];
   //       },
   // 		/**
   // 		 * @param {?} opt_attributes
   // 		 * @return {undefined}
   // 		 */
   //       set: function(opt_attributes) {
   //          //assert(false, "trying to assign value to a readonly field");
   //       }
   //    });
   //    this["__" + name] = dataAndEvents;
   // };

   // isValid(): boolean {
   //    return true;
   // };

   // public static defaultFieldChangedCallback(dataAndEvents, datum, graphics, attributes) {
   //    dataAndEvents.onFieldChanged(datum, graphics, attributes);
   // };

   // onFieldChanged(item, graphics, opt_attributes) {
   //    //assert(false, "Override this function");
   // };

   // onEntityDirty() {
   //    this.signalDirty.dispatch();
   //    this.dispatchEvent(new goog.events.Event(EntityEventEnum.entityDirty));
   // };

   // onFlagChanged(deepDataAndEvents) {
   //    this.dispatchEvent(new goog.events.Event(EntityEventEnum.flagChanged, {
   //       flag: deepDataAndEvents
   //    }));
   // };

   // _invalidateSubgraph() {
   //    this.onEntityDirty();
   //    var i;
   //    for (i in this.parents) {
   //       this.parents[i]._invalidateSubgraph();
   //    }
   // };

   // hasChild(allow) {
   //    return void 0 !== this.children[allow.ID];
   // };

   // addChild(obj, recurring) {
   //    if (!this.children[obj.ID]) {
   //       return this.children[obj.ID] = obj, obj.parents[this.ID] = this, false !== recurring && (this.dispatchEvent(new goog.events.Event(EntityEventEnum.childAdded, {
   //          entity: obj
   //       })), obj._dispatchInvalidateSubgraph(true)), obj;
   //    }
   // };

   // removeAllChildren(recurring) {
   //    /** @type {boolean} */
   //    recurring = false !== recurring;
   //    var i;
   //    for (i in this.children) {
   //       this.removeChild(this.children[i].ID, recurring);
   //    }
   // };

   // removeChild(node, recurring) {
   //    return this._removeChild(node, recurring, true);
   // };

   // public _dispatchInvalidateSubgraph(deepDataAndEvents) {
   //    var key = deepDataAndEvents ? EntityEventEnum.childAdded : EntityEventEnum.childRemoved;
   //    var n;
   //    for (n in this.children) {
   //       var obj = this.children[n];
   //       this.dispatchEvent(new goog.events.Event(key, {
   //          entity: obj
   //       }));
   //       obj._dispatchInvalidateSubgraph(deepDataAndEvents);
   //    }
   // };

   // _removeChild(index, recurring, dataAndEvents) {
   //    /** @type {boolean} */
   //    var dispatchEvent = false !== recurring;
   //    /** @type {boolean} */
   //    dataAndEvents = false !== dataAndEvents;
   //    var obj = this.children[index];
   //    if (obj) {
   //       return delete obj.parents[this.ID], delete this.children[index], 0 === Object.keys(obj.parents).length && (dataAndEvents && obj.removeAllChildren(recurring), dispatchEvent && this.dispatchEvent(new goog.events.Event(EntityEventEnum.childRemoved, {
   //          entity: obj
   //       }))), obj;
   //    }
   // };

   // replaceChild(node, walkers, newChild) {
   //    /** @type {boolean} */
   //    newChild = false !== newChild;
   //    node = this.removeChild(node, true);
   //    if (walkers) {
   //       this.addChild(walkers, true);
   //    }
   //    if (newChild) {
   //       this.dispatchEvent(new goog.events.Event(EntityEventEnum.childReplaced, {
   //          oldChild: node,
   //          newChild: walkers
   //       }));
   //    }
   //    return node;
   // };

   // replaceParent(optionsString, dataAndEvents, recurring) {
   //    /** @type {boolean} */
   //    var dispatchEvent = false !== recurring;
   //    if (optionsString !== dataAndEvents) {
   //       return optionsString && (
   //          true, optionsString._removeChild(this.ID, recurring, !dataAndEvents)), dataAndEvents && dataAndEvents.addChild(this, recurring), dispatchEvent && this.dispatchEvent(new goog.events.Event(EntityEventEnum.parentReplaced, {
   //             oldParent: optionsString,
   //             newParent: dataAndEvents
   //          })), dataAndEvents;
   //    }
   // };

   // getUniqueParent = function() {
   //    /** @type {Array.<string>} */
   //    var codeSegments = Object.keys(this.parents);
   //    return 1 !== codeSegments.length ? void 0 : this.parents[codeSegments[0]];
   // };

   // paths() {
   //    /** @type {Array} */
   //    var out = [];
   //    var i;
   //    for (i in this.parents) {
   //       var branchDataJSON = this.parents[i].paths();
   //       /** @type {number} */
   //       var conditionIndex = 0;
   //       for (; conditionIndex < branchDataJSON.length; conditionIndex++) {
   //          var copies = branchDataJSON[conditionIndex];
   //          copies.push(this.ID);
   //          out.push(copies);
   //       }
   //    }
   //    if (0 === out.length) {
   //       out.push([this.ID]);
   //    }
   //    return out;
   // };

   // public get bound() {
   //    if (this._boundDirty) {
   //       this.refreshBoundInternal();
   //       /** @type {boolean} */
   //       this._boundDirty = false;
   //    }
   //    return this.boundInternal;
   // }

   // public dump(value?: any): any {
   //    return {
   //       Class: (this as any).Class,
   //       id: this.ID,
   //       flag: this._flag,
   //       parents: Object.keys(this.parents),
   //       children: Object.keys(this.children),
   //       userDefined: goog.object.unsafeClone(this.userDefined)
   //    };
   // }

   // save() {
   //    return (this as any).dump()[0];
   // };

   // load(options, _xhr) {
   //    if (options.flag) {
   //       this._flag = options.flag;
   //    }
   //    this._flag &= ~EntityFlagEnum.selected;
   //    if (options.userDefined) {
   //       this.userDefined = goog.object.unsafeClone(options.userDefined);
   //    }
   // };

   // public restore(args) {
   // 	/**
   // 	 * @param {Array} items
   // 	 * @param {Array} input
   // 	 * @param {Function} fn
   // 	 * @param {Function} callback
   // 	 * @return {undefined}
   // 	 */
   //    function success(items, input, fn, callback) {
   //       //assert(Array.isArray(items) && Array.isArray(input));
   //       /** @type {number} */
   //       var i = 0;
   //       var il = input.length;
   //       for (; i < il; ++i) {
   //          var item = input[i];
   //          if (-1 === items.indexOf(item)) {
   //             fn(item);
   //          }
   //       }
   //       /** @type {number} */
   //       i = 0;
   //       il = items.length;
   //       for (; i < il; ++i) {
   //          item = items[i];
   //          if (-1 === input.indexOf(item)) {
   //             callback(item);
   //          }
   //       }
   //    }
   // 	/**
   // 	 * @param {string} i
   // 	 * @param {boolean} data
   // 	 * @param {Object} value
   // 	 * @return {undefined}
   // 	 */
   //    function cb(i, data, value) {
   //       if (-1 === reserved.indexOf(i)) {
   //          if ("parents" === i) {
   //             //	assert(Array.isArray(value));
   //             success(Object.keys(data), value, function(r) {
   //                r = obj.database[r];
   //                r.addChild(obj, false);
   //                /** @type {boolean} */
   //                loaded[r.ID + " + " + obj.ID] = true;
   //             }, function(p) {
   //                p = obj.database[p];
   //                p.removeChild(obj.ID, false);
   //                /** @type {boolean} */
   //                loaded[p.ID + " - " + obj.ID] = true;
   //             });
   //          } else {
   //             if ("children" === i) {
   //                //	assert(Array.isArray(value));
   //                success(Object.keys(data), value, function(data) {
   //                   data = obj.database[data];
   //                   obj.addChild(data, false);
   //                   /** @type {boolean} */
   //                   loaded[obj.ID + " + " + data.ID] = true;
   //                }, function(t) {
   //                   t = obj.database[t];
   //                   obj.removeChild(t.ID, false);
   //                   /** @type {boolean} */
   //                   loaded[obj.ID + " - " + t.ID] = true;
   //                });
   //             } else {
   //                data = obj.database[value];
   //                if (void 0 === obj[i] && data) {
   //                   /** @type {boolean} */
   //                   obj[i] = data;
   //                } else {
   //                   if (obj[i] instanceof hsw.core.brep.Entity) {
   //                      if (obj[i].ID !== value) {
   //                         obj[i] = obj.database[value];
   //                      }
   //                   } else {
   //                      if (obj[i] !== value) {
   //                         /** @type {Object} */
   //                         obj[i] = value;
   //                      }
   //                   }
   //                }
   //             }
   //          }
   //       }
   //    }
   //    var obj = this;
   //    /** @type {Array} */
   //    var reserved = ["ID", "id", "Class", "flag"];
   //    var loaded = {};
   //    //assert(this.Class === args.Class, "DIFF: it should be the same Class type.. ");
   //    var n;
   //    for (n in args) {
   //       var type = args[n];
   //       var note = this[n];
   //       if (goog.isArray(type) || type !== note) {
   //          cb(n, note, type);
   //       }
   //    }
   //    return loaded;
   // };

   // canSelect() {
   //    if (false === (this.isFlagOff(EntityFlagEnum.removed) && this.isFlagOff(EntityFlagEnum.unselectable))) {
   //       return false;
   //    }
   //    var i;
   //    for (i in this.parents) {
   //       if (false === this.parents[i].canSelect()) {
   //          return false;
   //       }
   //    }
   //    return true;
   // };

   // public canEdit() {
   //    if (false === this.isFlagOff((hsw.core.brep as any).EntityFlagEnum.freezed)) {
   //       return false;
   //    }
   //    var i;
   //    for (i in this.parents) {
   //       if (false === this.parents[i].canEdit()) {
   //          return false;
   //       }
   //    }
   //    return true;
   // };

   // public refreshBoundInternal = function() {
   //    //	assert(false, 'this function should be overrided, and calculate this boundary in derived class. change "this.boundInternal" value directly');
   // };

   // // TODO: 未声明
   // public equals(v) {
   //    return true;
   // }
}
