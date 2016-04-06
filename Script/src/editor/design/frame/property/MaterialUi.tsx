import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {Container} from './plugin/dui/Container';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {FrameSet} from './plugin/dui/frame/FrameSet';
import {Frame} from './plugin/dui/form/Frame';
import {Panel} from './plugin/dui/form/Panel';
import {Check} from './plugin/dui/form/Check';
import {SlideNumber} from './plugin/dui/form/SlideNumber';
import {ColorPower} from './plugin/dui/form/ColorPower';
import {TreeView} from './plugin/dui/tree/TreeView';
import {TreeNodeType} from './plugin/dui/tree/TreeNodeType';
import {TreeNode} from './plugin/dui/tree/TreeNode';
import {React} from './plugin/dui/React';
import {CatalogUi} from './frame/scene/CatalogUi';

export class MaterialUi extends Container {

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.renderOptionFragment = false;
   }

   public render() {
      return <Frame label="材质属性" width='100%'>
         <Panel name='infoPanel' icon='design.panel.icon' label='材质属性'>
            <Check name="optionDouble" linker='_controlOptionDouble' label="双面效果" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
         </Panel>
         <Panel name='alphaPanel' icon='design.panel.icon' label='透明参数'>
            <Check name="optionAlpha" linker='_controlOptionAlpha' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <SlideNumber name="alphaBase" linker='_controlAlphaBase' label="基础" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='1' value_step='0.01' note="" />
            <SlideNumber name="alphaRate" linker='_controlAlphaRate' label="比率" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='1' value_step='0.01' note="" />
         </Panel>
         <Panel name='colorPanel' icon='design.panel.icon' label='颜色参数'>
            <Check name="optionColor" linker='_controlOptionColor' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <SlideNumber name="colorMin" linker='_controlColorMin' label="下限" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='1' value_step='0.01' note="" />
            <SlideNumber name="colorMax" linker='_controlColorMax' label="上限" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='1' value_step='0.01' note="" />
            <SlideNumber name="colorBalance" linker='_controlColorBalance' label="平衡" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='1' value_step='0.01' note="" />
            <SlideNumber name="colorRate" linker='_controlColorRate' label="比率" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='2' value_step='0.01' note="" />
         </Panel>
         <Panel name='vertexPanel' icon='design.panel.icon' label='顶点颜色'>
            <Check name="optionVertex" linker='_controlOptionVertex' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <ColorPower name="vertexColor" linker='_controlVertexColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' value_min='0' value_max='4' note="" />
         </Panel>
         <Panel name='ambientPanel' icon='design.panel.icon' label='环境参数'>
            <Check name="optionAmbient" linker='_controlOptionAmbient' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <ColorPower name="ambientColor" linker='_controlAmbientColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' value_min='0' value_max='4' note="" />
         </Panel>
         <Panel name='diffusePanel' icon='design.panel.icon' label='散射参数'>
            <Check name="optionDiffuse" linker='_controlOptionDiffuse' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <ColorPower name="diffuseColor" linker='_controlDiffuseColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' value_min='0' value_max='4' note="" />
         </Panel>
         <Panel name='specularPanel' icon='design.panel.icon' label='高光参数'>
            <Check name="optionSpecular" linker='_controlOptionSpecular' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <ColorPower name="specularColor" linker='_controlSpecularColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' value_min='0' value_max='32' note="" />
            <SlideNumber name="specularBase" linker='_controlSpecularBase' label="基础" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='1' value_step='0.1' note="" />
            <SlideNumber name="specularLevel" linker='_controlSpecularLevel' label="级别" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='100' value_step='1' note="" />
         </Panel>
         <Panel name='reflectPanel' icon='design.panel.icon' label='反射参数'>
            <Check name="optionReflect" linker='_controlOptionReflect' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <ColorPower name="reflectColor" linker='_controlReflectColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' value_min='0' value_max='4' note="" />
            <SlideNumber name="reflectMerge" linker='_controlReflectMerge' label="融合" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='2' value_step='0.1' note="" />
         </Panel>
         <Panel name='emissivePanel' icon='design.panel.icon' label='发光参数'>
            <Check name="optionEmissive" linker='_controlOptionEmissive' label="有效" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <ColorPower name="emissiveColor" linker='_controlEmissiveColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' value_min='0' value_max='4' note="" />
         </Panel>
         <Panel name='optionPanel' icon='design.panel.icon' label='特性参数'>
            <Check name="optionDepth" linker='_controlOptionDepth' label="深度" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <Check name="optionView" linker='_controlOptionView' label="环境" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <Check name="optionNormalInvert" linker='_controlOptionNormalInvert' label="法线反向" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <Check name="optionShadow" linker='_controlOptionShadow' label="阴影" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <Check name="optionShadowSelf" linker='_controlOptionShadowSelf' label="自阴影" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
         </Panel>
         <Panel name='diffuseViewPanel' icon='design.panel.icon' label='环境参数'>
            <ColorPower name="diffuseViewColor" linker='_controlDiffuseViewColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
         </Panel>
         <Panel name='specularViewPanel' icon='design.panel.icon' label='环境高光参数'>
            <ColorPower name="specularViewColor" linker='_controlSpecularViewColor' label="颜色" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
            <SlideNumber name="specularViewBase" linker='_controlSpecularViewBase' label="基础" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='1' value_step='0.1' note="" />
            <SlideNumber name="specularViewLevel" linker='_controlSpecularViewLevel' label="级别" label_size='70,0' valid="Y" edit_size='200,0' input_size='40,0' value_min='0' value_max='100' value_step='1' note="" />
         </Panel>
      </Frame>
   }


   // public render() {
   //    return <Frame name="resource.common.Material1Frame" type='FDsCommonMaterial1Frame' linker='_frameMaterial1' label="材质属性" is_valid="Y" note="">
   //       <Panel name='infoPanel' icon='design.panel.icon' label='材质属性'>
   //          <Check name="optionDouble" linker='_controlOptionDouble' label="双面效果" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" />
   //          <Select name="effectCode" linker='_controlEffectCode' label="效果名称" label_size='70,0' valid="Y" edit_size='200,0' input_size='200,0' note="" >
   //             <SelectItem name="automatic" label="自动效果器" data_value='automatic'/>
   //             <SelectItem name="skeleton" label="动画效果器" data_value='skeleton'/>
   //             <SelectItem name="water" label="水效果器" data_value='water'/>
   //          </Select>
   //       </Panel>
   //    </Frame>
   // }
}