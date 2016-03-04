import MeshComponent from '../../../core/component/mesh/MeshComponent';
import {getMeshSize} from '../../../core/SKUtils';
export default class TopImageMeshComponent extends MeshComponent{
  private image:MeshComponent;
  private obj:MeshComponent;

  private distance = 2000;
  constructor(image:MeshComponent,mesh:MeshComponent,distance?:number){
    super();

    image.position.z = distance ? distance : this.distance;

    this.image = image;
    this.obj = mesh;
    this.add(mesh);
    this.add(image);
  };

  tick(){
    if(this.registered && this.isActive){
      var space = this.getOwner().getSpace();
      if(space.isEnabled2D()){
        this.image.visible = true;

      }else{
        this.image.visible = false;
      }
    }


  }
}
