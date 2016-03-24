import {FDictionary} from '../../runtime/common/lang/FDictionary';
import {RObject} from '../../runtime/common/lang/RObject';
import {RLogger} from '../../runtime/common/lang/RLogger';
import {FDataStream} from '../../runtime/common/io/FDataStream';
import {FResource} from './FResource';
import {FMeshResource} from './FMeshResource';

//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class FSceneResource extends FResource {
   //    // @attribute
   //    o._typeName     = 'Scene';
   //    o._dataCompress = true;
   //    // @attribute
   //    o._templates    = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param jconfig 配置
   //==========================================================
   public loadConfig(jconfig: any) {
      super.loadConfig(jconfig);
      // 加载纹理集合 
      // var jtextures = jconfig.textures;
      // if (jtextures) {
      //    var count: number = jtextures.length;
      //    var textures = this.textures = new FObjects<FMaterialTextureResource>();
      //    for (var n: number = 0; n < count; n++) {
      //       var jtexture = jtextures[n];
      //       var renderable = RClass.create(FMaterialTextureResource);
      //       renderable.loadConfig(jtexture);
      //       textures.push(renderable);
      //    }
      // }
      this.ready = true;
   }

   // //==========================================================
   // // <T>从输入流里反序列化信息内容。</T>
   // //
   // // @method
   // // @param input:FByteStream 数据流
   // //==========================================================
   // MO.FE3sScene_unserialize = function FE3sScene_unserialize(input){
   //    var o = this;
   //    o.__base.FE3sSpace.unserialize.call(o, input);
   //    // 读取模板集合
   //    var templateCount = input.readInt16();
   //    if(templateCount > 0){
   //       var templateConsole = MO.Console.find(MO.FE3sTemplateConsole);
   //       var templates = o._templates = new MO.TDictionary();
   //       for(var i = 0; i < templateCount; i++){
   //          var template = templateConsole.unserialize(p);
   //          templates.set(ttemplate.guid(), template);
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @method
   // // @param p:config:TXmlNode 配置节点
   // //==========================================================
   // MO.FE3sScene_saveConfig = function FE3sScene_saveConfig(p){
   //    var o = this;
   //    o.__base.FE3sSpace.saveConfig.call(o, p);
   // }
}