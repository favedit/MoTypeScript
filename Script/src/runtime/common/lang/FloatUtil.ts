import {StringBuffer} from './StringBuffer';
import {StringUtil} from './StringUtil';

//==========================================================
// <T>浮点数管理类。</T>
//
// @reference
// @author maocy
// @version 150131
//==========================================================
export class FloatUtil {
   //..........................................................
   // @define
   public static Chars = '0123456789-.%';
   public static NUMBER = '0123456789-.%';
   public static PAD_CHAR = '0';

   //===========================================================
   // <T>判断内容是否为浮点数。</T>
   //
   // @method
   // @param p:value:String 内容
   // @return 是否为浮点数
   //===========================================================
   public static isFloat(p) {
      return StringUtil.isPattern(p, 'n');
   }

   //===========================================================
   // <T>解析字符串为浮点数。</T>
   //
   // @method
   // @param source:String 内容
   // @return Number 浮点数
   //===========================================================
   public static parse(source) {
      // 检查参数
      if (source == null) {
         return 0;
      }
      if (source == '') {
         return 0;
      }
      // 去掉开始0字符
      var value = StringUtil.trim(source.toString());
      if (value == null) {
         return 0;
      }
      while (true) {
         if (value.charAt(0) != "0") {
            break;
         }
         value = value.substr(1);
      }
      // 获得内容
      var result = (value.length > 0) ? parseFloat(value) : 0;
      // 百分比处理
      if (StringUtil.findChars(result, '%') != -1) {
         result = result / 100;
      }
      // 返回内容
      return isNaN(result) ? 0 : result;
   }

   //===========================================================
   // <T>格式化浮点数为指定格式。</T>
   //
   // @method
   // @param value:Number 浮点数
   // @param leftLength:Number 小数点左侧位数
   // @param leftPad:String 小数点左侧补足字符
   // @param rightLength:Number 小数点右侧位数
   // @param rightPad:String 小数点右侧补足字符
   // @return String 浮点数
   //===========================================================
   public static format(value, leftLength: number = 0, leftPad: string = null, rightLength: number = null, rightPad: string = null) {
      // 检查参数
      if (value == null) {
         return '';
      }
      if (leftPad == null) {
         leftPad = this.PAD_CHAR;
      }
      if (rightLength == null) {
         rightLength = 6;
      }
      if (rightPad == null) {
         rightPad = this.PAD_CHAR;
      }
      // 分割内容
      var leftSource = null;
      var rightSource = null;
      var text = value.toString();
      var index = text.indexOf('.');
      if (index == -1) {
         leftSource = text;
         rightSource = '';
      } else {
         leftSource = text.substring(0, index);
         rightSource = text.substring(index + 1, index + rightLength + 1);
      }
      var left = StringUtil.lpad(leftSource, leftLength, leftPad);
      var right = StringUtil.rpad(rightSource, rightLength, rightPad);
      return left + '.' + right;
   }

   //==========================================================
   // <T>格式化浮点数为指定格式字符串。</T>
   //
   // @method
   // @param parttern:value:String 显示字符格式
   // @param value:String 字符串
   // @return String 字符串
   //==========================================================
   public static formatParttern(value, parttern) {
      // 判断是否为数字
      var floatVal = parseFloat(value);
      if (!isNaN(floatVal) && isFinite(value)) {
         var partternStr = parttern.toString();
         var partternLe = partternStr.length;
         var indexOf = partternStr.indexOf(".");
         var after = partternLe - indexOf - 1;
         var str = '';
         var string = null;
         var round = Math.round(floatVal * Math.pow(10, after)) / Math.pow(10, after);
         var roundStr = round.toString();
         var roundLe = roundStr.length;
         var roundIndex = roundStr.indexOf(".");
         var roundAfter = roundLe - roundIndex - 1;
         var poor = after - roundAfter;
         if (indexOf != -1) {
            if (roundIndex == -1) {
               for (var i = 0; i < after; i++) {
                  str += '0';
               }
               string = round + '.' + str;
            } else {
               if (after == roundAfter) {
                  string = round;
               } else {
                  for (var i = 0; i < poor; i++) {
                     str += '0';
                  }
                  string = round + str;
               }
            }
         } else {
            string = Math.round(round);
         }
         return string;
      }
   }

