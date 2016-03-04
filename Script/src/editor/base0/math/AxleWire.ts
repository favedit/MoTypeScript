import SKActor from '../SKActor';
import MeshComponent from '../component/mesh/MeshComponent';
export default class AxleWire extends THREE.Line3{
  ownerComponent:MeshComponent;
  getOwnerActor():SKActor{
    return this.ownerComponent.getOwner();
  }

  getOwnerMesh():MeshComponent{
    return this.ownerComponent;
  }
}
