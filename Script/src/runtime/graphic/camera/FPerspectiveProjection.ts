import {RMatrix} from '../../../runtime/graphic/math/RMatrix';
import {RMath} from '../../../runtime/common/math/RMath';
import {FProjection} from './FProjection';

//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FPerspectiveProjection extends FProjection {
   //============================================================
   // <T>更新矩阵。</T>
   //
   // @method
   //============================================================
   public update() {
      var size = this.size;
      this.fieldOfView = RMath.DEGREE_RATE * this.angle;
      RMatrix.perspectiveFieldOfViewLH(this.matrix, this.fieldOfView, size.width / size.height, this.znear, this.zfar);
   }

   //============================================================
   // <T>根据视截体更新矩阵。</T>
   //
   // @method
   // @param p:frustum:SFrustum 视截体
   //============================================================
   public updateFrustum(p) {
      this.znear = p.minZ;
      this.zfar = p.maxZ;
      this.update();
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