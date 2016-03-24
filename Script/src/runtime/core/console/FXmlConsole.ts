import {ClassUtil} from '../../common/reflect/ClassUtil';
import {XmlConnection} from '../../common/net/XmlConnection';
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
      return ClassUtil.create(XmlConnection);
   }
}
