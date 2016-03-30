import {MethodUtil} from '../reflect/MethodUtil'
import {StringBuffer} from './StringBuffer'
import {ArrayUtil} from './ArrayUtil'

//==========================================================
// <T>错误处理类。</T>
//
// @tool
// @param po:sender:Object 发送者
// @param pm:message:String 信息
// @param pp:parameters:Object[] 参数集合
// @author maocy
// @version 150101
//==========================================================
export class Fatal {
   public constructor(owner: any, message: string, ...parameters: Array<any>) {
      // 建立描述参数信息
      var count = parameters.length;
      for (var n = 0; n < count; n++) {
         var parameter = parameters[n];
         var value = null;
         if (typeof parameter == 'function') {
            value = MethodUtil.shortName(parameter);
         } else {
            value = parameter;
         }
         message = message.replace('{' + (n + 1) + '}', value);
      }
      //..........................................................
      // @construct
      var info: StringBuffer = new StringBuffer();
      // 建立函数调用信息
      var f = Fatal.caller;
      var head = new StringBuffer();
      var stack = new Array();
      while (f) {
         if (ArrayUtil.contains(stack, f)) {
            break;
         }
         stack.push(f);
         f = f.caller;
      }
      var count = stack.length;
      for (var n = 0; n < count; n++) {
         f = stack[n];
         if (n > 0) {
            head.appendLine();
         }
         head.append('   ' + (count - n) + ': ' + MethodUtil.shortName(f));
      }
      info.appendLine(message);
      info.appendLine('------------------------------------------------------------');
      info.append(head);
      var result = info.flush();
      alert(result);
      //throw new Error(info);
   }
}
