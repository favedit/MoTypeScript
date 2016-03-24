import {Event} from './Event';

//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class AccessEvent extends Event {

   public oldValue: any;

   public value: any;
}
