package org.mo.com.data;

import org.mo.com.lang.FString;
import org.mo.com.lang.RString;
import org.mo.com.lang.type.TDateTime;

//============================================================
// <T>SQL字符串。</T>
//============================================================
public class FSql
      extends FString
{
   //============================================================
   // <T>构造SQL字符串。</T>
   //============================================================
   public FSql(){
   }

   //============================================================
   // <T>构造SQL字符串。</T>
   //
   // @param capacity 容量
   //============================================================
   public FSql(int capacity){
      super(capacity);
   }

   //============================================================
   // <T>构造SQL字符串。</T>
   //
   // @param data 字符集合
   // @param charset 编码名称
   //============================================================
   public FSql(byte[] data,
               String charset){
      append(data, charset);
   }

   //============================================================
   // <T>构造SQL字符串。</T>
   //
   // @param data 字符集合
   //============================================================
   public FSql(char[] data){
      append(data, 0, data.length);
   }

   //============================================================
   // <T>构造SQL字符串。</T>
   //
   // @param data 字符集合
   // @param offset 索引
   // @param length 长度
   //============================================================
   public FSql(char[] data,
               int offset,
               int length){
      append(data, offset, length);
   }

   //============================================================
   // <T>构造SQL字符串。</T>
   //
   // @param value 字符串
   //============================================================
   public FSql(String value){
      assign(value);
   }

   //============================================================
   // <T>构造SQL字符串。</T>
   //
   // @param value 字符串
   //============================================================
   public FSql(FString value){
      assign(value);
   }

   //============================================================
   // <T>追加布尔字符串。</T>
   //
   // @param value 字符串
   //============================================================
   public void appendFieldBoolean(String value){
      if(!RString.isEmpty(value)){
         append('\'');
         append(value);
         append('\'');
      }else{
         append(RSql.NULL);
      }
   }

   //============================================================
   // <T>追加时间字符串。</T>
   //
   // @param value 字符串
   //============================================================
   public void appendFieldDate(String value){
      if(!RString.isEmpty(value)){
         append('\'');
         append(value);
         append('\'');
      }else{
         append(RSql.NULL);
      }
   }

   //============================================================
   // <T>追加整数字符串。</T>
   //
   // @param value 字符串
   //============================================================
   public void appendFieldInteger(String value){
      if(!RString.isEmpty(value)){
         append(value);
      }else{
         append(RSql.NULL);
      }
   }

   //============================================================
   // <T>追加字符字符串。</T>
   //
   // @param value 字符串
   //============================================================
   public void appendFieldString(String value){
      if(!RString.isEmpty(value)){
         append('\'');
         append(value);
         append('\'');
      }else{
         append(RSql.NULL);
      }
   }

   //============================================================
   // <T>追加字符字符串。</T>
   //
   // @param value 字符串
   //============================================================
   public void appendFieldString(FString value){
      if(value != null && !value.isEmpty()){
         append('\'');
         append(value);
         append('\'');
      }else{
         append(RSql.NULL);
      }
   }

   //============================================================
   // <T>追加字符串。</T>
   //
   // @param flag 标志
   // @param value 字符串
   //============================================================
   public void appendIf(boolean flag,
                        String value){
      if(flag){
         append(value);
      }
   }

   //============================================================
   // <T>追加条件。</T>
   //
   // @param flag 标志
   // @param value 字符串
   // @param whereSql 条件字符串
   //============================================================
   public void appendCondition(boolean flag,
                               String value,
                               String whereSql){
      if(flag){
         append(value);
      }
      append('(');
      append(whereSql);
      append(')');
   }

   //============================================================
   // <T>绑定字符串。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void bind(String name,
                    String value){
      innerReplace("{" + name + "}", value);
   }

   //============================================================
   // <T>绑定整数。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void bindInteger(String name,
                           int value){
      innerReplace("{" + name + "}", Integer.toString(value));
   }

   //============================================================
   // <T>绑定长整数。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void bindLong(String name,
                        long value){
      innerReplace("{" + name + "}", Long.toString(value));
   }

   //============================================================
   // <T>绑定浮点数。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void bindFloat(String name,
                         float value){
      innerReplace("{" + name + "}", Float.toString(value));
   }

   //============================================================
   // <T>绑定双精度浮点数。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void bindDouble(String name,
                          double value){
      innerReplace("{" + name + "}", Double.toString(value));
   }

   //============================================================
   // <T>绑定时间日期。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void bindDateTime(String name,
                            TDateTime value){
      String text = value.format();
      innerReplace("{" + name + "}", "'" + text + "'");
   }

   //============================================================
   // <T>绑定时间日期。</T>
   //
   // @param name 名称
   // @param value 内容
   // @param format 格式
   //============================================================
   public void bindDateTime(String name,
                            TDateTime value,
                            String format){
      String text = value.format(format);
      innerReplace("{" + name + "}", "'" + text + "'");
   }

   //============================================================
   // <T>绑定字符串。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void bindString(String name,
                          String value){
      innerReplace("{" + name + "}", "'" + value + "'");
   }

   //============================================================
   // <T>获得内容字符串。</T>
   //
   // @return 字符串
   //============================================================
   @Override
   public String toString(){
      return RSql.formatSql(super.toString());
   }
}
