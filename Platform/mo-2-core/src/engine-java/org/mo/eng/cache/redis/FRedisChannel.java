package org.mo.eng.cache.redis;

import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FObject;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.eng.cache.ICacheChannel;
import redis.clients.jedis.Jedis;

//============================================================
// <T>内存频道。</T>
//============================================================
public class FRedisChannel
      extends FObject
      implements
         ICacheChannel
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FRedisChannel.class);

   // 控制台
   protected FRedisConsole _console;

   // 句柄
   protected Jedis _handle;

   // 代码
   protected String _code;

   //============================================================
   // <T>构造内存频道。</T>
   //============================================================
   public FRedisChannel(){
   }

   //============================================================
   // <T>获得控制台。</T>
   //
   // @return 控制台
   //============================================================
   public FRedisConsole console(){
      return _console;
   }

   //============================================================
   // <T>设置控制台。</T>
   //
   // @return 控制台
   //============================================================
   public void setConsole(FRedisConsole console){
      _console = console;
   }

   //============================================================
   // <T>获得句柄。</T>
   //
   // @return 句柄
   //============================================================
   public Jedis handle(){
      return _handle;
   }

   //============================================================
   // <T>配置处理。</T>
   //============================================================
   public void setup(){
      try{
         // 链接服务器
         String host = _console.serverHost();
         int port = _console.serverPort();
         _handle = new Jedis(host, port);
      }catch(Exception exception){
         throw new FFatalError(exception);
      }
   }

   //============================================================
   // <T>链接处理。</T>
   //============================================================
   public void connect(){
      try{
         // 获得鉴定码
         //String identityCode = _console.code() + ERedisConstant.IDENTITY_CODE;
         //String guid = _handle.get(identityCode);
         //_code = _console.code() + "(" + guid + ")|";
         _code = _console.code();
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
      String value = null;
      try{
         String cacheKey = _code + key;
         value = _handle.get(cacheKey);
      }catch(Exception exception){
         _logger.error(this, "getString", exception);
         //throw new FFatalError(exception);
      }
      return value;
   }

   //============================================================
   // <T>获得内容。</T>
   //
   // @param key 主键
   // @return 内容
   //============================================================
   @Override
   public byte[] getBytes(String key){
      byte[] value = null;
      try{
         String cacheKey = _code + key;
         byte[] keys = cacheKey.getBytes();
         value = _handle.get(keys);
         if(value != null){
            _logger.debug(this, "getBytes", "Find memory cache. [code={1}, value_length={2}]", cacheKey, value.length);
         }
      }catch(Exception exception){
         _logger.error(this, "getBytes", exception);
         //throw new FFatalError(exception);
      }
      return value;
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
      String result = null;
      try{
         String cacheKey = _code + key;
         result = _handle.set(cacheKey, value);
      }catch(Exception exception){
         _logger.error(this, "setString", exception);
         //throw new FFatalError(exception);
      }
      return (result != null) ? true : false;
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
      String result = null;
      if(value != null){
         try{
            String cacheKey = _code + key;
            byte[] keys = cacheKey.getBytes();
            result = _handle.set(keys, value);
            //if(result != null){
            //   _logger.debug(this, "setBytes", "Update memory cache success. [code={1}, value_length={2}]", cacheKey, value.length);
            //}else{
            //   _logger.debug(this, "setBytes", "Update memory cache failure. [code={1}, value_length={2}]", cacheKey, value.length);
            //}
         }catch(Exception exception){
            _logger.error(this, "setBytes", exception);
            //throw new FFatalError(exception);
         }
      }
      return (result != null) ? true : false;
   }

   //============================================================
   // <T>删除处理。</T>
   //
   // @param key 主键
   // @return 处理结果
   //============================================================
   @Override
   public boolean delete(String key){
      Long result = null;
      try{
         String cacheKey = _code + key;
         result = _handle.del(cacheKey);
      }catch(Exception exception){
         _logger.error(this, "delete", exception);
         //throw new FFatalError(exception);
      }
      return (result != null) ? true : false;
   }

   //============================================================
   // <T>刷新处理。</T>
   //
   // @return 处理结果
   //============================================================
   @Override
   public void flush(){
      try{
         _handle.flushAll();
      }catch(Exception exception){
         throw new FFatalError(exception);
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
         _handle.close();
      }catch(Exception exception){
         _logger.error(this, "release", exception);
      }
   }
}
