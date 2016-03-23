import {SPoint3} from '../../../common/math/SPoint3';
import {SPoint2} from '../../../common/math/SPoint2';
import {SVector3} from '../../../common/math/SVector3';
import {SFace3} from '../../math/SFace3';
import {FGeometry} from '../brep/FGeometry';

//==========================================================
// <T>盒子几何体。</T>
//==========================================================
export class BoxGeometry extends FGeometry {
   // 参数集合
   public parameters: any;
   public widthSegments: number;
   public heightSegments: number;
   public depthSegments: number;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.type = 'BoxGeometry';
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(width: number = 1, height: number = 1, depth: number = 1, widthSegments: number = 1, heightSegments: number = 1, depthSegments: number = 1) {
      this.parameters = {
         width: width,
         height: height,
         depth: depth,
         widthSegments: widthSegments,
         heightSegments: heightSegments,
         depthSegments: depthSegments
      };
      this.widthSegments = widthSegments;
      this.heightSegments = heightSegments;
      this.depthSegments = depthSegments;
      // 建立平面
      var widthHalf = width / 2;
      var heightHalf = height / 2;
      var depthHalf = depth / 2;
      this.buildPlane('z', 'y', - 1, - 1, depth, height, widthHalf, 0);
      this.buildPlane('z', 'y', 1, - 1, depth, height, - widthHalf, 1);
      this.buildPlane('x', 'z', 1, 1, width, depth, heightHalf, 2);
      this.buildPlane('x', 'z', 1, - 1, width, depth, - heightHalf, 3);
      this.buildPlane('x', 'y', 1, - 1, width, height, depthHalf, 4);
      this.buildPlane('x', 'y', - 1, - 1, width, height, - depthHalf, 5);
      // 合并顶点
      this.mergeVertices();
   }

   //============================================================
   // <T>建立平面。</T>
   //============================================================
   public buildPlane(u, v, udir, vdir, width, height, depth, materialIndex) {
      var widthHalf = width / 2;
      var heightHalf = height / 2;
      var gridX = this.widthSegments;
      var gridY = this.heightSegments;
      var offset = this.vertices.length;
      var w = null;
      if ((u === 'x' && v === 'y') || (u === 'y' && v === 'x')) {
         w = 'z';
      } else if ((u === 'x' && v === 'z') || (u === 'z' && v === 'x')) {
         w = 'y';
         gridY = this.depthSegments;
      } else if ((u === 'z' && v === 'y') || (u === 'y' && v === 'z')) {
         w = 'x';
         gridX = this.depthSegments;
      }
      var gridX1 = gridX + 1;
      var gridY1 = gridY + 1;
      var segmentWidth = width / gridX;
      var segmentHeight = height / gridY;
      var normal = new SVector3();
      normal[w] = depth > 0 ? 1 : - 1;
      // 建立顶点
      for (var iy = 0; iy < gridY1; iy++) {
         for (var ix = 0; ix < gridX1; ix++) {
            var vector = new SPoint3();
            vector[u] = (ix * segmentWidth - widthHalf) * udir;
            vector[v] = (iy * segmentHeight - heightHalf) * vdir;
            vector[w] = depth;
            this.vertices.push(vector);
         }
      }
      // 生成面信息
      for (var iy: number = 0; iy < gridY; iy++) {
         for (var ix: number = 0; ix < gridX; ix++) {
            var a = ix + gridX1 * iy;
            var b = ix + gridX1 * (iy + 1);
            var c = (ix + 1) + gridX1 * (iy + 1);
            var d = (ix + 1) + gridX1 * iy;
            var uva = new SPoint2(ix / gridX, 1 - iy / gridY);
            var uvb = new SPoint2(ix / gridX, 1 - (iy + 1) / gridY);
            var uvc = new SPoint2((ix + 1) / gridX, 1 - (iy + 1) / gridY);
            var uvd = new SPoint2((ix + 1) / gridX, 1 - iy / gridY);
            var face = new SFace3(a + offset, b + offset, d + offset);
            face.normal.assign(normal);
            face.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());
            face.materialIndex = materialIndex;
            this.faces.push(face);
            this.faceVertexUvs[0].push([uva, uvb, uvd]);
            face = new SFace3(b + offset, c + offset, d + offset);
            face.normal.assign(normal);
            face.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());
            face.materialIndex = materialIndex;
            this.faces.push(face);
            this.faceVertexUvs[0].push([uvb.clone(), uvc, uvd.clone()]);
         }
      }
   }
}
