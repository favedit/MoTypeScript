import {EScope} from '../../common/lang/EScope';
import {FDictionary} from '../../common/lang/FDictionary';
import {RObject} from '../../common/lang/RObject';
import {RClass} from '../../common/reflect/RClass';
import {FConsole} from '../../core/FConsole';
import {RConsole} from '../../core/RConsole';
import {FEnvironmentConsole} from '../../core/console/FEnvironmentConsole';
import {FImage} from './FImage';

//==========================================================
// <T>图片资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
export class FImageConsole extends FConsole {
   // 图像集合 
   protected _images: FDictionary<FImage> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this.scopeCd = EScope.Global;
      this._images = new FDictionary<FImage>();
   }

   //==========================================================
   // <T>创建图片资源。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return FAudio 资源对象
   //==========================================================
   public create(uri) {
      // 获得地址
      var url = RConsole.find(FEnvironmentConsole).parse(uri);
      // 加载地址
      var image = RClass.create(FImage);
      image.loadUrl(url);
      return image;
   }

   //==========================================================
   // <T>加载声音资源。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return FAudio 资源对象
   //==========================================================
   public load(uri) {
      var images = this._images;
      var image = images.get(uri);
      if (!image) {
         image = this.create(uri);
         images.set(uri, image);
      }
      return image;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 清空变量
      this._images = RObject.dispose(this._images);
      // 父处理
      super.dispose();
   }
}
