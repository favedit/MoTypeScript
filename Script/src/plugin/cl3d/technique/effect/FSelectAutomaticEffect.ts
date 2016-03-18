﻿//import {FG3dAutomaticEffect} from './FG3dAutomaticEffect';

//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
//export class FG3dSelectAutomaticEffect extends FG3dAutomaticEffect {
   export class FG3dSelectAutomaticEffect {
   //..........................................................
   // @attribute
   protected _code: string = 'select.automatic';

   // //==========================================================
   // // <T>绘制渲染对象。</T>
   // //
   // // @method
   // // @param region:FG3dRegion 渲染区域
   // // @param renderable:FG3dRenderable 渲染对象
   // // @param index:Integer 索引位置
   // //==========================================================
   // public drawRenderable(region, renderable, index) {
   //    var o: any = this;
   //    var context = o._graphicContext;
   //    var size = context.size();
   //    var program = o._program;
   //    var selectX = region._selectX;
   //    var selectY = region._selectY;
   //    // 绑定材质
   //    var material = renderable.material();
   //    var materialInfo = material.info();
   //    o.bindMaterial(material);
   //    // 绑定所有属性流
   //    program.setParameter('vc_model_matrix', renderable.currentMatrix());
   //    //program.setParameter('vc_vp_matrix', region.calculate(sk.graphic.context3d.EG3dRegionParameter.CameraViewProjectionMatrix));
   //    program.setParameter4('vc_offset', size.width, size.height, 1 - (selectX / size.width) * 2, (selectY / size.height) * 2 - 1);
   //    // 设置材质
   //    var i = index + 1;
   //    var i1 = i & 0xFF;
   //    var i2 = (i >> 8) & 0xFF;
   //    var i3 = (i >> 16) & 0xFF;
   //    program.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, materialInfo.alphaBase);
   //    // 绑定所有属性流
   //    o.bindAttributes(renderable);
   //    // 绑定所有取样器
   //    o.bindSamplers(renderable);
   //    // 绘制处理
   //    var indexBuffers = renderable.indexBuffers();
   //    var count = indexBuffers.count();
   //    for (let i = 0; i < count; i++) {
   //       var indexBuffer = indexBuffers.at(i);
   //       context.drawTriangles(indexBuffer);
   //    }
   // }
}