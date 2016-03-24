import {ResultEnum} from '../../common/lang/ResultEnum';
import {Listeners} from '../../common/lang/Listeners';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
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
   public processListeners: Listeners = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.processListeners = new Listeners(this);
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
      this.processListeners = ObjectUtil.dispose(this.processListeners);
      // 父处理
      super.dispose();
   }
}
