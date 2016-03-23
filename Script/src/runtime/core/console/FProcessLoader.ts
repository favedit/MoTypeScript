import {FObject} from '../../../runtime/common/lang/FObject';
import {IProcessLoadable} from '../../../runtime/core/console/IProcessLoadable';

//==========================================================
// <T>材质。</T>
//
// @author maocy
// @history 160323
//==========================================================
export class FProcessLoader extends FObject implements IProcessLoadable {
   // 状态
   public statusLoading: boolean;
   // 准备好
   public ready: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.statusLoading = false;
      this.ready = false;
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @param 是否准备好
   //==========================================================
   public testReady(): boolean {
      return this.ready;
   }

   //==========================================================
   // <T>处理加载开始。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadBegin(): boolean {
      this.statusLoading = true;
      return true;
   }

   //==========================================================
   // <T>处理加载</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoad(): boolean {
      return true;
   }

   //==========================================================
   // <T>处理加载结束。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadEnd(): boolean {
      this.statusLoading = false;
      return true;
   }
}