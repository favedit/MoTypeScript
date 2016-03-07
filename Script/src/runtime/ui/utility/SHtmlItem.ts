﻿//==========================================================
// <T>页面项目。</T>
//
// @tool
// @author maocy
// @version 150101
//==========================================================
export class SHtmlItem {
   // 关联对象
   protected _link: any = null;
   // 关联集合
   protected _links: any = new Object();

   //===========================================================
   // <T>根据名称获得内容。</T>
   //
   // @param name 名称
   // @return 内容
   //===========================================================
   public get(name: string): any {
      return this._links[name];
   }

   //===========================================================
   // <T>根据名称设置内容。</T>
   //
   // @param name 名称
   // @param value 内容
   //===========================================================
   public set(name: string, value: any) {
      this._links[name] = value;
   }
}