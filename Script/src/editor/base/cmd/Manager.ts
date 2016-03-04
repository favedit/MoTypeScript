import {Command} from './Command';
import {Base} from '../app/Base';
export class Manager {
	_cmdByType: {
		[type: string]: Command;
	};
	logger;
	current;
	signalCommandSuspending;
	_pendingStack;
	signalCommandSuspended;

	signalCommandStarting;
	signalCommandStarted;


	init(app: Base) {

	}

	isCommandAvailable(cmd) {
		return void 0 !== cmd;
	}

	getRunningCommands() {

	}

	static instance(): Manager {
		return new Manager();
	}

	clear() {

	}

	register(cmd, typeName, description) {

	}

	complete(a?: Command, b?: any) {

	}

	cancel(cmd: Command) {

	}

	receive(a, b, c) {

	}


	createCommand(commandType: string | any, args: any, c, d, e, f) {
		if("string" === typeof commandType && (commandType = this._cmdByType[commandType],
			!commandType))
			return;
		if(commandType = new commandType(args, c, d, e, f))
			commandType.mgr = this;
		return commandType
	}



	execute(command: Command, b, c, d, e, f) {
		this.logger.info("execute cmd:" + (command as any).type);
		if(this.current) {
			var g = this.current;
			g.canSuspend() ? (this.logger.info("suspend cmd:" + g.type),
				this.signalCommandSuspending.dispatch({
					cmd: g
				}),
				this._pendingStack.push(this.current),
				this.current.suspend(),
				this.signalCommandSuspended.dispatch({
					cmd: g
				})) : this.complete()
		}
		this.current = command;
		this.signalCommandStarting.dispatch({
			cmd: this.current
		});
		command = this.current.execute(b, c, d, e, f);
		this.current && this.signalCommandStarted.dispatch({
			cmd: this.current
		});
		return command
	}
}
