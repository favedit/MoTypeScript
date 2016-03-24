import {ObjectBase} from '../../../runtime/common/lang/ObjectBase'

//==========================================================
// <T>画板对象。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
export class FCanvas extends ObjectBase {
    //o = MO.Class.inherits(this, o, MO.FObject, MO.MEventDispatcher);
    //..........................................................
    // @attribute
    //o._desktop     = MO.Class.register(o, new MO.AGetSet('_desktop'));
    protected _desktop = null;
    //o._activeStage = MO.Class.register(o, new MO.AGetter('_activeStage'));
    protected _activeStage = null;

    //==========================================================
    // <T>构造处理。</T>
    //
    // @method
    //==========================================================
    public constructor() {
        super();
    }

    //==========================================================
    // <T>释放处理。</T>
    //
    // @method
    //==========================================================
    public dispose() {
        this._desktop = null;
        this._activeStage = null;
        // 父处理
        super.dispose();
    }
}