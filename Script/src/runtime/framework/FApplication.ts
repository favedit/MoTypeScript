import {ObjectBase} from '../common/lang/ObjectBase';
import {Objects} from '../common/lang/Objects';
import {ObjectUtil} from '../common/lang/ObjectUtil';
import {Linker} from '../common/reflect/Linker';
import {ClassUtil} from '../common/reflect/ClassUtil';
import {ListenerThread} from '../core/service/ListenerThread';
import {ThreadService} from '../core/service/ThreadService';
import {FView} from './view/FView';
import {SSettings} from './SSettings';

//==========================================================
// <T>应用程序。</T>
//==========================================================
export class FApplication extends ObjectBase {
   // 配置标志
   protected _setuped: boolean = false;
   // 线程
   protected _thread: ListenerThread = null;
   // 间隔
   protected _interval = 150;
   // 配置信息
   protected _settings: SSettings = null;
   // 激活视图
   protected _activeView: FView = null;
   // 视图集合
   protected _views: Objects<FView> = null;
   // 线程控制台
   @Linker(ThreadService)
   protected _threadConsole: ThreadService = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this._views = new Objects<FView>();
   }

   //==========================================================
   // <T>获得设置集合。</T>
   //==========================================================
   public get settings(): SSettings {
      return this._settings;
   }

   //==========================================================
   // <T>获得视图集合。</T>
   //==========================================================
   public get views(): Objects<FView> {
      return this._views;
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(settings: SSettings) {
      if (!settings.hDocument) {
         settings.hDocument = settings.hWindow.document;
      }
      // 设置属性
      this._settings = settings;
      // 创建线程
      var thread: ListenerThread = this._thread = ClassUtil.create(ListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.process);
   }

   //==========================================================
   // <T>注册一个视图。</T>
   //==========================================================
   public registerView(view: FView) {
      view.application = this;
      view.setup();
      this._views.push(view);
   }

   //==========================================================
   // <T>选择视图。</T>
   //==========================================================
   public selectView(view: FView) {
      view.active();
      this._activeView = view;
   }

   //==========================================================
   // <T>启动处理。</T>
   //
   // @param 设置内容
   //==========================================================
   public start(settings: SSettings = null) {
      if (!this._setuped) {
         this.setup(settings);
         this._setuped = true;
      }
      this._threadConsole.start(this._thread);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public process() {
      var views = this._views;
      var count = views.count();
      for (var n = 0; n < count; n++) {
         var view = views.at(n);
         view.process();
      }
   }

   //==========================================================
   // <T>停止处理。</T>
   //==========================================================
   public stop() {
      this._thread.stop();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._views = ObjectUtil.dispose(this._views);
      this._thread = ObjectUtil.dispose(this._thread);
      // 父处理
      super.dispose();
   }
}