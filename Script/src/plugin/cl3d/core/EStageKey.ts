import {KeyCodeEnum} from '../../../runtime/ui/KeyCodeEnum'

//===========================================================
// <T>按键代码枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
export class EStageKey {
   // @attribute Integer 前进
   public static Forward = KeyCodeEnum.W;
   // @attribute Integer 后退
   public static Back = KeyCodeEnum.S;
   // @attribute Integer 左转
   public static Up = KeyCodeEnum.Q;
   // @attribute Integer 右转
   public static Down = KeyCodeEnum.E;
   // @attribute Integer 左转
   public static RotationLeft = KeyCodeEnum.A;
   // @attribute Integer 右转
   public static RotationRight = KeyCodeEnum.D;
   // @attribute Integer 上转
   public static RotationUp = KeyCodeEnum.Z;
   // @attribute Integer 下转
   public static RotationDown = KeyCodeEnum.X;
   // @attribute 焦点对象
   public static FocusForward = KeyCodeEnum.I;
   public static FocusBack = KeyCodeEnum.K;
   public static FocusLeft = KeyCodeEnum.J;
   public static FocusRight = KeyCodeEnum.L;
}
