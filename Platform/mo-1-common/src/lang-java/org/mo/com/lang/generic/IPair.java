package org.mo.com.lang.generic;

//============================================================
// <T>名称内容对对接口。</T>
//
// @type N 名称类型
// @type V 内容类型
//============================================================
public interface IPair<N, V>
{
   //============================================================
   // <T>获得总数。</T>
   //
   // @return 总数
   //============================================================
   int count();

   //============================================================
   // <T>获得位置。</T>
   //
   // @return 位置
   //============================================================
   int position();

   //============================================================
   // <T>判断是否开始位置。</T>
   //
   // @return 是否开始
   //============================================================
   boolean isFirst();

   //============================================================
   // <T>判断是否结束位置。</T>
   //
   // @return 是否结束
   //============================================================
   boolean isLast();

   //============================================================
   // <T>获得名称。</T>
   //
   // @return 名称
   //============================================================
   N name();

   //============================================================
   // <T>获得内容。</T>
   //
   // @return 内容
   //============================================================
   V value();
}