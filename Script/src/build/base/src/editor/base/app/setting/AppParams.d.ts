export declare const ModeTypeEnum: {
    normal: string;
    iframe: string;
    readonly: string;
};
export declare class AppParams {
    tenant: string;
    locale: string;
    set: (config: any) => {};
    debug: boolean;
    svgCanvas: any;
    webglCanvas: any;
    seekid: any;
    mode: any;
}
