import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {Container} from './plugin/dui/Container';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {FrameSet} from './plugin/dui/frame/FrameSet';
import {TreeView} from './plugin/dui/tree/TreeView';
import {TreeNodeType} from './plugin/dui/tree/TreeNodeType';
import {TreeNode} from './plugin/dui/tree/TreeNode';
import {React} from './plugin/dui/React';
import {CatalogUi} from './frame/scene/CatalogUi';

export class TechniqueUi extends Container {

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.renderOptionFragment = false;
   }

   // public render() {
   //    return <Frame name="resource.common.property.TechniqueFrame" type='FDsCommonTechniquePropertyFrame' label="技术属性" is_valid="Y" note="" style_refer="design.list.ControlType" edit_insert="Y" edit_update="Y">
   //    <Panel name='infoPanel' icon='design.panel.icon' label='渲染模式'>
   //       <ListBox name="renderModesBox" linker='_controlRenderModes' label="渲染模式" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //    </Panel>
   //    <Panel name='statisticsPanel' icon='design.panel.icon' label='舞台帧统计信息'>
   //       <Edit name="statisticsFrameTick" linker='_controlFrameTick' label="帧时间" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsProcessTick" linker='_controlProcessTick' label="处理时间" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsDrawTick" linker='_controlDrawTick' label="绘制时间" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //    </Panel>
   //    <Panel name='statisticsPanel' icon='design.panel.icon' label='设备帧统计信息'>
   //       <Edit name="statisticsClearCount" linker='_controlClearCount' label="清空次数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsModeInfo" linker='_controlModeInfo' label="模式切换" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsProgramCount" linker='_controlProgramCount' label="程序次数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsConstInfo" linker='_controlConstInfo' label="常量信息" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsBufferCount" linker='_controlBufferCount' label="缓冲次数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsTextureCount" linker='_controlTextureCount' label="纹理次数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsTargetCount" linker='_controlTargetCount' label="目标次数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsDrawInfo" linker='_controlDrawInfo' label="绘制信息" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //    </Panel>
   //    <Panel name='statisticsPanel' icon='design.panel.icon' label='设备统计信息'>
   //       <Edit name="statisticsProgramTotal" linker='_controlProgramTotal' label="程序总数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsLayoutTotal" linker='_controlLayoutTotal' label="布局总数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsBufferInfo" linker='_controlBufferInfo' label="缓冲总数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsTextureInfo" linker='_controlTextureInfo' label="纹理总数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //       <Edit name="statisticsTargetTotal" linker='_controlTargetTotal' label="目标总数" label_size='70,0' valid="Y" edit_size='200,0' note="" />
   //    </Panel>
   // </Frame>
   // }
}