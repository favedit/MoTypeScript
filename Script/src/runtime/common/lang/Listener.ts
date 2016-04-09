import {Base} from './Base'
import {ListenerContext} from './ListenerContext'
import {ObjectUtil} from './ObjectUtil'
import {ListenerUtil} from './ListenerUtil'
import {MemoryUtil} from '../MemoryUtil'
import {MethodUtil} from '../reflect/MethodUtil'
import {ClassUtil} from '../reflect/ClassUtil'

//==========================================================
// <T>监听器。</T>
//
// @tool
// @author maocy
// @version 160306
//==========================================================
export class Listener extends Base {
   //..........................................................
   // 拥有者
   public owner: any = null;
   // 参数集合
   public attributes: any = null;
   // 函数
   public callback: Function = null;

   //==========================================================
   // <T>事件处理。</T>
   //
   // @param sender:发出对象
   // @param parameters 参数集合
   //==========================================================
   public process(sender: any, parameters: Array<any>): void {
      // 获得调用者
      var owner = this.owner;
      if (!owner) {
         owner = sender;
      }
      // 创建监听环境
      var context: ListenerContext = MemoryUtil.alloc(ListenerContext);
      context.sender = sender;
      context.owner = owner;
      context.callback = this.callback;
      context.attributes = this.attributes;
      context.parameters = parameters;
      // 消息处理
      ListenerUtil.process(context);
   }

   //==========================================================
   // <T>获得字符串信息。</T>
   //
   // @method
   // @return String 字符串信息
   //==========================================================
   public toString() {
      return ClassUtil.shortName(this) + '(owner=' + ClassUtil.shortName(this.owner) + ', callback=' + MethodUtil.shortName(this.callback) + ')';
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      this.owner = null;
      this.callback = null;
      ObjectUtil.free(this);
   }
}
