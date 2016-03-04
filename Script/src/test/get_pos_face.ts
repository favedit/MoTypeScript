import SKSpace from '../core/SKSpace';
import {Application} from '../core/IoC';
import RotatingCube from '../core/actor/RotatingCube';
import AsyncRotatingCube from '../core/actor/AsyncRotatingCube';
@Application()
class SKongVR extends SKSpace{
  constructor(){
    super();



    var cube1 = new RotatingCube(0x00ff00);

  //  cube2.init();
    cube1.init();

    this.scene.add(cube1);
    cube1.getOppositeFaceOfPoint(new THREE.Vector3(0,0,0));
    cube1.addEventListener('mouseup',function(){
      console.log('cube1 click');
    });


  }

}
