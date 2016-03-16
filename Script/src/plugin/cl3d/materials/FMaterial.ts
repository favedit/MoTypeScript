import {FObject} from '../../../runtime/common/lang/FObject';
import {RObject} from '../../../runtime/common/lang/RObject';

//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FMaterial extends FObject {
   // 名称
   public name: string;
   // 效果器代码
   public effectCode: string;
   // 效果器
   public effect: any;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
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