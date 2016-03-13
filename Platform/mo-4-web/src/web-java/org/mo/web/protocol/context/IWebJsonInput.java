package org.mo.web.protocol.context;

import org.mo.com.json.FJsonObject;

//============================================================
// <T>网页JSON输入器接口。</T>
//============================================================
public interface IWebJsonInput
      extends
         IWebDataInput
{
   //============================================================
   // <T>获得设置节点。</T>
   //
   // @return 设置节点
   //============================================================
   FJsonObject value();
}
