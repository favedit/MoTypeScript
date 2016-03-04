export declare class Signal {
    protected EVENT_TYPE: string;
    protected defaultTarget: any;
    protected eventTarget: any;
    constructor(target: any);
    unlisten(a: any, b: any, c: any): any;
    unlistenByKey(a: any): any;
    Hook(a: any): void;
    unlistenAll(): void;
    dispatch(a: any, b: any): any;
}
