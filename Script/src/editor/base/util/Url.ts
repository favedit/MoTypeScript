var _REGEX_HOST = /^http(?:s)?\:\/\/([^\/]+)/;
export var getHost = function(a) {
    return a && isDataUrl(a) ? null : (a = _REGEX_HOST.exec(a)) ? a[1] : null
}

export var isDataUrl = function(a): boolean {
    return a ? a.startsWith("data:") : !1
}

export var isSameUrl = function(a, b): boolean {
    return a && b ? a === b ? !0 : hsw.util.Url.isLocalUrl(a) && hsw.util.Url.isLocalUrl(b) ? hsw.util.Url.getPath(a) === hsw.util.Url.getPath(b) : !1 : !1
}
