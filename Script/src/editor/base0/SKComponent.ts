import SKActor from './SKActor';
import SKObject from './SKObject';
import MeshComponent from './component/mesh/MeshComponent';
export default class SKComponent extends SKObject{

  public owner:SKActor;

  //组件是否激活的标示
  public isActive:boolean;

  public isInited:boolean = false;

  //组件标签，供以后搜索使用
  public componentTags:string;

  //组件是否已被注册到对象上
  public registered:boolean;


  register(actor:SKActor){
    this.owner = actor;
    this.registered = true;
    this.dispatchEvent({type:'register'});
  }

  getOwner(){
    return this.owner;
  }


  //激活组件
  active(){
    this.isActive = true;
    this.dispatchEvent({type:'active'})
  }

  //
  deactive(){
    this.isActive = false;
    this.dispatchEvent({type:'deactive'})
  }

  init(callback?:Function){
    this.isInited = true;
    if(callback) callback();
  }

  tick(deltaTime:number){

  }
}
