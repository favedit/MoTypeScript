import SKComponent from './SKComponent';
import SKObject from './SKObject';
import SKSpace from './SKSpace';
import * as SKUtils from './SKUtils';
import SKMouseEvent from './event/SKMouseEvent';
export default class SKActor extends SKObject{

  protected components:Array<SKComponent> = [];
  protected isInited = false;
  protected isActive = false;
  protected isAutoActive = true;

  protected space:SKSpace;

  public parent:SKActor;

  public children:Array<SKActor> = [];



  //protected visualMeshComponent:VisualMeshComponent;

  constructor(){
    super();

    var upEvent = (e:SKMouseEvent)=>{
      if(e && !e.isStopedPropagation()){
        var parent = this.getParent();
        if(parent){
          parent.dispatchEvent(e);
        }
      }
    }

    this.addEventListener('mouseup',upEvent);
    this.addEventListener('mousemove',upEvent);
    this.addEventListener('mousedown',upEvent);
    this.addEventListener('contextmenu',upEvent);
  }

  addChild(actor:SKActor){
    actor.parent = this;
    actor.setSpace(this.space);
    this.children.push(actor);
  }

  removeChild(actor:SKActor){
    for(var i in this.children){
      if(this.children[i] == actor){
        this.children.splice(i,1);
      }
    }
  }


  getParent(){
    return this.parent;
  }


  setSpace(space:SKSpace){
    this.space = space;
    if(this.isAutoActive){
        this.active();
    }
    this.children.forEach(function(actor){
      actor.setSpace(space);
    });
  }

  //激活组件
  active(){
    this.isActive = true;

    this.components.forEach((component,index)=>{
      component.active();
    });

    this.dispatchEvent({type:'active'})
  }

  //
  deactive(){
    this.isActive = false;
    this.components.forEach((component,index)=>{
      component.deactive();
    });

    this.dispatchEvent({type:'deactive'})
  }

  getSpace(){
    return this.space;
  }

  addComponent(component:SKComponent){
    this.components.push(component);
    component.register(this);
  }



  tick(deltaTime:number){
    for(let i in this.components){
      this.components[i].tick(deltaTime);
    }
    for(let i in this.children){
      var actor = this.children[i];
      actor.tick(deltaTime);
    }
  }

  init(callback?:Function){
    //同时init所有children
      if(callback){
        SKUtils.asyncEach(this.children,function(actor,cb){
          actor.init(cb);
        },()=>{

          this.initComponents(callback);
          this.isInited = true;
        })
      }else{
        this.children.forEach(function(actor){
          actor.init();
        });
        this.initComponents(callback);
        this.isInited = true;
      }

  }


  initComponents(callback){
    SKUtils.asyncEach(this.components,function(component,cb){
      component.init(cb);
    },()=>{
      if(callback) callback();
    })
  }

  //希望外侧的轮廓先加载
  lazyInit(){

  }



}
