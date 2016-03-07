import {FObject} from '../../runtime/common/lang/FObject'
import {FDataStream} from '../../runtime/common/io/FDataStream'

//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 160307
//==========================================================
export class FResourceObject extends FObject {
   // 类型名称
   public typeName: string = null;
   // 版本
   public version: number = 0;

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input 数据流
   //==========================================================
   public unserialize(input: FDataStream) {
      this.typeName = input.readString();
      this.version = input.readInt32();
   }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @method
   // // @param xconfig:TXmlNode 配置节点
   // //==========================================================
   // MO.FE3sResource_saveConfig = function FE3sResource_saveConfig(xconfig){
   //    var o = this;
   //    // 设置类型
   //    if(!MO.Lang.String.isEmpty(o._typeName)){
   //       xconfig.setName(o._typeName);
   //    }
   //    // 存储属性
   //    xconfig.set('guid', o._guid);
   //    xconfig.set('code', o._code);
   //    xconfig.set('label', o._label);
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}