   //===========================================================
   // <T>格式化浮点数为指定格式。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param l:leftLength:Number 小数点左侧位数
   // @param lp:leftPad:String 小数点左侧补足字符
   // @param r:rightLength:Number 小数点右侧位数
   // @param rp:rightPad:String 小数点右侧补足字符
   // @param divide:rightPad:Number 除数
   // @param unit:rightPad:String 单位
   // @return String 浮点数
   //===========================================================
   public static unitFormat(v, l, lp, r, rp, divide, unit) {
      var o = this;
      // 校正参数
      if (l == null) {
         l = 0;
      }
      if (lp == null) {
         lp = o.PAD_CHAR;
      }
      if (r == null) {
         r = 6;
      }
      if (rp == null) {
         rp = o.PAD_CHAR;
      }
      if (divide == null || unit == null) {
         divide = 1;
         unit = '';
      }
      v /= divide;
      // 分割内容
      var s = v.toString();
      var f = s.indexOf('.');
      var sr = '';
      if (f == -1) {
         var sl = s;
      } else {
         var sl = s.substring(0, f);
         sr = s.substring(f + 1, f + r + 1);
      }
      var fl = StringUtil.lpad(sl, l, lp);
      var flc: StringBuffer = new StringBuffer();
      //插入逗号
      for (var i = 1; i - 1 < fl.length; i++) {
         flc.append(fl.substring(i - 1, i));
         if (fl.length - i > 0 && (fl.length - i) % 3 == 0) {
            flc.append(',');
         }
      }
      var fr = StringUtil.rpad(sr, r, rp);
      return flc + '.' + fr + unit;
   }

   //===========================================================
   // <T>获得非空内容。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param d:default:Number 缺省浮点数
   // @return Number 浮点数
   //===========================================================
   public static nvl(v: number, d: number = 0) {
      return v ? v : (d ? d : 0);
   }

   //===========================================================
   // <T>获得范围内浮点数。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param i:min:Number 最小浮点数
   // @param a:max:Number 最大浮点数
   // @return Number 浮点数
   //===========================================================
   public static toRange(v, i, a) {
      if (v == null) {
         v = 0;
      }
      return Math.min(Math.max(v, i), a);
   }

   //===========================================================
   // <T>计算所有参数的浮点数之和。</T>
   //
   // @method
   // @param p:values:Number 浮点数集合
   // @return Number 浮点数
   //===========================================================
   public static sum() {
      var a = arguments;
      var r = 0;
      for (var i: number = a.length - 1; i >= 0; i--) {
         var v = a[i];
         if (v != null) {
            r += parseFloat(v);
         }
      }
      return r;
   }

   //===========================================================
   // <T>把两个字符串 进行算术运算。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param d:default:Number 缺省浮点数
   // @return Number 浮点数
   //===========================================================
   public static calculate(f: number, a: number, b: number) {
      a = this.nvl(a);
      b = this.nvl(b);
      a = parseFloat(a as any);
      b = parseFloat(b as any);
      if (f) {
         return (a + b).toString();
      } else {
         return (a - b).toString();
      }
   }

   //===========================================================
   // <T>接收浮点数数组。</T>
   //
   // @method
   // @param t:targetData:Array 目标数据
   // @param s:sourceData:Array 来源数据
   // @param c:count:Integer 总数
   // @return 是否相等
   //===========================================================
   public static attach(t, s, c) {
      var r = false;
      for (var i = 0; i < c; i++) {
         if (t[i] != s[i]) {
            t[i] = s[i];
            r = true;
         }
      }
      return r;
   }

   //===========================================================
   // <T>填充浮点数数组。</T>
   //
   // @method
   // @param d:data:Array 数据
   // @param i:index:Integer 索引
   // @param c:count:Integer 总数
   // @param v:value:Float 数据
   //===========================================================
   public static fill(d, i, c, v) {
      for (var n = 0; n < c; n++) {
         d[i++] = v;
      }
   }

   //===========================================================
   // <T>复制浮点数数组。</T>
   //
   // @method
   // @param po:outputData:Array 输出数据
   // @param poi:outputIndex:Integer 输出位置
   // @param pi:inputData:Array 输入数据
   // @param pii:inputIndex:Integer 输入位置
   // @param pc:count:Integer 总数
   //===========================================================
   public static copy(po, poi, pi, pii, pc) {
      for (var i = 0; i < pc; i++) {
         po[poi++] = pi[pii++];
      }
   }
}
