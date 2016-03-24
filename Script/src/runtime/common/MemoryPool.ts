import {MemoryPoolEntry} from './MemoryPoolEntry';
import {AssertUtil} from './AssertUtil';
import {MemoryUtil} from './MemoryUtil';

//==========================================================
// <T>内存对象池。</T>
//
// @tool
// @author maocy
// @version 150523
//==========================================================
export class MemoryPool {
   // 未使用节点
   protected _unused: MemoryPoolEntry = null;
   // 构造器
   public itemClass: Function = null;
   // 创建个数
   public createCount: number = 0;
   // 收集个数
   public allocCount: number = 0;
   // 自由个数
   public freeCount: number = 0;

   //==========================================================
   // <T>收集一个自由对象。</T>
   //
   // @method
   // @return 对象
   //==========================================================
   public alloc(): any {
      var value: any = null;
      var unused: MemoryPoolEntry = this._unused;
      if (unused) {
         value = unused.value;
         this._unused = unused.next;
         // 释放节点
         MemoryUtil.entryFree(unused);
      } else {
         value = new (this.itemClass as any)();
         value.__pool = this;
         this.createCount++;
      }
      this.allocCount++;
      return value;
   }

   //==========================================================
   // <T>释放 一个自由对象。</T>
   //
   // @method
   // @param 对象
   //==========================================================
   public free(value: any): void {
      AssertUtil.debugNotNull(value);
      // 释放资源
      if (value.free) {
         value.free();
      }
      // 放回缓冲池
      var entry: MemoryPoolEntry = MemoryUtil.entryAlloc();
      entry.value = value;
      entry.next = this._unused;
      this._unused = entry;
      this.freeCount++;
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var entry: MemoryPoolEntry = this._unused;
      while (entry) {
         var current: MemoryPoolEntry = entry;
         entry = current.next;
         current.dispose();
         // 释放节点
         MemoryUtil.entryFree(current);
      }
   }
}
