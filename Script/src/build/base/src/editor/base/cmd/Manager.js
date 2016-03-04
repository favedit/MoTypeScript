define(["require", "exports"], function (require, exports) {
    "use strict";
    var Manager = (function () {
        function Manager() {
        }
        Manager.prototype.init = function (app) {
        };
        Manager.prototype.isCommandAvailable = function (cmd) {
            return void 0 !== cmd;
        };
        Manager.prototype.getRunningCommands = function () {
        };
        Manager.instance = function () {
            return new Manager();
        };
        Manager.prototype.clear = function () {
        };
        Manager.prototype.register = function (cmd, typeName, description) {
        };
        Manager.prototype.complete = function (a, b) {
        };
        Manager.prototype.cancel = function (cmd) {
        };
        Manager.prototype.receive = function (a, b, c) {
        };
        Manager.prototype.createCommand = function (commandType, args, c, d, e, f) {
            if ("string" === typeof commandType && (commandType = this._cmdByType[commandType],
                !commandType))
                return;
            if (commandType = new commandType(args, c, d, e, f))
                commandType.mgr = this;
            return commandType;
        };
        Manager.prototype.execute = function (command, b, c, d, e, f) {
            this.logger.info("execute cmd:" + command.type);
            if (this.current) {
                var g = this.current;
                g.canSuspend() ? (this.logger.info("suspend cmd:" + g.type),
                    this.signalCommandSuspending.dispatch({
                        cmd: g
                    }),
                    this._pendingStack.push(this.current),
                    this.current.suspend(),
                    this.signalCommandSuspended.dispatch({
                        cmd: g
                    })) : this.complete();
            }
            this.current = command;
            this.signalCommandStarting.dispatch({
                cmd: this.current
            });
            command = this.current.execute(b, c, d, e, f);
            this.current && this.signalCommandStarted.dispatch({
                cmd: this.current
            });
            return command;
        };
        return Manager;
    }());
    exports.Manager = Manager;
});
//# sourceMappingURL=Manager.js.map