import {RString} from '../../runtime/common/lang/RString';
import {FVendor} from './FVendor';

//==========================================================
// <T>网络资源提供商。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
export class FVendorNet extends FVendor {

   //==========================================================
   // <T>生成来源内容。</T>
   //
   // @method
   // @return String 来源内容
   //==========================================================
   public makeSource() {
      // 生成地址
      var url = this._contentUrl;
      if (url.indexOf('?') == -1) {
         url += '?';
      } else {
         url += '&';
      }
      // 设置参数
      var parameters = this._parameters;
      var count: number = parameters.count();
      var first = false;
      for (var i: number = 0; i < count; i++) {
         var name = parameters.name(i);
         var value = parameters.value(i);
         if (!RString.isEmpty(value)) {
            if (first) {
               url += '&';
            } else {
               first = true;
            }
            url += name + '=' + value;
         }
      }
      return url;
   }
}