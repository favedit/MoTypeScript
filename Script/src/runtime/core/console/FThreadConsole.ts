import {EScope} from '../../common/lang/EScope';
import {FObjects} from '../../common/lang/FObjects';
import {RLogger} from '../../common/lang/RLogger';
import {EThreadStatus} from './EThreadStatus';
import {FConsole} from '../FConsole';
import {RConsole} from '../RConsole';
import {FThread} from './FThread';

//==========================================================
// <T>线程控制台。</T>
//
// @console
// @author maocy
// @version 150105
//==========================================================
export class FThreadConsole extends FConsole {
   // @attribute 范围标志
   protected _scopeCd = EScope.Global;
   // @attribute 激活标志
   protected _active: boolean = true;
   // @attribute 激活标志
   protected _interval: number = 5;
   protected _threads: FObjects<FThread> = null;
   //..........................................................
   // @html
   protected _hIntervalId = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._threads = new FObjects<FThread>();
      // 设置回调
      //var flag = o._requestFlag = MO.Window.requestAnimationFrame(o.ohInterval);
      //if(!flag){
      //o._hIntervalId = MO.Window.htmlWindow().setInterval(o.ohInterval, o._interval);
      this._hIntervalId = window.setInterval(this.ohInterval, this._interval);
      //}
   }

   //==========================================================
   // <T>获得线程集合。</T>
   //
   // @method
   // @return 线程集合
   //==========================================================
   public get threads(): FObjects<FThread> {
      return this._threads;
   }

   //==========================================================
   // <T>间隔回调处理。</T>
   //
   // @method
   //==========================================================
   public ohInterval() {
      // RConsole.find();
      var threadConsole: FThreadConsole = RConsole.find(FThreadConsole);
      RLogger.debug(threadConsole, 'Frame start ----------------------------');
      threadConsole.processAll();
   }

   //==========================================================
   // <T>增加一个新线程。</T>
   //
   // @method
   // @param thread:FThread 线程
   //==========================================================
   public push(thread) {
      this._threads.push(thread);
   }

   //==========================================================
   // <T>启动一个新线程。</T>
   //
   // @method
   // @param thread:FThread 线程
   //==========================================================
   public start(thread) {
      thread.start();
      this._threads.push(thread);
   }

   //==========================================================
   // <T>处理一个线程,。</T>
   //
   // @method
   // @param thread 线程
   //==========================================================
   public process(thread:FThread) {
      if (thread) {
         var statusCd = thread.statusCd;
         switch (statusCd) {
            case EThreadStatus.Sleep:
               break;
            case EThreadStatus.Active:
               thread.process(this._interval);
               break;
            case EThreadStatus.Finish:
               this._threads.remove(thread);
               thread.dispose();
               break;
         }
      }
   }

   //==========================================================
   // <T>处理所有线程,。</T>
   //
   // @method
   //==========================================================
   public processAll() {
      // 激活处理
      if (this._active) {
         var threads:FObjects<FThread> = this._threads;
         var count:number = threads.count();
         //try{
         for (var n:number = 0; n < count; n++) {
            var thread:FThread = threads.at(n);
            this.process(thread);
         }
         //}catch(error){
         //   MO.Logger.fatal(o, error, 'Thread process failure. (thread_count={1})', count);
         //}
      }
      // 安装下一帧处理
      //if (o._requestFlag) {
      //MO.Window.requestAnimationFrame(o.ohInterval);
      //}
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      //if (this._requestFlag) {
      //MO.Window.cancelRequestAnimationFrame(o.ohInterval);
      //} else {
      //var hIntervalId = o._hIntervalId;
      //if (hIntervalId) {
      //MO.Window.htmlWindow().clearInterval(hIntervalId);
      //o._hIntervalId = null;
      //}
      //}
      //o._threads = MO.Lang.Object.dispose(o._threads);
      // 父处理
      super.dispose();
   }
}
