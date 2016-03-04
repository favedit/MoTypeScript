import { Command } from './Command';
import { Base } from '../app/Base';
export declare class Manager {
    _cmdByType: {
        [type: string]: Command;
    };
    logger: any;
    current: any;
    signalCommandSuspending: any;
    _pendingStack: any;
    signalCommandSuspended: any;
    signalCommandStarting: any;
    signalCommandStarted: any;
    init(app: Base): void;
    isCommandAvailable(cmd: any): boolean;
    getRunningCommands(): void;
    static instance(): Manager;
    clear(): void;
    register(cmd: any, typeName: any, description: any): void;
    complete(a?: Command, b?: any): void;
    cancel(cmd: Command): void;
    receive(a: any, b: any, c: any): void;
    createCommand(commandType: string | any, args: any, c: any, d: any, e: any, f: any): any;
    execute(command: Command, b: any, c: any, d: any, e: any, f: any): Command;
}
