package org.mo.core.logging;

import org.mo.com.console.FConsole;
import org.mo.com.logging.ELoggerLevel;
import org.mo.com.logging.ILoggerListener;
import org.mo.com.logging.RLogger;
import org.mo.com.system.FListeners;
import org.mo.com.system.IListener;
import org.mo.core.aop.face.ALink;
import org.mo.core.aop.face.AProperty;
import org.mo.core.logging.adopter.FFileLogListener;
import org.mo.core.monitor.IMonitorConsole;

//============================================================
// <T>日志控制台。</T>
//============================================================
public class FLoggerConsole
      extends FConsole
      implements
         ILoggerConsole
{
   // 输出级别
   @AProperty
   protected String _level = "debug";

   // 时间格式
   @AProperty
   protected String _dateFormat;

   // 执行间隔
   @AProperty
   protected long _interval;

   // 监听器列表
   protected FListeners _listeners;

   // 日志监视器
   protected FLoggerMonitor _monitor;

   // 监视器控制台
   @ALink
   protected IMonitorConsole _monitorConsole;

   // 存储路径
   @AProperty
   protected String _storePath;

   //============================================================
   // <T>获得日期时间格式。</T>
   //============================================================
   @Override
   public String dateFormat(){
      return _dateFormat;
   }

   //============================================================
   // <T>获得存储路径。</T>
   //============================================================
   @Override
   public String storePath(){
      return _storePath;
   }

   //============================================================
   // <T>增加过滤器。</T>
   //
   // @param className 类名称
   //============================================================
   @Override
   public void addFilter(String className){
      //FLogger logger = (FLogger)RLogger.find(className);
      //logger.setAbleFlag(ELoggerLevel.NONE);
   }

   //============================================================
   // <T>增加监听器。</T>
   //
   // @param listener 监听器
   //============================================================
   @Override
   public void addListener(ILoggerListener listener){
      if(listener instanceof FFileLogListener){
         ((FFileLogListener)listener).setConsole(this);
      }
      listener.initialize();
      _listeners.push(listener);
   }

   //============================================================
   // <T>刷新日志缓冲，将日志缓冲的内容输出到文件中。</T>
   //============================================================
   public void refresh(){
      int count = _listeners.count();
      for(int n = 0; n < count; n++){
         ILoggerListener loggerListener = (ILoggerListener)_listeners.get(n);
         loggerListener.refresh();
      }
   }

   //============================================================
   // <T>初始化操作。</T>
   //============================================================
   public void initialize(){
      // 设置日志
      ELoggerLevel levelCd = ELoggerLevel.parseCode(_level);
      if(levelCd != ELoggerLevel.DEBUG){
         RLogger.setFlags(ELoggerLevel.NO_DEBUG.value());
      }
      // 设置监听器列表
      _listeners = RLogger.listeners();
      // 创建日志监视器
      _monitor = new FLoggerMonitor(this);
      _monitor.setInterval(_interval);
      _monitorConsole.register(_monitor);
   }

   //============================================================
   // <T>释放操做。</T>
   //============================================================
   public void release(){
      // 关闭所有监听器
      for(IListener listener : _listeners){
         ILoggerListener loggerListener = (ILoggerListener)listener;
         loggerListener.release();
      }
   }
}
