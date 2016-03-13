package org.mo.com.text;

import org.mo.com.lang.FString;
import org.mo.com.lang.RChar;
import org.mo.com.lang.RString;

//============================================================
// <T>单词工具。</T>
//============================================================
public class RWord
{
   //============================================================
   // <T>格式化下划线为首字母大写单词。</T>
   // <T>例如：变量名称 display_name -> DisplayName</P>
   //============================================================
   public static String formatUnderlineToWord(String source){
      StringBuilder buffer = new StringBuilder();
      char[] values = source.toCharArray();
      int count = values.length;
      for(int n = 0; n < count; n++){
         char value = values[n];
         if(value == '_'){
            if(++n < count){
               value = RChar.toUpper(values[n]);
            }
         }
         buffer.append(value);
      }
      return buffer.toString();
   }

   /**
    * <p>格式化数据库用字符串为显示用的字符串</p>
    * <p>
    * 例如：对象名称 DISPLAY_NAME -> Display Name<br>
    * 例如：函数名称 Display_Name -> Display Name<br>
    * 例如：变量名称 display_name_ -> Display Name
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param sValue 指定字符串
    * @return 显示用的字符串
    */
   public final static String formatDisplay(String sValue){
      if(sValue != null){
         int nLength = sValue.length();
         if(nLength > 0){
            char ch[] = sValue.toCharArray();
            char chLower[] = sValue.toLowerCase().toCharArray();
            char chUpper[] = sValue.toUpperCase().toCharArray();
            // 格式化内容
            StringBuffer oResult = new StringBuffer(nLength);
            for(int n = 0; n < nLength; n++){
               if(n == 0){
                  oResult.append(chUpper[n]);
               }else if(ch[n] == '_'){
                  n++;
                  oResult.append(" ");
                  if(n < nLength){
                     oResult.append(chUpper[n]);
                  }
               }else{
                  oResult.append(chLower[n]);
               }
            }
            return oResult.toString();
         }
      }
      return "";
   }

   /**
    * <p>格式化数据库用字符串为JAVA方法名字符串</p>
    * <p>
    * 例如：对象名称 DISPLAY_NAME -> displayName<br>
    * 例如：函数名称 Display_Name -> displayName<br>
    * 例如：变量名称 display_name_ -> displayName
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @return JAVA方法名字符串
    */
   public final static String formatFirstLower(String value){
      return formatFirstLower(value, null, null);
   }

   /**
    * <p>格式化数据库用字符串为JAVA方法名字符串，可以使用前缀字符串</p>
    * <p>
    * 例如：对象名称 前缀(get) DISPLAY_NAME -> getDisplayName<br>
    * 例如：函数名称 前缀(get) Display_Name -> getDisplayName<br>
    * 例如：变量名称 前缀(get) display_name_ -> getDisplayName
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @param begin 前缀字符串
    * @return JAVA方法名字符串
    */
   public final static String formatFirstLower(String value,
                                               String begin){
      return formatFirstLower(value, begin, null);
   }

   /**
    * <p>格式化数据库用字符串为JAVA方法名字符串，可以使用前后缀字符串</p>
    * <p>
    * 例如：对象名称 前缀(get)后缀(local) DISPLAY_NAME -> getDisplayNameLocal<br>
    * 例如：函数名称 前缀(get)后缀(local) Display_Name -> getDisplayNameLocal<br>
    * 例如：变量名称 前缀(get)后缀(local) display_name_ -> getDisplayNameLocal
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @param begin 前缀字符串
    * @param end 后缀字符串
    * @return JAVA方法名字符串
    */
   public final static String formatFirstLower(String value,
                                               String begin,
                                               String end){
      FString sResult = new FString();
      if(value != null){
         int nLength = value.length();
         if(nLength > 0){
            if(begin != null && begin.length() > 0){
               value = begin + "_" + value;
            }
            if(end != null && end.length() > 0){
               value += "_" + end;
            }
            char ch[] = value.toCharArray();
            char chLower[] = value.toLowerCase().toCharArray();
            char chUpper[] = value.toUpperCase().toCharArray();
            nLength = ch.length;
            // 格式化内容
            for(int n = 0; n < nLength; n++){
               if(n == 0){
                  sResult.append(chLower[n]);
               }else if(ch[n] == '_'){
                  n++;
                  if(n < nLength){
                     sResult.append(chUpper[n]);
                  }
               }else{
                  sResult.append(chLower[n]);
               }
            }
         }
      }
      return sResult.toString();
   }

