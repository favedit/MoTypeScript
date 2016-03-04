import * as common from './common/index';
export {common as common}

import * as core from './core/index';
export {core as core}

var sk = (window as any).sk;
if(!sk){
   sk = new Object();
   (window as any).sk = sk;
}
var runtime = sk.runtime;
if(!runtime){
   runtime = new Object();
   sk.runtime = runtime;
}
runtime.common = common;
runtime.core = core;
 
