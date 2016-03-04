import RoomActor from '../RoomActor';
import DefaultCubeComponent from '../../core/component/mesh/DefaultCubeComponent';
import RotatingComponent from '../../core/component/animation/RotatingComponent';
import ImageMeshComponent from '../component/mesh/ImageMeshComponent';
import TopImageMeshComponent from '../component/mesh/TopImageMeshComponent';
import SKObjLoader from '../../core/loader/SKObjLoader';
import {addGobal,getMeshSize} from '../../core/SKUtils';

export default class Door extends RoomActor{

  constructor(){
    super();
    this.length = 980;
    this.width = 160;
    this.height = 2100;
  }

  init(callback){
      super.init(()=>{

        var loader = SKObjLoader.getSingleInstance();

        loader.load({objUrl:'./resource/76623_Door_Dark_Gray/Door.obj',uvUrl:'./resource/76623_Door_Dark_Gray/Wood_Texture.jpg'},(mesh)=>{


          var image = new ImageMeshComponent('./resource/door.png',980,980);
          image.position.y += 240;
          var doorMesh = new TopImageMeshComponent(image,mesh);
          this.addComponent(doorMesh);
          callback();

        });

      });


  }
}
