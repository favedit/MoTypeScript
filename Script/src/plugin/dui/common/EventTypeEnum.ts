//==========================================================
// <T>事件类型枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 141231
//==========================================================
export enum EventTypeEnum {
   // @attribute 未知
   Unknown = 0,
   // @attribute 构造
   Construct = 1,
   // @attribute 初始化
   Initialize = 2,
   // @attribute 可视化框架
   Build = 3,
   // @attribute 刷新
   Refresh = 4,
   // @attribute 改变大小
   Resize = 5,
   // @attribute 更改可视化
   Visible = 6,
   // @attribute 显示
   Show = 7,
   // @attribute 隐藏
   Hidden = 8,
   // @attribute 允许
   Enable = 9,
   // @attribute 禁止
   Disable = 10,
   // @attribute 释放
   Release = 11,
   // @attribute 设计
   Design = 12,
   // @attribute 命令
   Action = 13,
   // @attribute 校验
   Valid = 14,
   // @attribute 模式
   Mode = 15,
}
