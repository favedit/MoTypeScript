import VisibleActor from './VisibleActor';
import {getComponentClassAsync} from '../IoC';
import DefaultCubeComponent from '../component/mesh/DefaultCubeComponent';
import RotatingComponent from '../component/animation/RotatingComponent';
export default class RotatingCube extends VisibleActor{

  constructor(private color){
    super();

  }

  init(){

      super.init();
      this.addComponent(new DefaultCubeComponent(this.color));
      this.addComponent(new RotatingComponent());

  }
}
