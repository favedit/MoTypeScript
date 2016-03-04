

import SKSpace from '../core/SKSpace';
import {Application} from '../core/IoC';
import RotatingCube from '../core/actor/RotatingCube';
import AsyncRotatingCube from '../core/actor/AsyncRotatingCube';
@Application()
class SKongVR extends SKSpace{
  constructor(){
    super();

    var objLoader = new (<any>THREE).OBJLoader();
    var objUrl = './resource/room/cube.obj';
    var mtlUrl = './resource/room/wardrobe/wardrobe.mtl';
    objLoader.load(objUrl, ( object ) =>{
      console.log(object);
      object.position.set(0,0,0);
      this.scene.add( object );
    },function ( item, loaded, total ) {
      console.log( item, loaded, total );
    }, function ( xhr ) {
      console.log('load error: ',objUrl);
    });


  }

}
