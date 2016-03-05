import {FObjects} from '../common/lang/FObjects';
import {RObject} from '../common/lang/RObject';
import {SPoint3} from '../common/math/SPoint3';
import {SVector3} from '../common/math/SVector3';
import {RAssert} from '../common/RAssert';
import {FDrawable} from './FDrawable';
import {FRenderable} from './FRenderable';
import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 160305
//==========================================================
export class FDisplay extends FDrawable {
   // 位置(逻辑坐标，非真实场景中位置)
   public location = null;
   // 旋转
   public rotation = null;
   // 缩放
   public scale = null;
   // 渲染集合
   public renderables: FObjects<FRenderable> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.location = new SPoint3();
      this.rotation = new SVector3();
      this.scale = new SVector3(1, 1, 1);
   }

   //==========================================================
   // <T>判断是否含有渲染对象。</T>
   //
   // @method
   // @return Boolean 是否含有
   //==========================================================
   public hasRenderable() {
      var renderables = this.renderables;
      if (renderables) {
         return !renderables.isEmpty();
      }
      return false;
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @method
   // @param renderable:FRenderable 渲染对象
   //==========================================================
   public pushRenderable(renderable: FRenderable): void {
      RAssert.debugNotNull(renderable);
      // 获得集合
      var renderables: FObjects<FRenderable> = this.renderables;
      if (!renderables) {
         renderables = this.renderables = new FObjects<FRenderable>();
      }
      // 增加对象
      renderable.parent = this;
      renderables.push(renderable);
   }

   //==========================================================
   // <T>移除一个渲染对象。</T>
   //
   // @method
   // @param renderable:FRenderable 渲染对象
   //==========================================================
   public removeRenderable(renderable: FRenderable): void {
      RAssert.debugNotNull(renderable);
      // 获得集合
      var renderables = this.renderables;
      if (renderables) {
         // 移除对象
         renderables.remove(renderable);
         renderable.parent = null;
      }
   }

   //==========================================================
   // <T>清空渲染对象集合。</T>
   //
   // @method
   //==========================================================
   public clearRenderables() {
      var renderables = this.renderables;
      if (renderables) {
         renderables.clear();
      }
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @param region 区域
   //==========================================================
   public process(region: FRegion) {
      super.process(region);
      // 处理渲染集合
      var renderables: FObjects<FRenderable> = this.renderables;
      if (renderables) {
         var count = renderables.count();
         for (var i: number = 0; i < count; i++) {
            var renderable: FRenderable = renderables.at(i);
            renderable.process(region);
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this.location = RObject.dispose(this.location);
      this.rotation = RObject.dispose(this.rotation);
      this.scale = RObject.dispose(this.scale);
      // 释放渲染集合（不释放渲染对象）
      this.renderables = RObject.dispose(this.renderables);
      // 父处理
      super.dispose();
   }
}