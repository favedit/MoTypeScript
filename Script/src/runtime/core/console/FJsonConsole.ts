import {RClass} from '../../common/reflect/RClass';
import {FJsonConnection} from '../../common/net/FJsonConnection';
import {FHttpConsole} from './FHttpConsole';

//==========================================================
// <T>JSON数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
export class FJsonConsole extends FHttpConsole {
   //==========================================================
   // <T>创建一个网络链接。</T>
   //
   // @method
   // @return 网络链接
   //==========================================================
   public create() {
      return RClass.create(FJsonConnection);
   }
}
