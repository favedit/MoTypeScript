import {RMethod} from '../reflect/RMethod'
import {RClass} from '../reflect/RClass'
import {FObject} from './FObject'
import {RObject} from './RObject'

//==========================================================
// <T>监听器的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
export class FListener extends FObject {
   //..........................................................
   // 拥有者
   protected _owner: any = null;
   // 函数
   protected _callback: Function = null;

   //==========================================================
   // <T>获得拥有者。</T>
   //
   // @return 拥有者
   //==========================================================
   public get owner() {
      return this._owner;
   }

   //==========================================================
   // <T>设置拥有者。</T>
   //
   // @param owner 拥有者
   //==========================================================
   public set owner(owner:any) {
      this._owner = owner;
   }

   //==========================================================
   // <T>获得回调函数。</T>
   //
   // @return 回调函数
   //==========================================================
   public get callback() {
      return this._callback;
   }

   //==========================================================
   // <T>设置回调函数。</T>
   //
   // @param callback 回调函数
   //==========================================================
   public set callback(callback:any) {
      this._callback = callback;
   }

   //==========================================================
   // <T>监听器的工具类。</T>
   // <P>响应处理时最多可以带5个参数。</P>
   //
   // @param sender:发出对象
   // @param parameter1:Object 参数1
   // @param parameter2:Object 参数2
   // @param parameter3:Object 参数3
   // @param parameter4:Object 参数4
   // @param parameter5:Object 参数5
   //==========================================================
   public process(sender, parameter1, parameter2, parameter3, parameter4, parameter5) {
      var owner = this._owner ? this._owner : this;
      this._callback.call(owner, sender, parameter1, parameter2, parameter3, parameter4, parameter5);
   }

   //==========================================================
   // <T>获得字符串信息。</T>
   //
   // @method
   // @return String 字符串信息
   //==========================================================
   public toString() {
      return RClass.shortName(this) + '(owner=' + RClass.shortName(this._owner) + ', callback=' + RMethod.shortName(this._callback) + ')';
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      this._owner = null;
      this._callback = null;
      RObject.free(this);
   }
}
