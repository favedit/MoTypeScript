import {EScope} from '../../common/lang/EScope';
import {FDictionary} from '../../common/lang/FDictionary';
import {RString} from '../../common/lang/RString';
import {RObject} from '../../common/lang/RObject';
import {RClass} from '../../common/reflect/RClass';
import {RAssert} from '../../common/RAssert';
import {RRuntime} from '../../common/RRuntime';
import {FEnvironment} from './FEnvironment';
import {FConsole} from '../FConsole';

//==========================================================
// <T>环境控制台。</T>
//
// @console
// @author maocy
// @version 150606
//==========================================================
export class FEnvironmentConsole extends FConsole {
   // 范围类型
   protected _scopeCd = EScope.Local;
   // 环境变量
   protected _environments: FDictionary<FEnvironment> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._environments = new FDictionary<FEnvironment>();
   }

   //==========================================================
   // <T>注册一个环境。</T>
   //
   // @method
   // @param environment:FEnvironment 环境
   //==========================================================
   public register(environment) {
      var name = environment.name();
      RAssert.debugNotEmpty(name);
      this._environments.set(name, environment);
   }

   //==========================================================
   // <T>注册一个环境内容。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   // @return FEnvironment 环境
   //==========================================================
   public registerValue(name, value) {
      RAssert.debugNotEmpty(name);
      var environment = RClass.create(FEnvironment);
      environment.set(name, value);
      this._environments.set(name, environment);
      return environment;
   }

   //==========================================================
   // <T>根据名称查找一个环境。</T>
   //
   // @method
   // @param name:String 名称
   // @return FEnvironment 环境
   //==========================================================
   public find(name) {
      return this._environments.get(name);
   }

   //==========================================================
   // <T>根据名称查找一个环境内容。</T>
   //
   // @method
   // @param name:String 名称
   // @return String 环境内容
   //==========================================================
   public findValue(name) {
      var value = null;
      var environment:FEnvironment = this._environments.get(name);
      if (environment) {
         value = environment.value;
      }
      return value;
   }

   //==========================================================
   // <T>解析内容。</T>
   //
   // @method
   // @param value:String 内容
   // @return String 解析内容
   //==========================================================
   public parse(value) {
      RAssert.debugNotEmpty(value);
      var result = value;
      var environments = this._environments;
      var count = environments.count();
      for (var i = 0; i < count; i++) {
         var environment = environments.at(i);
         result = RString.replace(result, '\\${' + environment.name + '}', environment.value);
      }
      return result;
   }

   //==========================================================
   // <T>解析网络内容。</T>
   //
   // @method
   // @param value:String 内容
   // @return String 解析内容
   //==========================================================
   public parseUrl(value) {
      var result = null;
      var version = RRuntime.version;
      var url = this.parse(value);
      if (url.indexOf('?') != -1) {
         result = url + '&' + version;
      } else {
         result = url + '?' + version;
      }
      return result;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放处理
      this._environments = RObject.dispose(this._environments);
      // 父处理
      super.dispose();
   }
}
