import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {FResource} from './FResource';
import {FTemplateRenderableResource} from './FTemplateRenderableResource';

//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
export class FTemplateResource extends FResource {
   // 渲染集合
   public renderables: Objects<FTemplateRenderableResource> = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.typeCode = 'Template';
   }

   // //==========================================================
   // // <T>构造处理。</T>
   // //==========================================================
   // _number: number = 0;
   // public inc(value:number):number {
   //    return ++this._number;
   // }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady(): boolean {
      // var ready = this.ready;
      // if (!ready) {
      //    if (this.dataReady) {
      //       var renderables = this.renderables;
      //       if (renderables) {
      //          var count: number = renderables.count();
      //          for (var n: number = 0; n < count; n++) {
      //             var renderable = renderables.at(n);
      //             if (!renderable.testReady()) {
      //                return false;
      //             }
      //          }
      //       }
      //       ready = this.ready = true;
      //    }
      // }
      // return ready;
      return this.ready;
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadConfig(config) {
      super.loadConfig(config);
      var content = config.content;
      var count: number = content.length;
      if (count > 0) {
         var renderables = this.renderables = new Objects<FTemplateRenderableResource>();
         for (var n: number = 0; n < count; n++) {
            var renderableConfig = content[n];
            var renderable = new FTemplateRenderableResource();
            renderable.loadConfig(renderableConfig);
            renderables.push(renderable);
         }
      }
      // var count = 10000000000;
      // var start = new Date().getTime();
      // for (var n = 0; n < count; n++) {
      //    //this.inc();
      //    this._number++;
      // }
      // var tick = new Date().getTime() - start;
      // console.log(count, tick, count / tick * 1000, this._number);
      //this.dataReady = true;
      this.ready = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.renderables = ObjectUtil.dispose(this.renderables);
      // 父处理
      super.dispose();
   }
}