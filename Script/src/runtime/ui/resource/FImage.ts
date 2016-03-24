import {Event} from '../../common/lang/Event';
import {ObjectBase} from '../../common/lang/ObjectBase';
import {Listeners} from '../../common/lang/Listeners';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {Size2} from '../../common/math/Size2';
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
export class FImage extends ObjectBase {
   // 准备好
   protected _ready;
   // 尺寸
   protected _size: Size2;
   // 地址
   protected _url: string;
   // 句柄
   protected _handle;
   // 句柄
   protected _loadListeners: Listeners;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._ready = false;
      this._size = new Size2();
      this._loadListeners = new Listeners(this);
   }

   //==========================================================
   // <T>获得大小。</T>
   //
   // @return 大小
   //==========================================================
   public get size(): Size2 {
      return this._size;
   }

   //==========================================================
   // <T>获得句柄。</T>
   //
   // @return 句柄
   //==========================================================
   public get handle() {
      return this._handle;
   }

   //==========================================================
   // <T>获得加载监听器。</T>
   //
   // @return 加载监听器
   //==========================================================
   public get loadListeners(): Listeners {
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
      var event = new Event(image);
      image._loadListeners.process(event);
      event.dispose();
      //console.log('Load image success. (url={1})', image._url);
      LoggerUtil.info(image, 'Load image success. (url={1})', image._url);
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //==========================================================
   public ohError(p) {
      var image = (this as any).__linker;
      var url = image._url;
      //console.log('Load image failure. (url={1})', image._url);
      LoggerUtil.error(image, 'Load image failure. (url={1})', url);
   }

   //==========================================================
   // <T>加载网络地址资源。</T>
   //
   // @param uri 网络地址
   //==========================================================
   public loadUrl(uri) {
      var url = this._url = RConsole.find(FEnvironmentConsole).parseUrl(uri);
      // 创建图片
      var hImage = this._handle;
      if (!hImage) {
         hImage = this._handle = new Image();
         hImage.__linker = this;
         hImage.onload = this.ohLoad;
         hImage.onerror = this.ohError;
      }
      // 加载图片
      hImage.src = url;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 清空属性
      this._size = ObjectUtil.dispose(this._size);
      this._loadListeners = ObjectUtil.dispose(this._loadListeners);
      this._handle = RHtml.free(this._handle);
      // 父处理
      super.dispose();
   }
}
