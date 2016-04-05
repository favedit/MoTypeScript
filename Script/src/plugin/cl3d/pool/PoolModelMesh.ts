import {DataTypeEnum} from '../../../runtime/common/lang/DataTypeEnum';
import {Fatal} from '../../../runtime/common/lang/Fatal';
import {Objects} from '../../../runtime/common/lang/Objects';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {IndexStrideEnum} from '../graphic/IndexStrideEnum';
import {AttributeFormatEnum} from '../graphic/AttributeFormatEnum';
import {StreamResource} from '../resource/StreamResource';
import {MeshResource} from '../resource/MeshResource';
import {Renderable} from '../base/Renderable';
import {PoolVertexBuffer} from './PoolVertexBuffer';
import {PoolIndexBuffer} from './PoolIndexBuffer';

//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class PoolModelMesh extends Renderable {
   // 准备好
   public ready: boolean;
   // 顶点个数
   public vertexCount: number;
   //public vertexBuffers: FDictionary<FE3rVertexBuffer> = null;
   //public indexBuffers: FObjects<FE3rIndexBuffer> = null;
   //    o._resourceMaterial = null;
   //    o._skins            = MO.Class.register(o, new MO.AGetter('_skins'));
   //    o._boneIds          = MO.Class.register(o, new MO.AGetter('_boneIds'));

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.vertexCount = 0;
   }

   // //==========================================================
   // // <T>测试是否加载完成。</T>
   // //
   // // @method
   // // @return 是否完成
   // //==========================================================
   // MO.FE3rModelMesh_testReady = function FE3rModelMesh_testReady(){
   //    var o = this;
   //    if(!o._ready){
   //       // 测试所有位图加载好
   //       var textures = o._textures;
   //       if(textures){
   //          var count = textures.count();
   //          for(var i = 0; i < count; i++){
   //             var texture = textures.at(i);
   //             if(!texture.testReady()){
   //                return false;
   //             }
   //          }
   //       }
   //       // 加载完成
   //       o._ready = true;
   //    }
   //    return o._ready;
   // }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @param resource 资源
   //==========================================================
   public loadResource(resource: MeshResource) {
      var context = this.graphicContext;
      // 设置属性
      this.resource = resource;
      this.guid = resource.guid;
      this.name = resource.code;
      this.label = resource.label;
      this.matrix.build(resource.position, resource.rotation, resource.scale);
      // 创建顶点缓冲集合
      var streamResources = resource.vertexStreams;
      var streamCount = streamResources.count();
      for (var i = 0; i < streamCount; i++) {
         var streamResource: StreamResource = streamResources.at(i);
         var code = streamResource.code;
         var dataCount = this.vertexCount = streamResource.dataCount;
         var data = streamResource.data;
         // 创建顶点缓冲
         var vertexBuffer: PoolVertexBuffer = context.createVertexBuffer(PoolVertexBuffer);
         vertexBuffer.code = code;
         vertexBuffer.resource = streamResource;
         var pixels = null;
         switch (code) {
            case "position":
               pixels = new Float32Array(data);
               vertexBuffer.formatCd = AttributeFormatEnum.Float3;
               this.vertexCount = dataCount;
               break;
            case "coord":
               pixels = new Float32Array(data);
               vertexBuffer.formatCd = AttributeFormatEnum.Float2;
               break;
            case "color":
               pixels = new Uint8Array(data);
               vertexBuffer.formatCd = AttributeFormatEnum.Byte4Normal;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               pixels = new Uint8Array(data);
               vertexBuffer.formatCd = AttributeFormatEnum.Byte4Normal;
               break;
            default:
               throw new Fatal(this, "Unknown code");
         }
         vertexBuffer.upload(pixels, streamResource.dataStride, dataCount);
         this.pushVertexBuffer(vertexBuffer);
      }
      // 创建顶点缓冲集合
      var streamResources = resource.indexStreams;
      var streamCount = streamResources.count();
      for (var i = 0; i < streamCount; i++) {
         var streamResource: StreamResource = streamResources.at(i);
         var code = streamResource.code;
         var dataCount = streamResource.dataCount;
         var data = streamResource.data;
         // 创建索引缓冲
         var indexBuffer: PoolIndexBuffer = context.createIndexBuffer(PoolIndexBuffer);
         indexBuffer.resource = streamResource;
         var dataCd = streamResource.elementDataCd;
         if (dataCd == DataTypeEnum.Uint16) {
            indexBuffer.strideCd = IndexStrideEnum.Uint16;
         } else if (dataCd == DataTypeEnum.Uint32) {
            indexBuffer.strideCd = IndexStrideEnum.Uint32;
         } else {
            throw new Fatal(this, "Unknown data type.");
         }
         indexBuffer.upload(data, 3 * dataCount);
         this.pushIndexBuffer(indexBuffer);
      }
      this.ready = true;
   }

   // //==========================================================
   // // <T>增加一个蒙皮。</T>
   // //
   // // @method
   // // @param skin:FE3rSkin 蒙皮
   // //==========================================================
   // MO.FE3rModelMesh_pushSkin = function FE3rModelMesh_pushSkin(skin){
   //    var o = this;
   //    var skins = o._skins;
   //    if(!skins){
   //       skins = o._skins = new MO.TObjects();
   //    }
   //    skins.push(skin);
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}