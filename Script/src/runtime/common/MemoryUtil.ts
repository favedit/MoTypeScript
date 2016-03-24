import {MemoryPoolEntry} from './MemoryPoolEntry';
import {MemoryPool} from './MemoryPool';
import {SingletonObject} from './lang/SingletonObject';
import {AssertUtil} from './AssertUtil';
import {RuntimeUtil} from './RuntimeUtil';

//==========================================================
// <T>内存管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class MemoryUtil extends SingletonObject {
   // 未使用节点
   protected static _entryUnused: MemoryPoolEntry = null;
   // 缓冲池
   protected static _pools: any = new Object();

   //============================================================
   // <T>内部收集一个节点。</T>
   //
   // @return 节点
   //============================================================
   public static entryAlloc(): MemoryPoolEntry {
      var entry: MemoryPoolEntry = null;
      var unused: MemoryPoolEntry = this._entryUnused;
      if (unused) {
         entry = unused;
         this._entryUnused = unused.next;
      } else {
         entry = new MemoryPoolEntry();
      }
      return entry;
   }

   //============================================================
   // <T>内部释放一个节点。</T>
   //
   // @param entry 节点
   //============================================================
   public static entryFree(entry: MemoryPoolEntry): void {
      AssertUtil.debugNotNull(entry);
      entry.next = this._entryUnused;
      this._entryUnused = entry;
   }

   //==========================================================
   // <T>收集一个类对象的实例。</T>
   //
   // @method
   // @param clazz:Function 类函数
   // @return Object 实例
   //==========================================================
   public static alloc(clazz: Function): any {
      // 获得类名
      AssertUtil.debugNotNull(clazz);
      var className: string = RuntimeUtil.className(clazz);
      // 获得缓冲池
      var pools: any = this._pools;
      var pool: MemoryPool = pools[className];
      if (!pool) {
         pool = new MemoryPool();
         pool.itemClass = clazz;
         pools[className] = pool;
      }
      // 创建对象
      var value = pool.alloc();
      return value;
   }

   //==========================================================
   // <T>释放一个实例。</T>
   //
   // @method
   // @param value:Object 实例
   //==========================================================
   public static free(value) {
      AssertUtil.debugNotNull(value);
      var pool = value.__pool;
      AssertUtil.debugNotNull(pool);
      pool.free(value);
   }

   //==========================================================
   // <T>强制释放当前内存中所有对象实例。</T>
   //
   // @method
   //==========================================================
   public static refresh() {
      eval('CollectGarbage()');
   }
}
