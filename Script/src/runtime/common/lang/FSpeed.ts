import {FObject} from './FObject'
import {RLogger} from './RLogger'

//==========================================================
// <T>测速工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
export class FSpeed extends FObject {
   //..........................................................
   // @attribute
   public parameters = null;
   // @attribute
   public _start = 0;
   public _end = 0;
   public _span = 0;
   // @attribute
   public _spanMin = Number.MAX_VALUE;
   public _spanMax = 0;
   // @attribute
   public start = new Date().getTime();
   //public callerName = MO.Method.name(MO.TSpeed.caller);
   public callerName = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(...params: Array<any>) {
      super();
      this.parameters = arguments;
   }

   //==========================================================
   // <T>重置数据。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this._start = 0;
      this._end = 0;
      this._span = 0;
   }

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   //==========================================================
   public begin() {
      this._start = new Date().getTime();
   }

   //==========================================================
   // <T>结束处理。</T>
   //
   // @method
   //==========================================================
   public end() {
      this._end = new Date().getTime();
      this._span += this._end - this._start;
      if (this._span < this._spanMin) {
         this._spanMin = this._span;
      }
      if (this._span > this._spanMax) {
         this._spanMax = this._span;
      }
   }

   //==========================================================
   // <T>记录运行信息。</T>
   //
   // @method
   //==========================================================
   public record() {
      var sp = new Date().getTime() - this.start;
      RLogger.debug(this, 'Speed test. (caller={1}, speed={2}, arguments={3})', this.callerName, sp, this.parameters);
      this.parameters = null;
      this.start = null;
      this.callerName = null;
      this.record = null;
   }

   //==========================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      return this._span + ' (' + this._spanMin + ' - ' + this._spanMax + ')';
   }
}