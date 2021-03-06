package org.mo.data.logic.cache;

import org.mo.com.collections.FRow;
import org.mo.com.lang.FDictionary;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FObject;
import org.mo.com.lang.RString;
import org.mo.com.lang.RUuid;
import org.mo.eng.cache.ECacheConstant;
import org.mo.eng.cache.ICacheChannel;

//============================================================
// <T>逻辑单元缓冲频道。</T>
//============================================================
public class FLogicCacheChannel
      extends FObject
{
   // 数据库唯一编号
   protected String _databaseGuid;

   // 控制台
   protected FLogicCacheConsole _console;

   // 内存缓冲
   protected ICacheChannel _cacheChannel;

   // 单元集合
   protected FDictionary<FLogicCacheDataset> _caches = new FDictionary<FLogicCacheDataset>(FLogicCacheDataset.class);

   //============================================================
   // <T>构造逻辑单元缓冲频道。</T>
   //============================================================
   public FLogicCacheChannel(){
   }

   //============================================================
   // <T>获得控制台。</T>
   //
   // @return 控制台
   //============================================================
   public FLogicCacheConsole console(){
      return _console;
   }

   //============================================================
   // <T>设置控制台。</T>
   //
   // @return 控制台
   //============================================================
   public void setConsole(FLogicCacheConsole console){
      _console = console;
   }

   //============================================================
   // <T>获得内存频道。</T>
   //
   // @return 内存频道
   //============================================================
   public ICacheChannel cacheChannel(){
      return _cacheChannel;
   }

   //============================================================
   // <T>配置处理。</T>
   //============================================================
   public void setup(){
   }

   //============================================================
   // <T>获得数据库唯一编号。</T>
   //
   // @return 唯一编号
   //============================================================
   public String databaseGuid(){
      // 检查内容
      if(RString.isEmpty(_databaseGuid)){
         // 获得数据库标志
         String key = "DB" + ECacheConstant.Spliter + "GUID";
         _databaseGuid = _cacheChannel.getString(key);
         // 写入默认代码
         if(_databaseGuid == null){
            _databaseGuid = RUuid.simpleUuid();
            _cacheChannel.setString(key, _databaseGuid);
         }
      }
      return _databaseGuid;
   }

   //============================================================
   // <T>刷新处理。</T>
   //
   // @param channel 内存缓冲频道
   //============================================================
   public synchronized String flush(){
      // 生成主键
      String key = "DB" + ECacheConstant.Spliter + "GUID";
      // 更改内容
      _databaseGuid = RUuid.simpleUuid();
      _cacheChannel.setString(key, _databaseGuid);
      return _databaseGuid;
   }

   //============================================================
   // <T>链接处理。</T>
   //
   // @param memoryChannel 内存缓冲
   //============================================================
   public void connect(ICacheChannel cacheChannel){
      if(cacheChannel == null){
         throw new FFatalError("Cache channel is null.");
      }
      _cacheChannel = cacheChannel;
   }

   //============================================================
   // <T>根据名称查找缓冲器。</T>
   //
   // @param name 名称
   // @return 逻辑单元
   //============================================================
   public FLogicCacheDataset findCache(String name){
      FLogicCacheDataset cacheDataset = _caches.find(name);
      return cacheDataset;
   }

   //============================================================
   // <T>根据名称和代码查找逻辑单元。</T>
   //
   // @param name 名称
   // @param code 代码
   // @return 逻辑单元
   //============================================================
   public FRow findUnit(String name,
                        long code){
      FRow row = null;
      FLogicCacheDataset cache = _caches.find(name);
      if(cache != null){
         row = cache.get(code);
      }
      return row;
   }

   //============================================================
   // <T>根据名称同步缓冲器。</T>
   //
   // @param name 名称
   // @return 逻辑单元
   //============================================================
   public FLogicCacheDataset syncCache(String name){
      FLogicCacheDataset cache = _caches.find(name);
      if(cache == null){
         cache = new FLogicCacheDataset();
         cache.setChannel(this);
         cache.setName(name);
         cache.connect(_cacheChannel);
         _caches.set(name, cache);
      }
      return cache;
   }

   //============================================================
   // <T>根据代码设置逻辑单元。</T>
   //
   // @param code 代码
   // @param unit 逻辑单元
   //============================================================
   public void set(String name,
                   long code,
                   FRow row){
      FLogicCacheDataset cache = syncCache(name);
      cache.set(code, row);
   }

   //============================================================
   // <T>断开处理。</T>
   //============================================================
   public void disconnect(){
      // 清空属性
      _cacheChannel = null;
      _databaseGuid = null;
      // 清空缓冲
      int count = _caches.count();
      for(int n = 0; n < count; n++){
         FLogicCacheDataset cache = _caches.value(n);
         cache.disconnect();
      }
      _caches.clear();
   }
}
