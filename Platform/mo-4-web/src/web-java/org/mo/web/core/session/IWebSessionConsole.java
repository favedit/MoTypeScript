package org.mo.web.core.session;

import org.mo.com.lang.EResult;
import org.mo.eng.data.common.ISqlContext;
import org.mo.eng.session.ISessionConsole;
import org.mo.web.protocol.context.IWebContext;

//============================================================
// <T>网络线程控制台接口。</T>
//============================================================
public interface IWebSessionConsole
      extends
         ISessionConsole
{
   //============================================================
   // <T>建立线程对象。</T>
   //
   // @param sessionId 线程标识
   // @return 线程对象
   //============================================================
   IWebSession build(String sessionId);

   //============================================================
   // <T>更新输出内容。</T>
   //
   // @param context 页面对象
   // @param session 会话对象
   //============================================================
   void output(IWebContext context,
               IWebSession session);

   //============================================================
   // <T>打开会话对象。</T>
   //
   // @param webContext 网页环境
   // @param sqlContext 数据环境
   // @param webSession 会话对象
   // @return 处理结果
   //============================================================
   EResult open(IWebContext webContext,
                ISqlContext sqlContext,
                IWebSession webSession);

   //============================================================
   // <T>更新会话对象。</T>
   //
   // @param sqlContext 数据环境
   // @param webSession 会话对象
   // @return 处理结果
   //============================================================
   EResult update(ISqlContext sqlContext,
                  IWebSession webSession);

   //============================================================
   // <T>关闭会话对象。</T>
   //
   // @param sqlContext 数据环境
   // @param webSession 会话对象
   // @return 处理结果
   //============================================================
   EResult close(ISqlContext sqlContext,
                 IWebSession webSession);
}
