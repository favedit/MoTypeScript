package org.mo.eng.cache;

import org.mo.com.console.FConsole;
import org.mo.com.lang.RString;
import org.mo.core.aop.face.AProperty;
import org.mo.eng.cache.memory.ICache;
import org.mo.eng.cache.memory.ICacheConsole;

//============================================================
// <T>缓冲基础控制台。</T>
//============================================================
public abstract class FAbstractCacheConsole
      extends FConsole
      implements
         ICacheConsole
{
   // 日志输出接口
   // private static ILogger _logger = RLogger.find(FAbstractCacheConsole.class);

   // 允许缓冲
   @AProperty
   protected boolean _enable;

   // 标识
   @AProperty
   protected String _code = RString.EMPTY;

   //============================================================
   // <T>构造缓冲基础控制台。</T>
   //============================================================
   public FAbstractCacheConsole(){
   }

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
   // <T>获得代码。</T>
   //
   // @return 代码
   //============================================================
   @Override
   public String code(){
      return _code;
   }

   @Override
   public ICache find(Class<?> clazz,
                      String name){
      return null;
   }

   @Override
   public void register(Class<?> clazz,
                        String name,
                        ICache cache){
   }
}
