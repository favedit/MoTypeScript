import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {FImage} from '../../../runtime/ui/resource/FImage';
import {FE3rBitmapPack} from './FE3rBitmapPack';

//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FE3rBitmapCubePack extends FE3rBitmapPack {
   // 图形集合
   protected _images: Objects<FImage> = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>加载模型资源。</T>
   //
   // @method
   // @param p:resource:FE3sTextureBitmapPack 模型资源
   //==========================================================
   public loadUrl(url) {
      //var texture = p._texture;
      // 获得浏览器描述
      //var capability = RBrowser.capability();
      // 加载二进制数据
      //var d = p.data();
      //var t = p._formatName;
      var images = this._images = new Objects<FImage>();
      for (var i: number = 0; i < 6; i++) {
         var image: FImage = ClassUtil.create(FImage);
         // image._index = i;
         // image.setOptionAlpha(false);
         //if(capability.blobCreate){
         //   var blob = new Blob([d[i]], {'type' : 'image/' + t});
         //   var url = window.URL.createObjectURL(blob);
         //   g.loadUrl(url);
         //}else{
         //var url = RBrowser.hostPath('/cloud.resource.material.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
         image.loadListeners.register(this, this.onLoad);
         image.loadUrl(url + "&index=" + i);
         //}
         images.push(image);
      }
   }

   //==========================================================
   // <T>数据加载处理。</T>
   //
   // @param region 区域
   // @return 是否可见
   //==========================================================
   public onLoad() {
      var context = this._graphicContext;
      var images = this._images;
      // 获得浏览器描述
      // var capability = MO.Window.Browser.capability();
      // 测试是否全部加载
      for (var i: number = 0; i < 6; i++) {
         if (!images.at(i).testReady()) {
            return;
         }
      }
      // 创建纹理
      var texture = this._texture = context.createCubeTexture();
      texture.upload(images.at(0), images.at(1), images.at(2), images.at(3), images.at(4), images.at(5));
      // 释放资源
      //if(capability.blobCreate){
      //   for(var i = 0; i < 6; i++){
      //      var m = is[i];
      //      window.URL.revokeObjectURL(m.url());
      //      is[i] = MO.Lang.Object.dispose(m);
      //   }
      //}
      this._images = ObjectUtil.dispose(this._images, true);
      // 加载完成
      this._dataReady = true;
      this._ready = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._images = ObjectUtil.dispose(this._images, true);
      // 父处理
      super.dispose();
   }
}