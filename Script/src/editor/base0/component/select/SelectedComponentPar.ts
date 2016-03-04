import SKComponent from '../../SKComponent';
import {Component} from '../../IoC';
import VisibleActor from '../../actor/VisibleActor';
@Component()
export default class SelectedComponentPar extends SKComponent{
  update(){

  }
  getOwner():VisibleActor{
    let owner = <VisibleActor>super.getOwner();
    if(!(owner instanceof VisibleActor)){
      console.log(new Error('this commponent is not registered'));
    }
    return owner;
  }

}
