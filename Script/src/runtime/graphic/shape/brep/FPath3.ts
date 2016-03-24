import {Objects} from '../../common/lang/Objects';
import {SPoint3} from '../../common/math/SPoint3';
import {SColor4} from '../../common/math/SColor4';
import {SVertex} from './SVertex';
import {FCurve3} from './FCurve3';

//==========================================================
// <T>路径。</T>
// <P>支持命令描述。</P>
//==========================================================
export class FPath3 extends FCurve3 {

   protected startVertex: SVertex;

   public vertexs: Objects<SVertex>;

   public constructor() {
      super();
      this.vertexs = new Objects<SVertex>();
   }

   public moveTo(x: number, y: number, z: number, r: number = 1, g: number = 1, b: number = 1, a: number = 1): void {
      var vertex = new SVertex(new SPoint3(x, y, z), new SColor4(r, g, b, a));
      this.moveToVertex(vertex);
   }

   public moveToVertex(vertex: SVertex): void {
      this.startVertex = vertex;
   }

   public lineTo(x: number, y: number, z: number, r: number = 1, g: number = 1, b: number = 1, a: number = 1): void {
      var vertex = new SVertex(new SPoint3(x, y, z), new SColor4(r, g, b, a));
      this.lineToVertex(vertex);
   }

   public lineToVertex(vertex: SVertex): void {
      this.vertexs.push(this.startVertex);
      this.vertexs.push(vertex);
      this.startVertex = vertex;
   }

   //==========================================================
   // <T>获得点集合。</T>
   //
   // @return 点集合
   //==========================================================
   public getVertexs(): Objects<SVertex> {
      return this.vertexs;
   }
}