import {FObject} from '../lang/FObject'
import {FObjects} from '../lang/FObjects'
import {FDictionary} from '../lang/FDictionary'
import {FError} from '../lang/FError'
import {RLogger} from '../lang/RLogger'
import {EAnnotation} from './EAnnotation'
import {FAnnotation} from './FAnnotation'
import {RClass} from './RClass'
//import {FString} from '../lang/FString'
//import {FObjects} from '../lang/FObjects'
//import {RObject} from '../lang/RObject'
//import {FMemoryPool} from '../lang/FMemoryPool'
//import {RMethod} from './RMethod'

export type FAnnotationDictionary = FDictionary<FAnnotation>;

//==========================================================
// <T>对象类的描述信息。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
export class FClass extends FObject {
   // 短名称
   protected _shortName = null;
   // 全名称
   protected _fullName = null;
   // 类对象
   protected _class = null;
   // 唯一实例对象
   protected _instance = null;
   // 描述器集合
   protected _annotations: FDictionary<FAnnotationDictionary> = null;
   // 属性集合
   protected _attributes: FDictionary<FAnnotation> = null;
   
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.__dispose = true;
      this._annotations = new FDictionary<FDictionary<FAnnotation>>();
      this._attributes = new FDictionary<FAnnotation>();
   }

   //==========================================================
   // <T>获得短名称</T>
   //
   // @return 短名称
   //==========================================================
   public get shortName(): string {
      return this._shortName;
   }

   //==========================================================
   // <T>设置短名称</T>
   //
   // @param shortName 短名称
   //==========================================================
   public set shortName(shortName: string) {
      this._shortName = shortName;
   }

   //==========================================================
   // <T>获得长名称</T>
   //
   // @return 长名称
   //==========================================================
   public get fullName(): string {
      return this._fullName;
   }

   //==========================================================
   // <T>设置长名称</T>
   //
   // @param fullName 长名称
   //==========================================================
   public set fullName(fullName: string) {
      this._fullName = fullName;
   }

   //==========================================================
   // <T>获得实例</T>
   //
   // @return 实例
   //==========================================================
   public get instance(): any {
      if (this._instance == null) {
         this._instance = new this._class();
      }
      return this._instance;
   }

   //==========================================================
   // <T>设置实例</T>
   //
   // @param instance 实例
   //==========================================================
   public set instance(instance: any) {
      this._instance = instance;
   }
   
   //==========================================================
   // <T>向当前类对象注册一个描述对象。</T>
   //
   // @param annotation 描述对象
   //==========================================================
   public register(annotation: FAnnotation): void {
      // 设置属性
      annotation.clazz = this;
      // 检查类型和名称的合法性
      var annotationCd:any = annotation.annotationCd;
      var ordered = annotation.isOrdered();
      var name = annotation.name;
      var code = annotation.code;
      if (!annotationCd || !code) {
         throw new FError(this, "Unknown annotation. (class={1}, annotation={2}, name={3}, code={4})", RClass.dump(this), annotation, name, code);
      }
      // 获得一个描述器的类型容器
      var annotations: FDictionary<FAnnotation> = this._annotations.get(annotationCd);
      if (!annotations) {
         annotations = new FDictionary<FAnnotation>();
         this._annotations.set(annotationCd, annotations);
      }
      // 检查重复
      if (!annotation.isDuplicate()) {
         var annotationFind: FAnnotation = annotations.get(code);
         if (annotationFind) {
            throw new FError(this, "Duplicate annotation. (class={1}, annotation={2}, name={3}, code={4}, value={5})", RClass.dump(this), annotation, name, code, annotation.toString());
         }
      }
      // 设置内容
      annotations.set(code, annotation);
      // 设置属性 
      this._attributes.set(name, annotation);
   }
   
   //==========================================================
   // <T>查找一个描述类型的描述对象集合。</T>
   //
   // @method
   // @param annotationCd 描述类型
   // @return 描述对象集合
   //==========================================================
   public findAnnotations(annotationCd: EAnnotation): FAnnotationDictionary {
      var annotations: FAnnotationDictionary = this._annotations.get(annotationCd as any);
      return annotations;
   }
   
   //==========================================================
   // <T>获得一个描述类型的描述对象集合。</T>
   //
   // @method
   // @param annotationCd 描述类型
   // @return 描述对象集合
   //==========================================================
   public getAnnotations(annotationCd: EAnnotation): FAnnotationDictionary {
      var annotations: FAnnotationDictionary = this.findAnnotations(annotationCd);
      if (!annotations) {
         RLogger.fatal(this, null, "Can't find annotations. (class={1}, annotation_cd={2})", this._shortName, annotationCd);
      }
      return annotations;
   }
   
   //==========================================================
   // <T>查找一个描述类型下的一个描述对象。</T>
   //
   // @method
   // @param annotationCd 描述类型
   // @param code 代码 
   // @return 描述对象
   //==========================================================
   public findAnnotation(annotationCd: EAnnotation, code: string): FAnnotation {
      var annotation: FAnnotation = null;
      var annotations: FAnnotationDictionary = this._annotations.get(annotationCd as any);
      if (annotations) {
         annotation = annotations.get(code);
      }
      return annotation;
   }
   
   //==========================================================
   // <T>获得一个描述类型下的一个描述对象。</T>
   //
   // @method
   // @param annotationCd 描述类型
   // @param code 代码 
   // @return 描述对象
   //==========================================================
   public getAnnotation(annotationCd: EAnnotation, code: string): FAnnotation {
      var annotation: FAnnotation = this.findAnnotation(annotationCd, code);
      if (!annotation) {
         RLogger.fatal(this, null, "Can't find annotation. (class={1}, annotation_cd={2}, code={3},)", this._shortName, annotationCd, code);
      }
      return annotation;
   }
   
   //==========================================================
   // <T>根据属性查找描述器。</T>
   //
   // @method
   // @param name 名称
   // @return 描述对象
   //==========================================================
   public findAttribute(code: string): FAnnotation {
      var attribute = this._attributes.get(code);
      return attribute;
   }
   
   //==========================================================
   // <T>根据属性获得描述器。</T>
   //
   // @method
   // @param name 名称
   // @return 描述对象
   //==========================================================
   public getAttribute(code: string): FAnnotation {
      var attribute = this.findAttribute(code);
      if (!attribute) {
         RLogger.fatal(this, null, "Can't find attribute. (class={1}, code={2},)", this._shortName, code);
      }
      return attribute;
   }

   //==========================================================
   // <T>构建一个对象。</T>
   //
   // @param clazz 类对象
   //==========================================================
   public build(clazz: Function): void {
      this._class = clazz;
   }

   //==========================================================
   // <T>创建当前类对象的一个实例。</T>
   //
   // @return 对象实例
   //==========================================================
   public newInstance(): any {
      return new this._class();
   }

   //==========================================================
   // <T>收集一个实例。</T>
   //
   // @return  实例
   //==========================================================
   public alloc(): any {
      //return this._pool.alloc();
   }

   //==========================================================
   // <T>释放一个实例。</T>
   //
   // @param instance 实例
   //==========================================================
   public free(instance: any): void {
      //this._pool.free(instance);
   }

   /*
      // @attribute
      protected _abstract = false;
      protected _styles = new Array();
      // @attribute
      protected _base = null;
      protected _clazz = null;
      protected _parent = null;
      protected _pool = new FMemoryPool();
   
      //==========================================================
      // <T>当前类接收其他类所有的描述信息。</T>
      //
      // @method
      // @param clazz:TClass 类对象
      //==========================================================
      public assign(clazz) {
         var o = this;
         //..........................................................
         // 复制描述器
         for (var annotationName in clazz._annotations) {
            var clazzAnnotations = clazz._annotations[annotationName];
            // 在自己当前对象内查找描述的类型容器
            var annotations = o._annotations[annotationName];
            if (!annotations) {
               annotations = o._annotations[annotationName] = new clazzAnnotations.constructor();
            }
            // 复制指定对象内的类型到自己对象内
            if (clazzAnnotations.constructor == FObjects) {
               annotations.append(clazzAnnotations);
            } else {
               for (var name in clazzAnnotations) {
                  var annotation = clazzAnnotations[name];
                  // 检查重复
                  if (!annotation.isDuplicate()) {
                     if (annotations[name]) {
                        throw new FError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", annotationName, o._name, name, clazz.name, name, annotation.toString());
                     }
                  }
                  // 复制描述器
                  if (annotation._inherit) {
                     annotations[name] = annotation;
                  }
               }
            }
         }
         //..........................................................
         // 复制属性集合
         for (var name in clazz._attributes) {
            var attribute = clazz._attributes[name];
            if (attribute.construct != Function) {
               o._attributes[name] = clazz._attributes[name];
            }
         }
      }
   
      //==========================================================
      // <T>获得一个类关联的样式描述。</T>
      //
      // @method
      // @param name:String 名称
      // @return String 样式名称
      //==========================================================
      public style(name) {
         var o = this;
         // 从缓冲中获得样式名称，如果存在，则直接返回
         var styles = o._styles;
         if (styles[name]) {
            return styles[name];
         }
         // 递规找到自己或父类上注册的名称
         var annotation = null;
         var find = o;
         while (find) {
            var annotations = find._annotations[EAnnotation.Style];
            if (annotations) {
               annotation = annotations[name];
               if (annotation) {
                  break;
               }
            }
            find = find._parent;
         }
         // 如果未注册，则告诉用户错误
         if (!annotation) {
            RLogger.fatal(o, null, "No register style annotation. (class={1}, name={2})", o._name, o._name + '_' + name);
         }
         // 生成样式名称
         var styleName = find._name + '_' + annotation.style();
         styles[name] = styleName;
         return styleName;
      }
   
      //==========================================================
      // <T>类对象构建处理。</T>
      //
      // @method
      //==========================================================
      public build() {
         var o = this;
         var instance = o._instance;
         //..........................................................
         // 检查类中是否存在虚函数
         for (var name in instance) {
            var value = instance[name];
            if (value != null) {
               if ((value.constructor == Function) && value.__virtual) {
                  o._abstract = true;
                  break;
               }
            }
         }
         //..........................................................
         // 初始化属性对象
         var properties = o._annotations[EAnnotation.Property];
         if (properties) {
            for (var name in properties) {
               var property = properties[name];
               property.build(instance);
            }
         }
         //..........................................................
         // 生成自动函数
         var sources = o._annotations[EAnnotation.Source];
         if (sources) {
            for (var name in sources) {
               var source = sources[name];
               source.build(o, instance);
            }
         }
      }
   
      //==========================================================
      // <T>创建当前类对象的一个实例。</T>
      //
      // @method
      // @param c:class:TClass 类对象
      // @return Object 对象实例
      //==========================================================
      public newInstance() {
         var o = this;
         // 检测要实例化的类是否为虚类
         var instance = null;
         // 判断是否为虚类
         if (o._abstract) {
            var message = new FString();
            for (var name in o._instance) {
               var value = o._instance[name];
               if (RMethod.isVirtual(value)) {
                  if (!message.isEmpty()) {
                     message.append(',');
                  }
                  message.append(value._name);
               }
            }
            throw new FError(o, "Abstract Class can't be create.(name={1})\n[{2}]", o._name, message);
         }
         // 同一个类的实例中全部共享base对象，中间不能存私有树据。
         var template = o._instance;
         if (!template) {
            return RLogger.fatal(o, null, "Class instance is empty. (name={1})", o._name);
         }
         instance = new template.constructor();
         for (var name in template) {
            var value = template[name];
            if (value != null) {
               // 特殊属性处理
               if ((name == '__base') || (name == '__inherits')) {
                  instance[name] = template[name];
                  continue;
               }
               // 递归创建所有子对象
               if (!RClass.isBase(value)) {
                  value = RObject.clone(value);
               }
            }
            instance[name] = value;
         }
         // 初始化对象
         instance.__class = o;
         if (instance.construct) {
            instance.construct();
         }
         return instance;
      }
      */
}
