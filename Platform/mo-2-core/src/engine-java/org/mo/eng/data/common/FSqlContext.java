package org.mo.eng.data.common;

import org.mo.com.data.FSqlConnections;
import org.mo.com.data.ISqlConnection;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FObject;
import org.mo.eng.data.IConnectionConsole;
import org.mo.eng.data.IDatabaseConsole;

//============================================================
// <T>数据环境。</T>
//============================================================
public class FSqlContext
      extends FObject
      implements
         ISqlContext
{
   // 默认名称
   protected String _defaultName;

   // 数据库链接列表
   protected FSqlConnections _connections;

   // 数据库管理器
   protected IDatabaseConsole _databaseConsole;

   //============================================================
   // <T>构造数据环境。</T>
   //============================================================
   public FSqlContext(){
   }

   //============================================================
   // <T>构造数据环境。</T>
   //
   // @param databaseConsole 数据库控制台
   //============================================================
   public FSqlContext(IDatabaseConsole databaseConsole){
      _databaseConsole = databaseConsole;
   }

   //============================================================
   // <T>获得数据控制台。</T>
   //
   // @return 数据控制台
   //============================================================
   public IDatabaseConsole databaseConsole(){
      return _databaseConsole;
   }

   //============================================================
   // <T>关联数据控制台。</T>
   //
   // @param databaseConsole 数据控制台
   //============================================================
   public void linkDatabaseConsole(IDatabaseConsole databaseConsole){
      if(_databaseConsole != null){
         throw new FFatalError("Database console is already linked.");
      }
      _databaseConsole = databaseConsole;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @return 代码
   //============================================================
   @Override
   public String code(){
      return null;
   }

   //============================================================
   // <T>获得默认名称。</T>
   //
   // @return 默认名称
   //============================================================
   @Override
   public String defaultName(){
      return _defaultName;
   }

   //============================================================
   // <T>设置默认名称。</T>
   //
   // @param defaultName 默认名称
   //============================================================
   @Override
   public void setDefaultName(String defaultName){
      _defaultName = defaultName;
   }

   //============================================================
   // <T>获得默认链接控制台接口。</T>
   //
   // @return 链接控制台接口
   //============================================================
   @Override
   public IConnectionConsole activeConnectionConsole(){
      IConnectionConsole console = _databaseConsole.connectionConsole(_defaultName);
      return console;
   }

   //============================================================
   // <T>根据名称获得链接控制台接口。</T>
   //
   // @param name 名称
   // @return 链接控制台接口
   //============================================================
   @Override
   public IConnectionConsole activeConnectionConsole(String name){
      IConnectionConsole console = _databaseConsole.connectionConsole(name);
      return console;
   }

   //============================================================
   // <T>获得默认的数据链接。</T>
   //
   // @return 数据链接
   //============================================================
   @Override
   public ISqlConnection activeConnection(){
      return activeConnection(_defaultName);
   }

   //============================================================
   // <T>获得指定名称的数据链接。</T>
   //
   // @param name 名称
   // @return 数据链接
   //============================================================
   @Override
   public ISqlConnection activeConnection(String name){
      if(_connections == null){
         _connections = new FSqlConnections();
      }
      ISqlConnection connection = _connections.find(name);
      if(connection == null){
         connection = _databaseConsole.alloc(name);
         if(connection != null){
            _connections.set(name, connection);
         }
      }
      return connection;
   }

   //============================================================
   // <T>提交处理。</T>
   //============================================================
   @Override
   public void commit(){
      if(_connections != null){
         int count = _connections.count();
         for(int n = 0; n < count; n++){
            ISqlConnection connection = _connections.value(n);
            if(connection != null){
               connection.commit();
            }
         }
      }
   }

   //============================================================
   // <T>回滚处理。</T>
   //============================================================
   @Override
   public void rollback(){
      if(_connections != null){
         int count = _connections.count();
         for(int n = 0; n < count; n++){
            ISqlConnection connection = _connections.value(n);
            if(connection != null){
               connection.rollback();
            }
         }
      }
   }

   //============================================================
   // <T>释放处理。</T>
   //============================================================
   @Override
   public void release(){
      if(_connections != null){
         int count = _connections.count();
         for(int n = 0; n < count; n++){
            ISqlConnection connection = _connections.value(n);
            _databaseConsole.free(connection);
         }
         _connections.clear();
      }
   }

   //============================================================
   // <T>关闭处理。</T>
   //============================================================
   @Override
   public void close() throws Exception{
      release();
   }
}
