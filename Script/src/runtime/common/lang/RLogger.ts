import {RMethod} from '../reflect/RMethod';
import {RClass} from '../reflect/RClass';
import {RRuntime} from '../RRuntime';
import {SLogger} from './SLogger';
import {FString} from './FString';
import {FListeners} from './FListeners';
import {ArrayUtil} from './ArrayUtil';
import {DateUtil} from './DateUtil';
import {RString} from './RString';

//==========================================================
// <T>日志工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class LoggerUtil {
   // 标签长度
   private static _labelLength: number = 40;
   // 日志长度
   private static _logger: SLogger = new SLogger();
   // 输出监听集合
   private static _lsnsOutput: FListeners = new FListeners();

   //==========================================================
   // <T>获得输出监听集合。</T>
   //
   // @return 输出监听集合
   //==========================================================
   public static get outputListeners(): FListeners {
      return this._lsnsOutput;
   }

   //==========================================================
   // <T>输出日志信息。</T>
   //
   // @method
   // @param sender:Object 发送者
   // @param message:String 消息
   //==========================================================
   public static output(sender: any, code: string, message: string, parameters: Array<any>): string {
      // 格式化参数
      var result = new FString();
      result.append(DateUtil.format('yymmdd-hh24miss.ms'));
      result.append(code);
      var formatMessage: string = message;
      var count: number = parameters.length;
      for (var n: number = 0; n < count; n++) {
         var parameter = parameters[n];
         var value = '';
         if (parameter != null) {
            if (typeof (parameter) == 'function') {
               value = RMethod.shortName(parameter);
            } else {
               value = parameter.toString();
            }
         }
         formatMessage = formatMessage.replace('{' + (n - 1) + '}', value);
      }
      result.append(formatMessage);
      var outputMessage = result.flush();
      // 日志输出
      var logger: SLogger = this._logger;
      logger.sender = sender;
      logger.message = outputMessage;
      this._lsnsOutput.process(logger);
      // 返回内容
      return outputMessage;
   }

   //==========================================================
   //<T>显示一个调试信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static debug(owner: any, message: string, ...parameters: Array<any>) {
      // 获得函数名称
      var name = null;
      if (owner) {
         name = RMethod.shortName(owner.constructor);
      }
      //var caller = RLogger.debug.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|D [' + RString.rpad(name, this._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   //<T>显示一个提示信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static info(owner: any, message: string, ...parameters: Array<any>) {
      // 获得函数名称
      var name = null;
      if (owner) {
         name = RMethod.shortName(owner.constructor);
      }
      //var caller = RLogger.info.caller;
      //if (caller) {
      //name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|I [' + RString.rpad(name, this._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   // <T>显示一个警告信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static warn(owner: any, message: string, ...parameters: Array<any>) {
      var o = this;
      // 获得函数名称
      var name = null;
      if (owner) {
         name = RMethod.shortName(owner.constructor);
      }
      //var caller = RLogger.warn.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|W [' + RString.rpad(name, o._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   // <T>显示一个错误信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static error(owner: any, message: string, ...parameters: Array<any>) {
      var o = this;
      // 获得函数名称
      var name = null;
      if (owner) {
         name = RMethod.shortName(owner.constructor);
      }
      //var caller = RLogger.error.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|E [' + RString.rpad(name, o._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   // <T>显示一个例外信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param error:Object 例外对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static fatal(owner: any, error: any, message: string, ...params: Array<any>) {
      var o = this;
      // 建立函数调用关系的堆栈
      var stack = new FString();
      var stacks = new Array();
      //var caller = RLogger.fatal.caller;
      //while (caller) {
      //   if (RArray.contains(stacks, caller)) {
      //      break;
      //   }
      //   stacks.push(caller);
      //   caller = caller.caller;
      //}
      var count = stacks.length;
      for (var i = 0; i < count; i++) {
         //caller = stacks[i];
         if (i > 0) {
            stack.appendLine();
         }
         //stack.append('   ' + (count - i) + ': ' + RMethod.shortName(caller));
      }
      // 建立消息信息
      var result = new FString();
      //result.appendLine(RContext.get('RMessage:fatal'));
      result.appendLine(RString.repeat('-', 60));
      result.append(RClass.dump(owner), ': ');
      if (message) {
         var count = arguments.length;
         for (var i = 3; i < count; i++) {
            var parameter = arguments[i];
            if ('function' == typeof (parameter)) {
               parameter = RMethod.shortName(parameter);
            }
            message = message.replace('{' + (i - 2) + '}', parameter);
         }
      }
      result.appendLine(message);
      result.appendLine(RString.repeat('-', 60));
      result.appendLine('Stack:');
      result.append(stack.flush());
      var text = result.flush();
      //o.output(owner, text);
      // 显示信息
      if (RRuntime.isPlatformPc() && !RRuntime.isRelease()) {
         throw new Error(text);
      }
   }

   //==========================================================
   //<T>显示一个弹出信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static show(owner: any, message: string, ...parameters: Array<any>) {
      var o = this;
      // 获得函数名称
      var name = null;
      //var caller = RLogger.show.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      //if ((owner as any).hashCode) {
      //   name += '@' + owner.hashCode();
      //}
      //..........................................................
      var code: string = '|S [' + RString.rpad(name, o._labelLength) + '] ';
      var result = this.output(owner, code, message, parameters);
      //..........................................................
      alert(result);
   }
}
