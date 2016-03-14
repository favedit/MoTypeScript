import {FDictionary} from '../../common/lang/FDictionary';
import {EScope} from '../../common/lang/EScope';
import {RObject} from '../../common/lang/RObject';
import {RClass} from '../../common/reflect/RClass';
import {FConsole} from '../../core/FConsole';
import {RConsole} from '../../core/RConsole';
import {FEnvironmentConsole} from '../../core/console/FEnvironmentConsole';
import {FAudio} from './FAudio';

//==========================================================
// <T>音乐资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
export class FAudioConsole extends FConsole {
   // 声音集合
   protected _audios: FDictionary<FAudio> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this.scopeCd = EScope.Global;
      this._audios = new FDictionary<FAudio>();
   }

   //==========================================================
   // <T>创建声音资源。</T>
   //
   // @param uri 网络地址
   // @return 资源对象
   //==========================================================
   public create(uri) {
      var url = RConsole.find(FEnvironmentConsole).parse(uri);
      var audio: FAudio = RClass.create(FAudio);
      audio.loadUrl(url);
      return audio;
   }

   //==========================================================
   // <T>加载声音资源。</T>
   //
   // @param uri  网络地址
   // @return 资源对象
   //==========================================================
   public load(uri) {
      var audios = this._audios;
      var audio = audios.get(uri);
      if (!audio) {
         audio = this.create(uri);
         audios.set(uri, audio);
      }
      return audio;
   }

   //==========================================================
   // <T>选择处理。</T>
   //==========================================================
   public select() {
      var audios = this._audios;
      var count: number = audios.count();
      for (var i: number = 0; i < count; i++) {
         var audio = audios.at(i);
         audio.select();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 清空变量
      this._audios = RObject.dispose(this._audios);
      // 父处理
      super.dispose();
   }
}
