import {Fatal} from './runtime/common/lang/Fatal';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {RenderContext} from './RenderContext';
import {Component} from './Component';
import {Control} from './Control';
import {Element} from './Element';
import {Container} from './Container';
import {Fragment} from './Fragment';

export class React {

   //==========================================================
   // <T>创建一个组件。</T>
   //
   // @param type 对象类型
   // @param parameters 参数集合
   // @param children 子节点集合
   // @return 是否含有
   //==========================================================
   public static createElement(type: string | Function, parameters: any, ...children: Array<any>) {
      if (typeof type == 'string') {
         // 字符串类型
         var element: Element = ClassUtil.create(Element);
         element.typeName = type as string;
         element.setProperties(parameters);
         element.setup();
         return element;
      } else if (typeof type == 'function') {
         // 创建元素
         var component: Component = ClassUtil.create(type as Function);
         // 判断是否有模板节点
         if (children) {
            var count = children.length;
            for (var i = 0; i < count; i++) {
               var child: Component = children[i] as Component;
               if (child instanceof Fragment) {
                  var fragment = child as Fragment;
                  component.setProperties(fragment.properties);
               }
            }
         }
         // 设置属性
         component.setProperties(parameters);
         component.setup();
         // 增加子节点
         if (children) {
            var count = children.length;
            for (var i = 0; i < count; i++) {
               var child: Component = children[i] as Component;
               if (child instanceof Fragment) {
                  component.pushChildren(child.children);
               } else {
                  component.push(child);
               }
            }
         }
         return component;
      } else {
         // 未知类型
         throw new Fatal(this, 'Unknown type.');
      }
   }

   //==========================================================
   // <T>渲染组件。</T>
   //
   // @param context 渲染环境
   // @param component 组件
   //==========================================================
   public static render(context: RenderContext, topComponent: Component, parentComponent: Component, component: Component) {
      var renderChild = null;
      // 设置关联信息
      var linker = component.linker
      if (parentComponent && linker) {
         parentComponent[linker] = component;
      }
      // 构建当前控件
      var control: Control = null;
      if (component instanceof Control) {
         control = <Control>component;
         control.renderContext = context;
         // 获得渲染子节点
         renderChild = control.render();
         if (renderChild instanceof Fragment) {
            var fragment: Fragment = renderChild as Fragment;
            control.setProperties(fragment.properties);
         }
         // 构建处理
         context.topComponent = topComponent;
         context.parentComponent = parentComponent;
         control.build(context);
      }
      // 获得容器
      var container: Container = null;
      if (component instanceof Container) {
         container = <Container>component;
      }
      // 渲染子节点集合
      var children = component.children;
      if (children) {
         // 处理子节点集合
         var count = children.count();
         for (var i = 0; i < count; i++) {
            var child = children.get(i);
            this.render(context, topComponent, parentComponent, child);
            // 如果父节点为容器类型，则追加显示节点
            if (container && child instanceof Control) {
               container.appendDisplay(child as Control);
            }
         }
      }
      // 通过渲染获得子节点
      if (control) {
         if (renderChild) {
            if (renderChild instanceof Fragment) {
               // 追加子模板
               var fragment: Fragment = renderChild as Fragment;
               var children = fragment.children;
               if (children) {
                  var count = children.count();
                  for (var i = 0; i < count; i++) {
                     var child = children.at(i);
                     control.push(child);
                     this.render(context, topComponent, control, child);
                     if (container && child instanceof Control) {
                        container.appendDisplay(child);
                     }
                  }
               }
            } else {
               // 追加子节点
               control.push(renderChild);
               this.render(context, topComponent, control, renderChild);
               if (container && renderChild instanceof Control) {
                  container.appendDisplay(renderChild as Control);
               }
            }
         }
         // 构建完成
         control.builded();
      }
   }

   //==========================================================
   // <T>构建组件。</T>
   //
   // @param context 渲染环境
   // @param component 组件
   //==========================================================
   public static build(context: RenderContext, clazz: Function) {
      var component = ClassUtil.create(clazz);
      this.render(context, component, component, component);
      return component;
   }
}