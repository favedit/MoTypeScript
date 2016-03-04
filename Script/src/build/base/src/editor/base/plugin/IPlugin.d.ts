import { EventTarget } from '../core/EventTarget';
import { Professional } from '../app/Professional';
export interface IPluginContext {
    app: Professional;
}
export declare class IPlugin extends EventTarget {
    protected type: any;
    protected enable: any;
    protected name: string;
    protected description: string;
    protected dependencies: Array<IPlugin>;
    protected context: IPluginContext;
    constructor(config: {
        enable?: boolean;
        name?: string;
        description?: string;
        dependencies?: Array<IPlugin>;
    });
    onCreate(a: any): void;
    onDestory(a: any): void;
    onActive(context?: IPluginContext, b?: any): void;
    onDeactive(context?: any): void;
}
