package org.mo.eng.cache.memorycache;

import com.danga.MemCached.SockIOPool;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.RString;
import org.mo.com.lang.RUuid;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.system.FObjectPool;
import org.mo.core.aop.face.AProperty;
import org.mo.eng.cache.ECacheConstant;
import org.mo.eng.cache.FAbstractCacheConsole;
import org.mo.eng.cache.ICacheChannel;

//============================================================
// <T>内存缓冲控制台。</T>
//============================================================
public class FMemoryCacheConsole
      extends FAbstractCacheConsole
      implements
         IMemoryCacheConsole
{
   // 日志输出接口 
   private static ILogger _logger = RLogger.find(FMemoryCacheConsole.class);

   // 服务器地址
   @AProperty
   protected String _servers;

   // 主键限制
   @AProperty
   protected int _keyLimit = 200;

   // 内容限制
   @AProperty
   protected int _valueLimit = 1024 * 1000;

   // 内存频道集合
   protected FObjectPool<FMemoryChannel> _channels = new FObjectPool<FMemoryChannel>(FMemoryChannel.class);

   //============================================================
   // <T>获得主键限制。</T>
   //
   // @return 主键限制
   //============================================================
   @Override
   public int keyLimit(){
      return _keyLimit;
   }

   //============================================================
   // <T>获得内容限制。</T>
   //
   // @return 内容限制
   //============================================================
   @Override
   public int valueLimit(){
      return _valueLimit;
   }

   //============================================================
   // <T>初始化处理。</T>
   //============================================================
   @SuppressWarnings("resource")
   public void initialize(){
      // 初始化服务器
      if(_enable){
         try{
            // 获得服务器列表
            String[] servers = RString.trimNoEmpty(RString.splitChars(_servers, ",;|"));
            if(servers.length == 0){
               throw new FFatalError("Address is empty.");
            }
            // 创建链接
            SockIOPool pool = SockIOPool.getInstance(_code);
            pool.setServers(servers);
            pool.initialize();
            // 更新代码
            try(ICacheChannel channel = alloc()){
               FMemoryChannel memoryChannel = (FMemoryChannel)channel;
               String guid = RUuid.simpleUuid();
               String identityCode = _code + ECacheConstant.IDENTITY_CODE;
               boolean result = memoryChannel.handle().set(identityCode, guid);
               if(!result){
                  throw new FFatalError("Write code failure.");
               }
               _logger.debug(this, "initialize", "Set memory cache identity code. (code={1}, value={2})", identityCode, guid);
            }
         }catch(Exception exception){
            throw new FFatalError(exception);
         }
      }
   }

   //============================================================
   // <T>收集一个内存频道。</T>
   //
   // @return 内存频道
   //============================================================
   @Override
   public ICacheChannel alloc(){
      FMemoryChannel channel = null;
      if(_enable){
         synchronized(_channels){
            // 收集链接
            channel = _channels.alloc();
            // 创建链接
            if(channel == null){
               channel = new FMemoryChannel();
               channel.setConsole(this);
               channel.setup();
            }
            if(!channel.isValid()){
               return null;
            }
            // 链接处理
            channel.connect();
            _logger.debug(this, "alloc", "Alloc cache channel. (item_count={1}, alloc_total={2}, free_total={3})", _channels.itemCount(), _channels.allocTotal(), _channels.freeTotal());
         }
      }
      return channel;
   }

   //============================================================
   // <T>释放一个内存频道。</T>
   //
   // @param channel 内存频道
   //============================================================
   @Override
   public void free(ICacheChannel channel){
      if(_enable && (channel != null)){
         FMemoryChannel memoryChannel = (FMemoryChannel)channel;
         synchronized(_channels){
            // 释放处理
            if(_channels.itemContains(memoryChannel)){
               throw new FFatalError("Memory Chanel is already exists.");
            }
            _channels.free(memoryChannel);
            _logger.debug(this, "free", "Free cache channel. (item_count={1}, alloc_total={2}, free_total={3})", _channels.itemCount(), _channels.allocTotal(), _channels.freeTotal());
         }
      }
   }

   //============================================================
   // <T>释放处理。</T>
   //============================================================
   public void release(){
      // 断开处理
      for(FMemoryChannel channel : _channels.items()){
         channel.release();
      }
      // 释放处理
      _channels.release();
   }
}
