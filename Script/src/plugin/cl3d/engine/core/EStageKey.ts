import {EKeyCode} from '../../../../runtime/ui/EKeyCode'

//===========================================================
// <T>按键代码枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
export class EStageKey {
    // @attribute Integer 前进
    public static Forward = EKeyCode.W;
    // @attribute Integer 后退
    public static Back = EKeyCode.S;
    // @attribute Integer 左转
    public static Up = EKeyCode.Q;
    // @attribute Integer 右转
    public static Down = EKeyCode.E;
    // @attribute Integer 左转
    public static RotationLeft = EKeyCode.A;
    // @attribute Integer 右转
    public static RotationRight = EKeyCode.D;
    // @attribute Integer 上转
    public static RotationUp = EKeyCode.Z;
    // @attribute Integer 下转
    public static RotationDown = EKeyCode.X;
    // @attribute 焦点对象
    public static FocusForward = EKeyCode.I;
    public static FocusBack = EKeyCode.K;
    public static FocusLeft = EKeyCode.J;
    public static FocusRight = EKeyCode.L;
}
