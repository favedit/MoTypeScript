import {ScopeEnum} from '../../../../runtime/common/lang/ScopeEnum';
import {Objects} from '../../../../runtime/common/lang/Objects';
import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {Linker} from '../../../../runtime/common/reflect/Linker';
import {ClassUtil} from '../../../../runtime/common/reflect/ClassUtil';
import {Service} from '../../../../runtime/core/Service';
import {ListenerThread} from '../../../../runtime/core/service/ListenerThread';
import {ThreadService} from '../../../../runtime/core/service/ThreadService';
import {GraphicContext} from '../../../../runtime/graphic/core/GraphicContext';
import {Pipeline} from './Pipeline';
import {ForwardPipeline} from './ForwardPipeline';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class PipelineService extends Service {
   protected _pipelines: Objects<Pipeline> = null;
   // 线程
   protected _thread: ListenerThread = null;
   protected _interval = 150;
   // 线程控制台
   @Linker(ThreadService)
   protected _threadConsole: ThreadService = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._scopeCd = ScopeEnum.Global;
      this._pipelines = new Objects<Pipeline>();
      // 创建线程
      var thread: ListenerThread = this._thread = ClassUtil.create(ListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
   }

   //==========================================================
   // <T>收集一个渲染管道。</T>
   //==========================================================
   public alloc(context: GraphicContext, clazz: Function = ForwardPipeline): Pipeline {
      AssertUtil.debugNotNull(context);
      var pipeline: Pipeline = ClassUtil.create(clazz);
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
         var pipeline: Pipeline = pipelines.at(n);
         if (pipeline.statusActive) {
            pipeline.process();
         }
      }
   }
}