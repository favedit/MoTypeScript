import {FContent} from './FContent';

//==========================================================
// <T>渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FShader extends FContent {
   // 代码
   public source: string = null;

   //==========================================================
   // <T>上传代码。</T>
   //
   // @param source 代码
   //==========================================================
   public upload(source: string): void {
   }
}