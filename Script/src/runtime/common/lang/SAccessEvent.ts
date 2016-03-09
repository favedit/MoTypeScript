import {SEvent} from './SEvent';

//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class SAccessEvent extends SEvent {
   public oldValue:any = null;
   public value:any = null;
}
