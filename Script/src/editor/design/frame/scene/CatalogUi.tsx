import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {Container} from './plugin/dui/Container';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {FrameSet} from './plugin/dui/frame/FrameSet';
import {TreeView} from './plugin/dui/tree/TreeView';
import {TreeNodeType} from './plugin/dui/tree/TreeNodeType';
import {TreeNode} from './plugin/dui/tree/TreeNode';
import {React} from './plugin/dui/React';
import {ToolBarUi} from './frame/ToolBarUi';

export class CatalogUi extends Container {

   public constructor() {
      super();
      this.name = "scene.catalog";
   }

   public render() {
      return <TreeView>
         <TreeNodeType name='build' icon='tools.build' label='hello1'/>
         <TreeNodeType name='build2' icon='tools.save' label='hello1'/>
         <TreeNode type_name='build' label='hello1'/>
         <TreeNode type_name='build' label='hello2'>
            <TreeNode type_name='build2' label='save1'/>
            <TreeNode type_name='build2' label='save2'/>
         </TreeNode>
         <TreeNode type_name='build' label='hello3'/>
      </TreeView>;
   }
}