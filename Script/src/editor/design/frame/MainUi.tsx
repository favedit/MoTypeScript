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

export class MainUi extends Container {
   public render() {
      return <FrameSet direction_cd={DirectionEnum.Vertical}>
         <FramePage style_class='FrameSet_ToolBar_Ground' size='0,24'>
            <ToolBarUi></ToolBarUi>
         </FramePage>
         <FramePage>
            <FrameSet direction_cd={DirectionEnum.Horizontal}>
               <FramePage style_class='FrameSet_Catalog_Content' size='400,0'>
                  <TreeView>
                     <TreeNodeType name='build' icon='tools.build' label='hello1'/>
                     <TreeNodeType name='build2' icon='tools.save' label='hello1'/>
                     <TreeNode type_name='build' label='hello1'/>
                     <TreeNode type_name='build' label='hello2'>
                        <TreeNode type_name='build2' label='save1'/>
                        <TreeNode type_name='build2' label='save2'/>
                     </TreeNode>
                     <TreeNode type_name='build' label='hello3'/>
                  </TreeView>
               </FramePage>
               <FrameSpliter></FrameSpliter>
               <FramePage style_class='FrameSet_Canvas_Content'>
                  <canvas id='id_canvas3d'></canvas>
               </FramePage>
               <FrameSpliter></FrameSpliter>
               <FramePage style_class='FrameSet_Property_Content' size='300,0'></FramePage>
            </FrameSet>
         </FramePage>
         <FramePage style_class='FrameSet_StatusBar_Ground' size='0,24'></FramePage>
      </FrameSet>
   }
}