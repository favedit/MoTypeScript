import {DataStream} from '../../runtime/common/io/DataStream';
import {AttributeFormatEnum} from '../graphic/AttributeFormatEnum';
import {ResourceObject} from './ResourceObject';

//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 150128
//==========================================================
export class StreamResource extends ResourceObject {
   public code: string = null;
   public elementDataCd: number = 0;
   public elementCount: number = 0;
   public elementNormalize: boolean = false;
   public dataStride: number = 0;
   public dataCount: number = 0;
   public dataLength: number = 0;
   public data: any = null;
   public formatCd: number = AttributeFormatEnum.Unknown;

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   public unserialize(input: DataStream): void {
      super.unserialize(input);
      // 读取属性
      this.code = input.readString();
      this.elementDataCd = input.readUint8();
      this.elementCount = input.readUint8();
      this.elementNormalize = input.readBoolean();
      var dataStride = this.dataStride = input.readUint8();
      var dataCount = this.dataCount = input.readInt32();
      var dataLength = this.dataLength = dataStride * dataCount;
      // 读取所有数据
      var data = this.data = new ArrayBuffer(dataLength);
      input.readBytes(data, 0, dataLength);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // this.data = null;
      // 父处理
      super.dispose();
   }
}