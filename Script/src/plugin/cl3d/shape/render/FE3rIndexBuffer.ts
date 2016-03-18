import {FWglIndexBuffer} from '../../graphic/wgl/FWglIndexBuffer';

//==========================================================
// <T>渲染顶点缓冲。</T>
//
// @class
// @author maocy
// @history 150512
//==========================================================
export class FE3rIndexBuffer extends FWglIndexBuffer {
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