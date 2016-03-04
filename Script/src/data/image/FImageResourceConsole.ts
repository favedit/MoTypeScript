import {EScope} from '../../runtime/common/lang/EScope';
import {FDictionary} from '../../runtime/common/lang/FDictionary';
import {RObject} from '../../runtime/common/lang/RObject';
import {RClass} from '../../runtime/common/reflect/RClass';
import {FConsole} from '../../runtime/core/FConsole';
import {RConsole} from '../../runtime/core/RConsole';
import {FEnvironmentConsole} from '../../runtime/core/console/FEnvironmentConsole';
import {FImageResource} from './FImageResource';

//==========================================================
// <T>图片资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
export class FImageResourceConsole extends FConsole {
   //..........................................................
   // @attribute
   protected _scopeCd = EScope.Global;
   // @attribute
   protected _images = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._images = new FDictionary();
   }

   //==========================================================
   // <T>创建图片资源。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return FAudio 资源对象
   //==========================================================
   public create(uri) {
      var o = this;
      // 获得地址
      var url = RConsole.find(FEnvironmentConsole).parse(uri);
      // 加载地址
      var image = RClass.create(FImageResource);
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
      var o = this;
      var images = o._images;
      var image = images.get(uri);
      if (!image) {
         image = o.create(uri);
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
