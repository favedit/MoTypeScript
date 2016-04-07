//===========================================================
// 该类是一个定义单行状态的枚举类
//
// @enum
// @author maochunyang
// @version 1.0.1
//===========================================================
export class RowStatusEnum {
   // 行状态为普通，即该行当前无操作
   public static Normal: string = 'N';
   // 行状态为插入，即该行当前正在进行插入操作
   public static Insert: string = 'I';
   // 行状态为更新，即该行当前正在进行更新操作
   public static Update: string = 'U';
   // 行状态为删除，即该行当前正在进行删除操作
   public static Delete: string = 'D';
}
