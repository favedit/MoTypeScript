 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FE3dModel{
//    o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MPoolAble, MO.MLinkerResource, MO.MProcessLoad);
//    //..........................................................
//    // @attribute
//    o._dataReady     = false;
//    // @attribute
//    o._display       = MO.Class.register(o, new MO.AGetter('_display'));
//    o._renderable    = MO.Class.register(o, new MO.AGetSet('_renderable'));
//    // @attribute
//    o._listenerLoad  = MO.Class.register(o, new MO.AListener('_listenerLoad', MO.EEvent.Load));
//    //..........................................................
//    // @method
//    o.construct      = MO.FE3dModel_construct;
//    // @method
//    o.testReady      = MO.FE3dModel_testReady;
//    o.loadRenderable = MO.FE3dModel_loadRenderable;
//    o.processLoad    = MO.FE3dModel_processLoad;
//    // @method
//    o.dispose        = MO.FE3dModel_dispose;
//    return o;
// }

// //==========================================================
// // <T>构造处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dModel_construct = function FE3dModel_construct(){
//    var o = this;
//    o.__base.FE3dSpace.construct.call(o);
//    // 创建显示层
//    var layer = o._layer = MO.Class.create(MO.FDisplayLayer);
//    o.registerLayer('sprite', layer);
//    // 创建显示对象
//    var display = o._display = MO.Class.create(MO.FE3dModelDisplay);
//    layer.pushDisplay(display);
// }

// //==========================================================
// // <T>测试是否准备好。</T>
// //
// // @method
// // @return 是否准备好
// //==========================================================
// MO.FE3dModel_testReady = function FE3dModel_testReady(){
//    return this._dataReady;
// }

// //==========================================================
// // <T>加载渲染对象。</T>
// //
// // @param renderable:FE3rModel 渲染对象
// //==========================================================
// MO.FE3dModel_loadRenderable = function FE3dModel_loadRenderable(renderable){
//    var o = this;
//    o._renderable = renderable;
//    // 选择技术
//    o.selectTechnique(o, MO.FE3dGeneralTechnique);
//    // 加载资源
//    var resource = renderable.resource();
//    o.loadResource(resource);
//    // 创建渲染对象
//    o._display.load(renderable);
//    // 数据准备完成
//    o._dataReady = true;
// }

// //==========================================================
// // <T>加载处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dModel_processLoad = function FE3dModel_processLoad(){
//    var o = this;
//    // 检测数据状态
//    if(o._dataReady){
//       return true;
//    }
//    // 检测渲染对象状态
//    var renderable = o._renderable;
//    if(!renderable.testReady()){
//       return false;
//    }
//    o.loadRenderable(renderable);
//    // 加载完成
//    var event = MO.Memory.alloc(MO.SEvent);
//    event.sender = o;
//    o.processLoadListener(event);
//    MO.Memory.free(event);
//    return true;
// }

// //==========================================================
// // <T>构造处理。</T>
// //
// // @method
// //==========================================================
// MO.FE3dModel_dispose = function FE3dModel_dispose(){
//    var o = this;
//    // 释放属性
//    o._display = MO.Lang.Object.dispose(o._display);
//    // 父处理
//    o.__base.FE3dSpace.dispose.call(o);
// }
}