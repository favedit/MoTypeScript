import {FObject} from '../../../runtime/common/lang/FObject';
import {FDictionary} from '../../../runtime/common/lang/FDictionary';
import {FListeners} from '../../../runtime/common/lang/FListeners';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SColor4} from '../../../runtime/common/math/SColor4';
import {RAssert} from '../../../runtime/common/RAssert';
import {IScene} from '../../../runtime/graphic/IScene';
import {FDisplayLayer} from './FDisplayLayer';

//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
export class FScene extends FObject implements IScene {
   // 激活状态
   public statusActive: boolean = false;
   // 背景颜色
   public backgroundColor: SColor4 = null;
   // 显示层集合
   public layers: FDictionary<FDisplayLayer> = null;
   // 进入帧监听器集合
   public enterFrameListeners: FListeners = null;
   // 离开帧监听器集合
   public leaveFrameListeners: FListeners = null;

   //    o = MO.Class.inherits(this, o, MO.FComponent, MO.MListener);
   //    //..........................................................
   //    // @attribute
   //    o._code                = 'stage';
   //    o._size                = MO.Class.register(o, new MO.AGetter('_size'));
   //    o._timer               = MO.Class.register(o, new MO.AGetter('_timer'));
   //    // @attribute
   //    o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   //    o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      //this._size = new SSize2(1920, 1080);
      //this._timer = RClass.create(MO.FTimer);
      this.backgroundColor = new SColor4(0.5, 0.5, 0.5, 1.0);
      this.layers = new FDictionary<FDisplayLayer>();
      // 设置变量
      this.enterFrameListeners = new FListeners(this);
      this.leaveFrameListeners = new FListeners(this);
   }

   //==========================================================
   // <T>注册一个显示层。</T>
   //
   // @param code 名称
   // @param layer 显示层
   //==========================================================
   public registerLayer(code: string, layer: FDisplayLayer): void {
      RAssert.debugNotEmpty(code);
      RAssert.debugNotNull(layer);
      // 存储层
      this.layers.set(code, layer);
   }

   //==========================================================
   // <T>注销一个显示层。</T>
   //
   // @param name 名称
   //==========================================================
   public unregisterLayer(code: string): void {
      RAssert.debugNotEmpty(code);
      // 清空层
      this.layers.set(code, null);
   }

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   public active(): void {
      // 设置状态
      this.statusActive = true;
      // 层集合处理
      var layers: FDictionary<FDisplayLayer> = this.layers;
      var count: number = layers.count();
      for (var n: number = 0; n < count; n++) {
         var layer: FDisplayLayer = layers.at(n);
         layer.active();
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public deactive(): void {
      // 层集合处理
      var layers: FDictionary<FDisplayLayer> = this.layers;
      var count: number = layers.count();
      for (var n: number = 0; n < count; n++) {
         var layer: FDisplayLayer = layers.at(n);
         layer.deactive();
      }
      // 设置状态
      this.statusActive = false;
   }

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @method
   // //==========================================================
   // public onProcess() {
   //     var o = this;
   //     // 舞台处理
   //     var layers = o._layers;
   //     var count = layers.count();
   //     for (var i = 0; i < count; i++) {
   //         var layer = layers.at(i);
   //         layer.process();
   //     }
   // }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public process() {
      // 设置计时器
      // var timer = this._timer;
      // if (!timer) {
      //    timer = RClass.create(FTimer);
      //    timer.setup();
      // }
      //..........................................................
      // 前处理
      //this.processEnterFrameListener(o);
      // 逻辑处理
      //o.onProcess();
      // 后处理
      //this.processLeaveFrameListener(o);
      //..........................................................
      // 计时器更新
      //timer.update();
   }
   
   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.backgroundColor = RObject.dispose(this.backgroundColor);
      this.layers = RObject.dispose(this.layers);
      this.enterFrameListeners = RObject.dispose(this.enterFrameListeners);
      this.leaveFrameListeners = RObject.dispose(this.leaveFrameListeners);
      // 父处理
      super.dispose();
   }
}