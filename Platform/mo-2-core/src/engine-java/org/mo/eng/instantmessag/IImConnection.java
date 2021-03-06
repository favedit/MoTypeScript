package org.mo.eng.instantmessag;

import org.mo.com.lang.EResult;

//============================================================
// <T>即时通讯链接接口。</T>
//============================================================
public interface IImConnection
{
   //============================================================
   // <T>链接处理。</T>
   //
   // @param params 参数集合
   // @return 处理结果
   //============================================================
   EResult connect(SImConnectParams params);

   //============================================================
   // <T>登录处理。</T>
   //
   // @param params 参数集合
   // @return 处理结果
   //============================================================
   EResult login(SImLoginParams params);

   //============================================================
   // <T>创建用户处理。</T>
   //
   // @param params 参数集合
   // @return 处理结果
   //============================================================
   EResult createAccount(SImAccountParams params);

   //============================================================
   // <T>创建聊天频道。</T>
   //
   // @param passport 账号
   // @return 聊天频道
   //============================================================
   IImChatChannel createChatChannel(String passport);

   //============================================================
   // <T>获得聊天频道。</T>
   //
   // @param passport 账号
   // @return 聊天频道
   //============================================================
   IImChatChannel syncChatChannel(String passport);

   //============================================================
   // <T>断开处理。</T>
   //
   // @return 处理结果
   //============================================================
   EResult disconnect();

   //============================================================
   // <T>是否连接</T>
   //
   // @return 处理结果
   //============================================================
   boolean isConnected();
}
