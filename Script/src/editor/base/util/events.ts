import * as asserts from './assert';
import * as goog from './index';

let LISTENER_MAP_PROP_ = "closure_lm_651987";

let LISTENER_WRAPPER_PROP_ = "__closure_events_fn_581838886";

export function wrapListener(a) {
    asserts.assert(a, "Listener can not be null.");
    if (goog.isFunction(a))
        return a;
        asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
    a[LISTENER_WRAPPER_PROP_] || (a[LISTENER_WRAPPER_PROP_] = function(b) {
        return a.handleEvent(b)
    }
    );
    return a[LISTENER_WRAPPER_PROP_]
}
