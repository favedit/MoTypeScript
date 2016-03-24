import {DataStream} from '../../runtime/common/io/DataStream'
import {FResourceObject} from './FResourceObject'

//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 160307
//==========================================================
export class FResourceComponent extends FResourceObject {
   // 唯一编号
   public guid: string = null;
   // 代码
   public code: string = null;
   // 标签
   public label: string = null;

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input 数据流
   //==========================================================
   public unserialize(input: DataStream) {
      super.unserialize(input);
      this.guid = input.readString();
      this.code = input.readString();
      this.label = input.readString();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}