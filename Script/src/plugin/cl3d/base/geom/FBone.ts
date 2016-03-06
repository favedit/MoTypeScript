import {FObject} from '../../../../runtime/common/lang/FObject';

//==========================================================
// <T>渲染区域。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FBone extends FObject {
   // @attribute
   protected _boneId = 0;
   protected _modeId = null;

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   // @param p:tick:Integer 时刻
   //==========================================================
   public update(p) {
      // 计算帧信息
      //SRs3dFrameInfo info;
      //_pTrackResource->CalculateFrameInfo(info, tick);
      //info.Update();
      // 计算矩阵
      //_matrix.Assign(_pTrackResource->MatrixInvert());
      //_matrix.Append(info.matrix);
      //return ESuccess;
   }
}
