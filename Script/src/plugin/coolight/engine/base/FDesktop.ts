import {FObject} from '../../../runtime/common/lang/FObject'
import {FObjects} from '../../../runtime/common/lang/FObjects'
import {RObject} from '../../../runtime/common/lang/RObject'
import {SSize2} from '../../../runtime/common/math/SSize2'
import {RAssert} from '../../../runtime/common/RAssert'

//==========================================================
// <T>桌面对象。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
export class FDesktop extends FObject {
    //o = MO.Class.inherits(this, o, MO.FObject, MO.MEventDispatcher);
    //..........................................................
    // @attribute
    //o._visible         = MO.Class.register(o, new MO.AGetSet('_visible'));
    protected _visible = null;
    //o._size            = MO.Class.register(o, new MO.AGetter('_size'));
    protected _size: SSize2 = null;
    //o._sizeRate        = MO.Class.register(o, new MO.AGetter('_sizeRate'), 1);
    protected _sizeRate = null;
    //o._sizeScale       = MO.Class.register(o, new MO.AGetter('_sizeScale'), 1);
    protected _sizeScale = null;
    //o._calculateSize   = MO.Class.register(o, new MO.AGetter('_calculateSize'));
    protected _calculateSize: SSize2 = null;
    //o._calculateRate   = MO.Class.register(o, new MO.AGetter('_calculateRate'));
    protected _calculateRate: SSize2 = null;
    //o._logicSize       = MO.Class.register(o, new MO.AGetter('_logicSize'));
    protected _logicSize: SSize2 = null;
    //o._logicRate       = MO.Class.register(o, new MO.AGetter('_logicRate'));
    protected _logicRate: SSize2 = null;
    //o._screenSize      = MO.Class.register(o, new MO.AGetter('_screenSize'));
    protected _screenSize: SSize2 = null;
    //o._virtualSize     = MO.Class.register(o, new MO.AGetter('_virtualSize'));
    protected _virtualSize: SSize2 = null;
    //o._guiBufferScale  = MO.Class.register(o, new MO.AGetSet('_guiBufferScale'), 1);
    protected _guiBufferScale = null;
    // @attribute
    //o._canvases        = MO.Class.register(o, new MO.AGetter('_canvases'));
    protected _canvases = null;
    //    //..........................................................
    //    // @method
    //    o.construct        = MO.FDesktop_construct;
    //    // @method
    //    o.canvasRegister   = MO.FDesktop_canvasRegister;
    //    o.canvasUnregister = MO.FDesktop_canvasUnregister;
    //    o.setup            = MO.Method.empty;
    //    o.build            = MO.Method.empty;
    //    o.show             = MO.FDesktop_show;
    //    o.hide             = MO.FDesktop_hide;
    //    o.resize           = MO.Method.empty;
    //    o.processEvent     = MO.FDesktop_processEvent;
    //    o.process          = MO.Method.empty;
    //    // @method
    //    o.dispose          = MO.FDesktop_dispose;

    //==========================================================
    // <T>构造处理。</T>
    //
    // @method
    //==========================================================
    public constructor() {
        super();
        // 设置属性
        this._size = new SSize2(1280, 720);
        this._calculateSize = new SSize2(1280, 720);
        this._calculateRate = new SSize2(1, 1);
        this._logicSize = new SSize2(1280, 720);
        this._logicRate = new SSize2(1, 1);
        this._screenSize = new SSize2(1280, 720);
        this._virtualSize = new SSize2(1280, 720);
        this._canvases = new FObjects();
    }

    //==========================================================
    // <T>注册画板。</T>
    //
    // @method
    // @param canvas:FCanvas 画布
    //==========================================================
    public canvasRegister(canvas) {
        var canvases = this._canvases;
        RAssert.debugFalse(canvases.contains(canvas));
        canvases.push(canvas);
    }

    //==========================================================
    // <T>注销画板。</T>
    //
    // @method
    // @param canvas:FCanvas 画布
    //==========================================================
    public canvasUnregister(canvas) {
        var canvases = this._canvases;
        RAssert.debugTrue(canvases.contains(canvas));
        canvases.remove(canvas);
    }

    //==========================================================
    // <T>可见处理。</T>
    //
    // @method
    //==========================================================
    public show() {
        this.setVisible(true);
    }

    //==========================================================
    // <T>隐藏处理。</T>
    //
    // @method
    //==========================================================
    public hide() {
        this.setVisible(false);
    }

    //==========================================================
    // <T>事件处理。</T>
    //
    // @method
    // @param event:SEvent 事件信息
    //==========================================================
    public processEvent(event) {
        this.dispatchEvent(event);
    }

    //==========================================================
    // <T>释放处理。</T>
    //
    // @method
    //==========================================================
    public dispose() {
        // 释放属性
        this._size = RObject.dispose(this._size);
        this._calculateSize = RObject.dispose(this._calculateSize);
        this._logicSize = RObject.dispose(this._logicSize);
        this._logicRate = RObject.dispose(this._logicRate);
        this._screenSize = RObject.dispose(this._screenSize);
        this._virtualSize = RObject.dispose(this._virtualSize);
        this._canvases = RObject.dispose(this._canvases);
        // 父处理
        super.dispose();
    }
}