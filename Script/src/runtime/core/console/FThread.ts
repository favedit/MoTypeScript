import {ResultEnum} from '../../common/lang/ResultEnum';
import {FObject} from '../../common/lang/FObject';
import {EThreadStatus} from './EThreadStatus';

//==========================================================
// <T>线程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
export abstract class FThread extends FObject {
   // 名称
   public name: string = null;
   // 延时
   public delay: number = 0;
   // 间隔
   public interval: number = 100;
   // 状态
   public statusCd: EThreadStatus = EThreadStatus.Sleep;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>启动处理。</T>
   //
   // @method
   //==========================================================
   public start() {
      this.statusCd = EThreadStatus.Active;
   }

   //==========================================================
   // <T>停止处理。</T>
   //
   // @method
   //==========================================================
   public stop() {
      this.statusCd = EThreadStatus.Finish;
   }

   //==========================================================
   // <T>调用处理。</T>
   //
   // @return 处理结果
   //==========================================================
   public abstract onProcess():ResultEnum;

   //==========================================================
   // <T>调用处理。</T>
   //
   // @param interval:integer 调用间隔
   //==========================================================
   public process(interval: number) {
      if (this.delay <= 0) {
         this.onProcess();
      } else {
         this.delay -= interval;
      }
   }
}
