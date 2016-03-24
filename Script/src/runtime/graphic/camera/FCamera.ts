import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {Fatal} from '../../../runtime/common/lang/Fatal';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {SPoint3} from '../../../runtime/common/math/SPoint3';
import {SVector3} from '../../../runtime/common/math/SVector3';
import {SFrustum} from '../../../runtime/graphic/math/SFrustum';
import {RConst} from '../../../runtime/graphic/math/RConst';
import {SFrustumPlanes} from '../../../runtime/graphic/math/SFrustumPlanes';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {RMath} from '../../../runtime/common/math/RMath';
import {FViewport} from './FViewport';

//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FCamera extends ObjectBase {
   // @attribute 变换矩阵
   public matrix: SMatrix3d;
   // @attribute 相机位置
   public position: SPoint3;
   public target: SPoint3;
   // @attribute 相机方向
   public direction: SVector3;
   public directionTarget: SVector3;
   // @attribute 中心位置
   public centerFront = 0.6;
   public centerBack = 1.0;
   // @attribute 焦平面
   public focalNear = 0.1;
   public focalFar = 200.0;
   // @attribute 视截体
   public frustum: SFrustum;
   public planes: SFrustumPlanes;
   public viewport: FViewport;
   // @attribute 轴线
   protected _axisUp: SVector3;
   protected _axisX: SVector3;
   protected _axisY: SVector3;
   protected _axisZ: SVector3;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super()
      // 初始化变量
      this.matrix = new SMatrix3d();
      this.position = new SPoint3();
      this.target = new SPoint3();
      this.direction = new SVector3();
      this.directionTarget = new SVector3();
      // 初始化变量
      this.frustum = new SFrustum();
      this.planes = new SFrustumPlanes();
      this.viewport = RClass.create(FViewport);
      // 初始化变量
      this._axisUp = new SVector3(0, 1, 0);
      this._axisX = new SVector3();
      this._axisY = new SVector3();
      this._axisZ = new SVector3();
   }

   //==========================================================
   // <T>设置位置。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   public setPosition(x, y, z) {
      this.position.set(x, y, z);
   }

   //==========================================================
   // <T>设置方向。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   public setDirection(x, y, z) {
      this.direction.set(x, y, z);
      this.directionTarget.set(x, y, z);
   }

   //==========================================================
   // <T>向前/向后移动</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doWalk(p) {
      this.position.x += this.direction.x * p;
      this.position.z += this.direction.z * p;
   }

   //==========================================================
   // <T>向左/向右平移</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doStrafe(p) {
      this.position.x += this._axisY.x * p;
      this.position.z += this._axisY.z * p;
   }

   //==========================================================
   // <T>向上/向下移动</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doFly(p) {
      this.position.y += p;
   }

   //==========================================================
   // <T>向上/向下旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doPitch(p) {
      throw new Fatal(this, 'Unsupport.')
   }

   //==========================================================
   // <T>向左/向右旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doYaw(p) {
      throw new Fatal(this, 'Unsupport.')
   }

   //==========================================================
   // <T>向左/向右转向。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doRoll(p) {
      throw new Fatal(this, 'Unsupport.')
   }

   //==========================================================
   // <T>朝向目标。</T>
   //
   // @method
   //==========================================================
   public lookAt(x, y, z) {
      var position = this.position;
      var direction = this.direction;
      this.target.set(x, y, z);
      direction.set(x - position.x, y - position.y, z - position.z);
      direction.normalize();
      this.directionTarget.assign(direction);
   }

   //==========================================================
   // <T>更新相机信息。</T>
   // <P>1. 更新空间矩阵。</P>
   // <P>2. 更新目标点。</P>
   //
   // @method
   //==========================================================
   public update() {
      var axisX = this._axisX;
      var axisY = this._axisY;
      var axisZ = this._axisZ;
      // 计算坐标轴
      axisZ.assign(this.direction);
      axisZ.normalize();
      this._axisUp.cross2(axisX, axisZ);
      axisX.normalize();
      axisZ.cross2(axisY, axisX);
      axisY.normalize();
      // 计算矩阵
      var data = this.matrix.data();
      data[0] = axisX.x;
      data[1] = axisY.x;
      data[2] = axisZ.x;
      data[3] = 0.0;
      data[4] = axisX.y;
      data[5] = axisY.y;
      data[6] = axisZ.y;
      data[7] = 0.0;
      data[8] = axisX.z;
      data[9] = axisY.z;
      data[10] = axisZ.z;
      data[11] = 0.0;
      data[12] = -axisX.dotPoint3(this.position);
      data[13] = -axisY.dotPoint3(this.position);
      data[14] = -axisZ.dotPoint3(this.position);
      data[15] = 1.0;
   }

   //==========================================================
   // <T>更新相机视截体。</T>
   //
   // @method
   //==========================================================
   public updateFrustum() {
      var matrix = RConst.matrix;
      matrix.assign(this.matrix);
      //m.append(this._projection.matrix());
      this.planes.updateVision(matrix.data());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this.matrix = ObjectUtil.dispose(this.matrix);
      // 父处理
      super.dispose();
   }
}
