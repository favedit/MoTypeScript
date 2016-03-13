package org.mo.data.logic;

import org.mo.com.collections.FDataset;
import org.mo.com.collections.FRow;
import org.mo.com.data.FSql;
import org.mo.com.data.ISqlConnection;
import org.mo.com.data.ISqlDatasetReader;
import org.mo.com.lang.EResult;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FObject;
import org.mo.com.lang.FString;
import org.mo.com.lang.RString;
import org.mo.com.lang.reflect.RClass;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.core.aop.RAop;
import org.mo.core.bind.IBindConsole;
import org.mo.data.logic.cache.FLogicCacheChannel;
import org.mo.data.logic.cache.FLogicCacheDataset;
import org.mo.data.logic.cache.ILogicCacheVendor;
import org.mo.eng.cache.ECacheConstant;
import org.mo.eng.cache.ICacheChannel;
import org.mo.eng.data.FDataOperator;

//============================================================
// <T>逻辑数据表。</T>
// <P>修改记录时，是否所有Search和fetchDataset内容。</P>
//============================================================
public abstract class FLogicTable
      extends FObject
      implements
         ILogicTable
{
   // 数据超时时间[1分钟]
   public static int DATASET_CACHE_TIMEOUT = 60;

   // 数据集合条数限制
   public static int DATASET_CACHE_LIMIT = 256;

   // 日志输出接口
   private static ILogger _logger = RLogger.find(FLogicTable.class);

   // 名称
   protected String _name;

   // 单元类对象
   protected Class<?> _classUnit;

   // 逻辑环境
   protected ILogicContext _logicContext;

   // 数据库读取链接
   protected ISqlConnection[] _connectionReads;

   // 数据库写入链接
   protected ISqlConnection[] _connectionWrites;

   // 逻辑单元缓冲提供商
   protected ILogicCacheVendor _logicCacheVendor;

   // 逻辑单元缓冲频道
   protected FLogicCacheChannel _logicCacheChannel;

   // 逻辑单元缓冲
   protected FLogicCacheDataset _logicCacheDataset;

   // 内存单元缓冲
   protected ICacheChannel _cacheChannel;

   // 记录行超时
   protected int _timeout = DATASET_CACHE_TIMEOUT;

   //============================================================
   // <T>构造逻辑数据集合。</T>
   //============================================================
   public FLogicTable(){
   }

   //============================================================
   // <T>构造逻辑数据集合。</T>
   //
   // @param context 逻辑环境
   //============================================================
   public FLogicTable(ILogicContext context){
      linkLogicContext(context);
   }

   //============================================================
   // <T>获得逻辑环境。</T>
   //
   // @return 逻辑环境
   //============================================================
   public ILogicContext logicContext(){
      return _logicContext;
   }

   //============================================================
   // <T>获得数据读取链接。</T>
   //
   // @return 数据读取链接
   //============================================================
   public ISqlConnection connectionRead(){
      return _connectionReads[0];
   }

   //============================================================
   // <T>获得数据读取链接。</T>
   //
   // @return 数据读取链接
   //============================================================
   public ISqlConnection[] connectionReads(){
      return _connectionReads;
   }

   //============================================================
   // <T>获得数据写入链接。</T>
   //
   // @return 数据写入链接
   //============================================================
   public ISqlConnection[] connectionWrites(){
      return _connectionWrites;
   }

   //============================================================
   // <T>设置逻辑环境。</T>
   //
   // @param logicContext 逻辑环境
   //============================================================
   public void linkLogicContext(ILogicContext logicContext){
      SLogicConnectionInfo connectionInfo = connectionInfo();
      linkLogicContext(logicContext, connectionInfo.name());
   }

   //============================================================
   // <T>设置逻辑环境。</T>
   //
   // @param logicContext 逻辑环境
   // @param connectionName 链接名称
   //============================================================
   public void linkLogicContext(ILogicContext logicContext,
                                String connectionName){
      _logicContext = logicContext;
      // 获得链接
      ISqlConnection connection = logicContext.activeConnection(connectionName);
      if(connection instanceof ILogicCacheVendor){
         _logicCacheVendor = (ILogicCacheVendor)connection;
         if(_logicCacheVendor != null){
            _logicCacheChannel = _logicCacheVendor.channel();
            if(_logicCacheChannel != null){
               _cacheChannel = _logicCacheChannel.cacheChannel();
            }
         }
      }
      // 获得读取集合
      _connectionReads = logicContext.connectionReads(connectionName);
      _connectionWrites = logicContext.connectionWrites(connectionName);
   }

   //============================================================
   // <T>获得数据链接信息。</T>
   //
   // @return 数据链接
   //============================================================
   public abstract SLogicConnectionInfo connectionInfo();

   //============================================================
   // <T>获得数据集合信息。</T>
   //
   // @return 数据集合链接
   //============================================================
   public abstract SLogicTableInfo tableInfo();

   //============================================================
   // <T>获得字段集合字符串。</T>
   //
   // @return 字段集合字符串
   //============================================================
   public abstract String fieldsInfo();

   //============================================================
   // <T>获得本地缓冲集合。</T>
   //
   // @return 本地缓冲集合
   //============================================================
   protected FLogicCacheDataset innerCacheDataset(){
      if(_logicCacheDataset == null){
         if(_logicCacheVendor != null){
            FLogicCacheChannel channel = _logicCacheVendor.channel();
            if(channel != null){
               _logicCacheDataset = channel.syncCache(_name);
            }
         }
      }
      return _logicCacheDataset;
   }

   //============================================================
   // <T>根据主键获得行记录。</T>
   //
   // @param code 代码
   // @return 行记录
   //============================================================
   protected FRow innerCacheFindRow(long code){
      FLogicCacheDataset dataset = innerCacheDataset();
      if(dataset != null){
         FRow unit = dataset.get(code);
         if(unit != null){
            _logger.debug(this, "innerCacheFindRow", "Find row from cache. (code={1})", code);
         }
         return unit;
      }
      return null;
   }

   //============================================================
   // <T>根据主键设置行记录。</T>
   //
   // @param code 代码
   // @param row 行记录
   //============================================================
   protected void innerCacheSetRow(long code,
                                   FRow row){
      FLogicCacheDataset dataset = innerCacheDataset();
      if(dataset != null){
         dataset.set(code, row);
      }
   }

   //============================================================
   // <T>根据主键删除行记录。</T>
   //
   // @param code 代码
   //============================================================
   protected void innerCacheDeleteRow(long code){
      FLogicCacheDataset dataset = innerCacheDataset();
      if(dataset != null){
         dataset.set(code, null);
      }
   }

   //============================================================
   // <T>清空本地缓冲。</T>
   //============================================================
   protected void innerCacheClear(){
      FLogicCacheDataset dataset = innerCacheDataset();
      if(dataset != null){
         dataset.clear();
      }
   }

   //============================================================
   // <T>生成内存缓冲主键。</T>
   //
   // @param fields 字段集合
   // @param whereSql 查询命令
   // @param groupSql 分组命令
   // @param orderSql 排序命令
   // @return 主键
   //============================================================
   protected String innerMemcacheKey(CharSequence fields,
                                     CharSequence whereSql,
                                     CharSequence groupSql,
                                     CharSequence orderSql){
      FString key = new FString();
      key.append(fields);
      key.append(ECacheConstant.Spliter);
      key.append(whereSql);
      key.append(ECacheConstant.Spliter);
      key.append(groupSql);
      key.append(ECacheConstant.Spliter);
      key.append(orderSql);
      return key.toString();
   }

   //============================================================
   // <T>清空内存缓冲。</T>
   //============================================================
   protected void innerMemcacheClear(){
      // 缓冲内容
      FLogicCacheDataset cacheDataset = innerCacheDataset();
      cacheDataset.tableFlush();
   }

   //============================================================
   // <T>执行一个数据命令，清空所有缓存。</T>
   //
   // @param sql 数据命令
   // @return 处理结果
   //============================================================
   protected long innerInsertSql(CharSequence sql){
      long recordId = 0;
      for(ISqlConnection connection : _connectionWrites){
         recordId = connection.executeInsertSql(sql);
      }
      return recordId;
   }

   //============================================================
   // <T>执行一个数据命令，清空所有缓存。</T>
   //
   // @param sql 数据命令
   // @return 处理结果
   //============================================================
   protected EResult innerExecuteSql(CharSequence sql){
      for(ISqlConnection connection : _connectionWrites){
         boolean result = connection.executeSql(sql);
         if(!result){
            return EResult.Failure;
         }
      }
      return EResult.Success;
   }

   //============================================================
   // <T>创建一个空数据单元。</T>
   //
   // @return 数据单元
   //============================================================
   protected abstract <T extends FLogicUnit> T innerCreateUnit();

   //============================================================
   // <T>创建一个空数据集合。</T>
   //
   // @return 数据集合
   //============================================================
   protected abstract <T extends FLogicUnit> FLogicDataset<T> innerCreateDataset();

   //============================================================
   // <T>根据主键查询行记录。</T>
   //
   // @param id 编号
   // @return 行记录
   //============================================================
   protected FRow innerFindRow(long id,
                               CharSequence sql){
      FRow row = null;
      ISqlConnection connection = connectionRead();
      if(_logicCacheChannel == null){
         row = connection.find(sql);
      }else{
         // 查找数据
         FLogicCacheDataset cacheDataset = innerCacheDataset();
         String key = cacheDataset.makeRowKey(id);
         String value = _cacheChannel.getString(key);
         if(!RString.isEmpty(value)){
            // 解析数据
            row = new FRow();
            row.unpack(value);
            _logger.debug(this, "innerFindRow", "Find row from memcache. (key={1})", key);
         }
         // 查询数据
         if(row == null){
            row = connection.find(sql);
            // 存储数据
            if(row != null){
               String pack = row.pack();
               _cacheChannel.setString(key, pack, _timeout);
            }
         }
      }
      return row;
   }

   //============================================================
   // <T>根据主键查询行记录。</T>
   //
   // @param code 代码
   // @param sql 命令
   // @return 行记录
   //============================================================
   protected FRow innerFindRow(CharSequence code,
                               CharSequence sql){
      FRow row = null;
      ISqlConnection connection = connectionRead();
      if(_logicCacheChannel == null){
         row = connection.find(sql);
      }else{
         // 查找数据
         FLogicCacheDataset cacheDataset = innerCacheDataset();
         String key = cacheDataset.makeFetchKey(code);
         String value = _cacheChannel.getString(key);
         if(!RString.isEmpty(value)){
            // 解析数据
            row = new FRow();
            row.unpack(value);
            _logger.debug(this, "innerFindRow", "Find row from memcache. (key={1})", key);
         }
         // 查询数据
         if(row == null){
            row = connection.find(sql);
            // 存储数据
            if(row != null){
               String pack = row.pack();
               _cacheChannel.setString(key, pack, _timeout);
            }
         }
      }
      return row;
   }

   //============================================================
   // <T>根据主键查询行记录。</T>
   //
   // @param id 编号
   // @return 行记录
   //============================================================
   protected void innerDeleteRow(long id){
      // 检查记录编号
      if(id == 0){
         throw new FFatalError("Record is invalid.");
      }
      // 删除本地缓冲
      innerCacheDeleteRow(id);
      // 删除内存缓冲
      if(_logicCacheChannel != null){
         // 清空记录缓冲
         FLogicCacheDataset cacheDataset = innerCacheDataset();
         String key = cacheDataset.makeRowKey(id);
         _cacheChannel.delete(key);
         // 清空search和fetch缓冲内容
         cacheDataset.tableFlush();
      }
   }

   //============================================================
   // <T>查询数据集合。</T>
   //
   // @param sql 查询命令
   // @param pageSize 页大小
   // @param page 页号
   // @return 数据集合
   //============================================================
   protected FDataset innerFindDataset(CharSequence code,
                                       CharSequence sql,
                                       int pageSize,
                                       int page){
      FDataset dataset = null;
      String key = null;
      if(_logicCacheChannel != null){
         // 查找数据
         FLogicCacheDataset cacheDataset = innerCacheDataset();
         key = cacheDataset.makeFetchKey(code + ECacheConstant.Spliter + pageSize + ECacheConstant.Spliter + page);
         String value = _cacheChannel.getString(key);
         if(!RString.isEmpty(value)){
            // 解析数据
            dataset = new FDataset();
            dataset.unpack(value);
            _logger.debug(this, "innerFindDataset", "Find dataset from memcache. (key={1}, count={2}, sql={3})", key, dataset.count(), sql);
         }
      }
      // 查询数据
      if(dataset == null){
         ISqlConnection connection = connectionRead();
         if(pageSize > 0){
            dataset = connection.fetchDataset(sql, pageSize, page);
         }else{
            dataset = connection.fetchDataset(sql);
         }
         // 存储结果集合
         if(_logicCacheChannel != null){
            if(dataset != null){
               int count = dataset.count();
               if(count < DATASET_CACHE_LIMIT){
                  String pack = dataset.pack();
                  _cacheChannel.setString(key, pack, _timeout);
               }
            }
         }
      }
      return dataset;
   }

   //============================================================
   // <T>根据编号生成查询字符串。</T>
   //
   // @param fields 选取字段
   // @param id 编号
   // @return 查询字符串
   //============================================================
   public String makeFindSql(CharSequence fields,
                             long id){
      FString sql = new FString("SELECT ");
      if(RString.isEmpty(fields)){
         sql.append(fieldsInfo());
      }else{
         sql.append(fields);
      }
      sql.append(" FROM ");
      sql.append(_name);
      sql.append(" WHERE OUID=");
      sql.append(id);
      return sql.toString();
   }

   //============================================================
   // <T>根据信息生成查询字符串。</T>
   //
   // @param fields 选取字段
   // @param whereSql 条件命令
   // @param groupSql 分组命令
   // @param orderSql 排序命令
   // @param position 位置
   // @param count 总数
   // @return 查询字符串
   //============================================================
   public String makeFetchSql(CharSequence fields,
                              CharSequence whereSql,
                              CharSequence groupSql,
                              CharSequence orderSql,
                              int position,
                              int count){
      // 生成选取
      FString sql = new FString("SELECT ");
      if(RString.isEmpty(fields)){
         sql.append(fieldsInfo());
      }else{
         sql.append(fields);
      }
      sql.append(" FROM ");
      sql.append(_name);
      // 生成条件
      if(!RString.isEmpty(whereSql)){
         sql.append(" WHERE ");
         sql.append(whereSql);
      }
      // 生成分组
      if(!RString.isEmpty(groupSql)){
         sql.append(" GROUP BY ");
         sql.append(groupSql);
      }
      // 生成排序
      if(!RString.isEmpty(orderSql)){
         sql.append(" ORDER BY ");
         sql.append(orderSql);
      }
      // 生成结果限制
      if(position > 0 || count > 0){
         sql.append(" LIMIT ");
         if(position > 0){
            sql.append(position);
            sql.append(',');
            sql.append(count);
         }else{
            sql.append(count);
         }
      }
      return sql.toString();
   }

   //============================================================
   // <T>执行一个数据命令，清空所有缓存。</T>
   //
   // @param sql 数据命令
   // @return 处理结果
   //============================================================
   public EResult executeSql(CharSequence sql){
      // 删除本地缓冲
      innerCacheClear();
      // 删除内存缓冲
      innerMemcacheClear();
      // 执行SQL内容
      for(ISqlConnection connection : _connectionWrites){
         boolean result = connection.executeSql(sql);
         if(!result){
            return EResult.Failure;
         }
      }
      return EResult.Success;
   }

   //============================================================
   // <T>执行一个数据命令，清空所有缓存。</T>
   //
   // @param sql 数据命令
   // @return 处理结果
   //============================================================
   public ISqlDatasetReader fetchReader(CharSequence sql){
      ISqlConnection connection = connectionRead();
      return connection.fetchReader(sql);
   }

   //============================================================
   // <T>根据编号获得一个数据单元。</T>
   //
   // @param id 记录编号
   // @return 数据单元
   //============================================================
   @SuppressWarnings("unchecked")
   public <T extends FLogicUnit> T find(long id){
      return (T)find(null, null, id);
   }

   //============================================================
   // <T>根据编号获得一个数据单元。</T>
   //
   // @param clazz 类对象
   // @param id 记录编号
   // @return 数据单元
   //============================================================
   public <T extends FLogicUnit> T find(Class<T> clazz,
                                        long id){
      return find(null, clazz, id);
   }

   //============================================================
   // <T>根据编号获得一个数据单元。</T>
   //
   // @param unit 数据单元
   // @param id 记录编号
   // @return 是否获得
   //============================================================
   public boolean find(FLogicUnit unit,
                       long id){
      Object result = find(unit, null, id);
      return (result != null);
   }

   //============================================================
   // <T>根据编号获得一个数据单元。</T>
   //
   // @param unit 数据单元
   // @param clazz 类对象
   // @param recordId 记录编号
   // @return 是否获得
   //============================================================
   public <T extends FLogicUnit> T find(T unit,
                                        Class<T> clazz,
                                        long recordId){
      // 检查编号
      if(recordId <= 0){
         return null;
      }
      // 生成命令
      FSql cmd = new FSql("SELECT ");
      cmd.append(fieldsInfo());
      cmd.append(" FROM ");
      cmd.append(_name);
      cmd.append(" WHERE OUID=");
      cmd.append(recordId);
      String sql = cmd.toString();
      // 获得行记录
      FRow row = innerFindRow(recordId, sql);
      // 检查结果
      if(row == null){
         return null;
      }
      // 获得数据
      if(unit == null){
         if(clazz == null){
            unit = innerCreateUnit();
         }else{
            unit = RClass.newInstance(clazz);
         }
      }
      unit.linkLogicContext(_logicContext);
      unit.load(row);
      return unit;
   }

   //============================================================
   // <T>根据唯一编号获得一个数据单元。</T>
   //
   // @param clazz 类对象
   // @param guid 唯一编号
   // @return 数据单元
   //============================================================
   public <T extends FLogicUnit> T findByGuid(Class<T> clazz,
                                              CharSequence guid){
      return findByGuid(null, clazz, guid);
   }

   //============================================================
   // <T>根据唯一编号获得一个数据单元。</T>
   //
   // @param unit 数据单元
   // @param clazz 类对象
   // @param guid 唯一编号
   // @return 是否获得
   //============================================================
   public <T extends FLogicUnit> T findByGuid(T unit,
                                              Class<T> clazz,
                                              CharSequence guid){
      // 检查条件
      if(RString.isEmpty(guid)){
         return null;
      }
      // 生成命令
      FSql cmd = new FSql("SELECT ");
      cmd.append(fieldsInfo());
      cmd.append(" FROM ");
      cmd.append(_name);
      cmd.append(" WHERE GUID='");
      cmd.append(guid);
      cmd.append("'");
      String sql = cmd.toString();
      // 获得数据
      return searchSql(unit, clazz, guid, sql);
   }

   //============================================================
   // <T>根据条件获得一个数据单元。</T>
   //
   // @param clazz 类对象
   // @param whereSql 条件
   // @return 数据单元
   //============================================================
   public <T extends FLogicUnit> T search(Class<T> clazz,
                                          CharSequence whereSql){
      return search(null, clazz, whereSql);
   }

   //============================================================
   // <T>根据条件获得一个数据单元。</T>
   //
   // @param unit 数据单元
   // @param clazz 类对象
   // @param whereSql 条件
   // @return 是否获得
   //============================================================
   public <T extends FLogicUnit> T search(T unit,
                                          Class<T> clazz,
                                          CharSequence whereSql){
      // 检查条件
      if(RString.isEmpty(whereSql)){
         return null;
      }
      // 生成命令
      FSql sql = new FSql("SELECT ");
      sql.append(fieldsInfo());
      sql.append(" FROM ");
      sql.append(_name);
      sql.append(" WHERE ");
      sql.append(whereSql);
      sql.append(" LIMIT 1");
      // 获得数据
      return searchSql(unit, clazz, whereSql, sql);
   }

   //============================================================
   // <T>根据条件获得一个数据单元。</T>
   //
   // @param unit 数据单元
   // @param clazz 类对象
   // @param whereSql 条件
   // @param orderSql 排序
   // @return 是否获得
   //============================================================
   public <T extends FLogicUnit> T search(T unit,
                                          Class<T> clazz,
                                          CharSequence whereSql,
                                          CharSequence orderSql){
      // 检查条件
      if(RString.isEmpty(whereSql)){
         return null;
      }
      // 检查排序
      if(RString.isEmpty(orderSql)){
         return null;
      }
      // 生成命令
      FSql sql = new FSql("SELECT ");
      sql.append(fieldsInfo());
      sql.append(" FROM ");
      sql.append(_name);
      sql.append(" WHERE ");
      sql.append(whereSql);
      sql.append(" ORDER BY ");
      sql.append(orderSql);
      sql.append(" LIMIT 1");
      // 获得数据
      return searchSql(unit, clazz, whereSql + "|" + orderSql, sql);
   }

   //============================================================
   // <T>根据查询获得一个数据单元。</T>
   //
   // @param unit 数据单元
   // @param code 代码
   // @param whereSql 条件
   // @return 是否获得
   //============================================================
   public boolean searchSql(FLogicUnit unit,
                            CharSequence code,
                            CharSequence sql){
      FLogicUnit result = searchSql(unit, null, code, sql);
      return (result != null);
   }

   //============================================================
   // <T>根据查询获得一个数据单元。</T>
   //
   // @param clazz 类对象
   // @param code 代码
   // @param whereSql 条件
   // @return 行记录
   //============================================================
   public <T extends FLogicUnit> T searchSql(Class<T> clazz,
                                             CharSequence code,
                                             CharSequence sql){
      return searchSql(null, clazz, code, sql);
   }

   //============================================================
   // <T>根据查询获得一个数据单元。</T>
   //
   // @param unit 数据单元
   // @param clazz 类对象
   // @param code 代码
   // @param whereSql 条件
   // @return 行记录
   //============================================================
   public <T extends FLogicUnit> T searchSql(T unit,
                                             Class<T> clazz,
                                             CharSequence code,
                                             CharSequence sql){
      // 获得数据
      FRow row = innerFindRow(code, sql);
      // 检查结果
      if(row == null){
         return null;
      }
      // 获得数据
      if(unit == null){
         unit = RClass.newInstance(clazz);
      }
      // 加载行数据
      if(unit == null){
         throw new FFatalError("Unit is empty. (unit={1}, class={2})", unit, clazz);
      }
      unit.linkLogicContext(_logicContext);
      unit.load(row);
      return unit;
   }

   //============================================================
   // <T>根据条件获得数据单元集合。</T>
   //
   // @param clazz 单元类型
   // @param whereSql 条件命令
   // @return 数据单元集合
   //============================================================
   public <T extends FLogicUnit> FLogicDataset<T> fetchClass(Class<T> clazz,
                                                             CharSequence whereSql){
      // 生成命令
      String code = innerMemcacheKey(null, whereSql, null, null);
      String sql = makeFetchSql(null, whereSql, null, null, 0, 0);
      // 获得数据
      return fetchSql(clazz, code, sql, 0, 0);
   }

   //============================================================
   // <T>根据条件获得数据单元集合。</T>
   //
   // @param clazz 单元类型
   // @param whereSql 条件命令
   // @param pageSize 分页大小
   // @param page 分页号码
   // @return 数据单元集合
   //============================================================
   public <T extends FLogicUnit> FLogicDataset<T> fetchClass(Class<T> clazz,
                                                             CharSequence whereSql,
                                                             int pageSize,
                                                             int page){
      // 生成命令
      String code = innerMemcacheKey(null, whereSql, null, null);
      String sql = makeFetchSql(null, whereSql, null, null, 0, 0);
      // 获得数据
      return fetchSql(clazz, code, sql, pageSize, page);
   }

   //============================================================
   // <T>根据条件获得数据单元集合。</T>
   //
   // @param clazz 单元类型
   // @param whereSql 条件命令
   // @param orderSql 排序命令
   // @param pageSize 分页大小
   // @param page 分页号码
   // @return 数据单元集合
   //============================================================
   public <T extends FLogicUnit> FLogicDataset<T> fetchClass(Class<T> clazz,
                                                             CharSequence whereSql,
                                                             CharSequence orderSql){
      // 生成命令
      String code = innerMemcacheKey(null, whereSql, null, orderSql);
      String sql = makeFetchSql(null, whereSql, null, orderSql, 0, 0);
      // 获得数据
      return fetchSql(clazz, code, sql, 0, 0);
   }

   //============================================================
   // <T>根据条件获得数据单元集合。</T>
   //
   // @param clazz 单元类型
   // @param whereSql 条件命令
   // @param orderSql 排序命令
   // @param pageSize 分页大小
   // @param page 分页号码
   // @return 数据单元集合
   //============================================================
   public <T extends FLogicUnit> FLogicDataset<T> fetchClass(Class<T> clazz,
                                                             CharSequence whereSql,
                                                             CharSequence orderSql,
                                                             int pageSize,
                                                             int page){
      // 生成命令
      String code = innerMemcacheKey(null, whereSql, null, orderSql);
      String sql = makeFetchSql(null, whereSql, null, orderSql, 0, 0);
      // 获得数据
      return fetchSql(clazz, code, sql, pageSize, page);
   }

   //============================================================
   // <T>根据条件获得数据单元集合。</T>
   //
   // @param clazz 单元类型
   // @param fields 选取字段
   // @param whereSql 条件命令
   // @param orderSql 排序命令
   // @param pageSize 分页大小
   // @param page 分页号码
   // @return 数据单元集合
   //============================================================
   public <T extends FLogicUnit> FLogicDataset<T> fetchClass(Class<T> clazz,
                                                             CharSequence fields,
                                                             CharSequence whereSql,
                                                             CharSequence orderSql,
                                                             int pageSize,
                                                             int page){
      // 生成命令
      String code = innerMemcacheKey(fields, whereSql, null, orderSql);
      String sql = makeFetchSql(fields, whereSql, null, orderSql, 0, 0);
      // 获得数据
      return fetchSql(clazz, code, sql, pageSize, page);
   }

   //============================================================
   // <T>根据条件获得数据单元集合。</T>
   //
   // @param clazz 单元类型
   // @param fields 选取字段
   // @param whereSql 条件命令
   // @param groupSql 分组命令
   // @param orderSql 排序命令
   // @param pageSize 分页大小
   // @param page 分页号码
   // @return 数据单元集合
   //============================================================
   public <T extends FLogicUnit> FLogicDataset<T> fetchClass(Class<T> clazz,
                                                             CharSequence fields,
                                                             CharSequence whereSql,
                                                             CharSequence groupSql,
                                                             CharSequence orderSql,
                                                             int pageSize,
                                                             int page){
      // 生成命令
      String code = innerMemcacheKey(fields, whereSql, groupSql, orderSql);
      String sql = makeFetchSql(fields, whereSql, groupSql, orderSql, 0, 0);
      // 获得数据
      return fetchSql(clazz, code, sql, pageSize, page);
   }

   //============================================================
   // <T>根据查询命令获得数据单元集合。</T>
   //
   // @param clazz 单元类型
   // @param code 代码
   // @param sql 查询命令
   // @param pageSize 分页大小
   // @param page 分页号码
   // @return 数据单元集合
   //============================================================
   public <T extends FLogicUnit> FLogicDataset<T> fetchSql(Class<T> clazz,
                                                           CharSequence code,
                                                           CharSequence sql,
                                                           int pageSize,
                                                           int page){
      // 获得数据
      FDataset dataset = innerFindDataset(code, sql, pageSize, page);
      // 返回结果
      FLogicDataset<T> result = null;
      if(clazz == null){
         result = innerCreateDataset();
      }else{
         result = new FLogicDataset<T>(clazz, _logicContext);
      }
      result.loadDataset(dataset);
      return result;
   }

   //============================================================
   // <T>获得当前操作者。</T>
   //
   // @return 处理结果
   //============================================================
   public long currentOperatorId(){
      IBindConsole bindConsole = RAop.find(IBindConsole.class);
      if(bindConsole != null){
         FDataOperator operator = bindConsole.find(FDataOperator.class);
         if(operator != null){
            return operator.userId();
         }
      }
      return 0;
   }

   //============================================================
   // <T>准备一个数据单元。</T>
   //
   // @param clazz 类型
   // @return 数据单元
   //============================================================
   public <T extends FLogicUnit> T doPrepare(Class<T> clazz){
      T unit = RClass.newInstance(clazz);
      unit.linkLogicContext(_logicContext);
      doPrepare(unit);
      return unit;
   }

   //============================================================
   // <T>准备一个数据单元。</T>
   //
   // @param logicUnit 数据单元
   // @return 处理结果
   //============================================================
   @Override
   public abstract EResult doPrepare(FLogicUnit logicUnit);

   //============================================================
   // <T>删除一个数据单元。</T>
   //
   // @param logicUnit 数据单元
   // @param recordId 记录编号
   // @return 处理结果
   //============================================================
   @Override
   public EResult doDelete(FLogicUnit logicUnit,
                           long recordId){
      // 检查记录编号
      if(recordId <= 0){
         throw new FFatalError("Record id is empty. (record_id={1})", recordId);
      }
      SLogicTableInfo table = tableInfo();
      // 删除缓冲
      innerDeleteRow(recordId);
      // 生成命令
      FSql cmd = new FSql("DELETE FROM {table} WHERE OUID={id}");
      cmd.bind("table", table.name());
      cmd.bindLong("id", recordId);
      // 执行命令
      String sql = cmd.toString();
      for(ISqlConnection connection : _connectionWrites){
         boolean result = connection.executeSql(sql);
         if(!result){
            return EResult.Failure;
         }
      }
      return EResult.Success;
   }

   //============================================================
   // <T>删除一个数据单元。</T>
   //
   // @param recordId 记录编号
   // @return 处理结果
   //============================================================
   @Override
   public EResult doDelete(long recordId){
      return doDelete(null, recordId);
   }

   //============================================================
   // <T>清除所有数据单元。</T>
   //
   // @return 处理结果
   //============================================================
   @Override
   public EResult doClear(){
      // 生成命令
      SLogicTableInfo table = tableInfo();
      String sql = "DELETE FROM " + table.name();
      // 执行命令
      for(ISqlConnection connection : _connectionWrites){
         boolean result = connection.executeSql(sql);
         if(!result){
            return EResult.Failure;
         }
      }
      return EResult.Success;
   }
}
