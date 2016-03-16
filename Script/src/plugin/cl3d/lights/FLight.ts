import {FObject} from '../../../runtime/common/lang/FObject';
import {ILight} from '../../../runtime/graphic/light/ILight';

//==========================================================
// <T>光源。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FLight extends FObject implements ILight{
   code: string;
}