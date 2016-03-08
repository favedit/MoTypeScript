//==========================================================
// <T>对象编号管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class RObjectId {
   // 哈希值
   private static _hash: number = 1;

   // 编号集合
   private static _ids:any = new Object();

   //==========================================================
   // <T>获得下一个编号。</T>
   //
   // @method
   // @return Integer 编号
   //==========================================================
   public static nextHash() {
      return this._hash++;
   }

   //==========================================================
   // <T>获得下一个编号。</T>
   //
   // @param code 代码
   // @return Integer 编号
   //==========================================================
   public static nextId(code:string) {
      var id:number = this._ids[code];
      if(id == null){
         id = this._ids[code] = 1;
      }else{
         this._ids[code] = ++id;
      }
      return id;
   }
}
