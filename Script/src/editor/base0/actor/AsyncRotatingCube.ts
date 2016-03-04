import VisibleActor from './VisibleActor';
import {getComponentClassAsync} from '../IoC';

export default class AsyncRotatingCube extends VisibleActor{

  constructor(private color){
    super();
  }

  init(callback?:Function){
      super.init(()=>{
        var scope = this;
        getComponentClassAsync('DefaultCubeComponent',function(comClass){
          scope.addComponent(new comClass(scope.color));
          console.log(scope.getMeshGroup().children.length);
          getComponentClassAsync('RotatingComponent',function(comClass){
            scope.addComponent(new comClass(scope.color));
              console.log(scope.getMeshGroup().children.length);
            if(callback) callback();
          })
        });
      });

  }

}
