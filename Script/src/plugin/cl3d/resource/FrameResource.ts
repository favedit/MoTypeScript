import {ObjectBase} from '../../runtime/common/lang/ObjectBase';

//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
export class FrameResource extends ObjectBase {
   public tick;
   public translation;
   public quaternion;
   public scale;
}