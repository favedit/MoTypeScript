package org.mo.eng.cache.memorycache;

import com.danga.MemCached.MemCachedClient;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.RString;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.eng.cache.ECacheConstant;
import org.mo.eng.cache.FAbstractCacheChannel;
import org.mo.eng.cache.ICacheChannel;

//============================================================
// <T>内存频道。</T>
//============================================================
public class FMemoryChannel
      extends FAbstractCacheChannel
      implements
         ICacheChannel
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FMemoryChannel.class);

   // 内存链接
   protected MemCachedClient _client;

   // 代码
   protected String _code;

   //============================================================
   // <T>构造内存频道。</T>
   //============================================================
   public FMemoryChannel(){
   }

   //============================================================
   // <T>检查是否有效。</T>
   //
   // @return 是否有效
   //============================================================
   public boolean isValid(){
      return _client != null;
   }

   //============================================================
   // <T>获得句柄。</T>
   //
   // @return 句柄
   //============================================================
   public MemCachedClient handle(){
      return _client;
   }

   //============================================================
   // <T>配置处理。</T>
   //============================================================
   @Override
   public void setup(){
      String code = _console.code();
      _client = new MemCachedClient(code);
   }

   //============================================================
   // <T>链接处理。</T>
   //============================================================
   @Override
   public void connect(){
      try{
         String identityCode = _console.code() + ECacheConstant.IDENTITY_CODE;
         String guid = (String)_client.get(identityCode);
         _code = _console.code() + "(" + guid + ")|";
      }catch(Exception exception){
         throw new FFatalError(exception);
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @param key 主键
   // @return 字符串
   //============================================================
   @Override
   public String getString(String key){
      // 检查主键
      String cacheKey = _code + key;
      if(RString.isEmpty(cacheKey)){
         return null;
      }
      // 检查长度
      int keyLimit = _console.keyLimit();
      if(cacheKey.length() > keyLimit){
         return null;
      }
      // 获得数据
      String result = null;
      try{
         Object data = _client.get(cacheKey);
         if(data != null){
            String value = null;
            if(data instanceof String){
               value = (String)data;
            }else{
               value = data.toString();
            }
            if(value.length() > 0){
               result = value;
            }
         }
      }catch(Exception exception){
         _logger.warn(this, "getString", "Get string failue. (key={1}, message={2})", key, exception.getMessage());
      }
      return result;
   }

   //============================================================
   // <T>获得内容。</T>
   //
   // @param key 主键
   // @return 内容
   //============================================================
   @Override
   public byte[] getBytes(String key){
      // 检查主键
      String cacheKey = _code + key;
      if(RString.isEmpty(cacheKey)){
         return null;
      }
      // 检查长度
      int keyLimit = _console.keyLimit();
      if(cacheKey.length() > keyLimit){
         return null;
      }
      // 获得数据
      byte[] result = null;
      try{
         Object data = _client.get(cacheKey);
         if(data != null){
            byte[] value = (byte[])data;
            if(value.length > 0){
               result = value;
            }
         }
      }catch(Exception exception){
         _logger.warn(this, "getBytes", "Get bytes failue. (key={1}, message={2})", key, exception.getMessage());
      }
      return result;
   }

   //============================================================
   // <T>设置字符串。</T>
   //
   // @param key 主键
   // @param value 内容
   //============================================================
   @Override
   public boolean setString(String key,
                            String value){
      return setString(key, value, 0);
   }

   //============================================================
   // <T>设置超时字符串。</T>
   //
   // @param key 主键
   // @param value 字符串
   // @param expiry 期限[秒]
   // @param value 内容
   //============================================================
   @Override
   public boolean setString(String key,
                            String value,
                            int expiry){
      // 检查数据
      int length = 0;
      if(value != null){
         length = value.length();
         int valueLimit = _console.valueLimit();
         if(length > valueLimit){
            return false;
         }
      }
      // 检查主键
      String cacheKey = _code + key;
      if(RString.isEmpty(cacheKey)){
         return false;
      }
      // 检查主键
      int keyLimit = _console.keyLimit();
      if(cacheKey.length() > keyLimit){
         return false;
      }
      // 设置数据
      boolean result = false;
      try{
         if(length > 0){
            result = _client.set(cacheKey, value, expiry);
         }else{
            result = _client.delete(cacheKey);
         }
      }catch(Exception exception){
         _logger.warn(this, "setString", "Set string failue. (key={1}, message={2})", key, exception.getMessage());
      }
      return result;
   }

   //============================================================
   // <T>设置字节内容。</T>
   //
   // @param key 主键
   // @param value 字节内容
   // @return 处理结果
   //============================================================
   @Override
   public boolean setBytes(String key,
                           byte[] value){
      return setBytes(key, value, 0);
   }

   //============================================================
   // <T>设置字节内容。</T>
   //
   // @param key 主键
   // @param value 字节内容
   // @param expiry 期限[秒]
   // @return 处理结果
   //============================================================
   @Override
   public boolean setBytes(String key,
                           byte[] value,
                           int expiry){
      // 检查数据
      int length = 0;
      if(value != null){
         length = value.length;
         int valueLimit = _console.valueLimit();
         if(length > valueLimit){
            return false;
         }
      }
      // 检查主键
      String cacheKey = _code + key;
      if(RString.isEmpty(cacheKey)){
         return false;
      }
      // 检查长度
      int keyLimit = _console.keyLimit();
      if(cacheKey.length() > keyLimit){
         return false;
      }
      // 设置数据
      boolean result = false;
      if(value != null){
         try{
            if(length > 0){
               result = _client.set(cacheKey, value, expiry);
            }else{
               result = _client.delete(cacheKey);
            }
         }catch(Exception exception){
            _logger.warn(this, "setBytes", "Set bytes failue. (key={1}, message={2})", key, exception.getMessage());
         }
      }
      return result;
   }

   //============================================================
   // <T>删除主键。</T>
   //
   // @param key 主键
   // @return 处理结果
   //============================================================
   @Override
   public boolean delete(String key){
      // 检查主键
      String cacheKey = _code + key;
      if(RString.isEmpty(cacheKey)){
         return false;
      }
      // 检查长度
      int keyLimit = _console.keyLimit();
      if(cacheKey.length() > keyLimit){
         return false;
      }
      // 设置数据
      boolean result = false;
      try{
         result = _client.delete(cacheKey);
      }catch(Exception exception){
         _logger.error(this, "delete", exception);
      }
      return result;
   }

   //============================================================
   // <T>刷新处理。</T>
   //
   // @return 处理结果
   //============================================================
   @Override
   public void flush(){
      _client.flushAll();
   }

   //============================================================
   // <T>关闭处理。</T>
   //============================================================
   @Override
   public void close() throws Exception{
      _console.free(this);
   }
}
