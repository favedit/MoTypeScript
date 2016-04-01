import {Base} from '../lang/Base'
import {Objects} from '../lang/Objects'
import {Dictionary} from '../lang/Dictionary'
import {Fatal} from '../lang/Fatal'
import {LoggerUtil} from '../lang/LoggerUtil'
import {AnnotationEnum} from './AnnotationEnum'
import {Annotation} from './Annotation'
import {ClassUtil} from './ClassUtil'
//import {FString} from '../lang/StringBuffer'
//import {FObjects} from '../lang/Objects'
//import {RObject} from '../lang/ObjectUtil'
//import {FMemoryPool} from '../lang/FMemoryPool'
//import {RMethod} from './MethodUtil'

//==========================================================
// <T>对象类的描述信息。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
export class Class extends Base {
   // 父类对象
   public parentClass: Class;
   // 短名称
   public shortName: string;
   // 全名称
   public fullName: string;
   // 关联函数
   public type: any;
   // 唯一实例对象
   protected _instance: any;
   // 描述器集合
   protected _annotations: Dictionary<Dictionary<Annotation>>;
   // 属性集合
   protected _attributes: Dictionary<Annotation>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.__dispose = true;
      this._annotations = new Dictionary<Dictionary<Annotation>>();
      this._attributes = new Dictionary<Annotation>();
   }

   //==========================================================
   // <T>获得实例</T>
   //
   // @return 实例
   //==========================================================
   public get instance(): any {
      var instance = this._instance;
      if (!instance) {
         // 创建实例
         var clazz: any = this.type;
         if (clazz.instance) {
            instance = this._instance = clazz.instance();
         } else {
            instance = this._instance = new clazz();
         }
         instance.__class = this;
         // 初始化
         if (instance.initialize) {
            instance.initialize();
         }
      }
      return instance;
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
   public register(annotation: Annotation): void {
      // 设置属性
      annotation.clazz = this;
      // 检查类型和名称的合法性
      var annotationCd: any = annotation.annotationCd;
      var ordered = annotation.isOrdered();
      var name = annotation.name;
      var code = annotation.code;
      if (!annotationCd || !code) {
         throw new Fatal(this, "Unknown annotation. (class={1}, annotation={2}, name={3}, code={4})", ClassUtil.dump(this), annotation, name, code);
      }
      // 获得一个描述器的类型容器
      var annotations: Dictionary<Annotation> = this._annotations.get(annotationCd);
      if (!annotations) {
         annotations = new Dictionary<Annotation>();
         this._annotations.set(annotationCd, annotations);
      }
      // 检查重复
      if (!annotation.isDuplicate()) {
         var annotationFind: Annotation = annotations.get(code);
         if (annotationFind) {
            throw new Fatal(this, "Duplicate annotation. (class={1}, annotation={2}, name={3}, code={4}, value={5})", ClassUtil.dump(this), annotation, name, code, annotation.toString());
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
   // @param annotationCd 描述类型
   // @return 描述对象集合
   //==========================================================
   public findAnnotations(annotationCd: AnnotationEnum): Dictionary<Annotation> {
      var annotations: Dictionary<Annotation> = this._annotations.get(annotationCd as any);
      return annotations;
   }

   //==========================================================
   // <T>获得一个描述类型的描述对象集合。</T>
   //
   // @param annotationCd 描述类型
   // @return 描述对象集合
   //==========================================================
   public getAnnotations(annotationCd: AnnotationEnum): Dictionary<Annotation> {
      var annotations: Dictionary<Annotation> = this.findAnnotations(annotationCd);
      if (!annotations) {
         LoggerUtil.fatal(this, null, "Can't find annotations. (class={1}, annotation_cd={2})", this.shortName, annotationCd);
      }
      return annotations;
   }

   //==========================================================
   // <T>查找一个描述类型下的一个描述对象。</T>
   //
   // @param annotationCd 描述类型
   // @param code 代码
   // @return 描述对象
   //==========================================================
   public findAnnotation(annotationCd: AnnotationEnum, code: string): Annotation {
      var annotation: Annotation = null;
      var annotations: Dictionary<Annotation> = this._annotations.get(annotationCd as any);
      if (annotations) {
         annotation = annotations.get(code);
      }
      return annotation;
   }

   //==========================================================
   // <T>获得一个描述类型下的一个描述对象。</T>
   //
   // @param annotationCd 描述类型
   // @param code 代码
   // @return 描述对象
   //==========================================================
   public getAnnotation(annotationCd: AnnotationEnum, code: string): Annotation {
      var annotation: Annotation = this.findAnnotation(annotationCd, code);
      if (!annotation) {
         LoggerUtil.fatal(this, null, "Can't find annotation. (class={1}, annotation_cd={2}, code={3},)", this.shortName, annotationCd, code);
      }
      return annotation;
   }

   //==========================================================
   // <T>根据属性查找描述器。</T>
   //
   // @param name 名称
   // @return 描述对象
   //==========================================================
   public findAttribute(code: string): Annotation {
      var attribute = this._attributes.get(code);
      return attribute;
   }

   //==========================================================
   // <T>根据属性获得描述器。</T>
   //
   // @param name 名称
   // @return 描述对象
   //==========================================================
   public getAttribute(code: string): Annotation {
      var attribute = this.findAttribute(code);
      if (!attribute) {
         LoggerUtil.fatal(this, null, "Can't find attribute. (class={1}, code={2},)", this.shortName, code);
      }
      return attribute;
   }

   //==========================================================
   // <T>当前类接收其他类所有的描述信息。</T>
   //
   // @param clazz 类对象
   //==========================================================
   public buildParent(clazz: Class) {
      // 复制描述器
      var annotationsCount = clazz._annotations.count();
      for (var j = 0; j < annotationsCount; j++) {
         var annotationName = clazz._annotations.name(j);
         var clazzAnnotations = clazz._annotations.at(j);
         // 在自己当前对象内查找描述的类型容器
         var annotations = this._annotations.get(annotationName);
         if (!annotations) {
            annotations = new Dictionary<Annotation>();
            this._annotations.set(annotationName, annotations)
         }
         // 复制指定对象内的类型到自己对象内
         var annotationCount = clazzAnnotations.count();
         for (var i = 0; i < annotationCount; i++) {
            var annotationName = clazzAnnotations.name(i);
            var annotation = clazzAnnotations.at(i);
            // 检查重复
            if (!annotation.isDuplicate()) {
               if (annotations.contains(annotationName)) {
                  throw new Fatal(this, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})",
                     annotationName, this.shortName, name, clazz.shortName, name, annotation.toString());
               }
            }
            // 复制描述器
            if (annotation.isInherit) {
               annotations.set(annotationName, annotation);
            }
         }
      }
      //..........................................................
      // 复制属性集合
      this._attributes.append(clazz._attributes);
   }

   //==========================================================
   // <T>构建一个对象。</T>
   //
   // @param clazz 类对象
   //==========================================================
   public build(type: Function, parentClass: Class): void {
      // 设置属性
      this.parentClass = parentClass;
      this.shortName = ClassUtil.shortName(type);
      this.type = type;
      // 继承关系
      if (parentClass) {
         this.buildParent(parentClass);
      }
   }

   //==========================================================
   // <T>创建当前类对象的一个实例。</T>
   //
   // @return 对象实例
   //==========================================================
   public newInstance(): any {
      var instance = new this.type();
      instance.__class = this;
      return instance;
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
