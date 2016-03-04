var ENABLE_ASSERTS = false;
import {DebugError} from './debug';
import lang from './lang';
let DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
}

let errorHandler_ = DEFAULT_ERROR_HANDLER;

class AssertionError{
    messagePattern: any;
    constructor(a, b) {
      b.unshift(a);
      DebugError.call(this, lang.string.subs.apply(null , b));
      b.shift();
      this.messagePattern = a

    }

}

function doAssertFailure_(a, b, c, d) {
    var e = "Assertion failed";
    if (c)
        var e = e + (": " + c)
          , f = d;
    else
        a && (e += ": " + a,
        f = b);
    a = new AssertionError("" + e,f || []);
    errorHandler_(a)
}



export function assert(a, b, c?:any) {
    ENABLE_ASSERTS && !a && doAssertFailure_("", null , b, Array.prototype.slice.call(arguments, 2));
    return a
}
