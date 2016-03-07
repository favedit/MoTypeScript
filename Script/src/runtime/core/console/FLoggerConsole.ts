import {ALinker} from '../../common/reflect/ALinker';
import {AProperty} from '../../common/reflect/AProperty';
import {ALogger} from '../../common/reflect/ALogger';
import {EScope} from '../../common/lang/EScope';
import {EDataType} from '../../common/lang/EDataType';
import {RObject} from '../../common/lang/RObject';
import {RLogger} from '../../common/lang/RLogger';
import {RClass} from '../../common/reflect/RClass';
import {FBufferedSocket} from '../../common/net/FBufferedSocket';
import {FEnvironmentConsole} from './FEnvironmentConsole';
import {FConsole} from '../FConsole';

//==========================================================
// <T>日志控制台。</T>
//
// @class
// @author maocy
// @version 150729
//==========================================================
//@ALinker('ASD')
export class FLoggerConsole extends FConsole {

   @ALinker(FEnvironmentConsole)
   protected _environmentConsole: FEnvironmentConsole;

   //@AProperty(EDataType.String)
   protected _code: string = null;

   protected _value: string = 'my';
   // 网络
   protected _socket = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public static instance() {
      var loggerConsole = new FLoggerConsole();
      //var loggerConsole:FLoggerConsole = RClass.getInstance(FLoggerConsole);
      RLogger.outputListeners.register(loggerConsole, loggerConsole.onOutput);
      return loggerConsole;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.scopeCd = EScope.Global;
      //RLogger.outputListeners.register(this, this.onOutput);
   }

   //==========================================================
   // <T>输出内容。</T>
   //
   // @method
   //==========================================================
   //@ALinker(FEnvironmentConsole)
   public onOutput(context, event) {
      var message = event.message;
      console.log(message);
      //this.output(message);
   }

   //==========================================================
   // <T>链接处理。</T>
   //
   // @method
   //==========================================================
   @ALogger()
   public connect(url) {
      var socket = this._socket = RClass.create(FBufferedSocket);
      socket.connect(url);
   }

   //==========================================================
   // <T>输出内容。</T>
   //
   // @method
   // @param message:String 消息内容
   //==========================================================
   public output(message) {
      var socket = this._socket;
      if (socket) {
         var url = window.location.toString();
         socket.push('[' + url + '] - ' + message);
         socket.process();
      }
   }

   //==========================================================
   // <T>断开处理。</T>
   //
   // @method
   //==========================================================
   public disconnect() {
      var socket = this._socket;
      if (socket) {
         socket.close();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._socket = RObject.dispose(this._socket);
      // 父处理
      super.dispose();
   }
}
