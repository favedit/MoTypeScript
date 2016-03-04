import {EScope} from '../../common/lang/EScope';
import {RString} from '../../common/lang/RString';
import {FError} from '../../common/lang/FError';
import {RClass} from '../../common/reflect/RClass';
import {FConsole} from '../FConsole';
import {RConsole} from '../RConsole';
import {FEnvironmentConsole} from '../console/FEnvironmentConsole';
import {FResourceSingleStorage} from './FResourceSingleStorage';
import {FResourceBlockStorage} from './FResourceBlockStorage';
import {FResourcePackage} from './FResourcePackage';
import {FResourceDataConsole} from './FResourceDataConsole';

//==========================================================
// <T>资源控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
export class FResourceConsole extends FConsole {
   // @attribute
   protected _scopeCd = EScope.Global;
   // @attribute
   protected _factory = null;
   protected _types = null;
   protected _packages = null;
   protected _resources = null;
   // @attribute
   protected _loadResources = null;
   protected _loadingResources = null;
   protected _processStorages = null;
   // @attribute
   protected _thread = null;
   protected _interval = 150;
   protected _loadLimit = 8;

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param resource:FResource 资源
   // @param data:ArrayBuffer 数据
   //==========================================================
   public onComplete(resource, data) {
      var o = this;
      resource._data = null;
      o._loadingResources.remove(resource);
      resource.onComplete(data);
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 链接
   //==========================================================
   public onLoad(event) {
      var o = this;
      // 设置资源
      var data = event.content;
      var resource = event.connection._resource;
      // 加载数据
      var storage = RClass.create(FResourceSingleStorage);
      storage.setResource(resource);
      storage.load(data);
      // 加载资源存储块集合
      RConsole.find(FResourceDataConsole).load(storage);
      // 移除加载中
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 链接
   //==========================================================
   public onBlockLoad(event) {
      var o = this;
      var data = event.content;
      // 获得资源
      var resource = event.connection._resource;
      resource._compressLength = data.byteLength;
      //resource._compressStartTick = MO.Timer.current();
      // 加载数据
      var storage = RClass.create(FResourceBlockStorage);
      storage.setResource(resource);
      storage.load(data);
      // 加载资源存储块集合
      var dataConsole = RConsole.find(FResourceDataConsole);
      var blocks = storage.blocks();
      var count = blocks.count();
      for (var i = 0; i < count; i++) {
         var block = blocks.at(i);
         dataConsole.load(block);
      }
      // 移除加载中
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess() {
      var o = this;
      //var httpConsole = RConsole.find(common.net.FHttpConsole);
      var httpConsole = null;
      //..........................................................
      // 获取数据
      var loadResources = o._loadResources;
      var loadingResources = o._loadingResources;
      var pc = loadingResources.count();
      if (!loadResources.isEmpty()) {
         for (var i = o._loadLimit - pc; i > 0; i--) {
            var resource = loadResources.shift();
            var sourceUrl = resource.sourceUrl();
            // 加载处理
            var connection = httpConsole.send(sourceUrl);
            connection._resource = resource;
            if (resource._dataCompress) {
               if (resource._dataBlock) {
                  connection.addLoadListener(o, o.onBlockLoad);
               } else {
                  connection.addLoadListener(o, o.onLoad);
               }
            } else {
               connection.addLoadListener(o, o.onComplete);
            }
            resource._dataLoad = true;
            // 增加加载中集合
            loadingResources.push(resource);
            // 跳出循环
            if (loadResources.isEmpty()) {
               break;
            }
         }
      }
      //..........................................................
      // 处理存储集合
      var storages = o._processStorages;
      storages.record();
      while (storages.next()) {
         var storage = storages.current();
         if (storage.testReady()) {
            storages.removeCurrent();
            // 完成处理
            storage.complete();
            storage.dispose();
         }
      }
      // MO.Logger.info(o, 'onProcess', 'Process resource. (loading={1}, process={2}, pool={3})', o._loadingResources.count(), o._processingResources.count(), o._pipelinePool.dump());
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      //o.__base.FConsole.construct.call(o);
      // 设置变量
      //_factory = RClass.create(MO.FClassFactory);
      //_types = new common.lang.FDictionary();
      //_packages = new common.lang.FDictionary();
      //_resources = new common.lang.FDictionary();
      //_loadResources = new common.lang.FObjects();
      //_loadingResources = new common.lang.FObjects();
      //_processStorages = new common.lang.FLooper();
      // 创建线程
      //var thread = o._thread = MO.Class.create(MO.FThread);
      //thread.setInterval(o._interval);
      //thread.addProcessListener(o, o.onProcess);
      //MO.Console.find(MO.FThreadConsole).start(thread);
   }

   //==========================================================
   // <T>注册资源类型。</T>
   //
   // @method
   // @return FResourceType 资源类型
   //==========================================================
   public registerType(type) {
      var o = this;
      var code = type.code();
      return o._types.set(code, type);
   }

   //==========================================================
   // <T>获得类工厂。</T>
   //
   // @method
   // @return FClassFactory 类工厂
   //==========================================================
   public factory() {
      return this._factory;
   }

   //==========================================================
   // <T>加载资源对象。</T>
   //
   // @method
   // @param resource:FResource 资源对象
   //==========================================================
   public load(resource) {
      var o = this;
      var guid = resource.guid();
      if (RString.isEmpty(guid)) {
         guid = resource.code();
      }
      // 检查编号
      var resources = o._resources;
      if (resources.contains(guid)) {
         throw new FError(o, 'Resource is already loaded. (guid={1})', guid);
      }
      resources.set(guid, resource);
      // 放入队列
      o._loadResources.push(resource);
      // 设置标志
      resource._dataLoad = true;
   }

   //==========================================================
   // <T>加载资源包。</T>
   //
   // @method
   // @param resourcePackage:资源包 资源对象
   //==========================================================
   public loadPackage(resourcePackage) {
      var o = this;
   }

   //==========================================================
   // <T>根据URL地址加载资源包。</T>
   //
   // @method
   // @param uri:String 资源对象
   //==========================================================
   public loadPackageByUrl(uri) {
      var o = this;
      // 查找资源包
      var resourcePackages = o._packages;
      var resourcePackage = resourcePackages.get(uri);
      if (!resourcePackage) {
         // 解析地址
         var url = RConsole.find(FEnvironmentConsole).parse(uri);
         // 创建资源包
         resourcePackage = RClass.create(FResourcePackage);
         resourcePackage.loadUrl(url);
         resourcePackages.set(uri, resourcePackage);
      }
      return resourcePackage;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 设置变量
      //o._factory = MO.Lang.Object.dispose(o._factory);
      //o._types = MO.Lang.Object.dispose(o._types);
      //o._packages = MO.Lang.Object.dispose(o._packages);
      //o._resources = MO.Lang.Object.dispose(o._resources);
      //o._loadResources = MO.Lang.Object.dispose(o._loadResources);
      //o._loadingResources = MO.Lang.Object.dispose(o._loadingResources);
      //o._processStorages = MO.Lang.Object.dispose(o._processStorages);
      // 父处理
      //o.__base.FConsole.dispose.call(o);
   }
}
