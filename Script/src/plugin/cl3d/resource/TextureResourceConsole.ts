import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {Service} from '../../runtime/core/Service';
import {TextureResource} from './TextureResource';

//==========================================================
// <T>资源纹理管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
export class TextureResourceConsole extends Service {
   // 纹理集合
   public textures: Dictionary<TextureResource> = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.textures = new Dictionary<TextureResource>();
   }

   //==========================================================
   // <T>加载指定代码的纹理资源。</T>
   //
   // @param code:String 代码
   // @return 处理结果
   //==========================================================
   public load(url: string) {
      // 获取纹理
      var textures = this.textures;
      var texture: TextureResource = textures.get(url);
      if (texture) {
         return texture;
      }
      //..........................................................
      // 生成地址
      // var v = MO.Console.find(MO.FE3sVendorConsole).find('texture');
      // var u = v.makeUrl(p);
      // 创建纹理资源
      //texture = RClass.create(FTextureResource);
      //texture.setGuid(p);
      //texture.setVendor(v);
      //texture.setSourceUrl(u);
      // RConsole.find(FResourceConsole).load(texture);
      textures.set(url, texture);
      return texture;
   }

   //==========================================================
   // <T>加载指定代码的纹理资源。</T>
   //
   // @param code:String 代码
   // @return 处理结果
   //==========================================================
   public loadByUrl(url: string): TextureResource {
      // 获取纹理
      var textures = this.textures;
      var texture = textures.get(url);
      if (texture) {
         return texture;
      }
      //..........................................................
      // 生成地址
      // var v = MO.Console.find(MO.FE3sVendorConsole).find('texture');
      // var u = v.makeUrl(p);
      // 创建纹理资源
      texture = ClassUtil.create(TextureResource);
      texture.guid = url;
      texture.url = url;
      texture.load();
      //texture.setVendor(v);
      //texture.setSourceUrl(u);
      //RConsole.find(FResourceConsole).load(texture);
      textures.set(url, texture);
      return texture;
   }

   // //==========================================================
   // // <T>加载指定代码的纹理资源。</T>
   // //
   // // @param p:code:String 代码
   // // @return 处理结果
   // //==========================================================
   // MO.FE3sTextureConsole_loadBitmap = function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   //    var o = this;
   //    // 生成地址
   //    var v = MO.Console.find(MO.FE3sVendorConsole).find('texture.bitmap');
   //    v.set('guid', pg);
   //    v.set('code', pc);
   //    v.set('format', pf);
   //    var u = v.makeUrl();
   //    // 加载位图
   //    var g = o._image = MO.Class.create(MO.FImage);
   //    g.loadUrl(u);
   //    return g;
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.textures = ObjectUtil.free(this.textures);
      // 父处理
      super.dispose();
   }
}