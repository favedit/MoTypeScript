import {FObjects} from '../../../runtime/common/lang/FObjects'
import {RObject} from '../../../runtime/common/lang/RObject'
import {FDisplay} from './FDisplay';
import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象集合。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FDisplayContainer extends FDisplay {
   // @attribute
   public displays: FObjects<any> = null;

   // //==========================================================
   // // <T>判断是否含有子节点。</T>
   // //
   // // @method
   // // @return Boolean 是否含有
   // //==========================================================
   // public hasDisplay() {
   //     var displays = this._displays;
   //     if (displays) {
   //         return !displays.isEmpty();
   //     }
   //     return false;
   // }

   // //==========================================================
   // // <T>根据代码查找显示对象。</T>
   // //
   // // @method
   // // @param code:String 代码
   // // @return FDisplay 显示对象
   // //==========================================================
   // public findDisplay(code) {
   //     var o = this;
   //     var displays = o._displays;
   //     if (displays) {
   //         var count = displays.count();
   //         for (var i = 0; i < count; i++) {
   //             var display = displays.at(i);
   //             if (display.code() == code) {
   //                 return display;
   //             }
   //         }
   //     }
   //     return null
   // }

   // //==========================================================
   // // <T>根据名称搜索子节点。</T>
   // //
   // // @method
   // // @param p:name:String 名称
   // // @return FDisplay 子节点
   // //==========================================================
   // public searchDisplay(p) {
   //     var o = this;
   //     var displays = o._displays;
   //     if (displays) {
   //         var c = displays.count();
   //         for (var i = 0; i < c; i++) {
   //             var f = displays.at(i);
   //             // 判断当前节点
   //             if (f.isName(p)) {
   //                 return f;
   //             }
   //             // 判断子节点集合
   //             var r = f.searchDisplay(p);
   //             if (r) {
   //                 return r;
   //             }
   //         }
   //     }
   //     return null
   // }

   //==========================================================
   // <T>增加一个显示对象。</T>
   //
   // @method
   // @param display:FDisplay 显示对象
   //==========================================================
   public pushDisplay(display: FDisplay) {
      var displays = this.displays;
      // 获得显示集合
      if (!displays) {
         displays = this.displays = new FObjects();
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
      var displays = this.displays;
      if (displays) {
         displays.remove(display);
         display.parent = null;
      }
   }

   //==========================================================
   // <T>过滤显示集合。</T>
   //
   // @method
   // @param region:FRegion 渲染区域
   //==========================================================
   public filterDisplays(region: FRegion): boolean {
      var result: boolean = super.filterDisplays(region);
      // 检查结果
      if (!result) {
         return false;
      }
      // 过滤显示集合
      var displays = this.displays;
      if (displays) {
         var count = displays.count();
         for (var i = 0; i < count; i++) {
            var display = displays.at(i);
            display.filterDisplays(region);
         }
      }
      return true;
   }

   //==========================================================
   // <T>过滤渲染集合。</T>
   //
   // @method
   // @param region 渲染区域
   //==========================================================
   public filterRenderables(region:FRegion) {
      var result: boolean = super.filterRenderables(region);
      // 检查结果
      if (!result) {
         return false;
      }
      // 过滤显示集合
      var displays = this.displays;
      if (displays) {
         var count = displays.count();
         for (var i = 0; i < count; i++) {
            var display = displays.at(i);
            display.filterRenderables(region);
         }
      }
      return true;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @param region 区域
   //==========================================================
   public process(region: FRegion) {
      super.process(region);
      // 处理显示集合
      var displays = this.displays;
      if (displays) {
         var count = displays.count();
         for (var i = 0; i < count; i++) {
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