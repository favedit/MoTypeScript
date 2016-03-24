import {Dictionary} from '../../common/lang/Dictionary';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Service} from '../../core/Service';
import {ServiceUtil} from '../../core/ServiceUtil';
import {EnvironmentService} from '../../core/service/EnvironmentService';
import {FAudio} from './FAudio';

//==========================================================
// <T>音乐资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
export class FAudioConsole extends Service {
   // 声音集合
   protected _audios: Dictionary<FAudio> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this.scopeCd = ScopeEnum.Global;
      this._audios = new Dictionary<FAudio>();
   }

   //==========================================================
   // <T>创建声音资源。</T>
   //
   // @param uri 网络地址
   // @return 资源对象
   //==========================================================
   public create(uri) {
      var url = ServiceUtil.find(EnvironmentService).parse(uri);
      var audio: FAudio = ClassUtil.create(FAudio);
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
      this._audios = ObjectUtil.dispose(this._audios);
      // 父处理
      super.dispose();
   }
}
