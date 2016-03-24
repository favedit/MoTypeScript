import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {RClass} from '../../runtime/common/reflect/RClass';
import {FConsole} from '../../runtime/core/FConsole';
import {FTextureResource} from './FTextureResource';

//==========================================================
// <T>资源纹理管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
export class FTextureResourceConsole extends FConsole {
   // 纹理集合
   public textures: Dictionary<FTextureResource> = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.textures = new Dictionary<FTextureResource>();
   }

   // //==========================================================
   // // <T>反序列化一个纹理。</T>
   // //
   // // @method
   // // @param p:input:FByteStream 输入流
   // // @return FE3sTexture 纹理
   // //==========================================================
   // MO.FE3sTextureConsole_unserialize = function FE3sTextureConsole_unserialize(p){
   //    var o = this;
   //    // 创建材质组
   //    var r = MO.Class.create(MO.FE3sTexture);
   //    r._dataReady = true;
   //    r.unserialize(p);
   //    // 存储材质组
   //    o._textures.set(r.guid(), r);
   //    return r;
   // }

   //==========================================================
   // <T>加载指定代码的纹理资源。</T>
   //
   // @param code:String 代码
   // @return 处理结果
   //==========================================================
   public load(p) {
      // 获取纹理
      var textures = this.textures;
      var texture: FTextureResource = textures.get(p);
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
      textures.set(p, texture);
      return texture;
   }

   //==========================================================
   // <T>加载指定代码的纹理资源。</T>
   //
   // @param code:String 代码
   // @return 处理结果
   //==========================================================
   public loadByUrl(url:string) {
      // 获取纹理
      var textures = this.textures;
      var texture: FTextureResource = textures.get(url);
      if (texture) {
         return texture;
      }
      //..........................................................
      // 生成地址
      // var v = MO.Console.find(MO.FE3sVendorConsole).find('texture');
      // var u = v.makeUrl(p);
      // 创建纹理资源
      texture = RClass.create(FTextureResource);
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