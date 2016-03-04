import {FDictionary} from '../../common/lang/FDictionary';
import {RObject} from '../../common/lang/RObject';
import {FConsole} from '../FConsole';

//==========================================================
// <T>音乐资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
export class FAudioConsole extends FConsole {
   //o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   //protected _scopeCd = common.lang.EScope.Global;
   // @attribute
   protected _audios = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._audios = new FDictionary();
   }

   //==========================================================
   // <T>创建声音资源。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return FAudio 资源对象
   //==========================================================
   public create(uri) {
      //var o = this;
      //var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
      //var audio = MO.Class.create(MO.FAudioResource);
      //audio.loadUrl(url);
      //return audio;
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
      var audios = o._audios;
      var audio = audios.get(uri);
      if (!audio) {
         audio = o.create(uri);
         audios.set(uri, audio);
      }
      return audio;
   }

   //==========================================================
   // <T>选择处理。</T>
   //
   // @method
   //==========================================================
   public select() {
      var o = this;
      var audios = o._audios;
      var count = audios.count();
      for (var i = 0; i < count; i++) {
         var audio = audios.at(i);
         audio.select();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 清空变量
      this._audios = RObject.dispose(o._audios);
      // 父处理
      super.dispose();
   }
}
