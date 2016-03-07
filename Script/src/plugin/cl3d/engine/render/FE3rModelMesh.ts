import {EDataType} from '../../../runtime/common/lang/EDataType';
import {FError} from '../../../runtime/common/lang/FError';
// import {RClass} from '../../../runtime/common/reflect/RClass';
// import {FModelResource} from '../../resource/FModelResource';
import {FE3rObject} from './FE3rObject';
import {EIndexStride} from '../../graphic/EIndexStride';
import {EAttributeFormat} from '../../graphic/EAttributeFormat';
import {FStreamResource} from '../resource/FStreamResource';
import {FMeshResource} from '../resource/FMeshResource';
import {FE3rVertexBuffer} from './FE3rVertexBuffer';
import {FE3rIndexBuffer} from './FE3rIndexBuffer';

//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FE3rModelMesh extends FE3rObject {
   public ready = false;
   public vertexCount = 0;
   public vertexBuffers = null;
   public indexBuffers = null;
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
   }

   //==========================================================
   // <T>查找顶点缓冲。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   public findVertexBuffer(code) {
      return this.vertexBuffers.get(code);
   }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @param resource:FE3sGeometry 资源
   //==========================================================
   public loadResource(resource: FMeshResource) {
      var context = this.graphicContext;
      // 设置属性
      this.resource = resource;
      this.guid = resource.guid;
      this.code = resource.code;
      // 创建顶点缓冲集合
      var streamResources = resource.vertexStreams;
      var streamCount = streamResources.count();
      for (var i = 0; i < streamCount; i++) {
         var streamResource: FStreamResource = streamResources.at(i);
         var code = streamResource.code;
         var dataCount = streamResource.dataCount;
         var data = streamResource.data;
         // 创建顶点缓冲
         var buffer = context.createVertexBuffer(FE3rVertexBuffer);
         buffer.setCode(code);
         buffer.resource = streamResource;
         buffer.vertexCount = dataCount;
         var pixels = null;
         switch (code) {
            case "position":
               pixels = new Float32Array(data);
               buffer.setFormatCd(EAttributeFormat.Float3);
               this.vertexCount = dataCount;
               break;
            case "coord":
               pixels = new Float32Array(data);
               buffer.setFormatCd(EAttributeFormat.Float2);
               break;
            case "color":
               pixels = new Uint8Array(data);
               buffer.setFormatCd(EAttributeFormat.Byte4Normal);
               break;
            case "normal":
            case "binormal":
            case "tangent":
               pixels = new Uint8Array(data);
               buffer.setFormatCd(EAttributeFormat.Byte4Normal);
               break;
            default:
               throw new FError(this, "Unknown code");
         }
         buffer.upload(pixels, streamResource.dataStride, dataCount);
         this.vertexBuffers.set(code, buffer);
      }
      // 创建顶点缓冲集合
      var streamResources = resource.indexStreams;
      var streamCount = streamResources.count();
      for (var i = 0; i < streamCount; i++) {
         var streamResource: FStreamResource = streamResources.at(i);
         var code = streamResource.code;
         var dataCount = streamResource.dataCount;
         var data = streamResource.data;
         // 创建索引缓冲
         var buffer = context.createIndexBuffer(FE3rIndexBuffer);
         buffer.resource = streamResource;
         var dataCd = streamResource.elementDataCd;
         if (dataCd == EDataType.Uint16) {
            buffer.setStrideCd(EIndexStride.Uint16);
         } else if (dataCd == EDataType.Uint32) {
            buffer.setStrideCd(EIndexStride.Uint32);
         } else {
            throw new FError(this, "Unknown data type.");
         }
         buffer.upload(data, 3 * dataCount);
         this.indexBuffers.push(buffer);
      }
      this.ready = true;
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

   // //==========================================================
   // // <T>获得唯一编号。</T>
   // //
   // // @method
   // // @return String 唯一编号
   // //==========================================================
   // MO.FE3rModelMesh_guid = function FE3rModelMesh_guid(){
   //    return this._resource.guid();
   // }

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
}