import {FRegion} from '../../base/FRegion';
import {ERegionParameter} from '../../base/ERegionParameter';
import {FRenderable} from '../../base/FRenderable';
import {FAutomaticEffect} from './FAutomaticEffect';

//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class FSelectAutomaticEffect extends FAutomaticEffect {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'select.automatic';
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param region 渲染区域
   // @param renderable 渲染对象
   // @param index 索引位置
   //==========================================================
   public drawRenderable(region: FRegion, renderable: FRenderable, index: number) {
      var context = this._graphicContext;
      var size = context.size;
      var program = this.program;
      var selectPosition = region.selectPosition;
      // 绑定材质
      var material = renderable.material;
      //var materialInfo = material.info();
      this.bindMaterial(material);
      // 绑定所有属性流
      program.setParameter('vc_model_matrix', renderable.currentMatrix);
      program.setParameter('vc_vp_matrix', region.calculate(ERegionParameter.CameraViewProjectionMatrix));
      program.setParameter4('vc_offset', size.width, size.height, 1 - (selectPosition.x / size.width) * 2, (selectPosition.y / size.height) * 2 - 1);
      // 设置材质
      var i:number = index + 1;
      var i1:number = i & 0xFF;
      var i2:number = (i >> 8) & 0xFF;
      var i3:number = (i >> 16) & 0xFF;
      //program.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, materialInfo.alphaBase);
      program.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, 0.1);
      // 绑定所有属性流
      this.bindAttributes(renderable);
      // 绑定所有取样器
      this.bindSamplers(renderable);
      // 绘制处理
      var indexBuffers = renderable.indexBuffers;
      var count = indexBuffers.count();
      for (let i = 0; i < count; i++) {
         var indexBuffer = indexBuffers.at(i);
         context.drawTriangles(indexBuffer);
      }
   }
}