var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../EventTarget'], function (require, exports, EventTarget_1) {
    "use strict";
    /**
     * @return {undefined}
     */
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            _super.apply(this, arguments);
            //goog.inherits(hsw.core.brep.Entity, goog.events.EventTarget);
            this.database = {};
            this.Class = "hsw.core.brep.Entity";
            this.defineReadonlyField = function (name, dataAndEvents) {
                Object.defineProperty(this, name, {
                    writeable: false,
                    enumerable: true,
                    configurable: false,
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this["__" + name];
                    },
                    /**
                     * @param {?} opt_attributes
                     * @return {undefined}
                     */
                    set: function (opt_attributes) {
                        assert(false, "trying to assign value to a readonly field");
                    }
                });
                this["__" + name] = dataAndEvents;
            };
            this.defaultFieldChangedCallback = function (dataAndEvents, datum, graphics, attributes) {
                dataAndEvents.onFieldChanged(datum, graphics, attributes);
            };
            this.onFieldChanged = function (item, graphics, opt_attributes) {
                assert(false, "Override this function");
            };
            this.onEntityDirty = function () {
                this.signalDirty.dispatch();
                this.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.entityDirty));
            };
            this.onFlagChanged = function (deepDataAndEvents) {
                this.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.flagChanged, {
                    flag: deepDataAndEvents
                }));
            };
            this._invalidateSubgraph = function () {
                this.onEntityDirty();
                var i;
                for (i in this.parents) {
                    this.parents[i]._invalidateSubgraph();
                }
            };
            this.hasChild = function (allow) {
                return void 0 !== this.children[allow.ID];
            };
            this.addChild = function (obj, recurring) {
                if (!this.children[obj.ID]) {
                    return this.children[obj.ID] = obj, obj.parents[this.ID] = this, false !== recurring && (this.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.childAdded, {
                        entity: obj
                    })), obj._dispatchInvalidateSubgraph(true)), obj;
                }
            };
            this.removeAllChildren = function (recurring) {
                /** @type {boolean} */
                recurring = false !== recurring;
                var i;
                for (i in this.children) {
                    this.removeChild(this.children[i].ID, recurring);
                }
            };
            this.removeChild = function (node, recurring) {
                return this._removeChild(node, recurring, true);
            };
            this._dispatchInvalidateSubgraph = function (deepDataAndEvents) {
                var key = deepDataAndEvents ? hsw.core.brep.EntityEventEnum.childAdded : hsw.core.brep.EntityEventEnum.childRemoved;
                var n;
                for (n in this.children) {
                    var obj = this.children[n];
                    this.dispatchEvent(new goog.events.Event(key, {
                        entity: obj
                    }));
                    obj._dispatchInvalidateSubgraph(deepDataAndEvents);
                }
            };
            this._removeChild = function (index, recurring, dataAndEvents) {
                /** @type {boolean} */
                var dispatchEvent = false !== recurring;
                /** @type {boolean} */
                dataAndEvents = false !== dataAndEvents;
                var obj = this.children[index];
                if (obj) {
                    return delete obj.parents[this.ID], delete this.children[index], 0 === Object.keys(obj.parents).length && (dataAndEvents && obj.removeAllChildren(recurring), dispatchEvent && this.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.childRemoved, {
                        entity: obj
                    }))), obj;
                }
            };
            this.replaceChild = function (node, walkers, newChild) {
                /** @type {boolean} */
                newChild = false !== newChild;
                node = this.removeChild(node, true);
                if (walkers) {
                    this.addChild(walkers, true);
                }
                if (newChild) {
                    this.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.childReplaced, {
                        oldChild: node,
                        newChild: walkers
                    }));
                }
                return node;
            };
            this.replaceParent = function (optionsString, dataAndEvents, recurring) {
                /** @type {boolean} */
                var dispatchEvent = false !== recurring;
                if (optionsString !== dataAndEvents) {
                    return optionsString && (assert(this.parents[optionsString.ID], "current entity does not below to old parent."), optionsString._removeChild(this.ID, recurring, !dataAndEvents)), dataAndEvents && dataAndEvents.addChild(this, recurring), dispatchEvent && this.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.parentReplaced, {
                        oldParent: optionsString,
                        newParent: dataAndEvents
                    })), dataAndEvents;
                }
            };
            this.getUniqueParent = function () {
                /** @type {Array.<string>} */
                var codeSegments = Object.keys(this.parents);
                return 1 !== codeSegments.length ? void 0 : this.parents[codeSegments[0]];
            };
            this.paths = function () {
                /** @type {Array} */
                var out = [];
                var i;
                for (i in this.parents) {
                    var branchDataJSON = this.parents[i].paths();
                    /** @type {number} */
                    var conditionIndex = 0;
                    for (; conditionIndex < branchDataJSON.length; conditionIndex++) {
                        var copies = branchDataJSON[conditionIndex];
                        copies.push(this.ID);
                        out.push(copies);
                    }
                }
                if (0 === out.length) {
                    out.push([this.ID]);
                }
                return out;
            };
            this.refreshBoundInternal = function () {
                assert(false, 'this function should be overrided, and calculate this boundary in derived class. change "this.boundInternal" value directly');
            };
        }
        //goog.events.EventTarget.call(this);
        Entity.prototype.constroctor = function () {
            hsw.core.Id(this);
            /** @type {number} */
            this._tempFlag = this._flag = 0;
            this.parents = {};
            this.children = {};
            this.boundInternal = sk_create("hsw.core.brep.Bound", hsw.core.brep.Bound, Infinity, Infinity, 0, 0);
            /** @type {Array} */
            this.outline = [];
            /** @type {boolean} */
            this._boundDirty = true;
            this.cache = {};
            this.database[this.ID] = this;
            this.userDefined = {};
            this.signalDirty = sk_create("hsw.util.Signal", hsw.util.Signal, this);
        };
        /** @type {string} */ /**
         * @return {?}
         */
        Entity.prototype.clone = function () {
            var o = new (eval(this.Class));
            o.restore(this.save());
            return o;
        };
        ;
        /**
         * @param {?} deepDataAndEvents
         * @return {?}
         */
        Entity.prototype.isFlagOn = function (deepDataAndEvents) {
            return hsw.util.Flag.isFlagOn(this._flag, deepDataAndEvents) || hsw.util.Flag.isFlagOn(this._tempFlag, deepDataAndEvents);
        };
        ;
        /**
         * @param {?} deepDataAndEvents
         * @return {?}
         */
        Entity.prototype.isFlagOff = function (deepDataAndEvents) {
            return hsw.util.Flag.isFlagOff(this._flag, deepDataAndEvents) && hsw.util.Flag.isFlagOff(this._tempFlag, deepDataAndEvents);
        };
        ;
        /**
         * @param {?} dataAndEvents
         * @param {boolean} deepDataAndEvents
         * @return {undefined}
         */
        Entity.prototype.setFlagOn = function (dataAndEvents, deepDataAndEvents) {
            var isFlagOn = this.isFlagOn(dataAndEvents);
            if (deepDataAndEvents) {
                this._tempFlag = hsw.util.Flag.setFlagOn(this._tempFlag, dataAndEvents);
            }
            else {
                this._flag = hsw.util.Flag.setFlagOn(this._flag, dataAndEvents);
            }
            if (!isFlagOn) {
                this.onFlagChanged(dataAndEvents);
            }
        };
        ;
        /**
         * @param {?} deepDataAndEvents
         * @param {boolean} dataAndEvents
         * @return {undefined}
         */
        Entity.prototype.setFlagOff = function (deepDataAndEvents, dataAndEvents) {
            var isFlagOff = this.isFlagOff(deepDataAndEvents);
            if (dataAndEvents) {
                this._tempFlag = hsw.util.Flag.setFlagOff(this._tempFlag, deepDataAndEvents);
            }
            else {
                this._flag = hsw.util.Flag.setFlagOff(this._flag, deepDataAndEvents);
            }
            if (isFlagOff !== this.isFlagOff(deepDataAndEvents)) {
                this.onFlagChanged(deepDataAndEvents);
            }
        };
        ;
        /**
         * @param {string} key
         * @param {boolean} expectedNumberOfNonCommentArgs
         * @return {undefined}
         */
        Entity.prototype.defineField = function (key, expectedNumberOfNonCommentArgs) {
            Object.defineProperty(this, key, {
                writeable: true,
                enumerable: true,
                configurable: false,
                /**
                 * @return {?}
                 */
                get: function () {
                    return this["__" + key];
                },
                /**
                 * @param {?} opt_attributes
                 * @return {undefined}
                 */
                set: function (opt_attributes) {
                    var capture = this["__" + key];
                    this["__" + key] = opt_attributes;
                    if (this._fieldChangedCallback[key]) {
                        this._fieldChangedCallback[key](this, key, capture, opt_attributes);
                    }
                }
            });
            this._fieldChangedCallback = this._fieldChangedCallback || {};
            this._fieldChangedCallback[key] = expectedNumberOfNonCommentArgs || hsw.core.brep.Entity.defaultFieldChangedCallback;
        };
        ;
        Entity.prototype.defineProperty = ;
        return Entity;
    }(EventTarget_1.EventTarget));
    exports.Entity = Entity;
    {
        writeable: false,
            enumerable;
        false,
            configurable;
        false,
            /**
             * @return {?}
             */
            get;
        function () {
            if (this._boundDirty) {
                this.refreshBoundInternal();
                /** @type {boolean} */
                this._boundDirty = false;
            }
            return this.boundInternal;
        }
    }
    ;
    /**
     * @return {?}
     */
    hsw.core.brep.Entity.prototype.dump = function () {
        return {
            Class: this.Class,
            id: this.ID,
            flag: this._flag,
            parents: Object.keys(this.parents),
            children: Object.keys(this.children),
            userDefined: goog.object.unsafeClone(this.userDefined)
        };
    };
    /**
     * @return {?}
     */
    hsw.core.brep.Entity.prototype.save = function () {
        return this.dump()[0];
    };
    /**
     * @param {string} options
     * @param {Object} _xhr
     * @return {undefined}
     */
    hsw.core.brep.Entity.prototype.load = function (options, _xhr) {
        if (options.flag) {
            this._flag = options.flag;
        }
        this._flag &= ~hsw.core.brep.EntityFlagEnum.selected;
        if (options.userDefined) {
            this.userDefined = goog.object.unsafeClone(options.userDefined);
        }
    };
    /**
     * @param {Object} args
     * @return {?}
     */
    hsw.core.brep.Entity.prototype.restore = function (args) {
        /**
         * @param {Array} items
         * @param {Array} input
         * @param {Function} fn
         * @param {Function} callback
         * @return {undefined}
         */
        function success(items, input, fn, callback) {
            assert(Array.isArray(items) && Array.isArray(input));
            /** @type {number} */
            var i = 0;
            var il = input.length;
            for (; i < il; ++i) {
                var item = input[i];
                if (-1 === items.indexOf(item)) {
                    fn(item);
                }
            }
            /** @type {number} */
            i = 0;
            il = items.length;
            for (; i < il; ++i) {
                item = items[i];
                if (-1 === input.indexOf(item)) {
                    callback(item);
                }
            }
        }
        /**
         * @param {string} i
         * @param {boolean} data
         * @param {Object} value
         * @return {undefined}
         */
        function cb(i, data, value) {
            if (-1 === reserved.indexOf(i)) {
                if ("parents" === i) {
                    assert(Array.isArray(value));
                    success(Object.keys(data), value, function (r) {
                        r = obj.database[r];
                        r.addChild(obj, false);
                        /** @type {boolean} */
                        loaded[r.ID + " + " + obj.ID] = true;
                    }, function (p) {
                        p = obj.database[p];
                        p.removeChild(obj.ID, false);
                        /** @type {boolean} */
                        loaded[p.ID + " - " + obj.ID] = true;
                    });
                }
                else {
                    if ("children" === i) {
                        assert(Array.isArray(value));
                        success(Object.keys(data), value, function (data) {
                            data = obj.database[data];
                            obj.addChild(data, false);
                            /** @type {boolean} */
                            loaded[obj.ID + " + " + data.ID] = true;
                        }, function (t) {
                            t = obj.database[t];
                            obj.removeChild(t.ID, false);
                            /** @type {boolean} */
                            loaded[obj.ID + " - " + t.ID] = true;
                        });
                    }
                    else {
                        data = obj.database[value];
                        if (void 0 === obj[i] && data) {
                            /** @type {boolean} */
                            obj[i] = data;
                        }
                        else {
                            if (obj[i] instanceof hsw.core.brep.Entity) {
                                if (obj[i].ID !== value) {
                                    obj[i] = obj.database[value];
                                }
                            }
                            else {
                                if (obj[i] !== value) {
                                    /** @type {Object} */
                                    obj[i] = value;
                                }
                            }
                        }
                    }
                }
            }
        }
        var obj = this;
        /** @type {Array} */
        var reserved = ["ID", "id", "Class", "flag"];
        var loaded = {};
        assert(this.Class === args.Class, "DIFF: it should be the same Class type.. ");
        var n;
        for (n in args) {
            var type = args[n];
            var note = this[n];
            if (goog.isArray(type) || type !== note) {
                cb(n, note, type);
            }
        }
        return loaded;
    };
    /**
     * @return {?}
     */
    hsw.core.brep.Entity.prototype.canSelect = function () {
        if (false === (this.isFlagOff(hsw.core.brep.EntityFlagEnum.removed) && this.isFlagOff(hsw.core.brep.EntityFlagEnum.unselectable))) {
            return false;
        }
        var i;
        for (i in this.parents) {
            if (false === this.parents[i].canSelect()) {
                return false;
            }
        }
        return true;
    };
    /**
     * @return {?}
     */
    hsw.core.brep.Entity.prototype.canEdit = function () {
        if (false === this.isFlagOff(hsw.core.brep.EntityFlagEnum.freezed)) {
            return false;
        }
        var i;
        for (i in this.parents) {
            if (false === this.parents[i].canEdit()) {
                return false;
            }
        }
        return true;
    };
});
//# sourceMappingURL=Entity.js.map