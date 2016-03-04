define(["require", "exports"], function (require, exports) {
    "use strict";
    var _REGEX_HOST = /^http(?:s)?\:\/\/([^\/]+)/;
    exports.getHost = function (a) {
        return a && exports.isDataUrl(a) ? null : (a = _REGEX_HOST.exec(a)) ? a[1] : null;
    };
    exports.isDataUrl = function (a) {
        return a ? a.startsWith("data:") : !1;
    };
    exports.isSameUrl = function (a, b) {
        return a && b ? a === b ? !0 : hsw.util.Url.isLocalUrl(a) && hsw.util.Url.isLocalUrl(b) ? hsw.util.Url.getPath(a) === hsw.util.Url.getPath(b) : !1 : !1;
    };
});
//# sourceMappingURL=Url.js.map