import {SEvent} from '../../common/lang/SEvent';
import {FObject} from '../../common/lang/FObject';
import {FListeners} from '../../common/lang/FListeners';
import {RObject} from '../../common/lang/RObject';
import {RLogger} from '../../common/lang/RLogger';
import {SSize2} from '../../common/math/SSize2';
import {FEnvironmentConsole} from '../../core/console/FEnvironmentConsole';
import {RConsole} from '../../core/RConsole';
import {RHtml} from '../utility/RHtml';

//==========================================================
// <T>图片。</T>
//
// @class
// @author maocy
// @history 150105
//==========================================================
export class FImage extends FObject {
   // 准备好
   protected _ready = false;
   // 尺寸
   protected _size: SSize2 = null;
   // 地址 
   protected _url = null;
   // 句柄
   protected _handle = null;
   // 句柄
   protected _loadListeners: FListeners = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._size = new SSize2();
      this._loadListeners = new FListeners(this);
   }

   //==========================================================
   // <T>获得大小。</T>
   //
   // @return 大小
   //==========================================================
   public size(): SSize2 {
      return this._size;
   }

   //==========================================================
   // <T>获得句柄。</T>
   //
   // @return 句柄
   //==========================================================
   public handle() {
      return this._handle;
   }

   //==========================================================
   // <T>获得加载监听器。</T>
   //
   // @return 加载监听器
   //==========================================================
   public loadListeners(): FListeners {
      return this._loadListeners;
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this._ready;
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //==========================================================
   public ohLoad() {
      var image: FImage = (this as any).__linker;
      var hImage = image._handle;
      image._size.set(hImage.naturalWidth, hImage.naturalHeight);
      image._ready = true;
      // 处理加载事件
      var event = new SEvent(image);
      image._loadListeners.process(event);
      event.dispose();
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //==========================================================
   public ohError(p) {
      var image = (this as any).__linker;
      var url = image._url;
      RLogger.error(image, 'Load image failure. (url={1})', url);
   }

   //==========================================================
   // <T>加载网络地址资源。</T>
   //
   // @param uri 网络地址
   //==========================================================
   public loadUrl(uri) {
      var url = RConsole.find(FEnvironmentConsole).parseUrl(uri);
      // 创建图片
      var hImage = this._handle;
      if (!hImage) {
         hImage = this._handle = new Image();
         hImage.__linker = this;
         hImage.onload = this.ohLoad;
         hImage.onerror = this.ohError;
      }
      // 加载图片
      this._url = url;
      hImage.src = url;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 清空属性
      this._size = RObject.dispose(this._size);
      this._loadListeners = RObject.dispose(this._loadListeners);
      this._handle = RHtml.free(this._handle);
      // 父处理
      super.dispose();
   }
}
