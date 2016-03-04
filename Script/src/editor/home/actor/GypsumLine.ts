import RoomActor from '../RoomActor';
import MeshComponent from '../../core/component/mesh/MeshComponent';
export default class GypsumLine extends RoomActor{
  init(){
    var mesh = new MeshComponent();
    mesh.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    mesh.material = new THREE.MeshPhongMaterial( { color: 0x666666 } );
    this.addComponent(mesh);
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

  setXAxisLength(x:number){
    super.setLength(x);
    this.getFristMeshComponent().scale.x = x;
  }
  setYAxisLength(y:number){
    super.setWidth(y);
    this.getFristMeshComponent().scale.y = y;
  }
  setZAxisLength(z:number){
    super.setHeight(z);
    this.getFristMeshComponent().scale.z = z;
  }

  getXAxisLength(){
    return this.getLength();
  }
  getYAxisLength(){
    return this.getWidth();
  }
  getZAxisLength(){
    return this.getHeight();
  }

}
