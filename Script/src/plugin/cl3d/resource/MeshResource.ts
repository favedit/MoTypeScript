import {Objects} from '../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {Point3} from '../../runtime/common/math/Point3';
import {Quaternion} from '../../runtime/common/math/Quaternion';
import {Vector3} from '../../runtime/common/math/Vector3';
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
   // 位置
   public position: Point3;
   // 方向
   public rotation: Quaternion;
   // 缩放
   public scale: Vector3;
   // 顶点缓冲集合
   public vertexStreams: Objects<StreamResource>;
   // 索引缓冲集合
   public indexStreams: Objects<StreamResource>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.typeName = 'Mesh';
      this.position = new Point3();
      this.rotation = new Quaternion();
      this.scale = new Vector3();
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input 数据流
   //==========================================================
   public unserialize(input: DataStream): void {
      super.unserialize(input);
      // 读取属性
      this.position.unserialize(input);
      this.rotation.unserialize(input);
      this.scale.unserialize(input);
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