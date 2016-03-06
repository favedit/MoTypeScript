import {FObjects} from '../../../runtime/common/lang/FObjects';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SPoint3} from '../../../runtime/common/math/SPoint3';
import {SVector3} from '../../../runtime/common/math/SVector3';
import {IDisplay} from '../../../runtime/graphic/IDisplay';
import {FDrawable} from './FDrawable';
import {FRenderable} from './FRenderable';
import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FDisplay extends FDrawable implements IDisplay {
   // 位置
   public position: SPoint3 = null;
   // 旋转
   public rotation: SVector3 = null;
   // 缩放
   public scale: SVector3 = null;
   // @attribute
   public renderables: FObjects<FRenderable> = null;

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

   // //==========================================================
   // // <T>增加一个对象。</T>
   // //
   // // @method
   // // @param item:Object 项目
   // //==========================================================
   // public push(item) {
   //     var o = this;
   //     if (MO.Class.isClass(item, MO.FRenderable)) {
   //         o.pushRenderable(item);
   //     } else if (MO.Class.isClass(item, MO.MRenderableLinker)) {
   //         o.pushRenderable(item.renderable());
   //     } else if (MO.Class.isClass(item, MO.FDisplay)) {
   //         o.pushDisplay(item);
   //     } else {
   //         throw new MO.TError(o, 'Unknown item type.');
   //     }
   // }

   // //==========================================================
   // // <T>从父对象上移除自己。</T>
   // //
   // // @method
   // //==========================================================
   // public remove() {
   //     var o = this;
   //     var c = o._parent;
   //     if (c) {
   //         c.removeDisplay(o);
   //         o._parent = null;
   //     }
   // }

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
         var count = renderables.count();
         for (var i = 0; i < count; i++) {
            var renderable = renderables.at(i);
            if (renderable.visible) {
               region.pushRenderable(renderable);
            }
         }
      }
      return true;
   }

   //==========================================================
   // <T>显示处理。</T>
   //
   // @method
   //==========================================================
   public show() {
      this.visible = true;
   }

   //==========================================================
   // <T>隐藏处理。</T>
   //
   // @method
   //==========================================================
   public hide() {
      this.visible = false;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public update() {
      // 更新矩阵
      var matrix = this.matrix;
      matrix.set(this.position, this.rotation, this.scale);
      matrix.update();
   }

   //==========================================================
   // <T>更新矩阵。</T>
   //
   // @method
   // @param region:FG3dReigon 区域
   //==========================================================
   public updateMatrix(region) {
      // 更新矩阵
      this.currentMatrix.assign(this.matrix);
      // 计算父矩阵
      var parent = this.parent;
      if (parent) {
         this.currentMatrix.append(parent.currentMatrix);
      }
   }

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @method
   // // @param region:FG3dReigon 区域
   // //==========================================================
   // public process(region) {
   //     var o = this;
   //     // 更新矩阵
   //     o.updateMatrix(region);
   //     // 处理渲染集合
   //     var renderables = o._renderables;
   //     if (renderables) {
   //         var count = renderables.count();
   //         for (var i = 0; i < count; i++) {
   //             var renderable = renderables.at(i);
   //             renderable.process(region);
   //         }
   //     }
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      //  this._currentMatrix = RObject.dispose(this._currentMatrix);
      //  this._matrix = RObject.dispose(this._matrix);
      this.position = RObject.dispose(this.position);
      this.rotation = RObject.dispose(this.rotation);
      this.scale = RObject.dispose(this.scale);
      // 释放渲染集合（不释放渲染对象）
      this.renderables = RObject.dispose(this.renderables);
      // 父处理
      super.dispose();
   }
}