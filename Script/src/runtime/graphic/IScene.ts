// import {FObject} from '../common/lang/ObjectBase';
import {Dictionary} from '../common/lang/Dictionary';
import {Listeners} from '../common/lang/Listeners';
// import {RObject} from '../common/lang/ObjectUtil';
import {SColor4} from '../common/math/SColor4';
// import {RAssert} from '../common/AssertUtil';
import {IDisplayLayer} from './IDisplayLayer';
//import {FRegion} from './FRegion';

//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
export interface IScene {
   // // 代码
   // public code = 'scene';
   // 激活状态
   statusActive: boolean;
   // 背景颜色
   backgroundColor: SColor4;
   // 显示层集合
   layers: Dictionary<IDisplayLayer>;
   // 进入帧监听器集合
   enterFrameListeners: Listeners;
   // 离开帧监听器集合
   leaveFrameListeners: Listeners;

   //==========================================================
   // <T>注册一个显示层。</T>
   //
   // @param code 名称
   // @param layer 显示层
   //==========================================================
   registerLayer(code: string, layer: IDisplayLayer): void;

   //==========================================================
   // <T>注销一个显示层。</T>
   //
   // @param name 名称
   //==========================================================
   unregisterLayer(code: string): void;

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   active(): void;

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   deactive(): void;

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @param region 区域
   // //==========================================================
   // public process(region: FRegion) {
   //    // 前处理
   //    //this.processEnterFrameListener(o);
   //    //..........................................................
   //    // 逻辑处理
   //    var layers: FDictionary<FDisplayLayer> = this.layers;
   //    var count: number = layers.count();
   //    for (var n: number = 0; n < count; n++) {
   //       var layer = layers.at(n);
   //       layer.process(region);
   //    }
   //    //..........................................................
   //    // 后处理
   //    //this.processLeaveFrameListener(o);
   // }
}
