import {FObject} from '../../../../runtime/common/lang/FObject';
import {RAssert} from '../../../../runtime/common/RAssert';

//==========================================================
// <T>图形对象。</T>
//
// @face
// @author maocy
// @history 150206
//==========================================================
export class FGraphicObject extends FObject {
   //..........................................................
   // @attribute
   //o._graphicContext    = MO.Class.register(o, new MO.AGetter('_graphicContext'));
   protected _graphicContext = null;

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @method
   // @param context:FGraphicContext 图形环境
   //==========================================================
   public linkGraphicContext(context) {
      /*if (MO.Class.isClass(context, MO.FGraphicContext)) {
         o._graphicContext = context;
      } else if (MO.Class.isClass(context, MO.MGraphicObject)) {
         o._graphicContext = context.graphicContext();
      } else {
         throw new MO.TError(o, 'Link graphic context failure. (context={1})', context);
      }*/
      RAssert.debugNotNull(this._graphicContext);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._graphicContext = null;
      super.dispose();
   }
}
