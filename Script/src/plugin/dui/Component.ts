import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Fatal} from './runtime/common/lang/Fatal';
import {Objects} from './runtime/common/lang/Objects';
import {Attributes} from './runtime/common/lang/Attributes';
import {Dispatcher} from './runtime/common/lang/Dispatcher';
import {LoggerUtil} from './runtime/common/lang/LoggerUtil';
import {Property} from './runtime/common/reflect/Property';
import {PropertyAnnotation} from './runtime/common/reflect/PropertyAnnotation';
import {AnnotationEnum} from './runtime/common/reflect/AnnotationEnum';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {AssertUtil} from './runtime/common/AssertUtil';
import {EventInvokeEnum} from './runtime/ui/EventInvokeEnum';
import {EventStatusEnum} from './runtime/ui/EventStatusEnum';
import {RenderContext} from './RenderContext';

//==========================================================
// <T>所有组件的基类</T>
// <P>非可视对象，支持以下功能：
//    1. 由多个子组件构成，支持添加、查找、删除功能。
//    2. 属性的管理，支持注册、加载、保存功能。
//    3. 事件向所有子组件中纷发功能，支持初始化，释放功能。
//    4. 自身对象的复制。
// </P>
//
// @class
// @author maocy
// @version 141231
//==========================================================
export class Component extends Dispatcher {
   // 有效性
   @Property('valid', DataTypeEnum.Boolean, true)
   public valid: boolean;
   // 唯一编号
   @Property('guid', DataTypeEnum.String)
   public guid: string;
   // 名称
   @Property('name', DataTypeEnum.String)
   public name: string;
   // 标签
   @Property('label', DataTypeEnum.String)
   public label: string;
   // 属性集合
   public attributes: Attributes;
   // 定义属性集合
   public properties: Attributes;
   // 附加数据
   public tag: any;
   // 父组件
   public parent: Component;
   // 子组件
   public children: Objects<Component>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.properties = new Attributes();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(parameters?: any) {
   }

   //==========================================================
   // <T>获取节点属性。</T>
   //
   // @param name 属性名称
   // @return 属性内容
   //==========================================================
   public getAttribute(name: string) {
      var value = null;
      var attributes = this.attributes;
      if (attributes) {
         value = attributes.get(name);
      }
      return value;
   }

   //==========================================================
   // <T>设置节点属性。</T>
   //
   // @param name 属性名称
   // @param value 属性内容
   //==========================================================
   public setAttribute(name: string, value: string) {
      var attributes = this.attributes;
      if (!attributes) {
         attributes = this.attributes = new Attributes();
      }
      attributes.set(name, value);
   }

   //==========================================================
   // <T>根据名称获得属性。</T>
   //
   // @param name 属性名称
   // @return  属性内容
   //==========================================================
   public getProperty(name: string) {
      return this.properties.get(name);
   }

   //==========================================================
   // <T>设置属性集合。</T>
   //
   // @param name 属性名称
   // @param value 属性内容
   //==========================================================
   public setProperty(name: string, value: string) {
      this[name] = value;
      LoggerUtil.debug(this, 'Set property. (name={1}, value={2})', name, value);
   }

   //==========================================================
   // <T>设置属性集合。</T>
   //
   // @param attributes 属性集合
   //==========================================================
   public setProperties(attributes: any) {
      if (attributes) {
         var clazz = ClassUtil.get(this.constructor);
         var annotations = clazz.findAnnotations(AnnotationEnum.Property);
         for (var name in attributes) {
            var value = attributes[name];
            // 存储属性
            this.properties.set(name, value);
            // 设置属性
            if (annotations) {
               var annotation: PropertyAnnotation = <PropertyAnnotation>annotations.get(name);
               if (annotation) {
                  var propertyName = annotation.name;
                  // 不保存监听集合属性
                  if (annotation.dataCd == DataTypeEnum.Listeners) {
                     continue;
                  }
                  // 设置结构体
                  if (annotation.dataCd == DataTypeEnum.Struct) {
                     var struct = this[propertyName];
                     struct.parse(value);
                     continue;
                  }
                  // 设置属性
                  this.setProperty(propertyName, value);
               }
            }
         }
      }
   }

   //==========================================================
   // <T>得到符合指定类的父组件。</T>
   // <P>如果没有指定类，则获得最顶层组件。</P>
   //
   // @param clazz 类函数
   // @return 组件
   //==========================================================
   public topParent(): Component {
      var component: Component = this;
      while (component.parent) {
         component = component.parent;
      }
      return component;
   }

