package org.mo.eng.data;

import org.mo.com.collections.FAttributesList;
import org.mo.com.data.ISqlConnection;
import org.mo.com.lang.FAttributes;

//============================================================
// <T>数据库链接控制台接口。</T>
//============================================================ 
public interface IConnectionConsole
{
   //============================================================
   // <T>获得名称。</T>
   //
   // @return 名称
   //============================================================ 
   String name();

   //============================================================
   // <T>获得驱动类名称。</T>
   //
   // @return 驱动类名称
   //============================================================ 
   String driverClass();

   //============================================================
   // <T>获得驱动名称。</T>
   //
   // @return 驱动名称
   //============================================================ 
   String driverName();

   //============================================================
   // <T>获得链接地址。</T>
   //
   // @return 链接地址
   //============================================================ 
   String url();

   //============================================================
   // <T>获得登录名称。</T>
   //
   // @return 登录名称
   //============================================================ 
   String passport();

   //============================================================
   // <T>获得读取名称集合。</T>
   //
   // @return 读取名称集合
   //============================================================ 
   String[] readNames();

   //============================================================
   // <T>获得写入名称集合。</T>
   //
   // @return 写入名称集合
   //============================================================ 
   String[] writeNames();

   //============================================================
   // <T>获得链接初始化个数。</T>
   //
   // @return 链接初始化个数
   //============================================================ 
   int initConnectionNumber();

   //============================================================
   // <T>获得链接最大个数。</T>
   //
   // @return 链接最大个数
   //============================================================ 
   int maxConnectionNumber();

   //============================================================
   // <T>获得设置信息。</T>
   //
   // @return 设置信息
   //============================================================ 
   FAttributes config();

   //============================================================
   // <T>获得链接信息。</T>
   //
   // @return 链接信息
   //============================================================ 
   FAttributesList connectionInfos();

   //============================================================
   // <T>收集一个数据库链接。</T>
   // <P>
   //    如果有空闲的数据库链接，则使用。
   //    如果没有空闲的数据库链接，则新建一个数据库链接。
   // </P>
   //
   // @return 数据库链接
   //============================================================ 
   ISqlConnection alloc();

   //============================================================
   // <T>回收一个数据库链接。</T>
   //
   // @param connection 数据库链接
   //============================================================ 
   void free(ISqlConnection connection);

   //============================================================
   // <T>释放一个数据库链接。</T>
   //
   // @param connection 数据库链接
   //============================================================ 
   void release(ISqlConnection connection);

   //============================================================
   // <T>刷新所有数据库链接。</T>
   //============================================================ 
   void refresh();

   //============================================================
   // <T>释放所有的数据库链接。</T>
   //============================================================ 
   void release();
}
