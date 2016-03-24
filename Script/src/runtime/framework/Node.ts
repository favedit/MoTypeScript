import {Dispatcher} from '../common/lang/Dispatcher';
import {Objects} from '../common/lang/Objects';
import {ClassFactory} from './ClassFactory';
import {SFieldChangeEvent} from './SFieldChangeEvent';
import {NodeActionEnum} from './NodeActionEnum';

//==========================================================
// <T>节点</T>
//==========================================================
export class Node extends Dispatcher {

   // 类工厂
   //public classFactory: FClassFactory = null;

   // 类对象
   //public className: string = null;

   // 唯一码
   //public guid: string = null;

   // 名称(英文)
   //public name: string = null;

   // 代码(索引用)
   //public code: string = null;

   // 标签(中文)
   //public label: string = null;

   // 父对象
   //public parent: FNode = null;

   // 子节点
   public children: Objects<Node> = null;

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>字段变更处理。</T>
   //
   // @param event 事件
   //==========================================================
   public onFieldChange(event: SFieldChangeEvent) {
      this.processListener(NodeActionEnum.FieldChange, event);
   }

   //==========================================================
   // <T>增加一个子节点。</T>
   //
   // @param node 子节点
   //==========================================================
   public addChild(node: Node) {
      var children: Objects<Node> = this.children;
      if (!children) {
         children = new Objects<Node>();
      }
      if (!children.contains(node)) {
         children.push(node);
         this.processListener(NodeActionEnum.AddChild, node);
      }
   }

   //==========================================================
   // <T>删除一个子节点。</T>
   //
   // @param node 子节点
   //==========================================================
   public remove(node: Node) {
      var children = this.children;
      if (children) {
         if (children.contains(node)) {
            children.remove(node);
            this.processListener(NodeActionEnum.AddChild, node);
         }
      }
   }

   // //==========================================================
   // // <T>删除一个子节点。</T>
   // //
   // // @param node 子节点
   // //==========================================================
   // public load(config) {
   // }

   // //==========================================================
   // // <T>删除一个子节点。</T>
   // //
   // // @param node 子节点
   // //==========================================================
   // public save(config) {
   // }

   // //==========================================================
   // // <T>删除一个子节点。</T>
   // //
   // // @param node 子节点
   // //==========================================================
   // public serialize(output) {
   // }

   // //==========================================================
   // // <T>删除一个子节点。</T>
   // //
   // // @param node 子节点
   // //==========================================================
   // public unserialize(input) {
   // }

   // //==========================================================
   // // <T>删除一个子节点。</T>
   // //
   // // @param node 子节点
   // //==========================================================
   // public unpack(formatCd, source): void {
   // }

   // //==========================================================
   // // <T>删除一个子节点。</T>
   // //
   // // @param node 子节点
   // //==========================================================
   // public pack(formatCd): any {
   // }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      super.dispose();
   }
}