import {ObjectBase} from '../../runtime/common/lang/ObjectBase'
import {FDataStream} from '../../runtime/common/io/FDataStream'

//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 160307
//==========================================================
export class FResourceObject extends ObjectBase {
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

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadConfig(config) {
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   public saveConfig(config) {
      // // 设置类型
      // if(!MO.Lang.String.isEmpty(this._typeName)){
      //    xconfig.setName(this._typeName);
      // }
      // // 存储属性
      // xconfig.set('guid', this._guid);
      // xconfig.set('code', this._code);
      // xconfig.set('label', this._label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}