package org.mo.com.collections;

import org.mo.com.lang.FAttributes;
import org.mo.com.lang.RString;

//============================================================
// <T>数据字段。</T>
//============================================================
public class SDataField
{
   // 名称
   public String name;

   // 类型
   public int typeCd;

   //============================================================
   // <T>将当前列表打包为字符串内容。</T>
   //
   // @return 打包字符串
   //============================================================
   public String pack(){
      FAttributes attributes = new FAttributes();
      attributes.set("name", name);
      attributes.set("type_cd", typeCd);
      return attributes.pack();
   }

   //============================================================
   // <T>将打包字符串内容,反解到当前列表中。</T>
   //
   // @param pack 打包字符串
   //============================================================
   public void unpack(String pack){
      if(!RString.isEmpty(pack)){
         FAttributes attributes = new FAttributes();
         attributes.unpack(pack);
         name = attributes.get("name");
         typeCd = attributes.getInt("type_cd");
      }
   }
}
