import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {RenderContext} from './RenderContext';
import {Component} from './Component';
import {Control} from './Control';
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
   public static createElement(type: Function, parameters: any, ...children: Array<any>) {
      // 创建元素
      var element = ClassUtil.create(type);
      // 设置属性
      element.setAttributes(parameters);
      element.setup();
      // 增加子节点
      if (children) {
         var count = children.length;
         for (var i = 0; i < count; i++) {
            var child = children[i];
            element.appendChild(child);
         }
      }
      return element;
   }

   //==========================================================
   // <T>渲染组件。</T>
   //
   // @param context 渲染环境
   // @param component 组件
   //==========================================================
   public static render(context: RenderContext, topComponent: Component, parentComponent: Component, component: Component) {
      // 构建当前控件
      if (component instanceof Control) {
         var control = <Control>component;
         context.topComponent = topComponent;
         context.parentComponent = parentComponent;
         control.build(context);
      }
      // 获得容器
      var container: Container = null;
      if (component instanceof Container) {
         container = <Container>component;
      }
      // 通过渲染获得子节点
      var renderChild = control.render();
      if (renderChild) {
         this.render(context, topComponent, control, renderChild);
         if (container && renderChild instanceof Control) {
            container.appendDisplay(renderChild as Control);
         }
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
   }
}