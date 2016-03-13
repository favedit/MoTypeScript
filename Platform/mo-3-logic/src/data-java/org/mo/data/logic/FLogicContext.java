package org.mo.data.logic;

import org.mo.com.data.ISqlConnection;
import org.mo.com.lang.FDictionary;
import org.mo.com.lang.reflect.RClass;
import org.mo.eng.data.IConnectionConsole;
import org.mo.eng.data.IDatabaseConsole;
import org.mo.eng.data.common.FSqlContext;

//============================================================
// <T>逻辑环境。</T>
//============================================================
public class FLogicContext
      extends FSqlContext
      implements
         ILogicContext
{
   // 逻辑表格集合
   protected FDictionary<ILogicTable> _tables;

   //============================================================
   // <T>构造逻辑环境。</T>
   //============================================================
   public FLogicContext(){
   }

   //============================================================
   // <T>构造逻辑环境。</T>
   //
   // @param databaseConsole 数据库控制台
   //============================================================
   public FLogicContext(IDatabaseConsole databaseConsole){
      _databaseConsole = databaseConsole;
      _defaultName = _databaseConsole.defaultName();
   }

   //============================================================
   // <T>获得读取数据库链接集合。</T>
   //
   // @param connectionName 类对象
   // @return 数据库链接集合
   //============================================================
   public ISqlConnection[] connectionFetch(String connectionName,
                                           String[] names){
      ISqlConnection[] connections = null;
      // 获得激活的链接
      ISqlConnection activeConnection = activeConnection(connectionName);
      // 获得链接集合
      if(names != null){
         int count = names.length;
         connections = new ISqlConnection[count + 1];
         for(int n = 0; n < count; n++){
            String name = names[n];
            ISqlConnection connection = activeConnection(name);
            connections[n] = connection;
         }
         connections[count] = activeConnection;
      }else{
         connections = new ISqlConnection[]{activeConnection};
      }
      return connections;
   }

   //============================================================
   // <T>获得读取数据库链接集合。</T>
   //
   // @param connectionName 类对象
   // @return 数据库链接集合
   //============================================================
   @Override
   public ISqlConnection[] connectionReads(String connectionName){
      IConnectionConsole connectionConsole = activeConnectionConsole(connectionName);
      String[] names = connectionConsole.readNames();
      return connectionFetch(connectionName, names);
   }

   //============================================================
   // <T>获得写入数据库链接集合。</T>
   //
   // @param connectionName 类对象
   // @return 数据库链接集合
   //============================================================
   @Override
   public ISqlConnection[] connectionWrites(String connectionName){
      IConnectionConsole connectionConsole = activeConnectionConsole(connectionName);
      String[] names = connectionConsole.writeNames();
      return connectionFetch(connectionName, names);
   }

   //============================================================
   // <T>根据类对象获得逻辑表格接口。</T>
   //
   // @param clazz 类对象
   // @return 逻辑表格接口
   //============================================================
   @Override
   @SuppressWarnings("unchecked")
   public <T extends ILogicTable> T findLogic(Class<T> clazz){
      if(_tables == null){
         _tables = new FDictionary<ILogicTable>(ILogicTable.class);
      }
      String className = clazz.getName();
      FLogicTable table = (FLogicTable)_tables.find(className);
      if(table == null){
         table = (FLogicTable)RClass.newInstance(clazz);
         table.linkLogicContext(this);
         _tables.set(className, table);
      }
      return (T)table;
   }

   //============================================================
   // <T>根据类对象获得逻辑表格接口。</T>
   //
   // @param clazz 类对象
   // @return 逻辑表格接口
   //============================================================
   @Override
   @SuppressWarnings("unchecked")
   public <T extends ILogicTable> T findLogic(Class<T> clazz,
                                              String connectionName){
      if(_tables == null){
         _tables = new FDictionary<ILogicTable>(ILogicTable.class);
      }
      String className = clazz.getName();
      FLogicTable table = (FLogicTable)_tables.find(className + "@" + connectionName);
      if(table == null){
         table = (FLogicTable)RClass.newInstance(clazz);
         table.linkLogicContext(this, connectionName);
         _tables.set(className, table);
      }
      return (T)table;
   }

   //============================================================
   // <T>释放处理。</T>
   //============================================================
   @Override
   public void release(){
      if(_tables != null){
         _tables.clear();
         _tables = null;
      }
      super.release();
   }
}
