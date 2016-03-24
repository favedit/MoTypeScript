import {DisplayLayer} from '../base/DisplayLayer';
import {Scene} from '../base/Scene';

//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
export class FSimpleScene extends Scene {
   //    // @attribute
   //    o._visible              = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   //    o._code                 = MO.Class.register(o, new MO.AGetSet('_code'));
   //    o._application          = MO.Class.register(o, new MO.AGetSet('_application'));
   //    o._chapter              = MO.Class.register(o, new MO.AGetSet('_chapter'));
   //    o._activeStage          = MO.Class.register(o, new MO.AGetSet('_activeStage'));
   //    // @attribute
   //    o._statusSetup          = false;
   //    o._statusActive         = false;
   public backgroundLayer: DisplayLayer;
   public contentLayer: DisplayLayer;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
      this.backgroundColor.set(1, 1, 1, 1);
      // 创建背景层
      var layer = this.backgroundLayer = new DisplayLayer();
      this.registerLayer('background', layer);
      // 创建内容层
      var layer = this.contentLayer = new DisplayLayer();
      this.registerLayer('content', layer);
   }


   // //==========================================================
   // // <T>操作可见处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件信息
   // //==========================================================
   // MO.FScene_onOperationVisibility = function FScene_onOperationVisibility(event){
   //    var o = this;
   //    o.__base.MEventDispatcher.onOperationVisibility.call(o, event);
   //    // 设置可见性
   //    o._visible = event.visibility;
   // }

   // //==========================================================
   // // <T>响应开始处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件信息
   // //==========================================================
   // MO.FScene_onProcessReady = function FScene_onProcessReady(event){
   //    MO.Logger.debug(this, 'Scene process ready. (code={1})', this._code);
   // }

   // //==========================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FScene_construct = function FScene_construct(){
   //    var o = this;
   //    o.__base.FObject.construct.call(o);
   //    o.__base.MFrameProcessor.construct.call(o);
   // }

   // //==========================================================
   // // <T>激活处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FScene_active = function FScene_active(){
   //    var o = this;
   //    // 配置处理
   //    if(!o._statusSetup){
   //       o.setup();
   //       o._statusSetup = true;
   //    }
   //    // 设置状态
   //    o._statusActive = true;
   //    MO.Logger.debug(o, 'Scene active. (code={1})', o._code);
   //    // 大小处理
   //    o.processResize();
   // }

   // //==========================================================
   // // <T>取消激活处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FScene_deactive = function FScene_deactive(){
   //    var o = this;
   //    // 设置状态
   //    o._statusActive = false;
   //    MO.Logger.debug(o, 'Scene deactive. (code={1})', o._code);
   // }

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FScene_process = function FScene_process(){
   //    var o = this;
   //    // 测试状态
   //    var loader = o._readyLoader;
   //    if(!loader.testReady()){
   //       return;
   //    }
   //    //..........................................................
   //    // 检查激活状态
   //    if(o._statusActive){
   //       // 前处理
   //       o.processEnterFrameListener(o._eventEnterFrame);
   //       // 前逻辑处理
   //       o.onProcessBefore();
   //       // 场景处理
   //       o.onProcess();
   //       // 场景绘制
   //       if(o._activeStage){
   //          o._activeStage.process();
   //       }
   //       // 后逻辑处理
   //       o.onProcessAfter();
   //       // 后处理
   //       o.processLeaveFrameListener(o._eventLeaveFrame);
   //    }
   // }

   // //==========================================================
   // // <T>事件处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件信息
   // //==========================================================
   // MO.FScene_processEvent = function FScene_processEvent(event){
   //    var o = this;
   //    // 处理事件
   //    o.dispatcherEvent(event);
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FScene_dispose = function FScene_dispose(){
   //    var o = this;
   //    // 父处理
   //    o.__base.MFrameProcessor.dispose.call(o);
   //    o.__base.MListener.dispose.call(o);
   //    o.__base.FObject.dispose.call(o);
   // }
}