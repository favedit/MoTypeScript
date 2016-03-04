import {RMemory} from '../RMemory';
import {RAssert} from '../RAssert';

//==========================================================
// <T>内存对象池。</T>
//
// @tool
// @author maocy
// @version 150523
//==========================================================
export class FMemoryPool {
   // @attribute
   _constructor = null;
   _unused = null;
   // @attribute
   _createCount = 0;
   _allocCount = 0;
   _freeCount = 0;

   //==========================================================
   // <T>收集一个自由对象。</T>
   //
   // @method
   // @return FObject 对象
   //==========================================================
   public alloc() {
      var o = this;
      var value = null;
      var unused = o._unused;
      if (unused) {
         value = unused.value;
         o._unused = unused.next;
         // 释放节点
         RMemory.entryFree(unused);
      } else {
         value = new o._constructor();
         value.__pool = o;
         o._createCount++;
      }
      o._allocCount++;
      return value;
   }

   //==========================================================
   // <T>释放 一个自由对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   public free(value) {
      var o = this;
      RAssert.debugNotNull(value);
      // 释放资源
      if (value.free) {
         value.free();
      }
      // 放回缓冲池
      var entry = RMemory.entryAlloc();
      entry.value = value;
      entry.next = o._unused;
      o._unused = entry;
      o._freeCount++;
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var entry = this._unused;
      while (entry) {
         var current = entry;
         entry = current.next;
         current.dispose();
         // 释放节点
         RMemory.entryFree(current);
      }
   }
}
