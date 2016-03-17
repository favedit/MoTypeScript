import {FRenderable} from '../engine/FRenderable'
import {EAttributeFormat} from '../graphic/EAttributeFormat'
import {FContext} from '../graphic/FContext'
import {FVertexBuffer} from '../graphic/FVertexBuffer'
import {FIndexBuffer} from '../graphic/FIndexBuffer'
import {FPhongMaterial} from '../materials/FPhongMaterial'

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
export class FCube extends FRenderable {
   // 顶点位置缓冲
   public vertexPositionBuffer: FVertexBuffer = null;
   // 顶点颜色缓冲
   public vertexColorBuffer: FVertexBuffer = null;
   // 索引缓冲
   public indexBuffer: FIndexBuffer = null;

   //==========================================================
   // <T>设置信息。</T>
   //
   // @param l:left:Number 左边
   // @param t:top:Number 上边
   // @param w:width:Number 宽度
   // @param h:height:Number 高度
   //==========================================================
   public setup(context: FContext) {
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
      var vertexPositionBuffer: FVertexBuffer = this.vertexPositionBuffer = context.createVertexBuffer();
      vertexPositionBuffer.code = 'position';
      vertexPositionBuffer.formatCd = EAttributeFormat.Float3;
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
      var vertexColorBuffer: FVertexBuffer = this.vertexColorBuffer = context.createVertexBuffer();
      vertexColorBuffer.code = 'color';
      vertexColorBuffer.formatCd = EAttributeFormat.Float4;
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
      var indexBuffer: FIndexBuffer = this.indexBuffer = context.createIndexBuffer();
      indexBuffer.upload(indexData, 36);
      this.pushIndexBuffer(indexBuffer);
      //..........................................................
      // 设置材质
      var material = this.material = new FPhongMaterial();
      // info.effectCode = 'control';
      // info.effectCode = 'automatic';
      // material.ambientColor.set(1, 1, 1, 1);
   }
}