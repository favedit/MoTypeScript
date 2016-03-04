import {FObject} from '../../../../runtime/common/lang/FObject';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {SSize2} from '../../../../runtime/common/math/SSize2';

//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FGraphicContext extends FObject {
    //o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
    //..........................................................
    // 画板
    protected _hCanvas = null;
    // 尺寸
    protected _size: SSize2 = null;

    //==========================================================
    // <T>构造处理。</T>
    //
    // @method
    //==========================================================
    public constructor() {
        super();
        // 设置属性
        this._size = new SSize2(1280, 720);
    }

    //==========================================================
    // <T>获得画板。</T>
    //
    // @return 画板
    //==========================================================
    public get htmlCanvas(): any {
        return this._hCanvas;
    }

    //==========================================================
    // <T>获得尺寸。</T>
    //
    // @return 尺寸
    //==========================================================
    public get size(): SSize2 {
        return this._size;
    }

    //==========================================================
    // <T>关联画板。</T>
    //
    // @param hCanvas 画板
    //==========================================================
    public linkCanvas(hCanvas: any): void {
        this._hCanvas = hCanvas;
    }

    //==========================================================
    // <T>释放处理。</T>
    //
    // @method
    //==========================================================
    public dispose(): void {
        // 释放属性
        this._size = RObject.dispose(this._size);
        this._hCanvas = null;
        // 父处理
        super.dispose();
    }
}
