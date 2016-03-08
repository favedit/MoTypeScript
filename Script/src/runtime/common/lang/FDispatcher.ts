import {FObject} from './FObject';
import {FDictionary} from './FDictionary';
import {FListener} from './FListener';
import {FListeners} from './FListeners';
import {RObject} from './RObject';

//==========================================================
// <T>调度器。</T>
//==========================================================
export class FDispatcher extends FObject {
   // 监听器集合字典
   public _listenerss: FDictionary<FListeners> = null;

   //==========================================================
   // <T>监听器接口。</T>
   //
   // @console
   // @author maocy
   // @version 150130
   //==========================================================
   public constructor() {
      super();
      this._listenerss = new FDictionary<FListeners>();
   }

   //==========================================================
   // <T>注册一个监听器。</T>
   //
   // @method
   // @param name:String 名称
   // @param owner:String 拥有者
   // @param method:Function 函数
   // @return TListener 监听器
   //==========================================================
   public addListener(name, owner, method): FListener {
      // 获得监听器集合对象
      var listenerss = this._listenerss;
      if (!listenerss) {
         listenerss = this._listenerss = new FDictionary<FListeners>();
      }
      // 获得监听器集合
      var listeners = listenerss.get(name);
      if (!listeners) {
         listeners = new FListeners(this);
         listenerss.set(name, listeners);
      }
      // 检查重复
      var listener = listeners.find(owner, method);
      if (!listener) {
         listener = listeners.register(owner, method);
      }
      return listener;
   }

   //==========================================================
   // <T>设置一个监听器。</T>
   //
   // @method
   // @param name:String 名称
   // @param owner:String 拥有者
   // @param method:Function 函数
   // @return TListener 监听器
   //==========================================================
   public setListener(name, owner, method): FListener {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss.get(name);
         if (listeners) {
            listeners.clear();
         }
      }
      return this.addListener(name, owner, method)
   }

   //==========================================================
   // <T>注销一个监听器。</T>
   //
   // @method
   // @param name:String 名称
   // @param owner:String 拥有者
   // @param method:Function 函数
   //==========================================================
   public removeListener(name, owner, method) {
      var listenerss = this._listenerss;
      var listeners = listenerss.get(name);
      return listeners.unregister(owner, method);
   }

   //==========================================================
   // <T>清空一类监听器。</T>
   //
   // @method
   // @param n:name:String 名称
   //==========================================================
   public clearListeners(name) {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss.get(name);
         if (listeners) {
            listeners.clear();
         }
      }
   }

   //==========================================================
   // <T>清空全部监听器。</T>
   //
   // @method
   //==========================================================
   public clearAllListeners() {
      var listenerss = this._listenerss;
      if (listenerss) {
         var count = listenerss.count();
         for (var i = 0; i < count; i++) {
            var listeners = listenerss.at(i);
            if (listeners) {
               listeners.clear();
            }
         }
      }
   }

   //==========================================================
   // <T>监听处理。</T>
   //
   // @method
   // @param name:String 名称
   // @param p1:parameter1:Object 参数1
   // @param p2:parameter2:Object 参数1
   // @param p3:parameter3:Object 参数1
   // @param p4:parameter4:Object 参数1
   // @param p5:parameter5:Object 参数1
   //==========================================================
   public processListener(name, p1?, p2?, p3?, p4?, p5?) {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss.get(name);
         if (listeners) {
            listeners.process(p1, p2, p3, p4, p5);
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var listenerss = this._listenerss;
      if (listenerss) {
         for (var n = listenerss.count() - 1; n >= 0; n--) {
            var listeners = listenerss.at(n);
            listeners.dispose();
         }
         this._listenerss = RObject.dispose(listenerss);
      }
      super.dispose();
   }
}