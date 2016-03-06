import {FObject} from '../../common/lang/FObject';
import {RObject} from '../../common/lang/RObject';
import {SEvent} from '../../common/lang/SEvent';
import {RLogger} from '../../common/lang/RLogger';
import {SSize2} from '../../common/math/SSize2';
import {FEnvironmentConsole} from '../../core/console/FEnvironmentConsole';
import {RConsole} from '../../core/RConsole';

//==========================================================
// <T>图片。</T>
//
// @class
// @author maocy
// @history 150105
//==========================================================
export class FImage extends FObject {
   //o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   //..........................................................
   // @attribute
   protected __linker = null;
   //_optionAlpha = MO.Class.register(o, new MO.AGetSet('_optionAlpha'), true);
   protected _ready = false;
   //_size = MO.Class.register(o, new MO.AGetter('_size'));
   protected _size = null;
   //_url = MO.Class.register(o, new MO.AGetter('_url'));
   protected _url = null;
   //..........................................................
   // @html
   protected _hImage = null;

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
      var image: FImage = this.__linker;
      var hImage = image._hImage;
      image._size.set(hImage.naturalWidth, hImage.naturalHeight);
      image._ready = true;
      // 处理加载事件
      var event = new SEvent(image);
      //image.processLoadListener(event);
      event.dispose();
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public ohError(p) {
      var image = this.__linker;
      var url = image._url;
      RLogger.error(image, 'Load image failure. (url={1})', url);
   }

   //==========================================================
   // <T>获得位图。</T>
   //
   // @method
   // @return 位图
   //==========================================================
   public image() {
      return this._hImage;
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
      var o = this;
      var url = RConsole.find(FEnvironmentConsole).parseUrl(uri);
      // 创建图片
      var hImage = o._hImage;
      if (!hImage) {
         hImage = o._hImage = new Image();
         hImage.__linker = o;
         hImage.onload = o.ohLoad;
         hImage.onerror = o.ohError;
      }
      // 加载图片
      o._url = url;
      hImage.src = url;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 清空属性
      o._size = RObject.dispose(o._size);
      //o._hImage = MO.Window.Html.free(o._hImage);
      // 父处理
      super.dispose();
   }
}
