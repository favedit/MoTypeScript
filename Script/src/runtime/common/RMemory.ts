import {SMemoryPoolEntry} from './SMemoryPoolEntry';
import {TMemoryPool} from './TMemoryPool';
import {RSingleton} from './RSingleton';
import {RAssert} from './RAssert';
import {RRuntime} from './RRuntime';

//==========================================================
// <T>内存管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class RMemory extends RSingleton {
   // @attribute
   protected static _entryUnused: SMemoryPoolEntry = null;
   protected static _pools: any = new Object();

   //============================================================
   // <T>内部收集一个节点。</T>
   //
   // @return 节点
   //============================================================
   public static entryAlloc() {
      var entry = null;
      var unused: SMemoryPoolEntry = this._entryUnused;
      if (unused) {
         entry = unused;
         this._entryUnused = unused.next;
      } else {
         entry = new SMemoryPoolEntry();
      }
      return entry;
   }

   //============================================================
   // <T>内部释放一个节点。</T>
   //
   // @param entry 节点
   //============================================================
   public static entryFree(entry) {
      var o = this;
      RAssert.debugNotNull(entry);
      entry.next = o._entryUnused;
      o._entryUnused = entry;
   }

   //==========================================================
   // <T>收集一个类对象的实例。</T>
   //
   // @method
   // @param clazz:Function 类函数
   // @return Object 实例
   //==========================================================
   public static alloc(clazz) {
      // 获得类名
      RAssert.debugNotNull(clazz);
      var className = RRuntime.className(clazz);
      // 获得缓冲池
      var pools = this._pools;
      var pool = pools[className];
      if (!pool) {
         pool = new TMemoryPool();
         pool._constructor = clazz;
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
      RAssert.debugNotNull(value);
      var pool = value.__pool;
      RAssert.debugNotNull(pool);
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
