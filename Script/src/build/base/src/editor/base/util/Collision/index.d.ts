export declare const ClipType: {
    union: number;
    diff: number;
    inter: number;
    xor: number;
};
export declare const PolyFillType: {
    evenOdd: number;
    nonZero: number;
    positive: number;
    negative: number;
};
export declare const JoinType: {
    miter: number;
    square: number;
    round: number;
};
export declare const EndType: {
    openSquare: number;
    openRound: number;
    openButt: number;
    closedLine: number;
    closedPolygon: number;
};
export declare var AABBIntersect: (b: any, c: any, d: any) => void;
export declare var OutlineIntersect: (a: any, b: any, c: any) => void;
export declare var ClipPolygon: (a: any, b: any, c: any) => void;
export declare var OffsetPolygon: (a: any, b: any, c: any) => void;
export declare var SimplifyPolygons: (a: any) => void;
export declare var Orientation: (a: any) => void;
