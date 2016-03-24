import {ObjectBase} from './ObjectBase'
import {Objects} from './Objects'
import {ObjectUtil} from './ObjectUtil'
import {FString} from './FString'
import {FListener} from './FListener'
import {FError} from './FError'
import {RClass} from '../reflect/RClass'
import {RRuntime} from './RRuntime'

//==========================================================
// <T>监听器集合管理的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
export class FListeners extends ObjectBase {
   // 发送者
   public sender = null;
   // 监听集合
   public listeners: Objects<FListener> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @param sender 发送者
   //==========================================================
   public constructor(sender: any = null) {
      super();
      this.sender = RRuntime.nvl(sender, this);
   }

   //==========================================================
   // <T>判断是否为空。</T>
   //
   // @return  是否为空
   //==========================================================
   public isEmpty() {
      var listeners: Objects<FListener> = this.listeners;
      if (listeners) {
         return listeners.isEmpty();
      }
      return true;
   }

   //==========================================================
   // <T>查找一个监听器。</T>
   //
   // @method
   // @param owner:Object 处理对象
   // @param callback:Function 处理函数
   // @return TListener 监听器
   //==========================================================
   public find(owner: any, callback: Function): FListener {
      var listeners: Objects<FListener> = this.listeners;
      if (listeners) {
         var count: number = listeners.count();
         for (var n: number = 0; n < count; n++) {
            var listener: FListener = listeners.at(n);
            if ((listener.owner === owner) && (listener.callback === callback)) {
               return listener;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>注册一个监听器。</T>
   //
   // @method
   // @param owner:Object 处理对象
   // @param callback:Function 处理函数
   // @return TListener 监听器
   //==========================================================
   public register(owner: any, callback: Function, ...attributes: Array<any>): FListener {
      // 检查是否已经注册
      var listener: FListener = this.find(owner, callback);
      if (listener) {
         throw new FError(this, 'Listener is already register. (owner={1}, process={2})', owner, callback);
      }
      // 注册监听器
      listener = new FListener();
      listener.owner = owner;
      listener.attributes = attributes;
      listener.callback = callback;
      this.push(listener);
      // 返回监听器
      return listener;
   }

   //==========================================================
   // <T>注销一个监听器。</T>
   //
   // @method
   // @param owner:Object 处理对象
   // @param callback:Function 处理函数
   //==========================================================
   public unregister(owner: any, callback: Function): void {
      // 检查是否已经注册
      var listener: FListener = this.find(owner, callback);
      if (!listener) {
         throw new FError(this, 'Listener is not register. (owner={1}, process={2})', owner, callback);
      }
      // 注销监听器
      this.remove(listener);
      // 返回监听器
      listener.dispose();
   }

   //==========================================================
   // <T>添加一个监听器对象到当前管理器内。</T>
   //
   // @method
   // @param listener:TListener 监听器对象
   //==========================================================
   public push(listener: FListener) {
      // 检查参数
      if (!listener) {
         throw new FError(this, 'Listener is null.');
      }
      if (!listener.callback) {
         throw new FError(this, 'Listener process is null.');
      }
      // 增加监听器
      var listeners: Objects<FListener> = this.listeners;
      if (!listeners) {
         listeners = this.listeners = new Objects<FListener>();
      }
      listeners.push(listener);
   }

   //==========================================================
   // <T>移除一个监听器对象到当前管理器内。</T>
   //
   // @method
   // @param listener:TListener 监听器对象
   //==========================================================
   public remove(listener) {
      // 检查参数
      if (!listener) {
         throw new FError(this, 'Listener is null.');
      }
      // 移除监听器
      this.listeners.remove(listener);
   }

   //==========================================================
   // <T>向所有监视器发出调用处理。</T>
   //
   // @method
   // @param sender:Object 发出对象
   // @param parameters 参数集合
   //==========================================================
   public process(...parameters: Array<any>) {
      var listeners: Objects<FListener> = this.listeners;
      if (listeners) {
         var count: number = listeners.count();
         for (var n: number = 0; n < count; n++) {
            var listener: FListener = listeners.at(n);
            listener.process(this.sender, parameters);
         }
      }
   }

   //==========================================================
   // <T>清空处理。</T>
   //==========================================================
   public clear() {
      var listeners: Objects<FListener> = this.listeners;
      if (listeners) {
         listeners.clear();
      }
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      var listeners: Objects<FListener> = this.listeners;
      if (listeners) {
         var count: number = listeners.count();
         for (var n: number = 0; n < count; n++) {
            var listener: FListener = listeners.at(n);
            listener.dispose();
         }
         this.listeners = ObjectUtil.dispose(listeners);
      }
      ObjectUtil.free(this);
   }

   //==========================================================
   // <T>获得运行信息。</T>
   //
   // @method
   // @return String 运行信息
   //==========================================================
   public dump() {
      var result = new FString();
      result.append(RClass.shortName(this));
      var listeners: Objects<FListener> = this.listeners;
      var count: number = listeners.count();
      for (var n: number = 0; n < count; n++) {
         result.append('\n   ' + listeners.at(n));
      }
      return result.flush();
   }
}
