import {Fatal} from './runtime/common/lang/Fatal';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {RenderContext} from './RenderContext';
import {Component} from './Component';
import {Control} from './Control';
import {Element} from './Element';
import {Container} from './Container';

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
         // 设置属性
         component.setProperties(parameters);
         component.setup();
         // 增加子节点
         if (children) {
            var count = children.length;
            for (var i = 0; i < count; i++) {
               var child = children[i];
               component.push(child);
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
      // 构建当前控件
      var control: Control = null;
      if (component instanceof Control) {
         control = <Control>component;
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
         var renderChild = control.render();
         if (renderChild) {
            // 渲染子节点
            this.render(context, topComponent, control, renderChild);
            if (container && renderChild instanceof Control) {
               container.appendDisplay(renderChild as Control);
            }
            // 追加子节点
            control.push(renderChild);
         }
         // 构建完成
         control.builded();
      }
   }
}