import {FObject} from '../../runtime/common/lang/FObject';
import {SEvent} from '../../runtime/common/lang/SEvent';
import {SSize2} from '../../runtime/common/math/SSize2';
import {FResource} from '../../runtime/core/resource/FResource';

//==========================================================
// <T>图片。</T>
//
// @class
// @author maocy
// @history 150105
//==========================================================
export class FImageResource extends FResource {
   /** 大小 */
   protected _size = null;
   /** 网络地址 */
   protected _url = null;
   // @attribute
   //protected __linker = null;
   //_optionAlpha = MO.Class.register(o, new MO.AGetSet('_optionAlpha'), true);
   //_size = MO.Class.register(o, new MO.AGetter('_size'));
   //protected _url = null;
   //..........................................................
   // @html
   //protected _hImage = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._size = new SSize2();
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public ohLoad() {
      // var resource: FImageResource = this.__linker;
      // var hImage = resource._hImage;
      // resource._size.set(hImage.naturalWidth, hImage.naturalHeight);
      // resource._ready = true;
      // // 处理加载事件
      // var event = new SEvent(image);
      // //image.processLoadListener(event);
      // event.dispose();
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public ohError(p) {
      // var image = this.__linker;
      // var url = image._url;
      // RLogger.error(image, 'Load image failure. (url={1})', url);
   }

   //==========================================================
   // <T>获得位图。</T>
   //
   // @method
   // @return 位图
   //==========================================================
   public image() {
      //return this._hImage;
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this._ready;
   }

   //==========================================================
   // <T>加载网络地址资源。</T>
   //
   // @method
   // @param uri:String 网络地址
   //==========================================================
   public loadUrl(uri) {
      // var o = this;
      // var url = RConsole.find(FEnvironmentConsole).parseUrl(uri);
      // // 创建图片
      // var hImage = o._hImage;
      // if (!hImage) {
      //    hImage = o._hImage = new Image();
      //    hImage.__linker = o;
      //    hImage.onload = o.ohLoad;
      //    hImage.onerror = o.ohError;
      // }
      // // 加载图片
      // o._url = url;
      // hImage.src = url;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // var o = this;
      // // 清空属性
      // o._size = RObject.dispose(o._size);
      // //o._hImage = MO.Window.Html.free(o._hImage);
      // // 父处理
      super.dispose();
   }
}
