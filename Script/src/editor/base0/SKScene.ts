import VisibleActor from './actor/VisibleActor';
import SKActor from './SKActor';
import SKSpace from './SKSpace';
import MeshComponent from './component/mesh/MeshComponent';
import MeshGroupComponent from './component/mesh/MeshGroupComponent';
import MouseEventHandler from './event/MouseEventHandler';
import SelectedBox2D from '../room/actor/SelectedBoundBox';

export default class SKScene extends THREE.Scene{
  private actors:Array<SKActor> = [];
  public ctrlPts:MeshGroupComponent= new MeshGroupComponent();
  private mouseEventHandler:MouseEventHandler;
  constructor(  private space:SKSpace){
    super();


    this.add( new THREE.AmbientLight( 0xffffff ) );
    //平行光
    var light = new THREE.DirectionalLight( 0xffffff, 0.8 );
    light.position.set( -2000, -4500, 5000 );
    light.castShadow = true;
    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;

    light.shadowCameraNear = 100;
    light.shadowCameraFar = 1200;
    light.shadowCameraTop = 350;
    light.shadowCameraBottom = -350;
    light.shadowCameraRight = 1000;
    light.shadowCameraLeft = -1000;

    this.add( light );
    //this.add(space.selectedBox);

    this.ctrlPts.name= 'ctrls';
    // this.add(this.ctrlPts);
    // this.appendobj(space.ControlPoints);

    this.mouseEventHandler = new MouseEventHandler(space);
  }


  getSpace(){
    return this.space;
  }

  getActors(){
    return this.actors;
  }


  addHelper(mesh:THREE.Object3D){

    // let selected2D:SelectedBox2D = new SelectedBox2D(mesh);
    // this.add(selected2D);
    // console.log(selected2D);
  }

  public appendobj(objects:Array<any>){
    if(objects !== undefined){
      let ctrlPt = new MeshGroupComponent();
      for(let i = 0, l = objects.length;i<l;i++){
        this.ctrlPts.add(objects[i]);
      }
      this.add(this.ctrlPts);
      this.mouseEventHandler.addClickable(this.ctrlPts);
    }else{
      console.log("objects should be a Array<T>");
    }


  }


  add(object: THREE.Object3D|VisibleActor):void{
    if(object instanceof SKActor){
      var actor:VisibleActor = <VisibleActor>object;
      actor.setSpace(this.getSpace())
      this.actors.push(actor);
      var meshGroup = actor.getMeshGroup();
      if(meshGroup instanceof MeshGroupComponent){
        super.add(meshGroup);
        this.mouseEventHandler.addClickable(meshGroup);
      }else{
        console.log(new Error(actor.getClassName() + " no mesh component, so it can't add to rendering scene"));
      }
    }

    if(object instanceof THREE.Object3D){
      super.add(object);
    }
  }

  tick(deltaTime:number){


    for(var i in this.actors){
      var actor = this.actors[i];
      actor.tick(deltaTime);
    }
  }


}
