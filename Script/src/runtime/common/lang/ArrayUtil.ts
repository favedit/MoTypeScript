import {AssertUtil} from '../AssertUtil';

//==========================================================
// <T>数组操作的工具类</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class ArrayUtil {
   public static array1 = new Array(1);
   public static array2 = new Array(2);
   public static array3 = new Array(3);
   public static array4 = new Array(4);
   public static array9 = new Array(9);
   public static array12 = new Array(12);
   public static array16 = new Array(16);

   //==========================================================
   // <T>判断数组内所有内容是否全部相同。</T>
   //
   // @param source 源数组
   // @param target 目标数组
   // @return 是否相等
   //==========================================================
   public static equals(source: Array<any>, target: Array<any>): boolean {
      if (source && target) {
         if (source.length == target.length) {
            var length = source.length;
            for (var i = 0; i < length; i++) {
               if (source[i] != target[i]) {
                  return false;
               }
            }
            return true;
         }
      }
      return false;
   }

   //==========================================================
   // <T>取得对象内的所有数据的总数。</T>
   //
   // @param value 对象
   // @return 数据总数
   //==========================================================
   public static count(value) {
      var count = 0;
      for (var name in value) {
         count++;
      }
      return count;
   }

   //==========================================================
   // <T>判断数组中是否含有指定的对象。</T>
   //
   // @param array 数组对象
   // @param value 对象名
   // @return 是否含有
   //==========================================================
   public static contains(array: Array<any>, value: any): boolean {
      var length = array.length;
      for (var i = 0; i < length; i++) {
         if (array[i] == value) {
            return true;
         }
      }
      return false;
   }

   //==========================================================
   // <T>在数组中查找指定对象的索引位置，没找到返回-1。</T>
   //
   // @param array 数组对象
   // @param value 对象名
   // @return 索引位置
   //==========================================================
   public static find(array: Array<any>, value: any): number {
      var length = array.length;
      for (var i = 0; i < length; i++) {
         if (array[i] == value) {
            return i;
         }
      }
      return -1;
   }

   //==========================================================
   // <T>在数组中查找指定对象的名称，并把名称返回，没找到返回空。</T>
   //
   // @param array 数组对象
   // @param value 对象名
   // @return 没有找到返回空
   //==========================================================
   public static search(array: Array<any>, value: any): string {
      for (var index in array) {
         if (array[index] == value) {
            return index;
         }
      }
      return null;
   }

   //==========================================================
   // <T>对数组内的元素反向排列。</T>
   //
   // @param array 数组对象
   // @param start 开始位置
   // @param end 结束位置
   //==========================================================
   public static reverse(array: Array<any>, start: number, end: number) {
      var count = (end + 1 - start) >> 1;
      for (var i = 0; i < count; i++) {
         var value = array[start + i];
         array[start + i] = array[end - i];
         array[end - i] = value;
      }
   }

   //==========================================================
   // <T>复制数组的内容。</T>
   //
   // @param source 来源数组
   // @param sourceOffset 来源位置
   // @param sourceCount 来源长度
   // @param target 目标数组
   // @param targetOffset 目标位置
   //==========================================================
   public static copy(source: Array<any>, sourceOffset: number, sourceCount: number, target: Array<any>, targetOffset: number) {
      AssertUtil.debugNotNull(source);
      AssertUtil.debugTrue((sourceOffset >= 0) && (sourceOffset + sourceCount <= source.length));
      AssertUtil.debugTrue(sourceCount <= source.length);
      AssertUtil.debugNotNull(target);
      AssertUtil.debugTrue((targetOffset >= 0) && (targetOffset + sourceCount <= target.length));
      for (var i = 0; i < sourceCount; i++) {
         target[i + targetOffset] = source[i + sourceOffset];
      }
      return target;
   }

   //==========================================================
   // <T>复制数组中的一部分内容到指定位置。</T>
   //
   // @param array 数组对象
   // @param offset 开始位置
   // @param count 复制总数
   // @param target 目标位置
   //==========================================================
   public static move(array: Array<any>, offset: number, count: number, target: number) {
      if (offset > target) {
         for (var i = 0; i < count; i++) {
            array[target - i] = array[offset + i];
         }
      } else if (offset < target) {
         for (var i = 0; i < count; i++) {
            array[target + count - i - 1] = array[offset + count - i - 1];
         }
      }
   }

   //==========================================================
   // <T>删除数组中指定位置的一个对象。</T>
   //
   // @param array 数组对象
   // @param index 索引位置
   // @return 删除后的数组对象
   //==========================================================
   public static remove(array: Array<any>, index: number) {
      return array.slice(0, index).concat(array.slice(index + 1));
   }

   //==========================================================
   // <T>数组的部分排序。</T>
   //
   // @param array 数组对象
   // @param left 左边位置
   // @param right 右边位置
   // @return 排序结束位置
   //==========================================================
   public static sortPartition(array: Array<any>, left: number, right: number) {
      var start = left;
      var end = right + 1;
      var first = array[start];
      while (true) {
         while (array[++start] < first) {
         }
         while (array[--end] > first) {
         }
         if (start > end) {
            break;
         }
         var value = array[start];
         array[start] = array[end];
         array[end] = value;
      }
      array[left] = array[end];
      array[end] = first;
      return end;
   }

   //==========================================================
   // <T>对数组进行排序。</T>
   //
   // @param array 数组对象
   // @param start 开始位置
   // @param end 结束位置
   //==========================================================
   public static sortArray(array: Array<any>, start: number, end: number) {
      if (start < end) {
         var index = this.sortPartition(array, start, end);
         this.sortArray(array, start, index - 1);
         this.sortArray(array, index + 1, end);
      }
   }

   //==========================================================
   // <T>对数组进行排序。</T>
   //
   // @param array 数组对象
   // @param type 顺序
   //==========================================================
   public static sort(array: Array<any>, type: boolean) {
      var count = array.length - 1;
      this.sortArray(array, 0, count);
      if (type) {
         this.reverse(array, 0, count);
      }
      return array;
   }

   //==========================================================
   // <T>取得对象内的最长的属性名称的长度。</T>
   //
   // @param value 对象
   // @return 字符串长度
   //==========================================================
   public static nameMaxLength(value: any): number {
      var length = 0;
      for (var name in value) {
         var nameLength: number = name.length;
         if (length < nameLength) {
            length = nameLength;
         }
      }
      return length;
   }
}
