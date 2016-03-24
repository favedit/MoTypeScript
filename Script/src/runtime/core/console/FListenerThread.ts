import {ResultEnum} from '../../common/lang/ResultEnum';
import {FListeners} from '../../common/lang/FListeners';
import {RObject} from '../../common/lang/RObject';
import {FThread} from './FThread';

//==========================================================
// <T>监听线程。</T>
//
// @class
// @author maocy
// @version 160306
//==========================================================
export class FListenerThread extends FThread {
   // 处理监听集合
   public processListeners: FListeners = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.processListeners = new FListeners(this);
   }

   //==========================================================
   // <T>调用处理。</T>
   //
   // @return 处理结果
   //==========================================================
   public onProcess(): ResultEnum {
      this.processListeners.process();
      return ResultEnum.Success;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放处理
      this.processListeners = RObject.dispose(this.processListeners);
      // 父处理
      super.dispose();
   }
}
