package org.mo.data.logic.cache;

import org.mo.com.collections.FCodeLongSet;
import org.mo.com.collections.FRow;
import org.mo.com.lang.FObject;
import org.mo.com.lang.FString;
import org.mo.com.lang.RString;
import org.mo.com.lang.RUuid;
import org.mo.eng.cache.ECacheConstant;
import org.mo.eng.cache.ICacheChannel;

//============================================================
// <T>逻辑单元缓冲。</T>
//============================================================
public class FLogicCacheDataset
      extends FObject
{
   // 名称
   protected String _name;

   // 名称
   protected String _tableGuid;

   // 名称
   protected String _datasetGuid;

   // 单元集合
   protected FCodeLongSet<FRow> _rows = new FCodeLongSet<FRow>(FRow.class);

   // 内存缓冲
   protected ICacheChannel _cacheChannel;

   // 缓冲频道
   protected FLogicCacheChannel _logicChannel;

   //============================================================
   // <T>构造逻辑单元缓冲。</T>
   //============================================================
   public FLogicCacheDataset(){
   }

   //============================================================
   // <T>获得缓冲频道。</T>
   //
   // @return 缓冲频道
   //============================================================
   public FLogicCacheChannel channel(){
      return _logicChannel;
   }

   //============================================================
   // <T>设置缓冲频道。</T>
   //
   // @return 缓冲频道
   //============================================================
   public void setChannel(FLogicCacheChannel channel){
      _logicChannel = channel;
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
   // @return 名称
   //============================================================
   public void setName(String name){
      _name = name;
   }

   //============================================================
   // <T>设置内存频道。</T>
   //
   // @param cacheChannel 内存缓冲
   // @return 内存频道
   //============================================================
   public void connect(ICacheChannel cacheChannel){
      _cacheChannel = cacheChannel;
   }

   //============================================================
   // <T>生成标识。</T>
   //
   // @return 标识
   //============================================================
   public String makeKey(CharSequence code){
      StringBuilder builder = new StringBuilder();
      int count = code.length();
      for(int n = 0; n < count; n++){
         char value = code.charAt(n);
         if((value == '\r') || (value == '\n') || (value == '\t')){
            continue;
         }else if(value == ' '){
            continue;
         }else if((value == '\'') || (value == '\"')){
            continue;
         }
         builder.append(value);
      }
      return builder.toString();
   }

   //============================================================
   // <T>生成表格键。</T>
   //
   // @return 表格键
   //============================================================
   public String makeTableKey(){
      // 获得键
      String databaseGuid = _logicChannel.databaseGuid();
      // 生成键
      FString key = new FString();
      key.append("DB(", databaseGuid, ")");
      key.append(ECacheConstant.Spliter, _name);
      key.append(ECacheConstant.Spliter + "GUID");
      return makeKey(key);
   }

   //============================================================
   // <T>生成集合键。</T>
   //
   // @return 集合键
   //============================================================
   public String makeDatasetKey(){
      // 获得键
      String databaseGuid = _logicChannel.databaseGuid();
      String tableGuid = tableGuid();
      // 生成键
      FString key = new FString();
      key.append("DB(", databaseGuid, ")");
      key.append(ECacheConstant.Spliter, _name, "(", tableGuid, ")");
      key.append(ECacheConstant.Spliter + "GUID");
      return makeKey(key);
   }

   //============================================================
   // <T>生成集合键。</T>
   //
   // @return 集合键
   //============================================================
   public String makeRowKey(long rowId){
      // 获得键
      String databaseGuid = _logicChannel.databaseGuid();
      String tableGuid = tableGuid();
      // 生成键
      FString key = new FString();
      key.append("DB(", databaseGuid, ")");
      key.append(ECacheConstant.Spliter, _name, "(", tableGuid, ")");
      key.append(ECacheConstant.Spliter, "RW(", rowId, ")");
      return makeKey(key);
   }

   //============================================================
   // <T>生成集合键。</T>
   //
   // @return 集合键
   //============================================================
   public String makeFetchKey(CharSequence code){
      // 获得键
      String databaseGuid = _logicChannel.databaseGuid();
      String tableGuid = tableGuid();
      String datasetGuid = datasetGuid();
      // 生成键
      FString key = new FString();
      key.append("DB(", databaseGuid, ")");
      key.append(ECacheConstant.Spliter, _name, "(", tableGuid, ")");
      key.append(ECacheConstant.Spliter, "DS(", datasetGuid, ")");
      key.append(ECacheConstant.Spliter, code);
      return makeKey(key);
   }

   //============================================================
   // <T>获得表格代码。</T>
   //
   // @return 代码
   //============================================================
   public String tableGuid(){
      if(RString.isEmpty(_tableGuid)){
         // 获得代码
         String key = makeTableKey();
         _tableGuid = _cacheChannel.getString(key);
         // 写入代码
         if(_tableGuid == null){
            _tableGuid = RUuid.simpleUuid();
            _cacheChannel.setString(key, _tableGuid);
         }
      }
      return _tableGuid;
   }

   //============================================================
   // <T>刷新表格处理。</T>
   //
   // @param channel 内存缓冲频道
   //============================================================
   public void tableFlush(){
      String key = makeTableKey();
      String code = RUuid.simpleUuid();
      _cacheChannel.setString(key, code);
   }

   //============================================================
   // <T>获得集合代码。</T>
   //
   // @return 代码
   //============================================================
   public String datasetGuid(){
      if(RString.isEmpty(_tableGuid)){
         // 获得代码
         String key = makeDatasetKey();
         _tableGuid = _cacheChannel.getString(key);
         // 写入代码
         if(_tableGuid == null){
            _tableGuid = RUuid.simpleUuid();
            _cacheChannel.setString(key, _tableGuid);
         }
      }
      return _tableGuid;
   }

   //============================================================
   // <T>刷新集合处理。</T>
   //============================================================
   public void datasetFlush(){
      String key = makeDatasetKey();
      String code = RUuid.simpleUuid();
      _cacheChannel.setString(key, code);
   }

   //============================================================
   // <T>获得记录行集合。</T>
   //
   // @return 记录行集合
   //============================================================
   public FCodeLongSet<FRow> rows(){
      return _rows;
   }

   //============================================================
   // <T>根据代码获得逻辑单元。</T>
   //
   // @param code 代码
   // @return 逻辑单元
   //============================================================
   public FRow get(long code){
      return _rows.get(code);
   }

   //============================================================
   // <T>根据代码设置逻辑单元。</T>
   //
   // @param code 代码
   // @param unit 逻辑单元
   //============================================================
   public void set(long code,
                   FRow row){
      _rows.set(code, row);
   }

   //============================================================
   // <T>清空处理。</T>
   //============================================================
   public void clear(){
      _rows.clear();
   }

   //============================================================
   // <T>断开处理。</T>
   //============================================================
   public void disconnect(){
      _tableGuid = null;
      _datasetGuid = null;
      clear();
   }
}
