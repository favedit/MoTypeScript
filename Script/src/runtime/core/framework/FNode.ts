import {FObject} from '../../common/lang/FObject';
import {FObjects} from '../../common/lang/FObjects';
import {FClassFactory} from './FClassFactory';

export class FNode extends FObject {

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
   // public nodes: FObjects<FNode> = null;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>属性更改。</T>
   //
   // @method
   //==========================================================
   public onPropertyChange() {
   }

   //==========================================================
   // <T>属性更改。</T>
   //
   // @method
   //==========================================================
   public dispatchEvent(code:string, event:any):void {
      //RConsole.find(FEventConsole).dispatchEvent(code, event);
   }

   //==========================================================
   // <T>增加一个子节点。</T>
   //
   // @param node 子节点
   //==========================================================
   // public push(node: FNode) {
   //    var nodes = this.nodes;
   //    if (!nodes) {
   //       nodes = new FObjects<FNode>();
   //    }
   //    node.parent = this;
   //    nodes.push(node);
   // }

   // //==========================================================
   // // <T>删除一个子节点。</T>
   // //
   // // @param node 子节点
   // //==========================================================
   // public remove(node: FNode) {
   //    node.parent = null;
   //    var nodes = this.nodes;
   //    if (nodes) {
   //       nodes.remove(node);
   //    }
   // }

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