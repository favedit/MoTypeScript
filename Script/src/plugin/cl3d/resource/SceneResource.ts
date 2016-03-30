import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {LoggerUtil} from '../../runtime/common/lang/LoggerUtil';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {AssertUtil} from '../../runtime/common/AssertUtil';
import {DataStream} from '../../runtime/common/io/DataStream';
import {FResource} from './FResource';
import {MeshResource} from './MeshResource';
import {SceneLayerResource} from './SceneLayerResource';

//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class SceneResource extends FResource {
   //    // @attribute
   //    o._dataCompress = true;
   //    // @attribute
   //    o._templates    = null;
   protected _layers: Dictionary<SceneLayerResource>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.typeCode = 'Scene';
      this._layers = new Dictionary<SceneLayerResource>();
   }

   //==========================================================
   // <T>获得显示层集合。</T>
   //
   // @return 显示层集合
   //==========================================================
   public layers(): Dictionary<SceneLayerResource> {
      return this._layers;
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param jconfig 配置
   //==========================================================
   public loadContent(jconfig: any) {
      // 加载纹理集合
      var count = jconfig.length;
      for (var n: number = 0; n < count; n++) {
         var jlayer = jconfig[n];
         var layer: SceneLayerResource = ClassUtil.create(SceneLayerResource);
         layer.loadConfig(jlayer);
         this._layers.set(layer.code, layer);
      }
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param jconfig 配置
   //==========================================================
   public loadConfig(jconfig: any) {
      super.loadConfig(jconfig);
      // 加载内容
      AssertUtil.debugNotNull(jconfig.content);
      this.loadContent(jconfig.content);
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