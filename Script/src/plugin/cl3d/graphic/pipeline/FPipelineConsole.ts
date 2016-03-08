import {EScope} from '../../../../runtime/common/lang/EScope';
import {FObjects} from '../../../../runtime/common/lang/FObjects';
import {ALinker} from '../../../../runtime/common/reflect/ALinker';
import {RClass} from '../../../../runtime/common/reflect/RClass';
import {FConsole} from '../../../../runtime/core/FConsole';
import {FListenerThread} from '../../../../runtime/core/console/FListenerThread';
import {FThreadConsole} from '../../../../runtime/core/console/FThreadConsole';
import {FPipeline} from './FPipeline';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FPipelineConsole extends FConsole {
   public pipelines: FObjects<FPipeline> = null;
   // 线程
   protected _thread: FListenerThread = null;
   protected _interval = 150;
   // 线程控制台
   @ALinker(FThreadConsole)
   protected _threadConsole: FThreadConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this.scopeCd = EScope.Global;
      this.pipelines = new FObjects<FPipeline>();
      // 创建线程
      var thread: FListenerThread = this._thread = RClass.create(FListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
   }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public alloc(): FPipeline {
      var pipeline: FPipeline = RClass.create(FPipeline);
      this.pipelines.push(pipeline);
      return pipeline;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess() {
      var pipelines = this.pipelines;
      var count: number = pipelines.count();
      for (var n: number = 0; n < count; n++) {
         var pipeline: FPipeline = pipelines.at(n);
         if (pipeline.statusActive) {
            pipeline.process();
         }
      }
   }
}