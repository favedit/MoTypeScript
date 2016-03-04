import {RMatrix} from '../../../../runtime/common/math/RMatrix';
import {FG3dProjection} from './FG3dProjection';

//==========================================================
// <T>渲染正交投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dOrthoProjection extends FG3dProjection {
   //============================================================
   // <T>更新矩阵。</T>
   //
   // @method
   //============================================================
   public update() {
      var o = this;
      var size = o._size;
      var left = -size.width * 0.5;
      var top = -size.height * 0.5;
      RMatrix.orthoLH(o._matrix, left, top, size.width, size.height, o._znear, o._zfar);
   }

   //============================================================
   // <T>根据视截体更新矩阵。</T>
   //
   // @method
   // @param frustum:SFrustum 视截体
   //============================================================
   public updateFrustum(frustum) {
      var o = this;
      o._znear = frustum.minZ;
      o._zfar = frustum.maxZ;
      o.update();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      super.dispose();
   }
}
