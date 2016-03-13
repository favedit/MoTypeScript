package org.mo.web.core.service.servlet;

import org.mo.com.lang.EResult;
import org.mo.web.protocol.context.IWebContext;
import org.mo.web.protocol.context.IWebDataInput;
import org.mo.web.protocol.context.IWebDataOutput;

//============================================================
// <T>服务处理模块。</T>
//============================================================
public class FServicePostServlet
      extends FAbstractServicePostServlet
{
   // 序列化标志
   private static final long serialVersionUID = 1L;

   //============================================================
   // <T>网页请求逻辑处理。</T>
   //
   // @param uri 网络地址
   // @param context 页面环境
   // @param input 输入信息
   // @param output 输出信息
   //============================================================
   @Override
   public String processLogic(String uri,
                              IWebContext context,
                              IWebDataInput input,
                              IWebDataOutput output){
      Object resultCd = _serviceConsole.execute(uri, context, input, output);
      if(resultCd != null){
         return resultCd.toString();
      }
      return EResult.Failure.toString();
   }
}
