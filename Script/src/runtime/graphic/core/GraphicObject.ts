import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {Fatal} from '../../../runtime/common/lang/Fatal';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {GraphicContext} from './GraphicContext';

//==========================================================
// <T>图形对象。</T>
//
// @face
// @author maocy
// @history 150206
//==========================================================
export class GraphicObject extends ObjectBase {
   // 图形环境
   public graphicContext: any;

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @param context 图形环境
   //==========================================================
   public linkGraphicContext(context) {
      AssertUtil.debugNotNull(context);
      if (context instanceof GraphicContext) {
         this.graphicContext = context;
      } else if (context instanceof GraphicObject) {
         this.graphicContext = (context as GraphicObject).graphicContext;
      } else {
         throw new Fatal(this, 'Link graphic context failure. (context={1})', context);
      }
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   //public setup() {
   //}

   //==========================================================
   // <T>更新处理。</T>
   //==========================================================
   //public update() {
   //}

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this.graphicContext = null;
      // 父处理
      super.dispose();
   }
}
