import {Objects} from '../../../runtime/common/lang/Objects';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {FResource} from './FResource';
import {MaterialTextureResource} from './MaterialTextureResource';

//==========================================================
// <T>材质资源。</T>
//
// @class
// @author maocy
// @history 150428
//==========================================================
export class MaterialResource extends FResource {
   //    // @attribute
   //    o._material     = MO.Class.register(o, new MO.AGetter('_material'));
   public textures: Objects<MaterialTextureResource>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.typeCode = 'Material';
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady(): boolean {
      var ready = this.ready;
      if (!ready && this.dataReady) {
         var textures = this.textures;
         if (textures) {
            var count: number = textures.count();
            for (var n = 0; n < count; n++) {
               var texture = textures.at(n);
               if (!texture.testReady()) {
                  return false;
               }
            }
         }
         ready = this.ready = true;
      }
      return ready;
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
   // @param jconfig 配置
   //==========================================================
   public loadConfig(jconfig: any) {
      super.loadConfig(jconfig);
      // 加载纹理集合
      var jtextures = jconfig.textures;
      if (jtextures) {
         var count: number = jtextures.length;
         var textures = this.textures = new Objects<MaterialTextureResource>();
         for (var n: number = 0; n < count; n++) {
            var jtexture = jtextures[n];
            var renderable = ClassUtil.create(MaterialTextureResource);
            renderable.loadConfig(jtexture);
            textures.push(renderable);
         }
      }
      this.dataReady = true;
   }
}