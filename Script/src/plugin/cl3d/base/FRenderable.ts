import {IRenderable} from '../../../runtime/graphic/IRenderable';
import {FMaterial} from '../materials/FMaterial';
import {FDrawable} from './FDrawable';

//==========================================================
// <T>可绘制对象。</T>
//
// @class
// @author maocy
// @history 150312
//==========================================================
export class FRenderable extends FDrawable implements IRenderable {
   // 材质
   public material: FMaterial = null;
   // 参考材质
   public materialReference: any = null;
}
