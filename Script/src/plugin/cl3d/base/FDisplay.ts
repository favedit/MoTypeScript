import {FObjects} from '../../../runtime/common/lang/FObjects';
import {FError} from '../../../runtime/common/lang/FError';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SPoint3} from '../../../runtime/common/math/SPoint3';
import {SVector3} from '../../../runtime/common/math/SVector3';
import {SOutline3d} from '../../../runtime/common/math/SOutline3d';
import {RAssert} from '../../../runtime/common/RAssert';
import {IDisplay} from '../../../runtime/graphic/IDisplay';
import {FGraphicContext} from '../../../runtime/graphic/core/FGraphicContext';
import {FDrawable} from './FDrawable';
import {FRenderable} from './FRenderable';
import {FDisplayContainer} from './FDisplayContainer';
import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FDisplay extends FDrawable implements IDisplay {
   // 位置
   public position: SPoint3;
   // 旋转
   public rotation: SVector3;
   // 缩放
   public scale: SVector3;
   // 轮廓
   public outline: SOutline3d;
   // 渲染集合
   public renderables: FObjects<FRenderable>;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.position = new SPoint3();
      this.rotation = new SVector3();
      this.scale = new SVector3(1, 1, 1);
      this.outline = new SOutline3d();
   }

   //==========================================================
   // <T>计算轮廓大小。</T>
   //
   // @return 轮廓
   //==========================================================
   public calculateOutline(): SOutline3d {
      return this.outline;
   }
   //==========================================================
   // <T>判断是否含有渲染对象。</T>
   //
   // @return 是否含有
   //==========================================================
   public hasRenderable(): boolean {
      var renderables = this.renderables;
      return renderables ? !renderables.isEmpty() : false;
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @param renderable 渲染对象
   //==========================================================
   public pushRenderable(renderable: FRenderable): void {
      var renderables: FObjects<FRenderable> = this.renderables;
      if (!renderables) {
         renderables = this.renderables = new FObjects<FRenderable>();
      }
      renderable.parent = this;
      renderables.push(renderable);
   }

   //==========================================================
   // <T>移除一个渲染对象。</T>
   //
   // @param renderable 渲染对象
   //==========================================================
   public removeRenderable(renderable: FRenderable): void {
      var renderables = this.renderables;
      if (renderables) {
         renderables.remove(renderable);
         renderable.parent = null;
      }
   }

   //==========================================================
   // <T>清空渲染对象集合。</T>
   //==========================================================
   public clearRenderables() {
      var renderables = this.renderables;
      if (renderables) {
         renderables.clear();
      }
   }

   //==========================================================
   // <T>增加一个对象。</T>
   //
   // @param item 项目
   //==========================================================
   public push(item: any) {
      if (item instanceof FRenderable) {
         this.pushRenderable(item);
      } else {
         throw new FError(this, 'Unknown item type.');
      }
   }

   //==========================================================
   // <T>从父对象上移除自己。</T>
   //==========================================================
   public drop() {
      var parent = this.parent;
      if (parent instanceof FDisplayContainer) {
         parent.removeDisplay(this);
         this.parent = null;
      }
   }

   //==========================================================
   // <T>过滤显示集合。</T>
   //
   // @param region 区域
   //==========================================================
   public filterDisplays(region: FRegion): boolean {
      // 检查可见性
      if (!this.visible) {
         return false;
      }
      // 放入显示对象
      region.pushDisplay(this);
      return true;
   }

   //==========================================================
   // <T>过滤渲染集合。</T>
   //
   // @param region 区域
   //==========================================================
   public filterRenderables(region: FRegion): boolean {
      // 检查可见性
      if (!this.visible) {
         return false;
      }
      // 放入渲染对象
      var renderables = this.renderables;
      if (renderables) {
         var count: number = renderables.count();
         for (var n: number = 0; n < count; n++) {
            var renderable = renderables.at(n);
            if (renderable.testVisible()) {
               region.pushRenderable(renderable);
            }
         }
      }
      return true;
   }

   //==========================================================
   // <T>更新矩阵。</T>
   //
   // @param region 区域
   //==========================================================
   public updateMatrix(region: FRegion): void {
      // 更新矩阵
      this.currentMatrix.assign(this.matrix);
      // 计算父矩阵
      var parent = this.parent;
      if (parent) {
         this.currentMatrix.append(parent.currentMatrix);
      }
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param region 区域
   // @return 处理结果
   //==========================================================
   public update(region: FRegion): boolean {
      var result = super.update(region);
      if (result) {
         // 更新矩阵
         var matrix = this.matrix;
         matrix.set(this.position, this.rotation, this.scale);
         matrix.update();
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
         // 更新矩阵
         this.updateMatrix(region);
         // 处理渲染集合
         var renderables = this.renderables;
         if (renderables) {
            var count: number = renderables.count();
            for (var i: number = 0; i < count; i++) {
               var renderable: FRenderable = renderables.at(i);
               renderable.process(region);
            }
         }
      }
      return result;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this.position = RObject.dispose(this.position);
      this.rotation = RObject.dispose(this.rotation);
      this.scale = RObject.dispose(this.scale);
      this.outline = RObject.free(this.outline);
      this.renderables = RObject.dispose(this.renderables);
      // 父处理
      super.dispose();
   }
}