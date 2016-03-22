import {FObjects} from '../../common/lang/FObjects';
import {SPoint3} from '../../common/math/SPoint3';
import {SColor4} from '../../common/math/SColor4';
import {Vertex} from './Vertex';
import {Curve3} from './Curve3';

//==========================================================
// <T>路径。</T>
// <P>支持命令描述。</P>
//==========================================================
export class Path3 extends Curve3 {

   protected startVertex: Vertex;

   public vertexs: FObjects<Vertex>;

   public constructor() {
      super();
      this.vertexs = new FObjects<Vertex>();
   }

   public moveTo(x: number, y: number, z: number, r: number = 1, g: number = 1, b: number = 1, a: number = 1): void {
      var vertex = new Vertex(new SPoint3(x, y, z), new SColor4(r, g, b, a));
      this.moveToVertex(vertex);
   }

   public moveToVertex(vertex: Vertex): void {
      this.startVertex = vertex;
   }

   public lineTo(x: number, y: number, z: number, r: number = 1, g: number = 1, b: number = 1, a: number = 1): void {
      var vertex = new Vertex(new SPoint3(x, y, z), new SColor4(r, g, b, a));
      this.lineToVertex(vertex);
   }

   public lineToVertex(vertex: Vertex): void {
      this.vertexs.push(this.startVertex);
      this.vertexs.push(vertex);
      this.startVertex = vertex;
   }

   //==========================================================
   // <T>获得点集合。</T>
   //
   // @return 点集合
   //==========================================================
   public getVertexs(): FObjects<Vertex> {
      return this.vertexs;
   }
}