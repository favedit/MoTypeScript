import {Event} from '../common/lang/Event';

export class SFieldChangeEvent extends Event {
   public valueFrom: any;
   public valueTo: any;
}