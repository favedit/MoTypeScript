export let Freezable = {
    onUnfreeze: function() {
        this.needsUpdate && (this.redraw(),
        this.needsUpdate = !1)
    },
    redraw: function() {
        this.context.frozen ? this.needsUpdate = !0 : this.constructor.superClass_.redraw.call(this)
    }
};
