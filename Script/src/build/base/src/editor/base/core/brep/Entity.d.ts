import { EventTarget } from '../EventTarget';
/**
 * @return {undefined}
 */
export declare class Entity extends EventTarget {
    constroctor(): void;
    database: any;
    Class: string;
    /** @type {string} */ /**
     * @return {?}
     */
    clone(): any;
    /**
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    isFlagOn(deepDataAndEvents: any): any;
    /**
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    isFlagOff(deepDataAndEvents: any): any;
    /**
     * @param {?} dataAndEvents
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    setFlagOn(dataAndEvents: any, deepDataAndEvents: any): void;
    /**
     * @param {?} deepDataAndEvents
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    setFlagOff(deepDataAndEvents: any, dataAndEvents: any): void;
    /**
     * @param {string} key
     * @param {boolean} expectedNumberOfNonCommentArgs
     * @return {undefined}
     */
    defineField(key: any, expectedNumberOfNonCommentArgs: any): void;
    /**
     * @param {string} name
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    defineReadonlyField: (name: any, dataAndEvents: any) => void;
    /**
     * @param {?} dataAndEvents
     * @param {string} datum
     * @param {string} graphics
     * @param {?} attributes
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    defaultFieldChangedCallback: (dataAndEvents: any, datum: any, graphics: any, attributes: any) => void;
    /**
     * @param {string} item
     * @param {string} graphics
     * @param {?} opt_attributes
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    onFieldChanged: (item: any, graphics: any, opt_attributes: any) => void;
    /**
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    onEntityDirty: () => void;
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    onFlagChanged: (deepDataAndEvents: any) => void;
    /**
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    _invalidateSubgraph: () => void;
    /**
     * @param {?} allow
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    hasChild: (allow: any) => boolean;
    /**
     * @param {?} obj
     * @param {boolean} recurring
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    addChild: (obj: any, recurring: any) => any;
    /**
     * @param {boolean} recurring
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    removeAllChildren: (recurring: any) => void;
    /**
     * @param {?} node
     * @param {boolean} recurring
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    removeChild: (node: any, recurring: any) => any;
    /**
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    _dispatchInvalidateSubgraph: (deepDataAndEvents: any) => void;
    /**
     * @param {?} index
     * @param {boolean} recurring
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    _removeChild: (index: any, recurring: any, dataAndEvents: any) => any;
    /**
     * @param {Element} node
     * @param {?} walkers
     * @param {boolean} newChild
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    replaceChild: (node: any, walkers: any, newChild: any) => any;
    /**
     * @param {Object} optionsString
     * @param {Object} dataAndEvents
     * @param {boolean} recurring
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    replaceParent: (optionsString: any, dataAndEvents: any, recurring: any) => any;
    /**
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    getUniqueParent: () => any;
    /**
     * @return {?}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    paths: () => any[];
    /**
     * @return {undefined}
     */
    hsw: any;
    core: any;
    brep: any;
    Entity: any;
    prototype: any;
    refreshBoundInternal: () => void;
    Object: any;
    defineProperty(hsw: any, core: any, brep: any, Entity: any, prototype: any): any;
    "bound": any;
}
