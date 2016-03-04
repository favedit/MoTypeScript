import {FError} from '../../../../runtime/common/lang/FError';
import {FObject} from '../../../../runtime/common/lang/FObject';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {RMath} from '../../../../runtime/common/math/RMath';

//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FG3dCamera extends FObject {
   // @attribute 变换矩阵
   //_matrix = MO.Class.register(o, new MO.AGetter('_matrix'));
   _matrix = null;
   // @attribute 相机位置
   //_position = MO.Class.register(o, new MO.AGetter('_position'));
   _position = null;
   _target = null;
   // @attribute 相机方向
   //_direction = MO.Class.register(o, new MO.AGetter('_direction'));
   _direction = null;
   _directionTarget = null;
   // @attribute 中心位置
   _centerFront = 0.6;
   _centerBack = 1.0;
   // @attribute 焦平面
   _focalNear = 0.1;
   _focalFar = 200.0;
   // @attribute 视截体
   //_frustum = MO.Class.register(o, new MO.AGetter('_frustum'));
   _frustum = null;
   //_planes = MO.Class.register(o, new MO.AGetter('_planes'));
   _planes = null;
   _viewport = null;
   // @attribute 轴线
   __axisUp = null;
   __axisX = null;
   __axisY = null;
   __axisZ = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super()
      // 初始化变量
      //o._matrix = new MO.SMatrix3d();
      //o._position = new MO.SPoint3();
      //o._target = new MO.SPoint3();
      //o._direction = new MO.SVector3();
      //o._directionTarget = new MO.SVector3();
      // 初始化变量
      //o._frustum = new MO.SFrustum();
      //o._planes = new MO.SFrustumPlanes();
      //o._viewport = MO.Class.create(MO.FG3dViewport);
      // 初始化变量
      //o.__axisUp = new MO.SVector3(0, 1, 0);
      //o.__axisX = new MO.SVector3();
      //o.__axisY = new MO.SVector3();
      //o.__axisZ = new MO.SVector3();
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
      this._position.set(x, y, z);
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
      var o = this;
      o._direction.set(x, y, z);
      o._directionTarget.set(x, y, z);
   }

   //==========================================================
   // <T>向前/向后移动</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doWalk(p) {
      var o = this;
      o._position.x += o._direction.x * p;
      o._position.z += o._direction.z * p;
   }

   //==========================================================
   // <T>向左/向右平移</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doStrafe(p) {
      var o = this;
      o._position.x += o.__axisY.x * p;
      o._position.z += o.__axisY.z * p;
   }

   //==========================================================
   // <T>向上/向下移动</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doFly(p) {
      var o = this;
      o._position.y += p;
   }

   //==========================================================
   // <T>向上/向下旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doPitch(p) {
      throw new FError(this, 'Unsupport.')
   }

   //==========================================================
   // <T>向左/向右旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doYaw(p) {
      throw new FError(this, 'Unsupport.')
   }

   //==========================================================
   // <T>向左/向右转向。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doRoll(p) {
      throw new FError(this, 'Unsupport.')
   }

   //==========================================================
   // <T>朝向目标。</T>
   //
   // @method
   //==========================================================
   public lookAt(x, y, z) {
      var o = this;
      var position = o._position;
      var direction = o._direction;
      o._target.set(x, y, z);
      direction.set(x - position.x, y - position.y, z - position.z);
      direction.normalize();
      o._directionTarget.assign(direction);
   }

   //==========================================================
   // <T>更新相机信息。</T>
   // <P>1. 更新空间矩阵。</P>
   // <P>2. 更新目标点。</P>
   //
   // @method
   //==========================================================
   public update() {
      var o = this;
      var axisX = o.__axisX;
      var axisY = o.__axisY;
      var axisZ = o.__axisZ;
      // 计算坐标轴
      axisZ.assign(o._direction);
      axisZ.normalize();
      o.__axisUp.cross2(axisX, axisZ);
      axisX.normalize();
      axisZ.cross2(axisY, axisX);
      axisY.normalize();
      // 计算矩阵
      var data = o._matrix.data();
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
      data[12] = -axisX.dotPoint3(o._position);
      data[13] = -axisY.dotPoint3(o._position);
      data[14] = -axisZ.dotPoint3(o._position);
      data[15] = 1.0;
   }

   //==========================================================
   // <T>更新相机视截体。</T>
   //
   // @method
   //==========================================================
   public updateFrustum() {
      var m = RMath.matrix;
      m.assign(this._matrix);
      //m.append(this._projection.matrix());
      this._planes.updateVision(m.data());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._matrix = RObject.dispose(this._matrix);
      // 父处理
      super.dispose();
   }
}
