import {ScopeEnum} from '../../../../runtime/common/lang/ScopeEnum';
import {Objects} from '../../../../runtime/common/lang/Objects';
import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {Linker} from '../../../../runtime/common/reflect/Linker';
import {ClassUtil} from '../../../../runtime/common/reflect/ClassUtil';
import {FConsole} from '../../../../runtime/core/FConsole';
import {FListenerThread} from '../../../../runtime/core/console/FListenerThread';
import {FThreadConsole} from '../../../../runtime/core/console/FThreadConsole';
import {FGraphicContext} from '../../../../runtime/graphic/core/FGraphicContext';
import {FPipeline} from './FPipeline';
import {FForwardPipeline} from './FForwardPipeline';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FPipelineConsole extends FConsole {
   protected _pipelines: Objects<FPipeline> = null;
   // 线程
   protected _thread: FListenerThread = null;
   protected _interval = 150;
   // 线程控制台
   @Linker(FThreadConsole)
   protected _threadConsole: FThreadConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._scopeCd = ScopeEnum.Global;
      this._pipelines = new Objects<FPipeline>();
      // 创建线程
      var thread: FListenerThread = this._thread = ClassUtil.create(FListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
   }

   //==========================================================
   // <T>收集一个渲染管道。</T>
   //==========================================================
   public alloc(context: FGraphicContext, clazz: Function = FForwardPipeline): FPipeline {
      AssertUtil.debugNotNull(context);
      var pipeline: FPipeline = ClassUtil.create(clazz);
      pipeline.linkGraphicContext(context);
      pipeline.setup();
      this._pipelines.push(pipeline);
      return pipeline;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess() {
      var pipelines = this._pipelines;
      var count: number = pipelines.count();
      for (var n: number = 0; n < count; n++) {
         var pipeline: FPipeline = pipelines.at(n);
         if (pipeline.statusActive) {
            pipeline.process();
         }
      }
   }
}