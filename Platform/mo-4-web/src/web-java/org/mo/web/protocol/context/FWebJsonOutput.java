package org.mo.web.protocol.context;

import org.mo.com.json.FJsonObject;

//============================================================
// <T>网页JSON输出器。</T>
//============================================================
public class FWebJsonOutput
      extends FWebDataOutput
      implements
         IWebJsonOutput
{
   // 配置节点
   protected FJsonObject _value;

   //============================================================
   // <T>构造网页配置输出器。</T>
   //============================================================
   public FWebJsonOutput(){
   }

   //============================================================
   // <T>构造网页配置输出器。</T>
   //
   // @param xconfig 配置节点
   //============================================================
   public FWebJsonOutput(FJsonObject value){
      _value = value;
   }

   //============================================================
   // <T>获得设置节点。</T>
   //
   // @return 设置节点
   //============================================================
   @Override
   public FJsonObject value(){
      if(_value == null){
         _value = new FJsonObject();
      }
      return _value;
   }
}
