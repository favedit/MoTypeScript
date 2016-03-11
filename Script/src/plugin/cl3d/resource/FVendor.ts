import {FObject} from '../../runtime/common/lang/FObject';
import {FAttributes} from '../../runtime/common/lang/FAttributes';

//==========================================================
// <T>资源提供商。</T>
//
// @class
// @author maocy
// @history 150309
//==========================================================
export class FVendor extends FObject{
   // 内容地址
   public _contentUrl:string   = null;
   // 参数集合
   public _parameters:FAttributes   = null;

//==========================================================
// <T>构造处理。</T>
//==========================================================
public constructor(){
   super();
   // 设置属性
   this._parameters = new FAttributes();
}

//==========================================================
// <T>获得参数集合。</T>
//
// @return 参数集合
//==========================================================
public get parameters():FAttributes{
   return this._parameters;
}

//==========================================================
// <T>获得参数。</T>
//
// @param name 名称
// @return 内容
//==========================================================
public get(name:string):string{
   return this._parameters.get(name);
}

//==========================================================
// <T>设置参数。</T>
//
// @param name 名称
// @param value 内容
//==========================================================
public set(name:string, value:string):void{
   this._parameters.set(name, value);
}

//==========================================================
// <T>生成网络地址。</T>
//
// @method
// @return 网络地址
//==========================================================
public makeUrl():string{
   var o = this;
   var url = o.makeSource();
   if(MO.Runtime.isDebug()){
      if(url.indexOf('?') == -1){
         url += '?';
      }else{
         url += '&';
      }
      url += 'version=' + MO.Runtime.version();
   }
   return url;
}

// //==========================================================
// // <T>重置处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3sVendor_reset = function FE3sVendor_reset(){
//    this._parameters.clear();
// }

// //==========================================================
// // <T>释放处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
//    var o = this;
//    o._parameters = MO.Lang.Object.dispose(o._parameters);
//    // 父处理
//    o.__base.FObject.dispose.call(o);
// }
}