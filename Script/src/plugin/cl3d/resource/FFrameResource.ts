import {FObject} from '../../runtime/common/lang/FObject';

//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
export class FFrameResource extends FObject {
   public tick = null;
   public translation = null;
   public quaternion = null;
   public scale = null;
}