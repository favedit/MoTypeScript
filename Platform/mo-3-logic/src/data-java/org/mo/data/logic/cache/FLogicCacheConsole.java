package org.mo.data.logic.cache;

import org.mo.com.console.FConsole;
import org.mo.com.lang.FFatalError;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.system.FObjectPool;
import org.mo.core.aop.face.ALink;
import org.mo.core.aop.face.AProperty;
import org.mo.eng.cache.ICacheChannel;
import org.mo.eng.cache.ICacheConsole;

//============================================================
// <T>逻辑单元缓冲控制台。</T>
// <P>LG(GUID)|database|guid</P>
// <P>LG(GUID)|database(GUID)|table|guid</P>
// <P>LG(GUID)|database(GUID)|table(GUID)|guid</P>
// <P>LG(GUID)|database(GUID)|table(GUID)|row(ID)                     [find]</P>
// <P>LG(GUID)|database(GUID)|table(GUID)|dataset(GUID)|code          [search]</P>
// <P>LG(GUID)|database(GUID)|table(GUID)|dataset(GUID)|pageSize|page [fetch]</P>
// <P>FIND         - 不处理</P>
// <P>SEARCH       - 不处理</P>
// <P>FETCH        - 不处理</P>
// <P>INSERT       - 不处理</P>
// <P>UPDATE       - 删除RowId，更新DatasetGuid</P>
// <P>DELETE       - 删除RowId，更新DatasetGuid</P>
// <P>TABLE-SQL    - 更新TableGuid</P>
// <P>DATABASE-SQL - 更新DatabaseGuid</P>
// <P>RESTART      - 更新LogicGuid</P>
//============================================================
public class FLogicCacheConsole
      extends FConsole
      implements
         ILogicCacheConsole
{
   // 日志输出接口 
   private static ILogger _logger = RLogger.find(FLogicCacheConsole.class);

   // 允许缓冲
   @AProperty
   protected boolean _enable;

   // 内存缓冲控制台
   @ALink
   protected ICacheConsole _cacheConsole;

   // 设置过
   protected boolean _setuped;

   // 逻辑单元缓冲频道集合
   protected FObjectPool<FLogicCacheChannel> _logicChannels = new FObjectPool<FLogicCacheChannel>(FLogicCacheChannel.class);

   //============================================================
   // <T>测试是否允许。</T>
   //
   // @return 是否允许
   //============================================================
   @Override
   public boolean isEnable(){
      return _enable;
   }

   //============================================================
   // <T>收集逻辑频道。</T>
   //
   // @param cacheChannel 内存频道
   // @return 逻辑频道
   //============================================================
   @Override
   public FLogicCacheChannel alloc(ICacheChannel cacheChannel){
      // 检查内存缓冲
      if(!_cacheConsole.isEnable()){
         return null;
      }
      // 收集频道
      FLogicCacheChannel channel = null;
      if(_enable){
         synchronized(_logicChannels){
            // 收集处理
            channel = _logicChannels.alloc();
            if(channel == null){
               channel = new FLogicCacheChannel();
               channel.setConsole(this);
               channel.setup();
            }
            // 链接处理
            channel.connect(cacheChannel);
            _logger.debug(this, "alloc", "Alloc logic cache channel. (item_count={1}, alloc_total={2}, free_total={3})", _logicChannels.itemCount(), _logicChannels.allocTotal(), _logicChannels.freeTotal());
         }
      }
      return channel;
   }

   //============================================================
   // <T>释放逻辑频道。</T>
   //
   // @param logicChannel 逻辑频道
   //============================================================
   @Override
   public void free(FLogicCacheChannel channel){
      if(_enable){
         FLogicCacheChannel logicCacheChannel = channel;
         synchronized(_logicChannels){
            // 释放处理
            if(_logicChannels.itemContains(logicCacheChannel)){
               throw new FFatalError("Logic cache channel is already exists.");
            }
            // 断开处理
            channel.disconnect();
            // 回收处理
            _logicChannels.free(channel);
            _logger.debug(this, "free", "Free logic channel. (item_count={1}, alloc_total={2}, free_total={3})", _logicChannels.itemCount(), _logicChannels.allocTotal(), _logicChannels.freeTotal());
         }
      }
   }

   //============================================================
   // <T>初始化处理。</T>
   //============================================================
   public void initialize(){
   }

   //============================================================
   // <T>释放处理。</T>
   //============================================================
   public void release(){
   }
}
