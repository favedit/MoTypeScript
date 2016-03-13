package org.mo.data.synchronizer;

import org.mo.com.collections.FDataset;
import org.mo.com.collections.FRow;
import org.mo.com.data.ISqlConnection;
import org.mo.com.lang.FAttributes;
import org.mo.com.lang.FObject;
import org.mo.com.lang.FObjects;
import org.mo.com.lang.RString;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.xml.FXmlNode;
import org.mo.eng.data.IDatabaseConsole;

//============================================================
// <T>数据同步器。</T>
//============================================================
public class FSynchronizer
      extends FObject
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FSynchronizer.class);

   // 名称
   protected String _name;

   // 处理间隔
   protected int _interval;

   // 来源链接名称
   protected String _sourceConnectionName;

   // 目标链接名称
   protected String _targetConnectionName;

   // 关联编号字段
   protected String _linkIdField;

   // 关联日期字段
   protected String _linkDateField;

   // 链接控制台
   protected IDatabaseConsole _databaseConsole;

   // 来源表信息
   protected FAttributes _sourceTables = new FAttributes();

   // 目标表信息
   protected FAttributes _targetTables = new FAttributes();

   // 同步器单元集合
   protected FObjects<FSynchronizerTable> _tables = new FObjects<FSynchronizerTable>(FSynchronizerTable.class);

   // 处理线程
   protected FSynchronizerThread _thread = new FSynchronizerThread();

   //============================================================
   // <T>构造数据同步器线程来源。</T>
   //============================================================
   public FSynchronizer(){
      _thread.setSource(this);
   }

   //============================================================
   // <T>获得名称。</T>
   //
   // @return 名称
   //============================================================
   public String name(){
      return _name;
   }

   //============================================================
   // <T>设置名称。</T>
   //
   // @param name 名称
   //============================================================
   public void setName(String name){
      _name = name;
   }

   //============================================================
   // <T>获得间隔。</T>
   //
   // @return 间隔
   //============================================================
   public int interval(){
      return _interval;
   }

   //============================================================
   // <T>设置间隔。</T>
   //
   // @param interval 间隔
   //============================================================
   public void setInterval(int interval){
      _interval = interval;
   }

   //============================================================
   // <T>获得来源链接名称。</T>
   //
   // @return 来源链接名称
   //============================================================
   public String sourceConnectionName(){
      return _sourceConnectionName;
   }

   //============================================================
   // <T>设置来源链接名称。</T>
   //
   // @param value 来源链接名称
   //============================================================
   public void setSourceConnectionName(String value){
      _sourceConnectionName = value;
   }

   //============================================================
   // <T>获得目标链接名称。</T>
   //
   // @return 目标链接名称
   //============================================================
   public String targetConnectionName(){
      return _targetConnectionName;
   }

   //============================================================
   // <T>设置目标链接名称。</T>
   //
   // @param value 目标链接名称
   //============================================================
   public void setTargetConnectionName(String value){
      _targetConnectionName = value;
   }

   //============================================================
   // <T>获得关联编号字段。</T>
   //
   // @return 关联编号字段
   //============================================================
   public String linkIdField(){
      return _linkIdField;
   }

   //============================================================
   // <T>设置关联编号字段。</T>
   //
   // @param linkIdField 关联编号字段
   //============================================================
   public void setLinkIdField(String linkIdField){
      _linkIdField = linkIdField;
   }

   //============================================================
   // <T>获得关联时间字段。</T>
   //
   // @return 关联时间字段
   //============================================================
   public String linkDateField(){
      return _linkDateField;
   }

   //============================================================
   // <T>设置关联时间字段。</T>
   //
   // @param linkDateField 关联时间字段
   //============================================================
   public void setLinkDateField(String linkDateField){
      _linkDateField = linkDateField;
   }

   //============================================================
   // <T>获得链接控制台。</T>
   //
   // @return 链接控制台
   //============================================================
   public IDatabaseConsole databaseConsole(){
      return _databaseConsole;
   }

   //============================================================
   // <T>设置链接控制台。</T>
   //
   // @param connectorConsole 链接控制台
   //============================================================
   public void setDatabaseConsole(IDatabaseConsole databaseConsole){
      _databaseConsole = databaseConsole;
   }

   //============================================================
   // <T>来源表信息。</T>
   //
   // @return 来源表信息
   //============================================================
   public FAttributes sourceTables(){
      return _sourceTables;
   }

   //============================================================
   // <T>目标表信息。</T>
   //
   // @return 目标表信息
   //============================================================
   public FAttributes targetTables(){
      return _targetTables;
   }

   //============================================================
   // <T>获得同步器单元集合。</T>
   //
   // @return 同步器单元集合
   //============================================================
   public FObjects<FSynchronizerTable> tables(){
      return _tables;
   }

   //============================================================
   // <T>增加一个同步器单元。</T>
   //
   // @param unit 同步器单元
   //============================================================
   public void push(FSynchronizerTable table){
      table.setSynchronizer(this);
      _tables.push(table);
   }

   //============================================================
   // <T>获得线程。</T>
   //
   // @return 线程
   //============================================================
   public FSynchronizerThread thread(){
      return _thread;
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @param synchronizerUnit 同步器
   // @param synchronizerDatasetUnit 同步数据集
   //============================================================
   public void loadConfig(FXmlNode xconfig){
      // 加载行对象
      _name = xconfig.get("name", null);
      _sourceConnectionName = xconfig.get("source_name");
      _targetConnectionName = xconfig.get("target_name", _sourceConnectionName);
      _linkIdField = xconfig.get("link_id", null);
      _linkDateField = xconfig.get("link_date", null);
      // 输出日志
      _logger.debug(this, "load", "Load synchrornizer. (name={1}, source_name={2}, target_name={3})", _name, _sourceConnectionName, _targetConnectionName);
   }

   //============================================================
   // <T>收集一个来源链接。</T>
   //
   // @return 链接
   //============================================================
   public ISqlConnection allocSourceConnection(){
      return _databaseConsole.alloc(_sourceConnectionName);
   }

   //============================================================
   // <T>收集一个目标链接。</T>
   //
   // @return 链接
   //============================================================
   public ISqlConnection allocTargetConnection(){
      return _databaseConsole.alloc(_targetConnectionName);
   }

   //============================================================
   // <T>收集一个数据链接。</T>
   //
   // @param connection 链接
   //============================================================
   public void free(ISqlConnection connection){
      _databaseConsole.free(connection);
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @param synchronizerUnit 同步器
   // @param synchronizerDatasetUnit 同步数据集
   //============================================================
   public void setup(){
      ISqlConnection sourceConnection = allocSourceConnection();
      ISqlConnection targetConnection = allocTargetConnection();
      try{
         FDataset sourceTables = sourceConnection.fetchDataset("SHOW TABLES");
         for(FRow row : sourceTables){
            String tableName = row.value(0);
            //            if("*".equals(_tableNames)){
            //               FSynchronizerTable table = new FSynchronizerTable();
            //               table.setName(tableName);
            //               table.setSourceDataName(tableName);
            //               table.setTargetDataName(tableName);
            //               table.setSynchronizer(this);
            //               _tables.push(table);
            //            }
            _sourceTables.set(RString.toLower(tableName), tableName);
         }
         FDataset targetTables = targetConnection.fetchDataset("SHOW TABLES");
         for(FRow row : targetTables){
            String tableName = row.value(0);
            _targetTables.set(RString.toLower(tableName), tableName);
         }
         //         // 创建表格
         //         int count = _tables.count();
         //         for(int n = 0; n < count; n++){
         //            for(FSynchronizerTable table : _tables){
         //               String tableName = table.targetDataName();
         //               if(!_targetTables.contains(tableName)){
         //                  try{
         //                     table.setup();
         //                  }catch(Exception exception){
         //                     _logger.error(this, "setup", exception);
         //                  }
         //               }
         //            }
         //         }
      }finally{
         free(sourceConnection);
         free(targetConnection);
      }
   }

   //============================================================
   // <T>启动来源。</T>
   //============================================================
   public void startup(){
      _thread.start();
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @param synchronizer 同步器
   //============================================================
   public boolean process(){
      boolean result = false;
      for(FSynchronizerTable table : _tables){
         boolean processResult = table.process();
         if(processResult){
            result = true;
         }
      }
      return result;
   }
}
