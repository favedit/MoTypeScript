import {ObjectBase} from '../../runtime/common/lang/ObjectBase';
import {Attributes} from '../../runtime/common/lang/Attributes';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {RRuntime} from '../../runtime/common/RRuntime';

//==========================================================
// <T>资源提供商。</T>
//
// @class
// @author maocy
// @history 150309
//==========================================================
export class FVendor extends ObjectBase {
   // 内容地址
   public _contentUrl: string = null;
   // 参数集合
   public _parameters: Attributes = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._parameters = new Attributes();
   }

   //==========================================================
   // <T>获得参数集合。</T>
   //
   // @return 参数集合
   //==========================================================
   public get parameters(): Attributes {
      return this._parameters;
   }

   //==========================================================
   // <T>获得参数。</T>
   //
   // @param name 名称
   // @return 内容
   //==========================================================
   public get(name: string): string {
      return this._parameters.get(name);
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @param name 名称
   // @param value 内容
   //==========================================================
   public set(name: string, value: string): void {
      this._parameters.set(name, value);
   }

   //==========================================================
   // <T>生成来源。</T>
   //
   // @return 来源
   //==========================================================
   public makeSource(): string {
      return null;
   }

   //==========================================================
   // <T>生成网络地址。</T>
   //
   // @return 网络地址
   //==========================================================
   public makeUrl(): string {
      var url = this.makeSource();
      if (RRuntime.isDebug()) {
         if (url.indexOf('?') == -1) {
            url += '?';
         } else {
            url += '&';
         }
         url += 'version=' + RRuntime.version;
      }
      return url;
   }

   //==========================================================
   // <T>重置处理。</T>
   //==========================================================
   public reset() {
      this._parameters.clear();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this._parameters = ObjectUtil.dispose(this._parameters);
      // 父处理
      super.dispose();
   }
}