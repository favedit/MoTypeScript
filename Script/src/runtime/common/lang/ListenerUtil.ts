import {ListenerContext} from './ListenerContext'
import {MemoryUtil} from '../MemoryUtil'

//==========================================================
// <T>监听器的工具类。</T>
//
// @reference
// @author maocy
// @version 160306
//==========================================================
export class ListenerUtil {

   //==========================================================
   // <T>检验传入值是否是整型值。</T>
   //
   // @method
   // @param v:value:String 待检验的字符串
   // @return Boolean 是否整数
   //==========================================================
   public static process(context: ListenerContext) {
      context.process();
      MemoryUtil.free(context);
   }
}
