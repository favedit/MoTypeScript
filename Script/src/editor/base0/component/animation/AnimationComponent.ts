import SKComponent from '../../SKComponent';
import {Component} from '../../IoC';
import VisibleActor from '../../actor/VisibleActor';
@Component()
export default class AnimationComponent extends SKComponent{
  update(){

  }

  getOwner():VisibleActor{
    var owner = <VisibleActor>super.getOwner();
    if(!(owner instanceof VisibleActor)){
      console.log(new Error('AnimationComponent is not registed to a VisibleActor'));
    }
    return owner;
  }
}
