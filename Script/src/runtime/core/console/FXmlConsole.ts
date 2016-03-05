import {RClass} from '../../common/reflect/RClass';
import {FXmlConnection} from '../../common/net/FXmlConnection';
import {FHttpConsole} from './FHttpConsole';

//==========================================================
// <T>XML数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
export class FXmlConsole extends FHttpConsole{

   //==========================================================
   // <T>创建一个网络链接。</T>
   //
   // @method
   // @return 网络链接
   //==========================================================
   public create(){
      return RClass.create(FXmlConnection);
   }
}
