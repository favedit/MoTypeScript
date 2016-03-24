import {ObjectBase} from '../../../../runtime/common/lang/ObjectBase';
import {ObjectUtil} from '../../../../runtime/common/lang/ObjectUtil';
import {Quaternion} from '../../../../runtime/common/math/Quaternion';
import {Vector3} from '../../../../runtime/common/math/Vector3';
import {Point3} from '../../../../runtime/common/math/Point3';
import {SMatrix3d} from '../../../../runtime/graphic/math/SMatrix3d';

//==========================================================
// <T>渲染跟踪球。</T>
//
// @author maocy
// @history 151006
//==========================================================
export class FTrackBall extends ObjectBase {
   // @attribute
   //_matrix = MO.Class.register(o, new MO.AGetter('_matrix'));
   _matrix = new SMatrix3d();
   // @attribute
   //_rotation = MO.Class.register(o, new MO.AGetter('_rotation'));
   _rotation = new Quaternion();
   //_axis = MO.Class.register(o, new MO.AGetter('_axis'));
   _axis = new Vector3();
   // @attribute
   //_angularVelocity = MO.Class.register(o, new MO.AGetter('_angularVelocity'));
   _angularVelocity = null;
   _lastPosition = new Point3();

   //==========================================================
   // <T>设置位置。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   public move(x, y) {
      //var lastPos3D = new MO.SVector3(o._lastPosition.x, o._lastPosition.y, 0);
      //QVector3D lastPos3D = QVector3D(m_lastPos.x(), m_lastPos.y(), 0.0f);
      //float sqrZ = 1 - QVector3D::dotProduct(lastPos3D, lastPos3D);
      //if (sqrZ > 0)
      //    lastPos3D.setZ(sqrt(sqrZ));
      //else
      //    lastPos3D.normalize();
      //QVector3D currentPos3D = QVector3D(p.x(), p.y(), 0.0f);
      //sqrZ = 1 - QVector3D::dotProduct(currentPos3D, currentPos3D);
      //if (sqrZ > 0)
      //    currentPos3D.setZ(sqrt(sqrZ));
      //else
      //    currentPos3D.normalize();
      //m_axis = QVector3D::crossProduct(lastPos3D, currentPos3D);
      //float angle = 180 / PI * asin(sqrt(QVector3D::dotProduct(m_axis, m_axis)));
      //m_axis.normalize();
      //m_rotation = QQuaternion::fromAxisAndAngle(m_axis, angle) * m_rotation;
      //m_lastPos = p;
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
      /*var axisX = o.__axisX;
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
      data[15] = 1.0;*/
   }

   //==========================================================
   // <T>更新相机视截体。</T>
   //
   // @method
   //==========================================================
   public updateFrustum() {
      //var o = this;
      //var m = MO.Lang.Math.matrix;
      //m.assign(o._matrix);
      //m.append(o._projection.matrix());
      //o._planes.updateVision(m.data());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._matrix = ObjectUtil.dispose(this._matrix);
      // 父处理
      super.dispose();
   }
}
