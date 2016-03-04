import SKSpace from '../core/SKSpace';
import {Application} from '../core/IoC';
import RotatingCube from '../core/actor/RotatingCube';
import AsyncRotatingCube from '../core/actor/AsyncRotatingCube';
@Application()
class SKongVR extends SKSpace{
  constructor(){
    super();



    var cube1 = new RotatingCube(0x00ff00);
    var cube2 = new RotatingCube(0x00ffff);

  //  cube2.init();
    cube1.addChild(cube2);
    cube1.init();

   cube2.getFristMeshComponent().position.set(0.5,0.5,0.5);
   cube1.getFristMeshComponent().position.set(-0.5,-0.5,-0.5);
   this.scene.add(cube1);

    cube1.addEventListener('mouseup',function(){
      console.log('cube1 click');
    });

    cube2.getFristMeshComponent().addEventListener('mouseup',function(e){
      e.stopPropagation();
      console.log('cube2 mesh component click');
    });



  }

}
