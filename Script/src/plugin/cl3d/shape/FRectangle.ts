import {Renderable} from '../base/Renderable';
import {AttributeFormatEnum} from '../graphic/AttributeFormatEnum';

//==========================================================
// <T>渲染矩形。</T>
//  0 ─ 1
//  │  │
//  3 ─ 2
//
// @author maocy
// @history 141231
//==========================================================
export class FRectangle extends Renderable {
   // @attribute
   public _vertexPositionBuffer;
   public _vertexCoordBuffer;
   public _indexBuffer;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @param curve 线段
   // @param material 材质
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>设置信息。</T>
   //==========================================================
   public setup() {
      var context = this._graphicContext;
      // 设置顶点数据
      var vertexPositionData = [-1, 1, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0];
      var buffer = this._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(AttributeFormatEnum.Float3);
      buffer.upload(vertexPositionData, 4 * 2, 4);
      this.pushVertexBuffer(buffer);
      // 设置颜色数据
      //var vertexColorData = [255, 255, 255, 255, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
      //var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      //buffer.setCode('color');
      //buffer.setFormatCd(EAttributeFormat.Byte4Normal);
      //buffer.upload(vertexColorData, 4, 4);
      //o.pushVertexBuffer(buffer);
      // 设置纹理数据
      var vertexCoordData = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = this._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(AttributeFormatEnum.Float2);
      buffer.upload(vertexCoordData, 4 * 2, 4);
      this.pushVertexBuffer(buffer);
      // 设置索引数据
      var indexData = [0, 1, 2, 0, 2, 3];
      var buffer = this._indexBuffer = context.createIndexBuffer();
      buffer.upload(indexData, 6);
      this.pushIndexBuffer(buffer);
      // 设置纹理集合
      //this._textures = new MO.TDictionary();
      //this._material.info().optionDouble = true;
   }
}