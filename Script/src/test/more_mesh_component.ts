import SKSpace from '../core/SKSpace';
import {Application} from '../core/IoC';
import RotatingCube from '../core/actor/RotatingCube';
import AsyncRotatingCube from '../core/actor/AsyncRotatingCube';
import {addGobal} from '../core/SKUtils';
import MeshComponent from '../core/component/mesh/MeshComponent';

class ColorMeshComponent extends MeshComponent{
  color = 0x000000;
  constructor(color?:number,size?:number){
    super();
    size = size || 1;
    color = color ||0x000000;
    this.geometry = new THREE.BoxGeometry( size, size, size );
    this.material = new THREE.MeshBasicMaterial( { color:color} );
    addGobal('colorMesh',this);
  }

  tick(){
    this.color += 1;
    this.material.color.setHex(this.color);
  }
}

@Application()
class SKongVR extends SKSpace{
  constructor(){
    super();
    addGobal('sk',this);


    var cube1 = new RotatingCube(0x00ff00);
    //var cube2 = new RotatingCube(0x00ffff);

    var blackMesh = new ColorMeshComponent();
    blackMesh.position.set(1,1,1);
    cube1.init();
    cube1.addComponent(blackMesh)

    this.scene.add(cube1);

    cube1.addEventListener('mouseup',function(){
      console.log('cube1 click');
    });

    blackMesh.addEventListener('mouseup',function(e){
      console.log('balckMesh click');
      e.stopPropagation();
    })

  }

}
