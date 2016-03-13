package org.mo.eng.cache.xmemorycache;

import net.rubyeye.xmemcached.XMemcachedClient;
import net.rubyeye.xmemcached.XMemcachedClientBuilder;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FObject;
import org.mo.com.lang.RString;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.eng.cache.ECacheConstant;
import org.mo.eng.cache.ICacheChannel;

//============================================================
// <T>内存频道。</T>
//============================================================
public class FXMemoryChannel
      extends FObject
      implements
         ICacheChannel
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FXMemoryChannel.class);

   // 控制台
   protected FXMemoryCacheConsole _console;

   // 内存链接
   protected XMemcachedClient _client;

   // 代码
   protected String _code;

   //============================================================
   // <T>构造内存频道。</T>
   //============================================================
   public FXMemoryChannel(){
   }

   //============================================================
   // <T>获得控制台。</T>
   //
   // @return 控制台
   //============================================================
   public FXMemoryCacheConsole console(){
      return _console;
   }

   //============================================================
   // <T>设置控制台。</T>
   //
   // @return 控制台
   //============================================================
   public void setConsole(FXMemoryCacheConsole console){
      _console = console;
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
   public XMemcachedClient handle(){
      return _client;
   }

   //============================================================
   // <T>配置处理。</T>
   //============================================================
   public void setup(){
      XMemcachedClientBuilder builder = _console.handle();
      try{
         _client = (XMemcachedClient)builder.build();
      }catch(Exception exception){
         _logger.warn(this, "setup", "Build client failue. (message={1})", exception.getMessage());
         // throw new FFatalError(exception);
      }
   }

   //============================================================
   // <T>链接处理。</T>
   //============================================================
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
            String value = (String)data;
            if(value.length() > 0){
               result = value;
            }
         }
      }catch(Exception exception){
         _logger.warn(this, "getString", "Get string failue. (key={1}, message={2})", key, exception.getMessage());
         //_logger.error(this, "getString", exception);
         // throw new FFatalError(exception, "Get memory string failure. (key={1})", key);
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
         //_logger.error(this, "getBytes", exception);
         //throw new FFatalError(exception, "Get memory bytes failure. (key={1})", key);
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
            result = _client.set(cacheKey, expiry, value);
         }else{
            result = _client.delete(cacheKey);
         }
      }catch(Exception exception){
         _logger.warn(this, "setString", "Set string failue. (key={1}, message={2})", key, exception.getMessage());
         //_logger.error(this, "setString", exception);
         //throw new FFatalError(exception, "Set memory string failure. (key={1}, value={2}, expiry={3})", key, value, expiry);
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
               result = _client.set(cacheKey, expiry, value);
            }else{
               result = _client.delete(cacheKey);
            }
         }catch(Exception exception){
            _logger.warn(this, "setBytes", "Set bytes failue. (key={1}, message={2})", key, exception.getMessage());
            //_logger.error(this, "setBytes", exception);
            //throw new FFatalError(exception, "Set memory bytes failure. (key={1}, value={2})", key, value);
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
         //throw new FFatalError(exception, "Delete memory failure. (key={1})", key);
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
      try{
         _client.flushAll();
      }catch(Exception exception){
         _logger.error(this, "flush", exception);
         //throw new FFatalError(exception);
      }
   }

   //============================================================
   // <T>关闭处理。</T>
   //============================================================
   @Override
   public void close() throws Exception{
      _console.free(this);
   }

   //============================================================
   // <T>释放处理。</T>
   //============================================================
   public void release(){
      try{
         _client.shutdown();
      }catch(Exception exception){
         _logger.error(this, "disconnect", exception);
      }
   }
}
