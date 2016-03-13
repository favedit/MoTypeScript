package org.mo.web.core.message;

import org.mo.com.console.FConsole;
import org.mo.core.aop.face.AProperty;

//============================================================
// <T>消息控制台。</T>
//============================================================
public class FWebMessageConsole
      extends FConsole
      implements
         IWebMessageConsole
{
   // 信息消息页面
   @AProperty
   protected String _pageInfo;

   // 警告消息页面
   @AProperty
   protected String _pageWarn;

   // 错误消息页面
   @AProperty
   protected String _pageError;

   // 崩溃消息页面
   @AProperty
   protected String _pageFatal;

   // 会话错误消息页面
   @AProperty
   protected String _pageSession;

   // 未登录消息页面
   @AProperty
   protected String _pageLogin;

   // 超时消息页面
   @AProperty
   protected String _pageTimeout;

   // 权限消息页面
   @AProperty
   protected String _pageAuthority;

   //============================================================
   // <T>获得信息消息页面。</T>
   //============================================================
   @Override
   public String infoMessage(){
      return _pageInfo;
   }

   //============================================================
   // <T>获得警告消息页面。</T>
   //============================================================
   @Override
   public String warnMessage(){
      return _pageWarn;
   }

   //============================================================
   // <T>获得错误消息页面。</T>
   //============================================================
   @Override
   public String errorMessage(){
      return _pageError;
   }

   //============================================================
   // <T>获得崩溃消息页面。</T>
   //============================================================
   @Override
   public String fatalMessage(){
      return _pageFatal;
   }

   //============================================================
   // <T>获得会话错误消息页面。</T>
   //============================================================
   @Override
   public String pageSession(){
      return _pageSession;
   }

   //============================================================
   // <T>获得未登录消息页面。</T>
   //============================================================
   @Override
   public String pageLogin(){
      return _pageLogin;
   }

   //============================================================
   // <T>获得超时消息页面。</T>
   //============================================================
   @Override
   public String pageTimeout(){
      return _pageTimeout;
   }

   //============================================================
   // <T>获得权限消息页面。</T>
   //============================================================
   @Override
   public String pageAuthority(){
      return _pageAuthority;
   }

}
