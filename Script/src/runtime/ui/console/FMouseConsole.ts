import {EScope} from '../../common/lang/EScope';
import {FConsole} from '../../core/FConsole';
import {RHtml} from '../utility/RHtml';

//==========================================================
// <T>鼠标对象控制台。</T>
//
// @console
// @author maocy
// @version 150203
//==========================================================
export class FMouseConsole extends FConsole {
   public _activeCapture = null;
   public _captures = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.scopeCd = EScope.Local;
      // 创建属性
      //o._captures = new TObjects();
      // 注册事件
      //RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      //RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      //RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   public onMouseDown(event) {
      // 检查来源
      //var linker = RHtml.searchLinker(event.hSource, MO.MMouseCapture);
      var linker = null;
      if (!linker) {
         return;
      }
      // 检查测试
      if (!linker.testMouseCapture()) {
         return;
      }
      // 捕捉开始处理
      this._activeCapture = linker;
      this.captureStart(event);
   }

   //==========================================================
   // <T>鼠标移动处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   public onMouseMove(p) {
      // 检查拖拽处理
      if (!this._activeCapture) {
         return;
      }
      // 拖拽处理
      this.capture(p);
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   public onMouseUp(p) {
      // 检查拖拽处理
      if (!this._activeCapture) {
         return;
      }
      // 捕捉结束处理
      this.captureStop(p);
   }

   //==========================================================
   // <T>捕捉开始处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   public captureStart(p) {
      var capture = this._activeCapture;
      if (capture) {
         // RWindow.setOptionSelect(false);
         capture.onMouseCaptureStart(p);
      }
   }

   //==========================================================
   // <T>捕捉处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   public capture(p) {
      var capture = this._activeCapture;
      if (capture) {
         if (capture.testMouseCapture()) {
            capture.onMouseCapture(p);
         } else {
            this.captureStop(p)
         }
      }
   }

   //==========================================================
   // <T>捕捉结束处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   public captureStop(p) {
      var capture = this._activeCapture;
      if (capture) {
         capture.onMouseCaptureStop(p);
         this._activeCapture = null;
      }
      // RWindow.setOptionSelect(true);
   }

   //==========================================================
   // <T>注册一个鼠标捕捉对象。</T>
   //
   // @method
   // @param p:capture:MMouseCapture 鼠标捕捉
   //==========================================================
   public register(p) {
      //this._captures.push(p);
   }

   //==========================================================
   // <T>注销一个鼠标捕捉对象。</T>
   //
   // @method
   // @param p:capture:MMouseCapture 鼠标捕捉
   //==========================================================
   public unregister(p) {
      //this._captures.remove(p);
   }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   public clear() {
      //this._captures.clear();
   }
}