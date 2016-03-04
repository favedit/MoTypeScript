import {FObject} from '../../../../runtime/common/lang/FObject';

//==========================================================
// <T>渲染视角。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FG3dViewport extends FObject {
   // @attribute
   left = 0;
   top = 0;
   width = 0;
   height = 0;

   //==========================================================
   // <T>设置信息。</T>
   //
   // @param left:Number 左边
   // @param top:Number 上边
   // @param width:Number 宽度
   // @param height:Number 高度
   //==========================================================
   public set(left, top, width, height) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
   }
}