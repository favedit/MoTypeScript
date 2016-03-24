import {Renderable} from '../base/Renderable';
import {AttributeFormatEnum} from '../graphic/AttributeFormatEnum';
import {GraphicContext} from '../graphic/GraphicContext';
import {DrawModeEnum} from '../graphic/DrawModeEnum';
import {VertexBuffer} from '../graphic/VertexBuffer';
import {IndexBuffer} from '../graphic/IndexBuffer';
import {FMaterial} from '../../../runtime/graphic/material/FMaterial';
import {FLineMaterial} from '../../../runtime/graphic/material/FLineMaterial';
import {FCurve3} from '../../../runtime/graphic/shape/brep/FCurve3';

//==========================================================
// <T>渲染线。</T>
//
// @author maocy
// @history 160322
//==========================================================
export class Curve3Renderable extends Renderable {
   // 顶点位置缓冲
   public vertexPositionBuffer: VertexBuffer;
   // 顶点颜色缓冲
   public vertexColorBuffer: VertexBuffer;
   // 索引缓冲
   public indexBuffer: IndexBuffer;
   // 线段
   public curve: FCurve3;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @param curve 线段
   // @param material 材质
   //==========================================================
   public constructor(curve?: FCurve3, material?: FMaterial) {
      super();
      this.curve = curve;
      this.material = material;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @param context 环境
   //==========================================================
   public setup(context: GraphicContext) {
      var vertexs = this.curve.getVertexs();
      var vertexCount = this.vertexCount = vertexs.count();
      // 设置顶点数据
      var index = 0;
      var vertexPositionData = new Float32Array(3 * vertexCount);
      for (var n = 0; n < vertexCount; n++) {
         var position = vertexs.at(n).position;
         vertexPositionData[index++] = position.x;
         vertexPositionData[index++] = position.y;
         vertexPositionData[index++] = position.z;
      }
      var vertexPositionBuffer: VertexBuffer = this.vertexPositionBuffer = context.createVertexBuffer();
      vertexPositionBuffer.code = 'position';
      vertexPositionBuffer.formatCd = AttributeFormatEnum.Float3;
      vertexPositionBuffer.upload(vertexPositionData, 4 * 3, vertexCount);
      this.pushVertexBuffer(vertexPositionBuffer);
      // 设置颜色数据
      var index = 0;
      var vertexColorData = new Float32Array(4 * vertexCount);
      for (var n = 0; n < vertexCount; n++) {
         var color = vertexs.at(n).color;
         vertexColorData[index++] = color.red;
         vertexColorData[index++] = color.green;
         vertexColorData[index++] = color.blue;
         vertexColorData[index++] = color.alpha;
      }
      var vertexColorBuffer: VertexBuffer = this.vertexColorBuffer = context.createVertexBuffer();
      vertexColorBuffer.code = 'color';
      vertexColorBuffer.formatCd = AttributeFormatEnum.Float4;
      vertexColorBuffer.upload(vertexColorData, 4 * 4, vertexCount);
      this.pushVertexBuffer(vertexColorBuffer);
      // 设置索引数据
      var indexData = new Uint16Array(vertexCount);
      for (var n = 0; n < vertexCount; n++) {
         indexData[n] = n;
      }
      var indexBuffer: IndexBuffer = this.indexBuffer = context.createIndexBuffer();
      indexBuffer.upload(indexData, vertexCount);
      indexBuffer.drawModeCd = DrawModeEnum.Lines;
      this.pushIndexBuffer(indexBuffer);
      //..........................................................
      // 设置材质
      if (!this.material) {
         this.material = new FLineMaterial();
      }
      // info.effectCode = 'control';
      // info.effectCode = 'automatic';
      // material.ambientColor.set(1, 1, 1, 1);
   }
}