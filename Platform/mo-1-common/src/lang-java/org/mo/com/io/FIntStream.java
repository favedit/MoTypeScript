package org.mo.com.io;

import org.mo.com.io.base.MIntStream;

//============================================================
//<T>整数数据流。</T>
//============================================================
public class FIntStream
      extends MIntStream
{
   //============================================================
   // <T>构造整数数据流。</T>
   //============================================================
   public FIntStream(){
   }

   //============================================================
   // <T>构造整数数据流。</T>
   //
   // @param capacity 容量
   //============================================================
   public FIntStream(int capacity){
      super(capacity);
   }
}
