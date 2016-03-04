import {FObject} from '../../common/lang/FObject';
import {RLogger} from '../../common/lang/RLogger';
import {RConsole} from '../RConsole';
import {FEnvironmentConsole} from '../console/FEnvironmentConsole';

//==========================================================
// <T>声音。</T>
//
// @class
// @author maocy
// @history 150526
//==========================================================
export class FAudio extends FObject {
   // o = MO.Class.inherits(this, o, MO.FObject, MO.MAudio);
   //..........................................................
   // @attribute
   private __linker: any = null;
   //..........................................................
   // @attribute
   //_url      = MO.Class.register(o, new MO.AGetter('_url'));
   protected _url: string = null;
   //..........................................................
   // @html
   protected _hAudio = null;


   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public ohLoad() {
      var o = this.__linker;
      o._ready = true;
      o._hAudio.oncanplay = null;
      RLogger.info(o, 'Audio load success. (url={1})', o._url);
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public ohLoaded(event) {
      var o = this.__linker;
      o._ready = true;
      o._loaded = true;
      o._finish = true;
      o._hAudio.oncanplaythrough = null;
      RLogger.info(o, 'Audio loaded success. (url={1})', o._url);
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public ohError(event) {
      var o = this.__linker;
      o._finish = true;
      RLogger.error(o, 'Audio load failure. (url={1})', o._url);
   }
   //==========================================================
   // <T>获得音量。</T>
   //
   // @method
   // @return 音量
   //==========================================================
   public volume() {
      return this._hAudio.volume;
   }

   //==========================================================
   // <T>设置音量。</T>
   //
   // @method
   // @param value:Number 设置音量
   //==========================================================
   public setVolume(value) {
      this._hAudio.volume = value;
   }

   //==========================================================
   // <T>获得循环。</T>
   //
   // @method
   // @return Boolean 循环
   //==========================================================
   public loop() {
      return this._hAudio.loop;
   }

   //==========================================================
   // <T>设置循环。</T>
   //
   // @method
   // @param value:Boolean 设置循环
   //==========================================================
   public setLoop(value) {
      this._hAudio.loop = value;
   }

   //==========================================================
   // <T>播放处理。</T>
   //
   // @method
   //==========================================================
   public play(position) {
      var o = this;
      var hAudio = o._hAudio;
      if (position != null) {
         if (hAudio.currentTime != position) {
            hAudio.currentTime = position;
         }
      }
      hAudio.play();
      RLogger.debug(o, 'Audio play. (url={1}, position={2})', o._url, position);
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return 是否准备好
   //==========================================================
   public pause() {
      var o = this;
      o._hAudio.pause();
      RLogger.debug(o, 'Audio pause. (url={1})', o._url);
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
      var hAudio = o._hAudio;
      if (!hAudio) {
         hAudio = o._hAudio = new Audio();
         hAudio.__linker = o;
         hAudio.oncanplay = o.ohLoad;
         hAudio.oncanplaythrough = o.ohLoaded;
         hAudio.onerror = o.ohError;
         hAudio.loop = false;
      }
      // 不支持声音完成检测
      //if (!MO.Window.Browser.capability.soundFinish) {
      //   o._ready = true;
      //   o._loaded = true;
      //   o._finish = true;
      //}
      // 加载图片
      o._url = url;
      hAudio.src = url;
   }

   //==========================================================
   // <T>选择处理。</T>
   //
   // @method
   //==========================================================
   public select() {
      var o = this;
      o._hAudio.play();
      o._hAudio.pause();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 清空属性
      //o._hAudio = MO.Window.Html.free(o._hAudio);
      super.dispose();
   }
}
