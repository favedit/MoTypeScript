package org.mo.eng.cache.xmemorycache;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.rubyeye.xmemcached.XMemcachedClient;
import net.rubyeye.xmemcached.XMemcachedClientBuilder;
import net.rubyeye.xmemcached.command.BinaryCommandFactory;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.RInteger;
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
public class FXMemoryCacheConsole
      extends FAbstractCacheConsole
      implements
         IXMemoryCacheConsole
{
   // 日志输出接口 
   private static ILogger _logger = RLogger.find(FXMemoryCacheConsole.class);

   // 服务器地址
   @AProperty
   protected String _servers;

   // 主键限制
   @AProperty
   protected int _keyLimit = 250;

   // 内容限制
   @AProperty
   protected int _valueLimit = 1024 * 1024;

   // 构建器
   protected XMemcachedClientBuilder _builder;

   // 内存频道集合
   protected FObjectPool<FXMemoryChannel> _channels = new FObjectPool<FXMemoryChannel>(FXMemoryChannel.class);

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
   // <T>获得构建器。</T>
   //============================================================
   public XMemcachedClientBuilder handle(){
      return _builder;
   }

   //============================================================
   // <T>初始化处理。</T>
   //============================================================
   public void initialize(){
      // 初始化服务器
      if(_enable){
         try{
            // 获得服务器列表
            List<InetSocketAddress> addresses = new ArrayList<InetSocketAddress>();
            String[] servers = RString.splitChars(_servers, ",;|");
            for(String serverCode : servers){
               if(!RString.isEmpty(serverCode)){
                  String[] serverItems = RString.split(serverCode, ':');
                  InetSocketAddress address = new InetSocketAddress(serverItems[0], RInteger.parse(serverItems[1]));
                  addresses.add(address);
               }
            }
            if(addresses.isEmpty()){
               throw new FFatalError("Address is empty.");
            }
            // 创建链接
            _builder = new XMemcachedClientBuilder(addresses);
            //            _builder.setOpTimeout(5000);
            //            _builder.setConnectionPoolSize(16);
            //            _builder.setSocketOption(StandardSocketOption.SO_RCVBUF, 1024 * 64);
            //            _builder.setSocketOption(StandardSocketOption.SO_SNDBUF, 1024 * 32);
            //            _builder.setSocketOption(StandardSocketOption.TCP_NODELAY, false);
            _builder.setCommandFactory(new BinaryCommandFactory());
            //            _builder.getConfiguration().setSessionIdleTimeout(20000);
            // 打印信息
            try(ICacheChannel channel = alloc()){
               XMemcachedClient handle = ((FXMemoryChannel)channel).handle();
               Map<InetSocketAddress, String> versions = handle.getVersions();
               Map<InetSocketAddress, Map<String, String>> statuses = handle.getStats();
               for(InetSocketAddress address : versions.keySet()){
                  String version = versions.get(address);
                  Map<String, String> properties = statuses.get(address);
                  _logger.debug(this, "initialize", "Memcache status. (address={1}, version={2})", address, version);
                  for(String name : properties.keySet()){
                     String value = properties.get(name);
                     _logger.debug(this, "initialize", " - {1} = {2}", name, value);
                  }
               }
               // 获得同步代码
               String guid = RUuid.simpleUuid();
               String identityCode = _code + ECacheConstant.IDENTITY_CODE;
               boolean result = handle.set(identityCode, 0, guid);
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
      FXMemoryChannel channel = null;
      if(_enable){
         synchronized(_channels){
            // 收集链接
            channel = _channels.alloc();
            // 创建链接
            if(channel == null){
               channel = new FXMemoryChannel();
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
         FXMemoryChannel memoryChannel = (FXMemoryChannel)channel;
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
      for(FXMemoryChannel channel : _channels.items()){
         channel.release();
      }
      // 释放处理
      _channels.release();
   }
}
