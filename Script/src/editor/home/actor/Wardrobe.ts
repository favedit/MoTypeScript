import RoomActor from '../RoomActor';
import SKObjLoader from '../../core/loader/SKObjLoader';
import MeshComponent from '../../core/component/mesh/MeshComponent';
import {addGobal,getMeshSize} from '../../core/SKUtils';
export default class Wardrobe extends RoomActor{
  private isSelected:boolean;
  constructor(){
    super();
  }

  private wardrobeMesh:MeshComponent;
    init(callback){
        super.init(()=>{
          var loader = SKObjLoader.getSingleInstance();
          loader.load({objUrl:'./resource/room/wardrobe/wardrobe.obj',mtlUrl:'./resource/room/wardrobe/wardrobe.mtl'},(mesh)=>{
          //  mesh.scale.set(1000,1000,1000);
            this.addComponent(mesh);
            addGobal('wardrobeMesh',mesh);
            this.wardrobeMesh = mesh;
            var size = getMeshSize(mesh);
            this.length = Math.round(size.x);
            this.width = Math.round(size.y);
            this.height = Math.round(size.z);
            this.addEventListener('mouseup',(event)=>{
              event.stopPropagation();
              console.log('123');
            })
            callback();
          });
        }
      );
    }

    public Selected(){

    }
    public addhelper(){
    }
}
