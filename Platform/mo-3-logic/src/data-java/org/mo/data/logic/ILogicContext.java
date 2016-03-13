package org.mo.data.logic;

import org.mo.com.data.ISqlConnection;
import org.mo.eng.data.common.ISqlContext;

//============================================================
// <T>逻辑环境接口。</T>
//============================================================
public interface ILogicContext
      extends
         ISqlContext
{
   //============================================================
   // <T>获得读取数据库链接集合。</T>
   //
   // @param connectionName 类对象
   // @return 数据库链接集合
   //============================================================
   ISqlConnection[] connectionReads(String connectionName);

   //============================================================
   // <T>获得写入数据库链接集合。</T>
   //
   // @param connectionName 类对象
   // @return 数据库链接集合
   //============================================================
   ISqlConnection[] connectionWrites(String connectionName);

   //============================================================
   // <T>根据类对象获得逻辑表格接口。</T>
   //
   // @param clazz 类对象
   // @return 逻辑表格接口
   //============================================================
   <T extends ILogicTable> T findLogic(Class<T> clazz);

   //============================================================
   // <T>根据类对象获得逻辑表格接口。</T>
   //
   // @param clazz 类对象
   // @param connectionName 链接名称
   // @return 逻辑表格接口
   //============================================================
   <T extends ILogicTable> T findLogic(Class<T> clazz,
                                       String connectionName);
}
