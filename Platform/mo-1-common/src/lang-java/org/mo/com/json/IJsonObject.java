package org.mo.com.json;

import org.mo.com.lang.FString;

//============================================================
// <T>JSON对象接口。</T>
//
//@history 051201 MAOCY 创建
//============================================================
public interface IJsonObject
{
   //============================================================
   // <T>建立JSON字符串。</T>
   //
   // @param json JSON字符串
   // @param level 级别
   // @param deep 深度
   //============================================================
   void build(FString source,
              int level,
              boolean deep);
}
