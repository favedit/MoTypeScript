package org.mo.eng.cache;

//============================================================
// <T>缓冲频道。</T>
//============================================================
public interface ICacheChannel
      extends
         AutoCloseable
{
   //============================================================
   // <T>获得字符串。</T>
   //
   // @param key 主键
   // @return 字符串
   //============================================================
   String getString(String key);

   //============================================================
   // <T>获得字节内容。</T>
   //
   // @param key 主键
   // @return 字节内容
   //============================================================
   byte[] getBytes(String key);

   //============================================================
   // <T>设置字符串。</T>
   //
   // @param key 主键
   // @param value 字符串
   //============================================================
   boolean setString(String key,
                     String value);

   //============================================================
   // <T>设置超时字符串。</T>
   //
   // @param key 主键
   // @param value 字符串
   // @param expiry 期限[秒]
   // @param value 内容
   //============================================================
   boolean setString(String key,
                     String value,
                     int expiry);

   //============================================================
   // <T>设置字节内容。</T>
   //
   // @param key 主键
   // @param value 字节内容
   // @return 处理结果
   //============================================================
   boolean setBytes(String key,
                    byte[] value);

   //============================================================
   // <T>设置字节内容。</T>
   //
   // @param key 主键
   // @param value 字节内容
   // @param expiry 期限[秒]
   // @return 处理结果
   //============================================================
   boolean setBytes(String key,
                    byte[] value,
                    int expiry);

   //============================================================
   // <T>删除处理。</T>
   //
   // @param key 主键
   // @return 处理结果
   //============================================================
   boolean delete(String key);

   //============================================================
   // <T>刷新处理。</T>
   //
   // @return 处理结果
   //============================================================
   void flush();
}