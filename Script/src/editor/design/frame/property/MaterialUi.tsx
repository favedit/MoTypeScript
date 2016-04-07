import {Color4} from './runtime/common/math/Color4';
import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {PhongMaterial} from './runtime/graphic/material/PhongMaterial';
import {Container} from './plugin/dui/Container';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {FrameSet} from './plugin/dui/frame/FrameSet';
import {Frame} from './plugin/dui/form/Frame';
import {Panel} from './plugin/dui/form/Panel';
import {Check} from './plugin/dui/form/Check';
import {SlideNumber} from './plugin/dui/form/SlideNumber';
import {ColorPower} from './plugin/dui/form/ColorPower';
import {ImageFile} from './plugin/dui/form/ImageFile';
import {Select} from './plugin/dui/form/Select';
import {SelectItem} from './plugin/dui/form/SelectItem';
import {TreeView} from './plugin/dui/tree/TreeView';
import {TreeNodeType} from './plugin/dui/tree/TreeNodeType';
import {TreeNode} from './plugin/dui/tree/TreeNode';
import {React} from './plugin/dui/React';
import {CatalogUi} from './frame/scene/CatalogUi';

export class MaterialUi extends Container {

   protected _controlAlphaBase;
   protected _controlAlphaRate;
   protected _controlAmbientColor;
   protected _controlDiffuseColor;
   protected _controlSpecularColor;
   protected _controlEmissiveColor;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.renderOptionFragment = false;
   }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public loadPhongMaterial(material: PhongMaterial) {
      this._controlAlphaBase.set(material.alphaBase);
      this._controlAlphaRate.set(material.alphaRate);
      this._controlAmbientColor.set(new Color4(0.5, 0.5, 0.5, 1));
      this._controlDiffuseColor.set(new Color4(0.5, 0.5, 0.5, 1));
      this._controlSpecularColor.set(new Color4(0.5, 0.5, 0.5, 1));
      this._controlEmissiveColor.set(new Color4(0.5, 0.5, 0.5, 1));
   }

   //==========================================================
   // <T>加载内容数据。</T>
   //
   // @param value 数据内容
   //==========================================================
   public load(value) {
      if (value instanceof PhongMaterial) {
         this.loadPhongMaterial(value as PhongMaterial);
      }
   }

   //==========================================================
   // <T>渲染页面处理。</T>
   //
   // @return 页面元素
   //==========================================================
   public render() {
      return <Frame label="材质属性" width='100%'>
         <Panel name='infoPanel' icon='design.panel.icon' label='材质属性'>
            <Select name="typeCd" label="类型" linker='_controlTypeCd' label_width='70px' edit_width='200px' input_width='200px'>
               <SelectItem name="LineBasic" label="LineBasic" data_value='LineBasic'/>
               <SelectItem name="MeshBasic" label="MeshBasic" data_value='MeshBasic'/>
               <SelectItem name="MeshNormal" label="MeshNormal" data_value='MeshNormal'/>
               <SelectItem name="MeshPhong" label="MeshPhong" data_value='MeshPhong'/>
            </Select>
         </Panel>
         <Panel name='optionPanel' icon='design.panel.icon' label='特性参数'>
            <Check name="optionDouble" label="双面绘制" linker='_controlOptionDouble' label_width='70px' edit_width='60px' input_width='60px' nowrap='Y'/>
            <Check name="optionDepth" linker='_controlOptionDepth' label="深度写入" label_width='70px' edit_width='60px' input_width='60px' />
            <Check name="optionShadow" linker='_controlOptionShadow' label="阴影" label_width='70px' edit_width='60px' input_width='60px' nowrap='Y'/>
            <Check name="optionShadowSelf" linker='_controlOptionShadowSelf' label="自阴影" label_width='70px' edit_width='60px' input_width='60px' />
         </Panel>
         <Panel name='alphaPanel' icon='design.panel.icon' label='透明参数'>
            <Check name="optionAlpha" linker='_controlOptionAlpha' label="有效" label_width='70px' edit_width='200px' input_width='200px'/>
            <SlideNumber name="alphaBase" linker='_controlAlphaBase' label="基础" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='1' value_step='0.01' />
            <SlideNumber name="alphaRate" linker='_controlAlphaRate' label="比率" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='1' value_step='0.01' />
         </Panel>
         <Panel name='ambientPanel' icon='design.panel.icon' label='环境参数'>
            <Check name="optionAmbient" linker='_controlOptionAmbient' label="有效" label_width='70px' edit_width='200px' input_width='200px' />
            <ColorPower name="ambientColor" linker='_controlAmbientColor' label="颜色" label_width='70px' edit_width='200px' input_width='200px' value_min='0' value_max='4' />
            <ImageFile name="ambientTexture" linker='_controlAmbientTexture' label="纹理" label_width='70px' edit_width='200px' input_width='200px'/>
         </Panel>
         <Panel name='diffusePanel' icon='design.panel.icon' label='散射参数'>
            <Check name="optionDiffuse" linker='_controlOptionDiffuse' label="有效" label_width='70px' edit_width='200px' input_width='200px' />
            <ColorPower name="diffuseColor" linker='_controlDiffuseColor' label="颜色" label_width='70px' edit_width='200px' input_width='200px' value_min='0' value_max='4' />
            <ImageFile name="diffuseTexture" linker='_controlDiffuseTexture' label="纹理" label_width='70px' edit_width='200px' input_width='200px'/>
         </Panel>
         <Panel name='specularPanel' icon='design.panel.icon' label='高光参数'>
            <Check name="optionSpecular" linker='_controlOptionSpecular' label="有效" label_width='70px' edit_width='200px' input_width='200px' />
            <ColorPower name="specularColor" linker='_controlSpecularColor' label="颜色" label_width='70px' edit_width='200px' input_width='200px' value_min='0' value_max='32' />
            <SlideNumber name="specularBase" linker='_controlSpecularBase' label="基础" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='1' value_step='0.1' />
            <SlideNumber name="specularLevel" linker='_controlSpecularLevel' label="级别" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='100' value_step='1' />
            <ImageFile name="specularTexture" linker='_controlSpecularTexture' label="纹理" label_width='70px' edit_width='200px' input_width='200px'/>
         </Panel>
         <Panel name='reflectPanel' icon='design.panel.icon' label='反射参数'>
            <Check name="optionReflect" linker='_controlOptionReflect' label="有效" label_width='70px' edit_width='200px' input_width='200px' />
            <ColorPower name="reflectColor" linker='_controlReflectColor' label="颜色" label_width='70px' edit_width='200px' input_width='200px' value_min='0' value_max='4' />
            <SlideNumber name="reflectMerge" linker='_controlReflectMerge' label="融合" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='2' value_step='0.1' />
         </Panel>
         <Panel name='emissivePanel' icon='design.panel.icon' label='发光参数'>
            <Check name="optionEmissive" linker='_controlOptionEmissive' label="有效" label_width='70px' edit_width='200px' input_width='200px' />
            <ColorPower name="emissiveColor" linker='_controlEmissiveColor' label="颜色" label_width='70px' edit_width='200px' input_width='200px' value_min='0' value_max='4' />
         </Panel>
         <Panel name='colorPanel' icon='design.panel.icon' label='颜色参数'>
            <Check name="optionColor" linker='_controlOptionColor' label="有效" label_width='70px' edit_width='200px' input_width='200px' />
            <SlideNumber name="colorMin" linker='_controlColorMin' label="下限" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='1' value_step='0.01' />
            <SlideNumber name="colorMax" linker='_controlColorMax' label="上限" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='1' value_step='0.01' />
            <SlideNumber name="colorBalance" linker='_controlColorBalance' label="平衡" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='1' value_step='0.01' />
            <SlideNumber name="colorRate" linker='_controlColorRate' label="比率" label_width='70px' edit_width='200px' input_width='40px' value_min='0' value_max='2' value_step='0.01' />
         </Panel>
      </Frame>
   }
}