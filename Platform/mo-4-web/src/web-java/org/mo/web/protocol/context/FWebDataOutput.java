package org.mo.web.protocol.context;

import org.mo.com.lang.FObject;

//============================================================
// <T>网页输出器。</T>
//============================================================
public class FWebDataOutput
      extends FObject
      implements
         IWebDataOutput
{
   // 写出器
   protected IWebWriter _writer;

   //============================================================
   // <T>构造输出器。</T>
   //============================================================
   public FWebDataOutput(){
   }

   //============================================================
   // <T>获得写出器。</T>
   //
   // @return 写出器
   //============================================================
   @Override
   public IWebWriter writer(){
      return _writer;
   }

   //============================================================
   // <T>获得写出器。</T>
   //
   // @return 写出器
   //============================================================
   @Override
   public void setWriter(IWebWriter writer){
      _writer = writer;
   }
}
