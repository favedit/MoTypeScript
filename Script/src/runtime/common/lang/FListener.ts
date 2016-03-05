import {RMethod} from '../reflect/RMethod'
import {RClass} from '../reflect/RClass'
import {RMemory} from '../RMemory'
import {SListenerContext} from './SListenerContext'
import {FObject} from './FObject'
import {RObject} from './RObject'
import {RListener} from './RListener'

//==========================================================
// <T>监听器。</T>
//
// @tool
// @author maocy
// @version 160306
//==========================================================
export class FListener extends FObject {
   //..........................................................
   // 拥有者
   public owner: any = null;
   // 函数
   public callback: Function = null;

   //==========================================================
   // <T>事件处理。</T>
   //
   // @param sender:发出对象
   // @param parameters 参数集合
   //==========================================================
   public process(sender, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
      // 获得调用者
      var owner = this.owner;
      if (!owner) {
         owner = sender;
      }
      var context: SListenerContext = RMemory.alloc(SListenerContext);
      context.sender = sender;
      context.owner = owner;
      context.callback = this.callback;
      context.parameter1 = p1;
      context.parameter2 = p2;
      context.parameter3 = p3;
      context.parameter4 = p4;
      context.parameter5 = p5;
      context.parameter6 = p6;
      context.parameter6 = p7;
      context.parameter7 = p8;
      context.parameter9 = p9;
      RListener.process(context);
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
      RObject.free(this);
   }
}