   /**
    * <p>格式化数据库用字符串为JAVA对象名字符串</p>
    * <p>
    * 例如：对象名称 DISPLAY_NAME -> DisplayName<br>
    * 例如：函数名称 Display_Name -> DisplayName<br>
    * 例如：变量名称 display_name_ -> DisplayName
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @return JAVA对象名字符串
    */
   public final static String formatFirstUpper(String value){
      return formatFirstUpper(value, null, null);
   }

   /**
    * <p>格式化数据库用字符串为JAVA对象名字符串，可以使用前缀字符串</p>
    * <p>
    * 例如：对象名称 前缀(f) DISPLAY_NAME -> FDisplayName<br>
    * 例如：函数名称 前缀(f) Display_Name -> FDisplayName<br>
    * 例如：变量名称 前缀(f) display_name_ -> FDisplayName
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @param begin 前缀字符串
    * @return JAVA对象名字符串
    */
   public final static String formatFirstUpper(String value,
                                               String begin){
      return formatFirstUpper(value, begin, null);
   }

   /**
    * <p>格式化数据库用字符串为JAVA对象名字符串，可以使用前后缀字符串</p>
    * <p>
    * 例如：对象名称 前缀(f)后缀(local) DISPLAY_NAME -> FDisplayNameLocal<br>
    * 例如：函数名称 前缀(f)后缀(local) Display_Name -> FDisplayNameLocal<br>
    * 例如：变量名称 前缀(f)后缀(local) display_name_ -> FDisplayNameLocal
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @param begin 前缀字符串
    * @param end 后缀字符串
    * @return JAVA对象名字符串
    */
   public final static String formatFirstUpper(String value,
                                               String begin,
                                               String end){
      if(!RString.isEmpty(value)){
         if(begin != null && begin.length() > 0){
            value = begin + "_" + value;
         }
         if(end != null && end.length() > 0){
            value += "_" + end;
         }
         int n = -1;
         int length = value.length();
         char chars[] = value.toCharArray();
         char lowers[] = value.toLowerCase().toCharArray();
         char uppers[] = value.toUpperCase().toCharArray();
         // 格式化内容
         boolean flag = false;
         FString result = new FString(length);
         while(++n < length){
            if(chars[n] == '_'){
               flag = true;
               continue;
            }
            if(flag){
               result.append(uppers[n]);
               flag = false;
            }else{
               result.append(lowers[n]);
            }
         }
         return result.toString();
      }
      return RString.EMPTY;
   }

   /**
    * <p>格式化数据库用字符串为数据库函数名字符串</p>
    * <p>
    * 例如：对象名称 DISPLAY_NAME -> Display_Name<br>
    * 例如：函数名称 Display_Name -> Display_Name<br>
    * 例如：变量名称 display_name_ -> Display_Name
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @return 数据库函数名字符串
    */
   public final static String formatUpper(String value){
      return formatUpper(value, null, null);
   }

   /**
    * <p>格式化数据库用字符串为数据库函数名字符串，可以使用前缀字符串</p>
    * <p>
    * 例如：对象名称 前缀(get) DISPLAY_NAME -> Get_Display_Name<br>
    * 例如：函数名称 前缀(get) Display_Name -> Get_Display_Name<br>
    * 例如：变量名称 前缀(get) display_name_ -> Get_Display_Name
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @param begin 前缀字符串
    * @return 数据库函数名字符串
    */
   public final static String formatUpper(String value,
                                          String begin){
      return formatUpper(value, begin, null);
   }

