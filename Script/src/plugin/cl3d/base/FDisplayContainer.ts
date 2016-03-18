import {FError} from '../../../runtime/common/lang/FError'
import {FObjects} from '../../../runtime/common/lang/FObjects'
import {RObject} from '../../../runtime/common/lang/RObject'
import {SOutline3d} from '../../../runtime/common/math/SOutline3d';
import {RAssert} from '../../../runtime/common/RAssert'
import {IDisplayContainer} from '../../../runtime/graphic/IDisplayContainer';
import {FRenderable} from './FRenderable';
import {FDisplay} from './FDisplay';
import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象集合。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FDisplayContainer extends FDisplay implements IDisplayContainer {
   // 显示集合
   public _displays: FObjects<FDisplay> = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>计算轮廓大小。</T>
   //
   // @return 轮廓
   //==========================================================
   public calculateOutline(): SOutline3d {
      var outline = this.outline;
      if (outline.isEmpty()) {
         outline.setMin();
         // 计算渲染集合的轮廓
         var renderables = this.renderables;
         if (renderables) {
            var count: number = renderables.count();
            for (var n: number = 0; n < count; n++) {
               var renderable: FRenderable = renderables.at(n);
               var renderableOutline = renderable.calculateOutline()
               outline.mergeMax(renderableOutline);
            }
         }
      }
      return outline;
   }

   //==========================================================
   // <T>判断是否含有子显示对象。</T>
   //
   // @return 是否含有
   //==========================================================
   public hasDisplay(): boolean {
      var displays: FObjects<FDisplay> = this._displays;
      if (displays) {
         return !displays.isEmpty();
      }
      return false;
   }

   //==========================================================
   // <T>增加一个对象。</T>
   //
   // @param item 项目
   //==========================================================
   public push(item: any) {
      if (item instanceof FRenderable) {
         this.pushRenderable(item);
      } else if (item instanceof FDisplay) {
         this.pushDisplay(item);
      } else {
         throw new FError(this, 'Unknown item type.');
      }
   }

   //==========================================================
   // <T>根据代码查找显示对象。</T>
   //
   // @param code 代码
   // @return 显示对象
   //==========================================================
   public findDisplay(code: string) {
      var displays = this._displays;
      if (displays) {
         var count: number = displays.count();
         for (var i: number = 0; i < count; i++) {
            var display: FDisplay = displays.at(i);
            if (display.code == code) {
               return display;
            }
         }
      }
      return null
   }

   //==========================================================
   // <T>根据代码搜索子节点。</T>
   //
   // @param code 名称
   // @return 子节点
   //==========================================================
   public searchDisplay(code) {
      var displays = this._displays;
      if (displays) {
         var count: number = displays.count();
         for (var i: number = 0; i < count; i++) {
            var display: FDisplay = displays.at(i);
            // 判断当前节点
            if (display.code == code) {
               return display;
            }
            // 判断子节点集合
            if (display instanceof FDisplayContainer) {
               var result = (display as FDisplayContainer).searchDisplay(code);
               if (result) {
                  return result;
               }
            }
         }
      }
      return null
   }

   //==========================================================
   // <T>增加一个显示对象。</T>
   //
   // @param display 显示对象
   //==========================================================
   public pushDisplay(display: FDisplay): void {
      RAssert.debugNotNull(display);
      // 获得显示集合
      var displays: FObjects<FDisplay> = this._displays;
      if (!displays) {
         displays = this._displays = new FObjects<FDisplay>();
      }
      // 设置显示对象
      display.parent = this;
      displays.push(display);
   }

   //==========================================================
   // <T>移除一个显示对象。</T>
   //
   // @param display 显示对象
   //==========================================================
   public removeDisplay(display: FDisplay): void {
      RAssert.debugNotNull(display);
      // 获得显示集合
      var displays: FObjects<FDisplay> = this._displays;
      if (displays) {
         // 移除显示对象
         displays.remove(display);
         display.parent = null;
      }
   }

   //==========================================================
   // <T>清空渲染对象集合。</T>
   //==========================================================
   public clearDisplays(): void {
      var displays: FObjects<FDisplay> = this._displays;
      if (displays) {
         displays.clear();
      }
   }

   //==========================================================
   // <T>过滤显示集合。</T>
   //
   // @param region 渲染区域
   // @return 处理结果
   //==========================================================
   public filterDisplays(region: FRegion): boolean {
      var result: boolean = super.filterDisplays(region);
      if (result) {
         // 过滤显示集合
         var displays: FObjects<FDisplay> = this._displays;
         if (displays) {
            var count: number = displays.count();
            for (var n: number = 0; n < count; n++) {
               var display: FDisplay = displays.at(n);
               display.filterDisplays(region);
            }
         }
      }
      return result;
   }

   //==========================================================
   // <T>过滤渲染集合。</T>
   //
   // @param region 渲染区域
   // @return 处理结果
   //==========================================================
   public filterRenderables(region: FRegion): boolean {
      var result: boolean = super.filterRenderables(region);
      if (result) {
         // 过滤显示集合
         var displays: FObjects<FDisplay> = this._displays;
         if (displays) {
            var count: number = displays.count();
            for (var n: number = 0; n < count; n++) {
               var display: FDisplay = displays.at(n);
               display.filterRenderables(region);
            }
         }
      }
      return result;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @param region 区域
   // @return 处理结果
   //==========================================================
   public process(region: FRegion): boolean {
      var result = super.process(region);
      if (result) {
         // 处理显示集合
         var displays = this._displays;
         if (displays) {
            var count: number = displays.count();
            for (var n: number = 0; n < count; n++) {
               var display: FDisplay = displays.at(n);
               display.process(region);
            }
         }
      }
      return result;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放所有子节点
      this._displays = RObject.dispose(this._displays);
      // 父处理
      super.dispose();
   }
}