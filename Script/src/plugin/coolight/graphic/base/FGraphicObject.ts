import {FObject} from '../../../../runtime/common/lang/FObject';
import {RAssert} from '../../../../runtime/common/RAssert';
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
   public graphicContext: any = null;

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @param context 图形环境
   //==========================================================
   public linkGraphicContext(context) {
      /*if (MO.Class.isClass(context, MO.FGraphicContext)) {
         o._graphicContext = context;
      } else if (MO.Class.isClass(context, MO.MGraphicObject)) {
         o._graphicContext = context.graphicContext();
      } else {
         throw new MO.TError(o, 'Link graphic context failure. (context={1})', context);
      }*/
      RAssert.debugNotNull(context);
      this.graphicContext = context;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.graphicContext = null;
      super.dispose();
   }
}
