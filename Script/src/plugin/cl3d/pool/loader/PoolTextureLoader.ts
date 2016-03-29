import {Fatal} from '../../../runtime/common/lang/Fatal';
import {ProcessLoader} from '../../../runtime/core/service/ProcessLoader';
import {ImageResource} from '../../../runtime/ui/resource/ImageResource';
import {PhongMaterial} from '../../material/PhongMaterial';

//==========================================================
// <T>材质加载器。</T>
//
// @author maocy
// @history 160323
//==========================================================
export class PoolTextureLoader extends ProcessLoader {
   // 地址
   public url;
   // 图片
   public image;
   // 纹理
   public texture;

   //==========================================================
   // <T>处理加载开始。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadBegin(): boolean {
      var result = super.processLoadBegin();
      var image: ImageResource = this.image = new ImageResource();
      image.loadListeners.register(this, this.onImageLoad);
      image.loadUrl(this.url);
      return result;
   }

   //==========================================================
   // <T>处理加载</T>
   //
   // @param 处理结果
   //==========================================================
   public onImageLoad(sender, event): void {
      this.texture.upload(this.image);
      this.texture.ready = true;;
   }
}