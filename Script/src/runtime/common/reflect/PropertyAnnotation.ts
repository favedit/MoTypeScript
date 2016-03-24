import {DataTypeEnum} from '../lang/DataTypeEnum';
import {StringUtil} from '../lang/StringUtil'
import {AnnotationEnum} from './AnnotationEnum'
import {Annotation} from './Annotation'

//============================================================
// <T>属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @author maocy
// @version 141231
//============================================================
export class PropertyAnnotation extends Annotation {
   // 数据名称
   protected _dataName: string = null;

   //============================================================
   // <T>构造处理。</T>
   //
   // @param name 名称
   //============================================================
   public constructor(name: string, dataName: String = null, dataCd: DataTypeEnum = DataTypeEnum.Unknown, dataClass: any = null, dataDefault: any = null) {
      super(name);
      this._annotationCd = AnnotationEnum.Property;
      // 设置数据名称
      var code = null;
      if (dataName == null) {
         if (StringUtil.startsWith(name, '_')) {
            code = name.substring(1);
         } else {
            code = name;
         }
         code = StringUtil.toUnderline(code);
      } else {
         code = dataName;
      }
      this._dataName = code;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @return String 代码
   //============================================================
   public get code(): string {
      return this._dataName;
   }

   //============================================================
   // <T>构建处理。</T>
   //============================================================
   public build() {
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @param value 对象
   // @param config 配置
   //============================================================
   public load(value, config) {
      value[this._name] = config.get(this._dataName);
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @param value 对象
   // @param config 配置
   //============================================================
   public save(value, config) {
      config.set(this._dataName, value[this._name]);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   public toString() {
      return '<' + this._annotationCd + ',data_name=' + this._dataName + '>';
   }
}