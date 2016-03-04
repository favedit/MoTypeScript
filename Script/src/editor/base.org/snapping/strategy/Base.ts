import {Entity} from '../../core/brep/Entity';
export class Base{
  entity:Entity;
  snapOffset:number;
  autoFitEnable:boolean;

  constructor(entity:Entity){
    this.entity = entity;
    this.snapOffset = 0;
    this.autoFitEnable = !1
  }

  doSnapping(strategy:Base){
    this.snapOffset = strategy.snapOffset || this.snapOffset;
    this.autoFitEnable = strategy.autoFitEnable || this.autoFitEnable
  }
}
