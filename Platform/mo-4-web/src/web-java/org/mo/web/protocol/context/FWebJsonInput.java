package org.mo.web.protocol.context;

import org.mo.com.json.FJsonObject;

//============================================================
// <T>网页JSON输入器。</T>
//============================================================
public class FWebJsonInput
      implements
         IWebJsonInput
{
   // JSON节点
   protected FJsonObject _value;

   //============================================================
   // <T>构造网页配置输入器。</T>
   //============================================================
   public FWebJsonInput(){
   }

   //============================================================
   // <T>构造网页配置输入器。</T>
   //
   // @param xconfig 配置节点
   //============================================================
   public FWebJsonInput(FJsonObject value){
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

   //============================================================
   // <T>获得设置节点。</T>
   //
   // @return 设置节点
   //============================================================
   @Override
   public String get(String name){
      String value = null;
      if(_value != null){
         value = _value.getString(name, null);
      }
      return value;
   }
}
