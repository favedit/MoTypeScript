import {EventTarget} from '../core/EventTarget';
import  {Professional} from '../app/Professional'
export interface IPluginContext{
  app:Professional
}
export class IPlugin extends EventTarget{
  protected type ;
  protected enable;

  protected name:string ;  //插件名称
  protected description:string; //插件描述
  protected dependencies:Array<IPlugin>;//插件依赖
  protected context:IPluginContext;
  constructor(config:{
    enable?:boolean,
    name?:string,
    description?:string,
    dependencies?:Array<IPlugin>;
  }){
        super();
        config = config || {};
        this.type = void 0;
        this.enable = void 0 !== config.enable ? config.enable : !0;
        this.name = void 0 !== config.name ? config.name : "Unnamed plugin";
        this.description = void 0 !== config.description ? config.description : "No Description";
        this.dependencies = void 0 !== config.dependencies ? config.dependencies : []
  }

  onCreate(a){

  }

  onDestory(a){

  }

  onActive(context?:IPluginContext,b?:any){

  }

  onDeactive(context?:any){

  }
}
