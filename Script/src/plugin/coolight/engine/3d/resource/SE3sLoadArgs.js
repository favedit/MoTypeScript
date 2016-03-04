//==========================================================
// <T>资源加载参数。</T>
//
// @author maocy
// @history 151225
//==========================================================
MO.SE3sLoadArgs = function SE3sLoadArgs(){
   var o = this;
   //..........................................................
   // @attribute
   o.guid    = null;
   o.code    = null;
   //..........................................................
   // @method
   o.free    = MO.Method.freeStruct;
   o.dispose = MO.Method.disposeStruct;
   return o;
}
