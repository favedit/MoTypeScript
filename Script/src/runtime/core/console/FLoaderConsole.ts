// import {AProperty} from '../../common/reflect/AProperty';
// import {ALogger} from '../../common/reflect/ALogger';
import {EScope} from '../../common/lang/EScope';
import {EDataContent} from '../../common/lang/EDataContent';
import {FObjects} from '../../common/lang/FObjects';
import {RObject} from '../../common/lang/RObject';
import {SListenerContext} from '../../common/lang/SListenerContext';
import {SEvent} from '../../common/lang/SEvent';
// import {RLogger} from '../../common/lang/RLogger';
import {ALinker} from '../../common/reflect/ALinker';
import {RClass} from '../../common/reflect/RClass';
import {FHttpConnection} from '../../common/net/FHttpConnection';
import {FJsonConnection} from '../../common/net/FJsonConnection';
// import {FBufferedSocket} from '../../common/net/FBufferedSocket';
// import {FEnvironmentConsole} from './FEnvironmentConsole';
import {FListenerThread} from '../console/FListenerThread';
import {FThreadConsole} from '../console/FThreadConsole';
import {FHttpConsole} from '../console/FHttpConsole';
import {FJsonConsole} from '../console/FJsonConsole';
import {FConsole} from '../FConsole';
import {FLoader} from './FLoader';

//==========================================================
// <T>日志控制台。</T>
//
// @class
// @author maocy
// @version 150729
//==========================================================
//@ALinker('ASD')
export class FLoaderConsole extends FConsole {

   // @ALinker(FEnvironmentConsole)
   // protected _environmentConsole: FEnvironmentConsole;

   //@AProperty(EDataType.String)
   // protected _code: string = null;

   // protected _value: string = 'my';
   // // 网络
   // protected _socket = null;

   // 加载集合
   protected _loaders: FObjects<FLoader> = null;
   // 加载中集合
   protected _processLoaders: FObjects<FLoader> = null;
   // 加载上限
   protected _processLimit = 8;
   // 线程
   protected _thread: FListenerThread = null;
   // 间隔
   protected _interval = 150;
   // 线程控制台
   @ALinker(FThreadConsole)
   protected _threadConsole: FThreadConsole = null;
   // 请求控制台
   @ALinker(FHttpConsole)
   protected _httpConsole: FHttpConsole = null;
   // JSON控制台
   @ALinker(FJsonConsole)
   protected _jsonConsole: FJsonConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.scopeCd = EScope.Global;
      this._loaders = new FObjects<FLoader>();
      this._processLoaders = new FObjects<FLoader>();
      // 创建线程
      var thread: FListenerThread = this._thread = RClass.create(FListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess() {
      var loaders: FObjects<FLoader> = this._loaders;
      var processLoaders: FObjects<FLoader> = this._processLoaders;
      var httpConsole: FHttpConsole = this._httpConsole;
      var jsonConsole: FJsonConsole = this._jsonConsole;
      //..........................................................
      // 获取数据
      var processCount: number = processLoaders.count();
      if (!loaders.isEmpty()) {
         for (var n: number = this._processLimit - processCount; n > 0; n--) {
            var loader: FLoader = loaders.shift();
            var url: string = loader.url;
            // 加载处理
            var connection: FHttpConnection = null;
            if (loader.contentCd == EDataContent.Json) {
               connection = jsonConsole.sendAsync(url);
            } else {
               connection = httpConsole.sendAsync(url);
            }
            connection.loadListeners.register(this, this.onLoad, loader);
            // 增加加载中集合
            processLoaders.push(loader);
            // 跳出循环
            if (loaders.isEmpty()) {
               break;
            }
         }
      }
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 链接
   //==========================================================
   public onLoad(sender: SListenerContext, event: any): void {
      // 设置资源
      var loader: FLoader = sender.attributes[0];
      loader.data = event.content;
      loader.process();
      // var resource = event.connection._resource;
      // // 加载数据
      // var storage = RClass.create(FResourceSingleStorage);
      // storage.setResource(resource);
      // storage.load(data);
      // // 加载资源存储块集合
      // RConsole.find(FResourceDataConsole).load(storage);
      // // 移除加载中
      // this._loadingResources.remove(resource);
      // this._processStorages.push(storage);
   }

   //==========================================================
   // <T>链接处理。</T>
   //
   // @method
   //==========================================================
   public push(loader: FLoader) {
      this._loaders.push(loader);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._loaders = RObject.dispose(this._loaders);
      // 父处理
      super.dispose();
   }
}
