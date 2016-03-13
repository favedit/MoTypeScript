package org.mo.com.data;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Iterator;
import org.mo.com.collections.FRow;
import org.mo.com.collections.SDataField;
import org.mo.com.lang.FFatalError;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;

//============================================================
// <T>数据集合阅读器。</T>
//============================================================
public class FSqlDatasetReader
      implements
         ISqlDatasetReader
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FSqlDatasetReader.class);

   // 数据库链接
   protected MSqlConnection _connection;

   // 描述信息
   protected FSqlDatasetMeta _meta;

   // 打开
   protected boolean _opened;

   // 状态对象
   protected Statement _statement;

   // 结果集对象
   protected ResultSet _resultSet;

   // 是否有下一个
   protected boolean _hasNext;

   // 当前行
   protected SDataField[] _fields;

   // 当前行
   protected FRow _current = new FRow();

   // 当前行索引
   protected int _currentIndex;

   //============================================================
   // <T>构造数据集合阅读器。</T>
   //
   // @param connection 数据链接
   //============================================================
   public FSqlDatasetReader(MSqlConnection connection){
      _connection = connection;
   }

   //============================================================
   // <T>获得数据描述信息。</T>
   //
   // @return 数据描述信息
   //============================================================
   @Override
   public FSqlDatasetMeta meta(){
      if(_meta == null){
         _meta = new FSqlDatasetMeta();
         try{
            _connection.fillDatabaseMeta(_meta, _resultSet.getMetaData());
         }catch(Exception e){
            throw new FFatalError(e);
         }
      }
      return _meta;
   }

   //============================================================
   // <T>打开阅读器。</T>
   //
   // @param connection 链接
   // @param sql 链接
   //============================================================
   public void open(MSqlConnection connection,
                    String sql){
      // 检查标志
      if(_opened){
         return;
      }
      _opened = true;
      // 打开处理
      Exception exception = null;
      try{
         if(_logger.debugAble()){
            _logger.debug(this, "Open", "Open dataset reader. (sql={1})", sql);
         }
         _currentIndex = 0;
         Connection sqlConnection = connection.sqlConnection();
         _statement = sqlConnection.createStatement();
         _resultSet = _statement.executeQuery(sql);
         if(_resultSet != null){
            // 获得数据列信息
            _fields = RSqlConnection.fillFields(_resultSet);
            _hasNext = _resultSet.next();
         }
      }catch(Exception e){
         exception = e;
         // 关闭结果集
         if(_resultSet != null){
            try{
               _resultSet.close();
            }catch(Exception ex){
               exception = ex;
            }
         }
         // 关闭查询声明
         if(_statement != null){
            try{
               _statement.close();
            }catch(Exception ex){
               exception = ex;
            }
         }
         // 如果产生错误，则抛出
         if(exception != null){
            throw new FFatalError(exception, "Open dataset reader failure. (sql={1})", sql);
         }
      }
   }

   //============================================================
   // <T>获得迭代器。</T>
   //
   // @return 迭代器
   //============================================================
   @Override
   public Iterator<FRow> iterator(){
      return this;
   }

   //============================================================
   // <T>判断是否存在下一行。</T>
   //
   // @return 是否存在下一行
   //============================================================
   @Override
   public boolean hasNext(){
      return _hasNext;
   }

   //============================================================
   // <T>获得当前索引。</T>
   //
   // @return 索引
   //============================================================
   @Override
   public int currentIndex(){
      return _currentIndex;
   }

   //============================================================
   // <T>获得当前行数据。</T>
   //
   // @return 行数据
   //============================================================
   @Override
   public FRow currentRow(){
      return _current;
   }

   //============================================================
   // <T>读取下一行数据。</T>
   //
   // @return 行数据
   //============================================================
   @Override
   public FRow next(){
      if(_hasNext){
         try{
            _connection.fillUnit(_current, _resultSet, _fields);
            _hasNext = _resultSet.next();
            _currentIndex++;
         }catch(Exception e){
            throw new FFatalError(e);
         }
      }
      return _current;
   }

   //============================================================
   // <T>移除数据处理。</T>
   //============================================================
   @Override
   public void remove(){
      throw new NoSuchMethodError();
   }

   //============================================================
   // <T>关闭阅读器。</T>
   //============================================================
   @Override
   public void close(){
      // 检查标志
      if(!_opened){
         return;
      }
      _opened = false;
      // 关闭结果集
      Exception exception = null;
      if(_resultSet != null){
         try{
            _resultSet.close();
            _resultSet = null;
         }catch(Exception e){
            exception = e;
         }
      }
      // 关闭查询声明
      if(_statement != null){
         try{
            _statement.close();
            _statement = null;
         }catch(Exception e){
            exception = e;
         }
      }
      // 如果产生错误，则抛出
      if(exception != null){
         throw new FFatalError(exception);
      }
      _logger.debug(this, "Close", "Close dataset reader. (read_count={1})", _currentIndex);
   }
}
