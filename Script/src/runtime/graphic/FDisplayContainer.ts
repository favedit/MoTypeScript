import {FObjects} from '../common/lang/FObjects'
import {RObject} from '../common/lang/RObject'
import {RAssert} from '../common/RAssert'
import {FDisplay} from './FDisplay';
import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象集合。</T>
//
// @author maocy
// @history 160305
//==========================================================
export class FDisplayContainer extends FDisplay {
   // 显示集合
   public displays: FObjects<FDisplay> = null;

   //==========================================================
   // <T>判断是否含有子节点。</T>
   //
   // @return Boolean 是否含有
   //==========================================================
   public hasDisplay() {
      var displays: FObjects<FDisplay> = this.displays;
      if (displays) {
         return !displays.isEmpty();
      }
      return false;
   }

   //==========================================================
   // <T>增加一个显示对象。</T>
   //
   // @param display 显示对象
   //==========================================================
   public pushDisplay(display: FDisplay) {
      RAssert.debugNotNull(display);
      // 获得显示集合
      var displays: FObjects<FDisplay> = this.displays;
      if (!displays) {
         displays = this.displays = new FObjects<FDisplay>();
      }
      // 设置显示对象
      display.parent = this;
      displays.push(display);
   }

   //==========================================================
   // <T>移除一个显示对象。</T>
   //
   // @method
   // @param display:FDisplay 显示对象
   //==========================================================
   public removeDisplay(display: FDisplay) {
      RAssert.debugNotNull(display);
      // 获得显示集合
      var displays:FObjects<FDisplay> = this.displays;
      if (displays) {
         // 移除显示对象
         displays.remove(display);
         display.parent = null;
      }
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @param region 区域
   //==========================================================
   public process(region: FRegion) {
      super.process(region);
      // 处理显示集合
      var displays: FObjects<FDisplay> = this.displays;
      if (displays) {
         var count: number = displays.count();
         for (var i: number = 0; i < count; i++) {
            var display = displays.at(i);
            display.process(region);
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose(): void {
      // 释放所有子节点
      this.displays = RObject.dispose(this.displays);
      super.dispose();
   }
}