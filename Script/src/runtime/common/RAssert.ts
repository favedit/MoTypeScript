import {RSingleton} from 'RSingleton';

//==========================================================
// <T>检查结果。</T>
// <P>所有以debug开头的函数，必须在每行的开头使用。<BR>
//    生成Debug版本时候起作用，Release版本将删除这一行。<BR>
//    debugBegin到debugEnd之间的行，在Release版本的时候也会被删除。</P>
//
// @reference
// @author maocy
// @version 150319
//==========================================================
export class RAssert extends RSingleton {
   //==========================================================
   // <T>调试开始。</T>
   //
   // @method
   //==========================================================
   static debugBegin(): void {
   }

   //==========================================================
   // <T>调试结束。</T>
   //
   // @method
   //==========================================================
   static debugEnd(): void {
   }

   //==========================================================
   // <T>判断内容是否为真。</T>
   // <P>Release版本，本行只保留内容，去掉函数外壳。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static isTrue(value): void {
      if (!value) {
         throw new Error('Assert ture failure.');
      }
   }

   //==========================================================
   // <T>判断内容是否为假。</T>
   // <P>Release版本，本行只保留内容，去掉函数外壳。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static isFalse(value): void {
      if (value) {
         throw new Error('Assert false failure.');
      }
   }

   //==========================================================
   // <T>执行内容。</T>
   // <P>Release版本，本行不保留。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static debug(value): void {
      return value;
   }

   //==========================================================
   // <T>判断内容是否为真。</T>
   // <P>Release版本，本行不保留。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static debugTrue(value): void {
      if (!value) {
         throw new Error('Assert true failure.');
      }
   }

   //==========================================================
   // <T>判断内容是否为假。</T>
   // <P>Release版本，本行不保留。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static debugFalse(value): void {
      if (value) {
         throw new Error('Assert false failure.');
      }
   }

   //==========================================================
   // <T>判断内容是否为空。</T>
   // <P>Release版本，本行不保留。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static debugNull(value): void {
      if (value != null) {
         throw new Error('Assert null failure.');
      }
   }

   //==========================================================
   // <T>判断内容是否为非空。</T>
   // <P>Release版本，本行不保留。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static debugNotNull(value): void {
      if (value == null) {
         throw new Error('Assert not null failure.');
      }
   }

   //==========================================================
   // <T>判断内容是否为空。</T>
   // <P>Release版本，本行不保留。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static debugEmpty(value: string): void {
      if ((value != null) && (value.length != 0)) {
         throw new Error('Assert empty failure.');
      }
   }

   //==========================================================
   // <T>判断内容是否为非空。</T>
   // <P>Release版本，本行不保留。</P>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   static debugNotEmpty(value: string): void {
      if (value == null) {
         throw new Error('Assert not empty failure, value is null.');
      }
      if (value.length == 0) {
         throw new Error('Assert not empty failure, value length is empty.');
      }
   }
}
