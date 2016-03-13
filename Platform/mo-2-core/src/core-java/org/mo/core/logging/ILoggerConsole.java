package org.mo.core.logging;

import org.mo.com.logging.ILoggerListener;

//============================================================
// <T>日志控制台接口。</T>
//============================================================
public interface ILoggerConsole
{
   //============================================================
   // <T>获得日期时间格式。</T>
   //============================================================
   String dateFormat();

   //============================================================
   // <T>获得存储路径。</T>
   //============================================================
   String storePath();

   //============================================================
   // <T>增加过滤器。</T>
   //
   // @param className 类名称
   //============================================================
   void addFilter(String className);

   //============================================================
   // <T>增加监听器。</T>
   //
   // @param listener 监听器
   //============================================================
   void addListener(ILoggerListener listener);
}
