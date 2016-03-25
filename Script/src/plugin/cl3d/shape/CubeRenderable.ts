import {Renderable} from '../base/Renderable'
import {AttributeFormatEnum} from '../graphic/AttributeFormatEnum'
import {GraphicContext} from '../graphic/GraphicContext'
import {VertexBuffer} from '../graphic/VertexBuffer'
import {IndexBuffer} from '../graphic/IndexBuffer'
import {PhongMaterial} from '../../../runtime/graphic/material/PhongMaterial'

//==========================================================
// <T>渲染立方体。</T>
//      04 ── 05
//    ╱│    ╱ │
//  00 ── 01   │
//  │  07─│─ 06
//  │╱    │ ╱
//  03 ── 02
//
// @author maocy
// @history 141231
//==========================================================
export class CubeRenderable extends Renderable {
   // 顶点位置缓冲
   public vertexPositionBuffer: VertexBuffer = null;
   // 顶点颜色缓冲
   public vertexColorBuffer: VertexBuffer = null;
   // 索引缓冲
   public indexBuffer: IndexBuffer = null;

   //==========================================================
   // <T>设置信息。</T>
   //
   // @param l:left:Number 左边
   // @param t:top:Number 上边
   // @param w:width:Number 宽度
   // @param h:height:Number 高度
   //==========================================================
   public setup(context: GraphicContext) {
      this.vertexCount = 8;
      // 设置顶点数据
      var vertexPositionData = [
         -1.0, 1.0, -1.0,
         1.0, 1.0, -1.0,
         1.0, -1.0, -1.0,
         -1.0, -1.0, -1.0,
         -1.0, 1.0, 1.0,
         1.0, 1.0, 1.0,
         1.0, -1.0, 1.0,
         -1.0, -1.0, 1.0];
      var vertexPositionBuffer: VertexBuffer = this.vertexPositionBuffer = context.createVertexBuffer();
      vertexPositionBuffer.code = 'position';
      vertexPositionBuffer.formatCd = AttributeFormatEnum.Float3;
      vertexPositionBuffer.upload(vertexPositionData, 4 * 3, 8);
      this.pushVertexBuffer(vertexPositionBuffer);
      // 设置颜色数据
      var vertexColorData = [
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         0.0, 0.0, 0.0, 1.0,
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 1.0, 1.0,
         1.0, 0.0, 1.0, 1.0,
         0.0, 0.0, 1.0, 1.0];
      var vertexColorBuffer: VertexBuffer = this.vertexColorBuffer = context.createVertexBuffer();
      vertexColorBuffer.code = 'color';
      vertexColorBuffer.formatCd = AttributeFormatEnum.Float4;
      vertexColorBuffer.upload(vertexColorData, 4 * 4, 8);
      this.pushVertexBuffer(vertexColorBuffer);
      // 设置索引数据
      var indexData = [
         0, 1, 2, 0, 2, 3,
         1, 5, 6, 1, 6, 2,
         5, 4, 7, 5, 7, 6,
         4, 0, 3, 4, 3, 7,
         0, 4, 5, 0, 5, 1,
         3, 2, 6, 3, 6, 7];
      var indexBuffer: IndexBuffer = this.indexBuffer = context.createIndexBuffer();
      indexBuffer.upload(indexData, 36);
      this.pushIndexBuffer(indexBuffer);
      //..........................................................
      // 设置材质
      var material = this.material = new PhongMaterial();
      // info.effectCode = 'control';
      // info.effectCode = 'automatic';
      // material.ambientColor.set(1, 1, 1, 1);
   }
}