import {ProcessLoadable} from '../../../runtime/core/service/ProcessLoadable';
import {FDisplay} from './FDisplay';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FActor extends FDisplay implements ProcessLoadable {
   // 加载状态
   public statusLoading: boolean = false;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>处理加载开始。</T>
   //
   // @return 处理结果
   //==========================================================
   public processLoadBegin() {
      this.statusLoading = true;
      return true;
   }

   //==========================================================
   // <T>处理加载</T>
   //
   // @return 处理结果
   //==========================================================
   public processLoad() {
      return true;
   }

   //==========================================================
   // <T>处理加载结束。</T>
   //
   // @return 处理结果
   //==========================================================
   public processLoadEnd(): boolean {
      this.statusLoading = false;
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      super.dispose();
   }
}