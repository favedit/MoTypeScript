package org.mo.com.io;

//============================================================
// <T>输入流接口。</T>
//============================================================
public interface IInput
{
   //============================================================
   // <T>读取字节数组。</T>
   //
   // @param data 字节集合
   // @param offset 位置
   // @param length 长度
   // @return 读取长度
   //============================================================
   int read(byte[] data,
            int offset,
            int length);
}
