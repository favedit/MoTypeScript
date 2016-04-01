import {RegionParameterEnum} from '../../base/RegionParameterEnum';
import {Renderable} from '../../base/Renderable';
import {Region} from '../../base/Region';
import {AutomaticEffect} from './AutomaticEffect';

//==========================================================
// <T>阴影颜色自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class ShadowColorAutomaticEffect extends AutomaticEffect {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'shadow.color.automatic';
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @param region 渲染区域
   // @param renderable 渲染对象
   //==========================================================
   public drawRenderable(region: Region, renderable: Renderable) {
      var context = this.graphicContext;
      var program = this.program;
      // 获得参数
      var vcp = region.calculate(RegionParameterEnum.CameraPosition);
      var vcvpm = region.calculate(RegionParameterEnum.CameraViewProjectionMatrix);
      var vld = region.calculate(RegionParameterEnum.LightDirection);
      var vlvm = region.calculate(RegionParameterEnum.LightViewMatrix);
      var vlvpm = region.calculate(RegionParameterEnum.LightViewProjectionMatrix);
      var vlci = region.calculate(RegionParameterEnum.LightInfo);
      var tp = region.techniquePass;
      // 绑定材质
      var material = renderable.material;
      this.bindMaterial(material);
      // 绑定顶点常量
      program.setParameter('vc_light_depth', vlci);
      program.setParameter('vc_model_matrix', renderable.currentMatrix);
      program.setParameter('vc_vp_matrix', vcvpm);
      program.setParameter('vc_camera_position', vcp);
      program.setParameter('vc_light_direction', vld);
      program.setParameter('vc_light_view_matrix', vlvm);
      program.setParameter('vc_light_vp_matrix', vlvpm);
      program.setParameter('fc_camera_position', vcp);
      program.setParameter('fc_light_direction', vld);
      program.setParameter4('fc_light_depth', 1.0 / 4096.0, 0.0, -1.0 / 4096.0, vlci.w);
      // 绑定像素常量
      //var mi = material.info();
      // program.setParameter('fc_color', mi.ambientColor);
      // program.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      // program.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      // program.setParameter('fc_ambient_color', mi.ambientColor);
      // program.setParameter('fc_diffuse_color', mi.diffuseColor);
      // program.setParameter('fc_specular_color', mi.specularColor);
      // program.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      // program.setParameter('fc_specular_view_color', mi.specularViewColor);
      // program.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      // program.setParameter('fc_reflect_color', mi.reflectColor);
      program.setParameter4('fc_color', 1, 1, 1, 1);
      program.setParameter4('fc_vertex_color', 1, 1, 1, 1);
      program.setParameter4('fc_alpha', 0, 1, 1, 1);
      program.setParameter4('fc_ambient_color', 1, 1, 1, 1);
      program.setParameter4('fc_diffuse_color', 1, 1, 1, 1);
      program.setParameter4('fc_specular_color', 1, 1, 1, 1);
      program.setParameter4('fc_specular', 1, 1, 1, 1);
      program.setParameter4('fc_specular_view_color', 1, 1, 1, 1);
      program.setParameter4('fc_specular_view', 1, 1, 1, 1);
      program.setParameter4('fc_reflect_color', 1, 1, 1, 1);
      // 绑定所有属性流
      this.bindAttributes(renderable);
      // 绑定所有取样器
      //program.setSampler('fs_light_depth', tp.textureDepth());
      this.bindSamplers(renderable);
      // 绘制处理
      super.drawRenderable(region, renderable);
   }
}