import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {ObjectIdUtil} from '../../../runtime/common/lang/ObjectIdUtil';
import {Matrix3d} from '../../../runtime/graphic/math/Matrix3d';
import {MathUtil} from '../../../runtime/common/math/MathUtil';
import {IDrawable} from '../../../runtime/graphic/IDrawable';
import {GraphicObject} from '../../../runtime/graphic/core/GraphicObject';
import {Region} from './Region';

//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 160305
//==========================================================
export class Drawable extends GraphicObject implements IDrawable {
   // 唯一编码
   public guid: string;
   // 编号
   public id: number;
   // 代码
   public name: string;
   // 标签
   public label: string;
   // 父对象
   public parent: any;
   // 可见性
   public visible: boolean;
   // 矩阵
   public matrix: Matrix3d;
   // 当前矩阵（空间计算后）
   public currentMatrix: Matrix3d;
   // 脏标志
   public dirty: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.guid = MathUtil.makeGuid();
      this.visible = true;
      this.matrix = new Matrix3d();
      this.currentMatrix = new Matrix3d();
      this.dirty = true;
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
   public process(region: Region): boolean {
      return true;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param region 区域
   //==========================================================
   public update(region: Region): boolean {
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this.parent = null;
      this.matrix = ObjectUtil.dispose(this.matrix);
      this.currentMatrix = ObjectUtil.dispose(this.currentMatrix);
      // 父处理
      super.dispose();
   }
}