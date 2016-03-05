import {SListenerContext} from './SListenerContext'
import {RMemory} from '../RMemory'

//==========================================================
// <T>监听器的工具类。</T>
//
// @reference
// @author maocy
// @version 160306
//==========================================================
export class RListener {

   //==========================================================
   // <T>检验传入值是否是整型值。</T>
   //
   // @method
   // @param v:value:String 待检验的字符串
   // @return Boolean 是否整数
   //==========================================================
   public static process(context: SListenerContext) {
      context.process();
      RMemory.free(event);
   }
}
