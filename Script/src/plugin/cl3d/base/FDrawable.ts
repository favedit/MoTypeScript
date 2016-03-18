import {RObject} from '../../../runtime/common/lang/RObject';
import {RObjectId} from '../../../runtime/common/lang/RObjectId';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {RMath} from '../../../runtime/common/math/RMath';
import {IDrawable} from '../../../runtime/graphic/IDrawable';
import {FGraphicObject} from '../../../runtime/graphic/context/FGraphicObject';
import {FRegion} from './FRegion';

//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 160305
//==========================================================
export class FDrawable extends FGraphicObject implements IDrawable {
   // 唯一编码
   public guid: string;
   // 编号
   public id: number;
   // 代码
   public code: string;
   // 标签
   public label: string;
   // 父对象
   public parent: any;
   // 可见性
   public visible: boolean;
   // 脏标志
   public dirty: boolean;
   // 矩阵
   public matrix;
   // 当前矩阵（空间计算后）
   public currentMatrix;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.guid = RMath.makeGuid();
      this.visible = true;
      this.dirty = true;
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
      // 释放属性
      this.parent = null;
      this.matrix = RObject.dispose(this.matrix);
      this.currentMatrix = RObject.dispose(this.currentMatrix);
      // 父处理
      super.dispose();
   }
}