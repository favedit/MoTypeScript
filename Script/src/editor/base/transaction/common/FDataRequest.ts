import {FRequest} from '../FRequest';

//==========================================================
// <T>数据请求处理。</T>
//==========================================================
export class FDataRequest extends FRequest {
   public before = null;
   public after = null;
   public setter = null;
   public setterScope = null;

   //==========================================================
   // <T>创建处理。</T>
   //==========================================================
   public static create(before, after, setter, setterScope) {
      return new FDataRequest(before, after, setter, setterScope);
   };

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(before, after, setter, setterScope) {
      super();
      this.before = before;
      this.after = after;
      this.setter = setter;
      this.setterScope = setterScope;
   };

   //==========================================================
   // <T>撤销处理。</T>
   //==========================================================
   public onUndo(): void {
      this.setter.call(this.setterScope, this.before);
   }

   //==========================================================
   // <T>重做处理。</T>
   //==========================================================
   public onRedo(): void {
      this.setter.call(this.setterScope, this.after);
   }

   //==========================================================
   // <T>提交处理。</T>
   //==========================================================
   public onCommit(): void {
      this.setter.call(this.setterScope, this.after);
   }
}
