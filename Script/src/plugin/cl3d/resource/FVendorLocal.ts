import {StringUtil} from '../../runtime/common/lang/StringUtil';
import {FVendor} from './FVendor';

//==========================================================
// <T>本地资源提供商。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
export class FVendorLocal extends FVendor {

   //==========================================================
   // <T>生成来源内容。</T>
   //
   // @method
   // @return String 来源内容
   //==========================================================
   public makeSource() {
      // 生成地址
      var url = this._contentUrl;
      // 设置参数
      var parameters = this._parameters;
      var count: number = parameters.count();
      for (var i: number = 0; i < count; i++) {
         var name = parameters.name(i);
         var value = parameters.value(i);
         url = StringUtil.replace(url, '{' + name + '}', value);
      }
      return url;
   }
}