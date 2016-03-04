export let createGeometryCacheFromCanvas = function() {
    var a;
    return function(b) {
        if (b)
            return a && a._canvas === b || (a = {
                _canvas: b,
                get: function(a) {
                    if (a && (a = this._canvas.displayList[a]))
                        return {
                            geometry: a.geometry,
                            indices: a.indices
                        }
                }
            }),
            a
    }
}();
