package org.mo.core.logging;

import org.mo.core.monitor.common.FAbstractMonitor;

//============================================================
//<T>日志监视器。</T>
//============================================================
public class FLoggerMonitor
      extends FAbstractMonitor
{
   // 关联的属性控制台
   protected FLoggerConsole _console;

   //============================================================
   //<T>构造日志监视器。</T>
   //
   // @param console 日志控制台
   //============================================================
   public FLoggerMonitor(FLoggerConsole console){
      _console = console;
   }

   //============================================================
   //<T>执行监视器的逻辑。</T>
   //============================================================
   @Override
   public void execute(){
      _console.refresh();
   }
}
