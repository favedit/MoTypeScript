import {FObject} from '../../../runtime/common/lang/FObject';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SMatrix3d} from '../../../runtime/common/math/SMatrix3d';
import {IDrawable} from '../../../runtime/graphic/IDrawable';
import {FRegion} from './FRegion';

//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 160305
//==========================================================
export class FDrawable extends FObject implements IDrawable {
   // 父对象
   public parent: any = null;

   // 可见性
   public visible: boolean = true;

   // 脏标志
   public dirty: boolean = false;

   // 矩阵
   public matrix = null;

   // 当前矩阵（空间计算后）
   public currentMatrix = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.matrix = new SMatrix3d();
      this.currentMatrix = new SMatrix3d();
   }

   //==========================================================
   // <T>测试可见性。</T>
   //
   // @return Boolean 可见性
   //==========================================================
   public testVisible(): boolean {
      return this.visible;
   }

   //==========================================================
   // <T>测试脏状态。</T>
   //
   // @method
   // @return Boolean 脏状态
   //==========================================================
   public testDirty(): boolean {
      return this.dirty;
   }

   //==========================================================
   // <T>显示处理。</T>
   //==========================================================
   public show(): void {
      this.visible = true;
   }

   //==========================================================
   // <T>隐藏处理。</T>
   //==========================================================
   public hide(): void {
      this.visible = false;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @param region 区域
   //==========================================================
   public process(region: FRegion): boolean {
      return true;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param region 区域
   //==========================================================
   public update(region: FRegion): boolean {
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.matrix = RObject.dispose(this.matrix);
      this.currentMatrix = RObject.dispose(this.currentMatrix);
      // 父处理
      super.dispose();
   }
}