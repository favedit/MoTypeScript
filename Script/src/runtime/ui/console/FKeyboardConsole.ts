import {EScope} from '../../common/lang/EScope';
import {FListeners} from '../../common/lang/FListeners';
import {ALinker} from '../../common/reflect/ALinker';
import {FConsole} from '../../core/FConsole';
import {EKeyStatus} from '../EKeyStatus';
import {EKeyCode} from '../EKeyCode';
import {FDeviceConsole} from './FDeviceConsole';

//===========================================================
// <T>键盘管理器。</T>
//===========================================================
export class FKeyboardConsole extends FConsole {
   // 状态集合
   protected _status = new Array();
   // 设备控制台
   @ALinker(FDeviceConsole)
   protected _deviceConsole: FDeviceConsole = null;
   // 监听器集合
   public keyDownListeners = new FListeners();
   public keyUpListeners = new FListeners();
   public keyPressListeners = new FListeners();

   //===========================================================
   // <T>构造处理。</T>
   //
   // @enum
   // @author maocy
   // @version 150203
   //===========================================================
   public constructor() {
      super();
      // 设置状态
      var status = this._status = new Array();
      for (var i: number = 0; i < 256; i++) {
         status[i] = EKeyStatus.Normal;
      }
      // 增加监听
      this._deviceConsole.keyDownListeners.register(this, this.onKeyDown);
      this._deviceConsole.keyUpListeners.register(this, this.onKeyUp);
      this._deviceConsole.keyPressListeners.register(this, this.onKeyPress);
   }

   //===========================================================
   // <T>按键落下处理。</T>
   //
   // @param event 事件
   //===========================================================
   public onKeyDown(sender, event) {
      // 设置状态
      var keyCode = event.keyCode;
      this._status[keyCode] = EKeyStatus.Press;
      // 处理事件
      this.keyDownListeners.process(event);
   }

   //===========================================================
   // <T>按键抬起处理。</T>
   //
   // @param event 事件
   //===========================================================
   public onKeyUp(sender, event) {
      // 设置状态
      var keyCode = event.keyCode;
      this._status[keyCode] = EKeyStatus.Normal;
      // 处理事件
      this.keyUpListeners.process(event);
   }

   //===========================================================
   // <T>按键抬起处理。</T>
   //
   // @param event 事件
   //===========================================================
   public onKeyPress(sender, event) {
      // 处理事件
      this.keyPressListeners.process(event);
   }

   // //===========================================================
   // // <T>判断按键是否控制键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isControlKey(p) {
   //    var s = EKeyCode.ControlKeys;
   //    for (var i = s.length - 1; i >= 0; i--) {
   //       if (s[i] == p) {
   //          return true;
   //       }
   //    }
   //    return false;
   // }

   // //===========================================================
   // // <T>判断按键是否整数键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isIntegerKey(c) {
   //    return EKeyCode.integerCodes[c];
   // }

   // //===========================================================
   // // <T>判断按键是否浮点数键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isFloatKey(c) {
   //    return EKeyCode.floatCodes[c];
   // }

   // //===========================================================
   // // <T>判断按键是否数字键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isNumKey(c) {
   //    if (p >= 96 && p <= 105) {
   //       return true;
   //    }
   //    return false;
   // }

   //===========================================================
   // <T>判断按键是否按下。</T>
   //
   // @method
   // @param keyCode:Integer 按键代码
   // @return Boolean 是否按下
   //===========================================================
   public isPress(keyCode): boolean {
      var status = this._status[keyCode];
      return status == EKeyStatus.Press;
   }

   // //===========================================================
   // // <T>修正按键字符大小写。</T>
   // //
   // // @method
   // // @param e:event:SEvent 事件
   // // @param c:case:ECharCase 大小写类型
   // // @return String 修正后的字符
   // //===========================================================
   // public fixCase(e, c) {
   //    if (e && c) {
   //       var k = e.keyCode;
   //       if (ECase.Upper == c) {
   //          k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
   //       } else if (ECase.Lower == c) {
   //          k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
   //       }
   //       e.keyCode = k;
   //    }
   // }

   // //===========================================================
   // // <T>修正按键字符在样式内。</T>
   // //
   // // @method
   // // @param e:event:SEvent 事件
   // // @param c:case:ECharCase 大小写类型
   // // @return String 修正后的字符
   // //===========================================================
   // public fixPattern(e, p) {
   //    if (p) {
   //       var k = e.keyCode;
   //       if (!this.isControlKeyPress(k)) {
   //          if (!MO.Lang.String.isPattern(String.fromCharCode(k), p)) {
   //             e.keyCode = 0;
   //             return false;
   //          }
   //       }
   //    }
   //    return true;
   // }

   // //===========================================================
   // // <T>修正按键字符在样式内。</T>
   // //
   // // @method
   // // @param e:event:SEvent 事件
   // // @param c:case:ECharCase 大小写类型
   // // @return String 修正后的字符
   // //===========================================================
   // public fixChars(e, p) {
   //    if (p) {
   //       var k = e.keyCode;
   //       if (this.isNumKey(k)) {
   //          k = e.keyCode = e.keyCode - 48;
   //       }
   //       if (!this.isControlKeyPress(k)) {
   //          if (!MO.Lang.String.inChars(String.fromCharCode(k), p)) {
   //             e.keyCode = 0;
   //             e.returnValue = false;
   //             return false;
   //          }
   //       }
   //    }
   //    return true;
   // }
}
