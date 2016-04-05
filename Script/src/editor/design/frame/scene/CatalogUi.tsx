import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {Material} from './runtime/graphic/material/Material';
import {Container} from './plugin/dui/Container';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {FrameSet} from './plugin/dui/frame/FrameSet';
import {TreeView} from './plugin/dui/tree/TreeView';
import {TreeNodeType} from './plugin/dui/tree/TreeNodeType';
import {TreeNode} from './plugin/dui/tree/TreeNode';
import {TreeEvent} from './plugin/dui/tree/TreeEvent';
import {React} from './plugin/dui/React';
import {ToolBarUi} from './frame/ToolBarUi';
import {Scene} from '../../plugin/cl3d/shape/Scene';
import {SceneLayer} from '../../plugin/cl3d/shape/SceneLayer';
import {SceneDisplay} from '../../plugin/cl3d/shape/SceneDisplay';
import {Template} from '../../plugin/cl3d/shape/Template';
import {TemplateRenderable} from '../../plugin/cl3d/shape/TemplateRenderable';

export class CatalogUi extends Container {

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.name = "scene.catalog";
   }

   //==========================================================
   // <T>加载场景显示。</T>
   //
   // @param parentNode 父节点
   // @param display 显示对象
   //==========================================================
   public loadMaterial(parentNode: TreeNode, material: Material) {
      // 新建层节点
      var node = new TreeNode();
      node.typeName = 'material';
      node.label = material.name;
      node.note = material.label;
      node.tag = material;
      parentNode.appendChild(node);
   }

   //==========================================================
   // <T>加载场景显示。</T>
   //
   // @param parentNode 父节点
   // @param display 显示对象
   //==========================================================
   public loadTemplateRenderable(parentNode: TreeNode, renderable: TemplateRenderable) {
      // 新建层节点
      var node = new TreeNode();
      node.typeName = 'renderable';
      node.label = renderable.name;
      node.note = renderable.label;
      node.tag = renderable;
      parentNode.appendChild(node);
   }

   //==========================================================
   // <T>加载场景显示。</T>
   //
   // @param parentNode 父节点
   // @param display 显示对象
   //==========================================================
   public onLoadSceneDisplay(sender, event) {
      var display: SceneDisplay = sender.attributes[0];
      var node: TreeNode = sender.attributes[1];
      var template: Template = event.sender;
      // 修改节点信息
      node.label = template.name;
      node.note = template.label;
      node.update();
      // 追加材质集合
      var materials = template.meshMaterials;
      if (materials) {
         var count = materials.count();
         for (var n = 0; n < count; n++) {
            var material = materials.at(n);
            this.loadMaterial(node, material);
         }
      }
      // 追加渲染集合
      var renderables = template.renderables;
      if (renderables) {
         var count = renderables.count();
         for (var n = 0; n < count; n++) {
            var renderable = renderables.at(n);
            this.loadTemplateRenderable(node, renderable as TemplateRenderable);
         }
      }
   }

   //==========================================================
   // <T>加载场景显示。</T>
   //
   // @param parentNode 父节点
   // @param display 显示对象
   //==========================================================
   public loadSceneDisplay(parentNode: TreeNode, display: SceneDisplay) {
      // 新建层节点
      var node = new TreeNode();
      node.typeName = 'display';
      node.label = display.templateUrl;
      node.tag = display;
      parentNode.appendChild(node);
      // 增加监听器
      display.template.loadListeners.register(this, this.onLoadSceneDisplay, display, node);
   }

   //==========================================================
   // <T>加载场景层。</T>
   //==========================================================
   public loadSceneLayer(layer: SceneLayer) {
      var treeview: TreeView = this.findChildFirst() as TreeView;
      // 新建层节点
      var node = new TreeNode();
      node.typeName = 'layer';
      node.label = layer.name;
      node.note = layer.label;
      node.tag = layer;
      treeview.appendChild(node);
      // 追加显示集合
      var displays = layer.displays;
      if (displays) {
         var count = displays.count();
         for (var n = 0; n < count; n++) {
            var display = displays.at(n);
            this.loadSceneDisplay(node, display as SceneDisplay);
         }
      }
   }

   //==========================================================
   // <T>加载场景。</T>
   //==========================================================
   public loadScene(scene: Scene) {
      var treeview: TreeView = this.findChildFirst() as TreeView;
      var layers = scene.layers;
      if (layers) {
         var count = layers.count();
         for (var n = 0; n < count; n++) {
            var layer = layers.at(n);
            this.loadSceneLayer(layer as SceneLayer);
         }
      }
   }

   //==========================================================
   // <T>节点点击处理。</T>
   //==========================================================
   public onNodeClick(sender, event: TreeEvent) {
      var node = event.node;
      var tag = node.tag;
      if (tag instanceof Material) {
         console.log('Material ', tag);
      }
   }

   //==========================================================
   // <T>渲染处理。</T>
   //
   // @return 子节点结构
   //==========================================================
   public render() {
      return <TreeView onnodeclick='onNodeClick'>
         <TreeNodeType name="scene" label="场景" is_valid="Y" icon="resource.scene.scene"/>
         <TreeNodeType name="technique" label="技术" is_valid="Y" icon="resource.scene.technique"/>
         <TreeNodeType name="region" label="区域" is_valid="Y" icon="resource.scene.region"/>
         <TreeNodeType name="camera" label="相机" is_valid="Y" icon="resource.scene.camera"/>
         <TreeNodeType name="light" label="光源" is_valid="Y" icon="resource.scene.light"/>
         <TreeNodeType name="layers" label="显示层集合" is_valid="Y" icon="resource.scene.layers"/>
         <TreeNodeType name="layer" label="显示层" is_valid="Y" icon="resource.scene.layer"/>
         <TreeNodeType name="display" label="显示对象" is_valid="Y" icon="resource.scene.display"/>
         <TreeNodeType name="material" label="渲染材质" is_valid="Y" icon="resource.scene.material"/>
         <TreeNodeType name="animation" label="动画对象" is_valid="Y" icon="resource.scene.animation"/>
         <TreeNodeType name="movie" label="剪辑对象" is_valid="Y" icon="resource.scene.movie"/>
         <TreeNodeType name="renderable" label="渲染对象" is_valid="Y" icon="resource.scene.renderable"/>
      </TreeView>;
   }
}