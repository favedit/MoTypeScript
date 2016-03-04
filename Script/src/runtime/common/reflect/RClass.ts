//import {RRuntime} from '../RRuntime'
//import {RAssert} from '../RAssert'
//import {RString} from '../lang/RString'
//import {RLogger} from '../lang/RLogger'
//import {FClassBase} from './FClassBase'
import {FError} from '../lang/FError'
import {FAnnotation} from './FAnnotation'
import {FClass} from './FClass'
import {RMethod} from './RMethod'

//==========================================================
// <T>对象类的管理工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class RClass {
   // 类对象集合
   private static _classes: any = new Object();
   
   // 实例集合
   private static _instances: any = new Array();

   //==========================================================
   // <T>判断某个类型是否为基础数据类型。</T>
   //
   // @param typeName 类名称
   // @return 是否基础数据类型。
   //==========================================================
   public static isBaseTypeName(typeName: string): boolean {
      if (typeName != null) {
         if (typeName == 'boolean') {
            return true;
         } else if (typeName == 'number') {
            return true;
         } else if (typeName == 'date') {
            return true;
         } else if (typeName == 'string') {
            return true;
         }
      }
      return false;
   }

   //==========================================================
   // <T>判断某个类型是否为基础数据类型。</T>
   //
   // @method
   // @param clazz 类型
   // @return 是否基础数据类型
   //==========================================================
   public static isBaseType(clazz: Function): boolean {
      if (clazz != null) {
         if (clazz == Boolean) {
            return true;
         } else if (clazz == Number) {
            return true;
         } else if (clazz == Date) {
            return true;
         } else if (clazz == String) {
            return true;
         }
      }
      return false;
   }

   //==========================================================
   // <T>判断某个名称是否为基础类型。</T>
   //
   // @method
   // @param typeName 名称
   // @return 是否基础类型
   //==========================================================
   public static isBaseClassName(typeName: string): boolean {
      if (typeName != null) {
         if (typeName == 'boolean') {
            return true;
         } else if (typeName == 'number') {
            return true;
         } else if (typeName == 'date') {
            return true;
         } else if (typeName == 'string') {
            return true;
         } else if (typeName == 'function') {
            return true;
         }
      }
      return false;
   }
   //==========================================================
   // <T>判断某个对象是否为基础类型。</T>
   //
   // @method
   // @param value 对象
   // @return 是否基础类型
   //==========================================================
   public static isBaseClass(clazz: Function): boolean {
      if (clazz != null) {
         if (clazz == Boolean) {
            return true;
         } else if (clazz == Number) {
            return true;
         } else if (clazz == Date) {
            return true;
         } else if (clazz == String) {
            return true;
         } else if (clazz == Function) {
            return true;
         }
      }
      return false;
   }

   //==========================================================
   // <T>判断某个实例的类名是指定名称。</T>
   //
   // @method
   // @param instance 实例对象
   // @param name 类名称
   // @return 是否是指定名称
   //==========================================================
   public static isName(instance, name) {
      var shortName = this.shortName(instance);
      return (shortName == name);
   }
   //==========================================================
   // <T>判断某个实例的类对象是指定类对象。</T>
   //
   // @method
   // @param instance 实例对象
   // @param clazz 类函数
   // @return 是否类对象
   //=========================================================
   public static isClass(instance, clazz) {
      /*var o = this;
      RAssert.debugNotNull(clazz);
      if (value) {
         var name = o.shortName(clazz);
         if (value.__base) {
            return (value.__base[name] != null);
         } else {
            return (o.shortName(value) == name);
         }
      }
      return false;*/
   }
   
   //==========================================================
   // <T>获得对象实例的类短名称。</T>
   //
   // @method
   // @param instance 对象实例
   // @return 类短名称
   //==========================================================
   public static shortName(instance: any): string {
      if (instance) {
         // 如果对象是标准类的情况
         if (instance.__shortName) {
            return instance.__shortName;
         }
         if (instance.__class) {
            return instance.__class.shortName;
         }
         // 如果对象是函数的情况
         if (typeof (instance) == 'function') {
            return RMethod.shortName(instance);
         }
         // 如果对象是普通对象的情况
         var clazz = instance.constructor;
         if (clazz) {
            return RMethod.shortName(clazz);
         }
      }
      return null;
   }

   //==========================================================
   // <T>安全获得对象实例的类型名称，不产生任何例外。</T>
   //
   // @method
   // @param value:Object 对象实例
   // @param safe:safe:String 安全类型
   // @return String 类型名称字符串
   //==========================================================
   public static typeOf(instance, safe: any = null) {
      // 空对象的情况
      if (instance == null) {
         return 'Null';
      }
      try {
         // 普通数据类型
         var type = instance.constructor;
         if (type == Boolean) {
            return 'Boolean';
         }
         if (type == Number) {
            return 'Number';
         }
         if (type == String) {
            return 'String';
         }
         if (type == Function) {
            return RMethod.shortName(type);
         }
         if (type.constructor == Function) {
            return RMethod.shortName(type);
         }
         // 一般类实例对象
         if (instance.__class) {
            return instance.__class.shotName;
         }
         // 页面对象的情况
         if (instance.tagName) {
            return 'Html';
         }
         // 普通对象的情况
         for (var name in instance) {
            return 'Object';
         }
      } catch (exception) {
         // return e.name + ' ' + e.number + ' ' + e.description + ' ' + e.message;
      }
      // 未知类型的情况
      return 'Unknown';
   }

   //==========================================================
   // <T>获得对象实例的唯一编号。</T>
   //
   // @method
   // @param instance 对象实例
   // @return 索引
   //==========================================================
   public static codeOf(instance: any): number {
      var instances = this._instances;
      var count: number = instances.length;
      for (var i: number = 0; i < count; i++) {
         if (instances[i] == instance) {
            return i;
         }
      }
      instances[count] = instance;
      return count;
   }

   //==========================================================
   // <T>根据类名查找一个类对象。</T>
   // <P>如果类不存在，则返回空。</P>
   //
   // @param className 类名称
   // @return 类对象
   //==========================================================
   public static findByName(className: string): FClass {
      var clazz: FClass = this._classes[className];
      return clazz;
   }

   //==========================================================
   // <T>根据类名查找一个类对象。</T>
   // <P>如果类不存在，则返回空。</P>
   //
   // @param clazz 类函数
   // @return 类对象
   //==========================================================
   public static find(typeClass: Function): FClass {
      var className: string = this.shortName(typeClass);
      var clazz: FClass = this._classes[className];
      return clazz;
   }

   //==========================================================
   // <T>根据类名获得一个类对象。</T>
   // <P>如果类不存在，则新建一个实例。</P>
   //
   // @param clazz 类函数
   // @return 类对象
   //==========================================================
   public static get(typeClass: Function): FClass {
      var className: string = this.shortName(typeClass);
      var clazz: FClass = this._classes[className];
      if (clazz == null) {
         clazz = this._classes[className] = new FClass();
         clazz.build(typeClass);
      }
      return clazz;
   }

   //==========================================================
   // <T>根据类名获得一个类对象。</T>
   // <P>如果类不存在，则新建一个实例。</P>
   //
   // @param clazz 类函数
   // @return 类对象
   //==========================================================
   public static getInstance(typeClass: Function): any {
      var clazz: FClass = this.get(typeClass);
      return clazz.instance;
   }

   //==========================================================
   // <T>根据类名获得一个类对象。</T>
   // <P>如果类不存在，则新建一个实例。</P>
   //
   // @param clazz 类函数
   // @return 类对象
   //==========================================================
   public static setInstance(typeClass: Function, value: any): void {
      if (value != null) {
         var clazz: FClass = this.get(typeClass);
         var instance: any = clazz.instance;
         if (instance) {
            if (instance.set) {
               instance.set(value);
            }
         }
      }
   }

   //==========================================================
   // <T>注册一个实例类到类对象中。</T>
   //
   // @param typeClass 类型
   // @param instanceClass 实例类型
   //==========================================================
   public static registerClass(typeClass: Function, instanceClass: Function): void {
      var clazz: FClass = this.get(typeClass);
      clazz.build(instanceClass);
   }

   //==========================================================
   // <T>注册一个实例到类对象中。</T>
   //
   // @param typeClass 类型
   // @param instance 实例
   //==========================================================
   public static registerInstance(typeClass: Function, instance: any): void {
      var clazz: FClass = this.get(typeClass);
      clazz.instance = instance;
   }

   //==========================================================
   // <T>注册一个实例到类对象中。</T>
   //
   // @param typeClass 类型
   // @param instance 实例
   //==========================================================
   public static registerAnnotation(typeClass: Function, annotation: FAnnotation): void {
      var clazz: FClass = this.get(typeClass);
      clazz.register(annotation);
   }

   //==========================================================
   // <T>根据一个类名称创建类的实例。</T>
   //
   // @param className 类名称
   // @return 类对象的实例
   //==========================================================
   public static createByName(className: string): any {
      /*var o = this;
      // 获得类对象
      var clazz = o.forName(className);
      if (!clazz) {
         throw new FError(o, 'Cant find class. (name={1})', clazz);
      }
      // 创建类的实例
      return clazz.newInstance();*/
   }

   //==========================================================
   // <T>根据一个类函数创建类的实例。</T>
   //
   // @method
   // @param clazz  函数对象
   // @return 类对象的实例
   //==========================================================
   public static create(typeClass: Function): any {
      var clazz: FClass = this.get(typeClass);
      var instance: any = clazz.newInstance();
      return instance;
   }

   //==========================================================
   // <T>获得一个实例的调试信息。</T>
   // <P>调试信息的格式：类型名称<辅助信息>@唯一代码:内容。</P>
   //
   // @method
   // @param v:value:Object 数据内容
   // @return String 调试信息
   //==========================================================
   public static dump(instance: any): string {
      var result: string = null;
      // 对象为空的情况
      if (instance == null) {
         result = '@null';
      }
      // 对象为一般实例的情况
      var typeName = this.typeOf(instance);
      switch (typeName) {
         case 'Boolean':
            // 数字的情况
            return 'Boolean:' + instance;
         case 'Number':
            // 数字的情况
            return 'Number:' + instance;
         case 'String':
            // 字符串的情况
            return 'String<' + instance.length + '>:' + instance;
         case 'Function':
            // 字符串的情况
            return 'Function<' + RMethod.shortName(instance) + '>@' + this.codeOf(instance);
         case 'Html':
            // HTML对象的情况
            return 'Html<' + instance.tagName + '>@' + this.codeOf(instance);
      }
      // 获得编号
      var code = instance.hashCode;
      if (!code) {
         code = this.codeOf(instance);
      }
      return typeName + '@' + code;
   }


   /*
      //==========================================================
      // <T>判断某个实例的类对象是指定类对象。</T>
      //
      // @method
      // @param value:Object 实例对象
      // @param clazz:Function 类函数
      // @return Boolean
      //    <L value='true'>是</L>
      //    <L value='false'>否</L>
      //=========================================================
      public static isClass(value, clazz) {
         var o = this;
         RAssert.debugNotNull(clazz);
         if (value) {
            var name = o.shortName(clazz);
            if (value.__base) {
               return (value.__base[name] != null);
            } else {
               return (o.shortName(value) == name);
            }
         }
         return false;
      }

      //==========================================================
      // <T>获得对象实例的类型名称。</T>
      //
      // @method
      // @param v:value:Object 对象实例
      // @return String 类型名称
      //==========================================================
      public static typeOf(o) {
         if (o && o.constructor) {
            return RString.mid(o.constructor.toString(), 'function ', '(');
         }
         return 'Null';
      }

      //==========================================================
      // <T>检查某个实例的类对象是指定类对象。</T>
      // <P>如果不是类对象时，产生例外。</P>
      //
      // @method
      // @param v:value:Object 实例对象
      // @param c:constructor:Fcuntion 类函数
      //==========================================================
      public static checkClass(v, c) {
         if (!this.isClass(v, c)) {
            throw new Error('Invalid class ' + this.shortName(this) + '<>' + this.shortName(c));
         }
      }

      //==========================================================
      // <T>指定当前对象继承自其他类。</T>
      //
      // @method
      // @param self:Object 当前对象
      // @param parent:Object 父类传递对象
      // @param classes:Function... 继承类函数的列表
      // @return Object 含有类继承关系的对象实例
      //==========================================================
      public static inherits(s, p) {
         var base = RRuntime.nvl(p, s);
         base.__inherits = new Array();
         var count = arguments.length;
         for (var i = 2; i < count; i++) {
            base.__inherits.push(RMethod.shortName(arguments[i]));
         }
         return base;
      }

      //==========================================================
      // <T>根据一个类名称，获得一个类的实例。</T>
      // <P>如果类不存在，则尝试创建并初始化这个类对象。</P>
      //
      // @method
      // @param name:String 类名称
      // @return String 类对象的实例
      //==========================================================
      public static forName(name) {
         var o = this;
         var clazz = null;
         if (name) {
            clazz = o._classes[name];
            if (!clazz) {
               clazz = o.createClass(name);
               o.build(clazz);
            }
         }
         return clazz;
      }

      //==========================================================
      // <T>根据类名查找一个类对象。</T>
      // <P>如果类不存在，则返回空。</P>
      //
      // @method
      // @param v:value:Object 类名称或类函数
      // @return String 类对象的实例
      //==========================================================
      public static find(v) {
         var o = this;
         var n = null;
         if (v != null) {
            if (v.__class) {
               n = v.__class.name;
            } else if (v.constructor == Function) {
               n = RMethod.shortName(v);
            } else if (v.constructor != String) {
               RLogger.fatal(o, null, 'Find class failure. (value={1})', v);
            }
         }
         return o._classes[n];
      }

      //==========================================================
      // <T>注册一个属性到类对象中。</T>
      //
      // @method
      // @param instance:Object 实例对象
      // @param annotations:Annotation 标签对象
      // @param defaultValue:Object 结果对象
      // @return Object 结果对象
      //==========================================================
      public static register(instance, annotations, defaultValue) {
         var o = this;
         // 注册描述
         var name = RMethod.shortName(instance.constructor);
         var clazz = o._classes[name];
         var annotation = null;
         if (annotations.constructor == Array) {
            var count = annotations.length;
            for (var i = 0; i < count; i++) {
               annotation = annotations[i];
               clazz.register(annotation);
            }
         } else {
            annotation = annotations;
            clazz.register(annotation);
         }
         // 返回内容
         var value = annotation.value();
         return (defaultValue != null) ? defaultValue : value;
      }

      //==========================================================
      // <T>创建一个临时的基类对象。</T>
      //
      // @method
      // @param name:String 类名称
      // @return Object 基类对象
      //==========================================================
      public static createBase(name) {
         var base = null;
         if (name) {
            var source = 'function ' + name + '(){return this;} new ' + name + '();';
            base = eval(source);
         }
         return base;
      }

      //==========================================================
      // <T>创建一个类对象。</T>
      //
      // @method
      // @param className:String 类名称
      // @return TClass 类对象
      //==========================================================
      public static createClass(className) {
         var o = this;
         var clazz: any = o._classes[className] = new FClass();
         clazz._name = className;
         clazz._base = o.createBase(className);
         clazz._clazz = new clazz._base.constructor();
         eval('MO.' + className)(clazz._clazz);
         return clazz;
      }

      //==========================================================
      // <T>根据一个类函数创建类的实例。</T>
      //
      // @method
      // @param clazz:Function 函数对象
      // @return Object 类对象的实例
      //==========================================================
      public static create(clazz) {
         var o = this;
         // 获得类名称
         var className = null;
         var typeName = typeof (clazz);
         if (typeName == 'function') {
            className = RMethod.shortName(clazz);
         } else if (typeName == 'string') {
            className = clazz;
         } else {
            throw new FError(o, 'Param is invlid (clazz={1})', clazz);
         }
         // 创建类的实例
         return o.createByName(className);
      }

      //==========================================================
      // <T>根据一个类名称创建类的实例。</T>
      //
      // @method
      // @param className:String 类名称
      // @return Object 类对象的实例
      //==========================================================
      public static createByName(className) {
         var o = this;
         // 获得类对象
         var clazz = o.forName(className);
         if (!clazz) {
            throw new FError(o, 'Cant find class. (name={1})', clazz);
         }
         // 创建类的实例
         return clazz.newInstance();
      }

      //==========================================================
      // <T>递归复制一个类实例到一个指定实例中。</T>
      //
      // @method
      // @param source:Object 类实例
      // @param target:Object 指定实例
      //==========================================================
      public static innerCopy(source, target) {
         var o = this;
         if ((source != null) && (target != null)) {
            for (var name in source) {
               var value = source[name];
               if (value != null) {
                  var typeName = typeof (value)
                  if (typeName == 'function') {
                     var targetValue = target[name];
                     // Over order: method > empty > virtual > null
                     if (targetValue == null) {
                        target[name] = value;
                     } else if (RMethod.isVirtual(targetValue)) {
                        target[name] = value;
                     } else if (!RMethod.isVirtual(value) && RMethod.isEmpty(targetValue)) {
                        target[name] = value;
                     } else if (!RMethod.isVirtual(value) && !RMethod.isEmpty(value)) {
                        target[name] = value;
                     }
                     continue;
                  } else if (!RClass.isBaseName(typeName)) {
                     // Create child object
                     if (target[name] == null) {
                        target[name] = new value.constructor();
                     }
                     o.innerCopy(value, target[name]);
                     continue;
                  }
               }
               target[name] = value;
            }
         }
      }

      //==========================================================
      // <T>根据类名查找一个类对象。</T>
      //
      // @method
      // @param clazz:Object 对象
      //==========================================================
      public static build(clazz) {
         var o = this;
         // 找到当前类的父名称，即以字母(F)开头的类
         var inherits = clazz._clazz.__inherits;
         if (inherits && (inherits.constructor == Array)) {
            var finded = false;
            var inheritCount = inherits.length;
            for (var i = 0; i < inheritCount; i++) {
               var name = inherits[i];
               if (RString.startsWith(name, 'F')) {
                  if (finded) {
                     RLogger.fatal(o, null, 'Parent class is too many. (name={1})', name);
                  }
                  clazz._parent = RClass.forName(name);
                  finded = true;
               }
            }
         }
         //..........................................................
         // 用基类创建一个实例，当前实例只有当前类里声明的函数，没有任何继承关系
         var instance = clazz._instance = new clazz._base.constructor();
         // 复制除了以(F)开头的实类以外，所有基类信息到当前实例中
         if (inherits && (inherits.constructor == Array)) {
            var inheritCount = inherits.length;
            for (var i = 0; i < inheritCount; i++) {
               var name = inherits[i];
               if (!RString.startsWith(name, 'F')) {
                  var findClass = RClass.forName(name);
                  if (findClass == null) {
                     RLogger.fatal(o, null, 'Parent class is not exists. (name={1})', name);
                  }
                  RClass.innerCopy(findClass._instance, instance);
                  clazz.assign(findClass);
               }
            }
         }
         // 复制父类到当前实例中
         if (clazz._parent) {
            o.innerCopy(clazz._parent._instance, instance);
            clazz.assign(clazz._parent);
         }
         // 检查基类对象是否存在，如果不存在建立一个基类对象
         if (!instance.__base) {
            instance.__base = new FClassBase();
         }
         // 为基容器对象(base)中创建一个当前类的空实例
         instance.__base[clazz.name] = new clazz._base.constructor();
         var cf = clazz._clazz;
         for (let name in cf) {
            if (name != '__base') {
               if ((cf[name] == null) && (instance[name] == null)) {
                  instance[name] = null;
               } else if (cf[name] != null) {
                  if ((instance[name] == null) || ((instance[name] != null) && cf[name] != instance[name])) {
                     instance[name] = cf[name];
                  }
               }
            }
         }
         //..........................................................
         // 建立类的基容器对象(base)
         if (inherits && (inherits.constructor == Array)) {
            var inheritCount = inherits.length;
            for (var i = 0; i < inheritCount; i++) {
               var name = inherits[i];
               var baseClass = RClass.forName(name);
               var base = instance.__base[name] = new baseClass._base.constructor();
               var baseInstance = baseClass._instance;
               for (let name in baseInstance) {
                  if (name != '__base') {
                     var cfn = baseInstance[name];
                     var ofn = instance[name];
                     if ((cfn != null) && (ofn != null) && (cfn != ofn)) {
                        if ((cfn.constructor == Function) && (ofn.constructor == Function)) {
                           base[name] = baseInstance[name];
                        }
                     }
                  }
               }
            }
         }
         //..........................................................
         // 构建类对象
         clazz.build();
         //..........................................................
         // 删除类中所有空属性
         if (RRuntime.isRelease()) {
            var instance = clazz._instance;
            for (let name in instance) {
               var value = instance[name];
               if (value == null) {
                  delete clazz._instance[name];
               }
            }
         }
      }

      //==========================================================
      //<T>释放一个实例。</T>
      //
      //@method
      //@param instance:FObject 实例对象
      //==========================================================
      public static free(instance) {
         var clazz = instance.__class;
         RAssert.debugNotNull(clazz);
         clazz.free(instance);
      }
      */
}
