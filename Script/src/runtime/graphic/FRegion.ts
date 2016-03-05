import {FObject} from '../common/lang/FObject';
import {FObjects} from '../runtime/common/lang/FObjects';
import {RObject} from '../runtime/common/lang/RObject';

//==========================================================
// <T>区域。</T>
//
// @class
// @author maocy
// @history 160305
//==========================================================
export class FRegion extends FObject {
   // 改变状态
   public changed = false;
   // 主方向光源
   public directionalLight = null;
   // 光源集合
   public lights = null;
   // 渲染集合
   public renderables = null;
   // 所有渲染集合
   public allRenderables = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 初始化参数
      this.lights = new FObjects();
      this.renderables = new FObjects();
      this.allRenderables = new FObjects();
   }

   //==========================================================
   // <T>判断是否变更过。</T>
   //
   // @method
   // @return Boolean 变更过
   //==========================================================
   public isChanged() {
      return this.changed;
   }

   //==========================================================
   // <T>准备处理。</T>
   //
   // @method
   //==========================================================
   public prepare() {
      // 数据未改变
      this.changed = false;
      // 清空全部渲染对象
      this.allRenderables.clear();
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      // 清空渲染集合
      this.renderables.clear();
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public update() {
      var renderables = this.renderables;
      var count = renderables.count();
      for (var i: number = 0; i < count; i++) {
         var renderable = renderables.at(i);
         renderable.update(this);
      }
      this.changed = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.lights = RObject.free(this.lights);
      this.renderables = RObject.free(this.renderables);
      this.allRenderables = RObject.free(this.allRenderables);
      super.dispose();
   }
}
