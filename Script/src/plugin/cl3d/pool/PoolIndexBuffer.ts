import {WglIndexBuffer} from '../graphic/wgl/WglIndexBuffer';

//==========================================================
// <T>渲染顶点缓冲。</T>
//
// @class
// @author maocy
// @history 150512
//==========================================================
export class PoolIndexBuffer extends WglIndexBuffer {
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