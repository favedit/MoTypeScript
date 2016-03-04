import AnimationComponent from './AnimationComponent';
import {Component} from '../../IoC';
@Component()
export default class RotatingComponent extends AnimationComponent{
  tick(){
    if(this.registered && this.isActive){
      var meshGroup = this.getOwner().getMeshGroup();
      meshGroup.rotation.x += 0.1;
  		meshGroup.rotation.y += 0.1;
    }


  }
}
