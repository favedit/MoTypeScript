package org.mo.com.json;

import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FString;

//============================================================
// <T>XML文档工具。</T>
//
// @history 080731 MAOCY 创建
//============================================================
public class RJson
{
   // 文件后缀名
   public static final String EXTENSION = "json";

   // 默认属性分隔符
   public final static String DEFAULT_ATTR_SPLITTER = "!";

   // 默认的编码方式
   public final static String DEFAULT_ENCODING = "UTF-8";

   // 默认的前置空白
   public final static String DEFAULT_INDENT = "  ";

   // 默认名称分隔符
   public final static String DEFAULT_NAME_SPLITTER = ".";

   // 默认节点名称
   public static final String DEFAULT_NODE_NAME = "Object";

   // 默认根节点名称
   public static final String DEFAULT_ROOT_NAME = "Configuration";

   // 节点名称分隔符
   public final static String NAME_SPLITTER = ".";

   // 节点名称分隔符（Regex）
   public final static String NAME_SPLITTER_REG = "\\.";

   //============================================================
   // <T>建立JSON字符串。</T>
   //
   // @param json JSON字符串
   // @param level 级别
   // @param deep 深度
   //============================================================
   public static void buildValue(FString source,
                                 Object value){
      if(value == null){
         source.append("null");
      }else if(value instanceof Boolean){
         source.append(((Boolean)value).booleanValue() ? "TRUE" : "FALSE");
      }else if(value instanceof Integer){
         source.append(value);
      }else if(value instanceof Long){
         source.append(value);
      }else if(value instanceof Float){
         source.append(value);
      }else if(value instanceof Double){
         source.append(value);
      }else if(value instanceof String){
         source.append('"');
         source.append(value);
         source.append('"');
      }else{
         throw new FFatalError("Unknown data type.");
      }
   }

   //============================================================
   // <T>格式化XML文本字符串。</T>
   //
   // @param text 字符串
   // @return 字符串
   //============================================================
   public static String formatText(String text){
      if(text != null){
         StringBuilder xml = new StringBuilder();
         char[] chars = text.toCharArray();
         int count = chars.length;
         for(int n = 0; n < count; n++){
            char ch = chars[n];
            switch(ch){
               case '\n':
                  xml.append("\\n");
                  break;
               case '\r':
                  break;
               case '"':
                  xml.append("&quot;");
                  break;
               case '<':
                  xml.append("&lt;");
                  break;
               case '>':
                  xml.append("&gt;");
                  break;
               case '&':
                  xml.append("&amp;");
                  break;
               default:
                  xml.append(ch);
            }
         }
         return xml.toString();
      }
      return null;
   }

   //============================================================
   // <T>格式化XML节点字符串。</T>
   //
   // @param text 字符串
   // @return 字符串
   //============================================================
   public static String formatNote(String text){
      if(null != text){
         StringBuilder xml = new StringBuilder();
         char[] chars = text.toCharArray();
         int count = chars.length;
         for(int n = 0; n < count; n++){
            char ch = chars[n];
            switch(ch){
               case '\r':
                  break;
               case '"':
                  xml.append("&quot;");
                  break;
               case '<':
                  xml.append("&lt;");
                  break;
               case '>':
                  xml.append("&gt;");
                  break;
               case '&':
                  xml.append("&amp;");
                  break;
               default:
                  xml.append(ch);
            }
         }
         return xml.toString();
      }
      return null;
   }
}
