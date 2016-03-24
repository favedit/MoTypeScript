import {FMaterial} from '../../runtime/graphic/material/FMaterial';
import {Renderable} from '../base/Renderable';
import {AttributeFormatEnum} from '../graphic/AttributeFormatEnum';
import {VertexBuffer} from '../graphic/VertexBuffer';
import {IndexBuffer} from '../graphic/IndexBuffer';

//==========================================================
// <T>渲染平面。</T>
//  0 ─ 1
//  │  │
//  3 ─ 2
//
// @author maocy
// @history 160324
//==========================================================
export class PlaneRenderable extends Renderable {
   // 顶点坐标缓冲
   protected _vertexPositionBuffer: VertexBuffer;
   // 顶点纹理缓冲
   protected _vertexCoordBuffer: VertexBuffer;
   // 索引缓冲
   protected _indexBuffer: IndexBuffer;

   //==========================================================
   // <T>构造处理。</T>
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
      var vertexPositionData = [-1, 1, 1, 1, 1, -1, -1, -1];
      var vertexPositionBuffer: VertexBuffer = this._vertexPositionBuffer = context.createVertexBuffer();
      vertexPositionBuffer.code = 'position';
      vertexPositionBuffer.formatCd = AttributeFormatEnum.Float2;
      vertexPositionBuffer.upload(vertexPositionData, 4 * 2, 4);
      this.pushVertexBuffer(vertexPositionBuffer);
      // 设置纹理数据
      var vertexCoordData = [0, 1, 1, 1, 1, 0, 0, 0];
      var vertexCoordBuffer: VertexBuffer = this._vertexCoordBuffer = context.createVertexBuffer();
      vertexCoordBuffer.code = 'coord';
      vertexCoordBuffer.formatCd = AttributeFormatEnum.Float2;
      vertexCoordBuffer.upload(vertexCoordData, 4 * 2, 4);
      this.pushVertexBuffer(vertexCoordBuffer);
      // 设置索引数据
      var indexData = [0, 1, 2, 0, 2, 3];
      var indexBuffer: IndexBuffer = this._indexBuffer = context.createIndexBuffer();
      indexBuffer.upload(indexData, 6);
      this.pushIndexBuffer(indexBuffer);
      // 设置纹理集合
      this.material = new FMaterial();
      //this._textures = new MO.TDictionary();
      //this._material.info().optionDouble = true;
   }
}