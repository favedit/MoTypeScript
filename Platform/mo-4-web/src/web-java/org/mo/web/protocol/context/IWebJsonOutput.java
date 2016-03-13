package org.mo.web.protocol.context;

import org.mo.com.json.FJsonObject;

//============================================================
// <T>网页JSON输出器接口。</T>
//============================================================
public interface IWebJsonOutput
      extends
         IWebDataOutput
{
   //============================================================
   // <T>获得JSON节点。</T>
   //
   // @return JSON节点
   //============================================================
   FJsonObject value();
}
