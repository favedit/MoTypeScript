import {FObject} from '../../../runtime/common/lang/FObject';
import {FError} from '../../../runtime/common/lang/FError';
import {RAssert} from '../../../runtime/common/RAssert';
import {FGraphicContext} from './FGraphicContext';

//==========================================================
// <T>图形对象。</T>
//
// @face
// @author maocy
// @history 150206
//==========================================================
export class FGraphicObject extends FObject {
   // 图形环境
   public _graphicContext: any = null;

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @param context 图形环境
   //==========================================================
   public get graphicContext() {
      return this._graphicContext;
   }

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @param context 图形环境
   //==========================================================
   public linkGraphicContext(context) {
      RAssert.debugNotNull(context);
      if (context instanceof FGraphicContext) {
         this._graphicContext = context;
      } else if (context instanceof FGraphicObject) {
         this._graphicContext = (context as FGraphicObject).graphicContext;
      } else {
         throw new FError(this, 'Link graphic context failure. (context={1})', context);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._graphicContext = null;
      // 父处理
      super.dispose();
   }
}
