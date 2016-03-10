import {SEvent} from '../common/lang/SEvent';

export class SFieldChangeEvent extends SEvent {
   public valueFrom: any;
   public valueTo: any;
}