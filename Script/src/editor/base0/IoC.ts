import SKActor from './SKActor';
import SKComponent from './SKComponent';

var sysComponents:any = {};


export function Component(){
  return function(target:Function) {
    let comClass = <any>target;
    let comClassName = comClass.getClassName();
    if(sysComponents[comClassName]){
      console.log(new Error('alreay a ' + comClassName + ' return..!'));
      return;
    }
    sysComponents[comClassName] = comClass;
  }
}

export function Application(){
  return function(target:Function) {
    var app:IApplication = new (<any>target)();
    app.init();
    app.startup();
  }
}

export interface IApplication{
  init();
  startup();
}

export function getComponentClass(name:string):()=>void{
  var comClass =  sysComponents[<string>name];
  if(!comClass){
    console.log(new Error("can't find component: " + name));
  }
  return comClass;
}

export function getComponentClassAsync(name:string,callback:Function){
  var comClass =  sysComponents[<string>name];
  if(comClass){
    callback(comClass);
    return;
  }

  require(['component_config'],function(comConfig){
    //console.log(comConfig);
    var comUrl = comConfig.default[name];
    //console.log(comUrl);
    require([comUrl],function(comClass){
      comClass = comClass.default;
      //console.log(comClass);
      if(!comClass){
        //console.log(new Error("can't find component: " + name));
      }else{
        var comClassName = comClass.getClassName();
        //console.log(comClassName + 'load success')
        if(sysComponents[comClassName]){
          //console.log(new Error('alreay a ' + comClassName + ' return..!'));
        }else{
          sysComponents[comClassName] = comClass;
        }
      }
      callback(comClass);
    });
  })

}
