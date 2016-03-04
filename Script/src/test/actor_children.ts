import SKSpace from '../core/SKSpace';
import {Application} from '../core/IoC';
import RotatingCube from '../core/actor/RotatingCube';
import AsyncRotatingCube from '../core/actor/AsyncRotatingCube';
import {addGobal} from '../core/SKUtils';
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

    var cube3 = new AsyncRotatingCube(0xff0000);
    var cube4 = new AsyncRotatingCube(0xff00ff);
    cube3.addChild(cube4);
    cube3.init(()=>{
      cube3.getFristMeshComponent().position.set(1,1,1);
      cube4.getFristMeshComponent().position.set(-1,-1,-1);

      this.scene.add(cube3);
    })



  }

}
