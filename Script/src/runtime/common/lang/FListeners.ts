import {FObject} from './FObject'
import {FObjects} from './FObjects'
import {RObject} from './RObject'
import {FString} from './FString'
import {FListener} from './FListener'
import {FError} from './FError'
import {RClass} from '../reflect/RClass'

//==========================================================
// <T>监听器集合管理的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
export class FListeners extends FObject {
   // 监听集合
   protected _listeners: FObjects<FListener> = null;

   //==========================================================
   // <T>获得监听集合。</T>
   //
   // @return 监听集合
   //==========================================================
   public get listeners(): FObjects<FListener> {
      return this._listeners;
   }

   //==========================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //==========================================================
   public isEmpty() {
      var listeners: FObjects<FListener> = this._listeners;
      return listeners ? listeners.isEmpty() : true;
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
      var listeners = this._listeners;
      if (listeners) {
         var count: number = listeners.count();
         for (var i: number = 0; i < count; i++) {
            var listener: FListener = listeners.at(i);
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
   public register(owner: any, callback: Function): FListener {
      // 检查是否已经注册
      var listener: FListener = this.find(owner, callback);
      if (listener) {
         throw new FError(this, 'Listener is already register. (owner={1}, process={2})', owner, callback);
      }
      // 注册监听器
      listener = new FListener();
      listener.owner = owner;
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
      var listener = this.find(owner, callback);
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
      var listeners: FObjects<FListener> = this._listeners;
      if (!listeners) {
         listeners = this._listeners = new FObjects<FListener>();
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
      this._listeners.remove(listener);
   }

   //==========================================================
   // <T>向所有监视器发出调用处理。</T>
   //
   // @method
   // @param ps:sender:Object 发出对象
   // @param p1:parameter1:Object 参数1
   // @param p2:parameter2:Object 参数2
   // @param p3:parameter3:Object 参数3
   // @param p4:parameter4:Object 参数4
   // @param p5:parameter5:Object 参数5
   //==========================================================
   public process(ps, p1: any = null, p2: any = null, p3: any = null, p4: any = null, p5: any = null) {
      var listeners = this._listeners;
      if (listeners) {
         var count = listeners.count();
         for (var i = 0; i < count; i++) {
            var listener: FListener = listeners.at(i);
            listener.process(ps, p1, p2, p3, p4, p5);
         }
      }
   }

   //==========================================================
   // <T>清空处理。</T>
   //==========================================================
   public clear() {
      var listeners = this._listeners;
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
      var listeners = this._listeners;
      if (listeners) {
         var count: number = listeners.count();
         for (var i: number = 0; i < count; i++) {
            var listener: FListener = listeners.at(i);
            listener.dispose();
         }
         this._listeners = RObject.dispose(listeners);
      }
      RObject.free(this);
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
      var listeners = this._listeners;
      var count = listeners.count();
      for (var i = 0; i < count; i++) {
         result.append('\n   ' + listeners.at(i));
      }
      return result.flush();
   }
}
