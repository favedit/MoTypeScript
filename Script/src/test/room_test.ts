import {Application} from '../core/IoC';
import SKSpace from '../core/SKSpace';
import Room from '../room/Room';
@Application()
class SKongVR extends SKSpace{
  constructor(){
    super();
    this.camera.position.set(0, -3000, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    var room = new Room();
    room.init(()=>{
      this.scene.add(room)
    });

  }
}
