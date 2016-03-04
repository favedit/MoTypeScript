import {FObject} from '../../common/lang/FObject';
import {RObject} from '../../common/lang/RObject';
import {FDictionary} from '../../common/lang/FDictionary';
import {RLogger} from '../../common/lang/RLogger';
import {RClass} from '../../common/reflect/RClass';
import {FEnvironmentConsole} from '../console/FEnvironmentConsole';
import {RConsole} from '../RConsole';
import {FAudio} from './FAudio';
import {FAudioBuffer} from './FAudioBuffer';

//==========================================================
// <T>音频环境。</T>
//
// @author sunpeng
// @history 150714
//==========================================================
export class FAudioContext extends FObject {
   //..........................................................
   // @attribute
   //o._handle = MO.Class.register(o, new MO.AGetter('_handle'));
   protected _handle = null;
   // @attribute
   //o._buffers = MO.Class.register(o, new MO.AGetter('_buffers'));
   protected _buffers: FDictionary = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._buffers = new FDictionary();
   }

   //==========================================================
   // <T>创建声音资源。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return AudioBufferSourceNode 音频缓冲
   //==========================================================
   public setup(uri) {
      var o = this;
      // 设置属性
      //o._audioBuffers = new FDictionary();
      // 创建环境
      var context = null;
      if ((window as any).AudioContext) {
         context = new AudioContext();
      } else if ((window as any).webkitAudioContext) {
         context = new (window as any).webkitAudioContext();
      }
      if (!context) {
         return RLogger.error(o, 'Invalid audio context.');
      }
      o._handle = context;
   }

   //==========================================================
   // <T>检查音频是否加载完成。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return bool 是否已加载
   //==========================================================
   public createBuffer(uri) {
      var o = this;
      var url = RConsole.find(FEnvironmentConsole).parse(uri);
      // 创建缓冲
      var buffer = null;
      o._handle = null;
      if (o._handle) {
         buffer = RClass.create(FAudioBuffer);
         buffer.setContext(o);
      } else {
         buffer = RClass.create(FAudio);
      }
      buffer.loadUrl(url);
      return buffer;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._buffers = RObject.dispose(this._buffers);
      // 父处理
      super.dispose();
   }
}
