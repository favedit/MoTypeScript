import {FObject} from '../common/lang/FObject';
import {FDictionary} from '../common/lang/FDictionary';
import {FListeners} from '../common/lang/FListeners';
import {RObject} from '../common/lang/RObject';
import {SColor4} from '../common/math/SColor4';
import {RAssert} from '../common/RAssert';
import {FDisplayLayer} from './FDisplayLayer';
import {FRegion} from './FRegion';

//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
export class FScene extends FObject {
   // 代码
   public code = 'scene';
   // 激活状态
   public statusActive = false;
   // 背景颜色
   public backgroundColor: SColor4 = null;
   // 显示层
   public layers: FDictionary<FDisplayLayer> = null;
   // 进入帧监听器集合
   public enterFrameListeners: FListeners = null;
   // 离开帧监听器集合
   public leaveFrameListeners: FListeners = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this.backgroundColor = new SColor4(0, 0, 0, 1);
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
   public active() {
      // 设置状态
      this.statusActive = true;
      // 层集合处理
      var layers = this.layers;
      var count = layers.count();
      for (var i = 0; i < count; i++) {
         var layer = layers.at(i);
         layer.active();
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public deactive() {
      // 层集合处理
      var layers: FDictionary<FDisplayLayer> = this.layers;
      var count: number = layers.count();
      for (var n: number = 0; n < count; n++) {
         var layer = layers.at(n);
         layer.deactive();
      }
      // 设置状态
      this.statusActive = false;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @param region 区域
   //==========================================================
   public process(region: FRegion) {
      // 前处理
      //this.processEnterFrameListener(o);
      //..........................................................
      // 逻辑处理
      var layers: FDictionary<FDisplayLayer> = this.layers;
      var count: number = layers.count();
      for (var n: number = 0; n < count; n++) {
         var layer = layers.at(n);
         layer.process(region);
      }
      //..........................................................
      // 后处理
      //this.processLeaveFrameListener(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.backgroundColor = RObject.dispose(this.backgroundColor);
      this.layers = RObject.dispose(this.layers);
      // 父处理
      super.dispose();
   }
}
