package org.mo.eng.cache.redis;

import net.rubyeye.xmemcached.XMemcachedClientBuilder;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.system.FObjectPool;
import org.mo.core.aop.face.AProperty;
import org.mo.eng.cache.FAbstractCacheConsole;
import org.mo.eng.cache.ICacheChannel;

//============================================================
// <T>内存缓冲控制台。</T>
//============================================================
public class FRedisConsole
      extends FAbstractCacheConsole
      implements
         IRedisConsole
{
   // 日志输出接口 
   private static ILogger _logger = RLogger.find(FRedisConsole.class);

   // 服务器地址
   @AProperty
   protected String _serverHost;

   // 服务器端口
   @AProperty
   protected int _serverPort;

   // 构建器
   private XMemcachedClientBuilder _builder;

   // 内存频道集合
   protected FObjectPool<FRedisChannel> _channels = new FObjectPool<FRedisChannel>(FRedisChannel.class);

   //============================================================
   // <T>获得服务器主机。</T>
   //
   // @return 服务器主机
   //============================================================
   public String serverHost(){
      return _serverHost;
   }

   //============================================================
   // <T>获得服务器端口。</T>
   //
   // @return 服务器端口
   //============================================================
   public int serverPort(){
      return _serverPort;
   }

   @Override
   public int keyLimit(){
      return 1024;
   }

   @Override
   public int valueLimit(){
      return 1024 * 1024;
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
      //      if(_enable){
      //         try{
      //            // 获得服务器列表
      //            List<InetSocketAddress> addresses = new ArrayList<InetSocketAddress>();
      //            String[] servers = RString.splitChars(_servers, ",;|");
      //            for(String serverCode : servers){
      //               if(!RString.isEmpty(serverCode)){
      //                  String[] serverItems = RString.split(serverCode, ':');
      //                  InetSocketAddress address = new InetSocketAddress(serverItems[0], RInteger.parse(serverItems[1]));
      //                  addresses.add(address);
      //               }
      //            }
      //            if(addresses.isEmpty()){
      //               throw new FFatalError("Address is empty.");
      //            }
      //            // 创建链接
      //            _builder = new XMemcachedClientBuilder(addresses);
      //            // 打印信息
      //            try(FRedisChannel channel = alloc()){
      //               XMemcachedClient handle = channel.handle();
      //               Map<InetSocketAddress, String> versions = handle.getVersions();
      //               Map<InetSocketAddress, Map<String, String>> statuses = handle.getStats();
      //               for(InetSocketAddress address : versions.keySet()){
      //                  String version = versions.get(address);
      //                  Map<String, String> properties = statuses.get(address);
      //                  _logger.debug(this, "initialize", "Memcache status. (address={1}, version={2})", address, version);
      //                  for(String name : properties.keySet()){
      //                     String value = properties.get(name);
      //                     _logger.debug(this, "initialize", " - {1} = {2}", name, value);
      //                  }
      //               }
      //               // 获得同步代码
      //               String guid = RUuid.simpleUuid();
      //               String identityCode = _code + ERedisConstant.IDENTITY_CODE;
      //               boolean result = handle.set(identityCode, 0, guid);
      //               if(!result){
      //                  throw new FFatalError("Write code failure.");
      //               }
      //            }
      //         }catch(Exception exception){
      //            throw new FFatalError(exception);
      //         }
      //      }
   }

   //============================================================
   // <T>收集一个内存频道。</T>
   //
   // @return 内存频道
   //============================================================
   @Override
   public ICacheChannel alloc(){
      FRedisChannel channel = null;
      if(_enable){
         // 收集链接
         channel = _channels.alloc();
         // 创建链接
         if(channel == null){
            channel = new FRedisChannel();
            channel.setConsole(this);
            channel.setup();
            _logger.debug(this, "alloc", "Alloc channel.");
         }
         // 链接处理
         channel.connect();
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
         // 释放处理
         _channels.free((FRedisChannel)channel);
      }
   }

   //============================================================
   // <T>释放处理。</T>
   //============================================================
   public void release(){
      // 断开处理
      for(FRedisChannel channel : _channels.items()){
         channel.release();
      }
      // 释放处理
      _channels.release();
   }
}
