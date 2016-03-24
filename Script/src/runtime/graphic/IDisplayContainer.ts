import {Objects} from '../common/lang/Objects'
import {ObjectUtil} from '../common/lang/ObjectUtil'
import {RAssert} from '../common/RAssert'
import {IDisplay} from './IDisplay';
//import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象集合。</T>
//
// @author maocy
// @history 160305
//==========================================================
export interface IDisplayContainer extends IDisplay {
   // 显示集合
   _displays: Objects<IDisplay>;

   //==========================================================
   // <T>判断是否含有子显示对象。</T>
   //
   // @return 是否含有
   //==========================================================
   hasDisplay(): boolean;

   //==========================================================
   // <T>增加一个显示对象。</T>
   //
   // @param display 显示对象
   //==========================================================
   pushDisplay(display: IDisplay): void;

   //==========================================================
   // <T>移除一个显示对象。</T>
   //
   // @param display 显示对象
   //==========================================================
   removeDisplay(display: IDisplay): void;

   //==========================================================
   // <T>清空渲染对象集合。</T>
   //==========================================================
   clearDisplays(): void;

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @param region 区域
   // //==========================================================
   // public process(region: FRegion) {
   //    super.process(region);
   //    // 处理显示集合
   //    var displays: FObjects<FDisplay> = this.displays;
   //    if (displays) {
   //       var count: number = displays.count();
   //       for (var i: number = 0; i < count; i++) {
   //          var display = displays.at(i);
   //          display.process(region);
   //       }
   //    }
   // }
}