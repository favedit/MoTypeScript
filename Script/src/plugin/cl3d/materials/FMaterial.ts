import {FObject} from '../../../runtime/common/lang/FObject';
import {RObject} from '../../../runtime/common/lang/RObject';

//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FMaterial extends FObject {
   // 代码
   public code: string;
   // 名称
   public name: string;
   // 脏标志
   public dirty: boolean;
   // 效果器代码
   public effectCode: string;
   // 效果器
   public effect: any;
   // 渲染器代码
   public renderCode: string;
   // 配置深度检查
   public optionDepth: boolean;
   // 配置深度写入
   public optionDepthWrite: boolean;
   // 配置双面
   public optionDouble: boolean;
   // 配置信息
   public optionAlpha: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.effectCode = 'automatic';
      this.optionDepth = true;
      this.optionDepthWrite = true;
      this.optionDouble = false;
      this.optionAlpha = false;
      this.dirty = true;
   }

   //==========================================================
   // <T>重置内容。</T>
   //==========================================================
   public reset() {
      this.optionDepth = true;
      this.optionDepthWrite = true;
      this.optionDouble = false;
      this.optionAlpha = false;
   }

   //==========================================================
   // <T>更新处理。</T>
   //==========================================================
   public update() {
      this.dirty = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this.effect = RObject.dispose(this.effect);
      // 父处理
      super.dispose();
   }
}