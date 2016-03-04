import RoomActor from '../RoomActor';
import MeshComponent from '../../core/component/mesh/MeshComponent';
export default class CurtainBox extends RoomActor{

  private distanceToWindowWall = 200;

  init(){
    var mesh = new MeshComponent();
    mesh.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    mesh.material = new THREE.MeshPhongMaterial( { color:0xffffff } );
    this.addComponent(mesh);


  }

  getDistanceToWindowWall(){
    return this.distanceToWindowWall;
  }

  setWidth(width:number){
    super.setWidth(width);
    this.getFristMeshComponent().scale.y = width;
  }

  setHeight(height:number){
    super.setHeight(height);
    this.getFristMeshComponent().scale.z = height;
  }

  setLength(length:number){
    super.setLength(length);
    this.getFristMeshComponent().scale.x = length;
  }
}
