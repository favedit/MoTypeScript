package org.mo.com.lang.generic;

import java.util.Iterator;
import org.mo.com.lang.EStringCase;
import org.mo.com.lang.FString;
import org.mo.com.lang.FStringComparable;
import org.mo.com.lang.IAttributes;
import org.mo.com.lang.IPack;
import org.mo.com.lang.IStringPair;
import org.mo.com.lang.RArray;
import org.mo.com.lang.RBoolean;
import org.mo.com.lang.RDouble;
import org.mo.com.lang.RDump;
import org.mo.com.lang.RFloat;
import org.mo.com.lang.RInteger;
import org.mo.com.lang.RLong;
import org.mo.com.lang.RString;
import org.mo.com.lang.RStrings;

//============================================================
// <T>属性表。</T>
//============================================================
public abstract class MAttributes
      extends MDictionary<IStringPair, String>
      implements
         IAttributes,
         IPack
{
   //============================================================
   // <T>构造属性表。</T>
   //============================================================
   public MAttributes(){
      super(String.class);
   }

   //============================================================
   // <T>构造属性表。</T>
   //
   // @param capacity 容量
   //============================================================
   public MAttributes(int capacity){
      super(String.class, capacity);
   }

   //============================================================
   // <T>构造属性表。</T>
   //
   // @param pack 打包字符串
   //============================================================
   public MAttributes(String pack){
      super(String.class);
      unpack(pack);
   }

   //============================================================
   // <T>接收数据集合到自己内部。</T>
   //
   // @param map 数据集合
   //============================================================
   public void assignNotEmpty(MAttributes attributes){
      clear();
      for(IStringPair pair : attributes){
         String value = pair.value();
         if(!RString.isEmpty(value)){
            set(pair.name(), pair.value());
         }
      }
   }

   //============================================================
   // <T>获得迭代器。</T>
   //
   // @return 迭代器
   //============================================================
   @Override
   public Iterator<IStringPair> iterator(){
      return new FPairIterator<IStringPair, String, String>(new FStringPair(), _names, _values, 0, _count);
   }

   //============================================================
   // <T>获得所有内容中最短的长度。</T>
   //
   // @return 长度
   //============================================================
   public int valueLengthMin(){
      return RStrings.lengthMin(_values, 0, _count);
   }

   //============================================================
   // <T>获得所有内容中最长的长度。</T>
   //
   // @return 长度
   //============================================================
   public int valueLengthMax(){
      return RStrings.lengthMax(_values, 0, _count);
   }

   //============================================================
   // <T>根据索引获得布尔内容。</T>
   //
   // @param index 索引
   // @return 内容
   //============================================================
   public boolean getBoolean(int index){
      String value = value(index);
      if(value != null){
         return RBoolean.parse(value);
      }
      return false;
   }

   //============================================================
   // <T>根据名称获得布尔内容。</T>
   //
   // @param name 名称
   // @return 内容
   //============================================================
   public boolean getBoolean(String name){
      String value = get(name, null);
      if(value != null){
         return RBoolean.parse(value);
      }
      return false;
   }

   //============================================================
   // <T>根据索引获得整数内容。</T>
   //
   // @param index 索引
   // @return 内容
   //============================================================
   public int getInt(int index){
      String value = value(index);
      if(value != null){
         return RInteger.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据名称获得整数内容。</T>
   //
   // @param name 名称
   // @return 内容
   //============================================================
   public int getInt(String name){
      String value = get(name, null);
      if(value != null){
         return RInteger.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据索引获得长整数内容。</T>
   //
   // @param index 索引
   // @return 内容
   //============================================================
   public long getLong(int index){
      String value = value(index);
      if(value != null){
         return RLong.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据名称获得长整数内容。</T>
   //
   // @param name 名称
   // @return 内容
   //============================================================
   public long getLong(String name){
      String value = get(name, null);
      if(value != null){
         return RLong.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据索引获得浮点数内容。</T>
   //
   // @param index 索引
   // @return 内容
   //============================================================
   public float getFloat(int index){
      String value = value(index);
      if(value != null){
         return RFloat.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据名称获得浮点数内容。</T>
   //
   // @param name 名称
   // @return 内容
   //============================================================
   public float getFloat(String name){
      String value = get(name, null);
      if(value != null){
         return RFloat.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据索引获得双精度浮点数内容。</T>
   //
   // @param index 索引
   // @return 内容
   //============================================================
   public double getDouble(int index){
      String value = value(index);
      if(value != null){
         return RDouble.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据名称获得双精度浮点数内容。</T>
   //
   // @param name 名称
   // @return 内容
   //============================================================
   public double getDouble(String name){
      String value = get(name, null);
      if(value != null){
         return RDouble.parse(value);
      }
      return 0;
   }

   //============================================================
   // <T>根据索引获得字符串内容。</T>
   //
   // @param index 索引
   // @return 内容
   //============================================================
   public String getString(int index){
      return value(index);
   }

   //============================================================
   // <T>根据名称获得字符串内容。</T>
   //
   // @param name 名称
   // @return 内容
   //============================================================
   public String getString(String name){
      return get(name, null);
   }

   //============================================================
   // <T>根据名称设置布尔内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void set(String name,
                   boolean value){
      set(name, RBoolean.toString(value));
   }

   //============================================================
   // <T>根据名称设置整数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void set(String name,
                   int value){
      set(name, Integer.toString(value));
   }

   //============================================================
   // <T>根据名称设置长整数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void set(String name,
                   long value){
      set(name, Long.toString(value));
   }

   //============================================================
   // <T>根据名称设置浮点数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void set(String name,
                   float value){
      set(name, Float.toString(value));
   }

   //============================================================
   // <T>根据名称设置双精度浮点数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void set(String name,
                   double value){
      set(name, Double.toString(value));
   }

   //============================================================
   // <T>根据名称设置非空布尔内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void setNvl(String name,
                      boolean value){
      if(value){
         set(name, value);
      }
   }

   //============================================================
   // <T>根据名称设置非空整数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void setNvl(String name,
                      int value){
      if(value != 0){
         set(name, value);
      }
   }

   //============================================================
   // <T>根据名称设置非空长整数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void setNvl(String name,
                      long value){
      if(value != 0){
         set(name, value);
      }
   }

   //============================================================
   // <T>根据名称设置非空浮点数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void setNvl(String name,
                      float value){
      if(value != 0){
         set(name, value);
      }
   }

   //============================================================
   // <T>根据名称设置非空双精度浮点数内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void setNvl(String name,
                      double value){
      if(value != 0){
         set(name, value);
      }
   }

   //============================================================
   // <T>根据名称设置非空字符串内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void setNvl(String name,
                      String value){
      if(!RString.isEmpty(value)){
         set(name, value);
      }
   }

   //==========================================================
   // <T>将内部所有内容目关联成一个字符串。</T>
   //
   // @method
   // @param split:String 分隔符
   // @return String 字符串
   //==========================================================
   public String joinValue(String split){
      FString source = new FString();
      for(int i = 0; i < _count; i++){
         if(i > 0){
            source.append(split);
         }
         source.append(_values[i]);
      }
      return source.toString();
   }

   //==========================================================
   // <T>按照名称排序。</T>
   //
   // @method
   //==========================================================
   public void sortByName(){
      RArray.pairSort(_names, _values, 0, _count, new FStringComparable(), null);
   }

   //============================================================
   // <T>分割字符串为属性集合。</T>
   //
   // @param value 字符串
   //============================================================
   @Override
   public void split(String value){
      split(value, "=", ",", false);
   }

   //============================================================
   // <T>分割字符串为属性集合。</T>
   //
   // @param value 字符串
   // @param splitValue 内容分割符
   //============================================================
   @Override
   public void split(String value,
                     String splitValue){
      split(value, "=", splitValue, false);
   }

   //============================================================
   // <T>分割字符串为属性集合。</T>
   //
   // @param value 字符串
   // @param splitName 名称分割符
   // @param splitValue 内容分割符
   //============================================================
   @Override
   public void split(String value,
                     String splitName,
                     String splitValue){
      split(value, splitName, splitValue, false);
   }

   //============================================================
   // <T>分割字符串为属性集合。</T>
   //
   // @param value 字符串
   // @param splitName 名称分割符
   // @param splitValue 内容分割符
   // @param merge 是否合并
   //============================================================
   @Override
   public void split(String value,
                     char splitName,
                     char splitValue,
                     boolean merge){
      if(!merge){
         clear();
      }
      if(!RString.isEmpty(value)){
         String[] values = RString.split(value, splitValue);
         for(int n = 0; n < values.length; n++){
            String[] items = RString.splitTwo(values[n], splitName);
            if(null != items){
               set(items[0], items[1]);
            }
         }
      }
   }

   //============================================================
   // <T>分割字符串为属性集合。</T>
   //
   // @param value 字符串
   // @param splitName 名称分割符
   // @param splitValue 内容分割符
   // @param merge 是否合并
   // @param trim 是否截取
   //============================================================
   public void split(String value,
                     char splitName,
                     char splitValue,
                     boolean merge,
                     boolean trim){
      if(!merge){
         clear();
      }
      if(!RString.isEmpty(value)){
         String[] values = RString.split(value, splitValue);
         int count = values.length;
         for(int n = 0; n < count; n++){
            String[] items = RString.splitTwo(values[n], splitName);
            if(null != items){
               if(trim){
                  String itemName = items[0].trim();
                  if(!itemName.isEmpty()){
                     String itemValue = items[1].trim();
                     set(itemName, itemValue);
                  }
               }else{
                  set(items[0], items[1]);
               }
            }
         }
      }
   }

   //============================================================
   // <T>分割信息字符串成为集合。</T>
   //
   // @param source 字符串
   // @param splitName 名称分割字符串
   // @param splitValue 内容分割字符串
   // @param merge 是否合并
   //============================================================
   @Override
   public void split(String source,
                     String splitName,
                     String splitValue,
                     boolean merge){
      if(!merge){
         clear();
      }
      if(!RString.isEmpty(source)){
         String[] values = RString.split(source, splitValue);
         if(!RString.isEmpty(splitName)){
            String[] items = null;
            for(int n = 0; n < values.length; n++){
               items = values[n].split(splitName, 2);
               if(items.length == 2){
                  set(items[0], items[1]);
               }
            }
         }else{
            for(int n = 0; n < values.length; n++){
               set(Integer.toString(_count), values[n]);
            }
         }
      }
   }

   //============================================================
   // <T>生成打包字符串。</T>
   //
   // @param pack 打包字符串
   // @param ignoreEmpty 略过空内容
   //============================================================
   protected void innerPack(StringBuilder pack,
                            boolean ignoreEmpty){
      for(int n = 0; n < _count; n++){
         String value = _values[n];
         // 是否略过空内容
         if(ignoreEmpty && RString.isEmpty(value)){
            continue;
         }
         // 打包名称和内容
         String name = _names[n];
         int length = name.length();
         pack.append(String.valueOf(Integer.toString(length).length()));
         pack.append(String.valueOf(length));
         pack.append(name);
         if(value != null){
            length = value.length();
            pack.append(String.valueOf(Integer.toString(length).length()));
            pack.append(String.valueOf(length));
            pack.append(value);
         }else{
            pack.append('0');
         }
      }
   }

   //============================================================
   // <T>生成打包字符串。</T>
   //
   // @return 打包字符串
   //============================================================
   @Override
   public String pack(){
      StringBuilder pack = new StringBuilder();
      innerPack(pack, false);
      return pack.toString();
   }

   //============================================================
   // <T>解包字符串。</T>
   //
   // @param pack 打包字符串
   //============================================================
   @Override
   public void unpack(String pack){
      unpack(pack, false);
   }

   //============================================================
   // <T>解包字符串。</T>
   //
   // @param pack 打包字符串
   // @param merge 合并内容
   //============================================================
   @Override
   public void unpack(String pack,
                      boolean merge){
      // 合并处理
      if(!merge){
         clear();
      }
      // 去除尾回车
      pack = RString.trimRightLine(pack);
      // 分解内容
      if((pack != null) && !pack.isEmpty()){
         try{
            int n = 0;
            int total = pack.length();
            char[] chars = pack.toCharArray();
            // 处理所有名称值对
            while(n < total){
               // 读取名称
               int len = chars[n++] - '0';
               int length = Integer.parseInt(new String(chars, n, len));
               n += len;
               String name = new String(chars, n, length);
               if(_nameCase == EStringCase.Lower){
                  name = name.toLowerCase();
               }else if(_nameCase == EStringCase.Upper){
                  name = name.toUpperCase();
               }
               n += length;
               // 读取内容
               len = chars[n++] - '0';
               if(len > 0){
                  length = Integer.parseInt(new String(chars, n, len));
                  n += len;
                  set(name, new String(chars, n, length));
                  n += length;
               }else{
                  set(name, null);
               }
            }
         }catch(Exception e){
            throw new Error("Unpack string failure. (pack=" + pack + ", merge=" + merge + ")", e);
         }
      }
   }

   //============================================================
   // <T>获得JSON字符串。</T>
   //
   // @return JSON字符串
   //============================================================
   public String toJson(){
      FString source = new FString();
      toJson(source, true);
      return source.toString();
   }

   //============================================================
   // <T>获得JSON字符串。</T>
   //
   // @param source 来源代码
   // @param full 是否全部
   // @return JSON字符串
   //============================================================
   public void toJson(FString source,
                      boolean full){
      if(full){
         source.append('{');
      }
      for(int n = 0; n < _count; n++){
         if(n != 0){
            source.append(',');
         }
         source.append('"');
         source.append(_names[n]);
         source.append("\":\"");
         source.append(_values[n]);
         source.append('"');
      }
      if(full){
         source.append('}');
      }
   }

   //============================================================
   // <T>获得内容字符串。</T>
   //
   // @return 内容字符串
   //============================================================
   @Override
   public String toString(){
      FString result = new FString();
      RStrings.join(result, _names, _values, 0, _count, "=", ", ");
      return result.toString();
   }

   //============================================================
   // <T>获得内容字符串。</T>
   //
   // @param nameSplit 名称分割
   // @param valueSplit 内容分割
   // @return 内容字符串
   //============================================================
   public String toString(String nameSplit,
                          String valueSplit){
      FString result = new FString();
      RStrings.join(result, _names, _values, 0, _count, nameSplit, valueSplit);
      return result.toString();
   }

   //============================================================
   // <T>获得内容字符串。</T>
   //
   // @param source 字符串
   // @param nameSplit 名称分割
   // @param valueSplit 内容分割
   // @return 内容字符串
   //============================================================
   public void toString(MString source,
                        String nameSplit,
                        String valueSplit){
      RStrings.join(source, _names, _values, 0, _count, nameSplit, valueSplit);
   }

   //============================================================
   // <T>获得运行信息。</T>
   //
   // @return 运行信息
   //============================================================
   @Override
   public String dump(){
      TDumpInfo info = new TDumpInfo(this);
      return dump(info).toString();
   }

   //============================================================
   // <T>生成运行信息。</T>
   //
   // @param info 运行信息
   // @return 运行信息
   //============================================================
   @Override
   public TDumpInfo dump(TDumpInfo info){
      RDump.dump(info, this);
      info.append(" (");
      info.appendInt(_count);
      info.append(")");
      if(_count > 0){
         info.append("{ ");
         for(int n = 0; n < _count; n++){
            if(n > 0){
               info.append(", ");
            }
            String value = value(n);
            String valueDisplay = RString.left(value, 200);
            info.append(name(n), "=", valueDisplay);
         }
         info.append(" }");
      }
      return info;
   }
}
