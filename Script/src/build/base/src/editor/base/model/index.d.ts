export declare var MaterialIdEnum: {
    local: string;
    generated: string;
    customized: string;
};
export declare var PointFlagEnum: {
    hoverOn: number;
};
export declare var Pattern: {
    makePattern: (a: any, b: any, c: any) => string;
};
export declare var PatternTypeEnum: {
    Horizontal: string;
    UserDefine_1: string;
};
export declare var WallFlagEnum: {
    dimensionOff: number;
    hoverOn: number;
    clickOn: number;
    heightEditable: number;
};
export declare var WallEvent: {
    dimensionChanged: string;
};
export declare var WallSurfaceTypeEnum: {
    inner: string;
    outer: string;
    top: string;
    bottom: string;
    from: string;
    to: string;
    outerfrom: string;
    outerto: string;
};
export declare var WallTypeEnum: {
    generic: string;
    gypsum_120: string;
    brick_120: string;
    brick_240: string;
    non_brick_120: string;
};
export declare const ContentUrlTypeEnum: {
    top: string;
    model3d: string;
    modelTexture: string;
};
export declare const ContentFlagEnum: {
    castShadow: number;
    scalable_obsoleted: number;
    scaleProportionConstrain: number;
};
export declare const CoWallEventEnum: {
    moldingAdded: string;
    moldingRemoved: string;
};
export declare const RoomFlagEnum: {
    ceilingOff: number;
    hoverOn: number;
    clickOn: number;
    dimensionOff: number;
    roomtypeOff: number;
};
export declare const RoomSurfaceTypeEnum: {
    floor: string;
    ceiling: string;
};
export declare const RoomTypes: string[];
export declare var GridFlagEnum: {
    toggleOff: number;
};
export declare const MoldingTypeEnum: {
    baseboard: string;
    gypsum: string;
};
export declare var CameraTypeEnum: {
    FirstPerson: string;
    AerialView: string;
};
export declare const CameraFlagEnum: {
    toggleOff: number;
};
export declare const GroupIdEnum: {
    temporary: string;
    persistent: string;
};
export declare const GroupFlagEnum: {
    firstFlag: number;
    boundingOff: number;
};
export declare const FloorplanMeta: {
    magic: string;
    version: string;
    unit: string;
    keywords: string;
};
export declare const FloorplanVersion: {
    MIN: string;
    MAX: string;
};
