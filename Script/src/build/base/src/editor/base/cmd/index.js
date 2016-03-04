define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.CommandStateEnum = {
        created: 1,
        executing: 2,
        running: 3,
        suspending: 4,
        suspended: 5,
        resuming: 6,
        terminating: 7,
        terminated: 8
    };
    exports.CommandMessageEnum = {
        content: "content",
        contentmouseover: "contentmouseover",
        contentmouseleave: "contentmouseleave"
    };
});
//# sourceMappingURL=index.js.map