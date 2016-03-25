// 相机
import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {FModel} from './FModel';
export class FCamera extends FModel{
   public x:number;
   public y:number;
   public z:number;
   public targetX:number;
   public targetY:number;
   public targetZ:number;
   // 视角
   public fov:number;
   // 视场
   public pitch:number;
   // 摄像机类型
   public type:String;
   constructor(t){
      super();
      this.type = t;
   }
}