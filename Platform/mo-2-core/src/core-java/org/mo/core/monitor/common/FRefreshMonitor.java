package org.mo.core.monitor.common;

//============================================================
// <T>刷新监视器。</T>
//============================================================
public class FRefreshMonitor
      extends FAbstractMonitor
{
   // 刷新器
   protected IMonitorRefresh _refresher;

   //============================================================
   // <T>构造刷新监视器。</T>
   //============================================================
   public FRefreshMonitor(){
   }

   //============================================================
   // <T>构造刷新监视器。</T>
   //
   // @param refresher 刷新器
   //============================================================
   public FRefreshMonitor(IMonitorRefresh refresher){
      _refresher = refresher;
   }

   //============================================================
   // <T>获得刷新器。</T>
   //
   // @return 刷新器
   //============================================================
   public IMonitorRefresh refresher(){
      return _refresher;
   }

   //============================================================
   // <T>设置刷新器。</T>
   //
   // @param refresher 刷新器
   //============================================================
   public void setRefresher(IMonitorRefresh refresher){
      _refresher = refresher;
   }

   //============================================================
   // <T>执行逻辑处理。</T>
   //============================================================
   @Override
   public void execute(){
      if(_refresher != null){
         _refresher.refreshMonitor();
      }
   }
}