   /**
    * <p>格式化数据库用字符串为数据库函数名字符串，可以使用前后缀字符串</p>
    * <p>
    * 例如：对象名称 前缀(get)后缀(local) DISPLAY_NAME -> Get_Display_Name_Local<br>
    * 例如：函数名称 前缀(get)后缀(local) Display_Name -> Get_Display_Name_Local<br>
    * 例如：变量名称 前缀(get)后缀(local) display_name_ -> Get_Display_Name_Local
    * </p>
    * <p>create date:2005/02/18</p>
    *
    * @param value 指定字符串
    * @param begin 前缀字符串
    * @param end 后缀字符串
    * @return 数据库函数名字符串
    */
   public final static String formatUpper(String value,
                                          String begin,
                                          String end){
      if(value != null){
         int nLength = value.length();
         if(nLength > 0){
            if(begin != null && begin.length() > 0){
               value = begin + "_" + value;
            }
            if(end != null && end.length() > 0){
               value += "_" + end;
            }
            char ch[] = value.toCharArray();
            char chLower[] = value.toLowerCase().toCharArray();
            char chUpper[] = value.toUpperCase().toCharArray();
            nLength = ch.length;
            // 格式化内容
            StringBuffer oResult = new StringBuffer(nLength);
            for(int n = 0; n < nLength; n++){
               if(n == 0){
                  oResult.append(chUpper[n]);
               }else if(ch[n] == '_'){
                  n++;
                  oResult.append('_');
                  if(n < nLength){
                     oResult.append(chUpper[n]);
                  }
               }else{
                  oResult.append(chLower[n]);
               }
            }
            return oResult.toString();
         }
      }
      return "";
   }
   //   /**
   //    * <p>格式化数据库用字符串为数据库变量名字符串</p>
   //    * <p>create date:2005/02/18</p>
   //    *
   //    * @param sValue 指定字符串
   //    * @return 数据库变量名字符串
   //    */
   //   public final static String toVariableName(String sValue){
   //      return sValue.toLowerCase() + "_";
   //   }
   //
   //   /**
   //    * <p>格式化数据库参数类型的内容为JAVA的类型字符串</p>
   //    * <p>create date:2005/02/18</p>
   //    *
   //    * @param nType 参数类型
   //    * @return JAVA的类型字符串
   //    */
   //   public final static String toJavaType(int nType) {
   //      if (nType == FDBType.STRING) {
   //         return "String";
   //      } else if (nType == FDBType.INTEGER) {
   //         return "int";
   //      } else if (nType == FDBType.FLOAT) {
   //         return "float";
   //      } else if (nType == FDBType.LONG) {
   //         return "long";
   //      } else if (nType == FDBType.DATE) {
   //         return "Date";
   //      } else if (nType == FDBType.BOOLEAN) {
   //         return "boolean";
   //      }
   //      return "Object";
   //   }
   //
   //   /**
   //    * <p>格式化数据库参数类型的内容为JAVA的字符串</p>
   //    * <p>create date:2005/02/18</p>
   //    *
   //    * @param nType 参数类型
   //    * @return JAVA的字符串
   //    */
   //   public final static String toJavaTypeString(int nType) {
   //      if (nType == FDBType.STRING) {
   //         return "STRING";
   //      } else if (nType == FDBType.INTEGER) {
   //         return "INTEGER";
   //      } else if (nType == FDBType.DATETIME) {
   //         return "DATETIME";
   //      } else if (nType == FDBType.BOOLEAN) {
   //         return "BOOLEAN";
   //      } else if (nType == FDBType.FLOAT) {
   //         return "FLOAT";
   //      } else if (nType == FDBType.DATE) {
   //         return "DATE";
   //      }
   //      return "UNKNOWN";
   //   }
   //
   //   /**
   //    * <p>格式化数据库参数方向的内容为JAVA的字符串</p>
   //    * <p>create date:2005/02/18</p>
   //    *
   //    * @param nDirection 参数方向
   //    * @return JAVA的字符串
   //    */
   //   public final static String toJavaDirection(int nDirection) {
   //      if (nDirection == FDBParameterDirection.INPUT) {
   //         return "INPUT";
   //      } else if (nDirection == FDBParameterDirection.OUTPUT) {
   //         return "OUTPUT";
   //      } else if (nDirection == FDBParameterDirection.INPUT_OUTPUT) {
   //         return "INPUT_OUTPUT";
   //      } else if (nDirection == FDBParameterDirection.RETURN_VALUE) {
   //         return "RETURN";
   //      }
   //      return "UNKNOWN";
   //   }
}
