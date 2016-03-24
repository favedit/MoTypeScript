//==========================================================
// <T>渲染融合枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
export enum BlendModeEnum {
   // @member 0
   Zero = 0,
   // @member 1
   One = 1,
   // @member 来源颜色
   SrcColor = 2,
   // @member 1-来源颜色
   OneMinusSrcColor = 3,
   // @member 目标颜色
   DstColor = 4,
   // @member 1-目标颜色
   OneMinusDstColor = 5,
   // @member 来源透明
   SrcAlpha = 6,
   // @member 1-来源透明
   OneMinusSrcAlpha = 7,
   // @member 目标透明
   DstAlpha = 8,
   // @member 1-来源透明
   OneMinusDstAlpha = 9,
   // @member 透明渗透
   SrcAlphaSaturate = 10
}
