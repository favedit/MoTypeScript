import {Application} from '../core/IoC';
import SKSpace from '../core/SKSpace';
import SKObjLoader from '../core/loader/SKObjLoader';
import {getMeshSize} from '../core/SKUtils';
import RotatingCube from '../core/actor/RotatingCube';
@Application()
class SKongVR extends SKSpace{
  constructor(){
    super();
    var loader = SKObjLoader.getSingleInstance();
    loader.load({
      objUrl:'./resource/room/cube.obj',
      mtlUrl:'./resource/room/cube.mtl'
    },(mesh)=>{
      this.scene.add(mesh);
      getMeshSize(mesh);
    })

    var cube1 = new RotatingCube(0x00ff00);
    var cube2 = new RotatingCube(0x00ffff);

    cube2.init();
    cube2.getFristMeshComponent().position.set(0.5,0.5,0.5);

    cube1.init();
    cube1.addChild(cube2);

    cube1.getFristMeshComponent().position.set(-0.5,-0.5,-0.5);
    this.scene.add(cube1);
  }
}
