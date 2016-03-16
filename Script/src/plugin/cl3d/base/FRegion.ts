import {FObject} from '../../../runtime/common/lang/FObject';
import {FObjects} from '../../../runtime/common/lang/FObjects';
import {FError} from '../../../runtime/common/lang/FError';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SPoint3} from '../../../runtime/common/math/SPoint3';
import {SVector3} from '../../../runtime/common/math/SVector3';
import {SVector4} from '../../../runtime/common/math/SVector4';
import {SMatrix3d} from '../../../runtime/common/math/SMatrix3d';
import {IProcessContext} from '../../../runtime/graphic/IProcessContext';
import {FLight} from '../lights/FLight';
import {FRenderable} from './FRenderable';
import {FDisplay} from './FDisplay';


//==========================================================
// <T>区域。</T>
//
// @class
// @author maocy
// @history 160305
//==========================================================
export class FRegion extends FObject implements IProcessContext {
   // 改变状态
   public changed = false;
   // 背景色
   public backgroundColor = null;
   // 主方向光源
   public directionalLight = null;
   // 光源集合
   public lights: FObjects<FLight> = null;
   // 渲染集合
   public renderables: FObjects<FRenderable> = null;
   // 所有渲染集合
   public allRenderables: FObjects<FRenderable> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 初始化参数
      this.lights = new FObjects<FLight>();
      this.renderables = new FObjects<FRenderable>();
      this.allRenderables = new FObjects<FRenderable>();
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
   // <T>判断是否变更过。</T>
   //
   // @method
   // @return Boolean 变更过
   //==========================================================
   public change() {
      this.changed = true;
   }

   //==========================================================
   // <T>设置技术过程。</T>
   //
   // @method
   // @param pass 技术过程
   //==========================================================
   public setTechniquePass(pass: any, finish: boolean) {
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @method
   // @param renderable:FRenderable 渲染对象
   //==========================================================
   public pushDisplay(display: FDisplay): void {
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @method
   // @param renderable:FRenderable 渲染对象
   //==========================================================
   public pushRenderable(renderable: FRenderable): void {
      this.renderables.push(renderable);
      this.allRenderables.push(renderable);
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
   // <T>计算参数数据。</T>
   //
   // @method
   // @param parameterCd:EG3dRegionParameter 参数类型
   // @return 参数内容
   //==========================================================
   public calculate(parameterCd) {
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
   public dispose(): void {
      this.lights = RObject.free(this.lights);
      this.renderables = RObject.free(this.renderables);
      this.allRenderables = RObject.free(this.allRenderables);
      super.dispose();
   }
}