   //==========================================================
   // <T>得到符合指定类的父组件。</T>
   // <P>如果没有指定类，则获得最顶层组件。</P>
   //
   // @param clazz 类函数
   // @return 组件
   //==========================================================
   public findParent(clazz: Function): Component {
      var component: Component = this;
      while (component.parent) {
         var parent = component.parent;
         if (parent instanceof clazz) {
            return parent;
         }
         component = parent;
      }
      return component;
   }

   //==========================================================
   // <T>判断是否含有子组件。</T>
   //
   // @return 是否含有
   //==========================================================
   public hasChild() {
      var children = this.children;
      return children ? !children.isEmpty() : false;
   }

   //==========================================================
   // <T>根据名称查找子组件。</T>
   //
   // @param name 名称
   // @return 子组件
   //==========================================================
   public findChild(name: string): Component {
      var children = this.children;
      if (children) {
         var count = children.count();
         for (var i = 0; i < count; i++) {
            var child = children.get(i);
            if (child.name == name) {
               return child;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>查找第一个子组件。</T>
   //
   // @return 子组件
   //==========================================================
   public findChildFirst(): Component {
      var children = this.children;
      if (children) {
         if (!children.isEmpty()) {
            return children.first();
         }
      }
      return null;
   }

   //==========================================================
   // <T>查找最后一个子组件。</T>
   //
   // @return 子组件
   //==========================================================
   public findChildLast(): Component {
      var children = this.children;
      if (children) {
         if (!children.isEmpty()) {
            return children.last();
         }
      }
      return null;
   }

   //==========================================================
   // <T>根据名称搜索子组件。</T>
   //
   // @param name 名称
   // @return 子组件
   //==========================================================
   public searchChild(name: string): Component {
      var children = this.children;
      if (children) {
         var count = children.count();
         for (var i = 0; i < count; i++) {
            var control = children.get(i);
            if (control.name == name) {
               return control;
            }
            if (control instanceof Component) {
               var findControl = control.searchChild(name);
               if (findControl) {
                  return findControl;
               }
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>根据类型搜索所有子组件。</T>
   //
   // @param findComponents 找到集合
   // @param clazz 类型
   //==========================================================
   public searchChildren(findComponents: Objects<Component>, clazz: Function) {
      var children = this.children;
      if (children) {
         var count = children.count();
         for (var i = 0; i < count; i++) {
            var child = children.at(i);
            if (child instanceof clazz) {
               findComponents.pushUnique(child);
            }
            child.searchChildren(findComponents, clazz);
         }
      }
   }

   //==========================================================
   // <T>追加一个子组件。</T>
   // <P>如果子组件的名称为空，则给当前子组件创建一个数字的索引名。</P>
   // <P>保证子组件不会被其他未命名的子组件所覆盖。</P>
   // <P>只增加，不加入显示列表。</P>
   //
   // @param child 子组件
   //==========================================================
   public push(child: Component) {
      AssertUtil.debugTrue(child instanceof Component);
      child.parent = this;
      // 增加组件
      var children = this.children;
      if (!children) {
         children = this.children = new Objects<Component>();
      }
      // 检查重复
      if (children.contains(child)) {
         throw new Fatal(this, 'Child is already exists in this component. (name={1})', child.name);
      }
      // 设置子组件名称
      var name = child.name;
      if (name == null) {
         name = children.count().toString();
         child.name = name;
      }
      // 存储子组件
      children.push(child);
   }

   //==========================================================
   // <T>移除指定子组件。</T>
   //
   // @param child 子组件
   //==========================================================
   public remove(child: Component) {
      AssertUtil.debugTrue(child instanceof Component);
      // 检查存在
      var children = this.children;
      if (!children.contains(child)) {
         throw new Fatal(this, 'Child not in this component. (name={1})', child.name);
      }
      // 移除处理
      children.remove(child);
   }

   //==========================================================
   // <T>更新处理。</T>
   //==========================================================
   public update() {
   }

   //==========================================================
   // <T>清空所有子组件。</T>
   //==========================================================
   public clear() {
      var children = this.children;
      if (children) {
         children.clear();
      }
   }

   // //==========================================================
   // // <T>处理初始化事件。</T>
   // //
   // // @method
   // // @param e:event:SGuiDispatchEvent 事件处理
   // // @return EEventStatus 处理状态
   // //==========================================================
   // MO.MUiComponent_oeInitialize = function MUiComponent_oeInitialize(e) {
   //    return MO.EEventStatus.Continue;
   // }

   // //==========================================================
   // // <T>处理释放事件。</T>
   // //
   // // @method
   // // @param e:event:SGuiDispatchEvent 事件处理
   // // @return EEventStatus 处理状态
   // //==========================================================
   // MO.MUiComponent_oeRelease = function MUiComponent_oeRelease(e) {
   //    return MO.EEventStatus.Continue;
   // }

   //==========================================================
   // <T>遍历子组件进行事件处理。<T>
   // <P>
   //    <OL>
   //       <L>当前组件的事件前处理。
   //          如果返回值为停止状态，则跳过当前组件的所有子组件的处理，直接返回上一层，继续上一层中同一层的其他组件的处理。</L>
   //       <L>如果当前组件支持容器接口，则可以进行子组件的事件处理，否则直接返回上一层处理。
   //          注意：不支持容器接口的对象并不表示没有子组件</L>
   //       <L>子组件按照存储顺序进行事件处理。</L>
   //       <L>当前组件的事件后处理。</L>
   //    </OL>
   //    注意：任何事件调用返回取消状态的话，则跳过后面所有的组件处理，直接返回到最开始的调用函数。</L>
   // </P>
   //
   // @param event:SDispatchEvent 纷发事件
   // @return EEventStatus 处理状态
   //==========================================================
   public process(event) {
      var invokeName = event.invoke;
      // 获得对象是否有效
      var valid = this instanceof event.clazz;
      //..........................................................
      // 事件前处理
      if (valid) {
         event.invokeCd = EventInvokeEnum.Before;
         var callback = this[invokeName];
         if (callback) {
            var result = callback.call(this, event);
            if ((result == EventStatusEnum.Stop) || (result == EventStatusEnum.Cancel)) {
               return result;
            }
         }
      }
      //..........................................................
      // 处理所有子对象
      var children = this.children;
      if (children) {
         var count = children.count();
         if (count) {
            for (var i = 0; i < count; i++) {
               var child = children.at(i);
               var result = child.process(event);
               if (result == EventStatusEnum.Cancel) {
                  return result;
               }
            }
         }
      }
      //..........................................................
      // 事件后处理
      if (valid) {
         event.invokeCd = EventInvokeEnum.After;
         var callback = this[invokeName];
         if (callback) {
            var result = callback.call(this, event);
            if ((result == EventStatusEnum.Stop) || (result == EventStatusEnum.Cancel)) {
               return result;
            }
         }
      }
      return EventStatusEnum.Continue;
   }

   // //==========================================================
   // // <T>初始化当所有组件。</T>
   // //
   // // @method
   // //==========================================================
   // MO.MUiComponent_psInitialize = function MUiComponent_psInitialize() {
   //    var o = this;
   //    var event = new MO.SUiDispatchEvent(o, 'oeInitialize', MO.MUiComponent);
   //    o.process(event);
   //    event.dispose();
   // }

   // //==========================================================
   // // <T>释放所有组件。</T>
   // //
   // // @method
   // //==========================================================
   // MO.MUiComponent_psRelease = function MUiComponent_psRelease() {
   //    var o = this;
   //    var event = new MO.SUiDispatchEvent(o, 'oeRelease', MO.MUiComponent);
   //    o.process(event);
   //    event.dispose();
   // }

   // //==========================================================
   // // <T>获取当前实例的信息。</T>
   // //
   // // @method
   // // @return String 含有内部信息的字符串
   // //==========================================================
   // MO.MUiComponent_toString = function MUiComponent_toString() {
   //    var o = this;
   //    return MO.Class.dump(o) + ':label=' + o._label;
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.MUiComponent_dispose = function MUiComponent_dispose() {
   //    var o = this;
   //    // 清空属性
   //    o._attributes = MO.Lang.Object.dispose(o._attributes);
   //    o._components = MO.Lang.Object.dispose(o._components, true);
   //    o._tag = null;
   // }

   // //==========================================================
   // // <T>获取运行信息。</T>
   // //
   // // @method
   // // @param info:TString 字符串
   // //==========================================================
   // MO.MUiComponent_innerDumpInfo = function MUiComponent_innerDumpInfo(info) {
   //    var o = this;
   //    info.append(MO.Class.dump(o));
   //    info.append(',name=', o._name);
   //    info.append(',label=', o._label);
   // }

   // //==========================================================
   // // <T>获取运行信息。</T>
   // //
   // // @method
   // // @param info:TString 字符串
   // // @param level:Integer 递归层次
   // //==========================================================
   // MO.MUiComponent_innerDump = function MUiComponent_innerDump(info, level) {
   //    var o = this;
   //    o.innerdumpInfo(info);
   //    // 获取所有子组件的内部信息
   //    var components = o.components;
   //    if (components) {
   //       info.appendLine();
   //       var count = components.count();
   //       for (var n = 0; n < count; n++) {
   //          var component = components.at(n);
   //          if (component) {
   //             component.innerDump(info, level + 1);
   //          }
   //       }
   //    }
   //    return info;
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}