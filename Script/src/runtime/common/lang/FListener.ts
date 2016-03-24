import {RMethod} from '../reflect/RMethod'
import {RClass} from '../reflect/RClass'
import {RMemory} from '../RMemory'
import {SListenerContext} from './SListenerContext'
import {ObjectBase} from './ObjectBase'
import {ObjectUtil} from './ObjectUtil'
import {ListenerUtil} from './ListenerUtil'

//==========================================================
// <T>监听器。</T>
//
// @tool
// @author maocy
// @version 160306
//==========================================================
export class FListener extends ObjectBase {
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
      var context: SListenerContext = RMemory.alloc(SListenerContext);
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
      return RClass.shortName(this) + '(owner=' + RClass.shortName(this.owner) + ', callback=' + RMethod.shortName(this.callback) + ')';
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
