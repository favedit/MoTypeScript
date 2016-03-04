import {FDataView} from './FDataView'

//==========================================================
// <T>字节数组。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class FBytes extends FDataView {
   //..........................................................
   // @attribute
   //_memory = MO.Class.register(o, new MO.AGetter('_memory'));
   protected _memory: ArrayBuffer = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   //==========================================================
   public constructor(memory: any = null) {
      super();
      if (!memory) {
         memory = new (ArrayBuffer as any)();
      }
      this.link(memory)
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @param data:Array 数组
   //==========================================================
   public link(data: ArrayBuffer) {
      this._memory = data;
      this._viewer = new DataView(data);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @author maocy
   //==========================================================
   public dispose() {
      this._memory = null;
      this._viewer = null;
      super.dispose();
   }
}
