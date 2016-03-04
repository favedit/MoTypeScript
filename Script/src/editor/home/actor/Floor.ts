import RoomActor from '../RoomActor';
import Room from '../Room';
import MeshComponent from '../../core/component/mesh/MeshComponent';
import DefaultCubeComponent from '../../core/component/mesh/DefaultCubeComponent';
import {addGobal} from '../../core/SKUtils';
import Vertex from '../../core/math/Vertex';


class StartBuildPoint extends DefaultCubeComponent{
  constructor(private point:Vertex){
    super(0x101010,100);
    this.position.set(point.x,point.y,point.z);
  }
  getLocationX(){
    return this.point.x;
  }

  getLocationY(){
    return this.point.y;
  }

  highlight(){
    this.material.color.setHex(0xffffff);
  }

  dehighlight(){
    this.material.color.setHex(0x101010);
  }

  tick(){
    console.log('tick');
  }
}

export default class Floor extends RoomActor{

  public roomHeight: number;
  public roomWidth: number;
  public roomLength: number;

  private enCorner:StartBuildPoint;
	private esCorner:StartBuildPoint;
	private wsCorner:StartBuildPoint;
	private wnCorner:StartBuildPoint;

  private groundTexture: string = './resource/textures/xx.jpg';
  public groundMaterial: THREE.MeshPhongMaterial;
  private startBuildFloorPoint:StartBuildPoint;

  private textureImageURTimes:number = 1;
  private textureImageVRTimes:number = 3;
  private wonderLength:number = 910;//mm
  private wonderWidth:number = 127;
  private groundURTimes:number;
  private groundVRTimes:number;

  constructor(private room:Room){
    super();
    addGobal('floor',this);
    this.roomHeight = room.getHeight();
    this.roomWidth = room.getWidth();
    this.roomLength = room.getLength();
  }




  init(){
    this.addComponent(new MeshComponent());
    let textureLoader = new THREE.TextureLoader();
    textureLoader.load(this.groundTexture, (texture: THREE.Texture) => {

      this.getFristMeshComponent().geometry = new THREE.PlaneBufferGeometry(this.roomWidth,this.roomLength);;
      this.groundMaterial = new THREE.MeshPhongMaterial({  map: texture });
      this.getFristMeshComponent().material = this.groundMaterial;
      this.updateGroundUV();
      this.addStartBuildingPoint();
    });
  }

  addStartBuildingPoint(){
    var points = this.getFristMeshComponent().getPoints();
    points.forEach((point)=>{
      let buildPoint = new StartBuildPoint(point);
      this.getFristMeshComponent().add(buildPoint);
      buildPoint.addEventListener('mouseup',()=>{
        if(this.startBuildFloorPoint){
          this.startBuildFloorPoint.dehighlight();
        }
        this.startBuildFloorPoint = buildPoint;
        buildPoint.highlight();
        this.updateGroundUV();
      })
    });
  }

  public changeGroundTexture(imgUrl: string) {
    if (imgUrl === this.groundTexture) {
      return
    } else {
      let textureLoader = new THREE.TextureLoader();
      this.groundTexture = imgUrl;
      textureLoader.load(this.groundTexture, (texture: THREE.Texture) => {
        this.groundMaterial.map.repeat.set(5.2747, 9.4488);
        this.groundMaterial.map.wrapS = THREE.RepeatWrapping;
        this.groundMaterial.map.wrapT = THREE.RepeatWrapping;

        this.groundMaterial.map = texture;
      });
    }
  }

  public getRoomArea(): number {
    let area: number;
    area = this.roomWidth * this.roomLength;
    console.log(area / 1000 /1000 + " pingfang");
    return area;
  }



  private updateGroundUV(){
    let ur = this.roomLength/(this.wonderLength* this.textureImageURTimes);
    let vr = this.roomWidth/(this.wonderWidth* this.textureImageVRTimes);
    this.groundMaterial.map.repeat.set(ur,vr);
    var x = -1,y = 1;
    if(this.startBuildFloorPoint){
      x = this.startBuildFloorPoint.getLocationX();
      y = this.startBuildFloorPoint.getLocationY();
      console.log(x,y)
    }

    if(x<0 && y>0){
      this.groundMaterial.map.offset.set(0,1 - (vr - Math.floor(vr)));
      this.getFristMeshComponent().rotation.z = 0;
    }

    if(x>0 && y>0){
      this.groundMaterial.map.offset.set(1 - (ur - Math.floor(ur)),1 - (vr - Math.floor(vr)));
      this.getFristMeshComponent().rotation.z = 0;
    }

    if(x>0 && y<0){
      this.groundMaterial.map.offset.set(1 - (ur - Math.floor(ur)),1 - (vr - Math.floor(vr)));
      this.getFristMeshComponent().rotation.z = Math.PI;
    }


    this.groundMaterial.needsUpdate = true;
    this.groundMaterial.map.wrapS = THREE.RepeatWrapping;
    this.groundMaterial.map.wrapT = THREE.RepeatWrapping;
    this.groundMaterial.needsUpdate = true;
  }




}
