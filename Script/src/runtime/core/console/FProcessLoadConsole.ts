import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {Looper} from '../../runtime/common/lang/Looper'
import {ALinker} from '../../common/reflect/ALinker';
import {RClass} from '../../common/reflect/RClass';
import {FConsole} from '../FConsole';
import {FListenerThread} from './FListenerThread';
import {FThreadConsole} from './FThreadConsole';
import {IProcessLoadable} from './IProcessLoadable';

//==========================================================
// <T>处理加载控制台。</T>
//
// @console
// @author maocy
// @history 151226
//==========================================================
export class FProcessLoadConsole extends FConsole {
   // 线程控制台
   @ALinker(FThreadConsole)
   public _threadConsole: FThreadConsole = null;
   // 线程对象
   protected _thread: FListenerThread = null;
   // 处理间隔
   protected _interval: number = 50;
   // 循环器
   protected _looper: Looper = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._looper = new Looper();
      // 创建线程
      var thread: FListenerThread = this._thread = RClass.create(FListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess() {
      var looper = this._looper;
      looper.record();
      while (looper.next()) {
         var item: IProcessLoadable = looper.current();
         // 开始处理
         if (!item.statusLoading) {
            item.processLoadBegin();
         }
         // 逻辑处理
         if (item.processLoad()) {
            looper.removeCurrent();
            // 处理完成
            item.processLoadEnd();
         }
      }
   }

   //==========================================================
   // <T>增加一个加载处理器。</T>
   //
   // @method
   // @param load:MProcessLoad 进度处理器
   //==========================================================
   public push(load: IProcessLoadable) {
      this._looper.push(load);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      super.dispose();
   }
}