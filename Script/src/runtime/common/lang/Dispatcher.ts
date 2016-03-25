import {ObjectBase} from './ObjectBase';
import {Dictionary} from './Dictionary';
import {Listener} from './Listener';
import {Listeners} from './Listeners';
import {ObjectUtil} from './ObjectUtil';

//==========================================================
// <T>调度器。</T>
//==========================================================
export class Dispatcher extends ObjectBase {
   // 监听器集合字典
   public _listenerss: Dictionary<Listeners>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._listenerss = new Dictionary<Listeners>();
   }

   //==========================================================
   // <T>注册一个监听器。</T>
   //
   // @param code 代码
   // @param owner 拥有者
   // @param method 函数
   // @return 监听器
   //==========================================================
   public addListener(code, owner, method): Listener {
      // 获得监听器集合对象
      var listenerss = this._listenerss;
      if (!listenerss) {
         listenerss = this._listenerss = new Dictionary<Listeners>();
      }
      // 获得监听器集合
      var listeners = listenerss.get(code);
      if (!listeners) {
         listeners = new Listeners(this);
         listenerss.set(code, listeners);
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
   // @param code 代码
   // @param owner 拥有者
   // @param method 函数
   // @return 监听器
   //==========================================================
   public setListener(code, owner, method): Listener {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss.get(code);
         if (listeners) {
            listeners.clear();
         }
      }
      return this.addListener(code, owner, method)
   }

   //==========================================================
   // <T>注销一个监听器。</T>
   //
   // @param code 代码
   // @param owner 拥有者
   // @param method 函数
   //==========================================================
   public removeListener(code, owner, method) {
      var listenerss = this._listenerss;
      var listeners = listenerss.get(code);
      return listeners.unregister(owner, method);
   }

   //==========================================================
   // <T>清空一类监听器。</T>
   //
   // @param code 代码
   //==========================================================
   public clearListeners(code) {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss.get(code);
         if (listeners) {
            listeners.clear();
         }
      }
   }

   //==========================================================
   // <T>清空全部监听器。</T>
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
   // @param code 代码
   // @param p1:parameter1 参数1
   // @param p2:parameter2 参数2
   // @param p3:parameter3 参数3
   // @param p4:parameter4 参数4
   // @param p5:parameter5 参数5
   //==========================================================
   public processListener(code, p1?, p2?, p3?, p4?, p5?) {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss.get(code);
         if (listeners) {
            listeners.process(p1, p2, p3, p4, p5);
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this._listenerss = ObjectUtil.dispose(this._listenerss, true);
      super.dispose();
   }
}