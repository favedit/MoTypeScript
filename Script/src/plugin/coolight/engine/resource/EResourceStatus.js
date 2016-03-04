//===========================================================
// <T>按键代码枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
MO.EResourceStatus = new function EResourceStatus(){
   var o = this;
   // @attribute 未知
   o.Unknown     = 'unknown';
   // @attribute 加载
   o.Load     = 'load';
   // @attribute 加载完成
   o.Loaded   = 'loaded';
   // @attribute 完成
   o.Complete = 'complete';
   return o;
}
