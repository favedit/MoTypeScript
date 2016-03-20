import {ESamplerFilter} from '../../../runtime/graphic/base/ESamplerFilter';
import {FE3rComponent} from './FE3rComponent';

//==========================================================
// <T>材质。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
export class FE3rMaterial extends FE3rComponent {
   public dataReady = false;
   public ready = false;
   // @method
   public material;
   //_visible       = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   //_guid          = MO.Class.register(o, new MO.AGetSet('_guid'));
   // @method
   //_bitmaps       = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   // @attribute 材质引用
   //_reference     = MO.Class.register(o, new MO.AGetter('_reference'));

   // //==========================================================
   // // <T>根据代码查找位图。</T>
   // //
   // // @method
   // // @param code:String 代码
   // // @return FE3rBitmap 位图
   // //==========================================================
   // MO.FE3rMaterial_findBitmap = function FE3rMaterial_findBitmap(code){
   //    return this._bitmaps.get(code);
   // }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   public testReady() {
      // if (!this._ready) {
      //    var bitmaps = this._bitmaps;
      //    if (bitmaps) {
      //       var count = bitmaps.count();
      //       for (var i = 0; i < count; i++) {
      //          var bitmap = bitmaps.at(i);
      //          if (!bitmap.testReady()) {
      //             return false;
      //          }
      //       }
      //    }
      //    this._ready = true;
      // }
      // 
      return this.ready;
   }

   //==========================================================
   // <T>加载处理。</T>
   //==========================================================
   public processLoad() {
      // 检查数据已加载
      if (this.dataReady) {
         return true;
      }
      // 检查资源是否准备好
      if (!this.resource.testReady()) {
         return false;
      }
      // 加载资源
      this.loadResource(this.resource);
      return true;
   }

   // //==========================================================
   // // <T>测试可见性。</T>
   // //
   // // @method
   // // @return Boolean 可见性
   // //==========================================================
   // MO.FE3rMaterial_testVisible = function FE3rMaterial_testVisible(){
   //    var o = this;
   //    var visible = o._visible;
   //    if(visible && o._reference){
   //       visible = o._reference.testVisible();
   //    }
   //    return visible;
   // }

   //==========================================================
   // <T>加载材质资源。</T>
   //
   // @param resource 材质资源
   //==========================================================
   public loadResource(resource) {
      var context = this._graphicContext;
      var textures = resource.textures;
      var count = textures.count();
      for (var i = 0; i < count; i++) {
         var texture = textures.at(i);
         var textureResource = texture.textureResource;
         var rtexture = context.createFlatTexture();
         rtexture.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
         rtexture.setWrapCd(ESamplerFilter.Repeat, ESamplerFilter.Repeat);
         rtexture.upload(textureResource.image);
      }
      //this._guid = resource.guid();
      //this._resource = resource;
      //this._info.calculate(resource.info());
      //this._dirty = true;
      this.ready = true;
   }

   // //==========================================================
   // // <T>重新加载数据。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3rMaterial_reloadResource = function FE3rMaterial_reloadResource(){
   //    var o = this;
   //    o._info.calculate(o._resource.info());
   //    o._dirty = true;
   // }

   // //==========================================================
   // // <T>加载处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3rMaterial_load= function FE3rMaterial_load(){
   //    var o = this;
   //    var resource = o._resource;
   //    // 加载位图
   //    var bitmapResources = resource.bitmaps();
   //    if(bitmapResources){
   //       var bitmapConsole = MO.Console.find(MO.FE3rBitmapConsole)
   //       var bitmaps = o._bitmaps = new MO.TDictionary();
   //       var count = bitmapResources.count();
   //       for(var i = 0; i < count; i++){
   //          // 获得位图资源
   //          var bitmapResource = bitmapResources.at(i);
   //          var bitmapCode = bitmapResource.code();
   //          // 获得打包资源
   //          var bitmapPackResource = bitmapResource.bitmapPack();
   //          var packCode = bitmapPackResource.code();
   //          var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
   //          // 创建位图
   //          var bitmap = MO.Class.create(MO.FE3rBitmap);
   //          bitmap._pack  = bitmapPack;
   //          bitmap.loadResource(bitmapResource);
   //          bitmaps.set(bitmapCode, bitmap);
   //       }
   //    }
   // }
}