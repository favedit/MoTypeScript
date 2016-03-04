import MeshComponent from './component/mesh/MeshComponent';
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

export function getMyClassName(clazz){
  if (clazz && clazz.toString) {
      var arr = clazz.toString().match(
          /function\s*(\w+)/);

      if (arr && arr.length == 2) {
          return arr[1];
      }
  }
  //console.log(new Error("can't find my class name return undefined " + clazz))
  return undefined;
}

export function asyncEach(list,exec:(item,cb)=>void,callback){
  var completed = 0;
  if(list.length > 0){
    for(var i in list){
      completed ++;
      exec(list[i],function(){
        completed --;
        if(completed <= 0){
          if(callback) callback();
        }
      });
    }
  }else{
    if(callback) callback();
  }

}

export function addGobal(name,obj){
  (<any>window)[name] = obj;
}


export function getMeshSize(mesh:MeshComponent){
  var box = new THREE.Box3().setFromObject( mesh );
  return box.size();
}
