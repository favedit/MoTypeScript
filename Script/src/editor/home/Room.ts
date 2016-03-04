import RoomActor from './RoomActor';
import Door from './actor/Door';
import SKWindow from './actor/SKWindow';
import CurtainBox from './actor/CurtainBox';
import FalseRoof from './actor/FalseRoof';
import GypsumLineSet from './actor/GypsumLineSet';
import WallMeshComponent from './component/mesh/WallMeshComponent';
import MeshComponent from '../core/component/mesh/MeshComponent';
import Wall from './actor/Wall';
import Floor from './actor/Floor';

import Wardrobe from './actor/Wardrobe';

import {addGobal} from '../core/SKUtils';
import keymaps from './config/keymaps';
import VisibleActor from '../core/actor/VisibleActor';

export default class Room extends RoomActor{

  private topLayer:Array<RoomActor>;

    private falseRoof:FalseRoof;
    private curtainBox:CurtainBox;

  constructor(){
    super();
    this.length = 4800;
    this.width = 3600;
    this.height = 2800;

    this.addEventListener('active',()=>{
      this.getSpace().setKeymaps(keymaps);
    });

    this.addEventListener('deactive',()=>{

    });

    setTimeout(()=>{
      console.log(this.getNearestOf(this.falseRoof));
      console.log(this.getFarthestOf(this.falseRoof,Door));
    },500)

    addGobal('room',this);
  }

  getCenterPoint(){
    return new THREE.Vector3(this.width/2,this.length/2,this.height/2);
  }

  getTopLayer(){
    return this.topLayer;
  }

  init(callback){

    this.topLayer = new Array();
    addGobal('topLayer',this.topLayer);

    var door = new Door();
    door.init(()=>{
        this.addDoor(door)
    });

    var skwindow = new SKWindow();
    skwindow.init(()=>{
      this.addSKWindow(skwindow);
    })
    //
    var wall = new Wall(this);
    wall.init();
    this.addChild(wall);
    //
    //
    var falseRoof = new FalseRoof();
    falseRoof.init();
    this.addFalseRoof(falseRoof);

    var curtainBox = new CurtainBox();
    curtainBox.init();
    this.addCurtainBox(curtainBox);

    var gypsumLineSet = new GypsumLineSet(this);
    gypsumLineSet.init();
    // this.addGypsumLineSet(gypsumLineSet);

    this.addFloor();

    var wardrobe = new Wardrobe();
    wardrobe.init(()=>{
      this.addCabinet(wardrobe)
    });

    callback();
  }

  addCabinet(cabinet:Wardrobe){
    cabinet.getMeshGroup().position.y = this.getLength() - cabinet.getWidth()/2;
    cabinet.getMeshGroup().position.x = this.getWidth() - cabinet.getLength()/2;

    this.addChild(cabinet);
  }

  addDoor(door:Door){
    door.getMeshGroup().position.y = this.getLength();
    door.getMeshGroup().position.z = door.getHeight()/2;
    door.getMeshGroup().position.x = door.getLength()/2 + 60;
    this.addChild(door);
  }

  addSKWindow(skwindow:SKWindow){
    skwindow.getMeshGroup().position.x = this.getWidth() /2;
    skwindow.getMeshGroup().position.z = skwindow.getHeight()/2+500;
    skwindow.getMeshGroup().position.y = -60;
    this.addChild(skwindow);
  }

  addCurtainBox(box:CurtainBox){
    box.setLength(this.getWidth());
    box.setWidth(20);
    box.setHeight(220);
    box.getMeshGroup().position.x = this.getWidth()/2;
    box.getMeshGroup().position.z = this.getHeight() - box.getHeight()/2;
    box.getMeshGroup().position.y = box.getDistanceToWindowWall();
    this.topLayer.push(box);
    this.curtainBox = box;
    this.addChild(box);
  }

  addFalseRoof(falseRoof:FalseRoof){

    falseRoof.getMeshGroup().position.y = this.getLength() - falseRoof.getWidth()/2;
    falseRoof.getMeshGroup().position.x = this.getWidth() - falseRoof.getLength()/2;
    falseRoof.getMeshGroup().position.z = this.getHeight() - falseRoof.getHeight()/2;
    //this.topLayer.add(falseRoof.getFristMeshComponent());
    this.topLayer.push(falseRoof);
    this.falseRoof = falseRoof;
    this.addChild(falseRoof)
  }

  addFloor(){
    var floor = new Floor(this);
    floor.init();
    floor.getMeshGroup().position.x = this.getWidth()/2;
    floor.getMeshGroup().position.y = this.getLength()/2;
    this.addChild(floor);
  }

  addGypsumLineSet(gypsumLineSet:GypsumLineSet){
    this.topLayer.push(gypsumLineSet);
    this.addChild(gypsumLineSet)
  }

  getCurtainBox(){
    return this.curtainBox;
  }

  getFalseRoof(){
    return this.falseRoof;
  }

  showAllActorsAxleWire(){
    this.children.forEach((actor:RoomActor)=>{
      if(actor instanceof RoomActor){
        actor.showAxleWire();
      }

    });
  }

  hideAllActorsAxleWrie(){
    this.children.forEach((actor:RoomActor)=>{
        if(actor instanceof RoomActor){
          actor.hideAxleWire();
        }
    });
  }



}
