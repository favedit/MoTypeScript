import {DataContentEnum} from '../../../runtime/common/lang/DataContentEnum';
import {Listeners} from '../../../runtime/common/lang/Listeners';
import {Fatal} from '../../../runtime/common/lang/Fatal';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {DataStream} from '../../../runtime/common/io/DataStream';
import {FResource as FBaseResource} from '../../runtime/core/resource/FResource';
import {FResourceLoader} from '../../runtime/core/resource/FResourceLoader';

//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class FResource extends FBaseResource {
   // 唯一编号
   public identity: string;
   // 类对象
   public className: string;
   // 鉴定码
   public guid: string;
   // 代码
   public code: string;
   // 标签
   public label: string;
   // 数据准备
   public dataReady: boolean;
   // @attribute
   public loadListeners: Listeners;

   //    // @attribute
   //    o._dataLoad      = false;
   //    o._dataSize      = 0;
   //    // @attribute
   //    o._blockSize     = 0;
   //    o._blockCount    = 0;
   //    // @attribute
   //    o._vendor        = MO.Class.register(o, new MO.AGetSet('_vendor'));

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.dataReady = false;
      this.loadListeners = new Listeners(this);
   }

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
   public unserialize(input: DataStream): void {
      this.typeCode = input.readString();
      this.version = input.readInt32();
      this.guid = input.readString();
      this.code = input.readString();
      this.label = input.readString();
   }

   //==========================================================
   // <T>从配置里加载描述内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadMeta(jconfig: any): void {
      this.className = jconfig.class_name;
      this.version = jconfig.version;
      this.guid = jconfig.guid;
      this.code = jconfig.code;
      this.label = jconfig.label;
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadConfig(jconfig: any): void {
      this.loadMeta(jconfig.meta);
   }

   //==========================================================
   // <T>加载内容。</T>
   //
   // @param content 内容
   //==========================================================
   public load(loader: FResourceLoader): void {
      var data: any = loader.data;
      switch (loader.contentCd) {
         case DataContentEnum.Json: {
            this.loadConfig(data);
            break;
         }
         case DataContentEnum.Binary: {
            // 创建读取流
            var stream: DataStream = RClass.create(DataStream);
            stream.endianCd = true;
            stream.link(data);
            // 反序列化数据
            this.unserialize(stream);
            this.dataReady = true;
            // 释放资源
            stream.dispose();
            break;
         }
         default:
            throw new Fatal(this, "Content type is invalid.");
      }
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
   //
   // @method
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}