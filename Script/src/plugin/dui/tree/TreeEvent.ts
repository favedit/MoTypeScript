import {Event} from './runtime/ui/event/Event';
import {TreeView} from './TreeView';
import {TreeNode} from './TreeNode';

export class TreeEvent extends Event {
   public tree: TreeView;
   public node: TreeNode;
}