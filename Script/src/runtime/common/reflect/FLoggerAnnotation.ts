import {EDataType} from '../lang/EDataType';
import {RString} from '../lang/RString'
import {EAnnotation} from './EAnnotation'
import {FAnnotation} from './FAnnotation'

//============================================================
// <T>日志描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @author maocy
// @version 141231
//============================================================
export class FLoggerAnnotation extends FAnnotation {
   // 数据名称
   protected _count: number = 0;
   // 数据名称
   protected _successCount: number = 0;
   // 回调处理
   protected _callback: Function = null;

   //============================================================
   // <T>构造处理。</T>
   //
   // @param name 名称
   //============================================================
   public constructor(name: string, callback: Function) {
      super(name);
      this._annotationCd = EAnnotation.Logger;
      this._callback = callback;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @return String 代码
   //============================================================
   public invoke(instance: any, parameters: Array<any>): void {
      var result: any = null;
      this._count++;
      // 日志前处理
      console.log('Call ' + name + ' being.');
      // 调用处理
      result = this._callback.apply(instance, parameters);
      // 日志后处理
      console.log('Call ' + name + ' end.');
      this._successCount++;
      return result;
   }
}