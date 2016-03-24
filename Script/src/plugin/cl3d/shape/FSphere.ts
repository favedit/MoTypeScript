import {DataArray} from '../../../runtime/common/lang/DataArray';
import {Outline3} from '../../../runtime/common/math/Outline3';
import {MathUtil} from '../../../runtime/common/math/MathUtil';
import {DrawModeEnum} from '../graphic/DrawModeEnum';
import {AttributeFormatEnum} from '../graphic/AttributeFormatEnum'
import {IndexStrideEnum} from '../graphic/IndexStrideEnum'
import {VertexBuffer} from '../graphic/VertexBuffer'
import {IndexBuffer} from '../graphic/IndexBuffer'
import {FMaterial} from '../../../runtime/graphic/material/FMaterial'
import {GraphicContext} from '../graphic/GraphicContext'
import {Renderable} from '../base/Renderable';
// import {EAttributeFormat} from '../../graphic/EAttributeFormat'

//==========================================================
// <T>渲染立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
export class FSphere extends Renderable {
   public vertexPositionBuffer: VertexBuffer = null;
   public vertexNormalBuffer: VertexBuffer = null;
   public vertexColorBuffer: VertexBuffer = null;
   public vertexCoordBuffer: VertexBuffer = null;
   public indexBuffer: IndexBuffer = null;
   //    //..........................................................
   //    // @attribute
   public outline = null;
   public drawModeCd = DrawModeEnum.Triangles;
   public splitCount = 8;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //o._material = MO.Class.create(MO.FE3dMaterial);
      //o._outline = new MO.SOutline3();
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup(context: GraphicContext) {
      // 计算坐标
      var countAngle = this.splitCount * 2;
      var countZ = this.splitCount;
      var vertexCount = this.vertexCount = (countZ + 1) * (countAngle + 1);
      var positionIndex = 0;;
      var positionData = new Float32Array(3 * vertexCount);
      var normalIndex = 0;;
      var normalData = new Float32Array(3 * vertexCount);
      var coordIndex = 0;;
      var coordData = new Float32Array(2 * vertexCount);
      var stepAngle = Math.PI * 2 / countAngle;
      var stepZ = Math.PI / countZ;
      for (var rz = 0; rz <= countZ; rz++) {
         for (var r = 0; r <= countAngle; r++) {
            var radius = stepAngle * r - Math.PI;
            var radiusZ = stepZ * rz - MathUtil.PI_2;
            var x = Math.sin(radius) * Math.cos(radiusZ);
            var y = Math.sin(radiusZ);
            var z = -Math.cos(radius) * Math.cos(radiusZ);
            positionData[positionIndex++] = x;
            positionData[positionIndex++] = y;
            positionData[positionIndex++] = z;
            normalData[normalIndex++] = x;
            normalData[normalIndex++] = y;
            normalData[normalIndex++] = z;
            coordData[coordIndex++] = radius / Math.PI / 2 + 0.5;
            coordData[coordIndex++] = radiusZ / Math.PI - 0.5;
         }
      }
      // 创建顶点位置缓冲
      var vertexPositionBuffer: VertexBuffer = this.vertexPositionBuffer = context.createVertexBuffer();
      vertexPositionBuffer.code = 'position';
      vertexPositionBuffer.formatCd = AttributeFormatEnum.Float3;
      vertexPositionBuffer.upload(positionData, 4 * 3, vertexCount);
      this.pushVertexBuffer(vertexPositionBuffer);
      // 创建顶点颜色缓冲
      var vertexNormalBuffer: VertexBuffer = this.vertexNormalBuffer = context.createVertexBuffer();
      vertexNormalBuffer.code = 'normal';
      vertexNormalBuffer.formatCd = AttributeFormatEnum.Float3;
      vertexNormalBuffer.upload(normalData, 4 * 3, vertexCount);
      this.pushVertexBuffer(vertexNormalBuffer);
      // 创建顶点纹理缓冲
      var vertexCoordBuffer: VertexBuffer = this.vertexCoordBuffer = context.createVertexBuffer();
      vertexCoordBuffer.code = 'coord';
      vertexCoordBuffer.formatCd = AttributeFormatEnum.Float2;
      vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
      this.pushVertexBuffer(vertexCoordBuffer);
      //..........................................................
      // 计算索引
      var drawModeCd = this.drawModeCd;
      var indexes: DataArray = new DataArray();
      for (var rz = 0; rz < countZ; rz++) {
         for (var r = 0; r < countAngle; r++) {
            var i = (countAngle + 1) * rz;
            var ci = i + r;
            var ni = i + r + (countAngle + 1);
            if (drawModeCd == DrawModeEnum.Lines) {
               indexes.push(ci, ni, ni, ci + 1, ci + 1, ci);
               indexes.push(ni, ni + 1, ni + 1, ci + 1, ci + 1, ni);
            } else {
               indexes.push(ci, ni, ci + 1);
               indexes.push(ni, ni + 1, ci + 1);
            }
         }
      }
      // 创建索引缓冲
      var buffer: IndexBuffer = this.indexBuffer = context.createIndexBuffer();
      buffer.drawModeCd = drawModeCd;
      var indexLength = indexes.length();
      var indexMemory = indexes.memory();
      if (indexLength > 65535) {
         buffer.strideCd = IndexStrideEnum.Uint32;
         buffer.upload(new Uint32Array(indexMemory), indexLength);
      } else {
         buffer.upload(new Uint16Array(indexMemory), indexLength);
      }
      this.pushIndexBuffer(buffer);
      //..........................................................
      // 更新处理
      //this.update();
      //..........................................................
      // 设置材质
      var material: FMaterial = this.material = new FMaterial();
      //var info = material.info;
      //info.effectCode = 'control';
      //info.optionDouble = true;
      //info.ambientColor.set(0.2, 0.2, 0.2, 1);
      //info.diffuseColor.set(0.8, 0.8, 0.8, 1);
      //info.specularColor.set(0.8, 0.8, 0.8, 1);
      //info.specularLevel = 64;
   }
}