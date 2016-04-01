import {ObjectIdUtil} from './ObjectIdUtil';
import {RuntimeUtil} from '../RuntimeUtil';

//==========================================================
// <T>所有可继承对象的基类。</T>
// <P>支持类的判断、获取内部运行信息的功能。</P>
//
// @class
// @author maocy
// @version 141230
//==========================================================
export class Base {
   // 哈希值
   protected __hashCode: number;
   // 释放标志
   protected __dispose: boolean;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //==========================================================
   public constructor() {
      this.__hashCode = 0;
      this.__dispose = false;
   }

   //==========================================================
   // <T>获取哈希值。</T>
   //
   // @return 哈希值
   //==========================================================
   public get hashCode(): number {
      var hashCode: number = this.__hashCode;
      if (hashCode == 0) {
         hashCode = this.__hashCode = ObjectIdUtil.nextHash();
      }
      return hashCode;
   }

   //==========================================================
   // <T>获取当前实例的信息。</T>
   //
   // @return 信息字符串
   //==========================================================
   public toString(): string {
      return RuntimeUtil.dump(this);
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @param flag 全部释放标志
   //==========================================================
   public dispose(flag: boolean = false): void {
      this.__dispose = true;
   }
}
