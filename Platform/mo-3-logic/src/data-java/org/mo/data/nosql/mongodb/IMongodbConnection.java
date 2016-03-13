package org.mo.data.nosql.mongodb;

import org.mo.data.nosql.FNosqlContent;
import org.mo.data.nosql.INosqlConnection;

//============================================================
// <T>MongoDB连接接口。</T>
//============================================================
public interface IMongodbConnection
      extends
         INosqlConnection
{

   //============================================================
   // <T>生成存储文件名称。</T>
   //
   // @param host 主机地址
   // @param port 端口
   // @return 文件名称
   //============================================================
   void connect(String host,
                int port,
                String databaseName);

   //============================================================
   // <T>根据代码获得一个对象。</T>
   // <P>不存在的时候产生例外。</P>
   //
   // @param catalog 目录
   // @param name 查找名称
   // @param value 查找内容
   // @return 对象
   //============================================================
   Object get(String catalog,
              String name,
              String value);

   //============================================================
   // <T>根据代码获得一个对象。</T>
   // <P>不存在的时候返回默认对象。</P>
   //
   // @param catalog 目录
   // @param name 查找名称
   // @param value 查找内容
   // @param defaultValue 默认对象
   // @return 对象
   //============================================================
   Object get(String catalog,
              String name,
              String value,
              Object defaultValue);

   //============================================================
   // <T>保存一个存储信息。</T>
   //
   // @param catalog 集合分类
   // @param guid 唯一编号
   // @return 查找结果
   //============================================================
   void set(String catalog,
            String name,
            String value,
            Object item);

   //============================================================
   // <T>查找一个存储内容。</T>
   //
   // @param clazz 类对象
   // @param catalog 目录
   // @param guid 唯一编号
   // @return 存储内容
   //============================================================
   <T extends FNosqlContent> T findContent(Class<T> clazz,
                                           String catalog,
                                           String guid);

   //============================================================
   // <T>保存一个存储内容。</T>
   //
   // @param content 存储内容
   // @return 处理结果
   //============================================================
   boolean storeContent(FNosqlContent content);

   //============================================================
   // <T>删除一个存储内容。</T>
   //
   // @param catalog 目录
   // @param guid 唯一编号
   // @return 处理结果
   //============================================================
   boolean deleteContent(String catalog,
                         String guid);
}
