import {SEvent} from '../lang/SEvent';
import {ObjectBase} from '../lang/ObjectBase';
import {LoggerUtil} from '../lang/LoggerUtil';

//==========================================================
// <T>文件读取器。</T>
//
// @class
// @author maocy
// @version 150401
//==========================================================
export class FileViewer extends ObjectBase {
   //..........................................................
   // @attribute
   protected __linker = null;
   // @attribute
   protected _reader: FileReader = null;
   // @attribute
   //_fileName = MO.Class.register(o, new MO.AGetter('_fileName'));
   protected _fileName: string = null;
   //_length = MO.Class.register(o, new MO.AGetter('_length'), 0);
   protected _length: number = 0;
   //_data = MO.Class.register(o, new MO.AGetter('_data'));
   protected _data: any = null;
   // @attribute
   protected _statusLoading: boolean = false;

   //==========================================================
   // <T>开始加载处理。</T>
   //
   // @method
   //==========================================================
   public ohLoadStart() {
      //var o = this.__linker;
   }

   //==========================================================
   // <T>加载中处理。</T>
   //
   // @method
   //==========================================================
   public ohLoad() {
      //var o = this.__linker;
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public ohLoadEnd() {
      var o = this.__linker;
      var reader = o._reader;
      o._statusFree = true;
      if (reader.error) {
         LoggerUtil.error(o, 'Load file failure. (error={1])', reader.error);
      } else {
         // 设置属性
         o._length = reader.result.byteLength;
         o._data = reader.result;
         // 完成处理
         var event = new SEvent(o);
         o.processLoadListener(event);
         event.dispose();
      }
   }

   //==========================================================
   // <T>加载进度响应处理。</T>
   //
   // @method
   //==========================================================
   public ohProgress() {
      var o = this.__linker;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 创建读取器
      var reader = this._reader = new FileReader();
      (reader as any).__linker = this;
      reader.onloadstart = this.ohLoadStart;
      reader.onload = this.ohLoad;
      reader.onloadend = this.ohLoadEnd;
      reader.onprogress = this.ohProgress;
   }

   //==========================================================
   // <T>加载文件数据。</T>
   //
   // @method
   // @param file:Object 文件数据
   //==========================================================
   public loadFile(file) {
      var o = this;
      o._fileName = file.name;
      o._length = file.size;
      var reader = o._reader;
      reader.readAsArrayBuffer(file);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 释放属性
      var reader = o._reader;
      (reader as any).__linker = null;
      reader.onloadstart = null;
      reader.onload = null;
      reader.onloadend = null;
      reader.onprogress = null;
      o._reader = null;
      o._fileName = null;
      o._data = null;
      // 父处理
      super.dispose();
   }
}
