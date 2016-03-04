import { Entity } from '../../core/brep/Entity';
export declare class Base {
    entity: Entity;
    snapOffset: number;
    autoFitEnable: boolean;
    constructor(entity: Entity);
    doSnapping(strategy: Base): void;
}
