//==========================================================
// <T>会话对象。</T>
//
// @class
// @author maocy
// @history 151229
//==========================================================
MO.FSession = function FSession(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code     = MO.Class.register(o, new MO.AGetSet('_code'));
   //..........................................................
   // @method
   o.construct = MO.FSession_construct;
   // @method
   o.setup     = MO.FSession_setup;
   // @method
   o.dispose   = MO.FSession_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FSession_construct = function FSession_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FSession_setup = function FSession_setup(){
   var o = this;
   o._code = MO.Window.cookie(MO.EApplicationConstant.SessionCode);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FSession_dispose = function FSession_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
