import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {Fatal} from '../../../runtime/common/lang/Fatal';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {Point3} from '../../../runtime/common/math/Point3';
import {Vector3} from '../../../runtime/common/math/Vector3';
import {SFrustum} from '../../../runtime/graphic/math/SFrustum';
import {RConst} from '../../../runtime/graphic/math/RConst';
import {SFrustumPlanes} from '../../../runtime/graphic/math/SFrustumPlanes';
import {Matrix3d} from '../../../runtime/graphic/math/Matrix3d';
import {MathUtil} from '../../../runtime/common/math/MathUtil';
import {Viewport} from './Viewport';

//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class Camera extends ObjectBase {
   // @attribute 变换矩阵
   public matrix: Matrix3d;
   // @attribute 相机位置
   public position: Point3;
   public target: Point3;
   // @attribute 相机方向
   public direction: Vector3;
   public directionTarget: Vector3;
   // @attribute 中心位置
   public centerFront = 0.6;
   public centerBack = 1.0;
   // @attribute 焦平面
   public focalNear = 0.1;
   public focalFar = 200.0;
   // @attribute 视截体
   public frustum: SFrustum;
   public planes: SFrustumPlanes;
   public viewport: Viewport;
   // @attribute 轴线
   protected _axisUp: Vector3;
   protected _axisX: Vector3;
   protected _axisY: Vector3;
   protected _axisZ: Vector3;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super()
      // 初始化变量
      this.matrix = new Matrix3d();
      this.position = new Point3();
      this.target = new Point3();
      this.direction = new Vector3();
      this.directionTarget = new Vector3();
      // 初始化变量
      this.frustum = new SFrustum();
      this.planes = new SFrustumPlanes();
      this.viewport = ClassUtil.create(Viewport);
      // 初始化变量
      this._axisUp = new Vector3(0, 1, 0);
      this._axisX = new Vector3();
      this._axisY = new Vector3();
      this._axisZ = new Vector3();
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
