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
import {CatalogUi} from './frame/scene/CatalogUi';

export class Renderable extends Container {

   // public render() {
   //    return <Frame name="resource.common.property.RenderableFrame" type='FDsCommonRenderablePropertyFrame' label="显示属性" is_valid="Y" note="">
   //       <Panel name='infoPanel' icon='design.panel.icon' label='显示属性'>
   //          <Edit name="guid" linker='_controlGuid' label="标识:" label_size='70,0' valid="Y" edit_size='200,0' edit_view='N' input_size='200,0' note="" />
   //          <Edit name="code" linker='_controlCode' label="代码:" label_size='70,0' valid="Y" edit_size='200,0' edit_view='Y' input_size='200,0' note="" />
   //          <Edit name="label" linker='_controlLabel' label="名称:" label_size='70,0' valid="Y" edit_size='200,0' edit_view='Y' input_size='200,0' note="" />
   //       </Panel>
   //       <PageControl name='propertyPageControl' icon='design.panel.icon' label='信息页面'>
   //          <PageSheet name='renderableFrame' icon='design.panel.icon' label='渲染信息' frame_source='resource.common.RenderableFrame'/>
   //          <PageSheet name='materialFrame1' icon='design.panel.icon' label='材质基础' frame_source='resource.common.Material1Frame'/>
   //          <PageSheet name='materialFrame2' icon='design.panel.icon' label='材质高级' frame_source='resource.common.Material2Frame'/>
   //       </PageControl>
   //    </Frame>

   // }
}