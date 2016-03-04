import SKComponent from '../../SKComponent';
import {Component} from '../../IoC';
import IMeshComponent from './IMeshComponent';
import * as SKUtils from '../../SKUtils';
import SKActor from '../../SKActor';
import EventDispather from '../../event/EventDispather';
import Vertex from '../../math/Vertex';
import SKObject from '../../SKObject';
import VisibleActor from '../../actor/VisibleActor';

@Component()
export default class MeshComponent extends THREE.Mesh implements IMeshComponent{
    public owner:SKActor;
    public isActive:boolean;
    public componentTags:string;
    public registered:boolean;
    public isInited:boolean = false;
    children:  MeshComponent[] | THREE.Object3D[];

    constructor(){
      super();

      var dispathActorEvent = (e)=>{
        if(e && !e.isStopedPropagation()){
          var owner = this.getOwner();
          if(owner){
            owner.dispatchEvent(e);
          }
        }
      }

      this.addEventListener('mouseup',dispathActorEvent);
      this.addEventListener('mousemove',dispathActorEvent);
      this.addEventListener('mousedown',dispathActorEvent);
      this.addEventListener('contextmenu',dispathActorEvent);
    }

  public listeners;

  register(actor:SKActor){}

  getOwner():VisibleActor{
    return undefined;
  }

  onRegistered(){

  }
  active(){}

  deactive(){}

  tick(deltaTime:number){

  }

  init(callback?:Function){

  }

  getClassName():string{
    return 'MeshComponent'
  }

  getClass():Function{
    return undefined;
  }

  static fromThree(mesh:THREE.Mesh){
    var meshComponent = new MeshComponent();
    for(var i in mesh){
      //　判断three.js中Mesh对象中废弃的方法，消除浏览器console中的warning信息．
      if(i != 'eulerOrder' && i != 'useQuaternion' && i!= 'renderDepth'){
        meshComponent[i] = mesh[i];
      }
    }
    return meshComponent;
  }



  static getClassName(){
    return SKUtils.getMyClassName(this);
  }


  addEventListener( type, listener ){}

  hasEventListener( type, listener ):boolean{
    return undefined;
  }

  removeEventListener( type, listener ){}

  dispatchEvent( event ) {}

  add(object: THREE.Object3D|MeshComponent): void{
    super.add(object);
  }


  getPoints(){
    var points = [];
    if(this.geometry instanceof THREE.BufferGeometry){
      var bufferGeometry:THREE.BufferGeometry = <THREE.BufferGeometry>this.geometry;
      var position:THREE.BufferAttribute =<THREE.BufferAttribute> (<any>bufferGeometry.attributes).position;
      for(var i=0;i<position.array.length;i+=3){
        points.push(new Vertex(position.array[i],position.array[i+1],position.array[i+2]));
      }
    }
    return points;
  }
  getGobalPoints(){
      var points = this.getPoints();
      points.forEach((point)=>{
          point.applyMatrix4(this.matrixWorld)
      });
      return points;
  }

  removeMe(){
    if(this.parent){
      this.parent.remove(this);
      // this.geometry.dispose();
      // this.material.dispose();
      // this.texture.dispose();
    }else{
      var scene = this.getOwner().getSpace().scene;
      scene.remove(this);
    }
  }


  getCenterPoint(){
    var c = this.getGeometryCenter(this.geometry);
    if(this.isNaNCenter(c)){
      c = this.getAverageCenterFromArray(this.children)
    }
    return c;
  }

  private isNaNCenter(c){
    if(!c){
      return true;
    }
    return isNaN(c.x) && isNaN(c.y) && isNaN(c.z)
  }

  private getAverageCenterFromArray(array){
    var c = new THREE.Vector3();
    array.forEach((item)=>{
      let itemCenter:THREE.Vector3;
      if(item instanceof THREE.Mesh || item instanceof MeshComponent){
        itemCenter = this.getGeometryCenter(item.geometry);
      }
      if(this.isNaNCenter(itemCenter)){
        itemCenter = this.getAverageCenterFromArray(item.children)
      }
      c.add(itemCenter);
    });
    c.divideScalar(array.length || 1);
    return c;
  }

  private getGeometryCenter(geometry){
    var c  = new THREE.Vector3();
    geometry.computeBoundingBox();
    c.addVectors(geometry.boundingBox.min,geometry.boundingBox.max);
    c.divideScalar(2);
    return c;
  }

}

//var getClassName = MeshComponent.prototype.getClassName;
SKUtils.applyMixins(MeshComponent,[EventDispather,SKObject,SKComponent])
//MeshComponent.prototype.getClassName = getClassName;
