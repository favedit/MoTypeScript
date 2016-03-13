package org.mo.web.protocol.common;

import javax.servlet.ServletConfig;

//============================================================
// <T>页面处理接口。</T>
//============================================================
public interface IWebServlet
{
   // 获得方法
   String METHOD_GET = "Get";

   // 提交方法
   String METHOD_POST = "Post";

   // 提交方法
   String METHOD_OPTIONS = "Options";

   //============================================================
   // <T>初始化数据，创建全局应用管理对象。</T>
   //
   // @param config 页面设置对象
   //============================================================
   void initialize(ServletConfig config);
}
