import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {FImage} from '../../../runtime/ui/resource/FImage';
import {FE3rBitmapPack} from './FE3rBitmapPack';

//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FE3rBitmapFlatPack extends FE3rBitmapPack {
   // 图像
   protected _image: FImage = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>数据加载处理。</T>
   //==========================================================
   public onLoad() {
      // 创建纹理
      var texture = this._texture = this._graphicContext.createFlatTexture();
      texture.upload(this._image);
      texture.makeMipmap();
      // 释放位图
      this._image = ObjectUtil.dispose(this._image);
      // 加载完成
      this._dataReady = true;
   }
   //==========================================================
   // <T>加载模型资源。</T>
   //
   // @method
   // @param p:resource:FE3sTextureBitmapPack 模型资源
   //==========================================================
   public loadUrl(url) {
      var o = this;
      var image = o._image = RClass.create(FImage);
      image.addLoadListener(o, o.onLoad);
      image.loadUrl(url);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._image = ObjectUtil.dispose(this._image);
      // 父处理
      super.dispose();
   }
}