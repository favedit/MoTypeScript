import {FObject} from './FObject'
import {FObjects} from './FObjects'
import {RObject} from './RObject'

//==========================================================
// <T>对象池。</T>
//
// @class
// @author maocy
// @version 150108
//==========================================================
export class FObjectPool extends FObject {
   // @attribute
   public _items = null;
   public _frees = null;
   // @attribute
   public _allocCount = 0;
   public _freeCount = 0;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._items = new FObjects();
      this._frees = new FObjects();
   }

   //==========================================================
   // <T>是否存在自由对象。</T>
   //
   // @method
   // @return Boolean 是否存在
   //==========================================================
   public hasFree(): boolean {
      return !this._frees.isEmpty();
   }

   //==========================================================
   // <T>收集一个自由对象。</T>
   //
   // @method
   // @return FObject 对象
   //==========================================================
   public alloc(): any {
      var item = null;
      if (!this._frees.isEmpty()) {
         item = this._frees.pop();
      }
      this._allocCount++;
      return item;
   }

   //==========================================================
   // <T>释放 一个自由对象。</T>
   //
   // @method
   // @param item:FObject 对象
   //==========================================================
   public free(item: any): void {
      this._frees.push(item);
      this._freeCount++;
   }

   //==========================================================
   // <T>增加一个对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   public push(item: any): void {
      this._items.push(item);
      this._frees.push(item);
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._items = RObject.dispose(this._items);
      this._frees = RObject.dispose(this._frees);
      super.dispose();
   }

   //==========================================================
   // <T>获取运行信息。</T>
   //
   // @method
   // @param result:TString 字符串
   // @param level:Integer 递归层次
   //==========================================================
   public innerDump(result, level) {
      result.append('Pool:');
      result.append('total=', this._items.count());
      result.append(', free=', this._frees.count());
      result.append(', alloc_count=', this._allocCount);
      result.append(', free_count=', this._freeCount);
   }
}
