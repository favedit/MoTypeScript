import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {SListenerContext} from '../../common/lang/SListenerContext';
import {FListener} from '../../common/lang/FListener';
import {FObjects} from '../../common/lang/FObjects';
import {RObject} from '../../common/lang/RObject';
import {RListener} from '../../common/lang/RListener';
import {RLogger} from '../../common/lang/RLogger';
import {ALinker} from '../../common/reflect/ALinker';
import {RClass} from '../../common/reflect/RClass';
import {RMemory} from '../../common/RMemory';
import {FConsole} from '../FConsole';
import {FListenerThread} from './FListenerThread';
import {FThreadConsole} from './FThreadConsole';

//==========================================================
// <T>环境控制台。</T>
//
// @console
// @author maocy
// @version 150606
//==========================================================
export class FEventConsole extends FConsole {
   // 线程控制台
   @ALinker(FThreadConsole)
   public _threadConsole: FThreadConsole = null;
   // 线程对象
   protected _thread: FListenerThread = null;
   // 处理间隔
   protected _interval: number = 50;
   // 处理事件集合(对事件中产生的事件排队)
   public _processEvents = null;
   // 事件集合
   public _events = null;

   //==========================================================
   // <T>检验传入值是否是整型值。</T>
   //
   // @method
   // @param v:value:String 待检验的字符串
   // @return Boolean 是否整数
   //==========================================================
   public static listenerProcess(context: SListenerContext) {
      context.process();
      RMemory.free(event);
   }

   //==========================================================
   // <T>静态构造处理。</T>
   //==========================================================
   public static staticConstructor() {
      //var eventConsole = RClass.getInstance(FEventConsole);
      //RListener.process = (context: SListenerContext) => {
         // eventConsole._events.push(context);
      //};
   }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.scopeCd = ScopeEnum.Local;
      // 创建属性
      this._processEvents = new FObjects<any>();
      this._events = new FObjects<any>();
      // 创建线程
      var thread: FListenerThread = this._thread = RClass.create(FListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
      RLogger.debug(this, 'Add event thread. (thread={1})', RClass.dump(thread));
   }

   //==========================================================
   // <T>事件后台处理。</T>
   //
   // @param context 环境
   // @param parameters 参数集合
   //==========================================================
   public onProcess(context: SListenerContext, parameters: any) {
      // 检查数据
      var events = this._events;
      if (events.isEmpty()) {
         return;
      }
      // 接收事件
      var processEvents = this._processEvents;
      processEvents.assign(events);
      events.clear();
      // 事件处理
      var count: number = processEvents.count();
      if (count > 0) {
         // 执行事件
         for (var n: number = 0; n < count; n++) {
            var event: any = processEvents.at(n);
            event.process();
            RMemory.free(event);
         }
         // 清除运行队列
         processEvents.clear();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放处理
      this._processEvents = RObject.dispose(this._processEvents);
      this._events = RObject.dispose(this._events);
      // 父处理
      super.dispose();
   }
}
