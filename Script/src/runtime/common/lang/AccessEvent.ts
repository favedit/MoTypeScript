import {SEvent} from './SEvent';

//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class AccessEvent extends SEvent {

   public oldValue: any;

   public value: any;
}
