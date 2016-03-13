package org.mo.data.synchronizer;

import org.mo.com.collections.FRow;
import org.mo.com.data.ESqlDataType;
import org.mo.com.data.FSql;
import org.mo.com.data.FSqlDatasetMeta;
import org.mo.com.data.FSqlField;
import org.mo.com.data.FSqlFields;
import org.mo.com.data.ISqlConnection;
import org.mo.com.data.ISqlDatasetReader;
import org.mo.com.data.RSql;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FObject;
import org.mo.com.lang.RDateTime;
import org.mo.com.lang.RString;
import org.mo.com.lang.type.TDateTime;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.xml.FXmlNode;

//============================================================
// <T>数据同步器。</T>
//============================================================
public class FSynchronizerTable
      extends FObject
      implements
         ISynchronizerUnit
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FSynchronizerTable.class);

   // 同步器
   protected FSynchronizer _synchronizer;

   // 配置状态
   protected boolean _statusSetup = false;

   // 名称
   protected String _name;

   // 来源数据名称
   protected String _sourceDataName;

   // 来源数据描述
   protected FSqlDatasetMeta _sourceMeta;

   // 目标数据名称
   protected String _targetDataName;

   // 目标数据描述
   protected FSqlDatasetMeta _targetMeta;

   // 关联编号字段
   protected String _linkIdField;

   // 关联日期字段
   protected String _linkDateField;

   // 记录数据编号
   protected long _recordId;

   // 记录数据编号
   protected long _recordCount = 10000;

   // 记录数据时间
   protected TDateTime _recordDateTime = new TDateTime();

   // 同步等待间隔 (1分钟)
   protected int _interval = 1000 * 60;

   // 同步间隔 (60分钟)
   protected int _syncInterval = 1000 * 60 * 60;

   // 上次执行时间
   protected TDateTime _lastDate = new TDateTime();

   //============================================================
   // <T>数据同步器。</T>
   //============================================================
   public FSynchronizerTable(){
   }

   //============================================================
   // <T>获得同步器。</T>
   //
   // @return 同步器
   //============================================================
   public FSynchronizer synchronizer(){
      return _synchronizer;
   }

   //============================================================
   // <T>设置同步器。</T>
   //
   // @param synchronizer 同步器
   //============================================================
   public void setSynchronizer(FSynchronizer synchronizer){
      _synchronizer = synchronizer;
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
   // <T>获得来源数据名称。</T>
   //
   // @return 来源数据名称
   //============================================================
   public String sourceDataName(){
      return _sourceDataName;
   }

   //============================================================
   // <T>设置来源数据名称。</T>
   //
   // @param value 来源数据名称
   //============================================================
   public void setSourceDataName(String value){
      _sourceDataName = value;
   }

   //============================================================
   // <T>获得目标数据名称。</T>
   //
   // @return 目标数据名称
   //============================================================
   public String targetDataName(){
      return _targetDataName;
   }

   //============================================================
   // <T>设置目标数据名称。</T>
   //
   // @param value 目标数据名称
   //============================================================
   public void setTargetDataName(String value){
      _targetDataName = value;
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
   // <T>转换数据。</T>
   //============================================================ 
   public String convertValue(ISqlConnection connection,
                              String value,
                              ESqlDataType typeCd){
      switch(typeCd){
         case Integer:
            return value;
         case Float:
            return value;
         case DateTime:
            return "STR_TO_DATE('" + value + "','%Y%c%d%H%i%s')";
         case String:
         case Memo:
            return "'" + RSql.formatValue(value) + "'";
         default:
            throw new FFatalError("Unknown type.");
      }
   }

   //============================================================
   // <T>目标中新建记录。</T>
   //
   // @param row 行记录
   //============================================================
   public void datasetInsertRow(ISqlConnection connection,
                                FRow row){
      FSql nameSql = new FSql();
      FSql valueSql = new FSql();
      FSqlFields fields = _targetMeta.fields();
      int count = fields.count();
      // 增加名称
      for(int n = 0; n < count; n++){
         FSqlField field = fields.get(n);
         String fieldName = field.name().toLowerCase();
         ESqlDataType fieldTypeCd = field.typeCd();
         // 追加名称
         if(n > 0){
            nameSql.append(',');
         }
         nameSql.append('`');
         nameSql.append(fieldName);
         nameSql.append('`');
         // 追加内容
         if(n > 0){
            valueSql.append(',');
         }
         if(fieldName.equals("ovld")){
            // 新建的记录一定为无效
            valueSql.append("0");
         }else{
            String value = row.find(fieldName);
            if(RString.isEmpty(value)){
               valueSql.append("NULL");
            }else{
               valueSql.append(convertValue(connection, value, fieldTypeCd));
            }
         }
      }
      // 生成命令
      FSql sql = new FSql("INSERT INTO " + _targetDataName + "(");
      sql.append(nameSql.toString());
      sql.append(") VALUES(");
      sql.append(valueSql.toString());
      sql.append(")");
      // 执行命令
      connection.executeSql(sql.toString());
   }

   //============================================================
   // <T>目标中更新记录。</T>
   //
   // @param row 行记录
   //============================================================
   public void datasetUpdateRow(ISqlConnection connection,
                                FRow row,
                                long linkId){
      FSql sql = new FSql("UPDATE " + _targetDataName + " SET ");
      int count = row.count();
      // 增加名称
      int index = 0;
      for(int n = 0; n < count; n++){
         if(index > 0){
            sql.append(',');
         }
         // 设置名称
         String name = row.name(n);
         if(name.equals("ouid")){
            continue;
         }
         sql.append('`');
         sql.append(row.name(n));
         sql.append("`=");
         // 设置内容
         String value = row.value(n);
         if(RString.isEmpty(value)){
            sql.append("NULL");
         }else{
            FSqlField field = _targetMeta.fields().get(name);
            ESqlDataType typeCd = field.typeCd();
            sql.append(convertValue(connection, value, typeCd));
         }
         index++;
      }
      sql.append(" WHERE OUID=" + linkId);
      // 执行数据处理
      connection.executeSql(sql.toString());
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @param synchronizerUnit 同步器
   // @param synchronizerDatasetUnit 同步数据集
   //============================================================
   public void loadConfig(FXmlNode xconfig){
      // 加载行对象
      _name = xconfig.get("name");
      _sourceDataName = xconfig.get("source_name", _name);
      _targetDataName = xconfig.get("target_name", _sourceDataName);
      _linkIdField = xconfig.get("link_id", _synchronizer.linkIdField());
      _linkDateField = xconfig.get("link_date", _synchronizer.linkDateField());
      // 输出日志
      _logger.debug(this, "loadConfig", "Load synchrornizer. (source_data_name={1}, target_data_name={2}, record_date={3})", _sourceDataName, _targetDataName, _recordDateTime.format());
   }

   //============================================================
   // <T>配置处理。</T>
   //
   //============================================================
   public void setup(){
      if(!_statusSetup){
         // 获得来源描述
         ISqlConnection sourceConnection = _synchronizer.allocSourceConnection();
         try{
            if(!_synchronizer.sourceTables().contains(_sourceDataName.toLowerCase())){
               throw new FFatalError("Source table is not exists. (table_name={1})", _sourceDataName);
            }
            _sourceMeta = sourceConnection.fetchTableMeta(_sourceDataName);
         }finally{
            _synchronizer.free(sourceConnection);
         }
         // 获得目标描述
         ISqlConnection targetConnection = _synchronizer.allocTargetConnection();
         try{
            if(!_synchronizer.targetTables().contains(_targetDataName.toLowerCase())){
               String tableName = _synchronizer.sourceTables().get(_sourceDataName.toLowerCase());
               syncByTable(sourceConnection, targetConnection, tableName);
            }
            _targetMeta = targetConnection.fetchTableMeta(_targetDataName);
         }finally{
            _synchronizer.free(targetConnection);
         }
         // 输出日志
         _logger.debug(this, "loadConfig", "Load synchrornizer. (source_data_name={1}, target_data_name={2}, record_date={3})", _sourceDataName, _targetDataName, _recordDateTime.format());
         _statusSetup = true;
      }
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @return 处理结果
   //============================================================
   public boolean syncByTable(ISqlConnection sourceConnection,
                              ISqlConnection targetConnection,
                              String tableName){
      // 获得来源编号范围
      FRow sqlRow = sourceConnection.find("SHOW CREATE TABLE " + tableName);
      if(sqlRow == null){
         throw new FFatalError("Table is not exists. (table_name={1})", tableName);
      }
      String createSql = sqlRow.value(1);
      targetConnection.executeSql(createSql);
      return true;
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @return 处理结果
   //============================================================
   public int syncById(ISqlConnection sourceConnection,
                       ISqlConnection targetConnection){
      // 获得来源编号范围
      FSql sourceRangeSql = new FSql("SELECT MIN({field_id}) MIN_ID, MAX({field_id}) MAX_ID FROM " + _sourceDataName);
      sourceRangeSql.bind("field_id", _linkIdField);
      FRow sourceRangeRow = sourceConnection.find(sourceRangeSql);
      if(sourceRangeRow == null){
         return 0;
      }
      long sourceMinId = sourceRangeRow.getLong("min_id");
      long sourceMaxId = sourceRangeRow.getLong("max_id");
      if(sourceMinId == 0){
         return 0;
      }
      // 获得目标编号范围
      FSql targetRangeSql = new FSql("SELECT MIN({field_id}) MIN_ID, MAX({field_id}) MAX_ID FROM " + _targetDataName);
      targetRangeSql.bind("field_id", _linkIdField);
      FRow targetRangeRow = targetConnection.find(targetRangeSql);
      if(targetRangeRow == null){
         return 0;
      }
      long targetMinId = targetRangeRow.getLong("min_id");
      long targetMaxId = targetRangeRow.getLong("max_id");
      if(sourceMaxId == targetMaxId){
         return 0;
      }
      //............................................................
      // 计算同步数据区间
      long minId = 0;
      if(targetMinId == 0){
         minId = sourceMinId;
      }else{
         minId = targetMaxId + 1;
      }
      long maxId = sourceMaxId;
      if(maxId == targetMaxId){
         return 0;
      }
      if(maxId < minId){
         return 0;
      }
      //............................................................
      // 生成查询命令
      FSql fetchSql = new FSql("SELECT * FROM {table_name} WHERE {field_id} >= {min_id} AND {field_id} <= {max_id}");
      fetchSql.bind("table_name", _sourceDataName);
      fetchSql.bind("field_id", _linkIdField);
      fetchSql.bindLong("min_id", minId);
      fetchSql.bindLong("max_id", maxId);
      // 获取数据集合
      int count = 0;
      try(ISqlDatasetReader reader = sourceConnection.fetchReader(fetchSql)){
         for(FRow row : reader){
            // 判断行是否存在
            long linkId = row.getLong(_linkIdField);
            FSql existsSql = new FSql("SELECT 1 FROM {table_name} WHERE {field_id}={link_id}");
            existsSql.bind("table_name", _targetDataName);
            existsSql.bind("field_id", _linkIdField);
            existsSql.bindLong("link_id", linkId);
            boolean exsits = targetConnection.executeExist(existsSql);
            // 更新处理
            if(!exsits){
               datasetInsertRow(targetConnection, row);
            }else{
               datasetUpdateRow(targetConnection, row, linkId);
            }
            count++;
         }
         // 输出信息
         _logger.info(this, "syncById", "Process synchrornizer. (source_data_name={1}, target_data_name={2}, begin_id={3}, end_id={4}, count={5})", _sourceDataName, _targetDataName, minId, maxId, count);
      }
      return count;
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @return 处理结果
   //============================================================
   public int syncByDate(ISqlConnection sourceConnection,
                         ISqlConnection targetConnection){
      // 获得来源编号范围
      FSql sourceRangeSql = new FSql("SELECT MIN({field_date}) MIN_DATE, MAX({field_date}) MAX_DATE FROM " + _sourceDataName);
      sourceRangeSql.bind("field_date", _linkDateField);
      FRow sourceRangeRow = sourceConnection.find(sourceRangeSql);
      if(sourceRangeRow == null){
         return 0;
      }
      TDateTime sourceMinDate = RDateTime.parseDateTime(sourceRangeRow.get("min_date"));
      TDateTime sourceMaxDate = RDateTime.parseDateTime(sourceRangeRow.get("max_date"));
      if(sourceMinDate.isEmpty()){
         return 0;
      }
      // 获得目标编号范围
      FSql targetRangeSql = new FSql("SELECT MIN({field_date}) MIN_DATE, MAX({field_date}) MAX_DATE FROM " + _targetDataName);
      targetRangeSql.bind("field_date", _linkDateField);
      FRow targetRangeRow = targetConnection.find(targetRangeSql);
      if(targetRangeRow == null){
         return 0;
      }
      TDateTime targetMinDate = RDateTime.parseDateTime(targetRangeRow.get("min_date"));
      TDateTime targetMaxDate = RDateTime.parseDateTime(targetRangeRow.get("max_date"));
      if(sourceMaxDate.get() == targetMaxDate.get()){
         return 0;
      }
      //............................................................
      // 计算同步数据区间
      TDateTime minDate = new TDateTime(0);
      if(targetMinDate.isEmpty()){
         minDate.assign(sourceMinDate);
      }else{
         minDate.assign(targetMinDate);
      }
      TDateTime maxDate = new TDateTime(minDate);
      maxDate.addDay(1);
      if(maxDate.get() > sourceMaxDate.get()){
         maxDate.assign(sourceMaxDate);
      }
      if(maxDate.get() < minDate.get()){
         return 0;
      }
      //............................................................
      // 生成查询命令
      FSql fetchSql = new FSql("SELECT * FROM {table_name} WHERE {field_date} >= {min_date} AND {field_date} < {max_date}");
      fetchSql.bind("table_name", _sourceDataName);
      fetchSql.bind("field_date", _linkDateField);
      fetchSql.bindDateTime("min_date", minDate, "YYYY-MM-DD HH24:MI:SS");
      fetchSql.bindDateTime("max_date", minDate, "YYYY-MM-DD HH24:MI:SS");
      // 获取数据集合
      int count = 0;
      try(ISqlDatasetReader reader = sourceConnection.fetchReader(fetchSql)){
         for(FRow row : reader){
            // 判断行是否存在
            long linkId = row.getLong(_linkIdField);
            FSql existsSql = new FSql("SELECT 1 FROM {table_name} WHERE {field_id}={link_id}");
            existsSql.bind("table_name", _targetDataName);
            existsSql.bind("field_id", _linkIdField);
            existsSql.bindLong("link_id", linkId);
            boolean exsits = targetConnection.executeExist(existsSql);
            // 更新处理
            if(!exsits){
               datasetInsertRow(targetConnection, row);
            }else{
               datasetUpdateRow(targetConnection, row, linkId);
            }
            count++;
         }
         // 输出信息
         _logger.info(this, "syncByDate", "Process synchrornizer. (source_data_name={1}, target_data_name={2}, begin_date={3}, end_date={4}, count={5})", _sourceDataName, _targetDataName, minDate.format(), maxDate.format(), count);
      }
      return count;
   }

   //============================================================
   // <T>同步处理。</T>
   //
   // @return 处理结果
   //============================================================
   @Override
   public boolean process(){
      boolean result = false;
      // 检查间隔时间
      long currentDate = RDateTime.currentDateTime().get();
      long interval = currentDate - _lastDate.get();
      if(interval < _interval){
         return false;
      }
      // 获得来源数据库信息
      ISqlConnection sourceConnection = _synchronizer.allocSourceConnection();
      ISqlConnection targetConnection = _synchronizer.allocTargetConnection();
      try{
         // 按照编号同步
         if(!RString.isEmpty(_linkIdField)){
            int count = syncById(sourceConnection, targetConnection);
            if(count == 0){
               // 按照更新日期同步
               if(!RString.isEmpty(_linkDateField)){
                  syncByDate(sourceConnection, targetConnection);
               }
            }
         }
      }finally{
         _synchronizer.free(sourceConnection);
         _synchronizer.free(targetConnection);
      }
      return result;
   }
}
