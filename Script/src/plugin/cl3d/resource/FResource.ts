import {RClass} from '../../../runtime/common/reflect/RClass';
import {FDataStream} from '../../../runtime/common/io/FDataStream';
import {FResource as FBaseResource} from '../../runtime/core/resource/FResource'

//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class FResource extends FBaseResource {
   // 类型名称
   public typeName = null;
   // 版本信息
   public version = null;
   // 唯一编号
   public guid = null;
   // 代码
   public code = null;
   // 标签
   public label = null;
   // 数据准备
   public dataReady = false;

   //    // @attribute
   //    o._dataLoad      = false;
   //    o._dataSize      = 0;
   //    // @attribute
   //    o._blockSize     = 0;
   //    o._blockCount    = 0;
   //    // @attribute
   //    o._vendor        = MO.Class.register(o, new MO.AGetSet('_vendor'));
   //    // @attribute
   //    o._loadListeners = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));

   // //==========================================================
   // // <T>从输入流里反序列化信息内容</T>
   // //
   // // @param input:FByteStream 数据流
   // // @return 处理结果
   // //==========================================================
   // MO.FE3sResource_onComplete = function FE3sResource_onComplete(input){
   //    var o = this;
   //    // 读取数据
   //    if(MO.Class.isClass(input, MO.MDataStream)){
   //       // 反序列化数据
   //       o.unserialize(input);
   //    }else{
   //       // 创建读取流
   //       var view = MO.Class.create(MO.FDataView);
   //       view.setEndianCd(true);
   //       if(input.constructor == Array){
   //          var inputData = new Uint8Array(input);
   //          view.link(inputData.buffer);
   //       }else if(input.constructor == Uint8Array){
   //          view.link(input.buffer);
   //       }else{
   //          view.link(input.outputData());
   //       }
   //       // 反序列化数据
   //       o.unserialize(view);
   //       // 释放资源
   //       view.dispose();
   //    }
   //    // 加载完成
   //    o._dataReady = true;
   //    // 加载事件处理
   //    o.processLoadListener();
   // }

   // //==========================================================
   // // <T>生成显示名称。</T>
   // //
   // // @return String 显示名称
   // //==========================================================
   // MO.FE3sResource_makeLabel = function FE3sResource_makeLabel(){
   //    var o = this;
   //    var result = '';
   //    if(!MO.Lang.String.isEmpty(o._code)){
   //       result += o._code;
   //    }
   //    if(!MO.Lang.String.isEmpty(o._label)){
   //       result += ' [' + o._label + ']';
   //    }
   //    return result;
   // }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.dataReady;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input:FByteStream 数据流
   //==========================================================
   public unserialize(input: FDataStream): void {
      this.typeName = input.readString();
      this.version = input.readInt32();
      this.guid = input.readString();
      this.code = input.readString();
      this.label = input.readString();
   }

   //==========================================================
   // <T>加载内容。</T>
   //
   // @param content 内容
   //==========================================================
   public loadContent(content: any): void {
      // 创建读取流
      var stream: FDataStream = RClass.create(FDataStream);
      stream.endianCd = true;
      stream.link(content);
      // 反序列化数据
      this.unserialize(stream);
      this.dataReady = true;
      // 释放资源
      stream.dispose();
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

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FE3sResource_dispose = function FE3sResource_dispose(){
   //    var o = this;
   //    o._vendor = null;
   //    // 父处理
   //    o.__base.MListener.dispose.call(o);
   //    o.__base.FConsole.dispose.call(o);
   // }
}