import {FG3dBuffer} from './FG3dBuffer';
import {EG3dIndexStride} from './EG3dIndexStride';
import {EG3dDrawMode} from './EG3dDrawMode';

//==========================================================
// <T>渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
export class FG3dIndexBuffer extends FG3dBuffer {
   //..........................................................
   // @attribute
   //o._strideCd = MO.Class.register(o, new MO.AGetSet('_strideCd'), MO.EG3dIndexStride.Uint16);
   protected _strideCd = EG3dIndexStride.Uint16;
   //o._count = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   protected _count = 0;
   // @attribute
   //o._drawModeCd = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   protected _drawModeCd = EG3dDrawMode.Triangles;
   //o._lineWidth = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   protected _lineWidth = 1;
   //..........................................................
   // @method
   //o.upload = MO.Method.virtual(o, 'upload');
}
