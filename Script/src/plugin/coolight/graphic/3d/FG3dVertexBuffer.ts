import {FG3dBuffer} from './FG3dBuffer';
import {EG3dAttributeFormat} from './EG3dAttributeFormat';

//==========================================================
// <T>渲染顶点流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export class FG3dVertexBuffer extends FG3dBuffer {
   //..........................................................
   // @attribute_formatCd
   //o._formatCd = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   protected _formatCd = EG3dAttributeFormat.Unknown;
   //o._stride = MO.Class.register(o, new MO.AGetSet('_stride'), 0);
   protected _stride = 0;
   //o._count = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   protected _count = 0;
   //..........................................................
   // @method
   //o.upload = MO.Method.virtual(o, 'upload');
}