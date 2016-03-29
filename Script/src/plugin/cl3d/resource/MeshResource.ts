import {Objects} from '../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {DataStream} from '../../runtime/common/io/DataStream';
import {ResourceComponent} from './ResourceComponent';
import {StreamResource} from './StreamResource';

//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
export class MeshResource extends ResourceComponent {
   public vertexStreams: Objects<StreamResource> = null;
   public indexStreams: Objects<StreamResource> = null;
   //    // @attribute
   //    o._dataCompress = true;
   //    o._typeName     = 'Mesh';
   //    // @attribute
   //    o._display      = null;
   //    o._renderable   = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //this._display = MO.Class.create(MO.FE3sMeshDisplay);
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input 数据流
   //==========================================================
   public unserialize(input: DataStream): void {
      super.unserialize(input);
      // 读取属性
      //this._outline.unserialize(input);
      //this._outline.update();
      // 读取数据流集合
      var streamCount: number = input.readInt32();
      if (streamCount > 0) {
         var streams: Objects<StreamResource> = this.vertexStreams = new Objects<StreamResource>();
         for (var n: number = 0; n < streamCount; n++) {
            var stream: StreamResource = ClassUtil.create(StreamResource);
            stream.unserialize(input)
            streams.push(stream);
         }
      }
      // 读取数据流集合
      var streamCount: number = input.readInt32();
      if (streamCount > 0) {
         var streams: Objects<StreamResource> = this.indexStreams = new Objects<StreamResource>();
         for (var n: number = 0; n < streamCount; n++) {
            var stream: StreamResource = ClassUtil.create(StreamResource);
            stream.unserialize(input)
            streams.push(stream);
         }
      }
      // 读取渲染信息
      //this._display.unserialize(input);
      //this._renderable = this._display._renderable;
   }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @method
   // // @param config:TXmlNode 配置节点
   // //==========================================================
   // MO.FE3sMesh_saveConfig = function FE3sMesh_saveConfig(config){
   //    var o = this;
   //    o.__base.FE3sSpace.saveConfig.call(o, config);
   //    // 存储属性
   //    o._display.saveConfig(config.create('Display'));
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      //o._outline = RObject.dispose(o._outline);
      //o._display = RObject.dispose(o._display);
      // 父处理
      super.dispose();
   }
}