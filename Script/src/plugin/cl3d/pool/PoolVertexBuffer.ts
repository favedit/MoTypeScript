import {WglVertexBuffer} from '../graphic/wgl/WglVertexBuffer';

//==========================================================
// <T>渲染顶点缓冲。</T>
//
// @class
// @author maocy
// @history 150512
//==========================================================
export class PoolVertexBuffer extends WglVertexBuffer {
   // 资源对象
   public resource: any = null;

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.resource = null;
      super.dispose();
   }
}