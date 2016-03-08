//==========================================================
// <T>单件基类。</T>
//
// @reference
// @author maocy
// @version 150603
//==========================================================
export class RSingleton {
   // 标志
   protected static _singleton: boolean = true;
   // 实例
   protected static _instance: any = null;

   //==========================================================
   // <T>获得实例。</T>
   //
   // @return 实例
   //==========================================================
   public static instance(): any {
      var instance = this._instance;
      if (!instance) {
         instance = new (this as any).constructor();
      }
      return instance;
   }
}
