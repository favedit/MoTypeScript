import * as SKUtils from './SKUtils';
import EventDispatcher from './event/EventDispather';
export default class SKObject extends EventDispatcher implements THREE.Eventable{

  getClassName():string{
    return SKUtils.getMyClassName(this.getClass());
  }

  getClass(){
    return this && this.constructor;
  }

  static getClassName(){
    return SKUtils.getMyClassName(this);
  }


}
