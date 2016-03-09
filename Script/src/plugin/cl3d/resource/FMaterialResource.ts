import {FResource} from './FResource';

//==========================================================
// <T>材质资源。</T>
//
// @class
// @author maocy
// @history 150428
//==========================================================
export class FMaterialResource extends FResource {
   //    // @attribute
   //    o._material     = MO.Class.register(o, new MO.AGetter('_material'));

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.typeCode = 'Material';
   }

   // //==========================================================
   // // <T>从输入流里反序列化信息内容。</T>
   // //
   // // @param input:FByteStream 数据流
   // // @return 处理结果
   // //==========================================================
   // MO.FE3sMaterialResource_unserialize = function FE3sMaterialResource_unserialize(input){
   //    var o = this;
   //    o.__base.FE3sResource.unserialize.call(o, input);
   //    //..........................................................
   //    // 读取材质
   //    o._material = MO.Console.find(MO.FE3sMaterialConsole).unserialize(input);
   //    MO.Logger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
   // }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadConfig(config) {
      super.loadConfig(config);
      // var content = config.content;
      // var count: number = content.length;
      // if (count > 0) {
      //    var renderables = this.renderables = new FObjects<FTemplateRenderableResource>();
      //    for (var n: number = 0; n < count; n++) {
      //       var renderableConfig = content[n];
      //       var renderable = new FTemplateRenderableResource();
      //       renderable.loadConfig(renderableConfig);
      //       renderables.push(renderable);
      //    }
      // }
      // var count = 10000000000;
      // var start = new Date().getTime();
      // for (var n = 0; n < count; n++) {
      //    //this.inc();
      //    this._number++;
      // }
      // var tick = new Date().getTime() - start;
      // console.log(count, tick, count / tick * 1000, this._number);
   }
}